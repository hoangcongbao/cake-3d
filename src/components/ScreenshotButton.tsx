'use client';

import React from 'react';

const ScreenshotButton = () => {
  const captureScreenshot = () => {
    // Get the canvas element
    const canvas = document.querySelector('canvas');
    if (!canvas) return;
    
    // Create a temporary link element
    const link = document.createElement('a');
    link.setAttribute('download', 'cake-3d-screenshot.png');
    
    // Convert canvas to data URL and set as href
    link.setAttribute('href', canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream'));
    
    // Trigger download
    link.click();
  };

  return (
    <button
      onClick={captureScreenshot}
      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full flex items-center space-x-2 shadow-lg transition-colors"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
      </svg>
      <span>Take Screenshot</span>
    </button>
  );
};

export default ScreenshotButton;
