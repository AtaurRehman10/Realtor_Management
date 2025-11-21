import { StrictMode } from "react";
import { Toaster } from "sonner";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createRoot } from "react-dom/client";
import App from "./screens/login";
import ForgotPassword from "./screens/ForgotPassword";
import RegisterPage from "./screens/register";
import RealtorDashboard from "./component/RealtorDashboard";
import RealtorReferrals from "./component/RealtorReferrals";
import RealtorSettings from "./component/RealtorSetting";
import AdminDashboard from "./component/AdminDashboard";
import AdminRealtors from "./component/AdminRealtors";
import EditRealtor from "./component/EditRealtor";
import ViewRealtor from "./component/ViewRealtor";
import AdminReferrals from "./component/AdminReferrals";
import AdminPayouts from "./component/AdminPayouts";
import Layout from "./component/Layout";
import AdminLayout from "./component/AdminLayout";
import ProtectedRoute from "./component/ProtectedRoute";

createRoot(document.getElementById("app")).render(
  <StrictMode>
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<App />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Admin Routes with AdminLayout */}
        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/admin/realtors" element={<AdminRealtors />} />
            <Route path="/admin/realtors/edit/:id" element={<EditRealtor />} />
            <Route path="/admin/realtors/view/:id" element={<ViewRealtor />} />
            <Route path="/admin/referrals" element={<AdminReferrals />} />
            <Route path="/admin/payouts" element={<AdminPayouts />} />
          </Route>
        </Route>

        {/* Protected Routes with Layout */}
        <Route element={<ProtectedRoute allowedRoles={["affiliate"]} />}>
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<RealtorDashboard />} />
            <Route path="/referrals" element={<RealtorReferrals />} />
            <Route path="/settings" element={<RealtorSettings />} />
          </Route>
        </Route>
      </Routes>
    </Router>
    <Toaster richColors position="top-right" />
  </StrictMode>
);
