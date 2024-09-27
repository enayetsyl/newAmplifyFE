'use client';
import React, { useState, useEffect, useRef } from 'react';
import TableHead from '../shared/TableHead';
import TableData from '../shared/TableData';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { FaUser } from 'react-icons/fa';
import { RiPencilFill } from 'react-icons/ri';
import ViewModeratorModal from './ViewModeratorModal';
import EditModeratorModal from './EditModeratorModal';
import Button from '../shared/button';

const ModeratorTable = () => {
  const [moderators, setModerators] = useState([]);
  const [filteredModerators, setFilteredModerators] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Number of items per page
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const [isModeratorModalOpen, setIsModeratorModalOpen] = useState(false);
  const [isEditModeratorModalOpen, setIsEditModeratorModalOpen] = useState(false);
  const [currentModerator, setCurrentModerator] = useState(null);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [inviteDetails, setInviteDetails] = useState({ firstName: '', lastName: '', email: '' });

  const modalRef = useRef();

  useEffect(() => {
    fetchModerators();
  }, []);

  useEffect(() => {
    filterModerators();
  }, [searchQuery, selectedStatus, moderators]);
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear().toString().slice(); // Get last 2 digits of the year
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Add leading zero to month if necessary
    const day = String(date.getDate()).padStart(2, '0'); // Add leading zero to day if necessary
    return `${year}-${month}-${day}`;
  };
  const fetchModerators = async () => {
    try {
      const response = await fetch(`http://localhost:8008/api/get-all/moderator?page=1&limit=10`);
      const data = await response.json();
      setModerators(data.moderators);
      setFilteredModerators(data.moderators);
    } catch (error) {
      console.error('Error fetching moderators:', error);
    }
  };

  const filterModerators = () => {
    let results = moderators;

    if (searchQuery) {
      results = results.filter(
        (moderator) =>
          moderator.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          moderator.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          moderator.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedStatus !== 'All') {
      results = results.filter((moderator) => moderator.status === selectedStatus);
    }

    setFilteredModerators(results);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
  };

  const handleReload = () => {
    fetchModerators();
  };

  const handleEditModeratorOpenModal = (moderator) => {
    closeModal();
    setCurrentModerator(moderator);
    setIsEditModeratorModalOpen(true);
  };

  const handleEditModeratorCloseModal = () => {
    setIsEditModeratorModalOpen(false);
  };

  const handleModeratorOpenModal = (moderator) => {
    closeModal();
    setCurrentModerator(moderator);
    setIsModeratorModalOpen(true);
  };

  const handleModeratorCloseModal = () => {
    setIsModeratorModalOpen(false);
  };

  const toggleModal = (event, moderator) => {
    const { top, left } = event.currentTarget.getBoundingClientRect();
    setModalPosition({ top, left });
    setCurrentModerator(moderator);
    setIsModalOpen(!isModalOpen);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      closeModal();
    }
  };



  const handleDeleteModerator = async (moderatorId) => {
    try {
      const response = await fetch(`http://localhost:8008/api/delete/moderator?id=${moderatorId}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        setModerators((prevModerators) =>
          prevModerators.filter((moderator) => moderator.id !== moderatorId)
        );
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error deleting moderator:', error);
      alert('Error deleting moderator.');
    }
  };

  const handleInviteModeratorChange = (e) => {
    setInviteDetails({ ...inviteDetails, [e.target.name]: e.target.value });
  };
  const handleSaveModerator = (updatedModerator) => {
    setModerators((prevModerators) =>
      prevModerators.map((moderator) =>
        moderator.id === updatedModerator.id ? updatedModerator : moderator
      )
    );
    setIsEditModeratorModalOpen(false);
  };
  const handleInviteModerator = async () => {
    try {
      const response = await fetch(`http://localhost:8008/api/moderator-invitation/link'`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...inviteDetails, project: '66b0a6bf824132f349bbbc84' }),
      });
      const data = await response.json();
      if (data.success) {
        alert('Moderator invited successfully!');
        setIsInviteModalOpen(false);
      } else {
        alert('Failed to invite moderator.');
      }
    } catch (error) {
      console.error('Error inviting moderator:', error);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentModerators = filteredModerators.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredModerators.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="overflow-x-auto px-10 pt-10 w-full">
      <div className=" justify-between mb-4 hidden sm:flex">
        <input
          type="text"
          placeholder="Search by name or email"
          value={searchQuery}
          onChange={handleSearchChange}
          className="border border-gray-300 rounded-lg p-2"
        />
        <select
          value={selectedStatus}
          onChange={handleStatusChange}
          className="border border-gray-300 rounded-lg p-2"
        >
          <option value="All">All Statuses</option>
          <option value="Active">Active</option>
          <option value="Pending">Pending</option>
          <option value="Inactive">Inactive</option>
        </select>
        <Button onClick={handleReload}>Reload</Button>
      </div>
      <div className="border-[0.5px] border-custom-dark-blue-1 rounded-lg w-full">
        <table className=" divide-y divide-gray-200 rounded-lg w-full">
          <thead className="bg-custom-gray-2 rounded-lg py-2 w-full l">
            <tr className="shadow-[0px_0px_26px_#00000029] w-full    md:hidden ">
              <TableHead>First Name</TableHead>
              <TableHead>Last Name</TableHead>
              {/* <TableHead>Email</TableHead>
              <TableHead>Joined On</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead> */}
            </tr>
            <tr className="shadow-[0px_0px_26px_#00000029] w-full overflow-scroll  md:grid hidden grid-cols-6">
              <TableHead>First Name</TableHead>
              <TableHead>Last Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Joined On</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 rounded-lg w-full ">
            {currentModerators.map((moderator, index) => (
              <>
              <tr key={index} className="shadow-[0px_0px_26px_#00000029] w-full md:hidden">
                <TableData>{moderator.firstName}</TableData>
                <TableData>{moderator.lastName}</TableData>
                {/* <TableData>{moderator.email}</TableData>
                <TableData>{formatDate(moderator.joinedOn)}</TableData>
                <TableData>{"filled"}</TableData> */}
                <td className="flex justify-between items-center gap-2 relative">
                  <Button
                    variant="primary"
                    className="w-7 text-center text-[12px] rounded-xl py-1"
                    onClick={(event) => toggleModal(event, moderator)}
                  >
                    <BsThreeDotsVertical />
                  </Button>
                  {isModalOpen && currentModerator === moderator && (
                    <div
                      ref={modalRef}
                      className="absolute top-12 right-10 z-10 bg-white shadow-lg rounded-md overflow-hidden"
                    >
                      <button
                        className="flex items-center justify-start px-4 py-2 w-full text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => handleModeratorOpenModal(moderator)}
                      >
                        <FaUser className="mr-2" /> View
                      </button>
                      <button
                        className="flex items-center justify-start px-4 py-2 w-full text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => handleEditModeratorOpenModal(moderator)}
                      >
                        <RiPencilFill className="mr-2" /> Edit
                      </button>
                      <button
                        className=" hidden md:flex items-center justify-start px-4 py-2 w-full text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => handleDeleteModerator(moderator._id)}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </td>
              </tr>
              <tr key={index} className="shadow-[0px_0px_26px_#00000029] w-full  md:grid hidden grid-cols-6 ">
                <TableData>{moderator.firstName}</TableData>
                <TableData>{moderator.lastName}</TableData>
                <TableData>{moderator.email}</TableData>
                <TableData>{formatDate(moderator.joinedOn)}</TableData>
                <TableData>{"filled"}</TableData>
                <td className="flex justify-between items-center gap-2 relative">
                  <Button
                    variant="primary"
                    className="w-16 text-center text-[12px] rounded-xl py-1"
                    onClick={(event) => toggleModal(event, moderator)}
                  >
                    <BsThreeDotsVertical />
                  </Button>
                  {isModalOpen && currentModerator === moderator && (
                    <div
                      ref={modalRef}
                      className="absolute top-12 right-10 z-10 bg-white shadow-lg rounded-md overflow-hidden"
                    >
                      <button
                        className="flex items-center justify-start px-4 py-2 w-full text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => handleModeratorOpenModal(moderator)}
                      >
                        <FaUser className="mr-2" /> View
                      </button>
                      <button
                        className="flex items-center justify-start px-4 py-2 w-full text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => handleEditModeratorOpenModal(moderator)}
                      >
                        <RiPencilFill className="mr-2" /> Edit
                      </button>
                      <button
                        className="flex items-center justify-start px-4 py-2 w-full text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => handleDeleteModerator(moderator.id)}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </td>
              </tr>
              </>
            ))}
          </tbody>
        </table>
      </div>
      <div className="pagination flex justify-center mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 border border-gray-300 rounded-md mr-2"
        >
          Previous
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`px-3 py-1 border border-gray-300 rounded-md ${
              index + 1 === currentPage ? 'bg-gray-300' : ''
            }`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 border border-gray-300 rounded-md ml-2"
        >
          Next
        </button>
      </div>

      {/* View Moderator Modal */}
      {isModeratorModalOpen && (
        <ViewModeratorModal
          isOpen={isModeratorModalOpen}
          onClose={handleModeratorCloseModal}
          user={currentModerator}
        />
      )}

      {/* Edit Moderator Modal */}
      {isEditModeratorModalOpen && (
        <EditModeratorModal
        handleDeleteModerator={handleDeleteModerator}
          isOpen={isEditModeratorModalOpen}
          onClose={handleEditModeratorCloseModal}
          user={currentModerator}
          onsave={handleSaveModerator}
        />
      )}
    </div>
  );
};

export default ModeratorTable;
