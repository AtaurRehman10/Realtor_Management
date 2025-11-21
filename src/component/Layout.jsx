import { Outlet } from "react-router-dom";
import RealtorSidebar from "./Realtorsidebar";
import Header from "./header";
import { useState, useEffect } from "react";

import { getRealtorProfile } from "../api/realtorApi";

const Layout = () => {
  const [username, setUsername] = useState("");
  const [profileImage, setProfileImage] = useState(null);

  const fetchProfile = async () => {
    // Try to get from localStorage first for immediate display
    const storedName = localStorage.getItem("name");
    if (storedName) {
      setUsername(storedName.split(" ")[0]);
    }

    try {
      const data = await getRealtorProfile();
      if (data) {
        if (data.first_name) {
          setUsername(data.first_name);
          const fullName = `${data.first_name} ${data.last_name}`;
          // Update localStorage to keep it fresh
          localStorage.setItem("name", fullName);
        }
        if (data.profile_image) {
          setProfileImage(data.profile_image);
        } else {
          setProfileImage(null);
        }
      }
    } catch (error) {
      console.error("Failed to fetch user profile:", error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className=" min-h-screen bg-[url('https://c.animaapp.com/meu8kae0jVrFXq/img/bg.png')] bg-cover bg-no-repeat bg-center text-white">
      <RealtorSidebar />

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Mobile Spacer - Matches mobile header height */}
        <div className="lg:hidden h-16"></div>
        {/* Main Content Area */}
        <div className="p-4 lg:p-8">
          <Header username={username} profileImage={profileImage} />
          <main className="mt-4">
            <Outlet context={{ refreshProfile: fetchProfile }} />
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
