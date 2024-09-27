import React, { useEffect, useState } from "react";

const OngoingMeeting = () => {
  const [breakRoomID, setRoomBreakID] = useState(null);
  const [fullName, setFullName] = useState("Guest");
  const [roomId, setRoomId] = useState("");
  const [showbreak, setShowBreak] = useState(false);

  useEffect(() => {
    const extractedFullName = getFullNameFromQuery();
    const extractedRoomId = getRoomIdFromUrl();
    setFullName(extractedFullName);
    setRoomId(extractedRoomId);
  }, []);

  // Function to extract the 'fullName' from the URL
  const getFullNameFromQuery = () => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      return params.get("fullName") || "Guest";
    }
    return "Guest";
  };

  // Function to extract the roomId from the URL (e.g., '66f4fda28313630156cb7646')
  const getRoomIdFromUrl = () => {
    if (typeof window !== "undefined") {
      const urlPath = window.location.pathname;
      const roomId = urlPath.split("/meeting/")[1]?.split("?")[0];
      return roomId || "defaultRoomId"; // Default if no roomId found
    }
    return "defaultRoomId";
  };

  const createRoom = () => {
    const randomRoomId = Math.floor(100000 + Math.random() * 900000).toString();
    setRoomBreakID(randomRoomId);
  };

  const joinRoom = () => {
    if (breakRoomID) {
      setShowBreak(true);
    }
  };
  useEffect(() => {
    console.log(
      "IFRAMEURL",
      `http://localhost:8000/?room=${getRoomIdFromUrl()}&id=${localStorage.getItem(
        "RoletoSend"
      )}`
    );
  });
  return (
    <div className="md:block hidden">
      {/* <h1>
        Welcome, {fullName}
        {breakRoomID && ` | Break Room ID: ${breakRoomID}`}
      </h1> */}

      {/* <button onClick={createRoom}>Create Room</button>
      {breakRoomID && (
        <>
          <button onClick={joinRoom}>Join Room {breakRoomID}</button>
        </>
      )} */}

      <div
        className=""
        style={{ width: "100%", paddingBottom: "56.25%", position: "relative" }}
      >
        {console.log(localStorage.getItem("RoletoSend"))}
        {roomId && (
          <iframe
            src={`https://harshapmlifywebrtc-1.onrender.com/?room=${getRoomIdFromUrl()}&id=${localStorage.getItem(
              "RoletoSend"
            )}`}
            width="100%"
            height="600"
            allow="camera; microphone; fullscreen; display-capture"
            allowFullScreen
            style={{ border: "none" }}
          ></iframe>
        )}
      </div>
    </div>
  );
};

export default OngoingMeeting;
