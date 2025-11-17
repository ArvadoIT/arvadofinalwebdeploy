"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Icosahedron, MeshDistortMaterial, Environment } from "@react-three/drei";
import { Suspense, useRef } from "react";
import { useScroll, useTransform } from "framer-motion";
import { useMemo } from "react";
import { useMotionSettings } from "./MotionProvider";

function GlowBall() {
  const ref = useRef<any>(null);
  const meshRef = useRef<any>(null);
  
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const time = clock.getElapsedTime();
    ref.current.distort = 0.18 + Math.sin(time * 0.6) * 0.04;
    
    if (meshRef.current) {
      meshRef.current.rotation.x = time * 0.2;
      meshRef.current.rotation.y = time * 0.3;
    }
  });
  
  return (
    <Icosahedron ref={meshRef} args={[1.3, 20]}>
      {/* @ts-ignore */}
      <MeshDistortMaterial
        ref={ref}
        speed={1.2}
        roughness={0.2}
        metalness={0.4}
        emissive={"#0ea5e9"}
        emissiveIntensity={0.8}
        color={"#1e293b"}
        transparent
        opacity={0.8}
      />
    </Icosahedron>
  );
}

export default function HeroR3FAmbient() {
  const { reduceMotion } = useMotionSettings();
  const { scrollYProgress } = useScroll();
  // subtle scroll-linked intensity and z-shift for parallax feel
  const intensity = useTransform(scrollYProgress, [0, 0.2], [0.9, 0.6]);
  const zShift = useTransform(scrollYProgress, [0, 0.2], [3.5, 3.8]);
  const camera = useMemo(() => ({ position: [0, 0, 3.5] as [number, number, number], fov: 50 }), []);

  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={camera}
        dpr={[1, 1.5]}
        gl={{ antialias: true, powerPreference: "high-performance" }}
        frameloop={reduceMotion ? "demand" : "always"}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={reduceMotion ? 0.2 : 0.3} />
          {/* Multiple point lights for more dynamic lighting */}
          <pointLight position={[3, 4, 2]} intensity={reduceMotion ? 0.9 : 1.2} color={"#60a5fa"} />
          <pointLight position={[-3, -2, 3]} intensity={reduceMotion ? 0.5 : 0.7} color={"#a78bfa"} />
          <pointLight position={[0, 5, 1]} intensity={reduceMotion ? 0.4 : 0.6} color={"#34d399"} />
          <group /* @ts-ignore */ position-z={zShift as unknown as number}>
            <GlowBall />
          </group>
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  );
}

