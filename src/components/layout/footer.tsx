import { Rocket, Github } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-blue-900 text-white py-12 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Rocket className="h-6 w-6" />
              <span className="text-xl font-bold">ResearchGPT</span>
            </div>
            <p className="text-blue-200">
              Transform academic research with AI
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              <li><a href="#features" className="text-blue-200 hover:text-white">Features</a></li>
              <li><a href="#pricing" className="text-blue-200 hover:text-white">Pricing</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-blue-200 hover:text-white">Documentation</a></li>
              <li><a href="#" className="text-blue-200 hover:text-white">API</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-blue-200 hover:text-white">
                <Github className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-blue-800 mt-8 pt-8 text-center text-blue-200">
          <p>&copy; {new Date().getFullYear()} ResearchGPT. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}