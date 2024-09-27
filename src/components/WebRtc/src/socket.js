import io from "socket.io-client";

// const ENDPOINT = 'http://localhost:8008';
const ENDPOINT = "http://localhost:8008/"; // Uncomment this line for production

const socket = io(ENDPOINT, {
  autoConnect: true,
  forceNew: true,
  transports: ["websocket", "polling"],
  reconnection: true,
  reconnectionAttempts: Infinity,
  reconnectionDelay: 1000,
});
socket.on("connect", () => {
  console.log("Socket connected with ID:", socket.id);
});

socket.on("connect_error", (error) => {

  console.error("Socket connection error:", error);
  // Attempt to reconnect
  socket.connect();
});

socket.on("disconnect", (reason) => {
  console.log("Socket disconnected:", reason);
  if (reason === "io server disconnect") {
    // the disconnection was initiated by the server, you need to reconnect manually
    socket.connect();
  }
});

// Debug: Log all emitted events
const originalEmit = socket.emit;
socket.emit = function () {
  console.log(
    "Socket emitting:",
    arguments[0],
    arguments[1],
    "Current socket ID:",
    socket.id
  );
  return originalEmit.apply(socket, arguments);
};

// Function to check connection status
const checkConnection = () => {
  if (!socket.connected) {
    console.log("Socket not connected, attempting to connect...");
    socket.connect();
  } else {
    console.log("Socket is connected. ID:", socket.id);
  }
};

// Check connection status every 5 seconds
setInterval(checkConnection, 5000);

export default socket;
