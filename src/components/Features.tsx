import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Search, BookOpen, Brain, Sparkles, Clock, LineChart } from 'lucide-react';

const features = [
  {
    icon: Search,
    title: 'Smart Search',
    description: 'Intelligent search across multiple research databases and papers simultaneously.'
  },
  {
    icon: Brain,
    title: 'AI Analysis',
    description: 'Advanced AI algorithms analyze and summarize research papers instantly.'
  },
  {
    icon: Sparkles,
    title: 'Citation Generation',
    description: 'Automatic citation generation in multiple formats.'
  },
  {
    icon: Clock,
    title: 'Time Saving',
    description: 'Reduce research time by up to 70% with automated literature review.'
  },
  {
    icon: LineChart,
    title: 'Trend Analysis',
    description: 'Identify research trends and gaps in your field.'
  },
  {
    icon: BookOpen,
    title: 'Paper Summaries',
    description: 'Get instant summaries of research papers with key findings highlighted.'
  }
];

export function Features() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Powerful Features</h2>
          <p className="text-xl text-gray-600">Everything you need to accelerate your research</p>
        </div>
        <motion.div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <feature.icon className="w-12 h-12 text-purple-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}