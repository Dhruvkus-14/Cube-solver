export type CubeColor = 'W' | 'Y' | 'R' | 'O' | 'G' | 'B' | 'EMPTY';

export type CubeFace = CubeColor[];

export interface CubeState {
  U: CubeFace; // Up (White)
  D: CubeFace; // Down (Yellow)
  F: CubeFace; // Front (Red)
  B: CubeFace; // Back (Orange)
  R: CubeFace; // Right (Green)
  L: CubeFace; // Left (Blue)
}

export interface Move {
  notation: string;
  description: string;
}

export type ViewType = '3d' | 'net';

export interface ViewOption {
  id: ViewType;
  name: string;
  description: string;
  allowsInput: boolean;
}

export const VIEW_OPTIONS: ViewOption[] = [
  {
    id: '3d',
    name: '3D Perspective View',
    description: 'Interactive 3D view with rotation controls',
    allowsInput: false
  },
  {
    id: 'net',
    name: '2D Net View',
    description: 'Unfolded 2D version for color input',
    allowsInput: true
  }
];

export const COLOR_MAP = {
  W: { name: 'White', bg: 'bg-white', border: 'border-gray-300', text: 'text-gray-900' },
  Y: { name: 'Yellow', bg: 'bg-yellow-400', border: 'border-yellow-500', text: 'text-gray-900' },
  R: { name: 'Red', bg: 'bg-red-500', border: 'border-red-600', text: 'text-white' },
  O: { name: 'Orange', bg: 'bg-orange-500', border: 'border-orange-600', text: 'text-white' },
  G: { name: 'Green', bg: 'bg-green-500', border: 'border-green-600', text: 'text-white' },
  B: { name: 'Blue', bg: 'bg-blue-500', border: 'border-blue-600', text: 'text-white' },
  EMPTY: { name: 'Empty', bg: 'bg-gray-300 dark:bg-gray-600', border: 'border-gray-400 dark:border-gray-500', text: 'text-gray-600' },
};

export const EMPTY_CUBE: CubeState = {
  U: Array(9).fill('EMPTY' as CubeColor),
  D: Array(9).fill('EMPTY' as CubeColor),
  F: Array(9).fill('EMPTY' as CubeColor),
  B: Array(9).fill('EMPTY' as CubeColor),
  R: Array(9).fill('EMPTY' as CubeColor),
  L: Array(9).fill('EMPTY' as CubeColor),
};

export const SOLVED_CUBE: CubeState = {
  U: ['W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W'],
  D: ['Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y'],
  F: ['R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R'],
  B: ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
  R: ['G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G'],
  L: ['B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B'],
};