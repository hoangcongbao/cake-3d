// Type declarations for Three.js related types

// Extend the JSX namespace to support Three.js elements
declare namespace JSX {
  interface IntrinsicElements {
    orbitControls: any;
    mesh: any;
    group: any;
    spotLight: any;
    directionalLight: any;
    ambientLight: any;
    primitive: any;
  }
}

// Extend the React Three Fiber declarations
declare module '@react-three/fiber' {
  interface ThreeElements {
    orbitControls: any;
    mesh: any;
    group: any;
    spotLight: any;
    directionalLight: any;
    ambientLight: any;
    primitive: any;
  }
}
