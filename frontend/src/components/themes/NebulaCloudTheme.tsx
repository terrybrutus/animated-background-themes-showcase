import { useEffect, useRef } from 'react';

export default function NebulaCloudTheme() {
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

        const stars: { x: number; y: number; size: number; opacity: number }[] = [];
        for (let i = 0; i < 100; i++) {
            stars.push({
                x: Math.random(),
                y: Math.random(),
                size: Math.random() * 2,
                opacity: Math.random() * 0.5 + 0.3
            });
        }

        const animate = (time: number) => {
            const t = time * 0.0003;

            ctx.fillStyle = 'oklch(0.08 0 0)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Draw stars
            stars.forEach((star) => {
                ctx.beginPath();
                ctx.arc(star.x * canvas.width, star.y * canvas.height, star.size, 0, Math.PI * 2);
                ctx.fillStyle = `oklch(0.9 0 0 / ${star.opacity})`;
                ctx.fill();
            });

            // Draw nebula clouds
            const cloudCount = 5;
            for (let i = 0; i < cloudCount; i++) {
                const centerX = canvas.width * (0.3 + Math.sin(t * 0.5 + i) * 0.2);
                const centerY = canvas.height * (0.4 + Math.cos(t * 0.3 + i) * 0.2);

                for (let j = 0; j < 3; j++) {
                    const offsetX = Math.sin(t + i + j) * 80;
                    const offsetY = Math.cos(t * 0.8 + i + j) * 60;
                    const radius = 100 + Math.sin(t * 0.5 + i + j) * 30;

                    const gradient = ctx.createRadialGradient(
                        centerX + offsetX,
                        centerY + offsetY,
                        0,
                        centerX + offsetX,
                        centerY + offsetY,
                        radius
                    );

                    const hue = (i * 60 + j * 30 + t * 20) % 360;
                    gradient.addColorStop(0, `oklch(0.6 0.25 ${hue} / 0.3)`);
                    gradient.addColorStop(0.5, `oklch(0.5 0.2 ${hue} / 0.15)`);
                    gradient.addColorStop(1, `oklch(0.4 0.15 ${hue} / 0)`);

                    ctx.fillStyle = gradient;
                    ctx.beginPath();
                    ctx.arc(centerX + offsetX, centerY + offsetY, radius, 0, Math.PI * 2);
                    ctx.fill();
                }
            }

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
