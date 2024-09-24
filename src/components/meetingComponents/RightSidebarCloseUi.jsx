import React from "react";
import Button from "../shared/Button";
import { LuClipboardSignature } from "react-icons/lu";
import { FaEye, FaFolder, FaTrash, FaVideo } from "react-icons/fa";
import { BsChatSquareFill } from "react-icons/bs";
import { MdMoveDown } from "react-icons/md";
import Image from "next/image";
import { IoIosDocument } from "react-icons/io";

const RightSidebarCloseUi = ({
  observers,
  setObservers,
  activeTab,
  setActiveTab,
  currentObserver,
  setCurrentObserver,
  selectedChat,
  setSelectedChat,
  isWaiting,
  setIsWaiting,
  handleTabClick,
  chatParticipants,
  files,
}) => {
  return (
    <>
      {/* Backroom chat and icon */}
      <div className=" flex-col justify-center items-center gap-2 pt-10  lg:pb-2 px-2 hidden md:flex">
        <div className="bg-custom-black flex justify-center items-center gap-1 px-2 py-1 rounded-xl text-[10px]">
          <FaEye className="text-custom-orange-1" />
          <p className=" text-white">Viewers</p>
          <p className=" text-white">{observers.length}</p>
        </div>
        <BsChatSquareFill className="text-custom-dark-blue-1" />
      </div>

      {/* chat container */}
      <div className="hidden sm:flex flex-col pb-2 pt-4 bg-custom-gray-8 mb-2 rounded-xl overflow-y-auto mx-1">
        {/* Tab buttons */}
        <div className="flex flex-col justify-center items-center gap-2 pb-2 px-2 ">
          <Button
            children="Observers List"
            variant="default"
            type="submit"
            className={`w-full py-2 rounded-xl  text-[8px] text-center px-0.5  ${
              activeTab === "observersList"
                ? "shadow-[0px_4px_6px_#1E656D4D]"
                : "bg-custom-gray-8 border  border-custom-teal !text-custom-teal "
            }  `}
            onClick={() => handleTabClick("observersList")}
          />
          <div className="w-full relative">
            <Button
              children="Observers Chat"
              variant="default"
              type="submit"
              className={`w-full py-2 rounded-xl text-[8px] text-center px-0.5  ${
                activeTab === "observersChat"
                  ? "shadow-[0px_4px_6px_#1E656D4D]"
                  : "bg-custom-gray-8 border  border-custom-teal !text-custom-teal "
              }  `}
              onClick={() => handleTabClick("observersChat")}
            />
            <div className="absolute -top-1 right-1 w-2 h-2 rounded-lg bg-[#ff2b2b] shadow-[0px_1px_3px_#00000036]"></div>
          </div>
        </div>

        {/* observers container */}

        {/* observers list */}
        {activeTab === "observersList" && (
          <div className="flex-grow pt-2 overflow-y-auto">
            {/* observers container */}
            {observers?.map((observer) => (
              <div
                className="flex justify-center items-center gap-2 py-1"
                key={observer.id}
              >
                <Image
                  src={observer.image}
                  alt="observer image"
                  height={40}
                  width={40}
                  className="rounded-2xl border-[3px] border-white border-solid"
                />
              </div>
            ))}
          </div>
        )}

        {/* Observer chat */}
        {activeTab === "observersChat" &&
          !selectedChat &&
          chatParticipants.map((chat) => (
            <div
              key={chat.id}
              className="bg-custom-gray-2 p-2 flex justify-center items-center gap-2 border-b border-solid border-custom-gray-1 cursor-pointer relative"
              onClick={() => setSelectedChat(chat)}
            >
              <Image
                src={chat.image}
                alt="chat-user-image"
                height={40}
                width={40}
                className="rounded-[50%]"
              />

              {chat.unreadCount > 0 && (
                <p className="py-0.5 px-1 text-white bg-[#ff2b2b] rounded-[50%] absolute top-1 right-5 text-[8px]">
                  {chat.unreadCount}
                </p>
              )}
            </div>
          ))}
      </div>

      <div className="mb-2 hidden md:flex">
        {/* heading */}
        <div className="flex flex-col justify-center items-center pb-2 space-y-2 ">
          <IoIosDocument className="text-custom-dark-blue-1 text-xl" />

          <Button
            children="Upload File"
            variant="primary"
            type="submit"
            className="bg-custom-orange-1 text-white rounded-xl py-1 px-2 text-[12px]"
          />
        </div>
        {/* Upload file div */}
        <div className="bg-custom-gray-8 rounded-xl mx-1 p-1 overflow-y-auto">
          {/* title */}
          <div className="flex justify-between items-center border-b border-solid border-custom-gray-3 pb-1">
            <p className="text-[10px] text-custom-gray-3">Name</p>
          </div>
          {/* files */}
          <div className="flex items-center justify-between bg-gray-200 py-3 rounded">
            <div className="flex items-center space-x-1">
              <FaFolder className="h-2 w-2 text-custom-gray-3" />
              <span className="text-[10px]  text-custom-gray-3 truncate w-12">
                {files[0].name}
              </span>
            </div>
       
          </div>
        </div>
      </div>
    </>
  );
};

export default RightSidebarCloseUi;
