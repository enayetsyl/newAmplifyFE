import TableData from "@/components/shared/TableData";
import TableHead from "@/components/shared/TableHead";
import { useGlobalContext } from "@/context/GlobalContext";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { BsFillEnvelopeAtFill, BsThreeDotsVertical } from "react-icons/bs";
import { FaShareAlt, FaUser } from "react-icons/fa";
import { RiPencilFill } from "react-icons/ri";
import ShareMeetingModal from "./ShareMeetingModal";

const MeetingTab = ({ meetings }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState(null)
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const modalRef = useRef();
  const {user} = useGlobalContext()
  const [isShareMeetingModalOpen, setIsShareMeetingModalOpen] = useState(false);

  const toggleModal = (event, meeting) => {
    const { top, left } = event.currentTarget.getBoundingClientRect();
    setModalPosition({ top, left });
   setSelectedMeeting(meeting);
    setIsModalOpen(!isModalOpen);
  };
  const router = useRouter()

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
  const closeModal = () => {
    setIsModalOpen(false);
   };

   const handleShareMeeting = (meeting) => {
    console.log('share meeting', meeting)
    setSelectedMeeting(meeting);
    setIsShareMeetingModalOpen(true);
    closeModal()
  }
  
  const handleView =(meeting) => {
     console.log('view meeting', meeting)
    closeModal()
    
   }
   
   const handleJoinMeeting = async (meeting) => {
      if(meeting.moderator.email === user.email){
      const fullName = `${user.firstName} ${user.lastName}`;

      const response = await axios.post(`https://amplifybe-1.onrender.com/api/live-meeting/start-meeting`, {user, meetingId: meeting._id})

      if(response?.data?.liveMeeting?.ongoing){
        router.push(`/meeting/${meeting._id}?fullName=${encodeURIComponent(fullName)}&role=Moderator`);
      }else{
        console.error('Received error from backend', response?.data?.error)
      }
    } else{
      const fullName = `${user.firstName} ${user.lastName}`;
      // router.push(`/meeting/${meeting._id}?fullName=${encodeURIComponent(fullName)}&role=Admin`);

    }
     
   }
   

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded-lg ">
        <thead className="border-b-[0.5px] border-solid border-custom-dark-blue-1">
          <tr>
            <TableHead >
              Meeting Title
            </TableHead>
        
            <TableHead >
              Start Date & Time
            </TableHead>
            <TableHead >
              Time Zone
            </TableHead>
            <TableHead >
              Moderator
            </TableHead>
            <TableHead >
              Action
            </TableHead>
          </tr>
        </thead>
        <tbody>
          {meetings?.map((meeting, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <TableData >
                {meeting?.title}
              </TableData>
              {/*  {new Date(meeting.startDate).toLocaleDateString()}{" "}
                    {meeting.startTime} */}
              <TableData >
              {new Date(meeting?.startDate).toLocaleDateString()}{" "}
              {meeting?.startTime}
              </TableData>
              <TableData >
                {meeting?.timeZone}
              </TableData>
              <TableData >
                {meeting?.moderator?.firstName}
              </TableData>
              <TableData >
                <div className="flex justify-start items-center gap-2">
               
                <button className="text-blue-500 hover:text-blue-700"
                onClick={()=>handleJoinMeeting(meeting)}
                >
                  Join
                </button>
           
                <BsThreeDotsVertical
                onClick={(e) => toggleModal(e, meeting)}
                      className="cursor-pointer"
                />
                </div>
                
              </TableData>
            </tr>
          ))}
        </tbody>
      </table>
      {isModalOpen && (
        <div
          ref={modalRef}
          className="absolute bg-white shadow-[0px_3px_6px_#0000004A] rounded-lg "
          style={{
            top: modalPosition.top + 335,
            left: modalPosition.left - 87,
          }}
        >
          <ul className="text-[12px]">
            <li
              className="py-2 px-4 hover:bg-gray-200 cursor-pointer text-[#697e89] flex justify-start items-center gap-2"
              onClick={() => handleView(selectedMeeting)}
            >
              <FaUser />
              <span>View</span>
            </li>
            <li
              className="py-2 px-4 hover:bg-gray-200 cursor-pointer text-[#697e89] flex justify-start items-center gap-2"
              onClick={closeModal}
            >
              <RiPencilFill />
              <span>Edit</span>
            </li>
            <li
              className="py-2 px-4 hover:bg-gray-200 cursor-pointer text-[#697e89] flex justify-start items-center gap-2"
              onClick={() =>handleShareMeeting(selectedMeeting)}
            >
              <FaShareAlt/>
              <span>Share</span>
            </li>
            <li
              className="py-2 px-4 hover:bg-gray-200 cursor-pointer text-[#697e89] flex justify-start items-center gap-2"
              onClick={closeModal}
            >
              <BsFillEnvelopeAtFill />
              <span>Delete</span>
            </li>
          </ul>
        </div>
      )}

      {isShareMeetingModalOpen && (
        <ShareMeetingModal
        meeting={selectedMeeting}
        onClose={() => setIsShareMeetingModalOpen(false)}
        />
      )}
    </div>
  );
};

export default MeetingTab;
