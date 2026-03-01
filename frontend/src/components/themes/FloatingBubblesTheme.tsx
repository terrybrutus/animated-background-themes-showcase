import { useEffect, useRef } from 'react';

interface Bubble {
    x: number;
    y: number;
    radius: number;
    vx: number;
    vy: number;
    hue: number;
}

export default function FloatingBubblesTheme() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const bubblesRef = useRef<Bubble[]>([]);
    const animationRef = useRef<number | undefined>(undefined);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const resizeCanvas = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
            initBubbles();
        };

        const initBubbles = () => {
            bubblesRef.current = [];
            for (let i = 0; i < 15; i++) {
                bubblesRef.current.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    radius: Math.random() * 40 + 20,
                    vx: (Math.random() - 0.5) * 0.5,
                    vy: (Math.random() - 0.5) * 0.5,
                    hue: Math.random() * 360
                });
            }
        };

        const animate = () => {
            ctx.fillStyle = 'oklch(0.145 0 0)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            bubblesRef.current.forEach((bubble) => {
                bubble.x += bubble.vx;
                bubble.y += bubble.vy;

                if (bubble.x - bubble.radius < 0 || bubble.x + bubble.radius > canvas.width) {
                    bubble.vx *= -1;
                }
                if (bubble.y - bubble.radius < 0 || bubble.y + bubble.radius > canvas.height) {
                    bubble.vy *= -1;
                }

                const gradient = ctx.createRadialGradient(
                    bubble.x - bubble.radius * 0.3,
                    bubble.y - bubble.radius * 0.3,
                    0,
                    bubble.x,
                    bubble.y,
                    bubble.radius
                );
                gradient.addColorStop(0, `oklch(0.8 0.15 ${bubble.hue} / 0.6)`);
                gradient.addColorStop(1, `oklch(0.5 0.1 ${bubble.hue} / 0.2)`);

                ctx.beginPath();
                ctx.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2);
                ctx.fillStyle = gradient;
                ctx.fill();

                ctx.strokeStyle = `oklch(0.9 0.05 ${bubble.hue} / 0.4)`;
                ctx.lineWidth = 2;
                ctx.stroke();
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
