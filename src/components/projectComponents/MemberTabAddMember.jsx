import React, { useState, useEffect } from "react";
import InputField from "../shared/InputField";
import Button from "../shared/button";
import axios from "axios";


const MemberTabAddMember = ({
  onClose,
  project,
  fetchProjects,
  userId,
}) => {
  const [peoples, setPeoples] = useState([]);
  const [selectedRoles, setSelectedRoles] = useState({});

  const fetchContacts = async() => {
    try {
      const response = await axios.get(`http://localhost:8008/api/create/contact-from-member-tab/${userId}/${project._id}`);
      setPeoples(response.data);
    } catch (error) {
      console.error('error', error);
    }
  }
  
  console.log('peoples', peoples)

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
      .filter((person) => selectedRoles[person._id] && selectedRoles[person._id].length > 0)
      .map((person) => ({
        personId: person._id,
        roles: selectedRoles[person._id],
      }));

      console.log('selectedPeople and project id',project._id, selectedPeople)

    try {
      const response = await axios.put("http://localhost:8008/api/app-people-to-project", {
        projectId: project._id,
        people: selectedPeople,
      });
      console.log(response)
      fetchProjects(); // Refresh projects after submission
      onClose(); // Close the modal
    } catch (error) {
      console.error("Error adding people:", error);
    }
  };
  

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-8 rounded-lg w-[50%]">
        <h2 className="text-2xl font-semibold mb-4 text-custom-dark-blue-2">
        Add New Contact
        </h2>
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
                <td className="px-4 py-2 border border-gray-300">
                  {person.firstName} {person.lastName}
                </td>
                <td className="px-4 py-2 border border-gray-300 text-center">
                  <input
                    type="checkbox"
                    className="cursor-pointer"
                    checked={selectedRoles[person._id]?.includes("Admin") || false}
                    onChange={() => handleRoleChange(person._id, "Admin")}
                  />
                </td>
                <td className="px-4 py-2 border border-gray-300 text-center">
                  <input
                    type="checkbox"
                    className="cursor-pointer"
                    checked={selectedRoles[person._id]?.includes("Moderator") || false}
                    onChange={() => handleRoleChange(person._id, "Moderator")}
                  />
                </td>
                <td className="px-4 py-2 border border-gray-300 text-center">
                  <input
                    type="checkbox"
                    className="cursor-pointer"
                    checked={selectedRoles[person._id]?.includes("Observer") || false}
                    onChange={() => handleRoleChange(person._id, "Observer")}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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

export default MemberTabAddMember
