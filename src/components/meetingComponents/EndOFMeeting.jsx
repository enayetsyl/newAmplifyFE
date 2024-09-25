import React from "react";
import { GoPlus } from "react-icons/go";
import { FaVideo } from "react-icons/fa";
import { IoIosDocument } from "react-icons/io";
import Search from "../singleComponent/Search";
import { IoTrashSharp } from "react-icons/io5";
import { RiPencilFill } from "react-icons/ri";
import HeadingBlue25px from "../shared/HeadingBlue25px";
import { GrDocumentVideo } from "react-icons/gr";
import Button from "../shared/Button";

const EndOFMeeting = ({role}) => {
  return (
    <>
    {
      role === 'Participant' ? (
      <div className="h-full bg-white flex justify-center items-center rounded-xl">
        <h1 className="text-3xl font-medium text-[#11112d]">This meeting has been ended by the host</h1>
      </div>
      ) : (
        <div className=" bg-[#f1f1f2] flex-1  rounded-xl flex  justify-start items-start h-full">
      {/* left side -------- */}
      <div className="w-1/5 px-3 py-8  bg-white rounded-l-xl flex flex-col justify-start items-center h-full">
        <Button
          children="Upload"
          variant="secondary"
          type="submit"
          icon={<GoPlus />}
          className="text-white px-5 py-2 rounded-lg"
        />

      <div>
      <div className="flex justify-start items-center gap-1 pt-10 pb-3">
          <FaVideo className="text-custom-orange-1 font-medium" />
          <p className="font-medium text-black">Recorded Video</p>
        </div>
        <div className="flex justify-start items-center gap-1">
          <IoIosDocument className="text-custom-orange-1 font-medium" />
          <p className="font-medium text-black">Documents</p>
        </div>
      </div>
      </div>

      {/* right side ------------- */}
      <div className="w-4/5 px-5 pt-8">
      {/* top div search, edit and delete */}
      <div className="flex justify-between items-center ">
      <Search
      placeholder='Search videos or documents'
      inputClassName='bg-white !w-[300px]'
      />
      <div className="flex justify-center items-center gap-2">
      <button onClick={() => editBreakoutRoom(index)}>
                <RiPencilFill className='bg-custom-teal text-white p-2 text-3xl rounded-xl cursor-pointer' />
              </button>
              <button onClick={() => removeBreakoutRoom(index)}>
                <IoTrashSharp className=' bg-custom-orange-1 text-white p-2 text-3xl rounded-xl cursor-pointer' />
              </button>
      </div>
      </div>
     <div className="pt-5 pb-2">
     <HeadingBlue25px
      children='Videos'
      />
     </div>
     
     <p className="text-custom-dark-blue-1 font-bold pb-3">Recent</p>

     <div className="grid grid-cols-6 gap-6">
      <div>
        {/* icon */}
        <div className="bg-white rounded-lg py-8 px-2 text-custom-dark-blue-2mb-2 flex justify-center items-center user_info_div_shadow">
        <GrDocumentVideo 
        className="text-3xl"
        />
        </div>
        <p className="text-[10px] pt-2">Meeting 82021803975 - TEST 6-3 - DEV. MP4</p>
      </div>
     
      <div>
        {/* icon */}
        <div className="bg-white rounded-lg py-8 px-2 text-custom-dark-blue-2mb-2 flex justify-center items-center user_info_div_shadow">
        <GrDocumentVideo 
        className="text-3xl"
        />
        </div>
        <p className="text-[10px] pt-2">Meeting 82021803975 - TEST 6-3 - DEV. MP4</p>
      </div>
     
      <div>
        {/* icon */}
        <div className="bg-white rounded-lg py-8 px-2 text-custom-dark-blue-2mb-2 flex justify-center items-center user_info_div_shadow">
        <GrDocumentVideo 
        className="text-3xl"
        />
        </div>
        <p className="text-[10px] pt-2">Meeting 82021803975 - TEST 6-3 - DEV. MP4</p>
      </div>
     

     </div>
      </div>
    </div>
      )
    }
    </>
  );
};

export default EndOFMeeting;
