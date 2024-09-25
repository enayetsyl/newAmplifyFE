"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Search from "@/components/singleComponent/Search";
import { MdAdd } from "react-icons/md";
import NoSearchResult from "@/components/singleComponent/NoSearchResult";
import ProjectTable from "@/components/singleComponent/ProjectTable";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "@/context/GlobalContext";
import Button from "@/components/shared/Button";

const Page = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { user } = useGlobalContext();

  const fetchProjects = async (userId, page = 1) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://amplifybe-1.onrender.com/api/get-all/project/${userId}`,
        {
          params: { page, limit: 10 },
        }
      );
      setProjects(response.data.projects);
      console.log('project data set using fetchProjects', response.data.projects)
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects(user?._id);
  }, [user]);

  const handleSearch = (term) => {
    setSearchTerm(term);
    // Add your search logic here
  };

  const handleStatusSelect = (status) => {
    setSelectedStatus(status);
    // Add your status select logic here
  };

  const handleRefresh = () => {
    fetchProjects(page);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    fetchProjects(newPage);
  };

  return (
    <div className="my_profile_main_section_shadow bg-[#fafafb] bg-opacity-90 h-full min-h-screen flex flex-col justify-center items-center">
      <div className="bg-white h-20 w-full border-b">
        {/* Nav bar */}
        {/* <div className="px-10 flex justify-between items-center pt-5">
          <div>
            <p className="text-2xl font-bold text-custom-teal">Projects</p>
          </div>
          <div className="flex justify-center items-center gap-4">
            <Button
              children="Add New Project"
              type="submit"
              variant="default"
              icon={<MdAdd />}
              onClick={() => router.push(`/dashboard/create-project`)}
              className="rounded-xl w-[200px] text-center py-3 shadow-[0px_3px_6px_#2976a54d] hidden md:block"
            />
            <Button
              children=""
              type="submit"
              variant="default"
              icon={<MdAdd size={26} />}
              onClick={() => router.push(`/dashboard/create-project`)}
              className="rounded-xl w-[40px] h-[40px] flex justify-center items-center text-center py-2 shadow-[0px_3px_6px_#2976a54d] md:hidden"
            />
          </div>
        </div> */}
        <div className="bg-white py-5 border-b border-solid border-gray-400 w-full">
          <div className="md:px-10 flex justify-between items-center">
            {/* left div */}
            <div className="flex-grow text-center">
              <p className="text-2xl font-bold text-custom-teal">Projects</p>
            </div>
            {/* right div */}
            <div className="flex justify-end items-center gap-2">
              <Button
                children="Add new Project"
                type="submit"
                variant="default"
                icon={<MdAdd />}
                className="rounded-xl text-center shadow-[0px_3px_6px_#2976a54d] hidden md:flex w-[200px] py-3"
                onClick={() => router.push(`/dashboard/create-project`)}
              />
              <Button
                children=""
                type="submit"
                variant="default"
                icon={<MdAdd />}
                className="rounded-xl text-center py-3 mr-2 shadow-[0px_3px_6px_#2976a54d] md:hidden block pr-2 pl-3"
                onClick={() => router.push(`/dashboard/create-project`)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="w-full bg-white">
        <div className="p-5 flex justify-Start items-center ">
          <Search placeholder="Search project name" onSearch={handleSearch} />
        </div>
      </div>

      <div className="flex-grow mx-auto w-full">
        {loading ? (
          <p>Loading...</p>
        ) : projects && projects.length > 0 ? (
          <ProjectTable
            projects={projects}
            setProjects={setProjects}
            fetchProjects={fetchProjects}
            user={user}
          />
        ) : (
          <NoSearchResult />
        )}
        {/* Pagination Controls */}
        <div className="flex justify-center mt-4">
          <Button
            onClick={() => handlePageChange(page - 1)}
            disabled={page <= 1}
            className="px-4 py-2 bg-gray-300 rounded-md"
          >
            Previous
          </Button>
          <span className="mx-4">
            Page {page} of {totalPages}
          </span>
          <Button
            onClick={() => handlePageChange(page + 1)}
            disabled={page >= totalPages}
            className="px-4 py-2 bg-gray-300 rounded-md"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Page;
