import React, { useState, useEffect } from "react";
import HeadingBlue25px from "../shared/HeadingBlue25px";
import { GoPlus } from "react-icons/go";
import { IoTrashSharp } from "react-icons/io5";
import { RiPencilFill } from "react-icons/ri";
import ParagraphLg from "../shared/ParagraphLg";
import PollModal from "../singleComponent/PollModal";
import HeadingLg from "../shared/HeadingLg";
import Button from "../shared/button";

const Step5 = ({ formData, setFormData }) => {
  const [isPollModalOpen, setIsPollModalOpen] = useState(false);
  const [pollToEdit, setPollToEdit] = useState(null);

  const handleOpenPollModal = (index = null) => {
    if (index !== null) {
      setPollToEdit({ ...formData.polls[index], index });
    } else {
      setPollToEdit(null);
    }
    setIsPollModalOpen(true);
  };

  const handleClosePollModal = () => {
    setIsPollModalOpen(false);
  };

  const removePoll = (index) => {
    const updatedPolls = formData.polls.filter((_, i) => i !== index);
    setFormData({ ...formData, polls: updatedPolls });
  };

  return (
    <div>
      <HeadingBlue25px children="Polls" />
      <div className="flex justify-between items-center py-5">
        <div className="flex justify-end">
          <Button
            type="button"
            variant="save"
            children="Add New"
            className="py-1 px-5 shadow-[0px_3px_6px_#09828F69] rounded-xl"
            icon={<GoPlus />}
            onClick={() => handleOpenPollModal()}
          />
        </div>
      </div>
      <div className="flex justify-start items-center px-3">
        <div className="w-[25%]">
          <HeadingLg children="Name" />
        </div>
        <div className="w-[20%]">
          <HeadingLg children="Total Questions" />
        </div>
        <div className="w-[20%]">
          <HeadingLg children="Creator" />
        </div>
        <div className="w-[35%]">
          <HeadingLg children="Status" />
        </div>
      </div>
      {formData?.polls?.map((poll, index) => (
        <div key={index} className="py-3">
          <div className="flex justify-start items-center bg-white rounded-xl shadow-[0px_0px_6px_#00000029] p-3">
            <ParagraphLg className="w-[25%]">{poll.name}</ParagraphLg>
            <ParagraphLg className="w-[20%]">{`${poll.questions.length} ${
              poll.questions.length > 1 ? "Questions" : "Question"
            }`}</ParagraphLg>

            <ParagraphLg className="w-[20%]">{poll.creator}</ParagraphLg>
            <ParagraphLg className="w-[30%]">
              {poll.active ? <span>Active</span> : <span>Inactive</span>}
            </ParagraphLg>
            <div className="flex justify-end space-x-2 className='w-[5%]'">
              <button onClick={() => handleOpenPollModal(index)}>
                <RiPencilFill className="bg-custom-teal text-white p-2 text-3xl rounded-xl cursor-pointer" />
              </button>
              <button onClick={() => removePoll(index)}>
                <IoTrashSharp className="bg-custom-orange-1 text-white p-2 text-3xl rounded-xl cursor-pointer" />
              </button>
            </div>
          </div>
        </div>
      ))}
      {isPollModalOpen && (
        <PollModal
          onClose={handleClosePollModal}
          formData={formData}
          setFormData={setFormData}
          pollToEdit={pollToEdit} // Pass the poll to be edited to the modal
        />
      )}
    </div>
  );
};

export default Step5;
