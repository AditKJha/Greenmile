import React, { useEffect, useMemo, useState } from 'react';
import { adminGetUsers, adminDeleteUser } from '../../lib/api';

export default function AdminUsers(){
  const [users, setUsers] = useState([]);
  const [q, setQ] = useState('');
  useEffect(()=>{ adminGetUsers().then(r=>setUsers(r.items)); },[]);

  const filtered = useMemo(()=>{
    const t = q.toLowerCase();
    return users.filter(u => (u.name||'').toLowerCase().includes(t) || (u.email||'').toLowerCase().includes(t));
  },[q, users]);

  return (
    <div className="card p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="text-sm text-slate-600 font-medium">Users</div>
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search name or email" className="border rounded-xl px-3 py-2" />
      </div>
      <div className="overflow-auto">
        <table className="w-full text-sm">
          <thead><tr className="text-left text-slate-500"><th className="py-2">Name</th><th>Email</th><th>Role</th><th>Created</th><th></th></tr></thead>
          <tbody>
            {filtered.map(u=> (
              <tr key={u._id} className="border-t">
                <td className="py-2">{u.name||'-'}</td>
                <td>{u.email}</td>
                <td><span className="px-2 py-0.5 rounded bg-slate-100">{u.role}</span></td>
                <td>{new Date(u.createdAt).toLocaleString()}</td>
                <td className="text-right">
                  <button className="px-2 py-1 bg-red-600 text-white rounded" onClick={async()=>{await adminDeleteUser(u._id); setUsers(users.filter(x=>x._id!==u._id));}}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
