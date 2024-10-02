'use client'
import VerificationErrorUI from "@/components/authComponent/VerificationErrorUI"
import VerifyAccountUI from "@/components/authComponent/VerifyAccountUI"
import Logo from "@/components/shared/Logo"
import axios from "axios"
import { useParams, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

const VerifyAccount = () => {
  
  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  console.log(id)

  const [verificationStatus, setVerificationStatus] = useState(null); 



  useEffect(() => {
    const verifyEmail = async () => {
      try {
        console.log('sending verification request')
        const response = await axios.get(`http://localhost:8008/api/verify?id=${id}`);

        console.log('response .data', response.data)
        if (response.status === 200) {
          setVerificationStatus('success');
        }
      } catch (error) {
        setVerificationStatus('error');
        console.error("Verification error:", error);
      }
    };

    verifyEmail();
  }, [id]);

  return (
    <div>
      <div className="flex justify-center items-center pt-5 lg:hidden">
        <Logo />
      </div>
      <div className="pt-5 pl-10 lg:block hidden">
        {' '}
        <Logo />
      </div>
      {verificationStatus === 'success' ? (
        <VerifyAccountUI />
      ) : verificationStatus === 'error' ? (
        <VerificationErrorUI/>
      ) : (
        <p className="min-h-screen text-center">Verifying your account...</p> // Loading message while waiting for the request
      )}
    </div>
  )
}

export default VerifyAccount