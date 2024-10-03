"use client";
import React, { useState } from "react";
import axios from "axios";
import InputField from "../shared/InputField";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import ErrorModal from "./ErrorModal";
import Button from "../shared/button";

const PasswordModal = ({ onClose, id }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  // for showing error message modal
  const [showErrorModal, setShowErrorModal] = useState(false);

  const validateForm = () => {
    let formErrors = {};
    if (!currentPassword) formErrors.currentPassword = "Incorrect password";
    if (newPassword.length < 8)
      formErrors.newPassword =
        "Password must contain at least 8 characters, including upper case, lower case, numbers, & special characters";
    if (newPassword !== confirmPassword)
      formErrors.confirmPassword = "Passwords do not match";
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      let token = localStorage.getItem("Token");
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/users/reset_password'`,
          {
            token: token,
            newPassword: newPassword,
          }
        );
        alert("Password Updated");
        if (response.status === 200) {
          onClose();
        } else {
          setShowErrorModal(true);
        }
      } catch (error) {
        setShowErrorModal(true);
      }
    }
  };

  const handleCloseErrorModal = () => {
    setShowErrorModal(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 px-5">
      <div className="bg-white p-8 rounded-lg w-[420px]">
        <h2 className="text-2xl font-semibold mb-1 text-custom-dark-blue-2">
          Change Password
        </h2>
        <p className="text-custom-gray-6 text-[11px] mb-3">
          Make sure you remember the password to login. Your new password must
          be different from previously used passwords.
        </p>
        <form onSubmit={handleSubmit}>
          <InputField
            label="Current Password"
            type={showCurrentPassword ? "text" : "password"}
            name="currentPassword"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            error={errors.currentPassword}
            icon={
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="focus:outline-none"
              >
                {showCurrentPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            }
          />
          <InputField
            label="New Password"
            type={showNewPassword ? "text" : "password"}
            name="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            error={errors.newPassword}
            icon={
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="focus:outline-none"
              >
                {showNewPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            }
          />
          <InputField
            label="Confirm Password"
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={errors.confirmPassword}
            icon={
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="focus:outline-none"
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            }
          />
          <div className="flex justify-end gap-4 mt-4">
            <Button
              children="Cancel"
              type="button"
              variant="cancel"
              onClick={onClose}
              className="rounded-xl text-center py-2 px-5 shadow-[0px_3px_6px_#031F3A59]"
            />
            <Button
              children="Save"
              type="submit"
              variant="save"
              className="rounded-xl text-center py-2 px-5 shadow-[0px_3px_6px_#09828F69]"
            />
          </div>
        </form>
      </div>
      {showErrorModal && <ErrorModal onClose={handleCloseErrorModal} />}
    </div>
  );
};

export default PasswordModal;
