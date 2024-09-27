import React from "react";
import HeadingLg from "../shared/HeadingLg";
import ParagraphLg from "../shared/ParagraphLg";
import Button from "../shared/button";

const ViewContactModal = ({ user, onClose }) => {


  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 ">
      <div className="bg-white rounded-lg w-[500px] max-w-2xl ">
        <h3 className="text-2xl text-custom-dark-blue-2 font-semibold mx-10 py-5">
          View Contact
        </h3>

        <div className="mb-4 mx-10">
          <div className="mt-2 space-y-2">
            <div className="flex justify-between items-center gap-5">
              <HeadingLg children="Name" />
              <ParagraphLg children={`${user.firstName}  ${user.lastName}`} />
            </div>

            <div className="flex justify-between items-center gap-5">
              <HeadingLg children="Email" />
              <ParagraphLg children={user.email} />
            </div>
            <div className="flex justify-between items-center gap-5">
              <HeadingLg children="Company Name" />
              <ParagraphLg children={user.companyName} />
            </div>
            <div className="flex justify-between items-start gap-5">
              <HeadingLg children="Role" />
             <ul>
             {
                user?.roles?.map(role => <li className="text-end">
                  <ParagraphLg children={role} />
                </li>)
              }
             </ul>
            </div>
          </div>
        </div>
        <div className="flex justify-center pb-8">
          <Button
            onClick={onClose}
            variant="primary"
            type="submit"
            children="Close"
            className="px-5 py-1 rounded-xl"
          />
        </div>
      </div>
    </div>
  );
};

export default ViewContactModal;
