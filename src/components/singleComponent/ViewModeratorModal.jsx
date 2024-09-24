import React from "react";
import Image from "next/image";
import userImage from "../../../public/user.jpg"; // replace with the path to the user's image
import { RxCrossCircled } from "react-icons/rx";
import HeadingLg from "../shared/HeadingLg";
import { FaCheckCircle } from "react-icons/fa";
import ParagraphLg from "../shared/ParagraphLg";
import Button from "../shared/Button";

const ViewModeratorModal = ({ user, onClose }) => {
  // Format the date to yy-mm-dd
  const formattedDate = new Date(user.joinedOn).toISOString().split("T")[0];

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white rounded-lg sm:w-96 sm:max-w-2xl w-full h-[80vh] mx-10 flex flex-col justify-between md:block">
        <div className="flex flex-col ">
          <div className="flex justify-center items-center gap-4 mt-6 mb-4 bg-custom-gray-4">
            <Image
              src={userImage}
              alt="User Image"
              className="rounded-full border-4 border-white border-solid w-48 h-48 md:w-32 md:h-32"
            />
            <div className="md:block hidden">
              <HeadingLg children={`${user.firstName} ${user.lastName}`} />
              <p className="text-[#787878] text-[12px] font-normal">
                Moderator
              </p>
              <div>
                {user.status === "Active" ? (
                  <div className="flex justify-start items-center gap-2">
                    <FaCheckCircle />
                    <p
                      className={`text-sm text-custom-dark-blue-2 font-semibold`}
                    >
                      {user.status}
                    </p>
                  </div>
                ) : (
                  <div className="flex justify-start items-center gap-2">
                    <RxCrossCircled className=" text-[#404040]" />
                    <p
                      className={`text-sm text-custom-dark-blue-2 font-semibold`}
                    >
                      {user.status}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className=" md:hidden flex flex-col justify-center items-center">
            <p className="text-green-900 text-3xl">{`${user.firstName} ${user.lastName}`}</p>
            <p className="text-[#787878] text-[20px] font-normal">Moderator</p>
            <div>
              {user.status === "Active" ? (
                <div className="flex justify-start items-center gap-2">
                  <FaCheckCircle />
                  <p
                    className={`text-sm text-custom-dark-blue-2 font-semibold`}
                  >
                    {user.status}
                  </p>
                </div>
              ) : (
                <div className="flex justify-start items-center gap-2">
                  <RxCrossCircled className=" text-[#404040]" />
                  <p
                    className={`text-sm text-custom-dark-blue-2 font-semibold`}
                  >
                    {user.status}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="mb-4 mx-10">
          <h3 className="text-2xl text-custom-dark-blue-2 font-semibold">
            Personal Details
          </h3>
          <div className="mt-2 space-y-2">
            <div className="flex justify-start  gap-5 flex-col sm:flex-row">
              <div>
                <p  className="text-xl font-semibold">First Name</p>
                <ParagraphLg children={user.firstName} />
              </div>
              <div>
                <p className="text-xl font-semibold">Last Name</p>
                <ParagraphLg children={user.lastName} />
              </div>
            </div>

            <div>
            <p className="text-xl font-semibold">Email</p>
              <ParagraphLg children={user.email} />
            </div>
            <div>
            <p className="text-xl font-semibold">Joined On</p>
              <ParagraphLg children={formattedDate} />
            </div>
          </div>
        </div>
        <div className="flex justify-center pb-8">
          <Button
            onClick={onClose}
            variant="primary"
            type="submit"
            children="Close"
            className="px-5 py-1 rounded-xl"
          />
        </div>
      </div>
    </div>
  );
};

export default ViewModeratorModal;
