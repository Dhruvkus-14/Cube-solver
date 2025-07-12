import React from 'react';
import { CubeState, CubeColor, COLOR_MAP } from '../types/cube';
import { CubeFace } from './CubeFace';

interface CubeInputProps {
  cubeState: CubeState;
  onSquareUpdate: (face: keyof CubeState, index: number, color: CubeColor) => void;
  selectedColor: CubeColor;
  onColorSelect: (color: CubeColor) => void;
}

export const CubeInput: React.FC<CubeInputProps> = ({ 
  cubeState, 
  onSquareUpdate, 
  selectedColor,
  onColorSelect
}) => {
  const handleSquareClick = (face: keyof CubeState, index: number) => {
    onSquareUpdate(face, index, selectedColor);
  };

  const colors: CubeColor[] = ['W', 'Y', 'R', 'O', 'G', 'B'];

  const ColorPalette = () => (
    <div className="flex flex-col items-center">
      <h4 className="text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300 text-center">
        Color Palette
      </h4>
      <div className="grid grid-cols-3 gap-2 p-3 bg-gray-100 dark:bg-gray-600 rounded-xl">
        {colors.map(color => {
          const colorInfo = COLOR_MAP[color];
          const isSelected = selectedColor === color;
          
          return (
            <button
              key={color}
              onClick={() => onColorSelect(color)}
              className={`
                w-10 h-10 rounded-lg border-2 transition-all duration-200
                ${colorInfo.bg} ${colorInfo.border}
                ${isSelected 
                  ? 'ring-3 ring-blue-500 ring-opacity-60 scale-110 shadow-lg' 
                  : 'hover:scale-105 hover:shadow-md'
                }
                focus:outline-none focus:ring-3 focus:ring-blue-500 focus:ring-opacity-60
              `}
              title={`Select ${colorInfo.name}`}
              aria-label={`Select ${colorInfo.name} color`}
            />
          );
        })}
      </div>
      <div className="mt-2 text-xs text-gray-600 dark:text-gray-400 text-center">
        Selected: <span className="font-semibold">{COLOR_MAP[selectedColor].name}</span>
      </div>
    </div>
  );

  return (
    <div>
      <div className="flex flex-col items-center mb-8">
        <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
          2D Net View
        </h3>
        <p className="text-base text-gray-600 dark:text-gray-400 text-center max-w-md">
          Click squares to change colors. Use the color palette beside the Up face for easy access.
        </p>
      </div>

      {/* Cube Layout with Color Palette beside Up face */}
      <div className="max-w-6xl mx-auto">
        {/* Top row - Up face with Color Palette beside it */}
        <div className="flex justify-center items-start gap-8 mb-6">
          <CubeFace
            face={cubeState.U}
            faceName="Up"
            onSquareClick={(index) => handleSquareClick('U', index)}
          />
          
          {/* Color Palette positioned to the right of Up face */}
          <ColorPalette />
        </div>

        {/* Middle row - Left, Front, Right, Back */}
        <div className="grid grid-cols-4 gap-6 mb-6">
          <div className="flex justify-center">
            <CubeFace
              face={cubeState.L}
              faceName="Left"
              onSquareClick={(index) => handleSquareClick('L', index)}
            />
          </div>
          <div className="flex justify-center">
            <CubeFace
              face={cubeState.F}
              faceName="Front"
              onSquareClick={(index) => handleSquareClick('F', index)}
            />
          </div>
          <div className="flex justify-center">
            <CubeFace
              face={cubeState.R}
              faceName="Right"
              onSquareClick={(index) => handleSquareClick('R', index)}
            />
          </div>
          <div className="flex justify-center">
            <CubeFace
              face={cubeState.B}
              faceName="Back"
              onSquareClick={(index) => handleSquareClick('B', index)}
            />
          </div>
        </div>

        {/* Bottom row - Down face */}
        <div className="flex justify-center">
          <CubeFace
            face={cubeState.D}
            faceName="Down"
            onSquareClick={(index) => handleSquareClick('D', index)}
          />
        </div>
      </div>
    </div>
  );
};