import Button from "@/components/shared/button";
import TableData from "@/components/shared/TableData";
import TableHead from "@/components/shared/TableHead";
import { useState } from "react";
import { IoTrashSharp } from "react-icons/io5";
import { RiPencilFill } from "react-icons/ri";
import PollDetailsModal from "./PollDetailsModal";

const PoolsTab = ({ project, fetchProjects, userId, polls }) => {
  const [selectedPoll, setSelectedPoll] = useState(null); 
  const [isViewPollModalOpen, setIsViewPollModalOpen] = useState(false);

  const handleViewPoll = (poll) => {
    setSelectedPoll(poll);
    setIsViewPollModalOpen(true); 
  };

  const handleCloseModal = () => {
    setIsViewPollModalOpen(false);
    setSelectedPoll(null); 
  };

  // Function to handle saving the edited member role

  const handleSaveMember = async (updatedMember) => {
    try {
      const response = await axios.put(
        `http://localhost:8008/api/edit-member-role/${project._id}`,
        {
          updatedMember: updatedMember,
        }
      );

      if (response.status === 200) {
        toast.success(`${response.data.message}`);
        fetchProjects(userId);
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
      toast.error(`${error.response.data.message}`);
    }

    setIsModalOpen(false);
  };

  const handleRemoveMember = async (memberId) => {
    // Handle remove logic here, e.g., make an API call to remove the member
    console.log("Remove Member ID:", memberId);
    try {
      const response = await axios.delete(
        `http://localhost:8008/api/delete-member-from-project/${project._id}/${memberId}`
      );

      if (response.status === 200) {
        toast.success(`${response.data.message}`);
        fetchProjects(userId);
      }
    } catch (error) {
      console.error("Error removing member:", error);
      toast.error(`${error.response.data.message}`);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded-lg ">
        <thead className="border-b-[0.5px] border-solid border-custom-dark-blue-1">
          <tr>
            <TableHead>Title</TableHead>
            <TableHead>Total Questions</TableHead>
            <TableHead>Created By</TableHead>
            <TableHead>Added Date</TableHead>
            <TableHead>Last Updated On</TableHead>
            <TableHead></TableHead>
            <TableHead>Action</TableHead>
            <TableHead></TableHead>
          </tr>
        </thead>
        <tbody>
          {polls?.map((poll) => (
            <tr key={poll._id}>
              <TableData>{poll.pollName}</TableData>
              <TableData>{poll.questions.length}</TableData>
              <TableData>{poll?.createdBy?.firstName}</TableData>
              <TableData>
                {new Intl.DateTimeFormat("en-US", {
                  month: "long", // Full month name
                  day: "2-digit",
                  year: "numeric",
                }).format(new Date(poll.createdAt))}
              </TableData>
              <TableData>
                {new Intl.DateTimeFormat("en-US", {
                  month: "long", // Full month name
                  day: "2-digit",
                  year: "numeric",
                }).format(new Date(poll.updatedAt))}
              </TableData>
              <TableData>
                <Button 
                children={"View"}
                onClick={() => handleViewPoll(poll)}
                className=" font-semibold " variant="plain" type="button"/>
                
              </TableData>
              <TableData>
                <div className="flex items-center space-x-2">
                  <button className="text-blue-500 hover:text-blue-700">
                    <RiPencilFill />
                  </button>
                  <button className="text-red-500 hover:text-red-700">
                    <IoTrashSharp />
                  </button>
                </div>
              </TableData>
              <TableData>
              <div className="flex items-center space-x-2">
                <Button 
                children={"Active"}
                className=" font-semibold " variant="plain" type="button"/>
                <Button 
                children={"Inactive"}
                className=" font-semibold " variant="plain" type="button"/>
              </div>
              </TableData>
            </tr>
          ))}
        </tbody>
      </table>
      {
        isViewPollModalOpen && (
          <PollDetailsModal
          poll={selectedPoll}
          onClose={handleCloseModal}
          />
        )
      }
    </div>
  );
};

export default PoolsTab;
