import React from 'react';
import { motion } from 'framer-motion';
import { Search, BookOpen, Brain } from 'lucide-react';

export function Hero() {
  return (
    <section className="pt-32 pb-20 px-4">
      <div className="container mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            Transform Your Research
            <br />
            with AI Intelligence
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Accelerate your research process with AI-powered literature review, analysis, and insights generation.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <a
              href="https://your-streamlit-app-url.com"
              className="bg-purple-600 text-white px-8 py-3 rounded-full text-lg hover:bg-purple-700 transition-colors inline-flex items-center justify-center gap-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Search className="w-5 h-5" />
              Start Researching
            </a>
            <a
              href="#how-it-works"
              className="bg-white text-purple-600 px-8 py-3 rounded-full text-lg border-2 border-purple-600 hover:bg-purple-50 transition-colors inline-flex items-center justify-center gap-2"
            >
              <BookOpen className="w-5 h-5" />
              Learn More
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}