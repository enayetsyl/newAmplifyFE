import Button from "@/components/shared/button";
import TableData from "@/components/shared/TableData";
import TableHead from "@/components/shared/TableHead";
import axios from "axios";
import toast from "react-hot-toast";

const RepositoryTab = ({
  repositories,
  selectedRepositoryMeetingTab,
  selectedDocAndMediaTab,fetchRepositories, projectId
}) => {
 

  const renameFile = async (id) => {
    try {
      const newFileName = prompt("Enter the new file name:");
      if (!newFileName) return;
      console.log('id, newFileName', id, newFileName);
      const response = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/rename-file/${id}`, {
        fileName: newFileName,
      });

    if (response.status === 200) {
        toast.success(`${response.data.message}`);
        fetchRepositories(projectId);
      } else {
        toast.error(`${response.data.message}`);
      }

   
    } catch (error) {
      toast.error(`${error.response.data.message}`)
      console.error("Error renaming file:", error);
    }
  };

  const deleteFile = async (id) => {
    try {
      const response = await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/delete-file/${id}`);

      if (response.status === 200) {
        fetchRepositories(projectId);
        toast.success(`${response.data.message}`);
      } else {
        toast.error(`${response.data.message}`);
      }

    } catch (error) {
      console.error("Error deleting file:", error);
      toast.error(`${error.response.data.message}`)
    }
  };

  const downloadFile = async (url, fileName) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch the file');
      }
  
      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);
  
      const link = document.createElement('a');
      link.href = objectUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
  
      // Clean up
      document.body.removeChild(link);
      URL.revokeObjectURL(objectUrl);
    } catch (error) {
      console.error('Error downloading file:', error);
      toast.error('Failed to download the file.');
    }
  };
  

  const filteredRepositories = selectedRepositoryMeetingTab
    ? repositories.filter(
        (repo) => repo.meetingId === selectedRepositoryMeetingTab._id
      )
    : [];

  const displayRepositories = filteredRepositories.filter((repo) => {
    if (selectedDocAndMediaTab === "Documents") {
      return repo.type === "application/pdf";
    } else if (selectedDocAndMediaTab === "Media") {
      return repo.type !== "application/pdf";
    }
    return true;
  });

  const renderContent = () => {
    if (displayRepositories.length === 0) {
      return (
        <p className="text-center pt-5 font-bold text-custom-orange-1">
          No {selectedDocAndMediaTab.toLowerCase()} found for this meeting.
        </p>
      );
    }

    return (
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg ">
          <thead className="border-b-[0.5px] border-solid border-custom-dark-blue-1">
            <tr>
              <TableHead>File Name</TableHead>
              <TableHead>File Type</TableHead>
              <TableHead>Size</TableHead>
              <TableHead>Added By</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Action</TableHead>
            </tr>
          </thead>
          <tbody>
            {displayRepositories?.map((repo) => (
              <tr key={repo._id}>
                <TableData>{repo.fileName}</TableData>
                <TableData>{repo.type}</TableData>
                <TableData>{repo.size}</TableData>
                <TableData>{repo.addedBy}</TableData>
                <TableData>{repo.role}</TableData>
                <TableData>
                  <div className="flex flex-col justify-center items-center gap-1">
                    <Button
                      children={"Rename"}
                      type="button"
                      variant="plain"
                      className=" text-xs px-2 font-semibold"
                      onClick={() => renameFile(repo._id)}
                    ></Button>
                    <Button
                      children={"Delete"}
                      type="button"
                      variant="plain"
                      className=" text-xs px-2   font-semibold"
                      onClick={() => deleteFile(repo._id)}
                    ></Button>
                    <Button
                    onClick={() => downloadFile(repo.cloudinaryLink, repo.fileName)}
                      children={"Download"}
                      type="button"
                      variant="plain"
                      className=" text-xs px-2 font-semibold"
                    ></Button>
                  </div>
                </TableData>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div>
      {selectedRepositoryMeetingTab && selectedDocAndMediaTab ? (
        renderContent()
      ) : (
        <p className="text-center pt-5 font-bold text-custom-orange-1">
          Please select a meeting and a tab (Documents or Media) to view
          repository items.
        </p>
      )}
    </div>
  );
};

export default RepositoryTab;
