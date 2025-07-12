import { CubeState, CubeColor } from '../types/cube';

/**
 * Converts our cube state format to Kociemba format for the rubiks-cube-solver library
 * The library expects a string of 54 characters representing the cube state
 * Order: U R F D L B (Up, Right, Front, Down, Left, Back)
 * Each face is read left-to-right, top-to-bottom (like reading text)
 */
export const convertToKociembaFormat = (cubeState: CubeState): string => {
  // Map our colors to standard cube notation
  // The rubiks-cube-solver library uses URFDLB notation where:
  // U = Up (White), R = Right (Green), F = Front (Red)
  // D = Down (Yellow), L = Left (Blue), B = Back (Orange)
  const colorMap: Record<CubeColor, string> = {
    'W': 'U', // White -> Up
    'G': 'R', // Green -> Right  
    'R': 'F', // Red -> Front
    'Y': 'D', // Yellow -> Down
    'B': 'L', // Blue -> Left
    'O': 'B', // Orange -> Back
    'EMPTY': 'U', // Default empty to Up (will be invalid anyway)
  };

  // Convert each face to the standard format
  const convertFace = (face: CubeColor[]): string => {
    return face.map(color => colorMap[color]).join('');
  };

  // Kociemba format expects: U R F D L B order
  const result = (
    convertFace(cubeState.U) + // Up face (0-8)
    convertFace(cubeState.R) + // Right face (9-17)
    convertFace(cubeState.F) + // Front face (18-26)
    convertFace(cubeState.D) + // Down face (27-35)
    convertFace(cubeState.L) + // Left face (36-44)
    convertFace(cubeState.B)   // Back face (45-53)
  );

  console.log('Converted cube state to Kociemba format:', result);
  return result;
};

/**
 * Check if cube is completely empty (all squares are EMPTY)
 */
export const isCubeEmpty = (cubeState: CubeState): boolean => {
  return Object.values(cubeState).every(face => 
    face.every((color: CubeColor) => color === 'EMPTY')
  );
};

/**
 * Check if cube has any filled squares
 */
export const hasCubeStarted = (cubeState: CubeState): boolean => {
  return Object.values(cubeState).some(face => 
    face.some((color: CubeColor) => color !== 'EMPTY')
  );
};

/**
 * Check if the cube is in the standard solved state
 */
export const isCubeSolved = (cubeState: CubeState): boolean => {
  // Check if each face has all squares of the same color
  const faces = Object.values(cubeState);
  
  for (const face of faces) {
    // Skip if face has empty squares
    if (face.some((color: CubeColor) => color === 'EMPTY')) {
      return false;
    }
    
    // Check if all squares on this face are the same color
    const firstColor = face[0];
    if (!face.every((color: CubeColor) => color === firstColor)) {
      return false;
    }
  }
  
  // All faces have uniform colors, but we need to check if it's a valid solved state
  // In a valid solved cube, each color should appear exactly 9 times
  const colorCounts: Record<CubeColor, number> = { W: 0, Y: 0, R: 0, O: 0, G: 0, B: 0, EMPTY: 0 };
  
  Object.values(cubeState).forEach(face => {
    face.forEach((color: CubeColor) => {
      if (color !== 'EMPTY') {
        colorCounts[color]++;
      }
    });
  });

  const validColors: CubeColor[] = ['W', 'Y', 'R', 'O', 'G', 'B'];
  return validColors.every(color => colorCounts[color] === 9);
};

/**
 * Validates if the cube state is solvable according to Rubik's cube rules
 */
