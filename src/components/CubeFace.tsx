import React from 'react';
import { CubeFace as CubeFaceType, COLOR_MAP } from '../types/cube';

interface CubeFaceProps {
  face: CubeFaceType;
  faceName: string;
  onSquareClick: (index: number) => void;
  className?: string;
}

export const CubeFace: React.FC<CubeFaceProps> = ({ 
  face, 
  faceName, 
  onSquareClick, 
  className = '' 
}) => {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <h4 className="text-base font-semibold mb-3 text-gray-700 dark:text-gray-300">
        {faceName}
      </h4>
      <div className="grid grid-cols-3 gap-2 p-4 bg-gray-200 dark:bg-gray-700 rounded-xl">
        {face.map((color, index) => {
          const colorInfo = COLOR_MAP[color];
          return (
            <button
              key={index}
              onClick={() => onSquareClick(index)}
              className={`
                w-12 h-12 sm:w-14 sm:h-14 rounded-lg border-2 transition-all duration-200
                ${colorInfo.bg} ${colorInfo.border}
                hover:scale-110 hover:shadow-lg
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
                active:scale-95
              `}
              title={`Square ${index + 1} - ${colorInfo.name}`}
            />
          );
        })}
      </div>
    </div>
  );
};