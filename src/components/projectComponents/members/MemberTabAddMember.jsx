import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "@/components/shared/button";

const MemberTabAddMember = ({ onClose, project,  userId, setLocalProjectState }) => {
  const [peoples, setPeoples] = useState([]);
  const [selectedRoles, setSelectedRoles] = useState({});
  const fetchContacts = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/create/contact-from-member-tab/${userId}/${project?._id}`
      );
      setPeoples(response.data);
    } catch (error) {
      console.error("error", error);
    }
  };


  useEffect(() => {
    fetchContacts();
  }, []);

  // Handle checkbox toggle
  const handleRoleChange = (personId, role) => {
    setSelectedRoles((prevRoles) => {
      const rolesForPerson = prevRoles[personId] || [];
      if (rolesForPerson.includes(role)) {
        // Remove role if it is already selected
        return {
          ...prevRoles,
          [personId]: rolesForPerson.filter((r) => r !== role),
        };
      } else {
        // Add the role to the person's roles
        return {
          ...prevRoles,
          [personId]: [...rolesForPerson, role],
        };
      }
    });
  };

  const handleSubmit = async () => {
    const selectedPeople = peoples
      .filter(
        (person) =>
          selectedRoles[person._id] && selectedRoles[person._id].length > 0
      )
      .map((person) => ({
        personId: person._id,
        roles: selectedRoles[person._id],
      }));


    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/app-people-to-project`,
        {
          projectId: project._id,
          people: selectedPeople,
        }
      );
      if (response.status === 200) {
        setLocalProjectState(response.data.updatedProject);
      }
      onClose();
    } catch (error) {
      console.error("Error adding people:", error);
    }
  };

  // Function to copy the registration link
  const handleCopyLink = () => {
    navigator.clipboard.writeText("https://new-amplify-fe-kj4c.vercel.app/register");
    alert("Link copied to clipboard!");
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-8 rounded-lg w-[50%]">
        <h2 className="text-2xl font-semibold mb-4 text-custom-dark-blue-2">
          Add New Contact
        </h2>
        <div className="max-h-96 overflow-y-auto border border-gray-300 rounded-lg">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-2 border border-gray-300">Name</th>
                <th className="px-4 py-2 border border-gray-300">Admin</th>
                <th className="px-4 py-2 border border-gray-300">Moderator</th>
                <th className="px-4 py-2 border border-gray-300">Observer</th>
              </tr>
            </thead>
            <tbody>
              {peoples.map((person) => (
                <tr key={person._id}>
                  <td className="px-4 py-2 border border-gray-300 text-sm font-semibold">
                    {person.firstName} {person.lastName}
                    {!person.isUser && (
                      <span className="text-xs font-normal block">
                        {person.email}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-2 border border-gray-300 text-center">
                    <input
                      type="checkbox"
                      className="cursor-pointer"
                      checked={
                        selectedRoles[person._id]?.includes("Admin") || false
                      }
                      onChange={() => handleRoleChange(person._id, "Admin")}
                      disabled={!person.isUser}
                    />
                  </td>
                  <td className="px-4 py-2 border border-gray-300 text-center">
                    <input
                      type="checkbox"
                      className="cursor-pointer"
                      checked={
                        selectedRoles[person._id]?.includes("Moderator") ||
                        false
                      }
                      onChange={() => handleRoleChange(person._id, "Moderator")}
                      disabled={!person.isUser}
                    />
                  </td>
                  <td className="px-4 py-2 border border-gray-300 text-center">
                    <input
                      type="checkbox"
                      className="cursor-pointer"
                      checked={
                        selectedRoles[person._id]?.includes("Observer") || false
                      }
                      onChange={() => handleRoleChange(person._id, "Observer")}
                      disabled={!person.isUser}
                    />
                  </td>
                  <td className="px-4 py-2 border border-gray-300 text-center">
                    {!person.isUser && (
                      <Button
                        className=" text-white px-3 py-1 rounded-lg text-xs"
                        variant="secondary"
                        type="button"
                        onClick={handleCopyLink}
                      >
                        Copy Link
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center items-center gap-5 pt-5">
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
            children="Add People"
            className="px-5 py-1 rounded-xl"
          />
        </div>
      </div>
    </div>
  );
};

export default MemberTabAddMember;
