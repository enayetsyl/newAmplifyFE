import { BsChatSquareFill } from "react-icons/bs";
import HeadingLg from "../shared/HeadingLg";
import Button from "../shared/button";

const ParticipantLeftSidebarOpenUI = () => {
  const participant = [
    {
      id: 1,
      name: "John Doe",
    },
    {
      id: 2,
      name: "John Doe",
    },
    {
      id: 3,
      name: "John Doe",
    },
    {
      id: 4,
      name: "John Doe",
    },
    {
      id: 5,
      name: "John Doe",
    },
  ];

  return (
    <>
      <div className="">
      

        {/* Backroom chat and icon */}
        <div className="flex justify-start items-center gap-2 pb-4 pt-14 mx-4">
          <BsChatSquareFill className="text-custom-dark-blue-1" />
          <HeadingLg children="BACKROOM CHAT" />
        </div>

        {/* chat container */}
        <div className="flex flex-col flex-grow px-4 pb-2 pt-4 bg-custom-gray-8 mb-4 rounded-xl overflow-y-auto max-h-[300px] mx-4">
          <div className="flex justify-center items-center gap-2 pb-2 ">
            <div className="w-full relative">
              <Button
                children="Participants Chat"
                variant="default"
                type="submit"
                className={`w-full py-2 rounded-xl pl-2  text-[10px] text-center px-1  shadow-[0px_4px_6px_#1E656D4D]
                    `}
              />
            </div>
          </div>

          {/* Participant chat */}
          {participant.map((user) => (
            <div
              key={user.name}
              className="bg-custom-gray-2 p-2 flex justify-center items-center gap-2 border-b border-solid border-custom-gray-1 cursor-pointer"
              onClick={() => setSelectedChat(user)}
            >
              <div className="flex-grow-1 text-xs ">
                <p className="pb-1 font-bold">{user.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ParticipantLeftSidebarOpenUI;

// {activeTab === "participantChat" && selectedChat && (
//   <div className="flex-grow pt-2  rounded-xl flex flex-col justify-center items-center">
//     {/* chat name and image */}
//     <div className="flex w-full items-center justify-center gap-2 mb-4 bg-custom-gray-4 p-2">

//       <p className="text-[#1a1a1a] text-[12px] font-bold flex-1">
//         {selectedChat.name}
//       </p>
//       <IoClose
//         className="text-custom-black cursor-pointer"
//         onClick={() => setSelectedChat(null)}
//       />
//     </div>
//     {/* chat message */}
//     <div className="flex flex-col gap-2 flex-grow">
//       {messages
//         .filter(
//           (message) =>
//             (message.senderName === selectedChat.name &&
//               message.receiverName === userName) ||
//             (message.senderName === userName &&
//               message.receiverName === selectedChat.name)
//         )
//         .map((message, index) => (
//           <div
//             key={index}
//             className={`flex items-center gap-2 ${
//               message.senderName === userName
//                 ? "justify-start"
//                 : "justify-end"
//             }`}
//           >
//             <div
//               className={`flex flex-col ${
//                 message.senderName === userName
//                   ? "items-start"
//                   : "items-end"
//               }`}
//             >
//               <p
//                 className={`text-[12px] ${
//                   message.senderName === userName
//                     ? "text-blue-600"
//                     : "text-green-600"
//                 }`}
//               >
//                 <span className="font-bold">
//                   {message.senderName}:
//                 </span>{" "}
//                 {message.message}
//               </p>
//               <p className="text-[#1a1a1a] text-[10px]">
//                 {new Date(message.createdAt).toLocaleTimeString()}
//               </p>
//             </div>
//           </div>
//         ))}
//     </div>

//     {/* send message */}
//     <div className="flex justify-between items-center gap-2 relative">
//       <input
//         type="text"
//         placeholder="Type Message"
//         className="rounded-lg py-1 px-2 placeholder:text-[10px]"
//         value={inputMessage}
//         onChange={(e) => setInputMessage(e.target.value)}
//         onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
//       />
//       <div className="absolute right-11 cursor-pointer">
//         <MdInsertEmoticon />
//       </div>
//       <div
//         className="py-1.5 px-1.5 bg-custom-orange-2 rounded-[50%] text-white cursor-pointer text-sm"
//         onClick={handleSendMessage}
//       >
//         <IoSend />
//       </div>
//     </div>
//   </div>
// )}
