import React from "react";
import Logo from "../shared/Logo";
import {
  FaHeadphones,
  FaUserFriends,
  FaVideo,
  FaVideoSlash,
} from "react-icons/fa";
import Button from "../shared/button";
import HeadingBlue25px from "../shared/HeadingBlue25px";
import { IoCaretDownSharp, IoLogOutSharp } from "react-icons/io5";
import Image from "next/image";
import meetingImage from "../../../public/meeting.jpeg";
import { MdCallEnd, MdScreenShare, MdVerifiedUser } from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";
import { PiLineVerticalBold } from "react-icons/pi";
import { CgMenuGridR } from "react-icons/cg";
import { IoIosMicOff } from "react-icons/io";
import WhiteBoard from "./WhiteBoard";
import OngoingMeeting from "./OngoingMeeting";
import EndOFMeeting from "./EndOFMeeting";

const MeetingView = ({
  role,
  users,
  isWhiteBoardOpen,
  setIsWhiteBoardOpen,
  meetingStatus,
  isRecordingOpen,
  setIsRecordingOpen,
  isBreakoutRoom,
  setIsBreakoutRoom,
  breakoutRooms,
  setBreakoutRooms,
  projectStatus,
  iframeLink
}) => {

  return (
    <div className="px-5 sm:py-5  flex-col justify-between items-between h-full  bg-orange-300">
      <div className="h-1/5 ">
        {/* First ------ nav bar */}
        <div className="flex justify-between items-center pb-2">
          {/* participant name */}
          <div className=" justify-start items-center space-x-2 pb-2 hidden md:flex">
            <FaVideo />
            <p className=" text-custom-gray-3 font-semibold hidden md:flex">
              {meetingStatus == "Ongoing"
                ? "On going Meeting"
                : "End of Meeting"}
            </p>
            <Button
              children={`${projectStatus}`}
              type="button"
              variant={`${projectStatus !== "Open" ? "secondary" : "primary"}`}
              className={`text-white py-1 px-3 rounded-xl text-sm hidden md:flex`}
            />
            <Button
              children={`${role} View`}
              type="button"
              variant={`${role !== "Moderator" ? "secondary" : "primary"}`}
              className={`text-white py-1 px-3 rounded-xl text-sm hidden md:flex`}
            />
          </div>
          {/* logo */}
          <Logo />
        </div>

        {/* Second ---------- name bar */}
        <div className="flex justify-between items-center pb-4 ">
          <HeadingBlue25px children="MEETING 01 - PROJECT NAME" />
          <Button
            children="Leave"
            type="submit"
            variant="meeting"
            icon={<IoLogOutSharp />}
            className=" rounded-lg text-custom-black px-3 py-1 hidden md:block"
          />
        </div>
      </div>

      {/*Third ---------- meeting stream */}
      {meetingStatus  ? (
        <>
          {isRecordingOpen ? (
            <div className="flex-1 h-full">
              <EndOFMeeting role={role} />
            </div>
          ) : isWhiteBoardOpen ? (
            <div className="h-4/5 max-h-4/5">
              <WhiteBoard role={role} users={users} />
            </div>
          ) : (
            <div className="flex-1 h-full">
              <OngoingMeeting users={users} iframeLink={iframeLink} role={role}/>
            </div>
          )}
        </>
      ) : (
        <div className="flex-1 h-full">
          <EndOFMeeting role={role} />
        </div>
      )}
    </div>
  );
};

export default MeetingView;
