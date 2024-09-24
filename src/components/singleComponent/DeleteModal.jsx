'use client';
import React from 'react';
import Button from '../shared/Button';

const DeleteModal = ({ onClose, onDelete }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 px-5">
      <div className="bg-white p-8 rounded-2xl w-[420px]">
        <h2 className="text-2xl font-semibold mb-1 text-custom-dark-blue-2">Delete Account</h2>
        <p className='text-custom-gray-6 text-[11px] mb-10 '>Are you sure you want to delete your account? All your data will be permanently deleted. This action cannot be undone.</p>
        
        <div className='flex justify-end items-center gap-4'>
          <Button
            children="Cancel"
            type="button"
            variant='cancel'
            onClick={onClose}
            className="rounded-xl text-center py-1 px-7 shadow-[0px_3px_6px_#031F3A59] "
          />
          <Button
            children="Yes"
            type="button"
            variant='primary'
            onClick={onDelete}
            className="rounded-xl text-center py-1 px-10 shadow-[0px_3px_6px_#031F3A59] "
          />
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
