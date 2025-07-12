import React from 'react';
import { Box, Grid3X3 } from 'lucide-react';
import { ViewType } from '../types/cube';

interface ViewSwitcherProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
  className?: string;
}

export const ViewSwitcher: React.FC<ViewSwitcherProps> = ({
  currentView,
  onViewChange,
  className = ''
}) => {
  return (
    <div className={`flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1 ${className}`}>
      <button
        onClick={() => onViewChange('3d')}
        className={`
          flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200
          ${currentView === '3d'
            ? 'bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 shadow-sm'
            : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
          }
        `}
      >
        <Box className="w-4 h-4" />
        3D
      </button>
      
      <button
        onClick={() => onViewChange('net')}
        className={`
          flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200
          ${currentView === 'net'
            ? 'bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 shadow-sm'
            : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
          }
        `}
      >
        <Grid3X3 className="w-4 h-4" />
        2D
      </button>
    </div>
  );
};