import { useEffect, useRef } from 'react';

export default function BreathingCirclesTheme() {
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

        let time = 0;

        const animate = () => {
            time += 0.015;

            // Light background
            ctx.fillStyle = 'oklch(0.95 0.01 240)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;
            const breathe = Math.sin(time) * 0.3 + 0.7; // 0.4 to 1.0

            const numCircles = 8;
            const maxRadius = Math.min(canvas.width, canvas.height) * 0.35;

            for (let i = 0; i < numCircles; i++) {
                const radius = (maxRadius / numCircles) * (i + 1) * breathe;
                const alpha = 0.6 - (i / numCircles) * 0.4;

                ctx.beginPath();
                ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
                ctx.strokeStyle = `oklch(0.5 0.1 ${240 + i * 10} / ${alpha})`;
                ctx.lineWidth = 2;
                ctx.stroke();
            }

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
