import VerificationErrorUI from "@/components/authComponent/VerificationErrorUI";
import VerifyAccountUI from "@/components/authComponent/VerifyAccountUI";
import Logo from "@/components/shared/Logo";
import axios from "axios";

const VerifyAccount = ({ verificationStatus }) => {
  return (
    <div>
      <div className="flex justify-center items-center pt-5 lg:hidden">
        <Logo />
      </div>
      <div className="pt-5 pl-10 lg:block hidden">
        <Logo />
      </div>
      {verificationStatus === 'success' ? (
        <VerifyAccountUI />
      ) : verificationStatus === 'error' ? (
        <VerificationErrorUI />
      ) : (
        <p className="min-h-screen text-center">Verifying your account...</p>
      )}
    </div>
  );
};

export async function getServerSideProps(context) {
  const { id } = context.query;
  let verificationStatus = null;

  try {
    const response = await axios.get(`http://localhost:8008/api/verify?id=${id}`);
    if (response.status === 200) {
      verificationStatus = 'success';
    }
  } catch (error) {
    verificationStatus = 'error';
  }

  return {
    props: { verificationStatus },
  };
}

export default VerifyAccount;
