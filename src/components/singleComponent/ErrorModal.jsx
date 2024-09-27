'use client'
import React from 'react';
import Button from '../shared/button';

const ErrorModal = ({ onClose }) => {
 
    return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-8 rounded-2xl w-[420px]">
        <h2 className="text-2xl font-semibold mb-1 text-custom-dark-blue-2">Oops</h2>
        <p className='text-custom-gray-6 text-[11px] mb-10 '>Something went wrong. Please try again.</p>
        
        <div className='flex justify-end items-center'>
        <Button
              children="Ok"
              type="button"
              variant='cancel'
              onClick={onClose}
              className="rounded-xl text-center py-1 px-12 shadow-[0px_3px_6px_#031F3A59] "
            />
        </div>
      </div>
    </div>
  );
};

export default ErrorModal;
