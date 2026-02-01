"use client";

import { useRef, ReactNode } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

interface MagneticButtonProps {
    children: ReactNode;
    className?: string;
    strength?: number;
    onClick?: () => void;
}

export default function MagneticButton({
    children,
    className = "",
    strength = 0.4,
    onClick,
}: MagneticButtonProps) {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const contentRef = useRef<HTMLSpanElement>(null);

    useGSAP(() => {
        const button = buttonRef.current;
        const content = contentRef.current;
        if (!button || !content) return;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = button.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const deltaX = e.clientX - centerX;
            const deltaY = e.clientY - centerY;

            // Calculate distance from center
            const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
            const maxDistance = Math.max(rect.width, rect.height);

            // Only apply effect when cursor is close
            if (distance < maxDistance * 1.5) {
                const magnetX = deltaX * strength;
                const magnetY = deltaY * strength;

                gsap.to(button, {
                    x: magnetX,
                    y: magnetY,
                    duration: 0.3,
                    ease: "power2.out",
                });

                gsap.to(content, {
                    x: magnetX * 0.3,
                    y: magnetY * 0.3,
                    duration: 0.3,
                    ease: "power2.out",
                });
            }
        };

        const handleMouseLeave = () => {
            gsap.to(button, {
                x: 0,
                y: 0,
                duration: 0.5,
                ease: "elastic.out(1, 0.3)",
            });

            gsap.to(content, {
                x: 0,
                y: 0,
                duration: 0.5,
                ease: "elastic.out(1, 0.3)",
            });
        };

        // Add listeners to window for smooth tracking
        window.addEventListener("mousemove", handleMouseMove);
        button.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            button.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, [strength]);

    return (
        <button
            ref={buttonRef}
            onClick={onClick}
            className={`relative inline-flex items-center justify-center overflow-hidden ${className}`}
        >
            <span ref={contentRef} className="relative z-10">
                {children}
            </span>
        </button>
    );
}
