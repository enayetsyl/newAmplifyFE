'use client';

import React, { useState } from 'react';
import axios from 'axios';
import HeadingH1 from '../shared/HeadingH1';
import ParagraphBlue2 from '../shared/ParagraphBlue2';
import Button from '../shared/Button';
import BackToLogin from '../shared/BackToLogin';
import { FaEnvelopeOpenText } from 'react-icons/fa';
import InputField from '../shared/InputField';

const ForgotPasswordUI = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`https://amplifybe-1.onrender.com/api/users/forgotPassword`, {
        email: email,
      });
      setMessage('Reset link sent to your email');
      setError('');
    } catch (error) {
      setError('Error sending reset link');
      setMessage('');
    }
  };

  return (
    <div className="py-20">
      <div className="max-w-[800px] mx-auto shadow_primary px-10 lg:px-20 bg-white rounded-xl">
        {/* icon div */}
        <div className="flex justify-center items-center py-5">
          <FaEnvelopeOpenText className="h-20 w-20" />
        </div>
        {/* text div */}
        <div className="px-3">
          <HeadingH1>FORGOT PASSWORD</HeadingH1>
          <ParagraphBlue2>Send a link to your email to reset your password.</ParagraphBlue2>
        </div>
        <form onSubmit={handleSubmit} className="pt-10">
          <InputField
            label='Email'
            type='email'
            name='email'
            value={email}
            onChange={handleChange}
          />
          <Button
            children="Send Reset Link"
            variant="primary"
            className="py-2 rounded-2xl w-full font-bold text-xl"
          />
        </form>
        {message && <p className="text-green-500 text-center mt-4">{message}</p>}
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        <div className="pt-14 pb-20">
          <BackToLogin />
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordUI;
