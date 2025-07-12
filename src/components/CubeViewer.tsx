import React from 'react';
import { CubeState, CubeColor, ViewType } from '../types/cube';
import { Cube3DView } from './Cube3DView';
import { CubeInput } from './CubeInput';
import { ViewSwitcher } from './ViewSwitcher';

interface CubeViewerProps {
  cubeState: CubeState;
  onSquareUpdate: (face: keyof CubeState, index: number, color: CubeColor) => void;
  isValidCube: boolean;
  selectedColor: CubeColor;
  onColorSelect: (color: CubeColor) => void;
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
}

export const CubeViewer: React.FC<CubeViewerProps> = ({
  cubeState,
  onSquareUpdate,
  selectedColor,
  onColorSelect,
  currentView,
  onViewChange
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
      {/* View Switcher */}
      <div className="flex justify-center mb-8">
        <ViewSwitcher
          currentView={currentView}
          onViewChange={onViewChange}
        />
      </div>

      {/* Current View - Much Larger Display Area */}
      <div className="flex justify-center">
        {currentView === '3d' ? (
          <div className="w-full max-w-2xl">
            <Cube3DView 
              cubeState={cubeState}
            />
          </div>
        ) : (
          <div className="w-full max-w-4xl">
            <CubeInput
              cubeState={cubeState}
              onSquareUpdate={onSquareUpdate}
              selectedColor={selectedColor}
              onColorSelect={onColorSelect}
            />
          </div>
        )}
      </div>

      {/* View Description */}
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {currentView === '3d' 
            ? 'Drag to rotate the cube • Touch gestures supported on mobile • Colors are set in 2D view'
            : 'Click squares to set colors • Each color must appear exactly 9 times • Use color palette for quick selection'
          }
        </p>
      </div>
    </div>
  );
};