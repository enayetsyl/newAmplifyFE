import React, { useEffect, useState } from "react";

const OngoingMeeting = () => {
  const [breakRoomID, setRoomBreakID] = useState(null);
  const [fullName, setFullName] = useState("Guest");
  const [roomId, setRoomId] = useState("");

  useEffect(() => {
    const extractedFullName = getFullNameFromQuery();
    const extractedRoomId = getRoomIdFromUrl();
    setFullName(extractedFullName);
    setRoomId(extractedRoomId);

    // Check if the page has already been reloaded
    const hasReloaded = localStorage.getItem("hasReloaded");

    if (!hasReloaded) {
      // If not reloaded, reload the page and set the flag
      localStorage.setItem("hasReloaded", "true");
      window.location.reload();
    }
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

  return (
    <div className="md:block ">
      <div
        className="rounded-md"
        style={{ width: "100%", paddingBottom: "56.25%", position: "relative" }}
      >
        {roomId && (
          <iframe
            src={`https://harshapmlify-11111.onrender.com/?room=${getRoomIdFromUrl()}&id=${localStorage.getItem(
              "RoletoSend"
            )}`}
            width="100%"
            height="960"
            allow="camera; microphone; fullscreen; display-capture"
            allowFullScreen
            style={{ border: "none" }}
            className="rounded-md"
          ></iframe>
        )}
      </div>
    </div>
  );
};

export default OngoingMeeting;
