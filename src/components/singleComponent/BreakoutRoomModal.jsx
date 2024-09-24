import React, { useEffect, useState } from 'react';
import HeadingBlue25px from '../shared/HeadingBlue25px';
import InputField from '../shared/InputField';
import Dropdown from '../shared/Dropdown';
import Button from '../shared/Button';
import { IoTrashSharp } from 'react-icons/io5';
import { breakoutRoomParticipant, language } from '@/constant/Index';
import FormDropdownLabel from '../shared/FormDropdownLabel';
import HeadingLg from '../shared/HeadingLg';
import ParagraphLg from '../shared/ParagraphLg';
import axios from 'axios';

const BreakoutRoomModal = ({ onClose, formData, setFormData, roomToEdit }) => {
  const [newRoom, setNewRoom] = useState({
    name: '',
    participants: [],
    interpreter: false,
    interpreterName: '',
    interpreterEmail: '',
    interpreterLanguage: 'English',
  });

  const addParticipantToRoom = (participant) => {
    setNewRoom({
      ...newRoom,
      participants: [...newRoom.participants, participant],
    });
  };

  const removeParticipantFromRoom = (index) => {
    const updatedParticipants = newRoom.participants.filter(
      (_, i) => i !== index
    );
    setNewRoom({ ...newRoom, participants: updatedParticipants });
  };

  useEffect(() => {
    if (roomToEdit) {
      setNewRoom(roomToEdit);
    }
  }, [roomToEdit]);
  

  const handleSave = async () => {
    try {
      const response = await axios.post(`https://amplifybe-1.onrender.com/create-breakout-room'`, {
        project: "66b09e0fa55a6fb9481f7f77", // assuming you have projectId in formData
        name: newRoom.name,
        participants: newRoom.participants.map(p => p._id),
        duration: 60, // Set the duration as needed
        interpretor: newRoom.interpreter
          ? {
              name: newRoom.interpreterName,
              email: newRoom.interpreterEmail,
              language: newRoom.interpreterLanguage,
            }
          : null,
      });

      if (response.status === 201) {
        setFormData({
          ...formData,
          breakoutRooms: [...formData.breakoutRooms, response.data],
        });
        onClose();
      }
    } catch (error) {
      console.error('Error creating breakout room:', error);
    }
  };
  

  const participantsOptions = formData?.participants?.map(
    (participant) => `${participant.name} (${participant.email})`
  );

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50 ">
      <div className="bg-white rounded-lg p-8 w-full max-w-2xl overflow-y-auto h-[90%]">
      <HeadingBlue25px children={roomToEdit ? "Edit Breakout Room" : "Add Breakout Room"} />

        <div className="pt-5">
          <InputField
            label="Breakout Room Name"
            type="text"
            value={newRoom.name}
            onChange={(e) => setNewRoom({ ...newRoom, name: e.target.value })}
          />
        </div>
        <div className="w-full">
          <FormDropdownLabel children="Participants" />
          <Dropdown
            options={participantsOptions}
            selectedOption="Select Participant"
            onSelect={(option) => {
              const participant = formData?.participants?.find(
                (p) => `${p.name} (${p.email})` === option
              );
              addParticipantToRoom(participant);
            }}
            className="w-full mt-2 z-20"
          />
        </div>

        {/* Participants list div */}
        <div className="pt-5">
          <HeadingLg children="Participants List" />
          <div className="border-[0.5px] border-solid border-custom-dark-blue-1 rounded-xl h-[200px] overflow-y-scroll mt-2">
            {/* table heading */}
            <div className="flex justify-start items-center py-3 px-5 shadow-sm">
              <div className="w-[30%]">
                <HeadingLg children="Name" />
              </div>
              <div className="w-[70%]">
                <HeadingLg children="Email" />
              </div>
            </div>
            {/* table item */}
            {newRoom.participants.map((participant, index) => (
              <div
                className="flex justify-start items-center py-3 px-5 shadow-sm"
                key={index}
              >
                <div className="w-[30%]">
                  <ParagraphLg children={participant.name} />
                </div>
                <div className="w-[65%]">
                  <ParagraphLg children={participant.email} />
                </div>
                <div className="w-[5%] flex justify-end">
                  <IoTrashSharp
                    className="bg-custom-orange-1 text-white p-2 text-3xl rounded-xl cursor-pointer"
                    onClick={() => removeParticipantFromRoom(index)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* interpreter, language and name div container */}
        <div className="flex justify-start items-start gap-5 pt-4">
          {/* interpreter */}
          <div className="w-[20%]">
            <div className="flex justify-start items-center gap-2 ">
              <input
                type="checkbox"
                checked={newRoom.interpreter}
                onChange={(e) =>
                  setNewRoom({ ...newRoom, interpreter: e.target.checked })
                }
              />
              <FormDropdownLabel children="Interpreter" />
            </div>
          </div>
          {newRoom.interpreter && (
            <>
              {/* language */}
              <div className="w-[30%]">
                <FormDropdownLabel children="Language" className="mb-2" />
                <Dropdown
                  options={language}
                  selectedOption={newRoom.interpreterLanguage}
                  onSelect={(option) =>
                    setNewRoom({ ...newRoom, interpreterLanguage: option })
                  }
                  value={newRoom.interpreterLanguage}
                />
              </div>
              {/* name and email */}
              <div className="w-[50%]">
                <InputField
                  label="Name"
                  type="text"
                  value={newRoom.interpreterName}
                  onChange={(e) =>
                    setNewRoom({ ...newRoom, interpreterName: e.target.value })
                  }
                />
                <InputField
                  label="Email"
                  type="text"
                  value={newRoom.interpreterEmail}
                  onChange={(e) =>
                    setNewRoom({ ...newRoom, interpreterEmail: e.target.value })
                  }
                />
              </div>
            </>
          )}
        </div>

        <div className="flex justify-end mt-4 gap-5">
          <Button
            type="button"
            variant="cancel"
            children="Cancel"
            className="px-5 py-1 rounded-xl"
            onClick={onClose}
          />
          <Button
            type="button"
            variant="save"
            children="Save"
            className="px-5 py-1 rounded-xl"
            onClick={handleSave}
          />
        </div>
      </div>
    </div>
  );
};

export default BreakoutRoomModal;
