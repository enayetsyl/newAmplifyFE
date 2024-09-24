
import React from 'react'

const page = () => {
  return (
    <div>page</div>
  )
}

export default page











// Trasferred to components/singleComponent/viewProject.jsx file



// 'use client';
// import Button from '@/components/shared/Button';
// import HeadingBlue25px from '@/components/shared/HeadingBlue25px';
// import HeadingLg from '@/components/shared/HeadingLg';
// import Pagination from '@/components/shared/Pagination';
// import ParagraphLg from '@/components/shared/ParagraphLg';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import React, { useEffect, useState } from 'react';
// import { RiPencilFill } from 'react-icons/ri';

// const page = () => {
//   const [activeTab, setActiveTab] = useState('Participants');
 

//   const handleTabChange = (tab) => {
//     setActiveTab(tab);
//   };

// const handlePageChange = () => {
//   //Add logic here
// }

//   return (
//     <div className="my_profile_main_section_shadow bg-[#fafafb] bg-opacity-90 h-full min-h-screen flex flex-col justify-center items-center ">
//       {/* navbar */}
//       <div className="bg-white h-24 w-full px-10 flex justify-between items-center ">
//         <div>
//           <HeadingBlue25px children="View Project Details" />
//         </div>
//       </div>
//       {/* body */}
//       <div className="flex-grow px-10 w-full">
//         {/* button */}
//         <div className="flex justify-end py-5">
//          <Link href='/dashboard/edit-project'>
//          <Button
//             children="Edit"
//             type="submit"
//             variant="save"
//             icon={<RiPencilFill />}
//             className="rounded-xl  px-5 py-1 shadow-[0px_3px_6px_#2976a54d]"
//           />
//          </Link>
//         </div>
//         {/*  general information  div*/}
//         <div className="bg-white shadow-[0px_0px_12px_#00000029] rounded-xl p-5">
//           <HeadingBlue25px children="General Information" />
//           {/* top part */}
//           {/* heading */}
//           <div className="pt-4 grid grid-cols-4">
//             <HeadingLg children="Name" />
//             <HeadingLg children="Status" />
//             <HeadingLg children="Creator" />
//             <HeadingLg children="Moderator | Host" />
//           </div>
//           {/* content */}
//           <div className="pt-2 grid grid-cols-4">
//             <ParagraphLg children="Project 1: Cross Hatching" />
//             <Button
//               type="button"
//               variant="save"
//               children="Active"
//               className="py-1 px-3 rounded-xl w-20"
//             />
//             <ParagraphLg children="Juliet Frazier" />
//             <ParagraphLg children="Juliet Frazier" />
//           </div>
//           {/* middle part */}
//           {/* heading */}
//           <div className="pt-8 grid grid-cols-4">
//             <HeadingLg children="Start Time" />
//             <HeadingLg children="Time Zone" />
//             <div className="flex justify-start items-center gap-2">
//               <input type="checkbox" />
//               <HeadingLg children="Waiting Room" />
//             </div>
//             <HeadingLg children="Passcode" />
//           </div>
//           {/* content */}
//           <div className="pt-2 grid grid-cols-4">
//             <ParagraphLg children="12/21/2022 Wednesday, 04:00 PM" />

//             <ParagraphLg children="Pacific Standard Time UTC−08:00 (GMT-8)" />
//             <ParagraphLg children="" />
//             <ParagraphLg children="@12345*LosAngeles" />
//           </div>
//           {/* lower part */}
//           {/* heading */}
//           <div className="pt-8 ">
//             <HeadingLg children="Description" />
//           </div>
//           {/* content */}
//           <div className="pt-2 pb-10 pr-32">
//             <ParagraphLg children="Hatching and crosshatching are some of the most valuable tools for generating value and texture in a drawing. These techniques use simple lines in various arrangements and densities to create a solid sense of atmospheric perspective and contour." />
//           </div>
//           <hr />
//           {/* interperter part */}
//           {/* middle part */}
//           {/* heading */}
//           <div className="pt-4 grid grid-cols-4">
//             <div className="flex justify-start items-center gap-2">
//               <input type="checkbox" />
//               <HeadingLg children="Interpreter" />
//             </div>
//             <HeadingLg children="Language" />

//             <HeadingLg children="Name" />
//             <HeadingLg children="Email" />
//           </div>
//           {/* content */}
//           <div className="pt-2 grid grid-cols-4 pb-5">
//             <ParagraphLg children="" />

