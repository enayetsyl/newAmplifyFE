"use client";
import React, { useState } from "react";
import Image from "next/image";
import userImage from "../../../public/user.jpg"; // replace with the path to the user's image
import HeadingLg from "../shared/HeadingLg";
import ParagraphLg from "../shared/ParagraphLg";
import InputField from "../shared/InputField";

const EditModeratorModal = ({
  user,
  onClose,
  onsave,
  handleDeleteModerator,
}) => {
  const [formData, setFormData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    // status: user.status,
    project: "66b0a6bf824132f349bbbc84",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSave = async () => {
    const updatedUser = { ...user, ...formData };

    try {
      const response = await fetch(
        `https://amplifybe-2.onrender.com/api/update/moderator/${user._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedUser),
        }
      );

      if (response.ok) {
        onsave(updatedUser); // Update the parent component with new details
        onClose(); // Close the modal
        alert("Moderator updated successfully.");
      } else {
        const error = await response.text();
        alert(`Failed to update moderator: ${error}`);
      }
    } catch (error) {
      console.error("Error updating moderator:", error);
      alert("Error updating moderator.");
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white rounded-lg w-96 max-w-2xl relative">
        <div className="flex justify-center items-center gap-4 my-6 bg-custom-gray-4">
          <Image
            src={userImage}
            alt="User Image"
            className="rounded-full border-4 border-white border-solid md:w-20 md:h-20 w-32 h-32"
          />
          <div className=" md:block hidden">
            <HeadingLg
              children={`${formData.firstName} ${formData.lastName}`}
            />
            <p className="text-[#787878] text-[12px] font-normal">Moderator</p>
            <div>
              <div className="flex justify-start items-center gap-5">
                <div className="flex justify-start items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.status === "Active"}
                    onChange={() =>
                      setFormData({ ...formData, status: "Active" })
                    }
                    className="rounded-xl"
                  />
                  <p
                    className={`text-sm text-custom-dark-blue-2 font-semibold`}
                  >
                    Active
                  </p>
                </div>
                <div className="flex justify-start items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.status === "Inactive"}
                    onChange={() =>
                      setFormData({ ...formData, status: "Inactive" })
                    }
                    className="rounded-xl"
                  />
                  <p
                    className={`text-sm text-custom-dark-blue-2 font-semibold`}
                  >
                    Inactive
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className=" md:hidden flex flex-col justify-center items-center ">
          <p className="md:text-xl text-3xl text-custom-teal md:text-black font-semibold">
            {formData.firstName} {formData.lastName}
          </p>
          <p className="text-[#787878] md:text-[12px] font-normal text-[18px]">
            Moderator
          </p>
          <div>
            <div className="flex justify-start items-center gap-5">
              <div className="flex justify-start items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.status === "Active"}
                  onChange={() =>
                    setFormData({ ...formData, status: "Active" })
                  }
                  className="rounded-xl"
                />
                <p
                  className={`text-sm md:text-custom-dark-blue-2 font-bold text-custom-teal`}
                >
                  Active
                </p>
              </div>
              <div className="flex justify-start items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.status === "Inactive"}
                  onChange={() =>
                    setFormData({ ...formData, status: "Inactive" })
                  }
                  className="rounded-full"
                />
                <p
                  className={`text-sm md:text-custom-dark-blue-2 font-bold text-custom-teal`}
                >
                  Inactive
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mb-4 mx-10 mt-7">
          <h3 className="text-2xl text-custom-dark-blue-2 font-semibold">
            Personal Details
          </h3>
          <div className="mt-2 space-y-1 w-full">
            <div className="flex justify-start md:items-center gap-5 flex-col md:flex-row w-full">
              <InputField
                label="First Name"
                name="firstName"
                value={formData.firstName}
                type="text"
                onChange={handleInputChange}
              />
              <InputField
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                type="text"
                onChange={handleInputChange}
              />
            </div>
            <div className="mt-2">
              <HeadingLg children="Email" />
              <ParagraphLg children={formData.email} />
            </div>
            <div>
              <HeadingLg children="Joined On" />
              <ParagraphLg children={user.joinedOn} />
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center gap-3 pb-8 md:justify-center mx-10 md:mx-0">
          <button
            onClick={onClose}
            variant="cancel"
            type="submit"
            className="px-5 md:py-1 py-2 rounded-xl md:w-20 w-full bg-black text-white text-center"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            variant="save"
            type="submit"
            className="px-5 md:py-1 py-2 rounded-xl md:w-20 w-full bg-custom-teal text-white text-center"
          >
            Save
          </button>
          <button
            className=" md:hidden absolute top-5 right-4 text-center bg-custom-orange-1 rounded-md flex items-center justify-start px-4 py-2 w-3 text-sm text-gray-700 hover:bg-gray-100"
            onClick={() => handleDeleteModerator(user._id)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="h-2 w-2 text-white"
            >
              <path
              className="w-3 h-3"
                stroke-linecap="round"
                fill="white"
                stroke-linejoin="round"
                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModeratorModal;
