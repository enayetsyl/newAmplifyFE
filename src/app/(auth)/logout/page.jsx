"use client";
import InputField from "@/components/shared/InputField";
import Image from "next/image";
import React, { useState } from "react";
import logoutImage from "../../../../public/logout.PNG";
import logo from "../../../../public/logo.jpg";

import { FaEye, FaEyeSlash } from "react-icons/fa";
import { BiSolidErrorAlt } from "react-icons/bi";
import Logo from "@/components/shared/Logo";
import Link from "next/link";
import HeadingH1 from "@/components/shared/HeadingH1";
import ParagraphBlue2 from "@/components/shared/ParagraphBlue2";
import Button from "@/components/shared/Button";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate form and handle submission
  };

  return (
    <div>
      {/* Top div for lg*/}
      <div className="hidden justify-center items-start lg:flex bg-white h-10">
        {/* left image div */}
        <div className="flex-1 flex items-center w-full h-full">
          <div className="pl-10 pt-8">
            <Logo />
          </div>
        </div>
      </div>
      {/* Top div for mobile */}
      <div className="lg:hidden bg-white flex justify-center items-center pt-10">
        <Logo />
      </div>

      {/* Bottom div for large screen*/}
      <div className=" pt-20 lg:flex flex-col justify-center items-center hidden">
        <HeadingH1 children="logout" />
        <ParagraphBlue2 children="You have been successfully logged out. " />
        <p className="text-base text-center font-bold text-custom-dark-blue-2 p-1 mb-5">
          THANK YOU FOR USING AMPLIFY RESEARCH VIRTUAL FACILITY SERVICES
        </p>
        <Image
          src={logoutImage}
          alt="Amplify register"
          height={800}
          width={600}
        />

        <Button
          children="Back to Login"
          variant="primary"
          className="py-2 rounded-2xl px-40 mb-32 font-bold text-xl"
        />
      </div>

      {/* Bottom div for small screen */}
      <div className=" pt-20 lg:hidden flex-col justify-center items-center flex">
        <HeadingH1 children="logout" />
        <ParagraphBlue2 children="You have been successfully logged out. " />
        <p className="text-base text-center font-bold text-custom-dark-blue-2 p-1 mb-5">
          THANK YOU FOR USING AMPLIFY RESEARCH VIRTUAL FACILITY SERVICES
        </p>
        <Image
          src={logoutImage}
          alt="Amplify register"
          height={800}
          width={600}
        />

        <Link href="/login">
          <Button
            children="Back to Login"
            variant="primary"
            className="py-2 rounded-2xl px-24 mb-32 font-bold text-xl"
          />
        </Link>
      </div>
    </div>
  );
};

export default Login;
