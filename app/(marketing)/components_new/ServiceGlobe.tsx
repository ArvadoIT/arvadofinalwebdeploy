"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Sphere, Text, PerspectiveCamera, OrbitControls } from "@react-three/drei";
import { Suspense, useRef, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMotionSettings } from "../components/MotionProvider";
import { Reveal } from "../lib/scroll-motion";
import { Sparkles, Cpu, LineChart, Workflow } from "lucide-react";
import * as THREE from "three";

// Service data matching ValueGrid structure
const services = [
  {
    id: 1,
    category: "Web & Product",
    title: "Premium Web Experiences",
    description:
      "Design systems, conversion copy, and elite polish—shipped in weeks, not quarters.",
    points: [
      "Next.js + Tailwind, built for speed",
      "Component libraries that actually scale",
      "Story-driven landing pages that convert",
    ],
    icon: Sparkles,
    bulletClass: "bg-cyan-400",
    color: "from-cyan-500 to-blue-500",
    position: [1.2, 0.8, 0.5] as [number, number, number], // Position on globe surface
  },
  {
    id: 2,
    category: "AI Systems",
    title: "AI Assistants & Automations",
    description:
      "Agents that book, qualify, and route—deeply integrated into the tools you already live in.",
    points: [
      "Voice & chat concierge for inbound",
      "CRM + calendar + ticketing integrations",
      "Automations that remove busywork, not humans",
    ],
    icon: Cpu,
    bulletClass: "bg-purple-400",
    color: "from-purple-500 to-pink-500",
    position: [-1.1, 0.6, 0.7] as [number, number, number],
  },
  {
    id: 3,
    category: "Acquisition",
    title: "Growth Campaigns",
    description:
      "Paid social, local SEO, and reputation flows engineered for pipeline, not vanity metrics.",
    points: [
      "Meta & Google Ads built around offers",
      "Localized SEO and content playbooks",
      "Review generation and monitoring",
    ],
    icon: LineChart,
    bulletClass: "bg-emerald-400",
    color: "from-emerald-500 to-teal-500",
    position: [0.5, -0.9, 1.0] as [number, number, number],
  },
  {
    id: 4,
    category: "Retention",
    title: "Lifecycle Systems",
    description:
      "Onboarding, loyalty, and referral systems that keep customers engaged long after the first sale.",
    points: [
      "Email & SMS journeys that feel human",
      "Insight reporting that isn't a spreadsheet dump",
      "Attribution you can actually explain",
    ],
    icon: Workflow,
    bulletClass: "bg-amber-400",
    color: "from-orange-500 to-amber-500",
    position: [-0.7, -0.8, -0.9] as [number, number, number],
  },
];

