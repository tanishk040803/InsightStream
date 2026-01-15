import React, { useEffect, useState } from 'react';
import { supabase } from '../services/dbService';
import ArticleCard from '../components/ArticleCard';
import { Database, ShieldCheck } from 'lucide-react';

const ArchiveVault = () => {
  const [savedArticles, setSavedArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  // Function to pull the latest saved data from Supabase
  const fetchArchive = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('research_archive')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setSavedArticles(data || []);
    } catch (error) {
      console.error("Vault_Fetch_Error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArchive();
  }, []);

  return (
    <div className="p-2">
      {/* HEADER SECTION */}
      <div className="flex justify-between items-center mb-8 bg-blue-500/5 border border-blue-500/10 p-6 rounded-2xl">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-blue-500/10 rounded-xl">
            <Database className="text-blue-400" size={24} />
          </div>
          <div>
            <h1 className="text-xl font-black text-white uppercase tracking-tighter">Archive_Vault</h1>
            <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
              <ShieldCheck size={12} className="text-green-500" /> 
              Secure_Storage // Records: {savedArticles.length}
            </p>
          </div>
        </div>
      </div>

      {/* GRID SECTION */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-64 bg-slate-900/50 border border-white/5 rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedArticles.map((article, index) => (
            <ArticleCard 
              key={article.id || index} 
              article={article} 
              index={index} 
              isSavedPage={true} // Tells the card to show the TRASH icon
              onRefresh={fetchArchive} // Passes the refresh function for after-deletion
            />
          ))}
        </div>
      )}

      {/* EMPTY STATE */}
      {!loading && savedArticles.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-white/5 rounded-3xl">
          <Database className="text-slate-800 mb-4" size={48} />
          <p className="text-slate-500 font-mono text-xs uppercase tracking-widest">Vault_Is_Empty</p>
          <p className="text-slate-600 text-[10px] mt-2 italic">Save news from the Live_Feed to see them here.</p>
        </div>
      )}
    </div>
  );
};

export default ArchiveVault;