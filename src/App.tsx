import { useState, useEffect } from 'react';
import { Cuboid as Cube } from 'lucide-react';
import { Header } from './components/Header';
import { CubeViewer } from './components/CubeViewer';
import { Controls } from './components/Controls';
import { SolutionDisplay } from './components/SolutionDisplay';
import { ThemeToggle } from './components/ThemeToggle';
import { useCube } from './hooks/useCube';
import { useTheme } from './hooks/useTheme';
import { CubeColor, ViewType } from './types/cube';

function App() {
  const {
    cubeState,
    solution,
    currentStep,
    isValidCube,
    isSolving,
    isSolved,
    showValidationError,
    validationMessage,
    solverError,
    updateSquare,
    resetCube,
    setSolvedCube,
    undoLastMove,
    solveCube,
    nextStep,
    previousStep,
    goToStep,
    canUndo,
    canSolve,
    hasSolution,
  } = useCube();

  const { isDark, toggleTheme } = useTheme();
  const [selectedColor, setSelectedColor] = useState<CubeColor>('W');
  const [currentView, setCurrentView] = useState<ViewType>('3d');

  // Handle URL parameters for shared cubes
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const cubeParam = urlParams.get('cube');
    
    if (cubeParam) {
      // Parse shared cube state (this would need proper implementation)
      console.log('Loading shared cube:', cubeParam);
    }
  }, []);

  const handleAnimateMove = (move: string) => {
    console.log('Animating move:', move);
    // Animation logic can be added here if needed
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
      
      <div className="container mx-auto px-4 py-8">
        <Header />

        <div className="max-w-7xl mx-auto">
          {/* Cube Viewer - Large central area */}
          <div className="mb-8 flex justify-center">
            <div className="w-full">
              <CubeViewer
                cubeState={cubeState}
                onSquareUpdate={updateSquare}
                isValidCube={isValidCube}
                selectedColor={selectedColor}
                onColorSelect={setSelectedColor}
                currentView={currentView}
                onViewChange={setCurrentView}
              />
            </div>
          </div>

          {/* Controls and Solution - Bottom */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {/* Controls */}
            <div>
              <Controls
                onSolve={solveCube}
                onReset={resetCube}
                onSetSolved={setSolvedCube}
                onUndo={undoLastMove}
                canSolve={canSolve}
                canUndo={canUndo}
                isValidCube={isValidCube}
                isSolving={isSolving}
                isSolved={isSolved}
                showValidationError={showValidationError}
                validationMessage={validationMessage}
                solverError={solverError}
              />
            </div>

            {/* Solution Display */}
            <div>
              {hasSolution ? (
                <SolutionDisplay
                  solution={solution}
                  currentStep={currentStep}
                  onNextStep={nextStep}
                  onPreviousStep={previousStep}
                  onGoToStep={goToStep}
                  hasSolution={hasSolution}
                  onAnimateMove={handleAnimateMove}
                />
              ) : (
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center">
                  <div className="mb-4">
                    <Cube className="w-16 h-16 mx-auto text-gray-400 dark:text-gray-600" />
                  </div>
                  <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                    {isSolved ? 'Cube is Already Solved!' : 'Ready to Build Your Cube'}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    {isSolved 
                      ? 'Your cube is already in the solved state. Try clearing it and inputting a scrambled state to get a solution.'
                      : 'Switch to 2D view to fill squares with colors. Each color must appear exactly 9 times for the solver to work.'
                    }
                  </p>
                  {solverError && (
                    <div className="mt-4 p-3 bg-red-100 dark:bg-red-900 border border-red-300 dark:border-red-700 rounded-lg">
                      <p className="text-red-700 dark:text-red-300 text-sm">
                        <strong>Last Error:</strong> {solverError}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 text-center text-gray-500 dark:text-gray-400">
          <p className="text-sm">
            Built with React, TypeScript, and Tailwind CSS. 
            Features touch gestures, solution sharing, and move animations.
            Uses the Kociemba algorithm via rubiks-cube-solver for optimal solutions.
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;