// Hotspot marker component with service-specific colors
function Hotspot({
  position,
  serviceId,
  onClick,
  isActive,
  serviceColor,
}: {
  position: [number, number, number];
  serviceId: number;
  onClick: () => void;
  isActive: boolean;
  serviceColor: string;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const ripple1Ref = useRef<THREE.Mesh>(null);
  const ripple2Ref = useRef<THREE.Mesh>(null);
  const ripple3Ref = useRef<THREE.Mesh>(null);
  const [isHovered, setIsHovered] = useState(false);
  const { reduceMotion } = useMotionSettings();

  // Get color based on service
  const getColor = () => {
    if (serviceColor.includes('cyan')) return { main: '#06b6d4', light: '#22d3ee', glow: '#67e8f9' };
    if (serviceColor.includes('purple')) return { main: '#a855f7', light: '#c084fc', glow: '#d8b4fe' };
    if (serviceColor.includes('emerald')) return { main: '#10b981', light: '#34d399', glow: '#6ee7b7' };
    return { main: '#f59e0b', light: '#fbbf24', glow: '#fcd34d' }; // amber
  };

  const colors = getColor();

  useFrame(({ clock }) => {
    if (reduceMotion) return;
    const time = clock.getElapsedTime();
    
    // Pulsing animation for sphere
    if (meshRef.current) {
      const baseScale = isHovered ? 1.2 : 1;
      const pulseScale = isActive ? 1 + Math.sin(time * 3) * 0.15 : 1 + Math.sin(time * 2) * 0.1;
      meshRef.current.scale.setScalar(baseScale * pulseScale);
    }
    
    // Rotating ring animation
    if (ringRef.current) {
      ringRef.current.rotation.z = time * 0.5;
    }

    // Ripple animations on hover
    if (isHovered) {
      const rippleSpeed = 2;
      const rippleDelay = 0.3;
      
      if (ripple1Ref.current) {
        const progress = (time % (rippleDelay * 3)) / rippleDelay;
        ripple1Ref.current.scale.setScalar(1 + progress * 2);
        const opacity = Math.max(0, 1 - progress);
        if (ripple1Ref.current.material) {
          (ripple1Ref.current.material as THREE.MeshBasicMaterial).opacity = opacity * 0.6;
        }
      }
      
      if (ripple2Ref.current) {
        const progress = ((time + rippleDelay) % (rippleDelay * 3)) / rippleDelay;
        ripple2Ref.current.scale.setScalar(1 + progress * 2);
        const opacity = Math.max(0, 1 - progress);
        if (ripple2Ref.current.material) {
          (ripple2Ref.current.material as THREE.MeshBasicMaterial).opacity = opacity * 0.4;
        }
      }
      
      if (ripple3Ref.current) {
        const progress = ((time + rippleDelay * 2) % (rippleDelay * 3)) / rippleDelay;
        ripple3Ref.current.scale.setScalar(1 + progress * 2);
        const opacity = Math.max(0, 1 - progress);
        if (ripple3Ref.current.material) {
          (ripple3Ref.current.material as THREE.MeshBasicMaterial).opacity = opacity * 0.3;
        }
      }
    } else {
      // Reset ripples when not hovered
      if (ripple1Ref.current) {
        ripple1Ref.current.scale.setScalar(1);
        if (ripple1Ref.current.material) {
          (ripple1Ref.current.material as THREE.MeshBasicMaterial).opacity = 0;
        }
      }
      if (ripple2Ref.current) {
        ripple2Ref.current.scale.setScalar(1);
        if (ripple2Ref.current.material) {
          (ripple2Ref.current.material as THREE.MeshBasicMaterial).opacity = 0;
        }
      }
      if (ripple3Ref.current) {
        ripple3Ref.current.scale.setScalar(1);
        if (ripple3Ref.current.material) {
          (ripple3Ref.current.material as THREE.MeshBasicMaterial).opacity = 0;
        }
      }
    }
  });

  return (
    <group position={position}>
      {/* Ripple effects on hover */}
      {isHovered && (
        <>
          <mesh ref={ripple1Ref}>
            <ringGeometry args={[0.15, 0.18, 32]} />
            <meshBasicMaterial
              color={colors.glow}
              transparent
              opacity={0}
              side={THREE.DoubleSide}
            />
          </mesh>
          <mesh ref={ripple2Ref}>
            <ringGeometry args={[0.15, 0.18, 32]} />
            <meshBasicMaterial
              color={colors.light}
              transparent
              opacity={0}
              side={THREE.DoubleSide}
            />
          </mesh>
          <mesh ref={ripple3Ref}>
            <ringGeometry args={[0.15, 0.18, 32]} />
            <meshBasicMaterial
              color={colors.main}
              transparent
              opacity={0}
              side={THREE.DoubleSide}
            />
          </mesh>
        </>
      )}

      {/* Outer rotating glow ring */}
      <mesh ref={ringRef}>
        <ringGeometry args={[0.12, 0.15, 32]} />
        <meshBasicMaterial
          color={colors.glow}
          transparent
          opacity={isActive || isHovered ? 0.9 : 0.5}
          side={THREE.DoubleSide}
        />
      </mesh>
      
      {/* Middle ring */}
      <mesh>
        <ringGeometry args={[0.10, 0.12, 32]} />
        <meshBasicMaterial
          color={colors.light}
          transparent
          opacity={isActive || isHovered ? 0.6 : 0.3}
          side={THREE.DoubleSide}
        />
      </mesh>
      
      {/* Inner sphere */}
      <mesh ref={meshRef} onClick={onClick} onPointerOver={(e) => {
        e.stopPropagation();
        setIsHovered(true);
        document.body.style.cursor = 'pointer';
      }} onPointerOut={() => {
        setIsHovered(false);
        document.body.style.cursor = 'default';
      }}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial
          color={colors.main}
          emissive={colors.main}
          emissiveIntensity={isActive || isHovered ? 2.5 : 1}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
      
      {/* Number label */}
      <Text
        position={[0, -0.25, 0]}
        fontSize={0.15}
        color={isActive || isHovered ? "#ffffff" : colors.light}
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.02}
        outlineColor="#000000"
      >
        {serviceId.toString().padStart(2, "0")}
      </Text>
    </group>
  );
}

