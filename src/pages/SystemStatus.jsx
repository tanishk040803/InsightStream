import React, { useEffect, useState } from 'react';
import { supabase } from '../services/dbService';

const SystemStatus = () => {
  const [stats, setStats] = useState({ count: 0, status: 'STABLE' });

  useEffect(() => {
    const getStats = async () => {
      const { count, error } = await supabase
        .from('research_archive')
        .select('*', { count: 'exact', head: true });
      if (!error) setStats({ count, status: 'STABLE' });
    };
    getStats();
  }, []);

  return (
    <div className="p-10 font-mono">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="border border-blue-500/30 p-8 rounded-xl bg-blue-500/5">
          <h2 className="text-gray-400 text-sm mb-2">DATABASE_NODES</h2>
          <div className="text-6xl font-bold text-blue-500">{stats.count}</div>
          <p className="text-xs text-gray-500 mt-4">ACTIVE_ENTRIES_IN_ARCHIVE</p>
        </div>
        <div className="border border-green-500/30 p-8 rounded-xl bg-green-500/5">
          <h2 className="text-gray-400 text-sm mb-2">SYSTEM_INTEGRITY</h2>
          <div className="text-6xl font-bold text-green-500">{stats.status}</div>
          <p className="text-xs text-gray-500 mt-4">ALL_PROXY_BYPASS_ACTIVE</p>
        </div>
      </div>
    </div>
  );
};

export default SystemStatus;