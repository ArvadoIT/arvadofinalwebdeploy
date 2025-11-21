"use client";

import { motion, useScroll, useTransform, useSpring, AnimatePresence, useMotionValue } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import type { ReactNode } from "react";

// Magnetic button component
function MagneticButton({ 
	href, 
	children, 
	className, 
	variants 
}: { 
	href: string; 
	children: ReactNode; 
	className?: string;
	variants?: any;
}) {
	const ref = useRef<HTMLAnchorElement>(null);
	const x = useMotionValue(0);
	const y = useMotionValue(0);
	
	const mouseXSpring = useSpring(x, { stiffness: 500, damping: 100 });
	const mouseYSpring = useSpring(y, { stiffness: 500, damping: 100 });
	
	const translateX = useTransform(mouseXSpring, [-0.5, 0.5], [-12, 12]);
	const translateY = useTransform(mouseYSpring, [-0.5, 0.5], [-12, 12]);

	const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
		if (!ref.current) return;
		
		const rect = ref.current.getBoundingClientRect();
		const width = rect.width;
		const height = rect.height;
		const mouseX = e.clientX - rect.left;
		const mouseY = e.clientY - rect.top;
		const xPct = mouseX / width - 0.5;
		const yPct = mouseY / height - 0.5;
		
		x.set(xPct);
		y.set(yPct);
	};

	const handleMouseLeave = () => {
		x.set(0);
		y.set(0);
	};

	return (
		<motion.a
			ref={ref}
			href={href}
			onMouseMove={handleMouseMove}
			onMouseLeave={handleMouseLeave}
			style={{ x: translateX, y: translateY }}
			variants={variants}
			whileHover={{
				scale: 1.05,
				y: -3,
				transition: { duration: 0.2 },
			}}
			whileTap={{ scale: 0.98 }}
			className={className}
		>
			{children}
		</motion.a>
	);
}

