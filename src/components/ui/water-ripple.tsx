"use client";
import React, { useRef, useEffect, useState } from "react";

interface WaterRippleProps {
    className?: string;
}

export const WaterRippleEffect = ({ className }: WaterRippleProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        const rippleSettings = {
            damping: 0.98,
            strength: 512,
        };

        let size = width * height;
        let buffer1 = new Int32Array(size);
        let buffer2 = new Int32Array(size);
        let temp;

        const ripple = (x: number, y: number) => {
            // Create a ripple at x, y
            const index = x + y * width;
            buffer1[index] += rippleSettings.strength;
        };

        const update = () => {
            const imgData = ctx.createImageData(width, height);
            const data = imgData.data;

            for (let i = width; i < size - width; i++) {
                // Simple Ripple Algorithm
                buffer2[i] = (
                    (buffer1[i - 1] +
                        buffer1[i + 1] +
                        buffer1[i - width] +
                        buffer1[i + width]) >> 1
                ) - buffer2[i];

                buffer2[i] = (buffer2[i] * rippleSettings.damping) | 0;

                // Visual mapping
                let val = buffer2[i];
                if (val !== 0) {
                    const pixelIdx = i * 4;
                    // Calculate displacement-based color/alpha
                    // We use the ripple value to shift colors/alpha slightly 
                    // to simulate water refractance
                    data[pixelIdx] = 56;     // R
                    data[pixelIdx + 1] = 189; // G
                    data[pixelIdx + 2] = 248; // B
                    data[pixelIdx + 3] = Math.min(Math.abs(val), 40); // Soft alpha based on wave height
                }
            }

            temp = buffer1;
            buffer1 = buffer2;
            buffer2 = temp;

            ctx.putImageData(imgData, 0, 0);
        };

        let animationId: number;
        const loop = () => {
            update();
            animationId = requestAnimationFrame(loop);
        };

        const handleMouseMove = (e: MouseEvent) => {
            const x = Math.floor(e.clientX);
            const y = Math.floor(e.clientY);
            if (x > 0 && x < width - 1 && y > 0 && y < height - 1) {
                // Create multiple points for a thicker 'wake'
                ripple(x, y);
                ripple(x + 1, y);
                ripple(x, y + 1);
            }
        };

        const handleResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            size = width * height;
            buffer1 = new Int32Array(size);
            buffer2 = new Int32Array(size);
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("resize", handleResize);
        loop();

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("resize", handleResize);
            cancelAnimationFrame(animationId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className={className}
            style={{
                pointerEvents: "none",
                mixBlendMode: "screen",
            }}
        />
    );
};
