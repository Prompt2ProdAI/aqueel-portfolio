"use client";
import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * A premium liquid background effect that simulates moving water.
 * Includes surface ripples, deep currents, and light refraction.
 */
export const LiquidWater = ({ className }: { className?: string }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let width = (canvas.width = window.innerWidth);
        let height = (canvas.height = window.innerHeight);

        // Liquid particles for current flow
        interface Particle {
            x: number;
            y: number;
            vx: number;
            vy: number;
            size: number;
            color: string;
            alpha: number;
        }

        let particles: Particle[] = [];
        const particleCount = 60;

        const initParticles = () => {
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                particles.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    vx: (Math.random() - 0.5) * 0.5,
                    vy: Math.random() * 0.8 + 0.2, // Move downwards
                    size: Math.random() * 200 + 100,
                    color: i % 2 === 0 ? "rgba(56, 189, 248, 0.05)" : "rgba(30, 58, 138, 0.03)",
                    alpha: Math.random() * 0.5 + 0.1,
                });
            }
        };

        initParticles();

        // Wave parameters
        let time = 0;
        const waves = [
            { amplitude: 20, frequency: 0.012, speed: 0.02 },
            { amplitude: 15, frequency: 0.015, speed: -0.015 },
            { amplitude: 10, frequency: 0.02, speed: 0.01 },
        ];

        const draw = () => {
            time += 0.01;
            ctx.clearRect(0, 0, width, height);

            // 1. Draw Background Flow Particles
            particles.forEach((p) => {
                p.y += p.vy;
                p.x += Math.sin(time + p.y * 0.01) * 0.5;

                if (p.y > height + p.size) p.y = -p.size;
                if (p.x > width + p.size) p.x = -p.size;
                if (p.x < -p.size) p.x = width + p.size;

                const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
                gradient.addColorStop(0, p.color);
                gradient.addColorStop(1, "rgba(0,0,0,0)");

                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
            });

            // 2. Surface Caustics / Light Refraction
            ctx.globalCompositeOperation = "screen";
            ctx.strokeStyle = "rgba(56, 189, 248, 0.08)";
            ctx.lineWidth = 1;

            for (let i = 0; i < 5; i++) {
                ctx.beginPath();
                for (let x = 0; x <= width; x += 20) {
                    let y = 0;
                    waves.forEach((w, index) => {
                        y += Math.sin(x * w.frequency + time * w.speed + i + index) * w.amplitude;
                    });
                    // Distribute across the height
                    const yPos = (height / 6) * i + height / 8 + y;
                    if (x === 0) ctx.moveTo(x, yPos);
                    else ctx.lineTo(x, yPos);
                }
                ctx.stroke();
            }
            ctx.globalCompositeOperation = "source-over";

            requestAnimationFrame(draw);
        };

        draw();

        const handleResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            initParticles();
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className={cn("absolute inset-0 z-0 overflow-hidden pointer-events-none", className)}>
            {/* Base Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background/90" />

            {/* Animated Liquid Canvas */}
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-60" />

            {/* Surface Sparkles */}
            <div className="absolute inset-0">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute rounded-full bg-primary/20 blur-[1px]"
                        style={{
                            width: Math.random() * 4 + 2,
                            height: Math.random() * 4 + 2,
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            opacity: [0, 0.8, 0],
                            scale: [0.5, 1.2, 0.5],
                            y: [0, -20, 0],
                        }}
                        transition={{
                            duration: 2 + Math.random() * 3,
                            repeat: Infinity,
                            delay: Math.random() * 5,
                        }}
                    />
                ))}
            </div>

            {/* Bottom Wave Transition */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent" />

            {/* SVG Wave */}
            <svg
                className="absolute bottom-0 left-0 w-full h-24 mb-[-1px] text-background"
                viewBox="0 0 1440 320"
                preserveAspectRatio="none"
            >
                <motion.path
                    animate={{
                        d: [
                            "M0,160L48,176C96,192,192,224,288,224C384,224,480,192,576,165.3C672,139,768,117,864,128C960,139,1056,181,1152,197.3C1248,213,1344,203,1392,197.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
                            "M0,160L48,144C96,128,192,96,288,106.7C384,117,480,171,576,181.3C672,192,768,160,864,138.7C960,117,1056,107,1152,128C1248,149,1344,203,1392,229.3L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
                            "M0,160L48,176C96,192,192,224,288,224C384,224,480,192,576,165.3C672,139,768,117,864,128C960,139,1056,181,1152,197.3C1248,213,1344,203,1392,197.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                        ]
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    fill="currentColor"
                />
            </svg>
        </div>
    );
};
