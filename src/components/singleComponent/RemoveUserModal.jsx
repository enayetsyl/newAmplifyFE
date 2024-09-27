'use client'
import React from 'react';
import Button from '../shared/button';

const RemoveUserModal = ({ onClose, handleRemoveUser , userToRemove}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-30">
      <div className="bg-white p-8 rounded-2xl w-[420px]">
        <h2 className="text-2xl font-semibold mb-1 text-custom-dark-blue-2">Remove Participant</h2>
        <p className='text-custom-gray-6 text-[11px] mb-10 '>Are you sure you want to remove "<span className='font-bold'>{userToRemove.name}</span>"? Once removed, the participant will not able to join the meeting..</p>
        
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
            onClick={handleRemoveUser}
            className="rounded-xl text-center py-1 px-10 shadow-[0px_3px_6px_#031F3A59] "
          />
        </div>
      </div>
    </div>
  );
};

export default RemoveUserModal;
