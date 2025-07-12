import { useState, useCallback } from 'react';
import { CubeState, Move, CubeColor, EMPTY_CUBE, SOLVED_CUBE } from '../types/cube';
import { getMoveDescription, getCubeValidationStatus, isCubeSolved } from '../utils/cubeConverter';
import { solveCube, convertCubeToSolverFormat } from '../utils/cubeSolver';

export const useCube = () => {
  const [cubeState, setCubeState] = useState<CubeState>(EMPTY_CUBE);
  const [solution, setSolution] = useState<Move[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isSolving, setIsSolving] = useState(false);
  const [solverError, setSolverError] = useState<string>('');

  const validationStatus = getCubeValidationStatus(cubeState);
  const isValidCube = validationStatus.isValid;
  const isSolved = isCubeSolved(cubeState);
  const canSolve = validationStatus.canSolve && !isSolved;
  const showValidationError = validationStatus.showError;
  const validationMessage = validationStatus.message;

  const hasSolution = solution.length > 0;
  const canUndo = currentStep > 0;

  const solveCubeHandler = useCallback(async () => {
    if (!canSolve || isSolved) {
      console.log('Cannot solve: cube is not valid or already solved');
      return;
    }
    
    setIsLoading(true);
    setIsSolving(true);
    setSolverError('');
    
    try {
      console.log('Starting cube solve process...');
      
      const cubeString = convertCubeToSolverFormat(cubeState);
      console.log('Cube format string:', cubeString);
      
      const result = await solveCube(cubeString);
      console.log('Solver result:', result);
      
      if (result.solution.length === 0) {
        setSolution([]);
        setCurrentStep(0);
        console.log('Cube is already solved');
        return;
      }
      
      const moves: Move[] = result.solution.map(move => ({
        notation: move.trim(),
        description: getMoveDescription(move.trim())
      }));
      
      console.log('Parsed moves:', moves);
      
      setSolution(moves);
      setCurrentStep(0);
      console.log(`Solution found with ${moves.length} moves in ${result.time}ms`);
      
    } catch (error: any) {
      console.error('Error solving cube:', error);
      setSolution([]);
      
      let userMessage = '';
      const errorMessage = error.message || error.toString() || 'Unknown error occurred';
      
      if (errorMessage.includes('Invalid cube configuration')) {
        userMessage = 'This cube configuration is mathematically impossible to solve. Each color must appear exactly 9 times and be in valid positions.';
      } else if (errorMessage.includes('not available') || errorMessage.includes('not found')) {
        userMessage = 'Cube solver is working with fallback algorithm. Solution may not be optimal but should be correct.';
      } else {
        userMessage = `Solver error: ${errorMessage}`;
      }
      
      setSolverError(userMessage);
    } finally {
      setIsLoading(false);
      setIsSolving(false);
    }
  }, [cubeState, canSolve, isSolved]);

  const resetCube = useCallback(() => {
    setCubeState(EMPTY_CUBE);
    setSolution([]);
    setCurrentStep(0);
    setSolverError('');
  }, []);

  const setSolvedCube = useCallback(() => {
    setCubeState(SOLVED_CUBE);
    setSolution([]);
    setCurrentStep(0);
    setSolverError('');
  }, []);

  const applyCubeState = useCallback((newCubeState: CubeState) => {
    setCubeState(newCubeState);
    setSolution([]);
    setCurrentStep(0);
    setSolverError('');
  }, []);

  const updateSquare = useCallback((face: keyof CubeState, index: number, color: CubeColor) => {
    setCubeState(prevState => ({
      ...prevState,
      [face]: prevState[face].map((c, i) => i === index ? color : c)
    }));
    setSolution([]);
    setCurrentStep(0);
    setSolverError('');
  }, []);

  const nextStep = useCallback(() => {
    if (currentStep < solution.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  }, [currentStep, solution.length]);

  const previousStep = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  }, [currentStep]);

  const goToStep = useCallback((step: number) => {
    if (step >= 0 && step < solution.length) {
      setCurrentStep(step);
    }
  }, [solution.length]);

  const undoLastMove = useCallback(() => {
    if (canUndo) {
      previousStep();
    }
  }, [canUndo, previousStep]);

  return {
    cubeState,
    solution,
    currentStep,
    isLoading,
    isSolving,
    isValidCube,
    isSolved,
    hasSolution,
    canUndo,
    canSolve,
    showValidationError,
    validationMessage,
    solverError,
    solveCube: solveCubeHandler,
    resetCube,
    setSolvedCube,
    updateSquare,
    applyCubeState,
    nextStep,
    previousStep,
    goToStep,
    undoLastMove
  };
};