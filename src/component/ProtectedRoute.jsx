import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles }) => {
     const token = localStorage.getItem("authToken");
     const userRole = localStorage.getItem("role");

     if (!token) {
          return <Navigate to="/" replace />;
     }

     if (allowedRoles && !allowedRoles.includes(userRole)) {
          if (userRole === "admin") {
               return <Navigate to="/admin-dashboard" replace />;
          } else if (userRole === "realtor") {
               return <Navigate to="/dashboard" replace />;
          } else {
               return <Navigate to="/" replace />;
          }
     }

     return <Outlet />;
};

export default ProtectedRoute;
