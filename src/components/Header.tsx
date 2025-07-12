import React from 'react';
import { Cuboid as Cube } from 'lucide-react';
import { HelpGuide } from './HelpGuide';

export const Header: React.FC = () => {
  return (
    <header className="text-center mb-8">
      <div className="flex items-center justify-center gap-3 mb-4">
        <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl">
          <Cube className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Cube Solver
        </h1>
      </div>
      
      <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-6">
        Input your cube's current state by clicking on squares and selecting colors. 
        Get step-by-step instructions to solve your cube with detailed move descriptions and animations.
      </p>

      {/* Help Guide Button */}
      <div className="flex justify-center">
        <HelpGuide />
      </div>
    </header>
  );
};