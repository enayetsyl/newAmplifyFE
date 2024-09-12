import React, { useState, useEffect } from "react";
import InputField from "@/components/shared/InputField";
import Button from "@/components/shared/Button";
import axios from "axios";

// EditProjectModal Component
const EditProjectModal = ({ onClose, project, onSave }) => {
  const [formData, setFormData] = useState({
    name: project?.name || "",
    description: project?.description || "",
    startDate: project?.startDate?.split('T')[0] || "", 
  endDate: project?.endDate?.split('T')[0] || "",
    projectPasscode: project?.projectPasscode || "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSave(formData);
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
      <div className="bg-white rounded-lg w-[600px] max-w-2xl">
        <h3 className="text-2xl text-custom-dark-blue-2 font-semibold mx-10 py-5">
          Edit Project
        </h3>
        <div className="px-5 space-y-2">
          <InputField
            label="Project Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
          <InputField
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          />
          <InputField
            label="Start Date"
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleInputChange}
          />
          <InputField
            label="End Date"
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleInputChange}
          />
          <InputField
            label="Project Passcode"
            name="projectPasscode"
            value={formData.projectPasscode}
            onChange={handleInputChange}
          />
          <div className="flex justify-center gap-5 py-5">
            <Button onClick={onClose} variant="primary"
            type="submit"
            children="Close"
            className="px-5 py-1 rounded-xl" />
            <Button onClick={handleSubmit}  variant="primary"
            type="submit"
            children="Save"
            className="px-5 py-1 rounded-xl"/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProjectModal;
