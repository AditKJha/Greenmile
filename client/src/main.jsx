import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from './App';
import Dashboard from './pages/Dashboard';
import BatteryAnalysis from './pages/BatteryAnalysis';
import WeatherInsights from './pages/WeatherInsights';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AdminLogin from './pages/AdminLogin';
import AdminLayout from './layouts/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminUsers from './pages/admin/AdminUsers';
import AdminTrips from './pages/admin/AdminTrips';

function AdminGuard({ children }){
  const token = localStorage.getItem('admin_token');
  if(!token) return <Navigate to="/admin/login" replace />;
  return children;
}

createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID || ''}>
    <BrowserRouter>
      <Routes>
        <Route element={<App />}> 
          <Route index element={<Dashboard />} />
          <Route path="/battery" element={<BatteryAnalysis />} />
          <Route path="/weather" element={<WeatherInsights />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>

        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminGuard><AdminLayout /></AdminGuard>}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="trips" element={<AdminTrips />} />
          <Route index element={<Navigate to="dashboard" />} />
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  </GoogleOAuthProvider>
);
