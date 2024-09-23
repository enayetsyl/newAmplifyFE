import TableData from "@/components/shared/TableData";
import TableHead from "@/components/shared/TableHead";
import { useState } from "react";
import { IoTrashSharp } from "react-icons/io5";
import { RiPencilFill } from "react-icons/ri";



const PoolsTab = ({ project, fetchProjects, userId }) => {


  const [selectedMember, setSelectedMember] = useState(null); // Store the selected member for editing
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEditMember = (member) => {
    setSelectedMember(member);
    setIsModalOpen(true); // Open the modal
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMember(null); // Clear the selected member when modal closes
  };

  // Function to handle saving the edited member role

  const handleSaveMember = async (updatedMember) => {

      try {
        const response = await axios.put(
          `http://localhost:8008/api/edit-member-role/${project._id}`,
          {
            updatedMember: updatedMember
          }
        );

        if(response.status === 200) {
          toast.success(`${response.data.message}`)
          fetchProjects(userId);
        } 
        
        
      } catch (error) {
        console.error("Error fetching projects:", error);
        toast.error(`${error.response.data.message}`)
      } 
    
    
    setIsModalOpen(false); 
    
  }

  const handleRemoveMember = async (memberId) => {
    // Handle remove logic here, e.g., make an API call to remove the member
    console.log("Remove Member ID:", memberId);
    try {
      const response = await axios.delete(`http://localhost:8008/api/delete-member-from-project/${project._id}/${memberId}`);

      if(response.status === 200) {
        toast.success(`${response.data.message}`)
        fetchProjects(userId);
      } 
      
    } catch (error) {
      console.error("Error removing member:", error);
      toast.error(`${error.response.data.message}`)
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
            <TableHead>Action</TableHead>
          </tr>
        </thead>
        
      </table>
      {/* {isModalOpen && (
        <EditMemberModal
          member={selectedMember}
          onClose={handleCloseModal}
          onSave={handleSaveMember}
          
        />
      )} */}
    </div>
  );
};

export default PoolsTab;
