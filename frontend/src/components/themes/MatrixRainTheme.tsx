import { useEffect, useRef } from 'react';

export default function MatrixRainTheme() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationRef = useRef<number | undefined>(undefined);
    const dropsRef = useRef<number[]>([]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const fontSize = 14;
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()';

        const resizeCanvas = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
            const columns = Math.floor(canvas.width / fontSize);
            dropsRef.current = Array(columns).fill(1);
        };

        const animate = () => {
            ctx.fillStyle = 'oklch(0.145 0 0 / 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = 'oklch(0.696 0.17 162.48)';
            ctx.font = `${fontSize}px monospace`;

            dropsRef.current.forEach((y, i) => {
                const text = chars[Math.floor(Math.random() * chars.length)];
                const x = i * fontSize;

                ctx.fillText(text, x, y * fontSize);

                if (y * fontSize > canvas.height && Math.random() > 0.975) {
                    dropsRef.current[i] = 0;
                }

                dropsRef.current[i]++;
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
