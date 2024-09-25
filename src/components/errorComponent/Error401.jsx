"use client";
import Image from "next/image";
import React from "react";
import Error401Image from "../../../public/401.png";
import HeadingBlue25px from "../shared/HeadingBlue25px";
import ParagraphBlue2 from "../shared/ParagraphBlue2";
import Footer from "../shared/Footer";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Button from "../shared/Button";

const Error401 = () => {
  const router = useRouter();

  return (
    <>
      <div className="flex flex-col justify-center items-center py-10 ">
        <Image
          src={Error401Image}
          alt="401"
          height={200}
          width={200}
          className="bg-white w-[80%] lg:w-1/3 h-1/2"
        />

        <h1 className='text-7xl lg:text-8xl font-bold text-custom-dark-blue-1 pb-5'>401</h1>
        <HeadingBlue25px children="UNAUTHORIZED" />
        <div className="my-5 px-10">
          <ParagraphBlue2 children="Sorry, you are not authorized to access this page." />
        </div>
        <Link href="/login">
          <Button
            children="Login"
            className="rounded-lg py-2 text-white w-[300px]"
            variant="primary"
          />
        </Link>
      </div>
      <Footer />
    </>
  );
};

export default Error401;