// Globe component
function Globe({ selectedService, onServiceClick }: { selectedService: number | null; onServiceClick: (id: number) => void }) {
  const globeRef = useRef<THREE.Mesh>(null);
  const { reduceMotion } = useMotionSettings();

  return (
    <group>
      {/* Main globe sphere - reduced geometry for performance */}
      <mesh ref={globeRef}>
        <sphereGeometry args={[2, 48, 48]} />
        <meshStandardMaterial
          color="#1e293b"
          metalness={0.3}
          roughness={0.7}
          transparent
          opacity={0.3}
        />
      </mesh>
      
      {/* Wireframe overlay for futuristic look - reduced segments */}
      <mesh>
        <sphereGeometry args={[2.01, 24, 24]} />
        <meshBasicMaterial
          color="#0ea5e9"
          wireframe
          transparent
          opacity={0.15}
        />
      </mesh>

      {/* Service hotspots */}
      {services.map((service) => (
        <Hotspot
          key={service.id}
          position={service.position}
          serviceId={service.id}
          onClick={() => onServiceClick(service.id)}
          isActive={selectedService === service.id}
          serviceColor={service.color}
        />
      ))}
    </group>
  );
}

// 3D Scene component
function Scene3D({ selectedService, onServiceClick }: { selectedService: number | null; onServiceClick: (id: number) => void }) {
  const { reduceMotion } = useMotionSettings();

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={reduceMotion ? 0.4 : 0.5} />
      <pointLight position={[5, 5, 5]} intensity={1.2} color="#60a5fa" />
      <pointLight position={[-5, 3, -5]} intensity={0.7} color="#a78bfa" />
      <pointLight position={[0, -5, 0]} intensity={0.5} color="#34d399" />
      <directionalLight position={[0, 5, -5]} intensity={0.6} color="#ffffff" />

      {/* Globe */}
      <Globe selectedService={selectedService} onServiceClick={onServiceClick} />

      {/* OrbitControls for drag-to-rotate */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate={!reduceMotion}
        autoRotateSpeed={0.5}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={(2 * Math.PI) / 3}
        dampingFactor={0.05}
        enableDamping={true}
      />
    </>
  );
}

