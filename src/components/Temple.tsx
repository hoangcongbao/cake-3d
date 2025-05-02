import React, { useRef, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import type { Group } from 'three';

interface TempleProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
}

const Temple: React.FC<TempleProps> = ({ 
  position = [0, 0, 0], 
  rotation = [0, 0, 0],
  scale = 1
}) => {
  const modelRef = useRef<Group>(null);
  // Update this URL to where you've hosted the GLB file
  const { scene } = useGLTF('https://example.com/path/to/Temple_Asset_Pack.glb');
  
  // Use useEffect for animation
  useEffect(() => {
    let animationFrameId: number;
    let previousTime = 0;
    
    const animate = (time: number) => {
      if (modelRef.current) {
        // Calculate delta time manually
        const deltaTime = (time - previousTime) * 0.001; // Convert to seconds
        previousTime = time;
        
        // Apply rotation
        modelRef.current.rotation.y += deltaTime * 0.5; // Adjust speed as needed
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animationFrameId = requestAnimationFrame(animate);
    
    // Cleanup function
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <group 
      ref={modelRef} 
      position={position}
      rotation={rotation}
      scale={[scale, scale, scale]}
    >
      <primitive object={scene} />
    </group>
  );
};

// Pre-load the model
useGLTF.preload('https://example.com/path/to/Temple_Asset_Pack.glb');

export default Temple;
