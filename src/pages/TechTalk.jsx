import React, { useState, useRef, useEffect } from 'react';
import OpenAI from 'openai';
import { dbService } from '../services/dbService'; // Import your service

const TechTalk = () => {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'TechTalk online. I have access to your research archive. How can I help?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  const openai = new OpenAI({ 
    apiKey: import.meta.env.VITE_OPENAI_API_KEY, 
    dangerouslyAllowBrowser: true 
  });

  // Auto-scroll to bottom when messages update
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      // R- Retrieval: Fetch the latest archive data
      const archiveData = await dbService.getSavedPapers();
      
      // A- augmenting context
      const archiveContext = archiveData.length > 0 
        ? archiveData.map(p => `- Title: ${p.title}\n  Summary: ${p.abstract}`).join('\n\n')
        : "No papers saved yet.";

      // S- system prompt
      const systemMessage = {
        role: "system",
        content: `You are TechTalk, a research assistant. You have access to the user's ARCHIVE VAULT below. 
        If the user asks about their saved papers or 'what is in my vault', use this data. 
        Otherwise, chat normally as a helpful AI assistant.
        
        USER ARCHIVE:
        ${archiveContext}`
      };

      // G-generation
      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [systemMessage, ...messages, userMessage],
        max_tokens: 300, // Increased slightly to allow for detailed research analysis
        temperature: 0.7,
      });

      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: response.choices[0].message.content 
      }]);
    } catch (error) {
      console.error("TechTalk Error:", error);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-100px)] max-w-4xl mx-auto p-4 font-mono">
      <div className="flex-1 overflow-y-auto space-y-4 mb-4 p-6 border border-blue-500/20 rounded-lg bg-black/40 shadow-xl">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-3 rounded-lg ${
              msg.role === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-blue-100 border border-blue-900'
            }`}>
              <p className="text-xs opacity-50 mb-1">{msg.role.toUpperCase()}</p>
              <p className="text-sm">{msg.content}</p>
            </div>
          </div>
        ))}
        {isTyping && <div className="text-blue-500 animate-pulse text-xs uppercase tracking-widest">TechTalk_is_processing...</div>}
        <div ref={scrollRef} />
      </div>

      <div className="flex gap-2">
        <input 
          className="flex-1 bg-gray-900 border border-blue-500/30 p-3 rounded-lg text-white focus:outline-none focus:border-blue-500"
          value={input} 
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask about your archive or tech..."
        />
        <button onClick={handleSend} className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-bold transition-all shadow-lg shadow-blue-500/20">
          SEND
        </button>
      </div>
    </div>
  );
};

export default TechTalk;