export default function CinematicHero() {
	const sectionRef = useRef<HTMLElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);
	const [loaded, setLoaded] = useState(false);

	const { scrollYProgress } = useScroll({
		target: sectionRef,
		offset: ["start start", "end start"],
		layoutEffect: false, // Performance optimization
	});

	// Simplified parallax - reduced transforms for performance
	const contentY = useTransform(scrollYProgress, [0, 1], [0, 40]);
	const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
	
	// Optimize will-change only during scroll
	const [isScrolling, setIsScrolling] = useState(false);
	useEffect(() => {
		let timeoutId: NodeJS.Timeout;
		const unsubscribe = scrollYProgress.on('change', () => {
			setIsScrolling(true);
			clearTimeout(timeoutId);
			timeoutId = setTimeout(() => setIsScrolling(false), 150);
		});
		return () => {
			unsubscribe();
			clearTimeout(timeoutId);
		};
	}, [scrollYProgress]);

	useEffect(() => {
		// Trigger initial animation sequence
		const timer = setTimeout(() => setLoaded(true), 100);
		return () => clearTimeout(timer);
	}, []);

	const headline = "Premium web, AI, and growth—crafted into one cinematic story.";
	const subheadline = "We ship momentum systems—design, automation, and campaigns that move in sync and compound results.";

	return (
		<section 
			ref={sectionRef} 
			className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 md:pt-32 pb-16 md:pb-24"
		>
			{/* Simplified Background - reduced layers for performance */}
			<div className="absolute inset-0 -z-10">
				{/* Base layer - deep gradient */}
				<div
					className="absolute inset-0"
					style={{
						background: "radial-gradient(ellipse 80% 50% at 50% 50%, rgba(2,6,23,0.98), rgba(2,6,23,1))",
					}}
				/>

				{/* Simplified animated gradient orbs - reduced count with will-change optimization */}
				<motion.div
					className="absolute top-[20%] left-[15%] w-[600px] h-[600px] rounded-full blur-3xl opacity-30"
					style={{
						background: "radial-gradient(circle, rgba(14,165,233,0.4), transparent 70%)",
						willChange: "transform",
					}}
					animate={{
						x: [0, 50, 0],
						y: [0, -30, 0],
					}}
					transition={{
						duration: 20,
						repeat: Infinity,
						ease: "easeInOut",
					}}
				/>
				<motion.div
					className="absolute bottom-[25%] right-[20%] w-[500px] h-[500px] rounded-full blur-3xl opacity-20"
					style={{
						background: "radial-gradient(circle, rgba(139,92,246,0.4), transparent 70%)",
						willChange: "transform",
					}}
					animate={{
						x: [0, -40, 0],
						y: [0, 40, 0],
					}}
					transition={{
						duration: 18,
						repeat: Infinity,
						ease: "easeInOut",
						delay: 2,
					}}
				/>

				{/* Static grid pattern */}
				<div className="absolute inset-0 opacity-[0.03]">
					<div className="h-full w-full [background-image:linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] [background-size:60px_60px]" />
				</div>

				{/* Vignette */}
				<div 
					className="absolute inset-0"
					style={{
						background: "radial-gradient(ellipse 80% 60% at 50% 50%, transparent, rgba(2,6,23,0.9))",
					}}
				/>
			</div>

			{/* Floating Particle Elements - Further reduced for performance */}
			{loaded && (
				<>
					{Array.from({ length: 4 }).map((_, i) => {
						const delay = i * 0.5;
						const duration = 8 + (i % 2) * 2;
						const size = 3;
						const startX = (i % 2) * 50 + 25;
						const startY = (Math.floor(i / 2) % 2) * 50 + 25;

						return (
							<motion.div
								key={i}
								className="absolute rounded-full bg-sky-400/20 blur-[1px]"
								style={{
									left: `${startX}%`,
									top: `${startY}%`,
									width: `${size}px`,
									height: `${size}px`,
								}}
								initial={{ opacity: 0, scale: 0 }}
								animate={{
									opacity: [0, 0.6, 0.4, 0],
									scale: [0, 1, 0.8, 0],
									x: `${(Math.random() - 0.5) * 100}px`,
									y: `${(Math.random() - 0.5) * 100}px`,
								}}
								transition={{
									duration,
									repeat: Infinity,
									ease: "easeInOut",
									delay,
								}}
							/>
						);
					})}
				</>
			)}

			{/* Main Content */}
			<motion.div
				ref={containerRef}
				className="relative z-10 mx-auto w-full max-w-5xl px-4 text-center sm:px-6 lg:px-8"
				style={{
					y: contentY,
					opacity: contentOpacity,
					willChange: isScrolling ? 'transform, opacity' : 'auto',
				}}
			>
				<AnimatePresence mode="wait">
					{loaded && (
						<motion.div
							initial="hidden"
							animate="visible"
							exit="hidden"
							variants={{
								hidden: { opacity: 0 },
								visible: {
									opacity: 1,
									transition: {
										staggerChildren: 0.08,
										delayChildren: 0.2,
									},
								},
							}}
							className="w-full"
						>
							{/* Tag */}
							<motion.div
								variants={{
									hidden: { opacity: 0, y: 30, scale: 0.8 },
									visible: {
										opacity: 1,
										y: 0,
										scale: 1,
										transition: {
											type: "spring",
											stiffness: 200,
											damping: 20,
										},
									},
								}}
								className="mb-6 md:mb-8"
							>
								<motion.span
									className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-5 py-2 text-xs uppercase tracking-[0.4em] text-white/70 backdrop-blur-md"
									whileHover={{
										scale: 1.05,
										borderColor: "rgba(255,255,255,0.2)",
										transition: { duration: 0.2 },
									}}
								>
									<motion.span
										className="inline-block h-1.5 w-1.5 rounded-full bg-sky-400"
										animate={{
											opacity: [0.5, 1, 0.5],
											scale: [1, 1.2, 1],
										}}
										transition={{
											duration: 2,
											repeat: Infinity,
											ease: "easeInOut",
										}}
									/>
									Arvado
								</motion.span>
							</motion.div>

							{/* Headline with word-by-word reveal - simplified for performance */}
							<div className="w-full max-w-5xl mx-auto mb-6 md:mb-8">
								<motion.h1
									className="text-[clamp(1.875rem,5.5vw,4.5rem)] font-bold leading-[1.15] tracking-[-0.02em] text-white break-normal hyphens-none"
									style={{
										textShadow: "0 0 40px rgba(14, 165, 233, 0.15), 0 0 80px rgba(14, 165, 233, 0.08), 0 2px 4px rgba(0, 0, 0, 0.3)",
									}}
									variants={{
										hidden: { opacity: 0 },
										visible: {
											opacity: 1,
											transition: {
												staggerChildren: 0.05,
												delayChildren: 0.2,
											},
										},
									}}
								>
									{headline.split(" ").map((word, wordIndex) => (
										<motion.span
											key={wordIndex}
											className="inline-block whitespace-nowrap mr-2"
											variants={{
												hidden: {
													opacity: 0,
													y: 30,
												},
												visible: {
													opacity: 1,
													y: 0,
													transition: {
														type: "spring",
														stiffness: 200,
														damping: 20,
													},
												},
											}}
											style={{ willChange: loaded ? 'auto' : 'transform, opacity' }}
										>
											{word}
										</motion.span>
									))}
								</motion.h1>
							</div>

							{/* Subheadline with slide-up reveal */}
							<motion.p
								variants={{
									hidden: {
										opacity: 0,
										y: 40,
										filter: "blur(8px)",
									},
									visible: {
										opacity: 1,
										y: 0,
										filter: "blur(0px)",
										transition: {
											duration: 0.8,
											delay: 0.3,
											ease: [0.22, 1, 0.36, 1],
										},
									},
								}}
								className="mx-auto mb-10 md:mb-12 max-w-2xl text-base md:text-lg text-white/70 leading-relaxed"
							>
								{subheadline}
							</motion.p>

							{/* CTA Buttons with Magnetic Effect */}
							<motion.div
								variants={{
									hidden: { opacity: 0 },
									visible: {
										opacity: 1,
										transition: {
											staggerChildren: 0.1,
											delayChildren: 0.6,
										},
									},
								}}
								className="flex flex-col items-center justify-center gap-4 sm:flex-row"
							>
								<MagneticButton
									href="#contact"
									variants={{
										hidden: {
											opacity: 0,
											y: 30,
											scale: 0.8,
										},
										visible: {
											opacity: 1,
											y: 0,
											scale: 1,
											transition: {
												type: "spring",
												stiffness: 200,
												damping: 15,
											},
										},
									}}
									className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-sky-500 to-cyan-500 px-10 py-4 text-base font-semibold text-white shadow-2xl shadow-sky-500/30 ring-1 ring-white/20"
								>
									<motion.div
										className="absolute inset-0 bg-gradient-to-r from-sky-400 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity"
										initial={false}
									/>
									<span className="relative z-10">Book a call</span>
									<motion.div
										className="absolute inset-0 bg-white/20"
										initial={{ x: "-100%" }}
										whileHover={{ x: "100%" }}
										transition={{ duration: 0.6 }}
									/>
								</MagneticButton>

								<MagneticButton
									href="#launch"
									variants={{
										hidden: {
											opacity: 0,
											y: 30,
											scale: 0.8,
										},
										visible: {
											opacity: 1,
											y: 0,
											scale: 1,
											transition: {
												type: "spring",
												stiffness: 200,
												damping: 15,
												delay: 0.1,
											},
										},
									}}
									className="rounded-2xl border border-white/15 bg-white/[0.03] px-10 py-4 text-base font-medium text-white backdrop-blur-md transition-all hover:bg-white/10"
								>
									See how we launch
								</MagneticButton>
							</motion.div>
						</motion.div>
					)}
				</AnimatePresence>
			</motion.div>
		</section>
	);
}
