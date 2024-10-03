import React, { useState, useEffect } from "react";
import axios from "axios";
import HeadingBlue25px from "../shared/HeadingBlue25px";
import InputField from "../shared/InputField";
import { IoTrashSharp } from "react-icons/io5";
import { GoPlus } from "react-icons/go";
import FormDropdownLabel from "../shared/FormDropdownLabel";
import { FiMinus } from "react-icons/fi";
import Button from "../shared/button";

const EditPollModal = ({ onClose, formData, setFormData, polls }) => {
  const [poll, setPoll] = useState(null); // State to store fetched poll data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPollById = async () => {
      try {
        const response = await axios.get(`${process.env.BACKEND_BASE_URL}/api/get/poll-id/${polls}`);
        setPoll(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchPollById();
  }, [polls]);

  const [newPoll, setNewPoll] = useState({
    name: "",
    active: false,
    questions: [
      {
        question: "",
        type: "single",
        answers: [{ answer: "" }, { answer: "" }],
      },
    ],
  });

  useEffect(() => {
    if (poll) {
      setNewPoll({
        name: poll.pollName,
        active: poll.isActive,
        questions: poll.questions,
      });
    }
  }, [poll]);

  const addQuestion = () => {
    setNewPoll({
      ...newPoll,
      questions: [
        ...newPoll.questions,
        {
          question: "",
          type: "single",
          answers: [{ answer: "" }, { answer: "" }],
        },
      ],
    });
  };

  const updateQuestion = (index, field, value) => {
    const updatedQuestions = newPoll.questions.map((q, i) =>
      i === index ? { ...q, [field]: value } : q
    );
    setNewPoll({ ...newPoll, questions: updatedQuestions });
  };

  const updateAnswer = (qIndex, aIndex, value) => {
    const updatedQuestions = newPoll.questions.map((q, i) =>
      i === qIndex
        ? {
            ...q,
            answers: q.answers.map((a, j) =>
              j === aIndex ? { answer: value } : a
            ),
          }
        : q
    );
    setNewPoll({ ...newPoll, questions: updatedQuestions });
  };

  const addAnswer = (index) => {
    const updatedQuestions = newPoll.questions.map((q, i) =>
      i === index ? { ...q, answers: [...q.answers, { answer: "" }] } : q
    );
    setNewPoll({ ...newPoll, questions: updatedQuestions });
  };

  const removeAnswer = (qIndex, aIndex) => {
    const updatedQuestions = newPoll.questions.map((q, i) =>
      i === qIndex
        ? { ...q, answers: q.answers.filter((_, j) => j !== aIndex) }
        : q
    );
    setNewPoll({ ...newPoll, questions: updatedQuestions });
  };

  const removeQuestion = (index) => {
    const updatedQuestions = newPoll.questions.filter((_, i) => i !== index);
    setNewPoll({ ...newPoll, questions: updatedQuestions });
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(
        `${process.env.BACKEND_BASE_URL}/api/update-poll/${polls}`,
        {
          pollName: newPoll.name,
          isActive: newPoll.active,
          questions: newPoll.questions,
          choice: null, // or any default value if needed
        }
      );
    //   const updatedPolls = formData.polls
    //     ? formData.polls.map((p) => (p._id === polls ? response.data : p))
    //     : [response.data];

    //   setFormData({
    //     ...formData,
    //     polls: updatedPolls,
    //   });

      onClose(); // Close the modal after successful save
    } catch (error) {
      console.error("Error updating poll:", error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl h-[90%] overflow-y-scroll">
        <HeadingBlue25px children="Edit Poll" />
        <div className="pt-5">
          <InputField
            label="Name"
            type="text"
            value={newPoll.name}
            onChange={(e) => setNewPoll({ ...newPoll, name: e.target.value })}
          />
        </div>
        <div className="flex items-center mt-2">
          <input
            type="checkbox"
            checked={newPoll.active}
            onChange={(e) => setNewPoll({ ...newPoll, active: e.target.checked })}
          />
          <FormDropdownLabel children="Active" className="ml-2" />
        </div>
        <div className="bg-[#f3f3f3] -mx-6 p-6 mt-3">
          {newPoll.questions.map((question, qIndex) => (
            <div key={qIndex} className="mt-4">
              <div className="flex justify-between items-center">
                <FormDropdownLabel children={`${qIndex + 1}. Type your question`} />
                <IoTrashSharp
                  className="bg-custom-orange-1 text-white p-2 text-3xl rounded-xl cursor-pointer"
                  onClick={() => removeQuestion(qIndex)}
                />
              </div>
              <textarea
                className="w-full mt-2 p-2 border-[0.5px] border-custom-dark-blue-1 bg-white rounded-xl"
                value={question.question}
                onChange={(e) => updateQuestion(qIndex, "question", e.target.value)}
              />
              <div className="flex items-center mt-2 pl-5">
                <input
                  type="radio"
                  name={`type-${qIndex}`}
                  checked={question.type === "single"}
                  onChange={() => updateQuestion(qIndex, "type", "single")}
                />
                <FormDropdownLabel children="Single Choice" className="ml-2" />
                <input
                  type="radio"
                  name={`type-${qIndex}`}
                  className="ml-4"
                  checked={question.type === "multiple"}
                  onChange={() => updateQuestion(qIndex, "type", "multiple")}
                />
                <FormDropdownLabel children="Multiple Choice" className="ml-2" />
              </div>
              {question.answers.map((answer, aIndex) => (
                <div key={aIndex} className="flex justify-between items-center mt-2 w-full">
                  <div className="flex-grow">
                    <InputField
                      label={`Answer ${aIndex + 1}`}
                      type="text"
                      value={answer.answer}
                      onChange={(e) => updateAnswer(qIndex, aIndex, e.target.value)}
                    />
                  </div>
                  <FiMinus
                    className="bg-custom-red text-white p-0.5 font-bold rounded-xl cursor-pointer ml-3"
                    onClick={() => removeAnswer(qIndex, aIndex)}
                  />
                </div>
              ))}
              <div className="flex justify-start mt-2">
                <Button
                  type="button"
                  variant="save"
                  children="Add Answer"
                  className="py-1 px-5 shadow-[0px_3px_6px_#09828F69] rounded-xl"
                  icon={<GoPlus />}
                  onClick={() => addAnswer(qIndex)}
                />
              </div>
            </div>
          ))}
          <div className="flex justify-start mt-2">
            <Button
              type="button"
              variant="save"
              children="Add Question"
              className="py-1 px-5 shadow-[0px_3px_6px_#09828F69] rounded-xl"
              icon={<GoPlus />}
              onClick={addQuestion}
            />
          </div>
        </div>
        <div className="flex justify-end mt-6">
          <Button
            type="button"
            variant="cancel"
            children="Cancel"
            className="mr-2 py-1.5 px-5"
            onClick={onClose}
          />
          <Button
            type="button"
            variant="save"
            children="Update Poll"
            className="py-1.5 px-5"
            onClick={handleSave}
          />
        </div>
      </div>
    </div>
  );
};

export default EditPollModal;