//             <ParagraphLg children="English" />
//             <ParagraphLg children="Johnny Smith" />
//             <ParagraphLg children="johnnysmith231@gmail.com" />
//           </div>
//         </div>

//         {/* participants, observers, breakout rooms and pools div container */}
//         <div className="bg-white shadow-[0px_0px_12px_#00000029] rounded-xl p-5 mt-3 mb-10">
//           {/* tab navigation */}
//           <div className="flex justify-around space-x-10  border-b">
//             <button
//               className={`py-2 border-custom-dark-blue-1 ${
//                 activeTab === 'Participants' ? 'border-b-2 ' : 'opacity-25'
//               }`}
//               onClick={() => handleTabChange('Participants')}
//             >
//               Participantss
//             </button>
//             <button
//               className={`py-2 border-custom-dark-blue-1 ${
//                 activeTab === 'Observers' ? 'border-b-2 ' : 'opacity-25'
//               }`}
//               onClick={() => handleTabChange('Observers')}
//             >
//               Observers
//             </button>
//             <button
//               className={`py-2 border-custom-dark-blue-1 ${
//                 activeTab === 'Breakout Rooms' ? 'border-b-2 ' : 'opacity-25'
//               }`}
//               onClick={() => handleTabChange('Breakout Rooms')}
//             >
//               Breakout Rooms
//             </button>
//             <button
//               className={`py-2 border-custom-dark-blue-1 ${
//                 activeTab === 'Polls' ? 'border-b-2 ' : 'opacity-25'
//               }`}
//               onClick={() => handleTabChange('Polls')}
//             >
//               Polls
//             </button>
//           </div>

//           {/* tab content */}
//           {activeTab === 'Participants' && (
//             <div className="pt-5">
//               <HeadingLg children="Participant List" />
//               <div className="border-[0.5px] border-solid border-custom-dark-blue-1 rounded-xl h-[300px] overflow-y-scroll mt-2">
//                 {/* table heading */}
//                 <div className="flex justify-start items-center py-3 px-5 shadow-sm">
//                   <div className="w-[30%]">
//                     <HeadingLg children="Name" />
//                   </div>
//                   <div className="w-[70%]">
//                     <HeadingLg children="Email" />
//                   </div>
//                 </div>
//                 {/* table item */}
//                 {/* {formData.participants.map((participant, index) => ( */}
//                 <div className="flex justify-start items-center py-3 px-5 shadow-sm">
//                   <div className="w-[30%]">
//                     <ParagraphLg children="Juliet Frazier" />
//                     {/* <ParagraphLg children={participant.name} /> */}
//                   </div>
//                   <div className="w-[70%]">
//                     <ParagraphLg children="JulietFrazier123@gmail.com" />
//                     {/* <ParagraphLg children={participant.email} /> */}
//                   </div>
//                 </div>
//                 <div className="flex justify-start items-center py-3 px-5 shadow-sm">
//                   <div className="w-[30%]">
//                     <ParagraphLg children="Juliet Frazier" />
//                     {/* <ParagraphLg children={participant.name} /> */}
//                   </div>
//                   <div className="w-[70%]">
//                     <ParagraphLg children="JulietFrazier123@gmail.com" />
//                     {/* <ParagraphLg children={participant.email} /> */}
//                   </div>
//                 </div>
//                 {/* ))} */}
//               </div>
//             </div>
//           )}

//           {activeTab === 'Observers' && (
//             <div className="pt-5">
//               <HeadingLg children="Observers List" />
//               <div className="border-[0.5px] border-solid border-custom-dark-blue-1 rounded-xl h-[300px] overflow-y-scroll mt-2">
//                 {/* table heading */}
//                 <div className="flex justify-start items-center py-3 px-5 shadow-sm">
//                   <div className="w-[30%]">
//                     <HeadingLg children="Name" />
//                   </div>
//                   <div className="w-[70%]">
//                     <HeadingLg children="Email" />
//                   </div>
//                 </div>
//                 {/* table item */}
//                 {/* {formData.participants.map((participant, index) => ( */}
//                 <div className="flex justify-start items-center py-3 px-5 shadow-sm">
//                   <div className="w-[30%]">
//                     <ParagraphLg children="Juliet Frazier" />
//                     {/* <ParagraphLg children={participant.name} /> */}
//                   </div>
//                   <div className="w-[70%]">
//                     <ParagraphLg children="JulietFrazier123@gmail.com" />
//                     {/* <ParagraphLg children={participant.email} /> */}
//                   </div>
//                 </div>
//                 <div className="flex justify-start items-center py-3 px-5 shadow-sm">
//                   <div className="w-[30%]">
//                     <ParagraphLg children="Juliet Frazier" />
//                     {/* <ParagraphLg children={participant.name} /> */}
//                   </div>
//                   <div className="w-[70%]">
//                     <ParagraphLg children="JulietFrazier123@gmail.com" />
//                     {/* <ParagraphLg children={participant.email} /> */}
//                   </div>
//                 </div>
//                 <div className="flex justify-start items-center py-3 px-5 shadow-sm">
//                   <div className="w-[30%]">
//                     <ParagraphLg children="Juliet Frazier" />
//                     {/* <ParagraphLg children={participant.name} /> */}
//                   </div>
//                   <div className="w-[70%]">
//                     <ParagraphLg children="JulietFrazier123@gmail.com" />
//                     {/* <ParagraphLg children={participant.email} /> */}
//                   </div>
//                 </div>
//                 {/* ))} */}
//               </div>
//             </div>
//           )}

