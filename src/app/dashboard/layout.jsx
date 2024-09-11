"use client";
import DashboardSidebar from "@/components/shared/DashboardSidebar";
import Footer from "@/components/shared/Footer";
import LogoutModal from "@/components/singleComponent/LogoutModal";
import { useGlobalContext } from "@/context/GlobalContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardLayout({ children }) {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const { user, setUser } = useGlobalContext();
  const router = useRouter();
  const handleLogoutModalOpen = (e) => {
    setIsLogoutModalOpen(true);
  };

  const handleCloseLogoutModal = () => {
    setIsLogoutModalOpen(false);
  };

  useEffect(() => {
    // Check if user is defined and if it's an empty object
    if (!user || Object.keys(user).length === 0) {
      // Navigate to the login page
      router.push("/login");
    }
  }, [user, router]);

  return (
    <div className="min-h-screen flex flex-col h-full">
      {/* upper div */}
      <div className="flex-grow h-full flex relative">
        <div className="sticky top-0 md:w-[260px] h-screen z-10">
          <DashboardSidebar
            handleLogoutModalOpen={handleLogoutModalOpen}
            isLogoutModalOpen={isLogoutModalOpen}
            user={user}
          />
        </div>
        <div className="flex-grow h-full ">{children}</div>
      </div>
      {isLogoutModalOpen && <LogoutModal onClose={handleCloseLogoutModal} />}
      {/* footer */}
      <Footer />
    </div>
  );
}
