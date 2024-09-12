import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HeadingBlue25px from '../shared/HeadingBlue25px';
import { GoPlus } from 'react-icons/go';
import Button from '../shared/button';
import BreakoutRoomModal from '../singleComponent/BreakoutRoomModal';
import EditBreakoutRoomModal from '../singleComponent/EditBreakRoomModal'; // Import the new EditBreakoutRoomModal
import { IoTrashSharp } from 'react-icons/io5';
import HeadingLg from '../shared/HeadingLg';
import { RiPencilFill } from 'react-icons/ri';
import ParagraphLg from '../shared/ParagraphLg';
import Pagination from '../shared/Pagination'; // Make sure to import your Pagination component

const Step4 = ({ formData, setFormData }) => {
  const [isBreakoutRoomModalOpen, setIsBreakoutRoomModalOpen] = useState(false);
  const [isEditBreakoutRoomModalOpen, setIsEditBreakoutRoomModalOpen] = useState(false); // State for the edit modal
  const [selectedBreakoutRoomId, setSelectedBreakoutRoomId] = useState(null); // State for selected breakout room ID
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch breakout rooms from the API
  useEffect(() => {
    const fetchBreakoutRooms = async () => {
      try {
        const response = await axios.get(`http://localhost:8008/get-all-breakout-rooms`, {
          params: { page: 1, limit: 10 },
        });
        setFormData((prevData) => ({
          ...prevData,
          breakoutRooms: response.data.breakoutRooms,
        }));
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchBreakoutRooms();
  }, [setFormData]);

  const handleOpenBreakoutModal = () => {
    // setRoomToEdit(null); // Reset roomToEdit to null when adding a new room
    setIsBreakoutRoomModalOpen(true);
  };

  const handleCloseBreakoutModal = () => {
    setIsBreakoutRoomModalOpen(false);
  };

  const handleOpenEditBreakoutRoomModal = (id) => {
    setSelectedBreakoutRoomId(id);
    setIsEditBreakoutRoomModalOpen(true);
  };

  const handleCloseEditBreakoutRoomModal = () => {
    setSelectedBreakoutRoomId(null);
    setIsEditBreakoutRoomModalOpen(false);
  };

  const removeBreakoutRoom = async (index) => {
    const roomToDelete = formData.breakoutRooms[index];
    try {
      await axios.delete(`http://localhost:8008/delete-breakout-room/${roomToDelete._id}`);
      const updatedBreakoutRooms = formData.breakoutRooms.filter(
        (_, i) => i !== index
      );
      setFormData({ ...formData, breakoutRooms: updatedBreakoutRooms });
    } catch (error) {
      setError(error.message);
    }
  };

  const editBreakoutRoom = (id) => {
    handleOpenEditBreakoutRoomModal(id);
  };

  return (
    <div>
      <HeadingBlue25px children="Breakout Rooms" />
      <div className="flex justify-end">
        <Button
          type="button"
          variant="save"
          children="Add New"
          className="py-1 px-5 shadow-[0px_3px_6px_#09828F69] rounded-xl"
          icon={<GoPlus />}
          onClick={handleOpenBreakoutModal}
        />
      </div>
      <div className="flex justify-start items-center px-3">
        <div className='w-[25%]'> 
          <HeadingLg children="Name" />
        </div>
        <div className='w-[20%]'>
          <HeadingLg children="Participants" />
        </div>
        <div className='w-[55%]'>
          <HeadingLg children="Interpreter" />
        </div>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && formData.breakoutRooms.map((room, index) => (
        <div key={index} className="py-3">
          <div className="flex justify-start items-center bg-white rounded-xl shadow-[0px_0px_6px_#00000029] p-3">
            <ParagraphLg className='w-[25%]'>{room.name}</ParagraphLg>
            <ParagraphLg className='w-[20%]'>{room.participants.length}</ParagraphLg>
            <ParagraphLg className='w-[50%]'>{room.interpretor.name}</ParagraphLg>
            <div className="flex justify-end space-x-2 w-[5%]">
              <button onClick={() => editBreakoutRoom(room._id)}>
                <RiPencilFill className='bg-custom-teal text-white p-2 text-3xl rounded-xl cursor-pointer' />
              </button>
              <button onClick={() => removeBreakoutRoom(index)}>
                <IoTrashSharp className='bg-custom-orange-1 text-white p-2 text-3xl rounded-xl cursor-pointer' />
              </button>
            </div>
          </div>
        </div>
      ))}
      {/* Pagination */}
      <div className="flex justify-end py-2">
      {/* {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )} */}
      </div>
      {isBreakoutRoomModalOpen && (
        <BreakoutRoomModal
          onClose={handleCloseBreakoutModal}
          formData={formData}
          setFormData={setFormData}
        />
      )}
      {isEditBreakoutRoomModalOpen && (
         <EditBreakoutRoomModal
          onClose={handleCloseEditBreakoutRoomModal}
          breakoutRoomId={selectedBreakoutRoomId}
        />
      )}
    </div>
  );
};

export default Step4;
