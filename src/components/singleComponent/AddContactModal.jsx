import React, { useState, useEffect } from "react";
import InputField from "../shared/InputField";
import Button from "../shared/button";
import { useGlobalContext } from "@/context/GlobalContext";
import toast from "react-hot-toast";

const AddContactModal = ({
  onClose,
  contactToEdit,
  isEditing,
  fetchContacts,
  userId,
}) => {
  const [firstName, setFirstName] = useState(contactToEdit?.firstName || "");
  const [lastName, setLastName] = useState(contactToEdit?.lastName || "");
  const [email, setEmail] = useState(contactToEdit?.email || "");
  const [companyName, setCompanyName] = useState(
    contactToEdit?.companyName || ""
  );

  const [roles, setRoles] = useState({
    Admin: contactToEdit?.roles?.includes("Admin") || false,
    Moderator: contactToEdit?.roles?.includes("Moderator") || false,
    Observer: contactToEdit?.roles?.includes("Observer") || false,
  });

  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const { user } = useGlobalContext();

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setRoles((prevRoles) => ({
      ...prevRoles,
      [name]: checked,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const selectedRoles = Object.keys(roles).filter((role) => roles[role]);

    try {
      const response = await fetch(
        isEditing
          ? `http://localhost:8008/api/update-contact/${contactToEdit._id}`
          : `http://localhost:8008/api/create/contact`,
        {
          method: isEditing ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName,
            lastName,
            email,
            companyName,
            roles: selectedRoles,
            createdBy: user._id,
          }),
        }
      );

      const responseData = await response.json();

      if (response.ok) {
        setSuccessMessage(
          isEditing
            ? "Contact updated successfully."
            : "Contact created successfully."
        );
        setError(null);
        fetchContacts(userId);
      } else {
        // Handle different types of errors returned from the server
        if (response.status === 400) {
          setError(
            responseData.message ||
              "Invalid data provided. Please check your input."
          );
          toast.error(`${responseData.message}`);
        } else if (response.status === 401) {
          setError("Unauthorized access. Please verify your credentials.");
          toast.error(`${responseData.message}`);
        } else if (response.status === 500) {
          setError("Internal server error. Please try again later.");
          toast.error(`${responseData.message}`);
        } else {
          setError("An unexpected error occurred. Please try again.");
          toast.error(`${responseData.message}`);
        }
        setSuccessMessage(null);
      }
    } catch (error) {
      console.error(error);
      setError(error.message);
      setSuccessMessage(null);
    } finally {
      console.error(error);

      onClose();
    }
  };

  const handleCloseErrorModal = () => {
    setError(null);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-8 rounded-lg w-[420px]">
        <h2 className="text-2xl font-semibold mb-1 text-custom-dark-blue-2">
          {isEditing ? "Edit Contact" : "Add New Contact"}
        </h2>

        {error && (
          <div className="text-red-500 mb-4">
            {error} <button onClick={handleCloseErrorModal}>Close</button>
          </div>
        )}
        {successMessage && (
          <div className="text-green-500 mb-4">{successMessage}</div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="flex justify-center items-center gap-3">
            <InputField
              label="First Name"
              type="text"
              name="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <InputField
              label="Last Name"
              type="text"
              name="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <InputField
            label="Email"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputField
            label="Company Name"
            type="text"
            name="company-name"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />

          {/* Role Checkboxes */}
          <div className="mt-4">
            <label className="block text-sm font-semibold mb-2">Role</label>
            <div className="flex flex-col mt-2">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  name="Admin"
                  checked={roles.Admin}
                  onChange={handleCheckboxChange}
                  className="form-checkbox cursor-pointer"
                />
                <span className="ml-2">Admin</span>
              </label>
              <label className="inline-flex items-center mt-2">
                <input
                  type="checkbox"
                  name="Moderator"
                  checked={roles.Moderator}
                  onChange={handleCheckboxChange}
                  className="form-checkbox cursor-pointer"
                />
                <span className="ml-2">Moderator</span>
              </label>
              <label className="inline-flex items-center mt-2">
                <input
                  type="checkbox"
                  name="Observer"
                  checked={roles.Observer}
                  onChange={handleCheckboxChange}
                  className="form-checkbox cursor-pointer"
                />
                <span className="ml-2">Observer</span>
              </label>
            </div>
          </div>

          {/* Button */}
          <div className="flex justify-end gap-4 mt-4">
            <Button
              variant="cancel"
              onClick={onClose}
              className="rounded-xl text-center py-2 px-5 shadow-[0px_3px_6px_#09828F69]"
            >
              {"Cancel"}
            </Button>
            <Button
              type="submit"
              variant="save"
              className="rounded-xl text-center py-2 px-5 shadow-[0px_3px_6px_#09828F69]"
            >
              {isEditing ? "Update" : "Save"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddContactModal;
