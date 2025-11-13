import React, { useState } from 'react';
import api from '../lib/api';
import { GoogleLogin } from '@react-oauth/google';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function submit() {
    const { data } = await api.post('/api/auth/login', { email, password });
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    window.location.href = "/";
  }

  return (
    <div className="h-screen flex items-center justify-center bg-slate-100">
      <div className="card p-6 w-96">
        <h2 className="text-xl font-semibold mb-4">Login</h2>
        <input className="border rounded w-full px-3 py-2 mb-2"
          placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input className="border rounded w-full px-3 py-2 mb-4"
          type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
        <button onClick={submit} className="bg-emerald-600 text-white w-full py-2 rounded mb-3">
          Login
        </button>
        <GoogleLogin
          onSuccess={async (cred) => {
            const { data } = await api.post('/api/auth/google', { credential: cred.credential });
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            window.location.href = "/";
          }}
          onError={() => alert('Google Login Failed')}
        />
        <div className="mt-3 text-sm text-center">
          No account? <a href="/signup" className="text-emerald-700 underline">Sign up</a>
        </div>
      </div>
    </div>
  );
}
