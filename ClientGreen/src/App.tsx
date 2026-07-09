/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { Routes, Route, Navigate, Outlet} from "react-router-dom";
import WebsiteLayout from "./components/layout/WebsiteLayout";
import DashboardLayout from "./components/layout/DashbordLayout";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import Technologies from "./pages/Technologies";
import Partners from "./pages/Partners";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import CRM from "./pages/CRM";
import Projects from "./pages/Projects";
import Tickets from "./pages/Tickets";
import Invoices from "./pages/Invoices";
import  Settings  from "./pages/Settings";
import { AuthProvider, useAuth } from "./lib/AuthContext";

function ProtectedRoute({ requireAdmin = false }: { requireAdmin?: boolean }) {
  const { user, profile, loading } = useAuth();

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-background text-white">Loading...</div>;

  if (!user) return <Navigate to="/login" replace />;
  if (requireAdmin && profile?.role !== 'admin') return <Navigate to="/portal" replace />;

  return <Outlet />;
}

export default function App() {
  return (
    <AuthProvider>
      <Routes>
            {/* Public Website */}
            <Route path="/" element={<WebsiteLayout />}>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="technologies" element={<Technologies />} />
              <Route path="partners" element={<Partners />} />
              <Route path="contact" element={<Contact />} />
              <Route path="login" element={<Login />} />
            </Route>

            {/* Secure Portals */}
            <Route path="/portal" element={<ProtectedRoute />}>
              <Route element={<DashboardLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="crm" element={<CRM />} />
                <Route path="projects" element={<Projects />} />
                <Route path="tickets" element={<Tickets />} />
                <Route path="invoices" element={<Invoices />} />
                <Route path="settings" element={<Settings />} />
                <Route path="cms" element={<ProtectedRoute requireAdmin={true} />}>
                  <Route index element={<div className="flex h-full items-center justify-center text-muted-foreground">CMS Module (Admin Only)</div>} />
                </Route>
                <Route path="settings" element={<div className="flex h-full items-center justify-center text-muted-foreground">Settings Module (Placeholder)</div>} />
              </Route>
            </Route>

            {/* 404 */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
    </AuthProvider>
  );
}