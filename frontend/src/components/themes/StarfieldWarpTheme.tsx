import { useEffect, useRef } from 'react';

interface Star {
    x: number;
    y: number;
    z: number;
    prevX?: number;
    prevY?: number;
}

export default function StarfieldWarpTheme() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const starsRef = useRef<Star[]>([]);
    const animationRef = useRef<number | undefined>(undefined);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const resizeCanvas = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
            initStars();
        };

        const initStars = () => {
            starsRef.current = [];
            for (let i = 0; i < 200; i++) {
                starsRef.current.push({
                    x: (Math.random() - 0.5) * 2,
                    y: (Math.random() - 0.5) * 2,
                    z: Math.random()
                });
            }
        };

        const animate = () => {
            // Black background with fade trail
            ctx.fillStyle = 'oklch(0 0 0 / 0.3)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;
            const speed = 0.02;

            starsRef.current.forEach(star => {
                star.prevX = star.x / star.z * centerX + centerX;
                star.prevY = star.y / star.z * centerY + centerY;

                star.z -= speed;

                if (star.z <= 0) {
                    star.x = (Math.random() - 0.5) * 2;
                    star.y = (Math.random() - 0.5) * 2;
                    star.z = 1;
                    star.prevX = undefined;
                    star.prevY = undefined;
                }

                const x = star.x / star.z * centerX + centerX;
                const y = star.y / star.z * centerY + centerY;
                const size = (1 - star.z) * 3;

                // Draw star trail
                if (star.prevX !== undefined && star.prevY !== undefined) {
                    ctx.beginPath();
                    ctx.moveTo(star.prevX, star.prevY);
                    ctx.lineTo(x, y);
                    ctx.strokeStyle = `oklch(0.95 0.05 240 / ${1 - star.z})`;
                    ctx.lineWidth = size;
                    ctx.stroke();
                }

                // Draw star point
                ctx.fillStyle = `oklch(0.98 0.02 240 / ${1 - star.z})`;
                ctx.fillRect(x - size / 2, y - size / 2, size, size);
            });

            animationRef.current = requestAnimationFrame(animate);
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, []);

    return <canvas ref={canvasRef} className="w-full h-full" />;
}
