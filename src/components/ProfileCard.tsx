"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaWordpress, FaCode, FaRocket, FaDownload } from "react-icons/fa";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function ProfileCard() {
    const sectionRef = useRef<HTMLElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!cardRef.current) return;

        gsap.from(cardRef.current, {
            y: 100,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 80%",
                toggleActions: "play none none reverse"
            }
        });
    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} className="py-20 px-4 md:px-8 flex justify-center items-center">
            <div
                ref={cardRef}
                className="relative w-full max-w-4xl rounded-3xl overflow-hidden group border border-white/10"
                style={{
                    background: "rgba(255, 255, 255, 0.03)",
                    backdropFilter: "blur(20px)",
                    WebkitBackdropFilter: "blur(20px)",
                    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)"
                }}
            >
                {/* Background Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-nebula-purple/10 via-transparent to-nebula-blue/10 opacity-50" />

                <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 md:gap-12 p-8 md:p-12">

                    {/* Visual / Image Side */}
                    <div className="w-full md:w-1/3 flex justify-center">
                        <div className="relative w-48 h-48 md:w-56 md:h-56">
                            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-nebula-purple to-nebula-blue animate-pulse-glow blur-2xl opacity-50" />
                            <div className="relative w-full h-full rounded-full border-2 border-white/20 overflow-hidden bg-space-black flex items-center justify-center">
                                {/* Placeholder for Profile Image */}
                                <FaWordpress className="text-8xl text-white/80" />
                            </div>

                            {/* Floating Badges */}
                            <div className="absolute -top-2 -right-2 bg-space-gray border border-white/10 p-3 rounded-xl shadow-xl animate-float-medium">
                                <FaCode className="text-nebula-blue text-xl" />
                            </div>
                            <div className="absolute -bottom-2 -left-2 bg-space-gray border border-white/10 p-3 rounded-xl shadow-xl animate-float-slow">
                                <FaRocket className="text-nebula-purple text-xl" />
                            </div>
                        </div>
                    </div>

                    {/* Content Side */}
                    <div className="w-full md:w-2/3 text-center md:text-left">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-nebula-purple to-nebula-blue">Amar AlFarizi</span>
                        </h2>

                        <div className="mb-6">
                            <h3 className="text-xl md:text-2xl font-mono text-gray-300 flex items-center justify-center md:justify-start gap-3">
                                <span className="text-nebula-purple">
                                    <FaWordpress />
                                </span>
                                WordPress Developer
                            </h3>
                            <p className="text-sm text-gray-500 mt-1 uppercase tracking-widest font-bold">
                                3++ Years Experience
                            </p>
                        </div>

                        <p className="text-gray-400 leading-relaxed mb-8 text-lg">
                            I am a Web Developer specializing in WordPress development, performance optimization, accessibility, and SEO. I have experience building and maintaining company websites, achieving high Google Lighthouse scores (Performance 99, Accessibility 92, Best Practices 93, SEO 92). I also work with Laravel to build web applications and explore automation using n8n. I enjoy creating fast, user-friendly, and scalable digital solutions that solve real-world problems.
                        </p>

                        <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                            <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-code text-gray-300">
                                Performance Optimization
                            </div>
                            <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-code text-gray-300">
                                Pixel-Perfect Design
                            </div>
                            <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-code text-gray-300">
                                Custom Plugins
                            </div>
                        </div>

                        {/* Download CV Button */}
                        <div className="mt-8 flex justify-center md:justify-start">
                            <a
                                href="https://drive.google.com/file/d/109eZQd2YtuoMyvOuZJKbmUT7G8gvqjMO/view?usp=sharing"
                                target="_blank"
                                className="group relative px-8 py-3 rounded-full bg-gradient-to-r from-nebula-purple to-nebula-blue text-white font-bold tracking-wide transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_20px_rgba(124,58,237,0.5)] flex items-center gap-3 overflow-hidden"
                            >
                                <span className="relative z-10">Download CV</span>
                                <FaDownload className="relative z-10 group-hover:translate-y-1 transition-transform duration-300" />
                                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
