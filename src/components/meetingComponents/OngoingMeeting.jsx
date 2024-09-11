import React, { useEffect, useRef, useState } from "react";
import WebRtc from "../WebRtc/src/WebRTC";
import Main from "../WebRtc/src/components/Main/Main";

const OngoingMeeting = ({ users, iframeLink, role }) => {
  const iframeRef = useRef(null);
  const logContainerRef = useRef(null);
  const [fullName, setFullName] = useState("");

  const log = (message) => {
    const logContainer = logContainerRef.current;
    if (logContainer) {
      const logEntry = document.createElement("p");
      logEntry.textContent = `${new Date().toISOString()}: ${message}`;
      logContainer.appendChild(logEntry);
    }
  };

  const getFullNameFromQuery = () => {
    // Get the query string part from the URL (e.g., "?fullName=user%202%20fn%20user%202%20ln&role=Moderator")
    const queryString = window.location.search;

    // Remove the '?' at the beginning and split by '&' to get each key-value pair
    const queryParams = queryString.substring(1).split("&");

    // Iterate through the key-value pairs
    for (let param of queryParams) {
      // Split each key-value pair by '='
      const [key, value] = param.split("=");

      // If the key is 'fullName', return the decoded value
      if (key === "fullName") {
        return decodeURIComponent(value); // Decode to handle URL-encoded characters (e.g., %20 -> space)
      }
    }

    return "Guest"; // Default value if fullName is not found
  };

  useEffect(() => {
    // Extract fullName from the query string
    const extractedFullName = getFullNameFromQuery();
    setFullName(extractedFullName);
  }, []); // This runs once when the component mounts

  useEffect(() => {
    log("OngoingMeeting component loaded. Starting iframe monitoring...");

    const iframe = iframeRef.current;

    if (iframe) {
      iframe.onload = () => {
        log("Iframe loaded");
        iframe.contentWindow.postMessage("Hello from parent", "*");
      };
    }

    const messageListener = (event) => {
      if (
        event.origin !== "https://testing--inspiring-cendol-60afd6.netlify.app"
      )
        return;
      log(`Received message from iframe: ${JSON.stringify(event.data)}`);
    };

    window.addEventListener("message", messageListener);

    const pingInterval = setInterval(() => {
      if (iframe && iframe.contentWindow) {
        iframe.contentWindow.postMessage("Ping from parent", "*");
      }
    }, 5000);

    const networkStatusInterval = setInterval(() => {
      log(`Network status: ${navigator.onLine ? "online" : "offline"}`);
    }, 10000);

    const errorListener = (event) => {
      log(
        `Global error: ${event.message} at ${event.filename}:${event.lineno}`
      );
    };

    window.addEventListener("error", errorListener);

    log("Monitoring setup complete");

    return () => {
      clearInterval(pingInterval);
      clearInterval(networkStatusInterval);
      window.removeEventListener("message", messageListener);
      window.removeEventListener("error", errorListener);
    };
  }, []);

  return (
    <div>
      {/* Show the extracted fullName */}
      <h1>Welcome, {fullName}</h1>
      <div
        className=""
        style={{ width: "100%", paddingBottom: "56.25%", position: "relative" }}
      >
       <Main/>
      </div>
    </div>
  );
};

export default OngoingMeeting;
