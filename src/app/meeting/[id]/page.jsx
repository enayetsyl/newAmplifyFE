"use client";
import LeftSidebar from "@/components/meetingComponents/LeftSidebar";
import MeetingView from "@/components/meetingComponents/MeetingView";
import RightSidebar from "@/components/meetingComponents/RightSidebar";
import React, { useEffect, useState } from "react";
import userImage from "../../../../public/user.jpg";
import axios from "axios";
import { useParams, useSearchParams } from "next/navigation";
import io from "socket.io-client";
import { useGlobalContext } from "@/context/GlobalContext";

const page = () => {
  const [users, setUsers] = useState([]);
  const { user } = useGlobalContext();
  const [participants, setParticipants] = useState([]);
  const [observers, setObservers] = useState([]);
  const [participantMessages, setParticipantMessages] = useState([]);
  const [observersMessages, setObserversMessages] = useState([]);
  const searchParams = useSearchParams();
  const fullName = searchParams.get("fullName");
  const [iframeLink, setIframeLink] = useState('')
  

  const userRole = searchParams.get("role");
  const [role, setRole] = useState("");
  const params = useParams();

  const [isMeetingOngoing, setIsMeetingOngoing] = useState(false);

  const [waitingRoom, setWaitingRoom] = useState([]);
  const [isAdmitted, setIsAdmitted] = useState(false);
  const [socket, setSocket] = useState(null);

  
  const meetingStatus = "Ongoing";
  const projectStatus = "Open";

  const [isWhiteBoardOpen, setIsWhiteBoardOpen] = useState(false);
  const [isRecordingOpen, setIsRecordingOpen] = useState(false);

  const [isBreakoutRoom, setIsBreakoutRoom] = useState(false);
  const [breakoutRooms, setBreakoutRooms] = useState([
    {
      roomName: "Room A: Group 1",
      participants: [
        { id: 1, name: "Victoria Armstrong", image: userImage },
        { id: 2, name: "Rebecca Nitin", image: userImage },
        { id: 3, name: "Juliet Frazier", image: userImage },
        { id: 4, name: "Hohnny Lewis", image: userImage },
        { id: 5, name: "Raina Smith", image: userImage },
        { id: 6, name: "Alice Johnson", image: userImage },
        { id: 7, name: "Michael Brown", image: userImage },
        { id: 8, name: "Emma Wilson", image: userImage },
      ],
    },
    {
      roomName: "Room B: Group 2",
      participants: [
        { id: 10, name: "Victoria Armstrong", image: userImage },
        { id: 20, name: "Rebecca Nitin", image: userImage },
        { id: 30, name: "Juliet Frazier", image: userImage },
        { id: 40, name: "Hohnny Lewis", image: userImage },
        { id: 50, name: "Raina Smith", image: userImage },
      ],
    },
  ]);
  const [selectedRoom, setSelectedRoom] = useState(breakoutRooms[0]);

  const [peers, setPeers] = useState([]);
  const [streams, setStreams] = useState([]);
  const [messages, setMessages] = useState([]);

  const handleBreakoutRoomChange = (roomName) => {
    const room = breakoutRooms.find((room) => room.roomName === roomName);
    setSelectedRoom(room);
  };

  // Use effect for getting meeting link
  useEffect(() => {
    
    getIframeLinkMeetingId(params.id);
   
  }, [fullName, userRole, params.id]);

  // Use effect for getting waiting list
  useEffect(() => {
    let intervalId;

    if (userRole === "Moderator") {
      // Initial call
      getWaitingList(params.id);

      // Set up interval to call getWaitingList every 10 seconds
      intervalId = setInterval(() => {
        getWaitingList(params.id);
      }, 10000);
    }

    // Clean up function to clear the interval when component unmounts or userRole changes
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [userRole, params.id]);

  // Use effect for getting participant and observer list and participant and observer chat for moderator
  useEffect(() => {
    let intervalId;

    if (userRole === "Moderator") {
      // Initial call
      getParticipantList(params.id);
      getObserverList(params.id);
      getParticipantChat(params.id);
      getObserverChat(params.id);
      getIframeLinkMeetingId(params.id);
      // Set up interval to call getParticipantList every 10 seconds
      intervalId = setInterval(() => {
        getParticipantList(params.id);
        getObserverList(params.id);
        getParticipantChat(params.id);
        getObserverChat(params.id);
        getIframeLinkMeetingId(params.id);
      }, 3000);
    }

    // Clean up function to clear the interval when component unmounts or userRole changes
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [userRole, params.id]);

 
  // Use effect for getting participant list and participant chat for participant
  useEffect(() => {
    let intervalId;

    if (userRole === "Participant") {
      // Initial call
      getParticipantList(params.id);
      getParticipantChat(params.id);
      getIframeLinkMeetingId(params.id);
      // Set up interval to call getParticipantList every 10 seconds
      intervalId = setInterval(() => {
        getParticipantList(params.id);
        getParticipantChat(params.id);
        getIframeLinkMeetingId(params.id);
      }, 3000);
    }

    // Clean up function to clear the interval when component unmounts or userRole changes
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [userRole, params.id]);

 
  // Use effect for admitting participant into meeting after acceptance
  useEffect(() => {
    let intervalId;

    if (userRole === "Participant" && !isAdmitted) {
      // Initial call
      getParticipantList(params.id);

      // Set up interval to call getWaitingList every 10 seconds
      intervalId = setInterval(() => {
        getParticipantList(params.id);
        
      }, 5000);
    }

    // Clean up function to clear the interval when component unmounts or userRole changes
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [userRole, params.id, isAdmitted]);

  // Use effect to check if the participant is in the list and admit them
  useEffect(() => {
    // Check if any participant matches the fullName
    const participantFound = participants?.some(
      (participant) => participant?.name === fullName
    );

    if (participantFound && !isAdmitted) {
      setIsAdmitted(true);
    }
  }, [participants, fullName, isAdmitted]);

  // Use effect for getting meeting status

  useEffect(() => {
    let intervalId;

    if (userRole === "Observer" && !isMeetingOngoing) {
      // Initial call
      getMeetingStatus(params.id);

      // Set up interval to call getWaitingList every 10 seconds
      intervalId = setInterval(() => {
        getMeetingStatus(params.id);
      }, 10000);
    }

    // Clean up function to clear the interval when component unmounts or userRole changes
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [userRole, params.id, isMeetingOngoing]);

  // Use effect for getting observer list and chat for observer
  useEffect(() => {
    let intervalId;

    if (userRole === "Observer") {
      // Initial call
      getObserverList(params.id);
      getObserverChat(params.id);
      // Set up interval to call getParticipantList every 10 seconds
      intervalId = setInterval(() => {
        getObserverList(params.id);
        getObserverChat(params.id);
      }, 10000);
    }

    // Clean up function to clear the interval when component unmounts or userRole changes
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [userRole, params.id]);
  
  // Use effect for removing user

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = 'Are you sure you want to leave? Your changes may not be saved.';
      removeParticipant();
    };
  
    window.addEventListener('beforeunload', handleBeforeUnload);
  
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const getWaitingList = async (meetingId) => {
    try {
      const response = await axios.get(
        `https://amplifybe.onrender.com/api/live-meeting/waiting-list/${meetingId}`
      );
      setWaitingRoom(response?.data?.waitingRoom);
    } catch (error) {
      console.log(error?.response?.data?.message);
    }
  };

  const getParticipantList = async (meetingId) => {
    try {
      const response = await axios.get(
        `https://amplifybe.onrender.com/api/live-meeting/participant-list/${meetingId}`
      );
      setParticipants(response?.data?.participantsList);
    } catch (error) {
      console.log("Error in getting participant list", error);
    }
  };

  const getObserverList = async (meetingId) => {
    try {
      const response = await axios.get(
        `https://amplifybe.onrender.com/api/live-meeting/observer-list/${meetingId}`
      );
      setObservers(response?.data?.observersList);
    } catch (error) {
      console.log("Error in getting observer list", error);
    }
  };

  const acceptParticipant = async (participant) => {
    try {
      const response = await axios.put(
        `https://amplifybe.onrender.com/api/live-meeting/accept-from-waiting-list`,
        {
          participant: participant,
          meetingId: params.id,
        }
      );
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const getMeetingStatus = async (meetingId) => {
    try {
      const response = await axios.get(
        `https://amplifybe.onrender.com/api/live-meeting/get-meeting-status/${meetingId}`
      );

      if (response?.data?.meetingStatus === true) {
        setIsMeetingOngoing(true);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const addToPeersOrStreams = (participant) => {};

  const getWebRtcMeetingId = async (meetingId) => {
    try {
      const response = await axios.get(
        `https://amplifybe.onrender.com/api/live-meeting/get-webrtc-meeting-id/${meetingId}`
      );
      // https://serverzoom-mpbv.onrender.com/room/
      // https://testing--inspiring-cendol-60afd6.netlify.app
      console.log('room id at frontend', response?.data?.webRtcRoomId)
      const iframeLink = `https://testing--inspiring-cendol-60afd6.netlify.app/room/${response?.data?.webRtcRoomId}`;

      setIframeLink(iframeLink);

    } catch (error) {
      console.log("Error:", error);
    }
  };

  const getIframeLinkMeetingId = async (meetingId) => {
    try {
      const response = await axios.get(
        `https://amplifybe.onrender.com/api/live-meeting/get-iframe-link/${meetingId}`
      );
      // https://serverzoom-mpbv.onrender.com/room/
      // https://testing--inspiring-cendol-60afd6.netlify.app
      // console.log('iframe at frontend', response?.data)
      // const iframeLink = `https://testing--inspiring-cendol-60afd6.netlify.app/room/${response?.data?.webRtcRoomId}`;

      setIframeLink(response?.data?.iframeLink);

    } catch (error) {
      console.log("Error:", error);
    }
  };

  const startMeeting = () => {};

  const sendMessageParticipant = async (message) => {
    try {
    const response = await axios.post(
      `https://amplifybe.onrender.com/api/live-meeting/send-message-to-participant`,
      {
        message: message,
        meetingId: params.id,
      }
    );
    if (response?.data?.message === "Chat message saved successfully") {
      setParticipantMessages(response?.data?.participantMessages);
    }
    } catch (error) {
      console.log('error', error)
    }
  };
  const sendMessageObserver = async (message) => {
    try {
    const response = await axios.post(
      `https://amplifybe.onrender.com/api/live-meeting/send-message-to-observer`,
      {
        message: message,
        meetingId: params.id,
      }
    );
    if (response?.data?.message === "Chat message saved successfully") {
      setObserversMessages(response?.data?.observersMessages);
    }
    } catch (error) {
      console.log('error', error)
    }
  };

  const getParticipantChat = async(meetingId) => {
    try {
      const response = await axios.get(
        `https://amplifybe.onrender.com/api/live-meeting/get-participant-chat/${meetingId}`
      );

      if (response?.data?.message === "Participant chat retrieved successfully") {
        setParticipantMessages(response?.data?.participantMessages);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const getObserverChat = async(meetingId) => {
    try {
      const response = await axios.get(
        `https://amplifybe.onrender.com/api/live-meeting/get-observer-chat/${meetingId}`
      );

      if (response?.data?.message === "Observers chat retrieved successfully") {
        setObserversMessages(response?.data?.observersMessages);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const removeParticipant = async () => {
    try {
      response = await axios.put(
        `https://amplifybe.onrender.com/api/live-meeting/remove-participant-from-meeting`,
        {
          name: fullName,
          role: userRole,
          meetingId: params.id,
        }
      );

    } catch (error) {
        if (error?.response?.data?.message === "Participant not found") {
        console.log("Participant not found");
      } else {
        console.log("Error:", error);
      }
    }
  }
  
console.log('iframeLink', iframeLink)
  console.log('my iframe link that i am watching', iframeLink)
  return (
    <>
      <div className="flex justify-between min-h-screen max-h-screen meeting_bg">
        {userRole === "Participant" && !isAdmitted ? (
          <div className="flex items-center justify-center w-full min-h-screen bg-white ">
            <h1 className="text-2xl font-bold">
              Please wait, the meeting host will let you in soon.
            </h1>
          </div>
        ) : userRole === "Participant" && isAdmitted ? (
          // Main participant UI goes here
          <>
            <div className="h-full">
              <LeftSidebar
                users={participants}
                setUsers={setUsers}
                role={userRole}
                isWhiteBoardOpen={isWhiteBoardOpen}
                setIsWhiteBoardOpen={setIsWhiteBoardOpen}
                isRecordingOpen={isRecordingOpen}
                setIsRecordingOpen={setIsRecordingOpen}
                isBreakoutRoom={isBreakoutRoom}
                setIsBreakoutRoom={setIsBreakoutRoom}
                breakoutRooms={breakoutRooms}
                setBreakoutRooms={setBreakoutRooms}
                handleBreakoutRoomChange={handleBreakoutRoomChange}
                selectedRoom={selectedRoom}
                setSelectedRoom={setSelectedRoom}
                messages={participantMessages}
                sendMessageParticipant={sendMessageParticipant}
                userName={fullName}
                meetingId={params.id}
              />
            </div>
            <div className="flex-1 w-full max-h-[100vh] overflow-hidden">
              <MeetingView
                role={userRole}
                users={participants}
                isWhiteBoardOpen={isWhiteBoardOpen}
                setIsWhiteBoardOpen={setIsWhiteBoardOpen}
                meetingStatus={meetingStatus}
                isRecordingOpen={isRecordingOpen}
                setIsRecordingOpen={setIsRecordingOpen}
                isBreakoutRoom={isBreakoutRoom}
                setIsBreakoutRoom={setIsBreakoutRoom}
                breakoutRooms={breakoutRooms}
                setBreakoutRooms={setBreakoutRooms}
                projectStatus={projectStatus}
                iframeLink={iframeLink}
              />
            </div>
          </>
        ) : userRole === "Moderator" ? (
          <>
            <div className="h-full">
              <LeftSidebar
                users={participants}
                setUsers={setUsers}
                role={userRole}
                isWhiteBoardOpen={isWhiteBoardOpen}
                setIsWhiteBoardOpen={setIsWhiteBoardOpen}
                isRecordingOpen={isRecordingOpen}
                setIsRecordingOpen={setIsRecordingOpen}
                isBreakoutRoom={isBreakoutRoom}
                setIsBreakoutRoom={setIsBreakoutRoom}
                breakoutRooms={breakoutRooms}
                setBreakoutRooms={setBreakoutRooms}
                handleBreakoutRoomChange={handleBreakoutRoomChange}
                selectedRoom={selectedRoom}
                setSelectedRoom={setSelectedRoom}
                waitingRoom={waitingRoom}
                acceptParticipant={acceptParticipant}
                messages={participantMessages}
                sendMessageParticipant={sendMessageParticipant}
                userName={fullName}
                meetingId={params.id}
              />
            </div>
            <div className="flex-1 w-full max-h-[100vh] overflow-hidden">
              <MeetingView
                role={userRole}
                users={peers}
                isWhiteBoardOpen={isWhiteBoardOpen}
                setIsWhiteBoardOpen={setIsWhiteBoardOpen}
                meetingStatus={meetingStatus}
                isRecordingOpen={isRecordingOpen}
                setIsRecordingOpen={setIsRecordingOpen}
                isBreakoutRoom={isBreakoutRoom}
                setIsBreakoutRoom={setIsBreakoutRoom}
                breakoutRooms={breakoutRooms}
                setBreakoutRooms={setBreakoutRooms}
                projectStatus={projectStatus}
                iframeLink={iframeLink}
              />
            </div>
            <div className="h-full">
              <RightSidebar
                observers={observers}
                setObservers={setObservers}
                isBreakoutRoom={isBreakoutRoom}
                setIsBreakoutRoom={setIsBreakoutRoom}
                breakoutRooms={breakoutRooms}
                setBreakoutRooms={setBreakoutRooms}
                observersMessages={observersMessages}
                userName={fullName}
                meetingId={params.id}
                sendMessageObserver={sendMessageObserver}
              />
            </div>
          </>
        ) : userRole === "Observer" && isMeetingOngoing ? (
          <>
            {/* <div className="h-full">
              <LeftSidebar
                users={users}
                setUsers={setUsers}
                role={role}
                isWhiteBoardOpen={isWhiteBoardOpen}
                setIsWhiteBoardOpen={setIsWhiteBoardOpen}
                isRecordingOpen={isRecordingOpen}
                setIsRecordingOpen={setIsRecordingOpen}
                isBreakoutRoom={isBreakoutRoom}
                setIsBreakoutRoom={setIsBreakoutRoom}
                breakoutRooms={breakoutRooms}
                setBreakoutRooms={setBreakoutRooms}
                handleBreakoutRoomChange={handleBreakoutRoomChange}
                selectedRoom={selectedRoom}
                setSelectedRoom={setSelectedRoom}
              />
            </div> */}
            <div className="flex-1 w-full max-h-[100vh] overflow-hidden">
              <MeetingView
                role={userRole}
                users={participants}
                isWhiteBoardOpen={isWhiteBoardOpen}
                setIsWhiteBoardOpen={setIsWhiteBoardOpen}
                meetingStatus={isMeetingOngoing}
                isRecordingOpen={isRecordingOpen}
                setIsRecordingOpen={setIsRecordingOpen}
                isBreakoutRoom={isBreakoutRoom}
                setIsBreakoutRoom={setIsBreakoutRoom}
                breakoutRooms={breakoutRooms}
                setBreakoutRooms={setBreakoutRooms}
                projectStatus={projectStatus}
                iframeLink={iframeLink}
              />
            </div>
            <div className="h-full">
              <RightSidebar
                observers={observers}
                setObservers={setObservers}
                isBreakoutRoom={isBreakoutRoom}
                setIsBreakoutRoom={setIsBreakoutRoom}
                breakoutRooms={breakoutRooms}
                setBreakoutRooms={setBreakoutRooms}
                observersMessages={observersMessages}
                userName={fullName}
                meetingId={params.id}
                sendMessageObserver={sendMessageObserver}
              />
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center w-full min-h-screen bg-white ">
            <h1 className="text-2xl font-bold">
              Please wait, the meeting host will let you in soon.
            </h1>
          </div>
        )}
      </div>
    </>
  );
};

export default page;
