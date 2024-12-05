'use client';

import { motion } from 'framer-motion';
import { FileText, Brain, BookOpen } from 'lucide-react';

const features = [
  {
    icon: FileText,
    title: "Paper Summarization",
    description: "Generate concise, accurate summaries of complex research papers in seconds."
  },
  {
    icon: Brain,
    title: "Smart Insights",
    description: "Extract key findings, methodologies, and critical conclusions automatically."
  },
  {
    icon: BookOpen,
    title: "Cross-Reference",
    description: "Link related research, identify citation networks, and discover connections."
  }
];

export function Features() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 text-blue-900">
          Powerful Research Capabilities
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-blue-50 p-6 rounded-xl text-center hover:shadow-lg transition-all"
            >
              <feature.icon className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-4 text-blue-900">{feature.title}</h3>
              <p className="text-blue-800">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}