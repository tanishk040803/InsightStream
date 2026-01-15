import React from 'react';
import { NavLink } from 'react-router-dom';
import { supabase } from '../services/dbService';
import { LayoutDashboard, Terminal, Zap, LogOut, Cpu, Database } from 'lucide-react';

const SidebarItem = ({ icon: Icon, label, to }) => (
  <NavLink
    to={to}
    className={({ isActive }) => `
      flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all border 
      ${isActive 
        ? 'bg-blue-600/10 border-blue-500/50 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.2)]' 
        : 'border-transparent text-slate-500 hover:text-slate-300 hover:bg-white/5'}
    `}
  >
    <Icon size={18} />
    <span className="font-mono text-sm uppercase tracking-wider">{label}</span>
  </NavLink>
);

const Sidebar = () => {
  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <aside className="w-64 bg-slate-950 border-r border-white/5 flex flex-col p-6 gap-8 shrink-0">
      <div className="flex items-center gap-3 px-2">
        <Zap className="text-blue-500 fill-current" size={24} />
        <h1 className="text-lg font-black text-white tracking-tighter uppercase italic">
          InSight<span className="text-blue-500"></span>
        </h1>
      </div>

      <nav className="flex flex-col gap-3 flex-1">
        <SidebarItem icon={LayoutDashboard} label="Live_Feed" to="/feed" />
        <SidebarItem icon={Terminal} label="TechTalk" to="/techtalk" />
        <SidebarItem icon={Database} label="Archive Vault" to="/archive" />
        <SidebarItem icon={Cpu} label="System Status" to="/status" />
      </nav>

      <button 
        onClick={handleLogout}
        className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:text-red-500 transition-colors mt-auto font-mono text-xs uppercase tracking-[0.2em]"
      >
        <LogOut size={16} />
        <span>Terminate_Session</span>
      </button>
    </aside>
  );
};

export default Sidebar;