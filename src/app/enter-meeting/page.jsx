import Image from 'next/image';
import React from 'react';
import Logo from '@/components/shared/Logo';
import userImage from '../../../public/user.jpg';
import joinMeetingImage from '../../../public/join-meeting.png';
import Footer from '@/components/shared/Footer';
import { FaCamera } from 'react-icons/fa';
import Button from '@/components/shared/Button';

const page = () => {
  return (
    <div>
      <div
        className="bg-white flex justify-center items-center "
        style={{ height: 'calc(100vh - 80px)' }}
      >
        {/* left div */}
        <div className="w-[40%] flex flex-col justify-center items-center">
          <div className="">
            <Logo />
          </div>
          <h1 className="text-3xl text-custom-dark-blue-2 font-bold uppercase pt-14 pb-10">
            UPLOAD YOUR PHOTO
          </h1>
          <div className=" relative">
          <Image
            src={userImage}
            alt="upload image"
            height={180}
            width={175}
            className='rounded-full'
          />
          <FaCamera className='absolute bottom-1 right-1 bg-custom-teal shadow-[0px_3px_6px_#0d444a52] p-2.5 text-4xl text-white rounded-xl' />
          </div>

          <div className="w-full px-28 pt-10">
            <Button
              children="Enter Meeting"
              type="submit"
              variant="primary"
              className="w-full py-2 rounded-xl"
            />
          </div>
          <h2 className='text-xl font-bold text-custom-dark-blue-2 text-center pt-5 cursor-pointer'>Back</h2>
        </div>
        {/* right div */}
        <div className="w-[60%] flex justify-end">
          <Image
            src={joinMeetingImage}
            alt="join meeting image"
            height={500}
            width={700}
            // className='w-full h-full'
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default page;
