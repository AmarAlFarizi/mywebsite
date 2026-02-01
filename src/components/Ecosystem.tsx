"use client";

import React, { useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import {
    FaWordpress,
    FaReact,
    FaPhp
} from "react-icons/fa";
import {
    SiNextdotjs,
    SiMysql,
    SiGraphql,
    SiTailwindcss,
    SiTypescript
} from "react-icons/si";

gsap.registerPlugin(useGSAP);

interface TechItem {
    name: string;
    icon: React.ElementType;
    color: string;
    description: string;
    role: string;
}

const techStack: TechItem[] = [
    {
        name: "WordPress",
        icon: FaWordpress,
        color: "#21759b",
        role: "Core CMS",
        description: "Experts in custom theme & plugin development, headless architectures."
    },
    {
        name: "React",
        icon: FaReact,
        color: "#61dafb",
        role: "Frontend Library",
        description: "Building interactive, dynamic user interfaces and components."
    },
    {
        name: "Next.js",
        icon: SiNextdotjs,
        color: "#ffffff",
        role: "React Framework",
        description: "Server-side rendering, static generation, and high-performance routing."
    },
    {
        name: "PHP",
        icon: FaPhp,
        color: "#777bb4",
        role: "Backend Logic",
        description: "Robust server-side logic and custom WordPress integrations."
    },
    {
        name: "MySQL",
        icon: SiMysql,
        color: "#00758f",
        role: "Database",
        description: "Optimized database schema design and complex query management."
    },
    {
        name: "GraphQL",
        icon: SiGraphql,
        color: "#e10098",
        role: "Data Layer",
        description: "Efficient data fetching for headless WordPress + Next.js stacks."
    },
    {
        name: "TypeScript",
        icon: SiTypescript,
        color: "#3178c6",
        role: "Type Safety",
        description: "Ensuring robust, error-free code across the full stack."
    },
    {
        name: "Tailwind",
        icon: SiTailwindcss,
        color: "#06b6d4",
        role: "Styling",
        description: "Rapid, responsive, and maintainable UI implementation."
    }
];

export default function Ecosystem() {
    const containerRef = useRef<HTMLElement>(null);
    const orbitRef = useRef<HTMLDivElement>(null);
    const iconsRef = useRef<(HTMLDivElement | null)[]>([]);
    const [activeTech, setActiveTech] = useState<TechItem | null>(null);
    const [isHovering, setIsHovering] = useState(false);

    // Refs for tweens
    const orbitTween = useRef<gsap.core.Tween | null>(null);
    const iconTweens = useRef<gsap.core.Tween[]>([]);

    useGSAP(() => {
        if (!orbitRef.current) return;

        // Main orbit animation - rotate the container
        orbitTween.current = gsap.to(orbitRef.current, {
            rotation: 360,
            duration: 60,
            repeat: -1,
            ease: "none",
        });

        // Counter-rotate icons to keep them upright
        iconsRef.current.forEach((icon) => {
            if (!icon) return;
            // We need to animate the rotation of the icon wrapper itself, 
            // which is separate from the CSS transform positioning
            const tween = gsap.to(icon, {
                rotation: -360,
                duration: 60,
                repeat: -1,
                ease: "none",
            });
            iconTweens.current.push(tween);
        });

    }, { scope: containerRef });

    // Handle play/pause on hover
    useGSAP(() => {
        if (isHovering) {
            orbitTween.current?.timeScale(0);
            iconTweens.current.forEach(t => t.timeScale(0));
        } else {
            gsap.to([orbitTween.current, ...iconTweens.current], {
                timeScale: 1,
                duration: 0.5,
                overwrite: true
            });
        }
    }, { dependencies: [isHovering] });

    return (
        <section
            ref={containerRef}
            className="relative min-h-[80vh] flex items-center justify-center py-20 overflow-hidden"
        >
            {/* Background radial gradient core */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(124,58,237,0.05)_0%,transparent_70%)]" />

            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 flex flex-col items-center">

                {/* Header */}
                <div className="text-center mb-16 relative z-20">
                    <p className="text-nebula-blue font-mono text-sm mb-4 tracking-wider uppercase">
                        Technology Stack
                    </p>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        The Ecosystem
                    </h2>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Bridging the gap between WordPress reliability and modern frontend performance.
                    </p>
                </div>

                {/* Orbit Container */}
                <div className="relative w-[300px] h-[300px] md:w-[500px] md:h-[500px] flex items-center justify-center">

                    {/* Central Core */}
                    <div className="absolute z-20 w-32 h-32 md:w-48 md:h-48 rounded-full bg-space-black border border-white/10 flex items-center justify-center shadow-[0_0_50px_rgba(124,58,237,0.2)]">
                        <div className={`text-center transition-all duration-300 w-full px-4 ${activeTech ? 'scale-100 opacity-100' : 'scale-95 opacity-80'}`}>
                            {activeTech ? (
                                <div className="flex flex-col items-center animate-fadeIn">
                                    <activeTech.icon className="w-8 h-8 md:w-12 md:h-12 mb-3 transition-colors duration-300" style={{ color: activeTech.color }} />
                                    <span className="text-white font-bold text-lg md:text-xl">{activeTech.name}</span>
                                    <span className="text-xs text-gray-400 font-mono mt-1">{activeTech.role}</span>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center">
                                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-tr from-nebula-purple to-nebula-blue flex items-center justify-center mb-2 animate-pulse">
                                        <span className="text-2xl md:text-4xl">🚀</span>
                                    </div>
                                    <span className="text-gray-500 text-xs mt-2 font-mono tracking-widest">CORE</span>
                                </div>
                            )}
                        </div>

                        {/* Pulsing rings */}
                        <div className="absolute inset-0 rounded-full border border-nebula-purple/30 animate-[ping_3s_linear_infinite] opacity-20 pointer-events-none" />
                        <div className="absolute -inset-4 rounded-full border border-nebula-blue/20 animate-[pulse_4s_ease-in-out_infinite] opacity-20 pointer-events-none" />
                    </div>

                    {/* Rotating Ring */}
                    <div
                        ref={orbitRef}
                        className="absolute inset-0 rounded-full border border-white/5"
                        onMouseEnter={() => setIsHovering(true)}
                        onMouseLeave={() => {
                            setIsHovering(false);
                            setActiveTech(null);
                        }}
                    >
                        {techStack.map((tech, index) => {
                            // Calculate angle for CSS positioning
                            const angle = (index / techStack.length) * 360;

                            return (
                                <div
                                    key={tech.name}
                                    className="orbit-item absolute top-1/2 left-1/2 w-12 h-12 md:w-16 md:h-16 -ml-6 -mt-6 md:-ml-8 md:-mt-8"
                                    style={{ "--angle": `${angle}deg` } as React.CSSProperties}
                                >
                                    {/* The icon wrapper that counter-rotates via GSAP */}
                                    <div
                                        ref={el => { iconsRef.current[index] = el; }}
                                        className="w-full h-full"
                                    >
                                        <button
                                            className="w-full h-full rounded-full bg-space-gray border border-white/10 flex items-center justify-center transition-all duration-300 hover:scale-125 hover:border-white/30 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] group relative z-30"
                                            onMouseEnter={() => setActiveTech(tech)}
                                            style={{
                                                boxShadow: activeTech?.name === tech.name ? `0 0 30px ${tech.color}40` : ''
                                            }}
                                            aria-label={tech.name}
                                        >
                                            <tech.icon className="w-6 h-6 md:w-8 md:h-8 text-gray-400 transition-colors duration-300 group-hover:text-white" style={{ color: activeTech?.name === tech.name ? tech.color : undefined }} />
                                        </button>

                                        {/* Tooltip Card (Only shows on hover) */}
                                        {activeTech?.name === tech.name && (
                                            <div
                                                className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-48 p-4 rounded-xl bg-space-gray/90 backdrop-blur-md border border-white/10 z-50 pointer-events-none animate-fadeIn shadow-2xl"
                                            >
                                                <p className="text-xs text-gray-300 text-center leading-relaxed">
                                                    {tech.description}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