export const validateCubeState = (cubeState: CubeState): boolean => {
  // If cube is completely empty, consider it not ready to solve
  if (isCubeEmpty(cubeState)) {
    return false;
  }

  // Check if there are any empty squares
  const hasEmptySquares = Object.values(cubeState).some(face => 
    face.some((color: CubeColor) => color === 'EMPTY')
  );
  
  if (hasEmptySquares) {
    return false;
  }

  // Check if each color appears exactly 9 times
  const colorCounts: Record<CubeColor, number> = { W: 0, Y: 0, R: 0, O: 0, G: 0, B: 0, EMPTY: 0 };
  
  Object.values(cubeState).forEach(face => {
    face.forEach((color: CubeColor) => {
      if (color !== 'EMPTY') {
        colorCounts[color]++;
      }
    });
  });

  // Each color (except EMPTY) must appear exactly 9 times
  const validColors: CubeColor[] = ['W', 'Y', 'R', 'O', 'G', 'B'];
  const isValidCount = validColors.every(color => colorCounts[color] === 9);
  
  if (!isValidCount) {
    console.log('Invalid color counts:', colorCounts);
    return false;
  }

  // Additional validation: check if centers are in correct positions
  // In a standard cube, opposite faces must have different colors
  const centers = {
    U: cubeState.U[4], // Up center (index 4 is center of 3x3 grid)
    D: cubeState.D[4], // Down center
    F: cubeState.F[4], // Front center
    B: cubeState.B[4], // Back center
    R: cubeState.R[4], // Right center
    L: cubeState.L[4], // Left center
  };

  console.log('Cube centers:', centers);

  // Check if opposite faces have different colors (they should be opposite)
  const oppositePairs: [keyof typeof centers, keyof typeof centers][] = [
    ['U', 'D'], // Up opposite Down
    ['F', 'B'], // Front opposite Back
    ['R', 'L'], // Right opposite Left
  ];

  for (const [face1, face2] of oppositePairs) {
    if (centers[face1] === centers[face2]) {
      console.log(`Invalid: ${face1} and ${face2} have same center color`);
      return false;
    }
  }

  // Basic validation passed
  console.log('Cube state validation passed');
  return true;
};

/**
 * Get detailed validation status for UI display
 */
export const getCubeValidationStatus = (cubeState: CubeState) => {
  const isEmpty = isCubeEmpty(cubeState);
  const hasStarted = hasCubeStarted(cubeState);
  const isSolved = isCubeSolved(cubeState);

  if (isEmpty) {
    return {
      isValid: false,
      canSolve: false,
      showError: false,
      message: 'Start filling squares with colors'
    };
  }

  if (!hasStarted) {
    return {
      isValid: false,
      canSolve: false,
      showError: false,
      message: 'Start filling squares with colors'
    };
  }

  // Check if cube is already solved
  if (isSolved) {
    return {
      isValid: true,
      canSolve: false, // Don't allow solving if already solved
      showError: false,
      message: 'Cube is already solved!'
    };
  }

  // Check for empty squares
  const hasEmptySquares = Object.values(cubeState).some(face => 
    face.some((color: CubeColor) => color === 'EMPTY')
  );

  if (hasEmptySquares) {
    return {
      isValid: false,
      canSolve: false,
      showError: true,
      message: 'Fill all squares with colors (9 of each)'
    };
  }

  // Check color counts
  const colorCounts: Record<CubeColor, number> = { W: 0, Y: 0, R: 0, O: 0, G: 0, B: 0, EMPTY: 0 };
  
  Object.values(cubeState).forEach(face => {
    face.forEach((color: CubeColor) => {
      if (color !== 'EMPTY') {
        colorCounts[color]++;
      }
    });
  });

  const validColors: CubeColor[] = ['W', 'Y', 'R', 'O', 'G', 'B'];
  const invalidCounts = validColors.filter(color => colorCounts[color] !== 9);
  
  if (invalidCounts.length > 0) {
    const countDetails = invalidCounts.map(color => `${color}:${colorCounts[color]}`).join(', ');
    return {
      isValid: false,
      canSolve: false,
      showError: true,
      message: `Each color must appear exactly 9 times (${countDetails})`
    };
  }

  // Full validation
  const isFullyValid = validateCubeState(cubeState);
  
  if (isFullyValid) {
    return {
      isValid: true,
      canSolve: true,
      showError: false,
      message: 'Valid cube configuration'
    };
  }

  return {
    isValid: false,
    canSolve: false,
    showError: true,
    message: 'Invalid cube configuration - check center positions'
  };
};

