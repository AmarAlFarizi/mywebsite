"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export default function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const followerRef = useRef<HTMLDivElement>(null);
    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    // Initial mouse position outside screen to avoid jump
    const mouse = useRef({ x: -100, y: -100 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouse.current = { x: e.clientX, y: e.clientY };
            if (!isVisible) setIsVisible(true);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            // Check if hovering over clickable elements
            if (
                target.tagName === "BUTTON" ||
                target.tagName === "A" ||
                target.closest("button") ||
                target.closest("a") ||
                target.classList.contains("project-card") ||
                target.closest(".project-card")
            ) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseover", handleMouseOver);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseover", handleMouseOver);
        };
    }, [isVisible]);

    useGSAP(
        () => {
            // Main cursor moves instantly
            gsap.ticker.add(() => {
                if (cursorRef.current && followerRef.current) {
                    gsap.set(cursorRef.current, {
                        x: mouse.current.x,
                        y: mouse.current.y,
                    });

                    // Follower has lag effect
                    gsap.to(followerRef.current, {
                        x: mouse.current.x,
                        y: mouse.current.y,
                        duration: 0.8,
                        ease: "power3.out",
                    });
                }
            });
        },
        { dependencies: [] }
    );

    // Handle hover enlargement
    useEffect(() => {
        if (cursorRef.current && followerRef.current) {
            if (isHovering) {
                gsap.to(followerRef.current, {
                    scale: 3,
                    backgroundColor: "rgba(124, 58, 237, 0.1)",
                    borderColor: "transparent",
                    duration: 0.3,
                });
                gsap.to(cursorRef.current, {
                    scale: 0.5,
                    backgroundColor: "#7c3aed",
                    duration: 0.3,
                });
            } else {
                gsap.to(followerRef.current, {
                    scale: 1,
                    backgroundColor: "transparent",
                    borderColor: "rgba(255, 255, 255, 0.5)",
                    duration: 0.3,
                });
                gsap.to(cursorRef.current, {
                    scale: 1,
                    backgroundColor: "#ffffff",
                    duration: 0.3,
                });
            }
        }
    }, [isHovering]);

    // Hide on touch devices
    return (
        <div className="hidden md:block pointer-events-none fixed inset-0 z-[9999]">
            {/* Main Cursor Dot */}
            <div
                ref={cursorRef}
                className="fixed w-3 h-3 bg-white rounded-full -translate-x-1/2 -translate-y-1/2 shadow-[0_0_10px_rgba(255,255,255,0.8)] mix-blend-difference"
            />

            {/* Trailing Ring */}
            <div
                ref={followerRef}
                className="fixed w-10 h-10 border border-white/50 rounded-full -translate-x-1/2 -translate-y-1/2 -mt-[5px] -ml-[5px] mix-blend-difference"
            />
        </div>
    );
}
