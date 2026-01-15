import React, { useState, useEffect } from 'react';
import ArticleCard from '../components/ArticleCard';
import { getAIFeed } from '../services/aiService';
import { Search, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const LiveFeedView = () => {
  const [articles, setArticles] = useState([]);
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    const loadInitialFeed = async () => {
      setIsSyncing(true);
      try {
        const data = await getAIFeed();
        setArticles(data);
      } catch (error) {
        toast.error("INITIAL_SYNC_FAILED");
      } finally {
        setIsSyncing(false);
      }
    };
    loadInitialFeed();
  }, []);

  const handleSync = async () => {
    setIsSyncing(true);
    const loadingToast = toast.loading('FETCHING_LATEST_DECODE...');
    try {
      const freshData = await getAIFeed();
      setArticles(freshData);
      toast.success('STREAM_UPDATED', { id: loadingToast });
    } catch (error) {
      toast.error('SYNC_FAILED', { id: loadingToast });
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <>
      {/* SEARCH & REFRESH TOOLS */}
      <div className="flex items-center gap-3 mb-8 justify-end">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={14} />
          <input type="text" placeholder="Search_Archive..." className="bg-black/40 border border-white/10 rounded-xl py-2 pl-10 pr-6 text-xs text-blue-100 focus:outline-none focus:border-blue-500/50 w-64 font-mono transition-all" />
        </div>
        <button onClick={handleSync} disabled={isSyncing} className="p-2.5 bg-blue-600/10 border border-blue-500/20 text-blue-500 rounded-xl hover:bg-blue-600/20 transition-all">
          <RefreshCw size={18} className={isSyncing ? "animate-spin" : ""} />
        </button>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((item, index) => (
          <ArticleCard key={index} index={index} article={item} />
        ))}
        
        {/* SYNC TRIGGER CARD */}
        <motion.button onClick={handleSync} disabled={isSyncing} whileHover={{ scale: 0.98 }} className="border-2 border-dashed border-white/5 rounded-2xl flex flex-col items-center justify-center p-8 bg-white/5 min-h-[250px]">
          <RefreshCw className={`text-slate-600 mb-4 ${isSyncing ? 'animate-spin' : ''}`} size={24} />
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Sync_New_Data</p>
        </motion.button>
      </div>
    </>
  );
};

export default LiveFeedView;