import React, { useEffect, useRef, useState } from "react";
// import { useRouter } from "next/router";
import Main from "../WebRtc/src/components/Main/Main";

const OngoingMeeting = ({ users, iframeLink, role }) => {
  // const router = useRouter();
  const [breakRoomID, setRoomBreakID] = useState(null);
  const [fullName, setFullName] = useState("");
  const [showbreak, setShowBreak] = useState(false);
  useEffect(() => {
    const extractedFullName = getFullNameFromQuery();
    setFullName(extractedFullName);
  }, []);

  const getFullNameFromQuery = () => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      return params.get("fullName") || "Guest";
    }
    return "Guest";
  };

  // const log = (message) => {
  //   const logContainer = logContainerRef.current;
  //   if (logContainer) {
  //     const logEntry = document.createElement("p");
  //     logEntry.textContent = `${new Date().toISOString()}: ${message}`;
  //     logContainer.appendChild(logEntry);
  //   }
  // };

  const createRoom = () => {
    const randomRoomId = Math.floor(100000 + Math.random() * 900000).toString();
    setRoomBreakID(randomRoomId);
    // log(`Room created: ${randomRoomId}`);
  };

  const joinRoom = () => {
    if (breakRoomID) {
      // router.push(`/room/${createdRoomId}`);
      setShowBreak(true);
    }
  };

  return (
    <div>
      <h1>
        Welcome, {fullName}
        {breakRoomID}
      </h1>
      {console.log("firsttest", breakRoomID)}
      {
        <>
          <button onClick={createRoom}>Create Room</button>
          {breakRoomID && (
            <>
              {console.log("checking", breakRoomID)}

              <button onClick={joinRoom}>Join Room {breakRoomID}</button>
            </>
          )}
        </>
      }
      <div
        className=""
        style={{ width: "100%", paddingBottom: "56.25%", position: "relative" }}
      >
        <Main breakRoomID={showbreak && breakRoomID} />
      </div>
      {/* <div ref={logContainerRef}></div> */}
    </div>
  );
};

export default OngoingMeeting;
