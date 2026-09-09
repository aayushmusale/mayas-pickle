"use client";
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Environment, Center } from '@react-three/drei'; // 1. Import Center
import { useRef } from 'react';
import * as THREE from 'three';

function RotatingJar() {
  const { scene } = useGLTF('/mesh.glb'); 
  const jarRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (jarRef.current) {
      jarRef.current.rotation.y += 0.005;
    }
  });

  return (
    // 2. Wrap in <Center> so the jar is always perfectly in the middle
    <Center>
      <primitive 
        object={scene} 
        ref={jarRef} 
        // 3. Adjusted scale to 0.08 - if it's still too big, make this smaller (e.g., 0.05)
        scale={0.03} 
        position={[0, 0, 0]} 
      />
    </Center>
  );
}

export default function JarViewer() {
  return (
    <div className="w-full h-full min-h-[400px]">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }} gl={{ alpha: true }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 10, 7.5]} intensity={1} />
        <RotatingJar />
        <Environment preset="city" /> 
      </Canvas>
    </div>
  );
}