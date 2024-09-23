import React, { useEffect, useState } from "react";
import userImage from "../../../public/user.jpg";
import groupChatImage from "../../../public/group-chat.png";
import { LuArrowLeftToLine, LuArrowRightToLine } from "react-icons/lu";
import RightSidebarCloseUi from "./RightSidebarCloseUi";
import RightSidebarOpenUi from "./RightSidebarOpenUi";

const RightSidebar = ({
  observers,
  setObservers,
  isBreakoutRoom,
  setIsBreakoutRoom,
  breakoutRooms,
  setBreakoutRooms,
  observersMessages,
  userName,
  meetingId,
  sendMessageObserver,
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("observersList");
  const [currentObserver, setCurrentObserver] = useState(null);
  const [selectedChat, setSelectedChat] = useState(null);
  const [isWaiting, setIsWaiting] = useState([
    {
      name: "Brendan Steven",
      image: userImage,
    },
    {
      name: "Mark Berg",
      image: userImage,
    },
  ]);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setSelectedChat(null);
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
  const toggleModal = (event, user) => {
    const { top, left } = event.currentTarget.getBoundingClientRect();
    setModalPosition({ top, left });
    setCurrentObserver(user);
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

  const files = [{ name: "PRO FILES_01: Introduction...", size: "5.2MB" }];
  const handleSearch = () => {
    // Write search functionality here
  };

  return (
    <div
      className={`flex ${
        isSidebarOpen
          ? "w-80"
          : "md:w-24 w-5 bg-custum-meet-bg md:bg-white h-5 pr-[2rem] sm:pr-0"
      } transition-width duration-300 md:bg-white h-screen md:rounded-l-xl relative`}
    >
      {isSidebarOpen ? (
        <>
          <LuArrowRightToLine
            className="absolute top-4 left-2 text-black text-sm cursor-pointer bg-white h-6 w-6 p-1 mr-6 rounded-full md:hidden"
            onClick={toggleSidebar}
          />
          <LuArrowRightToLine
            className="absolute top-4 left-2 text-black text-sm cursor-pointer h-6 w-6 p-1"
            onClick={toggleSidebar}
          />
        </>
      ) : (
        <>
          <LuArrowLeftToLine
            className="absolute top-4 left-2 text-black text-sm cursor-pointer bg-white h-6 w-6 p-1 mr-6 rounded-full md:hidden"
            onClick={toggleSidebar}
          />
          <LuArrowLeftToLine
            className="absolute top-4 left-2 text-black text-sm cursor-pointer hidden md:block h-6 w-6 p-1"
            onClick={toggleSidebar}
          />
        </>
      )}

      <div className="flex flex-col w-full ">
        {/*  */}
        {isSidebarOpen ? (
          // If side bar open
          <RightSidebarOpenUi
            observers={observers}
            setObservers={setObservers}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            currentObserver={currentObserver}
            setCurrentObserver={setCurrentObserver}
            selectedChat={selectedChat}
            setSelectedChat={setSelectedChat}
            isWaiting={isWaiting}
            setIsWaiting={setIsWaiting}
            handleTabClick={handleTabClick}
            chatParticipants={chatParticipants}
            files={files}
            handleSearch={handleSearch}
            observersMessages={observersMessages}
            userName={userName}
            meetingId={meetingId}
            sendMessageObserver={sendMessageObserver}
          />
        ) : (
          <RightSidebarCloseUi
            observers={observers}
            setObservers={setObservers}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            currentObserver={currentObserver}
            setCurrentObserver={setCurrentObserver}
            selectedChat={selectedChat}
            setSelectedChat={setSelectedChat}
            isWaiting={isWaiting}
            setIsWaiting={setIsWaiting}
            handleTabClick={handleTabClick}
            chatParticipants={chatParticipants}
            files={files}
          />
        )}
      </div>
    </div>
  );
};

export default RightSidebar;
