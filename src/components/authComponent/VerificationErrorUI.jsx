import React from 'react';
import ParagraphBlue2 from '../shared/ParagraphBlue2';
import HeadingH1 from '../shared/HeadingH1';
import Button from '../shared/button';
import { FaExclamationTriangle } from 'react-icons/fa';
import Link from 'next/link';

const VerificationErrorUI = ({ errorMessage }) => {
  return (
    <div className="py-20">
      <div className="max-w-[800px] mx-auto shadow_primary px-14 lg:px-20 bg-white rounded-xl">
        {/* icon div */}
        <div className="flex justify-center items-center py-5">
          <FaExclamationTriangle className="h-20 w-20 text-red-500" />
        </div>
        {/* text div */}
        <div className="px-3">
          <HeadingH1 children="Verification Failed" />
          <ParagraphBlue2 children={errorMessage || "An error occurred while verifying your account. Please try again later."} />
        </div>
        <div className="pt-10 pb-32">
          <Link href={"/"}>
            <Button
              children="Back to Home"
              variant="primary"
              className="py-2 rounded-2xl w-full font-bold text-xl cursor-pointer"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VerificationErrorUI;
