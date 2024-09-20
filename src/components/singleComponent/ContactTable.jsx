"use client";
import React, { useState, useEffect, useRef } from "react";
import Button from "../shared/button";
import TableHead from "../shared/TableHead";
import TableData from "../shared/TableData";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { RiPencilFill } from "react-icons/ri";
import ViewModeratorModal from "./ViewModeratorModal";
import EditModeratorModal from "./EditModeratorModal";
import ViewContactModal from "./ViewContactModal";
import AddContactModal from "./AddContactModal";
import { IoTrashBin } from "react-icons/io5";

const ContactTable = ({
  contacts,
  setContacts,
  currentContact,
  setCurrentContact,
  isEditing,
  setIsEditing,
}) => {
  // const [filteredModerators, setFilteredModerators] = useState([]);
  // const [searchQuery, setSearchQuery] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Number of items per page
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const [isViewContactModalOpen, setIsViewContactModalOpen] = useState(false);
  const [isEditContactModalOpen, setIsEditContactModalOpen] = useState(false);

  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  // const [inviteDetails, setInviteDetails] = useState({ firstName: '', lastName: '', email: '' });

  const modalRef = useRef();

  // useEffect(() => {
  //   filterModerators();
  // }, [searchQuery, selectedStatus, contacts]);

  // const filterModerators = () => {
  //   let results = moderators;

  //   if (searchQuery) {
  //     results = results.filter(
  //       (moderator) =>
  //         moderator.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //         moderator.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //         moderator.email.toLowerCase().includes(searchQuery.toLowerCase())
  //     );
  //   }

  //   if (selectedStatus !== 'All') {
  //     results = results.filter((moderator) => moderator.status === selectedStatus);
  //   }

  //   setFilteredModerators(results);
  // };

  // const handleSearchChange = (e) => {
  //   setSearchQuery(e.target.value);
  // };

  // const handleStatusChange = (e) => {
  //   setSelectedStatus(e.target.value);
  // };

  // const handleReload = () => {
  //   fetchModerators();
  // };

  const handleEditContactOpenModal = (contact) => {
    closeModal();
    setIsEditing(true);
    setCurrentContact(contact);
    setIsEditContactModalOpen(true);
  };

  const handleEditContactCloseModal = () => {
    setIsEditContactModalOpen(false);
  };

  const handleViewContactOpenModal = (contact) => {
    closeModal();
    setCurrentContact(contact);
    setIsViewContactModalOpen(true);
  };

  const handleViewContactCloseModal = () => {
    setIsViewContactModalOpen(false);
  };

  const toggleModal = (event, contact) => {
    const { top, left } = event.currentTarget.getBoundingClientRect();
    setModalPosition({ top, left });
    setCurrentContact(contact);
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

  const handleDeleteContact = async (contactId) => {
    try {
      const response = await fetch(
        `http://localhost:8008/api/delete/contact/${contactId}`,
        {
          method: "DELETE",
        }
      );
      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        setContacts((prevContacts) =>
          prevContacts.filter((contact) => contact._id !== contactId)
        );
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error deleting moderator:", error);
      alert("Error deleting moderator.");
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // const currentModerators = filteredModerators.slice(indexOfFirstItem, indexOfLastItem);

  // const totalPages = Math.ceil(filteredModerators.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const formatDate = (dateInput) => {
    const date = new Date(dateInput);

    const month = String(date.getMonth() + 1).padStart(2, "0"); // getMonth() is zero-based, so we add 1
    const day = String(date.getDate()).padStart(2, "0");
    const year = String(date.getFullYear()).slice(-2); // Get last two digits of the year

    return `${month}, ${day}, ${year}`;
  };

  return (
    <div className=" px-2 md:px-10 pt-10 w-full min-h-80">
      <div className="border-[0.5px] border-custom-dark-blue-1 rounded-xl overflow-x-auto w-full">
        <table className="min-w-full divide-y divide-gray-200 rounded-lg w-full ">
          <thead className="bg-custom-gray-2 rounded-lg py-2 w-full">
            <tr className="shadow-[0px_0px_26px_#00000029] w-full">
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Added Date</TableHead>
              <TableHead>Last Updated On</TableHead>
              <TableHead>Actions</TableHead>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 rounded-lg w-full">
            {contacts?.map((contact, index) => (
              <tr
                key={contact._id}
                className="shadow-[0px_0px_26px_#00000029] w-full "
              >
                <TableData>
                  {contact.firstName} {contact.lastName}
                </TableData>
                <TableData>{contact.email}</TableData>
                <TableData>{contact.companyName}</TableData>
                <TableData>
                  {contact?.roles?.length > 0
                    ? contact.roles.join(", ")
                    : "No roles assigned"}
                </TableData>

                <TableData>{formatDate(contact.addedDate)}</TableData>
                <TableData>{formatDate(contact.lastUpdatedOn)}</TableData>
                <td className="flex justify-between items-center gap-2 relative py-2">
                  <Button
                    variant="primary"
                    className="w-16 text-center text-[12px] rounded-xl py-1"
                    onClick={(event) => toggleModal(event, contact)}
                  >
                    <BsThreeDotsVertical />
                  </Button>
                  {isModalOpen && currentContact === contact && (
                    <div
                      ref={modalRef}
                      className="absolute top-2 right-12 z-50 bg-white shadow-lg rounded-md overflow-hidden"
                    >
                      <button
                        className="flex items-center justify-start px-4 py-2 w-full text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => handleViewContactOpenModal(contact)}
                      >
                        <FaUser className="mr-2" /> View
                      </button>
                      <button
                        className="flex items-center justify-start px-4 py-2 w-full text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => handleEditContactOpenModal(contact)}
                      >
                        <RiPencilFill className="mr-2" /> Edit
                      </button>
                      <button
                        className="flex items-center justify-start px-4 py-2 w-full text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => handleDeleteContact(contact._id)}
                      >
                        <IoTrashBin className="mr-2" /> Delete
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* <div className="pagination flex justify-center mt-4">
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
      </div> */}

      {/* View Contact Modal */}
      {isViewContactModalOpen && (
        <ViewContactModal
          user={currentContact}
          onClose={handleViewContactCloseModal}
        />
      )}

      {/* Edit Moderator Modal */}
      {isEditContactModalOpen && (
        <AddContactModal
          onClose={handleEditContactCloseModal}
          contactToEdit={currentContact}
          isEditing={isEditing}
        />
      )}
    </div>
  );
};

export default ContactTable;
