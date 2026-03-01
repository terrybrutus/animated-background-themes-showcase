import { useEffect, useRef } from 'react';

export default function ZenGardenTheme() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationRef = useRef<number | undefined>(undefined);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const resizeCanvas = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        };

        const stones = [
            { x: 0.3, y: 0.4, radius: 40 },
            { x: 0.6, y: 0.5, radius: 30 },
            { x: 0.5, y: 0.7, radius: 25 }
        ];

        const animate = (time: number) => {
            const t = time * 0.0005;

            ctx.fillStyle = 'oklch(0.88 0.02 60)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            stones.forEach((stone) => {
                const x = stone.x * canvas.width;
                const y = stone.y * canvas.height;

                // Draw stone
                ctx.fillStyle = 'oklch(0.5 0.02 40)';
                ctx.beginPath();
                ctx.arc(x, y, stone.radius, 0, Math.PI * 2);
                ctx.fill();

                // Draw ripples around stone
                for (let i = 1; i <= 5; i++) {
                    const rippleRadius = stone.radius + i * 15 + Math.sin(t + i * 0.5) * 3;
                    const opacity = 0.3 - i * 0.05;

                    ctx.beginPath();
                    ctx.arc(x, y, rippleRadius, 0, Math.PI * 2);
                    ctx.strokeStyle = `oklch(0.6 0.02 40 / ${opacity})`;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }

                // Additional circular patterns
                for (let i = 6; i <= 10; i++) {
                    const rippleRadius = stone.radius + i * 15;
                    const opacity = 0.15 - (i - 6) * 0.03;

                    ctx.beginPath();
                    ctx.arc(x, y, rippleRadius, 0, Math.PI * 2);
                    ctx.strokeStyle = `oklch(0.65 0.02 40 / ${opacity})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
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
