import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, BrainCircuit, Calendar, Bookmark, Trash2 } from 'lucide-react';
import { supabase } from '../services/dbService';
import toast from 'react-hot-toast';

const ArticleCard = ({ article, index, isSavedPage = false, onRefresh }) => {
  const { title, summary, date, category, url, impact_score } = article;
  const [isProcessing, setIsProcessing] = useState(false);

  //  Save to Supabase
  const handleSave = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    try {
      const { error } = await supabase
        .from('research_archive')
        .upsert({
          title,
          summary,
          url,
          impact_score: impact_score || 85,
          category: category || 'AI_RESEARCH'
        }, { onConflict: 'url' });

      if (error) throw error;
      toast.success('ARCHIVED_TO_VAULT');
    } catch (error) {
      toast.error('SAVE_FAILED');
    } finally {
      setIsProcessing(false);
    }
  };

  //  Delete from Supabase (Used in Archive Vault)
  const handleDelete = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    try {
      const { error } = await supabase
        .from('research_archive')
        .delete()
        .eq('url', url);

      if (error) throw error;
      toast.success('NODE_DELETED');
      if (onRefresh) onRefresh(); 
    } catch (error) {
      toast.error('DELETE_FAILED');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      
      whileHover={{ 
        y: -8, 
        scale: 1.02,
        transition: { duration: 0.2, ease: "easeOut" }
      }}
      transition={{ delay: index * 0.05 }}
      
      className="group relative bg-slate-900/40 border border-white/5 rounded-2xl p-6 hover:border-blue-500/40 hover:bg-slate-900/60 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] hover:shadow-blue-500/10 transition-colors duration-300 shadow-xl"
    >
      <div className="relative z-10">
        <div className="flex justify-between items-center mb-4">
          <span className="flex items-center gap-1.5 px-2 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-bold uppercase tracking-widest rounded">
            <BrainCircuit size={12} />
            {category || 'Research_Node'}
          </span>
          <span className="flex items-center gap-1 text-slate-500 text-[10px] font-mono">
            <Calendar size={12} />
            {date || '2026.01.09'}
          </span>
        </div>

        <h3 className="text-md font-bold text-white leading-snug mb-3 line-clamp-2">
          {title}
        </h3>

        <p className="text-slate-400 text-xs leading-relaxed line-clamp-3 italic mb-6">
          "{summary}"
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-white/5">
          <a 
            href={url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-[10px] font-bold text-blue-500 hover:text-blue-400 uppercase tracking-widest transition-colors"
          >
            Source <ExternalLink size={12} />
          </a>

          <div className="flex items-center gap-2">
            {isSavedPage ? (
              <button 
                onClick={handleDelete}
                disabled={isProcessing}
                className="p-2 text-slate-500 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all"
              >
                <Trash2 size={18} />
              </button>
            ) : (
              <button 
                onClick={handleSave}
                disabled={isProcessing}
                className={`p-2 rounded-lg transition-all ${
                  isProcessing ? 'text-blue-500 animate-pulse' : 'text-slate-500 hover:text-blue-500 hover:bg-blue-500/10'
                }`}
              >
                <Bookmark size={18} fill={isProcessing ? "currentColor" : "none"} />
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ArticleCard;