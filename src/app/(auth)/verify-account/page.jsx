"use client";
import VerificationErrorUI from "@/components/authComponent/VerificationErrorUI";
import VerifyAccountUI from "@/components/authComponent/VerifyAccountUI";
import Logo from "@/components/shared/Logo";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";

const VerifyAccountContent = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [verificationStatus, setVerificationStatus] = useState(null);

  useEffect(() => {
    if (id) {
      const verifyEmail = async () => {
        try {
          console.log("sending verification request");
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/verify?id=${id}`
          );
          console.log("response .data", response.data);

          if (response.status === 200) {
            setVerificationStatus("success");
          }
        } catch (error) {
          setVerificationStatus("error");
          console.error("Verification error:", error);
        }
      };

      verifyEmail();
    }
  }, [id]);

  if (verificationStatus === "success") {
    return <VerifyAccountUI />;
  } else if (verificationStatus === "error") {
    return <VerificationErrorUI />;
  } else {
    return (
      <p className="min-h-screen text-center">Verifying your account...</p>
    );
  }
};

const VerifyAccount = () => {
  return (
    <div>
      <div className="flex justify-center items-center pt-5 lg:hidden">
        <Logo />
      </div>
      <div className="pt-5 pl-10 lg:block hidden">
        <Logo />
      </div>
      <Suspense
        fallback={<p className="min-h-screen text-center">Loading...</p>}
      >
        <VerifyAccountContent />
      </Suspense>
    </div>
  );
};

export default VerifyAccount;
