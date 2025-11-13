import React, { useState } from 'react';
import api from '../lib/api';

export default function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  function set(k, v) { setForm({ ...form, [k]: v }) }

  async function submit() {
    await api.post('/api/auth/register', form);
    alert("Signup successful! Now login.");
    window.location.href = "/login";
  }

  return (
    <div className="h-screen flex items-center justify-center bg-slate-100">
      <div className="card p-6 w-96">
        <h2 className="text-xl font-semibold mb-4">Sign Up</h2>
        <input className="border rounded w-full px-3 py-2 mb-2"
          placeholder="Name" value={form.name} onChange={e=>set('name',e.target.value)} />
        <input className="border rounded w-full px-3 py-2 mb-2"
          placeholder="Email" value={form.email} onChange={e=>set('email',e.target.value)} />
        <input className="border rounded w-full px-3 py-2 mb-4"
          type="password" placeholder="Password" value={form.password} onChange={e=>set('password',e.target.value)} />
        <button onClick={submit} className="bg-blue-600 text-white w-full py-2 rounded">Create Account</button>
      </div>
    </div>
  );
}
