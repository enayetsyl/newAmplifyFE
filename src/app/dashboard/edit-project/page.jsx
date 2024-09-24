"use client";
import React, { useState } from "react";
import Step1 from "@/components/createProjectFormComponent/Step1";
import Step2 from "@/components/createProjectFormComponent/Step2";
import Step3 from "@/components/createProjectFormComponent/Step3";
import Step4 from "@/components/createProjectFormComponent/Step4";
import Step5 from "@/components/createProjectFormComponent/Step5";
import HeadingBlue25px from "@/components/shared/HeadingBlue25px";
import { PiNotebookFill, PiSquaresFourFill } from "react-icons/pi";
import { FaCheck, FaUserClock, FaUsers } from "react-icons/fa";
import { BiSolidBarChartAlt2 } from "react-icons/bi";
import { HiOutlineMinus } from "react-icons/hi2";
import Button from "@/components/shared/Button";

const Page = () => {
  const [currentStep, setCurrentStep] = useState(5);
  const [formData, setFormData] = useState({
    name: "Project Name",
    host: "Host Name",
    startDate: "2023-01-01",
    startTime: "12:00",
    duration: "1 hour",
    description: "Project Description",
    passcodeSelect: true,
    passcode: "1234",
    waitingRoomSelect: true,
    language: "English",
    interpreterSelect: true,
    interpreterName: "Interpreter Name",
    interpreterEmail: "interpreter@example.com",
    waitingRoom: true,
    interpreter: true,
    participants: [
      { name: "Juliet Frazier", email: "juliet@gmail.com" },
      { name: "John Doe", email: "john.doe@example.com" },
    ],
    observers: [
      { name: "Oliver Twist", email: "oliver.twist@example.com" },
    ],
    breakoutRooms: [],
    polls: [
      {
        name: "Poll 1",
        active: true,
        questions: [
          {
            question: "What is your favorite color?",
            type: "single",
            answers: [
              { answer: "Red" },
              { answer: "Blue" },
              { answer: "Green" },
              { answer: "Yellow" },
            ],
          },
          {
            question: "Select your preferred languages (multiple)",
            type: "multiple",
            answers: [
              { answer: "English" },
              { answer: "French" },
              { answer: "Spanish" },
            ],
          },
        ],
        creator: "Juliet Frazier",
      },
      {
        name: "Poll 2",
        active: false,
        questions: [
          {
            question: "What is your preferred mode of transportation?",
            type: "single",
            answers: [
              { answer: "Car" },
              { answer: "Bike" },
              { answer: "Public Transport" },
              { answer: "Walking" },
            ],
          },
          {
            question: "Which continents have you visited? (multiple)",
            type: "multiple",
            answers: [
              { answer: "North America" },
              { answer: "Europe" },
              { answer: "Asia" },
              { answer: "Africa" },
            ],
          },
        ],
        creator: "John Doe",
      },
    ],
  });
  
  

  const nextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const prevStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1 formData={formData} setFormData={setFormData} />;
      case 2:
        return <Step2 formData={formData} setFormData={setFormData} />;
      case 3:
        return <Step3 formData={formData} setFormData={setFormData} />;
      case 4:
        return <Step4 formData={formData} setFormData={setFormData} />;
      case 5:
        return <Step5 formData={formData} setFormData={setFormData} />;
      default:
        return null;
    }
  };

  const getIconClass = (step) => {
    return currentStep >= step ? 'bg-custom-orange-1' : 'bg-custom-dark-blue-1';
  };
  
  const getLineClass = (step) => {
    return currentStep >= step ? 'text-custom-orange-1 text-5xl' : 'text-custom-dark-blue-1 text-5xl';
  };


  return (
    <div className="my_profile_main_section_shadow bg-[#fafafb] bg-opacity-90 h-full min-h-screen pb-10">
      <div className="bg-white py-5 w-full">
        <div className="px-10 flex justify-between items-center">
          <div>
            <HeadingBlue25px children="Edit Project" />
          </div>
          <div>
          <Button
              children="Done"
              type="button"
              variant="default"
              icon={<FaCheck />}
              className="rounded-xl px-5  text-center py-3 shadow-[0px_3px_6px_#2976a54d] cursor-pointer"
            />
          </div>
        </div>
      </div>
  <div className="create_project_progress_bar_bg py-1 w-full flex justify-center items-center">
        <div className={`text-white ${getIconClass(1)} p-2 rounded-full`}>
          <PiNotebookFill />
        </div>
        <HiOutlineMinus className={getLineClass(2)} />
        <div className={`text-white ${getIconClass(2)} p-2 rounded-full`}>
          <FaUsers />
        </div>
        <HiOutlineMinus className={getLineClass(3)} />
        <div className={`text-white ${getIconClass(3)} p-2 rounded-full`}>
          <FaUserClock />
        </div>
        <HiOutlineMinus className={getLineClass(4)} />
        <div className={`text-white ${getIconClass(4)} p-2 rounded-full`}>
          <PiSquaresFourFill />
        </div>
        <HiOutlineMinus className={getLineClass(5)} />
        <div className={`text-white ${getIconClass(5)} p-2 rounded-full`}>
          <BiSolidBarChartAlt2 />
        </div>
      </div>
      <div className="flex-grow mx-auto pt-5 px-10">
        {renderStep()}

        {/* Next button */}
        <div className="flex justify-end gap-3 py-4">
          {currentStep > 1 && (
            <Button
              onClick={prevStep}
              variant="cancel"
              className="rounded-lg px-7 py-1 "
            >
              Back
            </Button>
          )}
          {currentStep < 5 && (
            <Button
              onClick={nextStep}
              variant="save"
              className="rounded-lg px-7 py-1 "
            >
              Next
            </Button>
          )}
       
        </div>
      </div>
    </div>
  );
};

export default Page;
