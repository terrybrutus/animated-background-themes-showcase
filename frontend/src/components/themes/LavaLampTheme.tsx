import { useEffect, useRef } from 'react';

interface Blob {
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
    hue: number;
}

export default function LavaLampTheme() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const blobsRef = useRef<Blob[]>([]);
    const animationRef = useRef<number | undefined>(undefined);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const resizeCanvas = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
            initBlobs();
        };

        const initBlobs = () => {
            blobsRef.current = [];
            for (let i = 0; i < 6; i++) {
                blobsRef.current.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    vx: (Math.random() - 0.5) * 0.5,
                    vy: (Math.random() - 0.5) * 0.5,
                    radius: Math.random() * 40 + 40,
                    hue: Math.random() * 60 + 10 // Orange to red range
                });
            }
        };

        const animate = (time: number) => {
            const t = time * 0.001;

            // Gradient background
            const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
            gradient.addColorStop(0, 'oklch(0.25 0.1 40)');
            gradient.addColorStop(1, 'oklch(0.15 0.05 20)');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Update blob positions
            blobsRef.current.forEach((blob) => {
                blob.x += blob.vx;
                blob.y += blob.vy;

                // Bounce off edges
                if (blob.x < blob.radius || blob.x > canvas.width - blob.radius) {
                    blob.vx *= -1;
                }
                if (blob.y < blob.radius || blob.y > canvas.height - blob.radius) {
                    blob.vy *= -1;
                }

                // Add some floating motion
                blob.vy += Math.sin(t + blob.x * 0.01) * 0.01;
                blob.vx += Math.cos(t + blob.y * 0.01) * 0.01;

                // Limit velocity
                const speed = Math.sqrt(blob.vx * blob.vx + blob.vy * blob.vy);
                if (speed > 1) {
                    blob.vx = (blob.vx / speed) * 1;
                    blob.vy = (blob.vy / speed) * 1;
                }
            });

            // Draw blobs with metaball effect
            blobsRef.current.forEach((blob) => {
                const gradient = ctx.createRadialGradient(blob.x, blob.y, 0, blob.x, blob.y, blob.radius);
                gradient.addColorStop(0, `oklch(0.65 0.25 ${blob.hue})`);
                gradient.addColorStop(0.7, `oklch(0.55 0.2 ${blob.hue} / 0.8)`);
                gradient.addColorStop(1, `oklch(0.45 0.15 ${blob.hue} / 0)`);

                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(blob.x, blob.y, blob.radius, 0, Math.PI * 2);
                ctx.fill();
            });

            animationRef.current = requestAnimationFrame(animate);
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        animate(0);

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, []);

    return <canvas ref={canvasRef} className="w-full h-full" />;
}
