import { useEffect, useRef } from 'react';

export default function CursorSpotlightTheme() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
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
        };

        const animate = () => {
            ctx.fillStyle = 'oklch(0.145 0 0)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            const gradient = ctx.createRadialGradient(
                mouseRef.current.x,
                mouseRef.current.y,
                0,
                mouseRef.current.x,
                mouseRef.current.y,
                200
            );
            gradient.addColorStop(0, 'oklch(0.646 0.222 41.116 / 0.6)');
            gradient.addColorStop(0.5, 'oklch(0.6 0.118 184.704 / 0.3)');
            gradient.addColorStop(1, 'oklch(0.145 0 0 / 0)');

            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

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
        mouseRef.current = { x: canvas.width / 2, y: canvas.height / 2 };
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
