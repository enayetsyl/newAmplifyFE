import Button from "@/components/shared/button";
import FormDropdownLabel from "@/components/shared/FormDropdownLabel";
import HeadingBlue25px from "@/components/shared/HeadingBlue25px";
import InputField from "@/components/shared/InputField";
import { useGlobalContext } from "@/context/GlobalContext";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";

const AddRepositoryModal = ({ onClose, project, meetings, fetchProjects }) => {
  const { user } = useGlobalContext();
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedMeeting, setSelectedMeeting] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  console.log('user', user)

  // Handle file input change
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  // Handle dropdown toggle
  const toggleDropdown = () => {
    setDropdownOpen((prevState) => !prevState);
  };

  // Handle meeting selection
  const handleMeetingSelect = (meeting) => {
    setSelectedMeeting(meeting._id);
    setDropdownOpen(false); // Close dropdown after selection
  };

  // Handle save button
  const handleSave = async () => {
    if (!selectedFile || !selectedMeeting) {
      toast.error("Please select a file and a meeting.");
      return;
    }

    // Construct the form data to send to the backend
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("fileName", selectedFile.name);
    formData.append("type", selectedFile.type);
    formData.append("size", selectedFile.size);
    formData.append("addedBy", `${user.firstName} ${user.lastName}`);
    formData.append("role", user.role);
    formData.append("addedDate", new Date().toISOString());
    formData.append("meetingId", selectedMeeting);
    formData.append("projectId", project._id);
   
    try {
      setIsLoading(true);
      // Make the API call to upload the file
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/create/repository`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success(`${response.data.message}`);
      fetchProjects(user?._id);
      onClose();
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error(`${error.response.data.error}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl h-[60%] overflow-y-auto">
        <HeadingBlue25px children="Upload to Repository" />

        {/* File input */}
        <div className="mt-5">
          <label className="block text-sm font-medium text-gray-700">
            Select File
          </label>
          <input
            type="file"
            onChange={handleFileChange}
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>

        <div className="mt-5 relative">
          <label className="block text-sm font-medium text-gray-700">
            Select Meeting
          </label>
          <div
            className="mt-1 cursor-pointer bg-white border border-gray-300 rounded-md p-2 flex justify-between items-center"
            onClick={toggleDropdown}
          >
            <span>
              {selectedMeeting
                ? meetings.find((m) => m._id === selectedMeeting)?.title
                : "-- Select a Meeting --"}
            </span>
            {dropdownOpen ? <IoChevronUp /> : <IoChevronDown />}
          </div>

          {dropdownOpen && (
            <div className="absolute mt-1 w-full bg-white border border-gray-300 rounded-md max-h-48 overflow-y-auto z-10">
              {meetings?.map((meeting) => (
                <div
                  key={meeting._id}
                  className="p-2 hover:bg-blue-100 cursor-pointer"
                  onClick={() => handleMeetingSelect(meeting)}
                >
                  {meeting.title}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-5 mt-20 ">
          <Button
            type="button"
            variant="cancel"
            children="Cancel"
            className="px-5 py-1 rounded-xl"
            onClick={onClose}
          />
          <Button
            type="button"
            variant={`${isLoading ? "closed" : "save"}`}
            disabled={isLoading}
            children={`${isLoading ? "Uploading...." : "Upload"}`}
            className={`px-5 py-1 rounded-xl`}
            onClick={handleSave}
          />
        </div>
      </div>
    </div>
  );
};

export default AddRepositoryModal;
