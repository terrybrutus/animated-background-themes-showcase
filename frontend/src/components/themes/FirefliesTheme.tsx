import { useEffect, useRef } from 'react';

interface Firefly {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    pulseOffset: number;
    pulseSpeed: number;
}

export default function FirefliesTheme() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const firefliesRef = useRef<Firefly[]>([]);
    const animationRef = useRef<number | undefined>(undefined);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const resizeCanvas = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
            initFireflies();
        };

        const initFireflies = () => {
            firefliesRef.current = [];
            for (let i = 0; i < 35; i++) {
                firefliesRef.current.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    vx: (Math.random() - 0.5) * 0.3,
                    vy: (Math.random() - 0.5) * 0.3,
                    size: Math.random() * 2 + 2,
                    pulseOffset: Math.random() * Math.PI * 2,
                    pulseSpeed: Math.random() * 0.02 + 0.01
                });
            }
        };

        let time = 0;

        const animate = () => {
            time += 0.02;

            // Dark night background
            const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
            gradient.addColorStop(0, 'oklch(0.12 0.02 240)');
            gradient.addColorStop(1, 'oklch(0.08 0.01 240)');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            firefliesRef.current.forEach(firefly => {
                // Organic curved movement
                firefly.vx += (Math.random() - 0.5) * 0.02;
                firefly.vy += (Math.random() - 0.5) * 0.02;
                
                // Limit velocity
                const speed = Math.sqrt(firefly.vx * firefly.vx + firefly.vy * firefly.vy);
                if (speed > 0.5) {
                    firefly.vx = (firefly.vx / speed) * 0.5;
                    firefly.vy = (firefly.vy / speed) * 0.5;
                }

                firefly.x += firefly.vx;
                firefly.y += firefly.vy;

                // Wrap around edges
                if (firefly.x < 0) firefly.x = canvas.width;
                if (firefly.x > canvas.width) firefly.x = 0;
                if (firefly.y < 0) firefly.y = canvas.height;
                if (firefly.y > canvas.height) firefly.y = 0;

                // Pulsing glow
                const pulse = Math.sin(time * firefly.pulseSpeed + firefly.pulseOffset) * 0.5 + 0.5;
                const brightness = 0.3 + pulse * 0.7;

                const glowSize = firefly.size * (2 + pulse * 3);
                const gradient = ctx.createRadialGradient(
                    firefly.x, firefly.y, 0,
                    firefly.x, firefly.y, glowSize
                );
                gradient.addColorStop(0, `oklch(0.85 0.15 90 / ${brightness})`);
                gradient.addColorStop(0.3, `oklch(0.75 0.12 85 / ${brightness * 0.6})`);
                gradient.addColorStop(1, `oklch(0.6 0.08 80 / 0)`);

                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(firefly.x, firefly.y, glowSize, 0, Math.PI * 2);
                ctx.fill();
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
