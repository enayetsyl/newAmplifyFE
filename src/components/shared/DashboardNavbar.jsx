import React from "react";
import { RiPencilFill } from "react-icons/ri";
import { IoTrashSharp } from "react-icons/io5";
import { MdLockReset } from "react-icons/md";
import { FaBell } from "react-icons/fa";
import Link from "next/link";
import Button from "./Button";

const DashboardNavbar = ({ children }) => {
  return (
    <div className="bg-white h-24 w-full">
      {" "}
      <div className="px-10 flex justify-between items-center pt-5">
        {/* left div */}
        <div>
          <p className="text-2xl font-bold text-custom-teal">My Profile</p>
        </div>
        {/* right div */}
        <div className="flex justify-center items-center gap-4">
          <Link href="/dashboard/edit-profile">
            <Button
              children="Edit Profile"
              type="button"
              variant="secondary"
              icon={<RiPencilFill />}
              className="rounded-xl w-[200px] text-center py-3 shadow-[0px_3px_6px_#2976a54d] cursor-pointer"
            />
          </Link>
          <Button
            children="Change Password"
            type="submit"
            icon={<MdLockReset />}
            className="rounded-xl w-[200px] text-center py-3 shadow-[0px_3px_6px_#2976a54d] "
          />
          <Button
            children="Delete My Account"
            type="submit"
            variant="primary"
            icon={<IoTrashSharp />}
            className="rounded-xl w-[200px] text-center py-3  shadow-[0px_3px_6px_#FF66004D]"
          />
          <div className="rounded-xl bg-[#f3f4f5] text-black p-4">
            <FaBell className="h-5 w-5" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardNavbar;
