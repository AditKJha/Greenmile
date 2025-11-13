import React from 'react';
export default function Sidebar({ children }){
  return (
    <aside className="border-r bg-white p-4 flex flex-col gap-2">
      {children}
      {(()=>{ try{
        const u = JSON.parse(localStorage.getItem('user')||'null');
        if(u?.role==='admin') return <a className="flex gap-2 items-center px-4 py-2 rounded-xl hover:bg-slate-100" href="/admin">Admin</a>;
      }catch{} return null; })()}
    </aside>
  );
}
