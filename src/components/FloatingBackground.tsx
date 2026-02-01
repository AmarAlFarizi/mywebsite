"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

interface GradientOrb {
    id: number;
    size: number;
    x: number;
    y: number;
    color: string;
    blur: number;
    opacity: number;
}

const orbs: GradientOrb[] = [
    { id: 1, size: 600, x: 10, y: 20, color: "rgba(124, 58, 237, 0.15)", blur: 120, opacity: 0.4 },
    { id: 2, size: 500, x: 70, y: 10, color: "rgba(59, 130, 246, 0.12)", blur: 100, opacity: 0.35 },
    { id: 3, size: 400, x: 80, y: 70, color: "rgba(236, 72, 153, 0.1)", blur: 80, opacity: 0.3 },
    { id: 4, size: 350, x: 20, y: 80, color: "rgba(124, 58, 237, 0.1)", blur: 90, opacity: 0.25 },
    { id: 5, size: 450, x: 50, y: 40, color: "rgba(59, 130, 246, 0.08)", blur: 110, opacity: 0.3 },
];

// Wireframe geometric shapes
const wireframes = [
    { id: 1, type: "triangle", size: 200, x: 15, y: 30, rotation: 0 },
    { id: 2, type: "square", size: 150, x: 75, y: 60, rotation: 45 },
    { id: 3, type: "circle", size: 180, x: 85, y: 15, rotation: 0 },
    { id: 4, type: "hexagon", size: 120, x: 25, y: 75, rotation: 30 },
];

export default function FloatingBackground() {
    const containerRef = useRef<HTMLDivElement>(null);
    const orbRefs = useRef<(HTMLDivElement | null)[]>([]);
    const wireframeRefs = useRef<(HTMLDivElement | null)[]>([]);

    useGSAP(
        () => {
            // Animate gradient orbs with zero-gravity floating effect
            orbRefs.current.forEach((orb, index) => {
                if (!orb) return;

                const duration = 15 + index * 3;
                const xRange = 30 + index * 10;
                const yRange = 25 + index * 8;

                gsap.to(orb, {
                    x: `+=${xRange}`,
                    y: `+=${yRange}`,
                    duration: duration,
                    ease: "sine.inOut",
                    repeat: -1,
                    yoyo: true,
                });

                // Secondary subtle rotation
                gsap.to(orb, {
                    rotation: index % 2 === 0 ? 10 : -10,
                    duration: duration * 1.5,
                    ease: "sine.inOut",
                    repeat: -1,
                    yoyo: true,
                });

                // Pulse opacity for ethereal effect
                gsap.to(orb, {
                    opacity: orbs[index].opacity * 1.5,
                    duration: duration * 0.5,
                    ease: "sine.inOut",
                    repeat: -1,
                    yoyo: true,
                });
            });

            // Animate wireframe shapes
            wireframeRefs.current.forEach((wireframe, index) => {
                if (!wireframe) return;

                const duration = 20 + index * 5;

                // Slow rotation
                gsap.to(wireframe, {
                    rotation: `+=${360}`,
                    duration: duration * 2,
                    ease: "none",
                    repeat: -1,
                });

                // Floating motion
                gsap.to(wireframe, {
                    x: `+=${20 + index * 5}`,
                    y: `+=${15 + index * 3}`,
                    duration: duration,
                    ease: "sine.inOut",
                    repeat: -1,
                    yoyo: true,
                });

                // Scale pulse
                gsap.to(wireframe, {
                    scale: 1.1,
                    duration: duration * 0.8,
                    ease: "sine.inOut",
                    repeat: -1,
                    yoyo: true,
                });
            });
        },
        { scope: containerRef }
    );

    const renderWireframe = (type: string, size: number) => {
        const strokeColor = "rgba(124, 58, 237, 0.15)";
        const strokeWidth = 1;

        switch (type) {
            case "triangle":
                return (
                    <svg width={size} height={size} viewBox="0 0 100 100">
                        <polygon
                            points="50,10 90,90 10,90"
                            fill="none"
                            stroke={strokeColor}
                            strokeWidth={strokeWidth}
                        />
                    </svg>
                );
            case "square":
                return (
                    <svg width={size} height={size} viewBox="0 0 100 100">
                        <rect
                            x="10"
                            y="10"
                            width="80"
                            height="80"
                            fill="none"
                            stroke={strokeColor}
                            strokeWidth={strokeWidth}
                        />
                    </svg>
                );
            case "circle":
                return (
                    <svg width={size} height={size} viewBox="0 0 100 100">
                        <circle
                            cx="50"
                            cy="50"
                            r="40"
                            fill="none"
                            stroke={strokeColor}
                            strokeWidth={strokeWidth}
                        />
                    </svg>
                );
            case "hexagon":
                return (
                    <svg width={size} height={size} viewBox="0 0 100 100">
                        <polygon
                            points="50,5 93,25 93,75 50,95 7,75 7,25"
                            fill="none"
                            stroke={strokeColor}
                            strokeWidth={strokeWidth}
                        />
                    </svg>
                );
            default:
                return null;
        }
    };

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 overflow-hidden pointer-events-none z-0"
            aria-hidden="true"
        >
            {/* Gradient Orbs */}
            {orbs.map((orb, index) => (
                <div
                    key={orb.id}
                    ref={(el) => {
                        orbRefs.current[index] = el;
                    }}
                    className="absolute rounded-full"
                    style={{
                        width: orb.size,
                        height: orb.size,
                        left: `${orb.x}%`,
                        top: `${orb.y}%`,
                        background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
                        filter: `blur(${orb.blur}px)`,
                        opacity: orb.opacity,
                        transform: "translate(-50%, -50%)",
                    }}
                />
            ))}

            {/* Wireframe Shapes */}
            {wireframes.map((shape, index) => (
                <div
                    key={shape.id}
                    ref={(el) => {
                        wireframeRefs.current[index] = el;
                    }}
                    className="absolute opacity-30"
                    style={{
                        left: `${shape.x}%`,
                        top: `${shape.y}%`,
                        transform: `translate(-50%, -50%) rotate(${shape.rotation}deg)`,
                    }}
                >
                    {renderWireframe(shape.type, shape.size)}
                </div>
            ))}

            {/* Subtle grid overlay */}
            <div
                className="absolute inset-0 opacity-[0.02]"
                style={{
                    backgroundImage: `
            linear-gradient(rgba(124, 58, 237, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(124, 58, 237, 0.5) 1px, transparent 1px)
          `,
                    backgroundSize: "100px 100px",
                }}
            />
        </div>
    );
}
