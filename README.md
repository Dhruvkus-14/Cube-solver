# CubeSolver

A modern web app that solves any Rubik's Cube configuration with step-by-step instructions, 3D visuals, and a smooth user experience.

##  Live Demo

 [Try it on Vercel](https://cube-solver-6abl.vercel.app/)

---

## Features

### Interactive Cube Input

- 2D Net View for simple color input  
- 3D Cube with drag/touch rotation  
- Real-time validation for color correctness  

### Solver Engine

- Kociemba Algorithm for optimal solutions (usually under 25 moves)  
- Fast solving (~1 second)

### Smooth User Experience

- Animations for each move  
- Auto-play solution with pause/resume  
- Dark/Light theme toggle  

---

## Getting Started

### Requirements

- Node.js 18+

### Installation

```bash
git clone https://github.com/Dhruvkus-14/cube-solver.git
cd cube-solver
npm install
npm run dev

Then open http://localhost:5173 in your browser.
```
### Production Build

npm run build
npm run preview


###  How to Use
Switch to 2D View to enter colors
Select from the color palette
Ensure each color appears 9 times
Click "Solve" to get moves

Follow steps in the 3D viewer

🎨 Color Codes
W = White (Up)
Y = Yellow (Down)
R = Red (Front)
O = Orange (Back)
G = Green (Right)
B = Blue (Left)

🔤 Move Notation
R = Right Clockwise
R' = Right Counter-Clockwise
R2 = Right 180°
Other faces follow the same logic: U, D, F, B, L.

### Tech Stack
React 18
TypeScript
Tailwind CSS
Vite
WebGL for 3D cube rendering

###  Project Structure
src/
├── components/       # UI elements (2D, 3D, controls)
├── hooks/            # Custom React hooks
├── utils/            # Solving logic, validation
├── types/            # Type definitions
└── App.tsx           # Main component


### Browser Support
Chrome
Firefox
Safari
Edge (latest versions)

### Credits
Herbert Kociemba for the solving algorithm

Speedcubing community for notation standards

Built with 💡 by Dhruvkus-14