import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { v4 as uuidv4 } from "uuid"; // Importing uuid

const ChatDashboard = ({ receiverId }) => {
  const getUserID = () => {
    const userAgent = navigator.userAgent;
    if (userAgent.includes("Edg/")) {
      return "66c4510b9cfdde50793bfd83"; // Replace with your static ID for Edge
    } else if (userAgent.includes("Chrome")) {
      return "2"; // Replace with your static ID for Chrome
    } else {
      return uuidv4(); // Generate a dynamic ID for other browsers
    }
  };

  const [user] = useState({ _id: getUserID() }); // Auto-generate _id based on the browser
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Fetch users from the database
    fetch("https://amplifybe-2.onrender.com/api/users")
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setUsers(data.users);
        } else {
          console.error("Failed to load users:", data.msg);
        }
      })
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  useEffect(() => {
    const newSocket = io("https://amplifybe-2.onrender.com/user-namespace", {
      auth: {
        token: user._id,
      },
    });

    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("Connected to server");
    });

    newSocket.on("loadNewChat", (data) => {
      // if (user._id === data.receiver_id && receiverId === data.sender_id) {
      setChatHistory((prevChats) => [
        ...prevChats,
        { message: data.message, isCurrentUser: false },
      ]);
      // }
      scrollChat();
    });

    newSocket.on("loadChats", (data) => {
      const chats = data.chats.map((chat) => ({
        message: chat.message,
        isCurrentUser: chat.sender_id === user._id,
      }));
      setChatHistory(chats);
      scrollChat();
    });

    return () => {
      newSocket.disconnect();
    };
  }, [user._id, receiverId]);

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("https://amplifybe-2.onrender.com/save-chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sender_id: user._id,
        receiver_id: receiverId,
        message,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setChatHistory((prevChats) => [
            ...prevChats,
            { message: data.data.message, isCurrentUser: true },
          ]);
          socket.emit("newChat", data.data);
          setMessage("");
        } else {
          alert(data.msg);
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  const scrollChat = () => {
    const chatContainer = document.getElementById("chat-container");
    chatContainer.scrollTop = chatContainer.scrollHeight;
  };

  return (
    <div className="row">
      <div className="col-md-4">
        <ul className="list-group">
          {users.length > 0 &&
            users.map((userItem) => (
              <li
                key={userItem._id}
                className="list-group-item list-group-item-dark cursor-pointer user-list"
                data-id={userItem._id}
              >
                {/* <img
                  src={`http://127.0.0.1:3000/${userItem.image}`}
                  alt=""
                  width="50px"
                  height="50px"
                /> */}
                {userItem.name}
                <sup
                  className={
                    userItem.is_online === 1
                      ? "online-status"
                      : "offline-status"
                  }
                  id={`${userItem._id}-status`}
                >
                  {userItem.is_online === 1 ? "Online" : "Offline"}
                </sup>
              </li>
            ))}
        </ul>
      </div>
      <div className="col-md-8">
        <h3 className="start-head">Click to start the Chat</h3>
        <div
          className="chat-section"
          style={{ display: receiverId ? "block" : "none" }}
        >
          <div id="chat-container">
            {chatHistory.map((chat, index) => (
              <div
                key={index}
                className={
                  chat.isCurrentUser
                    ? "current-user-chat"
                    : "distance-user-chat"
                }
              >
                <h5 className="bg-black text-white border-2 rounded-full px-2 mr-5 w-52 h-5">
                  {user._id}
                </h5>
                <h5>{chat.message}</h5>
              </div>
            ))}
          </div>
          <form id="chat-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="message"
              placeholder="Enter Message"
              id="message"
              className="border"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
            <input
              type="submit"
              value="Send Message"
              className="btn btn-primary"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatDashboard;
