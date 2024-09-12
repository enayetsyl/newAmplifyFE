"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from 'next/navigation';
import Image from "next/image";
import axios from "axios";
import Logo from "@/components/shared/Logo";
import InputField from "@/components/shared/InputField";
import Button from "@/components/shared/button";
import joinMeetingImage from "../../../../public/join-meeting.png";
import Footer from "@/components/shared/Footer";

const Page = () => {
  const [formData, setFormData] = useState({
    fullName: "Participant 1",
  });

  const params = useParams();
  const meetingId = params.id;
  const router = useRouter()


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

 try {
  const response = await axios.post(`http://localhost:8008/api/live-meeting/join-meeting-participant`, {name: formData.fullName, role:"Participant", meetingId: meetingId});


  if(response?.data?.message === "Participant added to waiting room"){
    router.push(`/participant-waiting-room/${meetingId}?fullName=${encodeURIComponent(formData.fullName)}&role=Participant`);
  }  
 } catch (error) {
  if(error?.response?.data?.message === "Participant already in the meeting" || error?.response?.data?.message === "Participant already in waiting room" ){
    router.push(`/meeting/${meetingId}?fullName=${encodeURIComponent(formData.fullName)}&role=Participant`);
  } else{
    console.error('Received error from backend', error?.response?.data?.message)
  }
 }

   
  };

  return (
    <div>
      <div className="bg-white lg:flex lg:justify-center lg:items-center">
        {/* left div */}
        <div className="w-full lg:w-[40%] flex flex-col justify-center items-center px-10">
          <div className="pt-5">
            <Logo />
          </div>
          <h1 className="text-3xl text-custom-dark-blue-2 font-bold uppercase lg:py-10 py-8">
            Join Meeting
          </h1>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-center items-center gap-5 w-full"
          >
            <div className="lg:flex lg:justify-start lg:items-center lg:gap-5 w/full">
              <InputField
                label="Full Name"
                name="fullName"
                type="text"
                value={formData.fullName}
                onChange={handleChange}
              />
            </div>
            <div className="w-full lg:pt-2 min-h-[60vh]">
              <Button
                type="submit"
                variant="primary"
                className="w-full py-2 rounded-xl mb-10 lg:mb-0"
              >
                Join Meeting
              </Button>
            </div>
          </form>
        </div>
        {/* right div */}
        <div className="lg:w-[60%] hidden lg:flex justify-center">
          <Image
            src={joinMeetingImage}
            alt="join meeting image"
            height={300}
            width={500}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Page;
