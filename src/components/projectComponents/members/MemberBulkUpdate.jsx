import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "@/components/shared/button";
import toast from "react-hot-toast";

const MemberBulkUpdate = ({ onClose, project, setLocalProjectState}) => {
  const [members, setMembers] = useState([]);
  useEffect(() => {
    if (project && project.members) {
      setMembers(project.members);
    }
  }, [project]);

  // Handle checkbox toggle
  const handleRoleChange = (personId, role) => {
    setMembers((prevMembers) =>
      prevMembers.map((member) => {
        if (member?.userId === personId) {
          if (member.roles.includes(role)) {
            // Remove the role if already included
            return {
              ...member,
              roles: member?.roles?.filter((r) => r !== role),
            };
          } else {
            // Add the role if not included
            return {
              ...member,
              roles: [...member.roles, role],
            };
          }
        }
        return member;
      })
    );
  };

  const handleSubmit = async () => {
   
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/project/updateBulkMembers`,
        {
          projectId: project._id,
          members: members,
        }
      );
    console.log('response. data', response.data)
      if (response.status === 200) {
        toast.success(`${response.data.message}`);
      setLocalProjectState(response.data.updatedProject);
      }
      onClose(); 
    } catch (error) {
      console.error("Error updating members:", error);
    }
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-8 rounded-lg w-[50%]">
        <h2 className="text-2xl font-semibold mb-4 text-custom-dark-blue-2">
          Bulk Update
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
            {members?.map((member) => (
              <tr key={member?._id}>
                <td className="px-4 py-2 border border-gray-300">
                  {member?.userId?.firstName} {member?.userId?.lastName}
                </td>
                <td className="px-4 py-2 border border-gray-300 text-center">
                  <input
                    type="checkbox"
                    checked={member?.roles?.includes("Admin")}
                    onChange={() => handleRoleChange(member?.userId, "Admin")}
                    className="cursor-pointer"
                  />
                </td>
                <td className="px-4 py-2 border border-gray-300 text-center">
                  <input
                    type="checkbox"
                    checked={member?.roles.includes("Moderator")}
                    onChange={() =>
                      handleRoleChange(member.userId, "Moderator")
                    }
                    className="cursor-pointer"
                  />
                </td>
                <td className="px-4 py-2 border border-gray-300 text-center">
                  <input
                    type="checkbox"
                    checked={member?.roles.includes("Observer")}
                    onChange={() => handleRoleChange(member.userId, "Observer")}
                    className="cursor-pointer"
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

export default MemberBulkUpdate;
