'use client';

import React, { useState } from 'react';

interface ControlPanelProps {
  onLayersChange: (layers: number) => void;
  onColorChange: (colors: string[]) => void;
  onAddCandles: (candles: number) => void;
  onToggleTemple?: () => void;
  showTemple?: boolean;
}

const ControlPanel: React.FC<ControlPanelProps> = ({ 
  onLayersChange, 
  onColorChange,
  onAddCandles,
  onToggleTemple,
  showTemple = true
}) => {
  const [layers, setLayers] = useState(3);
  const [colors, setColors] = useState(['#F4C2C2', '#F9D5E5', '#FFF0F5']);
  const [candles, setCandles] = useState(5);

  // Predefined color schemes
  const colorSchemes = {
    pink: ['#F4C2C2', '#F9D5E5', '#FFF0F5'],
    blue: ['#ADD8E6', '#87CEEB', '#B0E0E6'],
    chocolate: ['#8B4513', '#A0522D', '#CD853F'],
    rainbow: ['#FF9AA2', '#FFB7B2', '#FFDAC1', '#E2F0CB', '#B5EAD7', '#C7CEEA']
  };

  const handleLayersChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newLayers = parseInt(e.target.value);
    setLayers(newLayers);
    onLayersChange(newLayers);
  };

  const handleColorSchemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const scheme = e.target.value as keyof typeof colorSchemes;
    const newColors = colorSchemes[scheme];
    setColors(newColors); // This line uses the colors state
    onColorChange(newColors);
  };

  const handleCandlesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCandles = parseInt(e.target.value);
    setCandles(newCandles);
    onAddCandles(newCandles);
  };

  return (
    <div className="bg-white/80 dark:bg-gray-800/80 p-4 rounded-lg shadow-lg w-64">
      <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Customize Your Cake</h2>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Number of Layers: {layers}
        </label>
        <input
          type="range"
          min="1"
          max="5"
          value={layers}
          onChange={handleLayersChange}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Color Scheme
        </label>
        <select
          onChange={handleColorSchemeChange}
          className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:text-white"
        >
          <option value="pink">Pink</option>
          <option value="blue">Blue</option>
          <option value="chocolate">Chocolate</option>
          <option value="rainbow">Rainbow</option>
        </select>
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Number of Candles: {candles}
        </label>
        <input
          type="range"
          min="0"
          max="10"
          value={candles}
          onChange={handleCandlesChange}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
      </div>
      
      {onToggleTemple && (
        <div className="mb-4">
          <button
            onClick={onToggleTemple}
            className="w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors"
          >
            {showTemple ? 'Hide Temple' : 'Show Temple'}
          </button>
        </div>
      )}
    </div>
  );
};

export default ControlPanel;
