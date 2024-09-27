"use client";
import Image from "next/image";
import React, { useState } from "react";
import Logo from "@/components/shared/Logo";
import InputField from "@/components/shared/InputField";
import joinMeetingImage from "../../../../public/join-meeting-edited.png";
import Footer from "@/components/shared/Footer";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import Button from "@/components/shared/button";

const page = () => {
  const [formData, setFormData] = useState({
    fullName: "Observer 1",
    passcode: "BIJEhh",
  });
  const [showPasscode, setShowPasscode] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const params = useParams();
  const router = useRouter();
  const meetingId = params.id;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `https://amplifybe-1.onrender.com/api/live-meeting/join-meeting-observer`,
        {
          name: formData.fullName,
          role: "Observer", // Fixed role as Observer
          passcode: formData.passcode,
          meetingId: meetingId,
        }
      );

      if (response?.data?.message === "Observer added to the meeting") {
        const { isStreaming } = response.data;
        localStorage.setItem("RoletoSend", response.data._id);
        // Redirect based on `isStreaming` status
        if (isStreaming) {
          router.push(
            `/meeting/${meetingId}?fullName=${encodeURIComponent(
              formData.fullName
            )}&role=Observer`
          );
        } else {
          router.push(
            `/observer-waiting-room/${meetingId}?fullName=${encodeURIComponent(
              formData.fullName
            )}&role=Observer`
          );
        }
      }
    } catch (error) {
      if (
        error?.response?.data?.message ===
        "Observer already added to the meeting"
      ) {
        router.push(
          `/meeting/${meetingId}?fullName=${encodeURIComponent(
            formData.fullName
          )}&role=Observer`
        );
      } else {
        console.error(
          "Received error from backend",
          error?.response?.data?.message
        );
        setErrorMessage("Error: " + error?.response?.data?.message);
      }
    }
  };

  return (
    <div className="2xl:min-h-screen">
      <div className="bg-white lg:flex lg:justify-center lg:items-center lg:pl-20 min-h-screen">
        {/* left div */}
        <div className="w-full lg:w-[40%] flex flex-col justify-center items-center px-10">
          <div className="pt-5">
            <Logo />
          </div>
          <h1 className="text-3xl text-custom-dark-blue-2 font-bold uppercase lg:py-8 py-10 2xl:py-14">
            Join Meeting
          </h1>
          <div className="lg:flex lg:justify-between lg:items-center gap-5 w-full 2xl:px-28">
            <InputField
              label="Full Name"
              name="fullName"
              type="text"
              value={formData.fullName}
              onChange={handleChange}
            />
          </div>

          <div className="w-full 2xl:px-28">
            <InputField
              label="Passcode"
              name="passcode"
              type={showPasscode ? "text" : "password"}
              value={formData.passcode}
              onChange={handleChange}
              icon={
                <button
                  type="button"
                  onClick={() => setShowPasscode(!showPasscode)}
                  className="focus:outline-none"
                >
                  {showPasscode ? <FaEyeSlash /> : <FaEye />}
                </button>
              }
            />
          </div>
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          <div className="w-full 2xl:px-28 pt-2 pb-10 lg:pb-0">
            <Button
              children="Join Meeting"
              type="submit"
              variant="primary"
              className="w-full py-2 rounded-xl"
              onClick={handleSubmit}
            />
          </div>
        </div>
        {/* right div */}
        <div className="lg:w-[60%] hidden lg:flex lg:justify-center lg:items-center">
          <Image
            src={joinMeetingImage}
            alt="join meeting image"
            height={500}
            width={700}
            className=""
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default page;
