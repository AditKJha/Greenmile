import React, { useState } from 'react';
import { adminApi } from '../lib/api';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function login() {
    try {
      const { data } = await adminApi.post('/api/admin/auth/login', { email, password });
      localStorage.setItem('admin_token', data.token);
      localStorage.setItem('admin_user', JSON.stringify(data.user));
      window.location.href = "/admin/dashboard";
    } catch (e) {
      alert("Access denied / Invalid admin credentials");
    }
  }

  return (
    <div className="h-screen flex items-center justify-center bg-slate-100">
      <div className="card p-6 w-96">
        <h2 className="text-xl font-semibold mb-4 text-center">Admin Login</h2>
        <input className="border rounded w-full px-3 py-2 mb-2"
          placeholder="Admin Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input className="border rounded w-full px-3 py-2 mb-4"
          type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
        <button onClick={login} className="bg-red-600 text-white w-full py-2 rounded">
          Login as Admin
        </button>
      </div>
    </div>
  );
}
