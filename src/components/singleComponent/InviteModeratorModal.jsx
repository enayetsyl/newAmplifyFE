import React, { useState } from "react";
import InputField from "../shared/InputField";
import Button from "../shared/button";

const InviteModeratorModal = ({ onClose, projectId }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/moderator-invitation/link`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName,
            lastName,
            email,
            project: "66b0a6bf824132f349bbbc84", // Assuming projectId is passed as a prop
          }),
        }
      );

      if (response.ok) {
        setSuccessMessage("Moderator created and email sent successfully.");
        setError(null);
      } else {
        const errorMessage = await response.text();
        setError(errorMessage);
        setSuccessMessage(null);
      }
    } catch (error) {
      setError("An error occurred while sending the invitation.");
      setSuccessMessage(null);
    }
  };

  const handleCloseErrorModal = () => {
    setError(null);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-8 rounded-lg w-[420px]">
        <h2 className="text-2xl font-semibold mb-1 text-custom-dark-blue-2">
          Invite Moderator
        </h2>
        <p className="text-custom-gray-6 text-[11px] mb-3">
          Invite a new moderator by entering their name and email below.
        </p>
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
          <div className="flex justify-end gap-4 mt-4">
            <Button
              type="button"
              variant="cancel"
              onClick={onClose}
              className="rounded-xl text-center py-2 px-5 shadow-[0px_3px_6px_#031F3A5c]"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="save"
              className="rounded-xl text-center py-2 px-5 shadow-[0px_3px_6px_#09828F69]"
            >
              Send Invite
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InviteModeratorModal;
