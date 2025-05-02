import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

interface CakeProps {
  position?: [number, number, number];
  layers?: number;
  colors?: string[];
  candles?: number;
  onClick?: () => void;
}

const Cake: React.FC<CakeProps> = ({ 
  position = [0, 0, 0], 
  layers = 3,
  colors = ['#F4C2C2', '#F9D5E5', '#FFF0F5'],
  candles = 5,
  onClick
}) => {
  // Create a reference to the mesh
  const cakeRef = useRef<THREE.Group>(null);
  
  // Use useEffect for animation instead of useFrame
  useEffect(() => {
    let animationFrameId: number;
    let previousTime = 0;
    
    const animate = (time: number) => {
      if (cakeRef.current) {
        // Calculate delta time manually (similar to what useFrame provides)
        const deltaTime = (time - previousTime) * 0.001; // Convert to seconds
        previousTime = time;
        
        // Apply rotation
        cakeRef.current.rotation.y += deltaTime * 0.25; // Adjust speed as needed
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animationFrameId = requestAnimationFrame(animate);
    
    // Cleanup function
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Handle click on cake
  const handleClick = (event: any) => {
    event.stopPropagation();
    if (typeof onClick === 'function') {
      onClick();
    }
  };

  // Calculate layer heights and positions
  const layerHeight = 0.7;
  const layerSpacing = 0.05;
  const totalColors = colors.length;

  // Create the cake layers
  const renderLayers = () => {
    const cakeLayers = [];
    let currentHeight = 0;

    for (let i = 0; i < layers; i++) {
      // Calculate radius decreasing for each layer
      const baseRadius = 1.5 - (i * 0.2);
      const colorIndex = i % totalColors;
      
      cakeLayers.push(
        <mesh 
          key={`layer-${i}`} 
          position={[0, currentHeight + layerHeight/2, 0]} 
          castShadow 
          receiveShadow
          onClick={handleClick}
        >
          <cylinderGeometry args={[baseRadius, baseRadius, layerHeight, 32]} />
          <meshStandardMaterial color={colors[colorIndex]} />
        </mesh>
      );
      
      // Add frosting drips to all but top layer
      if (i < layers - 1) {
        for (let j = 0; j < 8; j++) {
          const angle = (j / 8) * Math.PI * 2;
          const x = Math.sin(angle) * baseRadius;
          const z = Math.cos(angle) * baseRadius;
          cakeLayers.push(
            <mesh 
              key={`drip-${i}-${j}`} 
              position={[x, currentHeight + layerHeight - 0.1 + Math.random() * 0.1, z]} 
              castShadow
            >
              <sphereGeometry args={[0.1, 16, 16]} />
              <meshStandardMaterial color="#FFFFFF" />
            </mesh>
          );
        }
      }
      
      currentHeight += layerHeight + layerSpacing;
    }
    
    return cakeLayers;
  };

  // Create the candles
  const renderCandles = () => {
    const candleElements = [];
    const topLayerHeight = (layerHeight + layerSpacing) * (layers - 1) + layerHeight;
    const topLayerRadius = 1.5 - ((layers - 1) * 0.2);
    
    for (let i = 0; i < candles; i++) {
      const angle = (i / candles) * Math.PI * 2;
      const distance = Math.random() * topLayerRadius * 0.7; // Distribute candles within 70% of the radius
      const x = Math.sin(angle) * distance;
      const z = Math.cos(angle) * distance;
      
      candleElements.push(
        <group key={`candle-${i}`} position={[x, topLayerHeight + 0.05, z]}>
          {/* Candle stick */}
          <mesh castShadow>
            <cylinderGeometry args={[0.03, 0.03, 0.3, 8]} />
            <meshStandardMaterial color="#FFFFCC" />
          </mesh>
          {/* Candle flame */}
          <mesh position={[0, 0.2, 0]} castShadow>
            <sphereGeometry args={[0.05, 8, 8]} />
            <meshStandardMaterial 
              color="#FFFF00" 
              emissive="#FFFF00"
              emissiveIntensity={2}
            />
          </mesh>
        </group>
      );
    }
    
    return candleElements;
  };
  
  // Add a cherry on top
  const renderTopDecoration = () => {
    const topLayerHeight = (layerHeight + layerSpacing) * (layers - 1) + layerHeight;
    return (
      <mesh 
        position={[0, topLayerHeight + 0.15, 0]} 
        castShadow
        onClick={handleClick}
      >
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color="#FF0000" />
      </mesh>
    );
  };

  return (
    <group position={position} ref={cakeRef}>
      {renderLayers()}
      {renderCandles()}
      {renderTopDecoration()}
    </group>
  );
};

export default Cake;
