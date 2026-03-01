import { useEffect, useRef } from 'react';

export default function GradientWaveTheme() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationRef = useRef<number | undefined>(undefined);
    const timeRef = useRef(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const resizeCanvas = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        };

        const animate = () => {
            timeRef.current += 0.01;

            const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
            gradient.addColorStop(0, `oklch(0.488 0.243 ${(264.376 + timeRef.current * 20) % 360})`);
            gradient.addColorStop(0.5, `oklch(0.696 0.17 ${(162.48 + timeRef.current * 15) % 360})`);
            gradient.addColorStop(1, `oklch(0.769 0.188 ${(70.08 + timeRef.current * 10) % 360})`);

            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            for (let i = 0; i < 3; i++) {
                ctx.beginPath();
                ctx.moveTo(0, canvas.height / 2);

                for (let x = 0; x <= canvas.width; x += 5) {
                    const y =
                        canvas.height / 2 +
                        Math.sin((x / canvas.width) * Math.PI * 4 + timeRef.current + i) * (30 + i * 20);
                    ctx.lineTo(x, y);
                }

                ctx.lineTo(canvas.width, canvas.height);
                ctx.lineTo(0, canvas.height);
                ctx.closePath();

                ctx.fillStyle = `oklch(0.145 0 0 / ${0.3 - i * 0.1})`;
                ctx.fill();
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
