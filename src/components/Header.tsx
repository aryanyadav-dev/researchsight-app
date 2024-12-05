import React from 'react';
import { Brain, Search, Sparkles } from 'lucide-react';

export function Header() {
  return (
    <header className="fixed top-0 w-full bg-white/80 backdrop-blur-sm z-50 border-b border-gray-100">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Brain className="w-8 h-8 text-purple-600" />
          <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
            ResearchGPT
          </span>
        </div>
        <nav className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-gray-600 hover:text-purple-600 transition-colors">
            Features
          </a>
          <a href="#how-it-works" className="text-gray-600 hover:text-purple-600 transition-colors">
            How it Works
          </a>
          <a href="#pricing" className="text-gray-600 hover:text-purple-600 transition-colors">
            Pricing
          </a>
        </nav>
        <a
          href="https://your-streamlit-app-url.com"
          className="bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          Launch App
        </a>
      </div>
    </header>
  );
}