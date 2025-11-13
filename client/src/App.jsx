import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Map, Settings as SettingsIcon, Battery, Cloud } from 'lucide-react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';

export default function App() {
  const { pathname } = useLocation();
  const links = [
    { to: '/', label: 'Dashboard', icon: <Map size={18} /> },
    { to: '/battery', label: 'Battery', icon: <Battery size={18} /> },
    { to: '/weather', label: 'Weather', icon: <Cloud size={18} /> },
    { to: '/settings', label: 'Settings', icon: <SettingsIcon size={18} /> }
  ];
  return (
    <div className="min-h-screen grid grid-cols-[260px_1fr]">
      <Sidebar>
        {links.map((l) => (
          <Link key={l.to} to={l.to} className={`flex gap-2 items-center px-4 py-2 rounded-xl hover:bg-slate-100 ${pathname===l.to?'bg-slate-100':''}`}>{l.icon}{l.label}</Link>
        ))}
      </Sidebar>
      <div className="flex flex-col">
        <Header />
        <main className="p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
