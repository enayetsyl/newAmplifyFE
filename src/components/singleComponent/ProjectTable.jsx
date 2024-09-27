"use client";

import React, { useState, useEffect, useRef } from "react";
import TableHead from "../shared/TableHead";
import TableData from "../shared/TableData";
import { BsFillEnvelopeAtFill, BsThreeDotsVertical } from "react-icons/bs";
import { FaShareAlt, FaUser } from "react-icons/fa";
import { RiPencilFill } from "react-icons/ri";
import ViewProject from "./ViewProject";
import ShareProjectModal from "../projectComponents/ShareProjectModal";
import Button from "../shared/button";

const ProjectTable = ({ projects, setProjects, fetchProjects, user }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const [selectedProject, setSelectedProject] = useState(null);
  const [viewProject, setViewProject] = useState(false);
  const [isShareProjectModalOpen, setIsShareProjectModalOpen] = useState(false);
  const modalRef = useRef();

  console.log("isShareProjectModalOpen", isShareProjectModalOpen);

  const getRole = (project) => {
    if (project.createdBy === user._id) {
      return "Admin";
    } else {
      const person = project?.people?.find((p) => p.userId === user._id);
      return person ? person.role : "No Role";
    }
  };

  const renderStatus = (status) => {
    const statusStyles = {
      Draft: "bg-custom-teal text-white",
      Closed: "bg-gray-400 text-white",
      Active: "bg-custom-light-blue-1 text-white",
      Complete: "bg-custom-red text-white",
      Inactive: "bg-gray-800 text-white",
    };

    return (
      <div className="flex justify-center">
        <span
          className={`w-16 text-[12px] text-center py-1 rounded-full ${statusStyles[status]}`}
        >
          {status}
        </span>
      </div>
    );
  };

  const getButtonVariant = (status) => {
    const actionVariants = {
      Draft: { label: "Edit", variant: "save" },
      Active: { label: "Continue", variant: "primary" },
      Complete: { label: "Close", variant: "default" },
      Inactive: { label: "Reactivate", variant: "default" },
      Closed: { label: "Archive", variant: "closed" },
    };

    return actionVariants[status] || { label: "Action", variant: "default" };
  };

  const handleAction = (status, project) => {
    switch (status) {
      case "Draft":
        // Redirect to edit page or open edit modal
        // Implement edit logic here
        break;
      case "Active":
        // Continue project (perhaps redirect to the project page)
        // Implement continue logic here
        break;
      case "Complete":
        // Close project
        // Implement close logic here
        break;
      case "Inactive":
        // Reactivate project
        // Implement reactivate logic here
        break;
      case "Closed":
        // Archive project
        // Implement archive logic here
        break;
      default:
    }
  };

  const handleShareProject = (project) => {
    setSelectedProject(project);
    setIsShareProjectModalOpen(true);
    closeModal();
  };

  const handleView = (project) => {
    setSelectedProject(project);
    setViewProject(true);
    closeModal();
  };

  const closeViewProject = () => {
    setViewProject(false); // Hide ViewProject component
    setSelectedProject(null);
  };

  const toggleModal = (event, project) => {
    const { top, left } = event.currentTarget.getBoundingClientRect();
    setModalPosition({ top, left });
    setSelectedProject(project);
    setIsModalOpen(!isModalOpen);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      closeModal();
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen]);

  return (
    <div className="overflow-hidden">
      {!viewProject ? (
        <div className="min-w-full overflow-x-auto p-3 md:p-8 border">
          <table className="min-w-full divide-y divide-gray-200 rounded-lg">
            <thead className="bg-custom-gray-2 rounded-lg py-2 w-full">
              <tr className="shadow-[0px_0px_26px_#00000029] w-full">
                <TableHead>Project Name</TableHead>
                <TableHead>Tags</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>End Date</TableHead>
                <TableHead>Actions</TableHead>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 rounded-lg">
              {projects.map((project) => (
                <tr
                  key={project._id}
                  className="shadow-[0px_0px_26px_#00000029] w-full"
                >
                  <TableData>{project.name}</TableData>

                  {/* Display Tags */}
                  <TableData>
                    {project.tags.length > 0 ? (
                      <div className="flex flex-wrap gap-1">
                        {project.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="bg-custom-gray-2 text-[10px] px-2 py-1 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span className="text-gray-400">No Tags</span>
                    )}
                  </TableData>

                  {/* Display Status */}
                  <TableData>{renderStatus(project.status)}</TableData>

                  {/* Display Roles */}
                  <TableData>{getRole(project)}</TableData>

                  {/* Display Start Date and Time */}
                  <TableData>
                    {new Date(project.startDate).toLocaleDateString()}{" "}
                    {project.startTime}
                  </TableData>

                  {/* Display End Date */}
                  <TableData>
                    {new Date(project.endDate).toLocaleDateString()}
                  </TableData>

                  <td className="flex justify-between items-center gap-2 relative">
                    <Button
                      variant={getButtonVariant(project.status).variant}
                      className="w-20 text-center text-[12px] rounded-xl py-1"
                      onClick={() => handleAction(project.status, project)}
                    >
                      {getButtonVariant(project.status).label}
                    </Button>
                    <BsThreeDotsVertical
                      onClick={(e) => toggleModal(e, project)}
                      className="cursor-pointer"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <ViewProject
          project={selectedProject}
          onClose={closeViewProject}
          user={user}
          fetchProjects={fetchProjects}
        />
      )}

      {isModalOpen && (
        <div
          ref={modalRef}
          className="absolute bg-white shadow-[0px_3px_6px_#0000004A] rounded-lg"
          style={{
            top: modalPosition.top + 20,
            left: modalPosition.left - 100,
          }}
        >
          <ul className="text-[12px]">
            <li
              className="py-2 px-4 hover:bg-gray-200 cursor-pointer text-[#697e89] flex justify-start items-center gap-2"
              onClick={() => handleView(selectedProject)}
            >
              <FaUser />
              <span>View</span>
            </li>
            <li
              className="py-2 px-4 hover:bg-gray-200 cursor-pointer text-[#697e89] flex justify-start items-center gap-2"
              onClick={closeModal}
            >
              <RiPencilFill />
              <span>Edit</span>
            </li>
            <li
              className="py-2 px-4 hover:bg-gray-200 cursor-pointer text-[#697e89] flex justify-start items-center gap-2"
              onClick={() => handleShareProject(selectedProject)}
            >
              <FaShareAlt />
              <span>Share</span>
            </li>
            <li
              className="py-2 px-4 hover:bg-gray-200 cursor-pointer text-[#697e89] flex justify-start items-center gap-2"
              onClick={closeModal}
            >
              <BsFillEnvelopeAtFill />
              <span>Assign Tag</span>
            </li>
          </ul>
        </div>
      )}

      {isShareProjectModalOpen && (
        <ShareProjectModal
          project={selectedProject}
          onClose={() => setIsShareProjectModalOpen(false)}
        />
      )}
    </div>
  );
};

export default ProjectTable;
