import React, { useEffect, useRef, useState } from "react";
import { LuClipboardSignature } from "react-icons/lu";
import { FaAngleDown, FaVideo } from "react-icons/fa";
import {
  BsChatSquareDotsFill,
  BsChatSquareFill,
  BsThreeDotsVertical,
} from "react-icons/bs";
import HeadingLg from "../shared/HeadingLg";
import Search from "../singleComponent/Search";
import { IoMdMic } from "react-icons/io";
import { IoClose, IoRemoveCircle, IoSend } from "react-icons/io5";
import { MdInsertEmoticon, MdMoveDown } from "react-icons/md";
import RemoveUserModal from "../singleComponent/RemoveUserModal";
import MoveToWaitingRoomModal from "../singleComponent/MoveToWaitingRoomModal";
import notify from "@/utils/notify";
import { PiCirclesFourFill } from "react-icons/pi";
import Button from "../shared/button";

const LeftSidebarOpenUi = ({
  users,
  setUsers,
  activeTab,
  setActiveTab,
  currentUser,
  setCurrentUser,
  selectedChat,
  setSelectedChat,
  isWaiting,
  setIsWaiting,
  handleTabClick,
  chatParticipants,
  role,
  toggleWhiteBoard,
  toggleRecordingButton,
  isBreakoutRoom,
  setIsBreakoutRoom,
  breakoutRooms,
  setBreakoutRooms,
  handleBreakoutRoomChange,
  selectedRoom,
  setSelectedRoom,
  waitingRoom,
  acceptParticipant,
  messages,
  sendMessageParticipant,
  userName,
  meetingId,
  removeParticipant,
  isStreaming,
  setStartStreaming
}) => {
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
  const [isMoveModalOpen, setIsMoveModalOpen] = useState(false);
  const [isModeratorPopupModalOpen, setIsModeratorPopupModalOpen] =
    useState(false);
  const [userToRemove, setUserToRemove] = useState(null);
  const [userToMove, setUserToMove] = useState(null);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const [inputMessage, setInputMessage] = useState("");
// this for handling the message input
  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      const newMessage = {
        meetingId: meetingId,
        senderName: userName,
        receiverName: selectedChat.name,
        message: inputMessage.trim(),
      };

      sendMessageParticipant(newMessage);
      setInputMessage("");
    }
  };

  const modalRef = useRef();

  const handleSearch = () => {
    // Write search functionality here
  };
  const [selectedReceiverId, setSelectedReceiverId] = useState(null);

  const handleUserClick = (userId) => {
    setSelectedReceiverId(userId);
  };
  const toggleRemoveAndWaitingOptionModal = (event, user) => {
    const { top, left } = event.currentTarget.getBoundingClientRect();
    setModalPosition({ top, left });
    setCurrentUser(user);
    setUserToRemove(user);
    setIsModeratorPopupModalOpen(!isModeratorPopupModalOpen);
  };

  const openRemoveUserModal = (event, user) => {
    setUserToRemove(user);
    setIsRemoveModalOpen(true);
  };
  const closeRemoveUserModal = () => {
    setIsRemoveModalOpen(false);
  };

  const openMoveUserModal = (event, user) => {
    setUserToMove(user);
    setIsMoveModalOpen(true);
  };
  const closeMoveUserModal = () => {
    setIsMoveModalOpen(false);
  };

  const closeModal = () => {
    setIsModeratorPopupModalOpen(false);
  };

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      closeModal();
    }
  };

  useEffect(() => {
    if (isModeratorPopupModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModeratorPopupModalOpen]);

  const handleRemoveUser = (userId) => {
    const userName = users?.find((user) => user._id === userId);
    removeParticipant(userName.name, userName.role, meetingId);
    notify("success", "Success", `${userName.name} has been removed`);

    // setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    setIsRemoveModalOpen(false);
  };

  const handleMoveUser = (userId) => {
    const userName = users?.find((user) => user.id === userId);
    notify(
      "success",
      "Success",
      `${userName.name} has been moved to the waiting room`
    );
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    setIsMoveModalOpen(false);
  };

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSelect = (option) => {
    handleBreakoutRoomChange(option.roomName);
    setSelectedRoom(option);
    setIsDropdownOpen(false);
  };

  return (
    <>
      {isBreakoutRoom && role !== "Participant" ? (
        <div className=" flex-col flex-grow px-4 pb-2 pt-4 bg-custom-gray-8 mb-4 rounded-xl overflow-y-auto mx-4 mt-16 hidden md:flex">
          {/* top heading */}

          <div className="flex items-center justify-between">
            <div className="flex justify-start items-center gap-1">
              <PiCirclesFourFill className="text-custom-orange-1 text-xs" />
              <h1 className="text-xs font-bold">{selectedRoom.roomName}</h1>
            </div>
            <div className="flex justify-end items-center gap-1">
              <PiCirclesFourFill className="text-custom-orange-1 text-xs" />
              <h1 className="text-xs font-bold">
                {selectedRoom.participants.length}
              </h1>
            </div>
          </div>

          {/* Dropdown */}
          <div className={`relative w-full py-5`}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className={`px-4 py-1 sm:py-2 rounded-xl flex items-center justify-between  text-white bg-[#2976a5] font-semibold w-full`}
            >
              {selectedRoom?.roomName}
              <FaAngleDown
                className={`ml-2 transform transition-transform duration-200 ${
                  isDropdownOpen ? "rotate-180" : "rotate-0"
                }`}
              />
            </button>
            {isDropdownOpen && (
              <ul
                className={`absolute left-0 text-xs bg-white rounded-lg shadow-[0px_3px_6px_#00000029] text-custom-dark-blue-1 font-semibold w-full`}
              >
                {breakoutRooms.map((option, index) => (
                  <li
                    key={index}
                    onClick={() => handleSelect(option)}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                  >
                    {option.roomName}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="flex-grow overflow-y-auto">
            <h1 className="font-bold pb-3 text">Participants List</h1>
            {users?.map((user) => (
              <div
                className="flex justify-start items-center gap-2 py-1"
                key={user?.name}
              >
                {/* <Image
                  src={user.image}
                  alt="user image"
                  height={40}
                  width={40}
                  className="rounded-2xl border-[3px] border-white border-solid"
                /> */}
                <p className="text-[#1a1a1a] text-sm flex-grow">{user?.name}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className=" md:pt-0 pt-16">
          {/* Whiteboard and local recording */}
          <div className=" lg:pt-10 px-4">
            <Button
              children="Whiteboard"
              variant="meeting"
              type="submit"
              className="w-full py-2 rounded-xl !justify-start pl-2 mb-2"
              icon={
                <LuClipboardSignature className="bg-[#fcd860] p-1 text-white text-2xl rounded-md font-bold" />
              }
              onClick={toggleWhiteBoard}
            />
            <Button
              children="Local Recording"
              variant="meeting"
              type="submit"
              className="w-full py-2 rounded-xl !justify-start pl-2 mb-2"
              icon={
                <FaVideo className="bg-custom-orange-1 p-1 text-white text-2xl rounded-md font-bold" />
              }
              onClick={toggleRecordingButton}
            />
            {
              role === "Moderator" && !isStreaming && (
                <Button
                  children="Start Streaming"
                  variant="meeting"
                  type="submit"
                  className="w-full py-2 rounded-xl !justify-start pl-2 mb-2"
                  onClick={() => setStartStreaming(meetingId)}
                />
              )
            }

          </div>

          {/* Backroom chat and icon */}
          <div className="flex justify-start items-center gap-2 lg:py-4 mx-4 pt-10 sm:pt-20">
            <BsChatSquareFill className="text-custom-dark-blue-1" />
            <HeadingLg children="BACKROOM CHAT" />
          </div>

          {/* chat container */}
          <div className="flex flex-col flex-grow px-4 pb-2 pt-4 bg-custom-gray-8 mb-4 rounded-xl overflow-y-auto max-h-[300px] mx-4">
            <div className="flex justify-center items-center gap-2 pb-2 ">
              <Button
                children="Participants List"
                variant="default"
                type="submit"
                className={`w-full py-2 rounded-xl pl-2  text-[10px] text-center px-1  ${
                  activeTab === "participantList"
                    ? "shadow-[0px_4px_6px_#1E656D4D]"
                    : "bg-custom-gray-8 border-2  border-custom-teal !text-custom-teal "
                }  `}
                onClick={() => handleTabClick("participantList")}
              />
              <div className="w-full relative">
                <Button
                  children="Participants Chat"
                  variant="default"
                  type="submit"
                  className={`w-full py-2 rounded-xl pl-2  text-[10px] text-center px-1  ${
                    activeTab === "participantChat"
                      ? "shadow-[0px_4px_6px_#1E656D4D]"
                      : "bg-custom-gray-8 border-2  border-custom-teal !text-custom-teal "
                  }  `}
                  onClick={() => handleTabClick("participantChat")}
                />
                <div className="absolute -top-1 -right-1 w-3 h-3 rounded-lg bg-[#ff2b2b] shadow-[0px_1px_3px_#00000036]"></div>
              </div>
            </div>

            {/* participants container */}

            {/* participants list */}
            {activeTab === "participantList" && (
              <div className="flex-grow pt-2">
                <Search
                  placeholder="Search Name"
                  onSearch={handleSearch}
                  inputClassName="!bg-[#F3F4F5] !rounded-xl "
                  iconClassName="!bg-[#EBEBEB]"
                />
                {/* participant container */}
                {/* !selectedChat &&
              users
                ?.filter((user) => user.name !== userName)
                .map((user) */}
                {users?.filter((user) => user.name !== userName)               
                .map((user) => (
                  <div
                    className="flex justify-center items-center gap-2 py-1"
                    key={user?.name}
                  >
                  
                    <p className="text-[#1a1a1a] text-[10px] flex-grow">
                      {user?.name}
                    </p>
                    <IoMdMic />
                    <BsChatSquareDotsFill
                      onClick={() => handleUserClick(user?.id)}
                    />
                    {
                      role === "Moderator" && (
                        <BsThreeDotsVertical
                      onClick={(event) =>
                        toggleRemoveAndWaitingOptionModal(event, user)
                      }
                      className="cursor-pointer"
                    />
                      )
                    }
                  </div>
                ))}
                {isModeratorPopupModalOpen && currentUser && (
                  <div
                    ref={modalRef}
                    className="absolute bg-white shadow-[0px_3px_6px_#0000004A] rounded-lg w-44 z-20"
                    style={{
                      top: modalPosition.top + 20,
                      left: modalPosition.left - 30,
                    }}
                  >
                    <ul className="text-[12px]">
                      <li
                        className="py-2 px-2 hover:bg-gray-200 cursor-pointer text-[#697e89] flex justify-start items-center gap-2"
                        onClick={(e) => openRemoveUserModal(e, userToRemove)}
                      >
                        <IoRemoveCircle />
                        <span>Remove</span>
                      </li>
                      <li
                        className="py-2 px-2 hover:bg-gray-200 cursor-pointer text-[#697e89] flex justify-start items-center gap-2"
                        onClick={(e) => openMoveUserModal(e, currentUser)}
                      >
                        <MdMoveDown />
                        <span>Move to Waiting Room</span>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* Participant chat */}
            {activeTab === "participantChat" &&
              !selectedChat &&
              users
                ?.filter((user) => user.name !== userName)
                .map((user) => (
                  <div
                    key={user.name}
                    className="bg-custom-gray-2 p-2 flex justify-center items-center gap-2 border-b border-solid border-custom-gray-1 cursor-pointer"
                    onClick={() => setSelectedChat(user)}
                  >
                    <div className="flex-grow-1 text-xs ">
                      <p className="pb-1 font-bold">{user.name}</p>
                    </div>
                  </div>
                ))}

            {activeTab === "participantChat" && selectedChat && (
              <div className="flex-grow pt-2  rounded-xl flex flex-col justify-center items-center">
                {/* chat name and image */}
                <div className="flex w-full items-center justify-center gap-2 mb-4 bg-custom-gray-4 p-2">
                  {/* <Image
                    src={selectedChat.image}
                    alt="chat-user-image"
                    height={30}
                    width={30}
                    className="rounded-[50%]"
                  /> */}
                  <p className="text-[#1a1a1a] text-[12px] font-bold flex-1">
                    {selectedChat.name}
                  </p>
                  <IoClose
                    className="text-custom-black cursor-pointer"
                    onClick={() => setSelectedChat(null)}
                  />
                </div>
                {/* chat message */}
                <div className="flex flex-col gap-2 flex-grow">
                  {messages
                    .filter(
                      (message) =>
                        (message.senderName === selectedChat.name &&
                          message.receiverName === userName) ||
                        (message.senderName === userName &&
                          message.receiverName === selectedChat.name)
                    )
                    .map((message, index) => (
                      <div
                        key={index}
                        className={`flex items-center gap-2 ${
                          message.senderName === userName
                            ? "justify-start"
                            : "justify-end"
                        }`}
                      >
                        <div
                          className={`flex flex-col ${
                            message.senderName === userName
                              ? "items-start"
                              : "items-end"
                          }`}
                        >
                          <p
                            className={`text-[12px] ${
                              message.senderName === userName
                                ? "text-blue-600"
                                : "text-green-600"
                            }`}
                          >
                            <span className="font-bold">
                              {message.senderName}:
                            </span>{" "}
                            {message.message}
                          </p>
                          <p className="text-[#1a1a1a] text-[10px]">
                            {new Date(message.createdAt).toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    ))}
                </div>

                {/* send message */}
                <div className="flex justify-between items-center gap-2 relative">
                  <input
                    type="text"
                    placeholder="Type Message"
                    className="rounded-lg py-1 px-2 placeholder:text-[10px]"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  />
                  <div className="absolute right-11 cursor-pointer">
                    <MdInsertEmoticon />
                  </div>
                  <div
                    className="py-1.5 px-1.5 bg-custom-orange-2 rounded-[50%] text-white cursor-pointer text-sm"
                    onClick={handleSendMessage}
                  >
                    <IoSend />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      {/* waiting list */}
      {waitingRoom?.length > 0 &&
        activeTab === "participantList" &&
        role === "Moderator" && (
          <div
            className="flex-grow pt-2 bg-custom-gray-8 p-4 rounded-xl mb-4 overflow-y-auto mx-4"
            key={waitingRoom?.length}
          >
            <div className="flex justify-between items-center py-2">
              <h1 className="font-bold text-sm ">
                Waiting ({waitingRoom?.length})
              </h1>
              <Button
                variant="primary"
                type="submit"
                children="Admit All"
                className="text-xs px-2 py-1 rounded-lg text-white"
                onClick={() =>
                  waitingRoom?.forEach((participant) =>
                    acceptParticipant(participant)
                  )
                }
              />
            </div>
            {/* participant container */}
            {waitingRoom?.map((user) => (
              <div
                className="flex justify-center items-center gap-2 py-1"
                key={user?.name}
              >
            
                <p className="text-[#1a1a1a] text-[10px] flex-grow">
                  {user?.name}
                </p>
                <div className="flex justify-center items-center gap-1">
                  <Button
                    variant="primary"
                    type="submit"
                    children="Admit"
                    className="text-xs px-2 py-1 rounded-lg text-white"
                    onClick={() => acceptParticipant(user)}
                  />
                  <Button
                    type="submit"
                    children="Remove"
                    className="text-xs px-2 py-1 rounded-lg text-white"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      {/* {selectedReceiverId && (
        <ChatDashboard  receiverId={selectedReceiverId} users={users}/>
      )} */}
      {isRemoveModalOpen && (
        <RemoveUserModal
          onClose={closeRemoveUserModal}
          handleRemoveUser={() => handleRemoveUser(userToRemove._id)}
          userToRemove={userToRemove}
        />
      )}
      {isMoveModalOpen && (
        <MoveToWaitingRoomModal
          onClose={closeMoveUserModal}
          handleMoveUser={() => handleMoveUser(userToMove.id)}
          userToMove={userToMove}
        />
      )}
    </>
  );
};

export default LeftSidebarOpenUi;
