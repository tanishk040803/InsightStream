import React, { useState } from 'react';
import { supabase } from '../services/dbService';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Mail, Lock, Loader2, ShieldCheck } from 'lucide-react';
import toast from 'react-hot-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const { error } = isRegistering 
      ? await supabase.auth.signUp({ email, password })
      : await supabase.auth.signInWithPassword({ email, password });
    
    if (error) {
      toast.error(error.message, { style: { background: '#1e293b', color: '#fff', border: '1px solid #ef4444' }});
    } else {
      if (isRegistering) {
        toast.success('Verification email sent! Check your inbox.', { duration: 6000 });
      } else {
        toast.success('Access Granted. Initializing Secure Session...');
      }
    }
    setLoading(false);
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-slate-950 overflow-hidden font-mono">
      
      {/* TECH BACKGROUND: Digital Grid */}
      <div className="absolute inset-0 z-0 opacity-20" 
           style={{ backgroundImage: `linear-gradient(#1e293b 1px, transparent 1px), linear-gradient(90deg, #1e293b 1px, transparent 1px)`, 
           backgroundSize: '40px 40px' }} />
      
      {/* ANIMATED GLOWS */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] animate-pulse" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 w-full max-w-md p-1 bg-gradient-to-b from-blue-500/20 to-transparent rounded-[2rem]"
      >
        <div className="bg-slate-900/90 backdrop-blur-3xl rounded-[1.9rem] p-8 border border-white/5 shadow-2xl">
          
          <div className="flex flex-col items-center mb-8">
            <motion.div 
              whileHover={{ rotate: 180 }}
              className="p-3 bg-blue-600 rounded-xl shadow-[0_0_20px_rgba(37,99,235,0.5)] mb-4"
            >
              <Zap className="text-white fill-current" size={28} />
            </motion.div>
            <h1 className="text-2xl font-black text-white tracking-tighter uppercase italic">
              Insight<span className="text-blue-500">Stream</span>.v1
            </h1>
          </div>

          <form onSubmit={handleAuth} className="space-y-4">
            <div className="group">
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500/50 group-focus-within:text-blue-400 transition-colors" size={18} />
                <input 
                  type="email" 
                  placeholder="User@gmail.com"
                  className="w-full bg-black/40 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-blue-100 placeholder:text-slate-700 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="group">
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500/50 group-focus-within:text-blue-400 transition-colors" size={18} />
                <input 
                  type="password" 
                  placeholder="Password"
                  className="w-full bg-black/40 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-blue-100 placeholder:text-slate-700 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="relative w-full h-14 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 text-white font-black rounded-xl transition-all flex items-center justify-center gap-3 overflow-hidden"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <>
                  <ShieldCheck size={20} />
                  <span>{isRegistering ? 'EXECUTE_SIGNUP' : 'Sign In'}</span>
                </>
              )}
              {/* BUTTON SHINE EFFECT */}
              <motion.div 
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
              />
            </button>
          </form>

          <div className="mt-8 flex justify-between items-center text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em]">
            <span className="h-px bg-white/5 flex-1 mr-4"></span>
            <button 
              onClick={() => setIsRegistering(!isRegistering)}
              className="hover:text-blue-400 transition-colors bg-white/5 px-3 py-1 rounded-md border border-white/5"
            >
              {isRegistering ? 'GOTO_LOGIN' : 'INIT_NEW_USER'}
            </button>
            <span className="h-px bg-white/5 flex-1 ml-4"></span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;