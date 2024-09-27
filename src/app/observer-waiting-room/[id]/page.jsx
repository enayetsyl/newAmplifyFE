"use client";

import Button from "@/components/shared/button";
import HeadingBlue25px from "@/components/shared/HeadingBlue25px";
import Logo from "@/components/shared/Logo";
import axios from "axios";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

import { FaVideo } from "react-icons/fa";
import { IoLogOutSharp } from "react-icons/io5";

const page = () => {
  const searchParams = useSearchParams();
  const params = useParams();
  const router = useRouter();
  const fullName = searchParams.get("fullName");
  const userRole = searchParams.get("role");

  console.log('params id', params.id, 'fullName', fullName, 'userRole', userRole, );

  const getStreamingStatus = async (meetingId) => {
    try {
      const response = await axios.get(
        `http://localhost:8008/api/live-meeting/get-streaming-status/${meetingId}`
      );

      if (response.data.isStreaming) {
        router.push(`/meeting/${params.id}?fullName=${encodeURIComponent(fullName)}&role=${encodeURIComponent(userRole)}`);
      }
    } catch (error) {
      console.error("Error in getting participant list", error);
    }
  };


  useEffect(() => {
    const meetingId = params?.id; // Ensure params id is used correctly
    if (meetingId) {
      // Set an interval to fetch participant list every 3 seconds
      const intervalId = setInterval(() => {
        getStreamingStatus(meetingId);
      }, 3000);

      // Cleanup interval when the component is unmounted
      return () => clearInterval(intervalId);
    }
  }, [params?.id]);

  return (
    <div className="flex justify-between min-h-screen max-h-screen meeting_bg">
      
      {/* Main content */}
      <div className="flex-1 w-full max-h-[100vh] overflow-hidden mb-5">
        <div className="px-5 py-5 flex flex-col justify-between items-between h-full">
          <div className="h-1/5">
            {/* First ------ nav bar */}
            <div className="flex justify-between items-center pb-2">
              {/* participant name */}
              <div className="flex justify-start items-center space-x-2 pb-2">
                <FaVideo />
                <p className=" text-custom-gray-3 font-semibold">
                  Waiting Room
                </p>

                <Button
                  children={`Observer View`}
                  type="button"
                  variant={"primary"}
                  className={`text-white py-1 px-3 rounded-xl text-sm`}
                />
              </div>
              {/* logo */}
              <Logo />
            </div>

            {/* Second ---------- name bar */}
            <div className="flex justify-between items-center pb-4">
              <HeadingBlue25px children="MEETING 01 - PROJECT NAME" />
              <Button
                children="Leave"
                type="submit"
                variant="meeting"
                icon={<IoLogOutSharp />}
                className=" rounded-lg text-custom-black px-3 py-1"
              />
            </div>
          </div>

          {/*Third ---------- meeting stream */}
          <div className="flex items-center justify-center w-full min-h-screen bg-white rounded-lg">
            <h1 className="text-2xl font-bold">
              Please wait, until the host start the streaming.
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
