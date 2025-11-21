import { Outlet } from "react-router-dom";
import Adminsidebar from "./Adminsidebar";
import RealtorSidebar from "./Realtorsidebar";

import Header from "./header";
import { useState, useEffect } from "react";

const AdminLayout = () => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedUsername = localStorage.getItem("name") || "Admin";
    setUsername(storedUsername.split(" ")[0]);
  }, []);

  return (
    <div className="min-h-screen bg-[url('https://c.animaapp.com/meu8kae0jVrFXq/img/bg.png')] bg-cover bg-no-repeat bg-center text-white">
      <Adminsidebar />

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Mobile Spacer - Matches mobile header height */}
        <div className="lg:hidden h-16"></div>
        {/* Main Content Area */}
        <div className="p-4  lg:p-8  lg:pt-8">
          <Header username={username} role="Admin" className="pt-0" />
          <main className="mt-0">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
