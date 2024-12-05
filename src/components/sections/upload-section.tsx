'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function UploadSection() {
  const [email, setEmail] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement form submission
    console.log('Form submitted:', { email, selectedFile });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button type="submit" className="whitespace-nowrap">
                Subscribe
              </Button>
            </div>
            <div className="relative">
              <input
                type="file"
                id="file-upload"
                className="hidden"
                onChange={handleFileChange}
                accept=".pdf"
              />
              <label
                htmlFor="file-upload"
                className="flex items-center justify-center w-full p-4 border-2 border-dashed border-blue-300 rounded-lg cursor-pointer hover:bg-blue-50 transition"
              >
                <Upload className="mr-2 text-blue-600" />
                <span className="text-blue-800">
                  {selectedFile ? selectedFile.name : "Upload Research Paper (PDF)"}
                </span>
              </label>
            </div>

            {/* Center-aligned Analyze Paper button under the upload section */}
            <div className="flex justify-center">
              <Button type="submit" className="w-full md:w-auto">
                Analyze Paper
              </Button>
            </div>
          </form>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center"
        >
          <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
            <Upload className="w-24 h-24 text-blue-600 mx-auto" />
            <h3 className="text-xl font-semibold text-center mt-4 text-blue-900">
              Drag & Drop Your Paper
            </h3>
            <p className="text-center mt-2 text-blue-700">
              Support for PDF files up to 50MB
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
