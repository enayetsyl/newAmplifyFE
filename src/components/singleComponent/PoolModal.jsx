import React, { useEffect, useState } from 'react';
import HeadingBlue25px from '../shared/HeadingBlue25px';
import InputField from '../shared/InputField';
import Button from '../shared/Button';
import { IoTrashSharp } from 'react-icons/io5';
import { GoPlus } from 'react-icons/go';
import FormDropdownLabel from '../shared/FormDropdownLabel';
import { FiMinus } from 'react-icons/fi';
import axios from 'axios'; // Import axios for API calls

const PoolModal = ({ onClose, formData, setFormData, poolToEdit }) => {
  const [newPool, setNewPool] = useState({
    name: '',
    active: false,
    questions: [
      {
        question: '',
        type: 'single',
        answers: [{ answer: '' }, { answer: '' }],
      },
    ],
  });

  useEffect(() => {
    if (poolToEdit) {
      setNewPool(poolToEdit);
    }
  }, [poolToEdit]);

  const addQuestion = () => {
    setNewPool({
      ...newPool,
      questions: [
        ...newPool.questions,
        {
          question: '',
          type: 'single',
          answers: [{ answer: '' }, { answer: '' }],
        },
      ],
    });
  };

  const updateQuestion = (index, field, value) => {
    const updatedQuestions = newPool.questions.map((q, i) =>
      i === index ? { ...q, [field]: value } : q
    );
    setNewPool({ ...newPool, questions: updatedQuestions });
  };

  const updateAnswer = (qIndex, aIndex, value) => {
    const updatedQuestions = newPool.questions.map((q, i) =>
      i === qIndex
        ? {
            ...q,
            answers: q.answers.map((a, j) =>
              j === aIndex ? { answer: value } : a
            ),
          }
        : q
    );
    setNewPool({ ...newPool, questions: updatedQuestions });
  };

  const addAnswer = (index) => {
    const updatedQuestions = newPool.questions.map((q, i) =>
      i === index ? { ...q, answers: [...q.answers, { answer: '' }] } : q
    );
    setNewPool({ ...newPool, questions: updatedQuestions });
  };

  const removeAnswer = (qIndex, aIndex) => {
    const updatedQuestions = newPool.questions.map((q, i) =>
      i === qIndex
        ? { ...q, answers: q.answers.filter((_, j) => j !== aIndex) }
        : q
    );
    setNewPool({ ...newPool, questions: updatedQuestions });
  };

  const removeQuestion = (index) => {
    const updatedQuestions = newPool.questions.filter((_, i) => i !== index);
    setNewPool({ ...newPool, questions: updatedQuestions });
  };

  const handleSave = () => {
    let updatedPolls = [...formData.polls];
    
    if (poolToEdit) {
      // Update existing poll
      updatedPolls[poolToEdit.index] = newPool;
    } else {
      // Add new poll
      updatedPolls.push(newPool);
    }

    setFormData({
      ...formData,
      polls: updatedPolls,
    });
    onClose();
  };
  

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl h-[90%] overflow-y-scroll">
        <HeadingBlue25px children={poolToEdit ? "Edit Poll" : "Add Poll"} />
        <div className="pt-5">
          <InputField
            label="Name"
            type="text"
            value={newPool.name}
            onChange={(e) => setNewPool({ ...newPool, name: e.target.value })}
          />
        </div>
        <div className="flex items-center mt-2">
          <input
            type="checkbox"
            checked={newPool.active}
            onChange={(e) =>
              setNewPool({ ...newPool, active: e.target.checked })
            }
          />
          <FormDropdownLabel children="Active" className="ml-2 " />
        </div>
        <div className="bg-[#f3f3f3] -mx-6 p-6 mt-3">
          {newPool.questions.map((question, qIndex) => (
            <div key={qIndex} className="mt-4 ">
              <div className="flex justify-between items-center">
                <FormDropdownLabel
                  children={`${qIndex + 1}. Type your question`}
                />
                <IoTrashSharp
                  className="bg-custom-orange-1 text-white p-2 text-3xl rounded-xl cursor-pointer"
                  onClick={() => removeQuestion(qIndex)}
                />
              </div>
              <textarea
                className="w-full mt-2 p-2 border-[0.5px] border-custom-dark-blue-1 bg-white rounded-xl"
                value={question.question}
                onChange={(e) =>
                  updateQuestion(qIndex, 'question', e.target.value)
                }
              />
              <div className="flex items-center mt-2 pl-5">
                <input
                  type="radio"
                  name={`type-${qIndex}`}
                  checked={question.type === 'single'}
                  onChange={() => updateQuestion(qIndex, 'type', 'single')}
                />
                <FormDropdownLabel children="Single Choice" className="ml-2" />
                <input
                  type="radio"
                  name={`type-${qIndex}`}
                  className="ml-4"
                  checked={question.type === 'multiple'}
                  onChange={() => updateQuestion(qIndex, 'type', 'multiple')}
                />
                <FormDropdownLabel
                  children="Multiple Choice"
                  className="ml-2"
                />
              </div>
              {question.answers.map((answer, aIndex) => (
                <div
                  key={aIndex}
                  className="flex justify-between items-center mt-2 w-full"
                >
                  <div className="flex-grow">
                    <InputField
                      label={`Answer ${aIndex + 1}`}
                      type="text"
                      value={answer.answer}
                      onChange={(e) =>
                        updateAnswer(qIndex, aIndex, e.target.value)
                      }
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
        </div>
        <div className="flex justify-between mt-5 items-center">
          <div>
            <Button
              type="button"
              variant="save"
              children="Add Question"
              className="py-1 px-5 shadow-[0px_3px_6px_#09828F69] rounded-xl"
              icon={<GoPlus />}
              onClick={addQuestion}
            />
          </div>
          <div className="flex justify-end gap-5 ">
            <Button
              type="button"
              variant="cancel"
              children="Cancel"
              className="px-5 py-1 rounded-xl"
              onClick={onClose}
            />
            <Button
              type="button"
              variant="save"
              children="Save Poll"
              className="px-5 py-1 rounded-xl"
              onClick={handleSave}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PoolModal;
