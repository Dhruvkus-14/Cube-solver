import React, { useState, useEffect } from 'react';
import { Move } from '../types/cube';
import { ChevronLeft, ChevronRight, Play, Pause, RotateCw } from 'lucide-react';

interface SolutionDisplayProps {
  solution: Move[];
  currentStep: number;
  onNextStep: () => void;
  onPreviousStep: () => void;
  onGoToStep: (step: number) => void;
  hasSolution: boolean;
  onAnimateMove?: (move: string) => void;
}

export const SolutionDisplay: React.FC<SolutionDisplayProps> = ({
  solution,
  currentStep,
  onNextStep,
  onPreviousStep,
  onGoToStep,
  hasSolution,
  onAnimateMove,
}) => {
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [animatingMove, setAnimatingMove] = useState<string | null>(null);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      if (currentStep < solution.length - 1) {
        const nextMove = solution[currentStep + 1];
        setAnimatingMove(nextMove.notation);
        onAnimateMove?.(nextMove.notation);
        
        setTimeout(() => {
          onNextStep();
          setAnimatingMove(null);
        }, 1000); // Animation duration
      } else {
        setIsAutoPlaying(false);
      }
    }, 2000); // 2 seconds between moves

    return () => clearInterval(interval);
  }, [isAutoPlaying, currentStep, solution, onNextStep, onAnimateMove]);

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  const handleStepClick = (step: number) => {
    if (isAutoPlaying) {
      setIsAutoPlaying(false);
    }
    onGoToStep(step);
  };

  const handleNextStep = () => {
    if (isAutoPlaying) {
      setIsAutoPlaying(false);
    }
    
    const nextMove = solution[currentStep + 1];
    if (nextMove) {
      setAnimatingMove(nextMove.notation);
      onAnimateMove?.(nextMove.notation);
      
      setTimeout(() => {
        onNextStep();
        setAnimatingMove(null);
      }, 1000);
    }
  };

  const handlePreviousStep = () => {
    if (isAutoPlaying) {
      setIsAutoPlaying(false);
    }
    onPreviousStep();
  };

  if (!hasSolution) return null;

  const currentMove = currentStep >= 0 ? solution[currentStep] : null;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
        Solution Steps
      </h2>

      {/* Current Move Display */}
      <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
        <div className="text-center">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
            Step {currentStep + 1} of {solution.length}
          </div>
          {currentMove ? (
            <>
              <div className={`text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2 transition-all duration-300 ${
                animatingMove === currentMove.notation ? 'animate-pulse scale-110' : ''
              }`}>
                {currentMove.notation}
              </div>
              <div className="text-sm text-gray-700 dark:text-gray-300">
                {currentMove.description}
              </div>
              {animatingMove === currentMove.notation && (
                <div className="mt-2 flex items-center justify-center gap-2 text-blue-600 dark:text-blue-400">
                  <RotateCw className="w-4 h-4 animate-spin" />
                  <span className="text-sm font-medium">Animating move...</span>
                </div>
              )}
            </>
          ) : (
            <div className="text-lg text-gray-500 dark:text-gray-400">
              Ready to start solving
            </div>
          )}
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="flex justify-center gap-3 mb-6">
        <button
          onClick={handlePreviousStep}
          disabled={currentStep < 0}
          className="flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </button>

        <button
          onClick={toggleAutoPlay}
          disabled={currentStep >= solution.length - 1}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors font-medium ${
            isAutoPlaying
              ? 'bg-red-600 text-white hover:bg-red-700'
              : 'bg-green-600 text-white hover:bg-green-700'
          } disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {isAutoPlaying ? (
            <>
              <Pause className="w-4 h-4" />
              Pause
            </>
          ) : (
            <>
              <Play className="w-4 h-4" />
              Auto Play
            </>
          )}
        </button>

        <button
          onClick={handleNextStep}
          disabled={currentStep >= solution.length - 1}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Next
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
          <span>Progress</span>
          <span>{currentStep + 1}/{solution.length}</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / solution.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Step List */}
      <div className="max-h-64 overflow-y-auto">
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
          All Steps:
        </h3>
        <div className="space-y-2">
          {solution.map((move, index) => (
            <button
              key={index}
              onClick={() => handleStepClick(index)}
              className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                index === currentStep
                  ? 'bg-blue-100 dark:bg-blue-900 border-2 border-blue-500 scale-105'
                  : index < currentStep
                  ? 'bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-800'
                  : 'bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600'
              } ${animatingMove === move.notation ? 'animate-pulse' : ''}`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <span className={`font-mono text-lg font-bold ${
                    animatingMove === move.notation ? 'text-blue-600 dark:text-blue-400' : ''
                  }`}>
                    {move.notation}
                  </span>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {move.description}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {animatingMove === move.notation && (
                    <RotateCw className="w-4 h-4 animate-spin text-blue-600 dark:text-blue-400" />
                  )}
                  <div className="text-xs text-gray-500 dark:text-gray-500">
                    {index + 1}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};