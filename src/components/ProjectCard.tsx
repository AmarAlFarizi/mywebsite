"use client";

import { useRef } from "react";
import Image from "next/image";

interface ProjectCardProps {
    title: string;
    description?: string;
    image: string;
    tags: string[];
    index: number;
    link?: string;
}

export default function ProjectCard({
    title,
    description,
    image,
    tags,
    index,
    link,
}: ProjectCardProps & { link?: string }) {
    const cardRef = useRef<any>(null);

    const CardTag = link ? "a" : "div";
    const linkProps = link ? { href: link, target: "_blank", rel: "noopener noreferrer" } : {};

    return (
        <CardTag
            ref={cardRef}
            {...linkProps}
            className="project-card relative flex-shrink-0 w-[400px] md:w-[500px] lg:w-[600px] h-[450px] md:h-[500px] lg:h-[550px] rounded-3xl overflow-hidden group cursor-pointer block text-left"
            style={{
                // Glassmorphism effect
                background: "rgba(255, 255, 255, 0.03)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                boxShadow: `
          0 8px 32px rgba(0, 0, 0, 0.3),
          inset 0 0 0 1px rgba(255, 255, 255, 0.05)
        `,
            }}
        >
            {/* Image container */}
            <div className="relative w-full h-[60%] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-space-black/80 z-10" />
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Project number badge */}
                <div className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
                    <span className="text-sm font-mono text-white/70">
                        {String(index + 1).padStart(2, "0")}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                    {tags.map((tag, i) => (
                        <span
                            key={i}
                            className="px-3 py-1 text-xs font-medium rounded-full bg-nebula-purple/20 text-nebula-purple border border-nebula-purple/30 backdrop-blur-sm"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Title */}
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 group-hover:text-gradient transition-all duration-300">
                    {title}
                </h3>

                {/* Description */}
                {description && (
                    <p className="text-gray-400 text-sm md:text-base line-clamp-2">
                        {description}
                    </p>
                )}

                {/* View project indicator */}
                <div className="mt-4 flex items-center gap-2 text-sm text-gray-500 group-hover:text-nebula-purple transition-colors duration-300">
                    <span>View Project</span>
                    <svg
                        className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                    </svg>
                </div>
            </div>

            {/* Hover glow effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-br from-nebula-purple/10 via-transparent to-nebula-blue/10" />
            </div>
        </CardTag>
    );
}
