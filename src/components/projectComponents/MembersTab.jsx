import TableData from "@/components/shared/TableData";
import TableHead from "@/components/shared/TableHead";
import { useGlobalContext } from "@/context/GlobalContext";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { BsFillEnvelopeAtFill, BsThreeDotsVertical } from "react-icons/bs";
import { FaShareAlt, FaUser } from "react-icons/fa";
import { IoTrashSharp } from "react-icons/io5";
import { RiPencilFill } from "react-icons/ri";


const MembersTab = ({ project }) => {


  const handleEditMember = (member) => {
    // Handle edit logic here, e.g., open an edit modal
    console.log("Edit Member:", member);
  };

  const handleRemoveMember = async (memberId) => {
    // Handle remove logic here, e.g., make an API call to remove the member
    console.log("Remove Member ID:", memberId);
    try {
      await axios.delete(`http://localhost:8008/api/remove-member/${memberId}`);
      alert("Member removed successfully");
      // You can refresh the project members here after successful removal
    } catch (error) {
      console.error("Error removing member:", error);
      alert("Failed to remove member. Please try again.");
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded-lg ">
        <thead className="border-b-[0.5px] border-solid border-custom-dark-blue-1">
          <tr>
            <TableHead>Member Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Added Date</TableHead>
            <TableHead>Last Updated On</TableHead>
            <TableHead>Action</TableHead>
          </tr>
        </thead>
        <tbody>
          {project?.members?.map((member) => (
            <tr key={member._id} className="hover:bg-gray-100 py-1">
              <TableData>
                {member?.userId?.firstName} {member?.userId?.lastName}
              </TableData>
              <TableData>
                {member?.roles?.join(', ')} {/* Display all roles (e.g., Admin, Moderator) */}
              </TableData>
              <TableData>
                {new Date(member?.userId?.addedDate).toLocaleDateString()} {/* Format Added Date */}
              </TableData>
              <TableData>
                {new Date(member?.userId?.lastUpdatedOn).toLocaleDateString()} {/* Format Last Updated On */}
              </TableData>
              <TableData>
                {/* Actions (Edit, Remove) */}
                <div className="flex items-center space-x-2">
                  <button
                    className="text-blue-500 hover:text-blue-700"
                    onClick={() => handleEditMember(member)}
                  >
                    <RiPencilFill />
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleRemoveMember(member._id)}
                  >
                    <IoTrashSharp />
                  </button>
                </div>
              </TableData>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MembersTab;
