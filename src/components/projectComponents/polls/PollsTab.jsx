import TableData from "@/components/shared/TableData";
import TableHead from "@/components/shared/TableHead";
import { useState } from "react";
import { IoTrashSharp } from "react-icons/io5";
import { RiPencilFill } from "react-icons/ri";
import PollDetailsModal from "./PollDetailsModal";
import toast from "react-hot-toast";
import axios from "axios";
import AddPollModal from "./AddPollModal";
import Button from "@/components/shared/button";

const PollsTab = ({ project, fetchProjects, userId, polls }) => {
  const [selectedPoll, setSelectedPoll] = useState(null);
  const [isViewPollModalOpen, setIsViewPollModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isAddPollModalOpen, setIsAddPollModalOpen] = useState(false); // Add modal state

  const handleViewPoll = (poll) => {
    setSelectedPoll(poll);
    setIsViewPollModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsViewPollModalOpen(false);
    setSelectedPoll(null);
  };

  const handleStatusChange = async (poll, newStatus) => {
    setIsLoading(true);
    try {
      const response = await axios.patch(
        `https://amplifybe-2.onrender.com/api/change-active-status/${poll._id}`,
        { isActive: newStatus }
      );

      if (response.status === 200) {
        toast.success(response.data.message);
        fetchProjects(userId);
      }
    } catch (error) {
      console.error("Error updating poll status:", error);
      toast.error("Error updating poll status");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditPoll = (poll) => {
    setSelectedPoll(poll);
    setIsAddPollModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setIsAddPollModalOpen(false);
    setSelectedPoll(null);
  };

  const handleDeletePoll = async (pollId) => {
    if (!window.confirm("Are you sure you want to delete this poll?")) return;

    setIsLoading(true);
    try {
      const response = await axios.delete(
        `https://amplifybe-2.onrender.com/api/delete/poll/${pollId}`
      );

      if (response.status === 200) {
        toast.success(response.data.message);
        fetchProjects(userId);
      }
    } catch (error) {
      console.error("Error deleting poll:", error);
      toast.error("Error deleting poll");
    } finally {
      setIsLoading(false);
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
                  className=" font-semibold "
                  variant="plain"
                  type="button"
                />
              </TableData>
              <TableData>
                <div className="flex items-center space-x-2">
                  <button
                    className="text-blue-500 hover:text-blue-700"
                    onClick={() => handleEditPoll(poll)}
                    disabled={isLoading}
                  >
                    <RiPencilFill />
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDeletePoll(poll._id)} // Trigger delete functionality
                    disabled={isLoading}
                  >
                    <IoTrashSharp />
                  </button>
                </div>
              </TableData>
              <TableData>
                <div className="flex items-center space-x-2">
                  <Button
                    children={"Active"}
                    disabled={poll.isActive || isLoading}
                    onClick={() => handleStatusChange(poll, true)}
                    className=" font-semibold "
                    variant="plain"
                    type="button"
                  />

                  <Button
                    children={"Inactive"}
                    disabled={!poll.isActive || isLoading}
                    onClick={() => handleStatusChange(poll, false)}
                    className=" font-semibold "
                    variant="plain"
                    type="button"
                  />
                </div>
              </TableData>
            </tr>
          ))}
        </tbody>
      </table>
      {isViewPollModalOpen && (
        <PollDetailsModal poll={selectedPoll} onClose={handleCloseModal} />
      )}

      {isAddPollModalOpen && (
        <AddPollModal
          onClose={handleCloseAddModal}
          pollToEdit={selectedPoll}
          project={project}
          fetchProjects={fetchProjects}
        />
      )}
    </div>
  );
};

export default PollsTab;