// Service detail panel component - matches ValueGrid service-card styling
function ServicePanel({ service, isVisible }: { service: typeof services[0] | null; isVisible: boolean }) {
  const [isHovered, setIsHovered] = useState(false);
  
  if (!service) return null;

  const IconComponent = service.icon;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.article
          initial={{ opacity: 0, x: 50, y: 20, scale: 0.9, rotateY: -15, filter: "blur(12px)" }}
          animate={{ opacity: 1, x: 0, y: 0, scale: 1, rotateY: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, x: 30, scale: 0.95, filter: "blur(10px)" }}
          transition={{ 
            duration: 0.7, 
            ease: [0.19, 1, 0.22, 1],
            type: "spring",
            stiffness: 100,
            damping: 15
          }}
          style={{ transformStyle: "preserve-3d" }}
          className="service-card service-card-hover group max-w-md w-full"
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
        >
          {/* Halo effect */}
          <div className="service-card-halo" />
          
          {/* Sweep animation */}
          <div className="service-card-sweep" />

          {/* Content wrapper */}
          <div className="service-card-inner px-7 py-6 md:px-8 md:py-7">
            {/* Top row: icon + meta */}
            <motion.div 
              className="mb-5 flex items-center justify-between gap-4"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.4 }}
            >
              <div className="inline-flex items-center gap-3">
                <motion.div 
                  className="service-card-corner flex h-8 w-8 items-center justify-center border border-white/15 bg-slate-900/80"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <IconComponent className="h-3.5 w-3.5 text-slate-100" />
                </motion.div>
                <div className="service-meta">
                  <span className="opacity-70 mr-3">
                    {service.id.toString().padStart(2, "0")}
                  </span>
                  <span>{service.category}</span>
                </div>
              </div>
            </motion.div>

            {/* Title */}
            <motion.h3 
              className="text-lg md:text-xl font-medium tracking-[0.16em] text-slate-50 mb-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              {service.title}
            </motion.h3>

            {/* Description */}
            <motion.p 
              className="text-sm md:text-[0.95rem] text-slate-300/85 leading-relaxed mb-5 max-w-md"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              {service.description}
            </motion.p>

            {/* Bullet points */}
            <motion.ul 
              className="space-y-2.5 text-sm md:text-[0.95rem] text-slate-200/90"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.4 }}
            >
              {service.points.map((point, idx) => (
                <motion.li 
                  key={idx} 
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + idx * 0.05, duration: 0.3 }}
                >
                  <span className={`mt-[0.55rem] h-px w-5 rounded-full ${service.bulletClass}`} />
                  <span>{point}</span>
                </motion.li>
              ))}
            </motion.ul>
          </div>

          {/* Animated gradient overlay on hover */}
          <motion.div
            className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 rounded-[1.75rem] pointer-events-none`}
            animate={{ opacity: isHovered ? 0.08 : 0 }}
            transition={{ duration: 0.3 }}
          />
        </motion.article>
      )}
    </AnimatePresence>
  );
}

export default function ServiceGlobe() {
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const { reduceMotion } = useMotionSettings();
  const selectedServiceData = useMemo(
    () => services.find((s) => s.id === selectedService) || null,
    [selectedService]
  );

  return (
    <section id="services" className="relative overflow-hidden py-24 md:py-32">
      {/* Enhanced background effects */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        {/* Animated gradient orbs */}
        <motion.div
          className="absolute -left-32 top-10 h-72 w-72 rounded-full bg-cyan-500/12 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-[-260px] right-[-120px] h-[520px] w-[520px] rounded-full bg-violet-500/35 blur-3xl"
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
        
        {/* Additional accent glow */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-sky-500/5 blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="h-full w-full [background-image:linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:80px_80px]" />
        </div>
        
        {/* Vignette overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,transparent,rgba(2,6,23,0.3))]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <Reveal className="text-center mb-16 md:mb-20">
          <span className="tag mb-4">What we deliver</span>
          <h2 className="section-heading">
            A single team for full-stack growth
          </h2>
          <p className="section-subtitle">
            One partner across web, AI, and performance so your momentum never stalls.
          </p>
        </Reveal>

        {/* Main content: Globe + Panel */}
        <div className="relative flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 min-h-[600px]">
          {/* Connection line effect when service is selected */}
          {selectedServiceData && (
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              exit={{ opacity: 0, scaleX: 0 }}
              transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
              className="hidden lg:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-px pointer-events-none z-0"
            >
              <div className="relative w-full h-full">
                <div 
                  className="absolute left-[calc(50%-1px)] top-0 w-px h-full bg-gradient-to-b from-transparent via-white/20 to-transparent"
                  style={{
                    background: `linear-gradient(to bottom, transparent, ${selectedServiceData.color.includes('cyan') ? 'rgba(6, 182, 212, 0.3)' : selectedServiceData.color.includes('purple') ? 'rgba(168, 85, 247, 0.3)' : selectedServiceData.color.includes('emerald') ? 'rgba(16, 185, 129, 0.3)' : 'rgba(249, 115, 22, 0.3)'}, transparent)`,
                  }}
                />
                <motion.div
                  className="absolute left-[calc(50%-2px)] top-1/2 -translate-y-1/2 w-1 h-1 rounded-full"
                  style={{
                    background: selectedServiceData.color.includes('cyan') ? '#06b6d4' : selectedServiceData.color.includes('purple') ? '#a855f7' : selectedServiceData.color.includes('emerald') ? '#10b981' : '#f59e0b',
                    boxShadow: `0 0 20px ${selectedServiceData.color.includes('cyan') ? 'rgba(6, 182, 212, 0.6)' : selectedServiceData.color.includes('purple') ? 'rgba(168, 85, 247, 0.6)' : selectedServiceData.color.includes('emerald') ? 'rgba(16, 185, 129, 0.6)' : 'rgba(249, 115, 22, 0.6)'}`,
                  }}
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.6, 1, 0.6],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </div>
            </motion.div>
          )}
          
          {/* 3D Globe Canvas */}
          <motion.div 
            className="w-full lg:w-1/2 h-[500px] lg:h-[600px] relative"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
          >
            {/* Glow effect around canvas */}
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-sky-500/10 via-transparent to-purple-500/10 blur-2xl opacity-50" />
            
            <Canvas
              dpr={typeof window !== 'undefined' ? [1, Math.min(window.devicePixelRatio || 1, 2)] : [1, 2]}
              gl={{
                antialias: true,
                powerPreference: "high-performance",
                alpha: true,
                stencil: false,
                depth: true,
                logarithmicDepthBuffer: false,
              }}
              frameloop={reduceMotion ? "demand" : "always"}
              performance={{ min: 0.5 }}
              className="w-full h-full relative z-10"
            >
              <Suspense fallback={null}>
                <PerspectiveCamera makeDefault position={[0, 0, 6]} fov={50} />
                <Scene3D
                  selectedService={selectedService}
                  onServiceClick={setSelectedService}
                />
              </Suspense>
            </Canvas>
            
            {/* Enhanced instructions overlay */}
            <motion.div 
              className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
            >
              <div className="flex items-center gap-3 text-xs text-white/50 uppercase tracking-wider">
                <span className="flex items-center gap-1.5">
                  <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                  </svg>
                  Drag to rotate
                </span>
                <span className="h-1 w-1 rounded-full bg-white/30" />
                <span className="flex items-center gap-1.5">
                  <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                  </svg>
                  Click hotspots
                </span>
              </div>
            </motion.div>
          </motion.div>

          {/* Service Detail Panel */}
          <div className="w-full lg:w-1/2 flex items-center justify-center min-h-[400px]">
            {selectedServiceData ? (
              <ServicePanel service={selectedServiceData} isVisible={true} />
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="service-card max-w-md w-full text-center"
              >
                <div className="service-card-inner px-8 py-10">
                  <motion.div
                    animate={{ 
                      scale: [1, 1.1, 1],
                      opacity: [0.5, 1, 0.5]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="inline-flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-white/5 mb-4"
                  >
                    <svg 
                      className="h-8 w-8 text-white/40" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                    </svg>
                  </motion.div>
                  <p className="text-white/60 text-sm leading-relaxed">
                    Click a hotspot on the globe to explore our services
                  </p>
                  <p className="text-white/40 text-xs mt-2 uppercase tracking-wider">
                    Interactive Discovery
                  </p>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

