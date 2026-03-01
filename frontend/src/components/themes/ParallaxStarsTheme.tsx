import { useEffect, useRef } from 'react';

interface Star {
    x: number;
    y: number;
    z: number;
    size: number;
}

export default function ParallaxStarsTheme() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const starsRef = useRef<Star[]>([]);
    const mouseRef = useRef({ x: 0, y: 0 });
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
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    z: Math.random() * 3,
                    size: Math.random() * 2 + 0.5
                });
            }
        };

        const animate = () => {
            ctx.fillStyle = 'oklch(0.145 0 0)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;
            const offsetX = (mouseRef.current.x - centerX) * 0.02;
            const offsetY = (mouseRef.current.y - centerY) * 0.02;

            starsRef.current.forEach((star) => {
                const parallaxX = star.x + offsetX * star.z;
                const parallaxY = star.y + offsetY * star.z;

                ctx.beginPath();
                ctx.arc(parallaxX, parallaxY, star.size, 0, Math.PI * 2);
                ctx.fillStyle = `oklch(${0.8 + star.z * 0.1} 0 0 / ${0.5 + star.z * 0.3})`;
                ctx.fill();
            });

            animationRef.current = requestAnimationFrame(animate);
        };

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouseRef.current = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            };
        };

        const handleTouchMove = (e: TouchEvent) => {
            const rect = canvas.getBoundingClientRect();
            const touch = e.touches[0];
            mouseRef.current = {
                x: touch.clientX - rect.left,
                y: touch.clientY - rect.top
            };
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        canvas.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('touchmove', handleTouchMove);
        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            canvas.removeEventListener('mousemove', handleMouseMove);
            canvas.removeEventListener('touchmove', handleTouchMove);
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, []);

    return <canvas ref={canvasRef} className="w-full h-full" />;
}
