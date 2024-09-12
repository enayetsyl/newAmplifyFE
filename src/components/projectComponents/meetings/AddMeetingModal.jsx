import Button from "@/components/shared/button";
import Dropdown from "@/components/shared/Dropdown";
import FormDropdownLabel from "@/components/shared/FormDropdownLabel";
import InputField from "@/components/shared/InputField";
import { timeZone } from "@/constant/Index";
import { generatePasscode } from "@/utils/generatePasscode";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaCircle } from "react-icons/fa";

const AddMeetingModal = ({ onClose, project, user, refetchMeetings }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startDate: "",
    startTime: "",
    timeZone: "UTC-12:00 International Date Line West",
    duration: "",
    ongoing: false,
    enableBreakoutRoom: false,
    meetingPasscode: "",
    moderator: "",
  });

  const [selectedTimeZone, setSelectedTimeZone] = useState(
    formData.timeZone || "UTC-12:00 International Date Line West"
  );
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `http://localhost:8008/api/get-all/contact/${user._id}`
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch contacts: ${response.statusText}`);
      }
      const data = await response.json();
      setContacts(data);
    } catch (error) {
      console.error("Error fetching contacts:", error);
      alert(
        `Error fetching contacts: ${error.message}. Please try again later.`
      );
    } finally {
      setIsLoading(false);
    }
  };
  // Function to refresh the passcode
  const refreshPasscode = () => {
    const newPasscode = generatePasscode();
    setFormData((prevFormData) => ({
      ...prevFormData,
      meetingPasscode: newPasscode,
    }));
  };

  // Automatically generate passcode when the component mounts or when the start date changes
  useEffect(() => {
    if (!formData.meetingPasscode) {
      refreshPasscode();
    }
  }, [formData.startDate]);

  // Update formData when time zone is selected
  const handleTimeZoneSelect = (selectedTimeZone) => {
    setSelectedTimeZone(selectedTimeZone);
    setFormData((prevFormData) => ({
      ...prevFormData,
      timeZone: selectedTimeZone,
    }));
  };

  // Update formData for other input fields
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   
    const updatedFormData = {
      ...formData,
      projectId: project._id,
    };
    try {
      const response = await axios.post(`http://localhost:8008/api/create/meeting`, updatedFormData);
      
      if (response.status === 201) { 
        refetchMeetings(); 
        // Refetch meetings after successful creation
      }
      onClose();
    } catch (error) {
      console.error("Error creating meeting:", error);
      console.error("Error creating meeting data:", error.response.data.error);
      toast.error(`${error.response.data.error}`)
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 ">
      <div className="bg-white rounded-lg w-[600px] max-w-2xl ">
        <h3 className="text-2xl text-custom-dark-blue-2 font-semibold mx-10 py-5">
          Add New Meeting
        </h3>

        <div className="px-5 space-y-2 ">
          <div className="flex justify-start items-center gap-5">
            <InputField
              label="Title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Meeting Title"
            />
            <div className="">
              <label
                htmlFor="moderator"
                className="block sm:text-sm font-semibold mb-2 text-sm text-black"
              >
                Moderator
              </label>
              <select
                name="moderator"
                id="moderator"
                value={formData.moderator}
                onChange={handleInputChange}
                className="px-4 py-1 sm:py-2 border border-[#000000] rounded-lg flex items-center justify-between w-full text-custom-dark-blue-1 z-50"
              >
                <option value="">Select Moderator</option>
                {contacts.map((contact, index) => (
                  <option key={index} value={contact._id}>
                    {contact.firstName} {contact.lastName}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <InputField
            label="Description"
            placeholder="Write Description"
            className="w-full"
            name="description"
            type="text"
            value={formData.description}
            onChange={handleInputChange}
          />
          <div>
            <div className="flex justify-start items-start gap-5 flex-col md:flex-row">
              <div>
                <p className="block text-sm font-semibold mb-2">Start Time</p>
                <div className="flex items-center">
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border-[0.5px] rounded-lg focus:outline-none border-black"
                  />
                  <input
                    type="time"
                    name="startTime"
                    value={formData.startTime}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border-[0.5px] rounded-lg focus:outline-none ml-2 border-black"
                  />
                </div>
              </div>
            </div>
              <div>
                <FormDropdownLabel className="mb-2 z-50">
                  Time Zone
                </FormDropdownLabel>
                <Dropdown
                  options={timeZone}
                  selectedOption={selectedTimeZone}
                  onSelect={handleTimeZoneSelect}
                  className="w-full z-20"
                />
              </div>
            <div className="flex justify-start items-end gap-5 ">
              <InputField
                label="Duration"
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleInputChange}
                className="w-full"
              />
              <div className="flex justify-start items-center gap-2">
                <input
                  type="checkbox"
                  name="ongoing"
                  checked={formData.ongoing}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                <label htmlFor="ongoing" className="text-sm font-semibold">
                  Ongoing/TBD
                </label>
              </div>
              <div className="flex justify-start items-center gap-2">
                <input
                  type="checkbox"
                  name="enableBreakoutRoom"
                  checked={formData.enableBreakoutRoom}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                <label
                  htmlFor="enableBreakoutRoom"
                  className="text-sm font-semibold"
                >
                  Breakout Room
                </label>
              </div>
            </div>
            <div className="flex justify-start items-end gap-5 ">
              <InputField
                label="Passcode"
                name="meetingPasscode"
                type="text"
                value={formData.meetingPasscode}
                onChange={handleInputChange}
                className="w-full"
              />
              <div
                className="flex justify-start items-center gap-2 cursor-pointer"
                onClick={refreshPasscode}
              >
                <FaCircle />
                <p>Refresh</p>
              </div>
            </div>
          </div>
        <div className="flex justify-center items-center gap-5  pb-8">
          <Button
            onClick={onClose}
            variant="primary"
            type="submit"
            children="Close"
            className="px-5 py-1 rounded-xl"
          />
          <Button
            onClick={handleSubmit}
            variant="primary"
            type="submit"
            children="Save"
            className="px-5 py-1 rounded-xl"
          />
        </div>
        </div>
      </div>
    </div>
  );
};

export default AddMeetingModal;
