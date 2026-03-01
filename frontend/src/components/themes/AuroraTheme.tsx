import { useEffect, useRef } from 'react';

export default function AuroraTheme() {
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
            timeRef.current += 0.005;

            ctx.fillStyle = 'oklch(0.145 0 0)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            for (let i = 0; i < 5; i++) {
                ctx.beginPath();
                ctx.moveTo(0, canvas.height / 2);

                for (let x = 0; x <= canvas.width; x += 10) {
                    const y =
                        canvas.height / 2 +
                        Math.sin((x / canvas.width) * Math.PI * 3 + timeRef.current * 2 + i * 0.5) * (50 + i * 15) +
                        Math.sin((x / canvas.width) * Math.PI * 5 + timeRef.current + i) * 20;
                    ctx.lineTo(x, y);
                }

                ctx.lineTo(canvas.width, canvas.height);
                ctx.lineTo(0, canvas.height);
                ctx.closePath();

                const hue = (120 + i * 30 + timeRef.current * 20) % 360;
                ctx.fillStyle = `oklch(0.6 0.2 ${hue} / ${0.15 - i * 0.02})`;
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
