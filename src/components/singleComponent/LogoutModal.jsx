'use client'
import React from 'react';
import { useRouter } from 'next/navigation';
import { useGlobalContext } from '@/context/GlobalContext';
import Button from '../shared/button';

const LogoutModal = ({ onClose }) => {
  const {  handleLogout } = useGlobalContext();
  
  

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
   
      <div className="bg-white p-8 rounded-2xl w-[420px] z-10">
        <h2 className="text-2xl font-semibold mb-1 text-custom-dark-blue-2">Log Out</h2>
        <p className='text-custom-gray-6 text-[11px] mb-10'>Are you sure you want to logout?</p>
        
        <div className='flex justify-end items-center gap-4'>
          <Button
            children="Cancel"
            type="button"
            variant='cancel'
            onClick={onClose}
            className="rounded-xl text-center py-1 px-7 shadow-[0px_3px_6px_#031F3A59] cursor-pointer"
          />
          <Button
            children="Yes"
            type="button"
            variant='save'
            onClick={handleLogout}
            className="rounded-xl text-center py-1 px-10 shadow-[0px_3px_6px_#031F3A59] cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
