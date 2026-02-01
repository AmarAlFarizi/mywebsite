"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { FaArrowUp } from "react-icons/fa";

gsap.registerPlugin(useGSAP);

export default function Footer() {
    const containerRef = useRef<HTMLElement>(null);
    const backTopRef = useRef<HTMLButtonElement>(null);
    const [isHovering, setIsHovering] = useState(false);

    // Gravity-defying floating animation for Back to Top button
    useGSAP(
        () => {
            if (!backTopRef.current) return;

            // Continuous bobbing sensation (gravity defiance)
            gsap.to(backTopRef.current, {
                y: -15,
                duration: 2,
                ease: "sine.inOut",
                repeat: -1,
                yoyo: true,
            });
        },
        { scope: containerRef }
    );

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <footer ref={containerRef} className="relative py-20 px-4 md:px-8 lg:px-16 bg-space-black overflow-hidden">
            {/* Subtle grid background */}
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.5) 1px, transparent 1px)
          `,
                    backgroundSize: "50px 50px",
                }}
            />

            <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">

                {/* Main CTA */}
                <div className="flex flex-col items-center md:items-start text-center md:text-left">
                    <p className="text-nebula-purple font-mono text-sm mb-4 tracking-wider uppercase">
                        What&apos;s Next?
                    </p>
                    <a
                        href="mailto:izzyamaralfa@gmail.com"
                        className="text-4xl md:text-6xl lg:text-7xl font-bold text-white hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-nebula-purple hover:to-nebula-blue transition-all duration-500 leading-tight"
                    >
                        Let&apos;s Build<br />Something Great
                    </a>
                </div>

                {/* Back to Top Button */}
                <div className="relative">
                    <button
                        ref={backTopRef}
                        onClick={scrollToTop}
                        onMouseEnter={() => setIsHovering(true)}
                        onMouseLeave={() => setIsHovering(false)}
                        className="w-20 h-20 rounded-full border border-white/20 bg-space-gray/50 backdrop-blur-md flex items-center justify-center group overflow-hidden relative"
                        aria-label="Back to Top"
                    >
                        <div className={`absolute inset-0 bg-gradient-to-tr from-nebula-purple to-nebula-blue transition-opacity duration-300 ${isHovering ? 'opacity-20' : 'opacity-0'}`} />

                        <FaArrowUp
                            className={`text-white transition-all duration-300 w-6 h-6 ${isHovering ? '-translate-y-80' : 'translate-y-0'}`}
                        />

                        {/* Second arrow that slides in from bottom */}
                        <FaArrowUp
                            className={`absolute text-white transition-all duration-300 w-6 h-6 ${isHovering ? 'translate-y-0' : 'translate-y-80'}`}
                        />
                    </button>

                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-0 md:opacity-100 transition-opacity">
                        <span className="text-xs text-gray-500 font-mono">BACK TO TOP</span>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
                <p>&copy; {new Date().getFullYear()} Amar Al Farizi. All rights reserved.</p>
                <div className="flex gap-6 mt-4 md:mt-0">
                    <a href="#" className="hover:text-nebula-purple transition-colors">GitHub</a>
                    <a href="#" className="hover:text-nebula-purple transition-colors">LinkedIn</a>
                    <a href="#" className="hover:text-nebula-purple transition-colors">Twitter</a>
                </div>
            </div>
        </footer>
    );
}
