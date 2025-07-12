import React from 'react';
import { Zap, Undo, Check, Loader, Square, CheckSquare, AlertCircle } from 'lucide-react';

interface ControlsProps {
  onSolve: () => void;
  onReset: () => void;
  onUndo: () => void;
  canSolve: boolean;
  canUndo: boolean;
  isValidCube: boolean;
  isSolving?: boolean;
  isSolved?: boolean;
  onSetSolved?: () => void;
  showValidationError?: boolean;
  validationMessage?: string;
  solverError?: string;
}

export const Controls: React.FC<ControlsProps> = ({
  onSolve,
  onReset,
  onUndo,
  canSolve,
  canUndo,
  isValidCube,
  isSolving = false,
  isSolved = false,
  onSetSolved,
  showValidationError = false,
  validationMessage = '',
  solverError = '',
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
        Controls
      </h2>
      
      {/* Main Control Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <button
          onClick={onSolve}
          disabled={!canSolve || isSolving || isSolved}
          className={`flex items-center justify-center gap-2 px-3 py-2 rounded-lg transition-colors font-medium text-sm ${
            canSolve && !isSolving && !isSolved
              ? 'bg-green-600 text-white hover:bg-green-700'
              : 'bg-gray-400 text-gray-200 cursor-not-allowed'
          }`}
        >
          {isSolving ? (
            <>
              <Loader className="w-4 h-4 animate-spin" />
              Solving...
            </>
          ) : isSolved ? (
            <>
              <Check className="w-4 h-4" />
              Solved!
            </>
          ) : (
            <>
              <Zap className="w-4 h-4" />
              Solve
            </>
          )}
        </button>

        <button
          onClick={onUndo}
          disabled={!canUndo || isSolving}
          className="flex items-center justify-center gap-2 px-3 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-amber-600 transition-colors font-medium text-sm"
        >
          <Undo className="w-4 h-4" />
          Undo
        </button>

        {onSetSolved && (
          <button
            onClick={onSetSolved}
            disabled={isSolving}
            className="flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium text-sm"
          >
            <CheckSquare className="w-4 h-4" />
            Set Solved
          </button>
        )}

        <button
          onClick={onReset}
          disabled={isSolving}
          className="flex items-center justify-center gap-2 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium text-sm"
        >
          <Square className="w-4 h-4" />
          Clear All
        </button>
      </div>

      {/* Solver Error Display */}
      {solverError && (
        <div className="mb-4 p-3 bg-red-100 dark:bg-red-900 border border-red-300 dark:border-red-700 rounded-lg">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0" />
            <span className="text-red-700 dark:text-red-300 text-sm">
              <strong>Solver Error:</strong> {solverError}
            </span>
          </div>
        </div>
      )}

      {/* Cube Validation Indicator */}
      <div className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg transition-all duration-300 ${
        isSolved
          ? 'bg-blue-100 dark:bg-blue-900 border border-blue-300 dark:border-blue-700'
          : isValidCube 
          ? 'bg-green-100 dark:bg-green-900 border border-green-300 dark:border-green-700' 
          : showValidationError
          ? 'bg-red-100 dark:bg-red-900 border border-red-300 dark:border-red-700'
          : 'bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600'
      }`}>
        {isSolved ? (
          <>
            <Check className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <span className="text-blue-700 dark:text-blue-300 font-medium">
              Cube is solved!
            </span>
          </>
        ) : isValidCube ? (
          <>
            <Check className="w-5 h-5 text-green-600 dark:text-green-400" />
            <span className="text-green-700 dark:text-green-300 font-medium">
              Valid cube - ready to solve!
            </span>
          </>
        ) : showValidationError ? (
          <>
            <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
            <span className="text-red-700 dark:text-red-300 font-medium">
              {validationMessage}
            </span>
          </>
        ) : (
          <>
            <Square className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            <span className="text-gray-700 dark:text-gray-300 font-medium">
              {validationMessage}
            </span>
          </>
        )}
      </div>

      <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          <strong>Features:</strong> Share solutions with friends, use touch gestures to rotate the 3D view, 
          and export your solutions as text or JSON files! Switch to 2D view to input your cube colors.
        </p>
      </div>
    </div>
  );
};