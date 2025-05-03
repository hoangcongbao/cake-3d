import React, { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import Cake from './Cake';
import Temple from './Temple';
import Confetti from './Confetti';
import ClientOnly from './ClientOnly';
import ControlPanel from './ControlPanel';
import ScreenshotButton from './ScreenshotButton';
import DOMPopup from './DOMPopup'; // Import the DOM-based popup

const CakeScene = () => {
  const [layers, setLayers] = useState(3);
  const [colors, setColors] = useState(['#F4C2C2', '#F9D5E5', '#FFF0F5']);
  const [candles, setCandles] = useState(5);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showTemple, setShowTemple] = useState(true);
  const [showPopup, setShowPopup] = useState(false);

  const handleToggleConfetti = () => {
    setShowConfetti(!showConfetti);
  };

  const handleToggleTemple = () => {
    setShowTemple(!showTemple);
  };

  // Handler for cake click to show the popup
  const handleCakeClick = () => {
    setShowPopup(true);
  };
  
  // Handler for closing the popup
  const handleClosePopup = () => {
    setShowPopup(false);
  };
  
  // Handler for cake order
  const handleCakeOrder = (price: number, quantity: number) => {
    const total = price * quantity;
    window.alert(`Order placed successfully!\n\nQuantity: ${quantity}\nPrice: $${price.toFixed(2)}\nTotal: $${total.toFixed(2)}`);
    setShowPopup(false);
    // In a real application, you would send this to your backend/cart system
  };

  return (
    <div className="cake-scene" style={{ width: '100%', height: '100vh', position: 'relative' }}>
      <ClientOnly>
        <Canvas 
          shadows 
          camera={{ position: [0, 2, 5], fov: 50 }}
          style={{ background: 'linear-gradient(to bottom, #e6f0ff, #fff0f5)' }}
        >
          <Suspense fallback={null}>
            {/* Main lighting */}
            <ambientLight intensity={0.5} />
            <directionalLight 
              position={[10, 10, 5]} 
              intensity={1} 
              castShadow 
              shadow-mapSize-width={1024} 
              shadow-mapSize-height={1024}
            />
            <spotLight 
              position={[-10, 10, 5]} 
              angle={0.3} 
              penumbra={1} 
              intensity={1} 
              castShadow
            />
            
            {/* The cake model with customization options */}
            <Cake 
              position={[0, 0, 0]} 
              layers={layers}
              colors={colors}
              candles={candles}
              onClick={handleCakeClick}
            />
            
            {/* Temple Asset from public folder */}
            {showTemple && (
              <Temple
                position={[3, -1, 0]}
                scale={2}
              />
            )}
            
            {/* Optional confetti animation */}
            {showConfetti && <Confetti count={150} />}
            
            {/* Environment and shadows */}
            <ContactShadows 
              position={[0, -1, 0]} 
              opacity={0.5} 
              scale={10} 
              blur={1.5} 
              far={1} 
            />
            <Environment preset="sunset" />
            
            {/* Controls to rotate the view */}
            <OrbitControls 
              enablePan={false} 
              enableZoom={true} 
              minPolarAngle={Math.PI / 6} 
              maxPolarAngle={Math.PI / 2}
            />
          </Suspense>
        </Canvas>
      </ClientOnly>
      
      {/* Control panel for customizing the cake */}
      <div className="absolute top-6 right-6">
        <ControlPanel 
          onLayersChange={setLayers}
          onColorChange={setColors}
          onAddCandles={setCandles}
          onToggleTemple={handleToggleTemple}
          showTemple={showTemple}
        />
      </div>
      
      {/* Action buttons */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-4">
        <button
          onClick={handleToggleConfetti}
          className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-full flex items-center space-x-2 shadow-lg transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
          </svg>
          <span>{showConfetti ? 'Hide Confetti' : 'Show Confetti'}</span>
        </button>
        <ScreenshotButton />
      </div>

      {/* DOM-based popup - shown on top of the 3D scene */}
      {showPopup && (
        <DOMPopup
          onClose={handleClosePopup}
          onAccept={handleCakeOrder}
        />
      )}
    </div>
  );
};

export default CakeScene;
