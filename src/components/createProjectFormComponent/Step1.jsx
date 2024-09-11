"use client";
import React, { useEffect } from "react";
import HeadingBlue25px from "../shared/HeadingBlue25px";
import InputField from "../shared/InputField";
import { FaCircle } from "react-icons/fa";
import { generatePasscode } from "@/utils/generatePasscode";

const Step1 = ({ formData, setFormData }) => {
  // Function to refresh the passcode
  const refreshPasscode = () => {
    const newPasscode = generatePasscode();
    setFormData((prevFormData) => ({
      ...prevFormData,
      projectPasscode: newPasscode,
    }));
  };

  // Automatically generate passcode when the component mounts or when the end date changes
  useEffect(() => {
    if (!formData.projectPasscode) {
      refreshPasscode();
    }
  }, [formData.endDate]);

  return (
    <div className="px-5">
      <HeadingBlue25px children="General Information" />
      {/* form items container div */}
      <div className="pt-3 w-full md:w-1/2 space-y-5 ">
        {/* container for name and moderator */}

        <div className="w-full">
          <InputField
            label="Name"
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        <div className=" w-full">
          <InputField
            label="Description"
            type="text"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
        </div>

        <div>
          <p className="block text-sm font-semibold mb-2">Start Time</p>
          <div className="flex items-center">
            <input
              type="date"
              value={formData.startDate}
              onChange={(e) =>
                setFormData({ ...formData, startDate: e.target.value })
              }
              className="w-full px-4 py-2 border-[0.5px] rounded-lg focus:outline-none border-black"
            />
          </div>
        </div>
        <div>
          <p className="block text-sm font-semibold mb-2">End Time</p>
          <div className="flex items-center">
            <input
              type="date"
              value={formData.endDate}
              onChange={(e) =>
                setFormData({ ...formData, endDate: e.target.value })
              }
              className="w-full px-4 py-2 border-[0.5px] rounded-lg focus:outline-none border-black"
            />
          </div>
        </div>

        {/* passcode */}
        <div className="w-full flex justify-start items-end gap-2">
          <InputField
            label="Passcode"
            value={formData.projectPasscode}
            onChange={(e) =>
              setFormData({ ...formData, projectPasscode: e.target.value })
            }
            type="text"
            name="passcode"
          />
          <div
            className="flex justify-start items-center gap-2"
            onClick={refreshPasscode}
          >
            <FaCircle />
            <p>Refresh</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step1;
