// components/InputField.js
import React from "react";
import { BiSolidErrorAlt } from "react-icons/bi";

const InputField = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  error,
  icon,
  emailSuccess,
}) => {
  return (
    <div className="mb-4">
      <label
        className="block sm:text-sm font-semibold mb-2 text-sm text-black"
        htmlFor={name}
      >
        {label}
      </label>
      <div className="relative">
        <input
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full px-4 py-2 border-[0.5px] rounded-xl focus:outline-none   ${
            error ? "border-custom-red" : "border-black"
          }`}
        />
        {icon && (
          <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
            {icon}
          </span>
        )}
      </div>
      {error && (
        <div className="flex justify-start items-start gap-1 mt-2">
          <BiSolidErrorAlt className="text-custom-red" />
          <p className="text-custom-red text-xs ">{error}</p>
        </div>
      )}
      {emailSuccess && (
        <div className="flex justify-start items-start gap-1 mt-2">
          <BiSolidErrorAlt className="" />
          <p className="text-custom-green text-xs ">Your Email is available.</p>
        </div>
      )}
    </div>
  );
};

export default InputField;
