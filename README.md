🚀 InsightStream: AI-Powered Research Discovery
InsightStream is a high-performance research companion that bridges the gap between massive academic databases and actionable insights. It combines a real-time discovery feed with a Retrieval-Augmented Generation (RAG) chatbot, allowing you to "interact" with your curated library of academic papers.

Live Demo | Report Bug

✨ Key Features
🔍 Real-Time Discovery: Integrates the Semantic Scholar API to fetch the latest academic innovations across all fields.

🧠 RAG-Powered Chatbot: A dual-mode conversational agent using GPT-4o mini that provides context-aware answers by injecting saved research metadata into the AI's prompt.

📁 Persistent Archive Vault: Securely curate a personal database of papers using Supabase (PostgreSQL).

⚡ Modern UI/UX: A fully responsive interface built with React and Tailwind CSS, optimized for both mobile and desktop research.

🛡️ Proxy Middleware: Custom architecture to bypass CORS restrictions, ensuring stable and secure data retrieval from external APIs.

🛠️ Tech Stack
Frontend: React, Vite, Tailwind CSS

Backend/Database: Supabase (PostgreSQL)

AI Engine: OpenAI API (GPT-4o mini)

Data Source: Semantic Scholar API

Deployment: Vercel

🚀 Getting Started
Prerequisites

Node.js (v18+)

OpenAI API Key

Supabase Project URL & Anon Key

Installation

Clone the repository:

Bash
git clone https://github.com/tanishk040803/InsightStream.git
cd InsightStream
Install dependencies:

Bash
npm install
Set up Environment Variables: Create a .env.local file in the root directory:

Code snippet
VITE_OPENAI_API_KEY=your_openai_key
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
Launch the development server:

Bash
npm run dev
📐 System Architecture
InsightStream utilizes a Stateless Frontend / Intelligent Backend flow:

Discovery: The frontend fetches live data from Semantic Scholar via an optimized proxy.

Archiving: User-selected metadata is persisted in Supabase.

Augmentation: During chat, the system retrieves relevant metadata from the user's archive and injects it into the LLM system prompt (RAG) to ensure responses are grounded in verified research.

📝 License
Distributed under the MIT License. See LICENSE for more information.
