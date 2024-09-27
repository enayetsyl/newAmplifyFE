'use client'
import HeadingH1 from '../shared/HeadingH1'
import ParagraphBlue2 from '../shared/ParagraphBlue2'
import BackToLogin from '../shared/BackToLogin'
import { FaEnvelopeOpenText } from 'react-icons/fa'
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useState } from 'react'
import InputField from '../shared/InputField'
import Button from '../shared/button'
const SetNewPasswordUI = () => {
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: '',
  });
const [errors, setErrors] = useState({});
 const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { newPassword, confirmPassword } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({
      confirmPassword: 'wrong ps',
      confirmPassword: 'wrong cps'

    })
    // Validate form and handle submission
  };
  return (
    <div className="py-20">
       <div className="max-w-[800px] mx-auto shadow_primary px-10 lg:px-20 bg-white rounded-xl ">
         {/* icon div */}
         <div className="flex justify-center items-center py-5">
           ⁡⁢⁣⁢ {/* 𝗧𝗼𝗱𝗼- 𝗻𝗲𝗲𝗱 𝘁𝗼 𝗰𝗵𝗮𝗻𝗴𝗲 it */}⁡
           <FaEnvelopeOpenText className="h-20 w-20 " />
         </div>
         {/* text div */}
         <div className="px-3">
           <HeadingH1 children="SET NEW PASSWORD" />
           <ParagraphBlue2 children="Your new password must be different from previously used passwords." />
           <form onSubmit={handleSubmit} className='pt-8'>
               
          <InputField
            label="New Password"
            type={showPassword ? 'text' : 'password'}
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            placeholder="Enter your password"
            error={errors.newPassword}
            icon={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="focus:outline-none"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            }
          />
          <p className='text-custom-gray-3 text-xs pb-3'>Password must contain at least 8 characters, including upper case, lower case, numbers, & special characters from(!@#$%^&*)</p>
          <InputField
            label="Confirm Password"
            type={showPassword ? 'text' : 'password'}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm your password"
            error={errors.confirmPassword}
            icon={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="focus:outline-none"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            }
          />
         
          <Button
            type="submit"
            className="w-full bg-custom-orange-1 text-white font-semibold py-2 rounded-lg hover:bg-orange-600"
            onClick={handleSubmit}
          >
            Reset Password
          </Button>
        </form>
         </div>
         
         <div className="pt-14 pb-20">
           <BackToLogin />
         </div>
       </div>
     </div>
  )
}

export default SetNewPasswordUI