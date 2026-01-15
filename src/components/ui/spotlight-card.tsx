import React, { useRef, useState } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface InteractiveCardProps extends HTMLMotionProps<"div"> {
    children: React.ReactNode;
    className?: string;
    spotlightColor?: string;
}

export const InteractiveCard = ({
    children,
    className = "",
    spotlightColor = "rgba(56, 189, 248, 0.15)",
    ...props
}: InteractiveCardProps) => {
    const containerRef = useRef<HTMLDivElement>(null);

    // Mouse coordinates for Spotlight
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Mouse coordinates for Tilt (normalized -0.5 to 0.5)
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Smooth springs for tilt
    const springX = useSpring(x, { stiffness: 300, damping: 30 });
    const springY = useSpring(y, { stiffness: 300, damping: 30 });

    const rotateX = useTransform(springY, [-0.5, 0.5], ["7deg", "-7deg"]);
    const rotateY = useTransform(springX, [-0.5, 0.5], ["-7deg", "7deg"]);

    function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
        if (!containerRef.current) return;
        const { left, top, width, height } = containerRef.current.getBoundingClientRect();

        // Update Spotlight coords
        mouseX.set(e.clientX - left);
        mouseY.set(e.clientY - top);

        // Update Tilt coords
        const xPct = (e.clientX - left) / width - 0.5;
        const yPct = (e.clientY - top) / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    }

    function handleMouseLeave() {
        x.set(0);
        y.set(0);
    }

    return (
        <motion.div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                transformStyle: "preserve-3d",
                rotateX,
                rotateY,
            }}
            className={cn(
                "group relative border border-white/10 bg-card/30 backdrop-blur-md overflow-hidden rounded-xl transition-colors duration-500 hover:bg-card/50 hover:border-primary/40",
                className
            )}
            {...props}
        >
            {/* Spotlight Layer */}
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-500 group-hover:opacity-100"
                style={{
                    background: useMotionTemplate`
            radial-gradient(
              600px circle at ${mouseX}px ${mouseY}px,
              ${spotlightColor},
              transparent 80%
            )
          `,
                }}
            />
            <div className="relative h-full z-10" style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }}>
                {children}
            </div>
        </motion.div>
    );
};
