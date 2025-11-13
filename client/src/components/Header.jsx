import React, { useEffect, useState } from 'react';
import api from '../lib/api';
export default function Header(){
  const [user, setUser] = useState(()=>{
    try { return JSON.parse(localStorage.getItem('user')||'null'); } catch { return null; }
  });
  useEffect(()=>{
    if(!user){
      api.get('/api/auth/me').then(res=>{ setUser(res.data); localStorage.setItem('user', JSON.stringify(res.data)); }).catch(()=>{});
    }
  },[]);
  function logout(){ localStorage.removeItem('token'); localStorage.removeItem('user'); window.location.href='/login'; }
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b bg-white">
      <h1 className="text-xl font-semibold">GreenMile AI – Smart EV Routing</h1>
      <div className="flex items-center gap-3 text-sm text-slate-600">
        {user ? (
          <>
            <span className="hidden md:inline">{user.name || user.email}</span>
            <span className="rounded-full bg-emerald-100 text-emerald-700 px-2 py-0.5 text-xs">{user.role}</span>
            <button onClick={logout} className="px-3 py-1 rounded bg-slate-800 text-white">Logout</button>
          </>
        ) : (
          <a href="/login" className="px-3 py-1 rounded bg-emerald-600 text-white">Login</a>
        )}
      </div>
    </header>
  );
}
