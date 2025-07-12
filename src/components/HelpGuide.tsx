import React, { useState } from 'react';
import { HelpCircle, X, Lightbulb, Eye, Palette, Zap, RotateCw, ChevronRight } from 'lucide-react';

interface HelpGuideProps {
  className?: string;
}

export const HelpGuide: React.FC<HelpGuideProps> = ({ className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openGuide = () => setIsOpen(true);
  const closeGuide = () => setIsOpen(false);

  return (
    <>
      {/* Help Button */}
      <button
        onClick={openGuide}
        className={`
          flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg 
          hover:bg-blue-700 transition-colors font-medium shadow-lg hover:shadow-xl
          ${className}
        `}
        title="How to use this app"
      >
        <HelpCircle className="w-5 h-5" />
        How to Use This App?
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                <Lightbulb className="w-6 h-6 text-blue-600" />
                How to Use Cube Solver
              </h2>
              <button
                onClick={closeGuide}
                className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-8">
              {/* Quick Start */}
              <section>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <ChevronRight className="w-5 h-5 text-green-600" />
                  Quick Start Guide
                </h3>
                <div className="bg-green-50 dark:bg-green-900 rounded-lg p-4">
                  <ol className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300">
                    <li><strong>Switch to 2D View:</strong> Click the "2D" button to access color input mode</li>
                    <li><strong>Select Colors:</strong> Use the color palette beside the Up face (2×3 grid)</li>
                    <li><strong>Fill the Cube:</strong> Click squares to apply selected colors</li>
                    <li><strong>Ensure Validity:</strong> Each color must appear exactly 9 times</li>
                    <li><strong>Solve:</strong> Click "Solve" button to get step-by-step solution</li>
                    <li><strong>Follow Steps:</strong> Use navigation controls to go through each move</li>
                  </ol>
                </div>
              </section>

              {/* View Modes */}
              <section>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Eye className="w-5 h-5 text-blue-600" />
                  View Modes
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 dark:bg-blue-900 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">🎯 3D Perspective View</h4>
                    <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                      <li>• Interactive 3D visualization</li>
                      <li>• Rotate with arrow controls</li>
                      <li>• View all faces from different angles</li>
                      <li>• <strong>Read-only:</strong> Cannot edit colors</li>
                    </ul>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-900 rounded-lg p-4">
                    <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-2">📐 2D Net View</h4>
                    <ul className="text-sm text-purple-700 dark:text-purple-300 space-y-1">
                      <li>• Unfolded cube layout</li>
                      <li>• Click squares to change colors</li>
                      <li>• Color palette beside Up face</li>
                      <li>• <strong>Input mode:</strong> Edit cube state here</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Color System */}
              <section>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Palette className="w-5 h-5 text-purple-600" />
                  Color System & Rules
                </h3>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-white border-2 border-gray-300 rounded"></div>
                      <span className="text-sm">White (W)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-yellow-400 border-2 border-yellow-500 rounded"></div>
                      <span className="text-sm">Yellow (Y)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-red-500 border-2 border-red-600 rounded"></div>
                      <span className="text-sm">Red (R)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-orange-500 border-2 border-orange-600 rounded"></div>
                      <span className="text-sm">Orange (O)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-green-500 border-2 border-green-600 rounded"></div>
                      <span className="text-sm">Green (G)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-blue-500 border-2 border-blue-600 rounded"></div>
                      <span className="text-sm">Blue (B)</span>
                    </div>
                  </div>
                  <div className="bg-yellow-100 dark:bg-yellow-900 rounded-lg p-3">
                    <p className="text-sm text-yellow-800 dark:text-yellow-200">
                      <strong>⚠️ Important Rule:</strong> Each color must appear exactly 9 times (one complete face). 
                      The app will validate this before allowing you to solve.
                    </p>
                  </div>
                </div>
              </section>

              {/* Solver Output */}
              <section>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-orange-600" />
                  Understanding Solver Output
                </h3>
                <div className="space-y-4">
                  {/* Move Notation */}
                  <div className="bg-orange-50 dark:bg-orange-900 rounded-lg p-4">
                    <h4 className="font-semibold text-orange-800 dark:text-orange-200 mb-3">🔤 Move Notation Guide</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <h5 className="font-medium text-orange-700 dark:text-orange-300 mb-2">Basic Moves:</h5>
                        <ul className="space-y-1 text-orange-600 dark:text-orange-400">
                          <li><code className="bg-orange-100 dark:bg-orange-800 px-1 rounded">R</code> = Right face clockwise 90°</li>
                          <li><code className="bg-orange-100 dark:bg-orange-800 px-1 rounded">R'</code> = Right face counter-clockwise 90°</li>
                          <li><code className="bg-orange-100 dark:bg-orange-800 px-1 rounded">R2</code> = Right face 180°</li>
                          <li><code className="bg-orange-100 dark:bg-orange-800 px-1 rounded">U</code> = Up face clockwise 90°</li>
                          <li><code className="bg-orange-100 dark:bg-orange-800 px-1 rounded">F</code> = Front face clockwise 90°</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-medium text-orange-700 dark:text-orange-300 mb-2">All Faces:</h5>
                        <ul className="space-y-1 text-orange-600 dark:text-orange-400">
                          <li><strong>U</strong> = Up (Top)</li>
                          <li><strong>D</strong> = Down (Bottom)</li>
                          <li><strong>R</strong> = Right</li>
                          <li><strong>L</strong> = Left</li>
                          <li><strong>F</strong> = Front</li>
                          <li><strong>B</strong> = Back</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Solution Navigation */}
                  <div className="bg-indigo-50 dark:bg-indigo-900 rounded-lg p-4">
                    <h4 className="font-semibold text-indigo-800 dark:text-indigo-200 mb-3">🧭 Solution Navigation</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-indigo-700 dark:text-indigo-300">
                      <div>
                        <h5 className="font-medium mb-2">Controls:</h5>
                        <ul className="space-y-1">
                          <li>• <strong>Next/Previous:</strong> Navigate through steps</li>
                          <li>• <strong>Progress Bar:</strong> Shows current position</li>
                          <li>• <strong>Step List:</strong> Click any step to jump to it</li>
                          <li>• <strong>Current Move:</strong> Large display shows active step</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-medium mb-2">Step Information:</h5>
                        <ul className="space-y-1">
                          <li>• <strong>Notation:</strong> Move in standard format (e.g., R, U', F2)</li>
                          <li>• <strong>Description:</strong> Human-readable instruction</li>
                          <li>• <strong>Step Number:</strong> Current position in solution</li>
                          <li>• <strong>Total Steps:</strong> Complete solution length</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Status Indicators */}
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">📊 Status Indicators</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <h5 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Validation States:</h5>
                        <ul className="space-y-2">
                          <li className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                            <span>Valid cube - ready to solve</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                            <span>Invalid configuration</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                            <span>Cube is already solved</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                            <span>Incomplete - fill more squares</span>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Button States:</h5>
                        <ul className="space-y-2">
                          <li>• <strong>Solve:</strong> Available when cube is valid</li>
                          <li>• <strong>Solving...:</strong> Algorithm is running</li>
                          <li>• <strong>Solved!:</strong> Cube is already solved</li>
                          <li>• <strong>Undo:</strong> Available during solution steps</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Tips & Tricks */}
              <section>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <RotateCw className="w-5 h-5 text-green-600" />
                  Tips & Tricks
                </h3>
                <div className="bg-green-50 dark:bg-green-900 rounded-lg p-4">
                  <ul className="space-y-2 text-green-700 dark:text-green-300">
                    <li>• <strong>Color Palette Position:</strong> Strategically placed beside Up face for easy access</li>
                    <li>• <strong>Efficient Workflow:</strong> Select color → Click multiple squares → Select new color</li>
                    <li>• <strong>3D Visualization:</strong> Use 3D view to verify your color placement</li>
                    <li>• <strong>Validation Feedback:</strong> Watch the status indicator for real-time validation</li>
                    <li>• <strong>Solution Length:</strong> Optimal solutions typically range from 15-25 moves</li>
                    <li>• <strong>Step Navigation:</strong> You can jump to any step, not just next/previous</li>
                    <li>• <strong>Reset Options:</strong> Use "Clear All" to start over or "Set Solved" for reference</li>
                  </ul>
                </div>
              </section>

              {/* Algorithm Info */}
              <section>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">🧠 About the Solver</h3>
                <div className="bg-blue-50 dark:bg-blue-900 rounded-lg p-4">
                  <p className="text-blue-700 dark:text-blue-300 mb-3">
                    This app uses the <strong>Kociemba Algorithm</strong>, a two-phase algorithm that finds optimal or near-optimal solutions:
                  </p>
                  <ul className="space-y-1 text-blue-600 dark:text-blue-400 text-sm">
                    <li>• <strong>Phase 1:</strong> Reduces cube to a specific subgroup</li>
                    <li>• <strong>Phase 2:</strong> Solves the cube within that subgroup</li>
                    <li>• <strong>Efficiency:</strong> Typically finds solutions in 15-25 moves</li>
                    <li>• <strong>Speed:</strong> Solves most configurations in under a second</li>
                  </ul>
                </div>
              </section>
            </div>

            {/* Footer */}
            <div className="border-t border-gray-200 dark:border-gray-700 p-6">
              <div className="flex justify-center">
                <button
                  onClick={closeGuide}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Got it! Let's Start Solving
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};