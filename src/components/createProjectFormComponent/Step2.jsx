import React, { useState, useEffect } from "react";
import HeadingLg from "../shared/HeadingLg";

const Step2 = ({ formData, setFormData, contacts, setContacts, isLoading }) => {
  const [selectedRoles, setSelectedRoles] = useState({});

  // Handle role selection (checkbox)
  const handleRoleChange = (index, role) => {
    setSelectedRoles((prevSelectedRoles) => {
      const updatedRoles = prevSelectedRoles[index] || [];
      let newRoles;

      if (updatedRoles.includes(role)) {
        // If role is already selected, remove it
        newRoles = updatedRoles.filter((r) => r !== role);
      } else {
        // Add the selected role
        newRoles = [...updatedRoles, role];
      }

      return {
        ...prevSelectedRoles,
        [index]: newRoles,
      };
    });
  };

  // Use useEffect to update formData only after the role state has been updated
  useEffect(() => {
    const updatedMembers = contacts
      .map((contact, index) => {
        const rolesForMember = selectedRoles[index] || [];
        return rolesForMember.length > 0
          ? { userId: contact._id, email: contact.email, roles: rolesForMember }
          : null;
      })
      .filter((member) => member !== null); // Filter out members with no roles

    setFormData((prevFormData) => ({
      ...prevFormData,
      members: updatedMembers,
    }));
  }, [selectedRoles, contacts, setFormData]); // Update formData whenever roles or contacts change

  if (isLoading) {
    return <p className="text-center text-5xl text-custom-dark-blue-1 font-bold">Loading... Please wait</p>;
  }

  return (
    <div className="px-5 md:px-0">
      <p className="text-custom-teal text-2xl font-bold text-center">Add People</p>

      {/* participant list div */}
      <div className="pt-3">
        <HeadingLg children="Participant List" />
        <div className="border-[0.5px] border-solid border-custom-dark-blue-1 rounded-xl h-[300px] overflow-y-scroll mt-2">
          {contacts && contacts.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full">
              <p className="text-center text-lg font-bold text-custom-dark-blue-1">NO PEOPLE FOUND</p>
              <p className="text-center text-sm text-custom-dark-blue-2">Try sharing the project after creating the project.</p>
            </div>
          ) : (
            <table className="w-full text-left">
              <thead>
                <tr>
                  <th className="px-4 py-2 border-b-2 border-custom-dark-blue-1">Name</th>
                  <th className="px-4 py-2 border-b-2 border-custom-dark-blue-1">Admin</th>
                  <th className="px-4 py-2 border-b-2 border-custom-dark-blue-1">Moderator</th>
                  <th className="px-4 py-2 border-b-2 border-custom-dark-blue-1">Observer</th>
                </tr>
              </thead>
              <tbody>
                {contacts?.map((contact, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="px-4 py-2 border-b border-custom-dark-blue-1">
                      {contact.firstName} {contact.lastName}
                    </td>
                    <td className="px-4 py-2 border-b border-custom-dark-blue-1 text-center">
                      <input
                        type="checkbox"
                        checked={selectedRoles[index]?.includes("Admin") || false}
                        onChange={() => handleRoleChange(index, "Admin")}
                      />
                    </td>
                    <td className="px-4 py-2 border-b border-custom-dark-blue-1 text-center">
                      <input
                        type="checkbox"
                        checked={selectedRoles[index]?.includes("Moderator") || false}
                        onChange={() => handleRoleChange(index, "Moderator")}
                      />
                    </td>
                    <td className="px-4 py-2 border-b border-custom-dark-blue-1 text-center">
                      <input
                        type="checkbox"
                        checked={selectedRoles[index]?.includes("Observer") || false}
                        onChange={() => handleRoleChange(index, "Observer")}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Step2;