/**
 * Converts move notation to human-readable descriptions
 */
export const getMoveDescription = (move: string): string => {
  const descriptions: Record<string, string> = {
    // Face rotations
    'U': 'Turn the top face clockwise 90°',
    "U'": 'Turn the top face counter-clockwise 90°',
    'U2': 'Turn the top face 180°',
    'D': 'Turn the bottom face clockwise 90°',
    "D'": 'Turn the bottom face counter-clockwise 90°',
    'D2': 'Turn the bottom face 180°',
    'R': 'Turn the right face clockwise 90°',
    "R'": 'Turn the right face counter-clockwise 90°',
    'R2': 'Turn the right face 180°',
    'L': 'Turn the left face clockwise 90°',
    "L'": 'Turn the left face counter-clockwise 90°',
    'L2': 'Turn the left face 180°',
    'F': 'Turn the front face clockwise 90°',
    "F'": 'Turn the front face counter-clockwise 90°',
    'F2': 'Turn the front face 180°',
    'B': 'Turn the back face clockwise 90°',
    "B'": 'Turn the back face counter-clockwise 90°',
    'B2': 'Turn the back face 180°',
    
    // Wide moves
    'Uw': 'Turn the top two layers clockwise 90°',
    "Uw'": 'Turn the top two layers counter-clockwise 90°',
    'Uw2': 'Turn the top two layers 180°',
    'Dw': 'Turn the bottom two layers clockwise 90°',
    "Dw'": 'Turn the bottom two layers counter-clockwise 90°',
    'Dw2': 'Turn the bottom two layers 180°',
    'Rw': 'Turn the right two layers clockwise 90°',
    "Rw'": 'Turn the right two layers counter-clockwise 90°',
    'Rw2': 'Turn the right two layers 180°',
    'Lw': 'Turn the left two layers clockwise 90°',
    "Lw'": 'Turn the left two layers counter-clockwise 90°',
    'Lw2': 'Turn the left two layers 180°',
    'Fw': 'Turn the front two layers clockwise 90°',
    "Fw'": 'Turn the front two layers counter-clockwise 90°',
    'Fw2': 'Turn the front two layers 180°',
    'Bw': 'Turn the back two layers clockwise 90°',
    "Bw'": 'Turn the back two layers counter-clockwise 90°',
    'Bw2': 'Turn the back two layers 180°',
    
    // Middle layer moves
    'M': 'Turn the middle layer (between L and R) like L',
    "M'": 'Turn the middle layer (between L and R) like L\'',
    'M2': 'Turn the middle layer (between L and R) 180°',
    'E': 'Turn the equatorial layer (between U and D) like D',
    "E'": 'Turn the equatorial layer (between U and D) like D\'',
    'E2': 'Turn the equatorial layer (between U and D) 180°',
    'S': 'Turn the standing layer (between F and B) like F',
    "S'": 'Turn the standing layer (between F and B) like F\'',
    'S2': 'Turn the standing layer (between F and B) 180°',
    
    // Cube rotations
    'x': 'Rotate the entire cube like R',
    "x'": 'Rotate the entire cube like R\'',
    'x2': 'Rotate the entire cube like R2',
    'y': 'Rotate the entire cube like U',
    "y'": 'Rotate the entire cube like U\'',
    'y2': 'Rotate the entire cube like U2',
    'z': 'Rotate the entire cube like F',
    "z'": 'Rotate the entire cube like F\'',
    'z2': 'Rotate the entire cube like F2',
  };

  return descriptions[move] || `Perform move: ${move}`;
};