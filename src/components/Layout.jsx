import React from 'react';
import Sidebar from './Sidebar';
import { motion } from 'framer-motion';

const Layout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100 selection:bg-blue-500/30 font-sans">
      
      {/* SIDEBAR - Fixed on the left */}
      <Sidebar />
      
      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        
        {/* TOP SCAN-LINE EFFECT (Optional for Tech Vibe) */}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent z-50 animate-pulse" />

        {/* SCROLLABLE CONTENT */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-7xl mx-auto p-6 md:p-10"
          >
            {children}
          </motion.div>
        </main>

        {/* FOOTER BAR (Tech Detail) */}
        <footer className="h-8 border-t border-white/5 bg-black/20 flex items-center px-6 justify-between">
          <div className="flex gap-4">
            <span className="text-[10px] font-mono text-slate-600 uppercase tracking-widest">
              Encrypted_Link: Stable
            </span>
          </div>
          <span className="text-[10px] font-mono text-slate-600 uppercase tracking-widest">
            v1.0.4-Build_62
          </span>
        </footer>
      </div>
    </div>
  );
};

export default Layout;