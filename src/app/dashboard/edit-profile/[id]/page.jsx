"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { FaSave } from "react-icons/fa";
import InputField from "@/components/shared/InputField";
import userImage from "../../../../../public/placeholder-image.png";
import Button from "@/components/shared/button";

const Page = () => {
  const { id } = useParams();
  const router = useRouter();
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8008/api/users/find-by-id`,
          {
            params: { id },
          }
        );
        setUser(response.data.result);
      } catch (error) {
        console.error("Error fetching user data:", error);
        // Optionally redirect to registration page if user not found
        if (error.response && error.response.status === 404) {
          // router.push('/register');
        }
      }
    };

    fetchUserData();
  }, [id, router]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      await axios.put(
        `http://localhost:8008/api/users/update`,
        user
      );
      alert("Profile updated successfully");
      // Optionally redirect or refresh the page
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  return (
    <div className="my_profile_main_section_shadow pb-16 bg-[#fafafb] bg-opacity-90 h-full min-h-screen flex flex-col  items-center">
      {/* navbar */}
      <div className="bg-white h-20 w-full">
        <div className="px-10 flex justify-between items-center pt-3">
          {/* left div */}
          <div className="flex justify-center items-center w-full">
            <p className="text-2xl font-bold text-custom-teal text-center">
              Edit Profile
            </p>
          </div>
          {/* right div */}
          <div className=" justify-center items-center gap-4 hidden md:flex">
            <Button
              children="Save"
              type="submit"
              variant="secondary"
              icon={<FaSave />}
              className="rounded-xl w-[100px] text-center py-3 shadow-[0px_3px_6px_#2976a54d]"
              onClick={handleSave}
            />
          </div>
          <div className="flex justify-center items-center gap-4 md:hidden fixed right-5">
            <Button
              children=""
              type="submit"
              variant="secondary"
              icon={<FaSave />}
              className="rounded-xl  text-center py-3 shadow-[0px_3px_6px_#2976a54d] pl-4 pr-2"
              onClick={handleSave}
            />
          </div>
        </div>
      </div>
      {/* body */}
      <div className="w-full md:w-[450px] px-5 md:px-0 md:ml-6 md:mr-auto">
        <div className="pt-8 w-full">
          {/* name, role and image */}
          <div className="flex justify-start items-center gap-8 flex-col md:flex-row">
            <Image
              src={userImage}
              alt="user image"
              height={70}
              width={70}
              className="rounded-full"
            />
            <div className="flex-grow">
              <h1 className="text-3xl font-semibold text-custom-teal text-center md:text-left">
                {user.firstName} {user.lastName}
              </h1>
              <p className="text-center text-gray-400 md:text-left">ADMIN</p>
            </div>
          </div>
          {/* personal details */}
          <div>
            <h1 className="text-2xl font-semibold text-custom-dark-blue-1 pt-7 md:text-left">
              Personal Details
            </h1>
            <div className="space-y-7 pt-0 md:pt-7 mt-5">
              <InputField
                label="First Name"
                name="firstName"
                value={user.firstName}
                onChange={handleInputChange}
              />
              <InputField
                label="Last Name"
                name="lastName"
                value={user.lastName}
                onChange={handleInputChange}
              />
              <InputField
                label="Email"
                name="email"
                value={user.email}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
