"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaInstagram, FaTwitter, FaYoutube, FaGithub } from "react-icons/fa";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const textContainerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!containerRef.current || !textContainerRef.current) return;

        // Split text animation for "WORDPRESS" and "DEVELOPER"
        const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

        // Initial Reveal
        tl.from(".hero-char", {
            y: 200,
            opacity: 0,
            rotateX: -45,
            stagger: 0.05,
            duration: 1.5,
            delay: 0.2
        });

        tl.from(".hero-social", {
            x: (index) => index === 0 ? -50 : 50,
            opacity: 0,
            duration: 1,
            stagger: 0.1
        }, "-=1");

        // Parallax Scroll Effect
        gsap.to(textContainerRef.current, {
            y: -150, // Move text up faster than scroll
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "bottom top",
                scrub: true
            }
        });

        // Image Parallax (Background feel)
        if (imageRef.current) {
            gsap.to(imageRef.current, {
                y: 100, // Move image slower
                opacity: 0.5,
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: true
                }
            });
        }

    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="relative h-screen w-full flex flex-col justify-end pb-12 overflow-hidden bg-transparent">

            {/* Abstract Center Visual (Placeholder for Face/Image) */}
            <div ref={imageRef} className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                <div className="w-[40vw] h-[60vh] bg-gradient-to-b from-nebula-purple/20 to-transparent rounded-full blur-[100px] opacity-40" />
            </div>

            {/* Main Content */}
            <div className="relative z-10 w-full px-4 md:px-8">

                {/* Massive Typography */}
                <div ref={textContainerRef} className="flex flex-col items-center justify-center leading-none select-none mix-blend-overlay">
                    <h1 className="flex text-[12vw] md:text-[14vw] font-black tracking-tighter text-white overflow-hidden">
                        {"WORDPRESS".split("").map((char, i) => (
                            <span key={i} className="hero-char inline-block origin-bottom-left">
                                {char}
                            </span>
                        ))}
                    </h1>
                    <h2 className="flex text-[12vw] md:text-[14vw] font-black tracking-tighter text-white overflow-hidden -mt-[4vw]">
                        {"DEVELOPER".split("").map((char, i) => (
                            <span key={i} className="hero-char inline-block origin-bottom-left">
                                {char}
                            </span>
                        ))}
                    </h2>
                </div>

                {/* Bottom Credits */}
                <div className="absolute bottom-0 left-0 right-0 flex justify-center pb-8 opacity-50 text-[10px] font-mono tracking-widest uppercase">
                    <p className="text-center">Copyright 2026 Developer Portfolio. All Right Reserved.</p>
                </div>
            </div>

            {/* Social Sidebars */}
            <div className="hidden md:flex flex-col justify-center items-center fixed left-8 top-1/2 -translate-y-1/2 gap-8 z-40 hero-social">
                <p className="text-xs font-mono font-bold -rotate-90 origin-center whitespace-nowrap mb-8 text-white">PERSONAL</p>
                <a href="#" className="text-white hover:text-nebula-purple transition-colors text-xl"><FaInstagram /></a>
                <a href="#" className="text-white hover:text-nebula-purple transition-colors text-xl"><FaTwitter /></a>

            </div>

            <div className="hidden md:flex flex-col justify-center items-center fixed right-8 top-1/2 -translate-y-1/2 gap-8 z-40 hero-social">
                <p className="text-xs font-mono font-bold rotate-90 origin-center whitespace-nowrap mb-8 text-white">PROFESSIONAL</p>
                <a href="#" className="text-white hover:text-nebula-purple transition-colors text-xl"><FaGithub /></a>

                <a href="#" className="text-white hover:text-nebula-purple transition-colors text-xl"><FaYoutube /></a>
            </div>

        </section>
    );
}
