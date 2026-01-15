import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import LiveFeedView from './pages/LiveFeedView'; 
import ArchiveVault from './pages/ArchiveVault';
import TechTalk from './pages/TechTalk';
import SystemStatus from './pages/SystemStatus';
import { Toaster } from 'react-hot-toast';

function App() {
  const { session, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
          <p className="text-blue-500 font-mono text-xs tracking-widest animate-pulse">
            INITIALIZING_SYSTEM...
          </p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="App selection:bg-blue-500/30">
        <Toaster 
          position="top-center"
          toastOptions={{
            className: 'font-mono text-sm border border-white/10 bg-slate-900 text-white shadow-2xl',
            duration: 4000,
          }}
        />
        
        {!session ? (
          <Login />
        ) : (
          <Routes>
            <Route path="/" element={<Dashboard />}>
              {/* index route redirects "/" to "/feed" automatically */}
              <Route index element={<Navigate to="/feed" replace />} />
              <Route path="feed" element={<LiveFeedView />} /> 
              <Route path="archive" element={<ArchiveVault />} />
              <Route path="techtalk" element={<TechTalk />} />
              <Route path="status" element={<SystemStatus />} />
            </Route>
            {/* Catch-all to redirect any weird URLs back to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        )}
      </div>
    </Router>
  );
}

export default App;