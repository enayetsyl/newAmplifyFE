"use client";
import Search from "@/components/singleComponent/Search";
import { useEffect, useState } from "react";
import { MdAdd } from "react-icons/md";
import ContactTable from "@/components/singleComponent/ContactTable";
import AddContactModal from "@/components/singleComponent/AddContactModal";
import { useGlobalContext } from "@/context/GlobalContext";
import HeadingBlue25px from "@/components/shared/HeadingBlue25px";
import Button from "@/components/shared/button";

const page = () => {
  const [selectedStatus, setSelectedStatus] = useState("Active");
  const [showAddContactModal, setShowAddContactModal] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [currentContact, setCurrentContact] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const { user } = useGlobalContext();

  useEffect(() => {
    fetchContacts(user?._id);
  }, [user]);

  const fetchContacts = async (userId) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/get-all/contact/${userId}`
      );
      const data = await response.json();
      setContacts(data);
    } catch (error) {
      console.error("Error fetching moderators:", error);
    }
  };

  // Project status related functionality

  const handleSearch = () => {};

  const handleStatusSelect = (status) => {
    setSelectedStatus(status);
    // Add your status select logic here
  };

  // Modal  functionality

  const handleOpenAddContactModal = () => {
    setShowAddContactModal(true);
  };

  const handleModalClose = () => {
    setShowAddContactModal(false);
  };

  return (
    <div className="my_profile_main_section_shadow bg-[#fafafb] bg-opacity-90 h-full min-h-screen flex flex-col justify-center items-center">
      {/* Navbar */}
      <div className="bg-white py-5 border-b border-solid border-gray-400 w-full">
        <div className="md:px-10 flex justify-between items-center">
          {/* left div */}
          <div className="flex-grow text-center">
            <p className="text-2xl font-bold text-custom-teal">Contacts</p>
          </div>
          {/* right div */}
          <div className="flex justify-end items-center gap-2">
            <Button
              children="Add new Contact"
              type="submit"
              variant="default"
              icon={<MdAdd />}
              className="rounded-xl text-center shadow-[0px_3px_6px_#2976a54d] hidden md:flex w-[200px] py-3"
              onClick={handleOpenAddContactModal}
            />
            <Button
              children="."
              type="submit"
              variant="default"
              icon={<MdAdd />}
              className="rounded-xl text-center py-3 mr-2 shadow-[0px_3px_6px_#2976a54d] md:hidden block pr-2 pl-3"
              onClick={handleOpenAddContactModal}
            />
          </div>
        </div>
      </div>

      {/* search bar */}
      <div className="border-b border-solid border-gray-400 py-4 w-full bg-white">
        <div className="px-10 flex justify-start items-center">
          <div className="flex justify-start items-center gap-5">
            <Search placeholder="Search contact name" onSearch={handleSearch} />
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="flex-grow w-full">
        {contacts.length > 0 ? (
          <ContactTable
            contacts={contacts}
            setContacts={setContacts}
            currentContact={currentContact}
            setCurrentContact={setCurrentContact}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
          />
        ) : (
          <div className="flex-grow w-full h-full flex justify-center items-center pt-20">
            <HeadingBlue25px>You have no contacts.</HeadingBlue25px>
          </div>
        )}
      </div>
      {showAddContactModal && (
        <AddContactModal
          onClose={handleModalClose}
          contactToEdit={currentContact}
          isEditing={isEditing}
          fetchContacts={fetchContacts}
          userId={user._id}
        />
      )}
    </div>
  );
};

export default page;
