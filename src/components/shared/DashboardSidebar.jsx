"use client";
import React, { useEffect, useRef, useState } from "react";
import Logo from "./Logo";
import { FaListAlt } from "react-icons/fa";
import { MdOutlinePets } from "react-icons/md";
import userImage from "../../../public/user.jpg";
import Image from "next/image";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import LogoutModal from "../singleComponent/LogoutModal";
import Link from "next/link";
import { useGlobalContext } from "@/context/GlobalContext";

const DashboardSidebar = ({
  handleLogoutModalOpen,
  isLogoutModalOpen,
  user,
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  console.log('user', user)
  const modalRef = useRef(null);

  const handleModalOpen = () => {
    setIsModalOpen(!isModalOpen);
  };
  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (modalRef.current && !modalRef.current.contains(event.target)) {
  //       setIsModalOpen(false);
  //     }
  //   };

  //   if (isModalOpen) {
  //     document.addEventListener("mousedown", handleClickOutside);
  //   } else {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   }

  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, [isModalOpen]);

  return (
    <>
      <div className="md:hidden fixed top-4 left-4 z-30">
        <FaBars
          className="text-custom-dark-blue-1 h-6 w-6 cursor-pointer"
          onClick={handleSidebarToggle}
        />
      </div>
      <div className={`${isSidebarOpen ? "block" : "hidden"} md:block hidden `}>
        <div className="w-[260px] min-h-screen h-full dashboard_sidebar_bg  flex flex-col justify-center items-center">
          <div className="py-10 ">
            <Logo />
          </div>
          <div className=" flex-grow">
            <Link href="/dashboard/project">
              <div className="flex justify-start items-center gap-3">
                <FaListAlt className="text-base text-[#6A7E88]" />
                <p className="text-base text-[#6A7E88] font-semibold">
                  Projects
                </p>
              </div>
            </Link>
            <Link href="/dashboard/contacts">
              <div className="flex justify-center items-center gap-3 pt-5">
                <MdOutlinePets className="text-base text-[#6A7E88]" />
                <p className="text-base text-[#6A7E88] font-semibold">
                  Contacts
                </p>
              </div>
            </Link>
          </div>
          <div className="w-[240px] mx-auto">
            <div className="flex justify-center items-center gap-2 bg-[#f1f1f1]  h-20 border-white rounded-lg bg-opacity-70 user_info_div_shadow mb-6 relative pl-2">
              {/* image */}
              <Image
                src={userImage}
                alt="user image"
                height={40}
                width={40}
                className="rounded-full"
              />
              {/* name and email */}
              <div>
                <p className="text-custom-dark-blue-1 font-bold text-base">
                  {user?.firstName} {user?.lastName}
                </p>
                <p className="text-[11px]  text-custom-dark-blue-1">
                  {user?.email}
                </p>
              </div>
              {/* icon */}
              <BsThreeDotsVertical
                className="text-custom-dark-blue-1 cursor-pointer"
                onClick={handleModalOpen}
              />

              {/* modal */}
              <div
                ref={modalRef}
                className={`absolute   bottom-12 -right-24 z-50 bg-white rounded-lg h-[90px] w-[125px] profile_dropdown_shadow  flex-col justify-center items-start px-3 gap-4  ${
                  isModalOpen ? "flex" : "hidden"
                }`}
              >
                <Link href={`/dashboard/my-profile/${user?._id}`}>
                  <div className="flex justify-start items-center gap-2 cursor-pointer">
                    <FaUser className="text-[#697e89] h-3 w-3" />
                    <p className="text-sm text-[#697e89]">My Profile</p>
                  </div>
                </Link>
                <div
                  className="flex justify-start items-center gap-2 cursor-pointer "
                  onClick={(e) => handleLogoutModalOpen(e)}
                >
                  <IoIosLogOut className="text-[#697e89] h-3 w-3" />
                  <p className="text-sm text-[#697e89]">Logout</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="block md:hidden">
        {/* Hamburger Icon for smaller screens */}
        <div className="md:hidden fixed top-4 left-4 z-30">
          <FaBars
            className="text-custom-dark-blue-1 h-6 w-6 cursor-pointer"
            onClick={handleSidebarToggle}
          />
        </div>

        {/* Sidebar */}
        <div
          className={`fixed top-0 left-0 h-screen bg-white z-40 transform ${
            isSidebarOpen ? "translate-x-0 " : "-translate-x-full "
          } transition-transform duration-300 md:relative md:translate-x-0 w-[260px] dashboard_sidebar_bg flex flex-col justify-center items-center`}
        >
          {/* Sidebar Header with Close Icon */}
          <div className="flex justify-end right-6 absolute top-4">
            <AiOutlineClose
              size={30}
              className="text-[#6A7E88] cursor-pointer"
              onClick={handleSidebarToggle}
            />
          </div>
          <div className="w-full flex justify-between items-center py-10 px-4">
            <Logo />
          </div>

          {/* Sidebar Links */}
          <div className="flex-grow">
            <Link href="/dashboard/project">
              <div className="flex justify-start items-center gap-3">
                <FaListAlt className="text-base text-[#6A7E88]" />
                <p className="text-base text-[#6A7E88] font-semibold">
                  Projects
                </p>
              </div>
            </Link>
            <Link href="/dashboard/contacts">
              <div className="flex justify-start items-center gap-3 pt-5">
                <MdOutlinePets className="text-base text-[#6A7E88]" />
                <p className="text-base text-[#6A7E88] font-semibold">
                  Contacts
                </p>
              </div>
            </Link>
          </div>

          {/* User Info Section */}
          <div className="w-[240px] mx-auto relative">
            <div className="flex justify-center items-center gap-2 bg-[#f1f1f1] h-20 border-white rounded-lg bg-opacity-70 user_info_div_shadow mb-6 relative pl-2">
              {/* User Image */}
              <Image
                src={userImage}
                alt="user image"
                height={40}
                width={40}
                className="rounded-full"
              />
              {/* Name and Email */}
              <div>
                <p className="text-custom-dark-blue-1 font-bold text-base">
                  {user?.firstName} {user?.lastName}
                </p>
                <p className="text-[11px] text-custom-dark-blue-1">
                  {user?.email}
                </p>
              </div>
              {/* Dots Icon */}
              <BsThreeDotsVertical
                className="text-custom-dark-blue-1 cursor-pointer"
                onClick={handleModalOpen}
              />
            </div>
            {isModalOpen && (
              <div className=" md:hidden absolute  bottom-20   -right-24 z-50 bg-white rounded-lg h-[90px] w-[125px] flex flex-col justify-center items-start px-3 gap-4">
                <Link href={`/dashboard/my-profile/${user?._id}`}>
                  <div className="flex justify-start items-center gap-2 cursor-pointer">
                    <FaUser className="text-[#697e89] h-3 w-3" />
                    <p className="text-sm text-[#697e89]">My Profile</p>
                  </div>
                </Link>
                <div
                  className="flex justify-start items-center gap-2 cursor-pointer "
                  onClick={(e) => handleLogoutModalOpen(e)}
                >
                  <IoIosLogOut className="text-[#697e89] h-3 w-3" />
                  <p className="text-sm text-[#697e89]">Logout</p>
                </div>
              </div>
            )}
          </div>
        </div>
        {/* {isLogoutModalOpen && <LogoutModal onClose={handleCloseLogoutModal} />} */}

        {/* Overlay for small screens when the sidebar is open */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
            onClick={handleSidebarToggle}
          ></div>
        )}
      </div>
    </>
  );
};

export default DashboardSidebar;
