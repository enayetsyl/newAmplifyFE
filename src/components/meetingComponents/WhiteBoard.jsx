import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { FaHeadphones, FaUserFriends, FaVideoSlash } from "react-icons/fa";
import { IoIosMicOff } from "react-icons/io";
import { MdCallEnd, MdScreenShare } from "react-icons/md";
import io from "socket.io-client";
import "./style.css";
const WhiteBoard = ({ role, users }) => {
  const drawonCanvas = () => {
    const root = {};
    root.socket = io.connect("http://localhost:8008");
  
    root.socket.on("canvas-data", (data) => {
      const image = new window.Image();  
      const canvas = document.querySelector("#board");
      const ctx = canvas.getContext("2d");
  
      image.onload = () => {
        ctx.drawImage(image, 0, 0);
      };
      image.src = data;
    });
  
    const canvas = document.querySelector("#board");
    const ctx = canvas.getContext("2d");
  
    const sketch = document.querySelector("#sketch");
    const sketchStyle = getComputedStyle(sketch);
    canvas.width = parseInt(sketchStyle.getPropertyValue("width"));
    canvas.height = parseInt(sketchStyle.getPropertyValue("height"));
  
    const mouse = { x: 0, y: 0 };
    const lastMouse = { x: 0, y: 0 };
  
    /* Mouse Capturing Work */
    canvas.addEventListener(
      "mousemove",
      (e) => {
        lastMouse.x = mouse.x;
        lastMouse.y = mouse.y;
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
      },
      false
    );
  
    /* Drawing on Paint App */
    ctx.lineWidth = 5;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.strokeStyle = "blue";
  
    canvas.addEventListener(
      "mousedown",
      () => {
        canvas.addEventListener("mousemove", onPaint, false);
      },
      false
    );
  
    canvas.addEventListener(
      "mouseup",
      () => {
        canvas.removeEventListener("mousemove", onPaint, false);
      },
      false
    );
  
    const onPaint = () => {
      ctx.beginPath();
      ctx.moveTo(lastMouse.x, lastMouse.y);
      ctx.lineTo(mouse.x, mouse.y);
      ctx.closePath();
      ctx.stroke();
  
      if (root.timeout !== undefined) clearTimeout(root.timeout);
      root.timeout = setTimeout(() => {
        const base64ImageData = canvas.toDataURL("image/png");
        root.socket.emit("canvas-data", base64ImageData);
      }, 1000);
    };
  };
  

  useEffect(() => {
    drawonCanvas();
  }, []);
  const [isSeeMoreModalOpen, setIsSeeMoreModalOpen] = useState(false);
  const modalRef = useRef();

  const handleToggleSeeMoreModal = () => {
    setIsSeeMoreModalOpen(!isSeeMoreModalOpen);
  };

  const closeModal = () => {
    setIsSeeMoreModalOpen(false);
  };

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      closeModal();
    }
  };

  useEffect(() => {
    if (isSeeMoreModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSeeMoreModalOpen]);

  return (
    <div className="bg-white board-container flex justify-start items-center  w-full h-full rounded-xl relative">
      {/* video */}
      {/* <div className="w-1/5 bg-black border-2 border-black  grid-cols-1 p-2  gap-2 items-center overflow-y-auto max-h-full rounded-l-xl "> */}
        {/* {users &&
          users?.map((user) => (
            <div className="relative">
              <Image
                src={user.image}
                alt="participant image"
                height={120}
                width={150}
                className=""
              />
              <div className="absolute bottom-0 left-0 bg-black flex justify-center items-center gap-1 px-1.5 py-0.5">
                {user.isSilent ? (
                  <IoIosMicOff className="text-custom-red text-[10px]" />
                ) : (
                  ""
                )}
                <p className="text-white text-[8px]">{user.name}</p>
              </div>
            </div>
          ))} */}
        {/* control bar */}
        {/* <div className="bg-[#1b1b1b] py-2 flex justify-center items-center gap-2  w-1/5 rounded-bl-xl absolute bottom-0 left-0 ">
          <FaHeadphones className="text-custom-gray-2" />
          <FaVideoSlash className="text-custom-gray-2" />

          <BsThreeDots
            onClick={handleToggleSeeMoreModal}
            className="text-custom-gray-2 cursor-pointer"
          />
          <MdCallEnd className="text-[#CD3B33]" />
          {isSeeMoreModalOpen && (
            <div
              ref={modalRef}
              className="bg-[#1b1b1b] flex  justify-center items-center gap-2 p-2 absolute -top-8 left-10"
            >
              <MdScreenShare onClick={closeModal} className="text-[#2CD95F]" />
              <FaUserFriends
                onClick={closeModal}
                className="text-custom-gray-2"
              />
            </div>
          )}
        </div> */}
      {/* </div> */}
      {/* White board */}
      <div id="sketch" className="sketch absolute border-2 border-black">
        <canvas className="board" id="board"></canvas>
      </div>
    </div>
  );
};

export default WhiteBoard;
