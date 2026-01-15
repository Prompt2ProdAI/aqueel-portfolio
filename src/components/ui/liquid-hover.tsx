"use client";
import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

interface LiquidHoverProps {
    children: React.ReactNode;
    className?: string;
    blobColor?: string;
}

export const LiquidHover = ({
    children,
    className,
    blobColor = "bg-primary/20"
}: LiquidHoverProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const [isHovered, setIsHovered] = useState(false);

    const springConfig = { stiffness: 60, damping: 20 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
    };

    return (
        <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={cn("relative inline-block group px-12 py-8 rounded-[4rem]", className)}
        >
            {/* Liquid Gooey Background */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[inherit]">
                <svg className="absolute w-0 h-0">
                    <defs>
                        <filter id="hero-liquid-goo">
                            <feGaussianBlur in="SourceGraphic" stdDeviation="25" result="blur" />
                            <feColorMatrix
                                in="blur"
                                mode="matrix"
                                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 30 -15"
                                result="goo"
                            />
                            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
                        </filter>
                    </defs>
                </svg>

                <div
                    style={{ filter: "url(#hero-liquid-goo)" }}
                    className={cn(
                        "absolute inset-0 w-full h-full transition-opacity duration-1000",
                        isHovered ? "opacity-100" : "opacity-0"
                    )}
                >
                    {[...Array(4)].map((_, i) => (
                        <motion.div
                            key={i}
                            className={cn("absolute rounded-full blur-xl", blobColor)}
                            style={{
                                width: 100 + i * 30,
                                height: 100 + i * 30,
                                x: springX,
                                y: springY,
                                translateX: "-50%",
                                translateY: "-50%",
                                left: 0,
                                top: 0,
                            }}
                            animate={{
                                scale: [1, 1.4, 0.8, 1.2, 1],
                                rotate: [0, 90, 180, 270, 360],
                            }}
                            transition={{
                                duration: 6 + i,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        />
                    ))}
                </div>
            </div>

            {/* Content */}
            <div className="relative z-10">
                {children}
            </div>
        </div>
    );
};
