'use client';

import React from 'react';
import dynamic from 'next/dynamic';

// Import the CakeScene component dynamically with no SSR
// This is necessary because Three.js relies on browser APIs
const CakeSceneComponent = dynamic(
  () => import('../components/CakeScene'),
  { ssr: false }
);

const Home: React.FC = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      {/* 3D Cake Scene */}
      <div className="w-full h-screen relative">
        <CakeSceneComponent />
        
        {/* Title and description overlaid at the top */}
        <div className="absolute top-4 left-4 bg-white/70 dark:bg-black/70 p-4 rounded-lg text-left max-w-md">
          <h1 className="text-3xl font-bold mb-2">Interactive 3D Cake</h1>
          <p className="mb-2">
            Created with Next.js and Three.js. Use the controls to customize your cake, and take a screenshot to save it!
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Drag to rotate • Scroll to zoom • Use the panel on the right to customize
          </p>
        </div>
      </div>
    </main>
  );
};

export default Home;

