
import accountActivation from "@/components/authComponent/AccountActivation";
import { FaUserEdit, FaKey, FaTrashAlt, FaBell } from 'react-icons/fa';
import AccountActivation from "@/components/authComponent/AccountActivation";
import Logo from "@/components/shared/Logo";
import Footer from "@/components/shared/Footer";
import Error401 from "@/components/errorComponent/Error401";
import Error403 from "@/components/errorComponent/Error403";
import Error500 from "@/components/errorComponent/Error500";
import Error404 from "@/components/errorComponent/Error404";
import Link from "next/link";
import HeadingBlue25px from "@/components/shared/HeadingBlue25px";
import Button from "@/components/shared/Button";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen meeting_bg space-y-5">
      <HeadingBlue25px>Welcome to Amplify Research</HeadingBlue25px>
      <Link href="/login">
      <Button
      children='Login'
      variant="primary"
      className="px-4 py-2 rounded-lg"
      type="button      "
      />
      </Link>
      <Link href="/register">
      <Button
      children='Register'
      variant="primary"
      className="px-4 py-2 rounded-lg"
      type="button      "
      />
      </Link>
      <h1></h1>
    </div>
  
  );
}
