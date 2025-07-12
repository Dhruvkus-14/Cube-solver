import React, { useState, useRef, useEffect } from 'react';
import { RotateCw, RotateCcw, RefreshCw } from 'lucide-react';
import { CubeState, CubeColor, COLOR_MAP } from '../types/cube';

interface Cube3DViewProps {
  cubeState: CubeState;
  className?: string;
  animatingMove?: string;
}

export const Cube3DView: React.FC<Cube3DViewProps> = ({ 
  cubeState, 
  className = '',
  animatingMove 
}) => {
  const [rotationX, setRotationX] = useState(-15);
  const [rotationY, setRotationY] = useState(25);
  const [isDragging, setIsDragging] = useState(false);
  const [lastTouch, setLastTouch] = useState({ x: 0, y: 0 });
  const cubeRef = useRef<HTMLDivElement>(null);

  // Touch gesture handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      setLastTouch({
        x: e.touches[0].clientX,
        y: e.touches[0].clientY
      });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || e.touches.length !== 1) return;
    
    e.preventDefault();
    const touch = e.touches[0];
    const deltaX = touch.clientX - lastTouch.x;
    const deltaY = touch.clientY - lastTouch.y;
    
    setRotationY(prev => prev + deltaX * 0.5);
    setRotationX(prev => Math.max(-90, Math.min(90, prev - deltaY * 0.5)));
    
    setLastTouch({
      x: touch.clientX,
      y: touch.clientY
    });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Mouse drag handlers for desktop
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setLastTouch({
      x: e.clientX,
      y: e.clientY
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    const deltaX = e.clientX - lastTouch.x;
    const deltaY = e.clientY - lastTouch.y;
    
    setRotationY(prev => prev + deltaX * 0.5);
    setRotationX(prev => Math.max(-90, Math.min(90, prev - deltaY * 0.5)));
    
    setLastTouch({
      x: e.clientX,
      y: e.clientY
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Add global mouse event listeners
  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      
      const deltaX = e.clientX - lastTouch.x;
      const deltaY = e.clientY - lastTouch.y;
      
      setRotationY(prev => prev + deltaX * 0.5);
      setRotationX(prev => Math.max(-90, Math.min(90, prev - deltaY * 0.5)));
      
      setLastTouch({
        x: e.clientX,
        y: e.clientY
      });
    };

    const handleGlobalMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleGlobalMouseMove);
      document.addEventListener('mouseup', handleGlobalMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [isDragging, lastTouch]);

  const renderFaceSquare = (color: CubeColor, index: number, faceKey: string) => {
    const colorInfo = COLOR_MAP[color];
    return (
      <div
        key={`${faceKey}-${index}`}
        className={`
          aspect-square border-2 ${colorInfo.bg} ${colorInfo.border}
          shadow-sm rounded-sm transition-all duration-300
          ${animatingMove ? 'animate-pulse' : ''}
        `}
      />
    );
  };

  const renderFace = (face: CubeColor[], faceKey: string, className: string) => (
    <div className={`grid grid-cols-3 gap-1 ${className}`}>
      {face.map((color, index) => renderFaceSquare(color, index, faceKey))}
    </div>
  );

  const rotateLeft = () => setRotationY(prev => prev - 45);
  const rotateRight = () => setRotationY(prev => prev + 45);
  const rotateUp = () => setRotationX(prev => Math.max(prev - 30, -90));
  const rotateDown = () => setRotationX(prev => Math.min(prev + 30, 90));
  const resetRotation = () => {
    setRotationX(-15);
    setRotationY(25);
  };

  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
          3D Perspective View
        </h3>
        <div className="flex items-center gap-2">
          {animatingMove && (
            <div className="flex items-center gap-2 px-3 py-1 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-blue-700 dark:text-blue-300 font-medium">
                Animating: {animatingMove}
              </span>
            </div>
          )}
          <button
            onClick={resetRotation}
            className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            title="Reset rotation"
          >
            <RefreshCw className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      <div className="flex justify-center mb-8">
        <div 
          ref={cubeRef}
          className="relative select-none cursor-grab active:cursor-grabbing"
          style={{ perspective: '1200px' }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        >
          {/* 3D Cube Container - Much Larger */}
          <div 
            className={`
              relative transition-transform duration-500 ease-out
              ${animatingMove ? 'animate-spin' : ''}
            `}
            style={{ 
              transformStyle: 'preserve-3d',
              transform: `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`,
              width: '320px',
              height: '320px'
            }}
          >
            {/* Top Face (Up) */}
            <div 
              className="absolute inset-0 p-2"
              style={{
                transform: 'rotateX(90deg) translateZ(160px)',
                transformOrigin: 'center center'
              }}
            >
              {renderFace(cubeState.U, 'U', 'w-full h-full bg-gray-50 dark:bg-gray-700 p-2 rounded-lg border-2 border-gray-300 dark:border-gray-600')}
            </div>

            {/* Front Face */}
            <div 
              className="absolute inset-0 p-2"
              style={{
                transform: 'translateZ(160px)',
                transformOrigin: 'center center'
              }}
            >
              {renderFace(cubeState.F, 'F', 'w-full h-full bg-gray-50 dark:bg-gray-700 p-2 rounded-lg border-2 border-gray-300 dark:border-gray-600')}
            </div>

            {/* Right Face */}
            <div 
              className="absolute inset-0 p-2"
              style={{
                transform: 'rotateY(90deg) translateZ(160px)',
                transformOrigin: 'center center'
              }}
            >
              {renderFace(cubeState.R, 'R', 'w-full h-full bg-gray-50 dark:bg-gray-700 p-2 rounded-lg border-2 border-gray-300 dark:border-gray-600')}
            </div>

            {/* Back Face */}
            <div 
              className="absolute inset-0 p-2"
              style={{
                transform: 'rotateY(180deg) translateZ(160px)',
                transformOrigin: 'center center'
              }}
            >
              {renderFace(cubeState.B, 'B', 'w-full h-full bg-gray-50 dark:bg-gray-700 p-2 rounded-lg border-2 border-gray-300 dark:border-gray-600')}
            </div>

            {/* Left Face */}
            <div 
              className="absolute inset-0 p-2"
              style={{
                transform: 'rotateY(-90deg) translateZ(160px)',
                transformOrigin: 'center center'
              }}
            >
              {renderFace(cubeState.L, 'L', 'w-full h-full bg-gray-50 dark:bg-gray-700 p-2 rounded-lg border-2 border-gray-300 dark:border-gray-600')}
            </div>

            {/* Bottom Face */}
            <div 
              className="absolute inset-0 p-2"
              style={{
                transform: 'rotateX(-90deg) translateZ(160px)',
                transformOrigin: 'center center'
              }}
            >
              {renderFace(cubeState.D, 'D', 'w-full h-full bg-gray-50 dark:bg-gray-700 p-2 rounded-lg border-2 border-gray-300 dark:border-gray-600')}
            </div>
          </div>
        </div>
      </div>

      {/* Rotation Controls - Larger and More Spaced */}
      <div className="space-y-4">
        <div className="text-center text-sm text-gray-600 dark:text-gray-400 mb-2">
          {isDragging ? 'Dragging...' : 'Drag to rotate • Use controls below'}
        </div>
        <div className="flex justify-center gap-3">
          <button
            onClick={rotateUp}
            className="p-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-lg font-bold"
            title="Rotate up"
          >
            ↑
          </button>
        </div>
        <div className="flex justify-center gap-3">
          <button
            onClick={rotateLeft}
            className="p-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            title="Rotate left"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
          <button
            onClick={rotateRight}
            className="p-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            title="Rotate right"
          >
            <RotateCw className="w-5 h-5" />
          </button>
        </div>
        <div className="flex justify-center gap-3">
          <button
            onClick={rotateDown}
            className="p-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-lg font-bold"
            title="Rotate down"
          >
            ↓
          </button>
        </div>
      </div>
    </div>
  );
};