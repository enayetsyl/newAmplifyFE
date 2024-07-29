"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  LuArrowLeftToLine,
  LuArrowRightToLine,
  LuClipboardSignature,
} from "react-icons/lu";
import { FaUser, FaVideo } from "react-icons/fa";
import {
  BsChatSquareFill,
  BsChatSquareDotsFill,
  BsThreeDotsVertical,
} from "react-icons/bs";
import { IoMdMic, IoMdMicOff } from "react-icons/io";
import { HiUserGroup } from "react-icons/hi2";
import { FaFaceGrin } from "react-icons/fa6";
import Button from "../shared/button";
import HeadingLg from "../shared/HeadingLg";
import Search from "../singleComponent/Search";
import Image from "next/image";
import userImage from "../../../public/user.jpg";
import groupChatImage from "../../../public/group-chat.png";
import { RiPencilFill } from "react-icons/ri";
import { IoRemoveCircle } from "react-icons/io5";
import { IoClose, IoSend } from "react-icons/io5";
import InputField from "../shared/InputField";
import { MdInsertEmoticon } from "react-icons/md";


const LeftSidebar = ({ users, setUsers }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("participantChat");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedChat, setSelectedChat] = useState({
    id: 1,
    name: "Group Chat",
    image: groupChatImage,
    messagePreview: "Johnny Silver: Good morning!",
    time: "9:31",
    unreadCount: 4,
    type: "group",
    messages: [
      { sender: "Johnny Silver", content: "Good morning!", time: "9:30 PM" },
      {
        sender: "Rebecca Nitin",
        content: "Always fun to follow up",
        time: "9:31 PM",
      },
      {
        sender: "Raina Smith",
        content: "Always fun to follow up on the question by watching",
        time: "9:31 PM",
      },
    ],
  });
  const modalRef = useRef();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setSelectedChat(null);
  };

  const handleSearch = () => {
    // Write search functionality here
  };

  const toggleModal = (event, user) => {
    const { top, left } = event.currentTarget.getBoundingClientRect();
    setModalPosition({ top, left });
    setCurrentUser(user);
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

  useEffect(() => {
    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen]);

  const handleRemoveUser = (userId) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
  };

  const chatParticipants = [
    {
      id: 1,
      name: "Group Chat",
      image: groupChatImage,
      messagePreview: "Johnny Silver: Good morning!",
      time: "9:31",
      unreadCount: 4,
      type: "group",
      messages: [
        { sender: "Johnny Silver", content: "Good morning!", time: "9:30 PM" },
        {
          sender: "Rebecca Nitin",
          content: "Always fun to follow up",
          time: "9:31 PM",
        },
        {
          sender: "Raina Smith",
          content: "Always fun to follow up on the question by watching",
          time: "9:31 PM",
        },
      ],
    },
    {
      id: 2,
      name: "Victoria Armstrong",
      image: userImage,
      messagePreview: "Always fun to follow up",
      time: "9:31",
      unreadCount: 1,
      type: "individual",
      messages: [
        {
          sender: "Victoria Armstrong",
          content: "Always fun to follow up",
          time: "9:31 PM",
        },
      ],
    },
    {
      id: 3,
      name: "Raina Smith",
      image: userImage,
      messagePreview: "Always fun to follow up",
      time: "9:31",
      unreadCount: 1,
      type: "individual",
      messages: [
        {
          sender: "Raina Smith",
          content: "Always fun to follow up",
          time: "9:31 PM",
        },
      ],
    },
    {
      id: 4,
      name: "Rebecca Nitin",
      image: userImage,
      messagePreview: "Always fun to follow up",
      time: "9:30",
      unreadCount: 0,
      type: "individual",
      messages: [
        {
          sender: "Rebecca Nitin",
          content: "Always fun to follow up",
          time: "9:31 PM",
        },
        { sender: "Johnny Silver", content: "Good morning!", time: "9:30 PM" },
      ],
    },
  ];

  return (
    <div
      className={`flex ${
        isSidebarOpen ? "w-72" : "w-16"
      } transition-width duration-300 bg-white h-screen rounded-r-xl relative px-4`}
    >
      {isSidebarOpen ? (
        <LuArrowLeftToLine
          className="absolute top-4 right-2 text-black text-sm cursor-pointer "
          onClick={toggleSidebar}
        />
      ) : (
        <LuArrowRightToLine
          className="absolute top-4 right-2 text-black text-sm cursor-pointer "
          onClick={toggleSidebar}
        />
      )}

      <div className="flex flex-col w-full ">
        {/*  */}
        {isSidebarOpen && (
          // If side bar open
          <>
            {/* Whiteboard and local recording */}
            <div className=" pt-16">
              <Button
                children="Whiteboard"
                variant="meeting"
                type="submit"
                className="w-full py-2 rounded-xl !justify-start pl-2 mb-2"
                icon={
                  <LuClipboardSignature className="bg-[#fcd860] p-1 text-white text-2xl rounded-md font-bold" />
                }
              />
              <Button
                children="Local Recording"
                variant="meeting"
                type="submit"
                className="w-full py-2 rounded-xl !justify-start pl-2 mb-2"
                icon={
                  <FaVideo className="bg-custom-orange-1 p-1 text-white text-2xl rounded-md font-bold" />
                }
              />
            </div>

            {/* Backroom chat and icon */}
            <div className="flex justify-start items-center gap-2 pt-5">
              <BsChatSquareFill className="text-custom-dark-blue-1" />
              <HeadingLg children="BACKROOM CHAT" />
            </div>

            {/* chat container */}
            <div className="flex flex-col flex-grow px-4 pb-2 pt-4 bg-custom-gray-8 mb-4 rounded-xl overflow-y-auto">
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
                  {/* participant continer */}
                  {users?.map((user) => (
                    <div
                      className="flex justify-center items-center gap-2 py-1"
                      key={user.id}
                    >
                      <Image
                        src={user.image}
                        alt="user image"
                        height={40}
                        width={40}
                        className="rounded-2xl border-[3px] border-white border-solid"
                      />
                      <p className="text-[#1a1a1a] text-[10px] flex-grow">
                        {user.name}
                      </p>
                      <IoMdMic />
                      <BsChatSquareDotsFill />
                      <BsThreeDotsVertical
                        onClick={(event) => toggleModal(event, user)}
                        className="cursor-pointer"
                      />
                    </div>
                  ))}
                  {isModalOpen && currentUser && (
                    <div
                      ref={modalRef}
                      className="absolute bg-white shadow-[0px_3px_6px_#0000004A] rounded-lg w-44"
                      style={{
                        top: modalPosition.top + 20,
                        left: modalPosition.left - 30,
                      }}
                    >
                      <ul className="text-[12px]">
                        <li
                          className="py-2 px-2 hover:bg-gray-200 cursor-pointer text-[#697e89] flex justify-start items-center gap-2"
                          onClick={() => handleRemoveUser(currentUser.id)}
                        >
                          <IoRemoveCircle />
                          <span>Remove</span>
                        </li>
                        <li
                          className="py-2 px-2 hover:bg-gray-200 cursor-pointer text-[#697e89] flex justify-start items-center gap-2"
                          //  onClick={() => handleEditModeratorOpenModal(currentModerator)}
                        >
                          <MdMoveDown />
                          <span>Move to Waiting Room</span>
                        </li>
                      </ul>
                    </div>
                  )}

                  <div>
                    <h3 className="text-white">Waiting</h3>
                    {/* Add waiting list content here */}
                  </div>
                </div>
              )}

              {/* Participant chat */}

              {/* Participant chat */}
              {activeTab === "participantChat" &&
                !selectedChat &&
                chatParticipants.map((chat) => (
                  <div
                    key={chat.id}
                    className="bg-custom-gray-2 p-2 flex justify-center items-center gap-2 border-b border-solid border-custom-gray-1 cursor-pointer"
                    onClick={() => setSelectedChat(chat)}
                  >
                    <Image
                      src={chat.image}
                      alt="chat-user-image"
                      height={40}
                      width={40}
                      className="rounded-[50%]"
                    />
                    <div className="flex-grow-1 text-xs ">
                      <p className="pb-1 font-bold">{chat.name}</p>
                      <p
                        className={`${chat.unreadCount > 0 ? "font-bold" : ""}`}
                      >
                        {chat.messagePreview}
                      </p>
                    </div>
                    <div className="flex flex-col justify-end items-end text-xs">
                      <p className="pb-1">{chat.time}</p>
                      {chat.unreadCount > 0 && (
                        <p className="py-0.5 px-1.5 text-white bg-[#ff2b2b] rounded-[50%]">
                          {chat.unreadCount}
                        </p>
                      )}
                    </div>
                  </div>
                ))}

              {activeTab === "participantChat" && selectedChat && (
                <div className="flex-grow pt-2  rounded-xl flex flex-col justify-center items-center">
                  {/* chat name and image */}
                  <div className="flex w-full items-center justify-center gap-2 mb-4 bg-custom-gray-4 p-2">
                    <Image
                      src={selectedChat.image}
                      alt="chat-user-image"
                      height={30}
                      width={30}
                      className="rounded-[50%]"
                    />
                    <p className="text-[#1a1a1a] text-[12px] font-bold flex-1">
                      {selectedChat.name}
                    </p>
                    <IoClose className="text-custom-black cursor-pointer"
                    onClick={() => setSelectedChat(null)}
                    />
                  </div>
                  {/* chat message */}
                  <div className="flex flex-col gap-2 flex-grow">
                    {selectedChat.messages.map((message, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between gap-2"
                      >
                        <p className="text-[#1a1a1a] text-[12px] f">
                          <span className="font-bold">{message.sender}:</span>{" "}
                          {message.content}
                        </p>
                        <p className="text-[#1a1a1a] text-[10px] text-end">
                          {message.time}
                        </p>
                      </div>
                    ))}
                  </div>
                  {/* send message */}
                  <div className="flex justify-between items-center gap-2 relative">
                    <input type="text" 
                    placeholder="Type Message"
                    className="rounded-lg py-1 px-2 placeholder:text-[10px]"
                    />
                   <div className="absolute right-11 cursor-pointer">
                   <MdInsertEmoticon />
                   </div>
                  <div className="py-1.5 px-1.5 bg-custom-orange-2 rounded-[50%] text-white cursor-pointer text-sm">
                  <IoSend />
                  </div>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default LeftSidebar;
