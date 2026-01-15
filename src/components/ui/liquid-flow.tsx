"use client";
import React, { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * LiquidFlow - A premium animated background that simulates the organic
 * movement of liquids/viscous fluids.
 * Includes a prominent glowing "bubble" that follows the mouse cursor.
 */
export const LiquidFlow = ({ className }: { className?: string }) => {
    const containerRef = useRef<HTMLDivElement>(null);

    // Mouse tracking
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth spring physics for a high-end feel
    const springX = useSpring(mouseX, { stiffness: 40, damping: 25 });
    const springY = useSpring(mouseY, { stiffness: 40, damping: 25 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            mouseX.set(e.clientX - rect.left);
            mouseY.set(e.clientY - rect.top);
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    return (
        <div
            ref={containerRef}
            className={cn("absolute inset-0 z-0 overflow-hidden pointer-events-none", className)}
        >
            {/* Gooey Filter */}
            <svg className="hidden">
                <defs>
                    <filter id="liquid-goo-advanced">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="30" result="blur" />
                        <feColorMatrix
                            in="blur"
                            mode="matrix"
                            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 40 -15"
                            result="goo"
                        />
                        <feComposite in="SourceGraphic" in2="goo" operator="atop" />
                    </filter>
                </defs>
            </svg>

            {/* Main Liquid Layer */}
            <div
                className="absolute inset-0 opacity-60"
                style={{ filter: "url(#liquid-goo-advanced)" }}
            >
                {/* Interactive Glowing "Attraction" Bubble */}
                <motion.div
                    className="absolute rounded-full bg-primary/40 blur-3xl"
                    style={{
                        width: "500px",
                        height: "500px",
                        x: springX,
                        y: springY,
                        translateX: "-50%",
                        translateY: "-50%",
                    }}
                />

                {/* Dynamic Fluid Blobs */}
                {[...Array(6)].map((_, i) => (
                    <motion.div
                        key={i}
                        className={cn(
                            "absolute rounded-full",
                            i % 3 === 0 ? "bg-primary/30" : i % 3 === 1 ? "bg-accent/25" : "bg-blue-500/10"
                        )}
                        style={{
                            width: `${400 + Math.random() * 400}px`,
                            height: `${400 + Math.random() * 400}px`,
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            translateX: "-50%",
                            translateY: "-50%",
                        }}
                        animate={{
                            x: [0, Math.random() * 500 - 250, Math.random() * 500 - 250, 0],
                            y: [0, Math.random() * 500 - 250, Math.random() * 500 - 250, 0],
                            scale: [1, 1.4, 0.7, 1.2, 1],
                        }}
                        transition={{
                            duration: 30 + i * 10,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />
                ))}
            </div>

            {/* Surface Sparkles/Reflections */}
            <div className="absolute inset-0 opacity-30 mix-blend-overlay">
                {[...Array(15)].map((_, i) => (
                    <motion.div
                        key={`sparkle-${i}`}
                        className="absolute bg-white rounded-full blur-[1px]"
                        style={{
                            width: `${Math.random() * 4 + 2}px`,
                            height: `${Math.random() * 4 + 2}px`,
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            opacity: [0, 1, 0],
                            scale: [0.5, 1.5, 0.5],
                            y: [0, -30, 0],
                        }}
                        transition={{
                            duration: 3 + Math.random() * 4,
                            repeat: Infinity,
                            delay: Math.random() * 10,
                        }}
                    />
                ))}
            </div>

            {/* Layered Gradients for Polish */}
            <div className="absolute inset-0 bg-gradient-to-b from-background via-background/40 to-background" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_transparent_0%,_var(--background)_100%)] opacity-70" />

            {/* Scroll Transition */}
            <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-background to-transparent" />
        </div>
    );
};
