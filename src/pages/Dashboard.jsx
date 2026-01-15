import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { Activity } from 'lucide-react';

const Dashboard = () => {
  const location = useLocation();
  
  // Format the path for the breadcrumb (e.g., /techtalk becomes TechTalk)
  const currentPath = location.pathname.split('/')[1] || 'Command_Center';

  return (
    <div className="flex h-screen bg-black overflow-hidden selection:bg-blue-500/30">
      {/* --- SIDEBAR --- */}
      <Sidebar />

      {/* --- MAIN CONTENT AREA --- */}
      <main className="flex-1 overflow-y-auto bg-slate-950/50">
        <div className="max-w-7xl mx-auto p-8">
          
          {/* --- TOP GLOBAL STATUS BAR --- */}
          <div className="flex justify-between items-center mb-10 pb-6 border-b border-white/5">
            <div>
              <h2 className="text-2xl font-black text-white uppercase tracking-tighter">
                {currentPath.replace('_', ' ')}
              </h2>
              <div className="flex items-center gap-4 mt-1">
                <span className="flex items-center gap-1.5 text-[10px] font-bold text-green-500 uppercase tracking-widest">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-ping" />
                  SYSTEM_SECURE
                </span>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                  <Activity size={12} />
                  LATENCY: 24ms
                </span>
              </div>
            </div>
          </div>

          {/* --- DYNAMIC CONTENT (Swaps between Feed, Chat, Archive) --- */}
          <Outlet />
          
        </div>
      </main>
    </div>
  );
};

export default Dashboard;