import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stage, useGLTF, Environment } from '@react-three/drei';
import { Car } from '../types';

// A simple box component as a placeholder if no GLB is provided
const PlaceholderCar = (props: any) => {
  const meshRef = useRef<any>(null);
  useFrame((state, delta) => (meshRef.current.rotation.y += delta * 0.5));
  
  return (
    <mesh ref={meshRef} {...props}>
      <boxGeometry args={[2, 1, 4]} />
      <meshStandardMaterial color={props.color || "hotpink"} roughness={0.3} metalness={0.8} />
    </mesh>
  );
};

// Component to load user's car if URL exists
const UserCarModel = ({ url, color }: { url: string, color: string }) => {
  // In a real app, useGLTF(url) would be used.
  // For this demo without a real backend, we gracefully fallback.
  try {
     // const { scene } = useGLTF(url);
     // return <primitive object={scene} />;
     return <PlaceholderCar color={color} />;
  } catch (e) {
    return <PlaceholderCar color={color} />;
  }
};

interface ShowroomProps {
  car: Car | null;
  onClose: () => void;
}

export const Showroom3D: React.FC<ShowroomProps> = ({ car, onClose }) => {
  if (!car) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-10 bg-gradient-to-b from-black/80 to-transparent">
        <div>
          <h2 className="text-xl font-bold text-white">{car.make} {car.model}</h2>
          <p className="text-sm text-gray-300">{car.year} • {car.trim}</p>
        </div>
        <button 
          onClick={onClose}
          className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-sm font-semibold hover:bg-white/20"
        >
          Close
        </button>
      </div>

      {/* 3D Canvas */}
      <div className="flex-1 w-full h-full">
        <Canvas shadows camera={{ position: [0, 2, 8], fov: 50 }}>
          <Suspense fallback={null}>
            <Stage environment="city" intensity={0.5} contactShadow={{ opacity: 0.7, blur: 2 }}>
              {car.modelUrl ? (
                <UserCarModel url={car.modelUrl} color={car.color} />
              ) : (
                <PlaceholderCar color={car.color} />
              )}
            </Stage>
            {/* Ambient auto-rotation for showroom feel */}
            <OrbitControls autoRotate autoRotateSpeed={0.5} makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 2} />
          </Suspense>
          
          {/* Lighting */}
          <Environment preset="night" />
        </Canvas>
      </div>

      {/* Footer Controls */}
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent">
        <div className="flex gap-4 overflow-x-auto pb-4">
           {['#ef4444', '#3b82f6', '#22c55e', '#eab308', '#ffffff', '#000000'].map(c => (
             <div key={c} className="w-8 h-8 rounded-full border-2 border-white/20 cursor-pointer" style={{ backgroundColor: c }} />
           ))}
        </div>
        <p className="text-xs text-gray-400 text-center">Drag to rotate • Pinch to zoom</p>
      </div>
    </div>
  );
};