//           {activeTab === 'Breakout Rooms' && (
//             <div className="pt-5">
//               <div className="flex justify-stat items-center px-3">
//                 <div className="w-[25%]">
//                   <HeadingLg children="Name" />
//                 </div>
//                 <div className="w-[20%]">
//                   <HeadingLg children="Participants" />
//                 </div>
//                 <div className="w-[55%]">
//                   <HeadingLg children="Interpreter" />
//                 </div>
//               </div>
//               {/* {formData.breakoutRooms.map((room, index) => ( */}
//               <div className="py-3 space-y-3">
//                 <div className="flex justify-start items-center bg-white rounded-xl shadow-[0px_0px_6px_#00000029] p-3">
//                   <ParagraphLg className="w-[25%]">Sistine Chapel</ParagraphLg>
//                   <ParagraphLg className="w-[20%]">5</ParagraphLg>
//                   <ParagraphLg className="w-[50%]">Sara Meyer</ParagraphLg>
//                 </div>

//                 <div className="flex justify-start items-center bg-white rounded-xl shadow-[0px_0px_6px_#00000029] p-3 ">
//                   <ParagraphLg className="w-[25%]">Sistine Chapel</ParagraphLg>
//                   <ParagraphLg className="w-[20%]">5</ParagraphLg>
//                   <ParagraphLg className="w-[50%]">Adam Wood</ParagraphLg>
//                 </div>
//               </div>
//               {/* ))} */}
//             </div>
//           )}

//           {activeTab === 'Polls' && (
//             <div className="pt-5">
//               <HeadingLg children="You have created 2 polls for this meeting." />
//               <div className="flex justify-start items-center px-3 mt-4">
//                 <div className="w-[25%]">
//                   <HeadingLg children="Name" />
//                 </div>
//                 <div className="w-[20%]">
//                   <HeadingLg children="Total Questions" />
//                 </div>
//                 <div className="w-[20%]">
//                   <HeadingLg children="Creator" />
//                 </div>
//                 <div className="w-[35%]">
//                   <HeadingLg children="Status" />
//                 </div>
//               </div>
//               {/* {formData.breakoutRooms.map((room, index) => ( */}
//               <div  className="py-3 space-y-3">
//                 <div className="flex justify-start items-center bg-white rounded-xl shadow-[0px_0px_6px_#00000029] p-3">
//                   <ParagraphLg className="w-[25%]">
//                     Poll 1: Sistine Chapel
//                   </ParagraphLg>
//                   <ParagraphLg className="w-[20%]">1 Question</ParagraphLg>
//                   <ParagraphLg className="w-[20%]">Olivia Hasting</ParagraphLg>
//                   <ParagraphLg className="w-[30%]">Active</ParagraphLg>
//                 </div>
//                 <div className="flex justify-start items-center bg-white rounded-xl shadow-[0px_0px_6px_#00000029] p-3">
//                   <ParagraphLg className="w-[25%]">
//                     Poll 1: Sistine Chapel
//                   </ParagraphLg>
//                   <ParagraphLg className="w-[20%]">1 Question</ParagraphLg>
//                   <ParagraphLg className="w-[20%]">Olivia Hasting</ParagraphLg>
//                   <ParagraphLg className="w-[30%]">Active</ParagraphLg>
//                 </div>
//               </div>
//               {/* ))} */}
//             </div>
//           )}

//           <div className='flex justify-end py-3'>
//           <Pagination 
//           currentPage={2} 
//           totalPages={5} 
//           onPageChange={handlePageChange}
//           />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default page;
