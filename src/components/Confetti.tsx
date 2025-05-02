import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ConfettiProps {
  count?: number;
}

const Confetti: React.FC<ConfettiProps> = ({ count = 100 }) => {
  const confettiGroup = useRef<THREE.Group>(null);
  
  // Use ref array to track each confetti particle's properties
  const confettiRefs = useRef<THREE.Mesh[]>([]);
  const confettiData = useRef<{velocity: THREE.Vector3, rotation: THREE.Vector3}[]>([]);
  
  // Initialize confetti data if it doesn't exist
  if (confettiData.current.length === 0) {
    for (let i = 0; i < count; i++) {
      confettiData.current.push({
        velocity: new THREE.Vector3(
          Math.random() * 0.01 - 0.005,
          Math.random() * -0.02 - 0.01,
          Math.random() * 0.01 - 0.005
        ),
        rotation: new THREE.Vector3(
          Math.random() * 0.02 - 0.01,
          Math.random() * 0.02 - 0.01,
          Math.random() * 0.02 - 0.01
        )
      });
    }
  }
  
  // Animate confetti on each frame
  useFrame(() => {
    confettiRefs.current.forEach((confetti, i) => {
      if (!confetti) return;
      
      const data = confettiData.current[i];
      
      // Update position
      confetti.position.x += data.velocity.x;
      confetti.position.y += data.velocity.y;
      confetti.position.z += data.velocity.z;
      
      // Update rotation
      confetti.rotation.x += data.rotation.x;
      confetti.rotation.y += data.rotation.y;
      confetti.rotation.z += data.rotation.z;
      
      // Reset if it goes too low
      if (confetti.position.y < -5) {
        confetti.position.set(
          Math.random() * 10 - 5,
          10,
          Math.random() * 10 - 5
        );
      }
    });
  });
  
  // Create confetti pieces
  const confettiPieces = Array.from({ length: count }).map((_, i) => {
    // Random shape (either flat rectangle or thin box)
    const geometry = Math.random() > 0.5 
      ? new THREE.BoxGeometry(0.1, 0.1, 0.01) 
      : new THREE.BoxGeometry(0.05, 0.2, 0.01);
    
    // Random color
    const colors = [
      '#ff4136', // red
      '#ff851b', // orange
      '#ffdc00', // yellow
      '#2ecc40', // green
      '#0074d9', // blue
      '#b10dc9', // purple
      '#f012be', // pink
      '#ffffff'  // white
    ];
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    // Random position within a volume above the cake
    const x = Math.random() * 10 - 5;
    const y = Math.random() * 10 + 3;
    const z = Math.random() * 10 - 5;
    
    return (
      <mesh 
        key={i}
        ref={el => {
          if (el) confettiRefs.current[i] = el;
        }}
        position={[x, y, z]}
        rotation={[
          Math.random() * Math.PI * 2,
          Math.random() * Math.PI * 2,
          Math.random() * Math.PI * 2
        ]}
      >
        <primitive object={geometry} attach="geometry" />
        <meshStandardMaterial 
          color={color} 
          roughness={0.3}
          metalness={0.4}
        />
      </mesh>
    );
  });
  
  return <group ref={confettiGroup}>{confettiPieces}</group>;
};

export default Confetti;
