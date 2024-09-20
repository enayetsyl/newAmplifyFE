import React, { useState } from "react";
import { BsCheckCircle } from "react-icons/bs";

const ShareProjectModal = ({ project, onClose }) => {
  const [accessLevel, setAccessLevel] = useState("Observer Access");

  const handleCopyInvite = () => {
    const inviteText =
      accessLevel === "Observer Access"
        ? `Nancy Jones has just created a Project named ${project.name}. The project is now accessible to you as an observer.\n\nJoin Project\nhttps://amplify.us/j/${project._id}\nPasscode: ${project.projectPasscode}\n\nOr\n\nCreate an account\nhttps://amplify.us/register`
        : `Nancy Jones has invited you to a scheduled meeting for the project ${project.name}.\n\nTitle: Focus Group Meeting\nJoin Meeting\nhttps://amplify.us/j/${project._id}`;

    navigator.clipboard.writeText(inviteText);
    alert("Project invite copied to clipboard!");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-4/5 md:w-2/5 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-5xl"
        >
          &times;
        </button>

        {/* Checkmark icon */}
        <div className="flex justify-center items-center my-4 text-6xl text-green-500">
          <BsCheckCircle />
        </div>

        {/* Title and message */}
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          Project is successfully created!
        </h2>
        <h3 className="text-md text-center text-gray-500 mb-4">
          {accessLevel === "Observer Access"
            ? "Share project"
            : "Generate link to share"}
        </h3>

        {/* Dropdown for access level */}
        <div className="mb-4 flex justify-center">
          <select
            value={accessLevel}
            onChange={(e) => setAccessLevel(e.target.value)}
            className="p-2 border rounded-md w-1/2 text-center text-gray-700"
          >
            <option value="Observer Access">Observer Access</option>
            <option value="Participant Access">Participant Access</option>
          </select>
        </div>

        {/* Conditional content based on access level */}
        {accessLevel === "Observer Access" ? (
          <div className="p-4 border rounded-md mb-4">
            <p className="text-sm">
              Nancy Jones has just created a Project named{" "}
              <strong>{project.name}</strong>. The project is now accessible to
              you as an observer.
            </p>
            <p className="mt-2 text-sm">
              <strong>Join Project</strong>
              <br />
              <a
                href={`https://amplify.us/j/${project._id}`}
                className="text-blue-500"
              >
                https://amplify.us/j/{project._id}
              </a>
            </p>
            <p className="mt-2 text-sm">
              <strong>Passcode:</strong> {project.projectPasscode}
            </p>
            <p className="mt-4 text-sm">Or</p>
            <p className="mt-2 text-sm">
              <strong>Create an account</strong>
              <br />
              <a
                href={`https://amplify.us/register/${project._id}`}
                className="text-blue-500"
              >
                https://amplify.us/register/{project._id}
              </a>
            </p>
          </div>
        ) : (
          <div className="p-4 border rounded-md mb-4">
            <p className="text-sm">
              Nancy Jones has invited you to a scheduled meeting for the project{" "}
              <strong>{project.name}</strong>.
            </p>
            <p className="mt-2 text-sm">
              <strong>Title:</strong> Focus Group Meeting
            </p>
            <p className="mt-2 text-sm">
              <strong>Join Meeting</strong>
              <br />
              <a
                href={`https://amplify.us/j/${project._id}/meet12`}
                className="text-blue-500"
              >
                https://amplify.us/j/{project._id}/meet12
              </a>
            </p>
          </div>
        )}

        {/* Copy button */}
        <button
          onClick={handleCopyInvite}
          className="bg-custom-teal text-white w-full py-2 rounded-md hover:bg-teal-700"
        >
          {accessLevel === "Observer Access"
            ? "Copy Project Invite"
            : "Copy Meeting Invite"}
        </button>
      </div>
    </div>
  );
};

export default ShareProjectModal;
