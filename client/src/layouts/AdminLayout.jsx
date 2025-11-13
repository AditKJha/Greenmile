import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { LayoutDashboard, Users, Car, LogOut, PanelLeftClose, PanelLeft } from 'lucide-react';

export default function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false);

  function logout(){
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    window.location.href = '/admin/login';
  }

  const link = (to, label, Icon) => (
    <NavLink to={to} className={({isActive})=>`flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-slate-100 ${isActive?'bg-slate-100':''}`}>
      <Icon size={18} /> {!collapsed && <span>{label}</span>}
    </NavLink>
  );

  return (
    <div className="min-h-screen grid" style={{ gridTemplateColumns: `${collapsed?'72px':'240px'} 1fr` }}>
      <aside className="border-r bg-white p-3 flex flex-col gap-2">
        <button onClick={()=>setCollapsed(v=>!v)} className="px-3 py-2 rounded-xl bg-slate-900 text-white flex items-center justify-center mb-2">
          {collapsed ? <PanelLeft size={16} /> : <PanelLeftClose size={16} />}
        </button>
        {link('/admin/dashboard', 'Dashboard', LayoutDashboard)}
        {link('/admin/users', 'Users', Users)}
        {link('/admin/trips', 'Trips', Car)}
        <button onClick={logout} className="mt-auto px-3 py-2 rounded-xl bg-red-600 text-white flex items-center gap-2 justify-center">
          <LogOut size={18} /> {!collapsed && <span>Logout</span>}
        </button>
      </aside>
      <div className="flex flex-col">
        <header className="px-6 py-4 border-b bg-white">
          <h1 className="text-xl font-semibold">GreenMile Admin</h1>
        </header>
        <main className="p-4"><Outlet /></main>
      </div>
    </div>
  );
}
