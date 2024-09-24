"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Image from 'next/image';
import { FaCamera } from 'react-icons/fa';
import Logo from '@/components/shared/Logo';
import Button from '@/components/shared/Button';
import Footer from '@/components/shared/Footer';
import joinMeetingImage from '../../../public/join-meeting-edited.png';
import uploadPlaceHolderImage from '../../../public/placeholder-image.png';

const Page = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter();

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      // Navigate directly to the meeting if no file is selected
      router.push('/meeting');
      return;
    }

    const formData = new FormData();
    formData.append('profilePhoto', selectedFile);
    formData.append('_id', 'userId'); // Replace with actual user ID

    try {
      setIsUploading(true);
      const response = await axios.put('/api/users/update', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        router.push('/meeting'); // Replace with your actual meeting page route
      }
    } catch (error) {
      console.error('Error uploading profile photo:', error.response?.data?.message || error.message);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div>
      <div className="bg-white lg:flex lg:justify-center lg:items-center lg:pl-20 min-h-screen pb-5">
        {/* left div */}
        <div className="w-full lg:w-[40%] flex flex-col justify-center items-center">
          <div className="pt-5 lg-pt-0">
            <Logo />
          </div>
          <h1 className="text-3xl text-custom-dark-blue-2 font-bold uppercase lg:pt-14 lg:pb-10 py-10">
            UPLOAD YOUR PHOTO
          </h1>
          <form onSubmit={handleSubmit} className="flex flex-col items-center">
            <div className="relative">
              <Image
                src={selectedFile ? URL.createObjectURL(selectedFile) : uploadPlaceHolderImage}
                alt="upload image"
                height={180}
                width={175}
                className="rounded-[55%]"
              />
              <label htmlFor="file-upload" className="absolute bottom-1 right-1 bg-custom-teal shadow-[0px_3px_6px_#0d444a52] p-2.5 text-4xl text-white rounded-xl cursor-pointer">
                <FaCamera />
                <input
                  id="file-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            </div>

            <div className="w-full xl:px-20 2xl:px-52 pt-10">
              <Button
                children={isUploading ? 'Uploading...' : 'Skip & Enter Meeting'}
                type="submit"
                variant="primary"
                className="w-full py-2 rounded-xl px-5"
                disabled={isUploading}
              />
            </div>
          </form>
          <h2 className="text-xl font-bold text-custom-dark-blue-2 text-center pt-5 cursor-pointer" onClick={() => router.back()}>Back</h2>
        </div>
        {/* right div */}
        <div className="lg:w-[60%] hidden lg:flex lg:justify-center lg:items-center">
          <Image
            src={joinMeetingImage}
            alt="join meeting image"
            height={500}
            width={700}
            className="lg:pt-40"
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Page;
