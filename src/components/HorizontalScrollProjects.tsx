"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import ProjectCard from "./ProjectCard";


gsap.registerPlugin(ScrollTrigger, useGSAP);

// Sample project data
const projects = [
    {
        title: "Jogja Ilmu Media Website",
        description: "A project built with full elementor pro and wordpress",
        image: "/projects/project-1.jpeg",
        tags: ["Elementor Pro", "WordPress"],
        link: "https://jogjailmumedia.com/",
    },
    {
        title: "DKV study program website",
        description: "A Website information for DKV study program",
        image: "/projects/project-2.jpeg",
        tags: ["WordPress", "Impreza"],
        link: "https://dkv.ump.ac.id/",
    },
    {
        title: "KreatiKode – Digital Learning Platform",
        description: "Online learning platform that provides free digital skill courses.",
        image: "/projects/project-3.jpg",
        tags: ["WordPress", "Impreza"],
        link: "https://kreatikode.my.id",
    },

    {
        title: "A Tourism Ticket",
        description: "A Tourism Ticket website built with laravel and tailwindcss",
        image: "/projects/project-4.jpeg",
        tags: ["Laravel", "TailwindCSS"],
        link: "#",
    },
    {
        title: "Company Profile with catalog",
        description: "A website built with wordpress and elementor pro",
        image: "/projects/project-5.jpeg",
        tags: ["Wordpress", "Elementor Pro", "Woocommerce"],
    },
];

export default function HorizontalScrollProjects() {
    const sectionRef = useRef<HTMLElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const triggerRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);
    const skewRef = useRef({ current: 0, target: 0 });

    useGSAP(
        () => {
            if (!containerRef.current || !cardsRef.current || !triggerRef.current) return;

            const cards = cardsRef.current;

            // GSAP ScrollTrigger matchMedia for responsive behavior
            const mm = gsap.matchMedia();

            mm.add("(min-width: 768px)", () => {
                // Desktop: Horizontal Scroll
                const totalScrollWidth = cards.scrollWidth - window.innerWidth + 200;

                const horizontalScroll = gsap.to(cards, {
                    x: -totalScrollWidth,
                    ease: "none",
                    scrollTrigger: {
                        trigger: triggerRef.current,
                        start: "top top",
                        end: () => `+=${totalScrollWidth}`,
                        pin: true,
                        scrub: 1.5,
                        anticipatePin: 1,
                        invalidateOnRefresh: true,
                        onUpdate: (self) => {
                            // Calculate velocity for skew effect
                            const velocity = self.getVelocity();
                            skewRef.current.target = gsap.utils.clamp(-15, 15, velocity / 300);

                            // Update active index based on scroll progress
                            const progress = self.progress;
                            const idx = Math.min(
                                projects.length - 1,
                                Math.floor(progress * projects.length)
                            );
                            setActiveIndex(idx);
                        },
                    },
                });

                // Velocity-based skew effect
                const updateSkew = () => {
                    skewRef.current.current = gsap.utils.interpolate(
                        skewRef.current.current,
                        skewRef.current.target,
                        0.1
                    );
                    const projectCards = cards.querySelectorAll(".project-card");
                    gsap.set(projectCards, {
                        skewX: skewRef.current.current,
                        transformOrigin: "center center",
                    });
                    skewRef.current.target *= 0.95;
                };
                gsap.ticker.add(updateSkew);

                // Animate individual cards as they come into view
                const projectCards = cards.querySelectorAll(".project-card");
                projectCards.forEach((card) => {
                    gsap.fromTo(
                        card,
                        { opacity: 0.3, scale: 0.9 },
                        {
                            opacity: 1,
                            scale: 1,
                            duration: 0.5,
                            scrollTrigger: {
                                trigger: card,
                                containerAnimation: horizontalScroll,
                                start: "left 80%",
                                end: "left 20%",
                                scrub: true,
                            },
                        }
                    );
                });

                return () => {
                    gsap.ticker.remove(updateSkew);
                };
            });

            mm.add("(max-width: 767px)", () => {
                // Mobile: Vertical Stack (default behavior, just ensure clean state)
                gsap.set(cards, { x: 0 });
                // We could add vertical scroll reveal animations here if desired
                const projectCards = cards.querySelectorAll(".project-card");
                projectCards.forEach((card) => {
                    gsap.fromTo(
                        card,
                        { y: 50, opacity: 0 },
                        {
                            y: 0,
                            opacity: 1,
                            duration: 0.8,
                            scrollTrigger: {
                                trigger: card,
                                start: "top 85%",
                            }
                        }
                    );
                });
            });

            return () => mm.revert();
        },
        { scope: sectionRef, dependencies: [] }
    );

    return (
        <section ref={sectionRef} className="relative">
            {/* Section header */}
            <div className="py-20 px-4 md:px-8 lg:px-16">
                <div className="max-w-7xl mx-auto">
                    <p className="text-nebula-purple font-mono text-sm mb-4 tracking-wider uppercase">
                        Featured Work
                    </p>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                        Real Projects and Case Studies
                    </h2>
                    <p className="text-xl text-gray-400 max-w-2xl">
                        A selection of projects showcasing expertise in WordPress development, from headless architectures to custom plugin solutions.
                    </p>
                </div>
            </div>

            {/* Horizontal scroll container */}
            <div ref={triggerRef} className="relative">
                <div
                    ref={containerRef}
                    className="overflow-hidden"
                >
                    <div
                        ref={cardsRef}
                        className="flex flex-col md:flex-row gap-8 md:gap-12 pl-4 md:pl-8 lg:pl-16 md:pr-[50vw]"
                        style={{ width: "fit-content" }}
                    >
                        {projects.map((project, index) => (
                            <ProjectCard
                                key={index}
                                title={project.title}
                                description={project.description}
                                image={project.image}
                                tags={project.tags}
                                index={index}
                                link={project.link}
                            />
                        ))}
                    </div>
                </div>

                {/* Scroll progress indicator */}
                <div className="absolute bottom-8 left-4 md:left-8 lg:left-16 right-4 md:right-8 lg:right-16">
                    <div className="max-w-7xl mx-auto flex items-center gap-4">
                        <span className="text-sm text-gray-500 font-mono">
                            {String(activeIndex + 1).padStart(2, "0")}
                        </span>
                        <div className="flex-1 h-[1px] bg-gray-800 relative overflow-hidden">
                            <div
                                className="scroll-progress absolute left-0 top-0 h-full bg-gradient-to-r from-nebula-purple to-nebula-blue"
                                style={{ width: "20%" }}
                            />
                        </div>
                        <span className="text-sm text-gray-500 font-mono">
                            {String(projects.length).padStart(2, "0")}
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
}
