"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Icosahedron, MeshDistortMaterial, Environment } from "@react-three/drei";
import { Suspense, useRef } from "react";

function GlowBall() {
  const ref = useRef<any>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.distort = 0.2 + Math.sin(clock.getElapsedTime() * 0.6) * 0.05;
  });
  return (
    <Icosahedron args={[1.3, 20]}>
      {/* @ts-ignore */}
      <MeshDistortMaterial
        ref={ref}
        speed={1.5}
        roughness={0.2}
        metalness={0.4}
        emissive={"#0ea5e9"}
        emissiveIntensity={1.1}
        color={"#1e293b"}
        transparent
        opacity={0.9}
      />
    </Icosahedron>
  );
}

export default function HeroR3FAmbient() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 3.5], fov: 50 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.4} />
          <pointLight position={[3, 4, 2]} intensity={2} color={"#60a5fa"} />
          <GlowBall />
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  );
}

