"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

export default function Header() {
    const headerRef = useRef<HTMLElement>(null);

    // Animate header in on load
    useGSAP(() => {
        gsap.from(headerRef.current, {
            y: -100,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            delay: 0.5
        });
    });

    return (
        <header
            ref={headerRef}
            className="fixed top-0 left-0 right-0 z-50 px-6 py-6 md:px-12 flex justify-between items-start mix-blend-difference text-white"
        >
            <div className="flex flex-col text-xs font-mono tracking-widest gap-1">
                <span className="uppercase opacity-70">Amar Al</span>
                <span className="uppercase font-bold">Farizi</span>
            </div>

            <div className="absolute left-1/2 -translate-x-1/2 text-center top-6 hidden md:block">
                <p className="text-[10px] font-mono tracking-[0.2em] opacity-80 uppercase">
                    WordPress Developer<br />Portfolio 2026
                </p>
            </div>

            <div className="flex items-start gap-6">
                <a href="mailto:izzyamaralfa@gmail.com">
                    <button className="border border-white/30 px-6 py-2 rounded-full text-xs font-mono hover:bg-white hover:text-black transition-all uppercase tracking-widest">
                        Contact
                    </button>
                </a>

                <div className="flex flex-col text-xs font-mono tracking-widest gap-1 text-right">
                    <span className="uppercase opacity-70">Wordpress</span>
                    <span className="uppercase font-bold">Developer</span>
                </div>
            </div>
        </header>
    );
}
