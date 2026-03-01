import { useEffect, useRef } from 'react';

export default function MagneticFieldTheme() {
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
            mouseRef.current = { x: canvas.width / 2, y: canvas.height / 2 };
        };

        const drawFieldLine = (startX: number, startY: number, direction: number) => {
            const points: { x: number; y: number }[] = [];
            let x = startX;
            let y = startY;

            for (let i = 0; i < 100; i++) {
                const dx = mouseRef.current.x - x;
                const dy = mouseRef.current.y - y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 50) break;

                const force = 200 / (dist * dist);
                const angle = Math.atan2(dy, dx);

                x += Math.cos(angle + direction) * 5 + Math.cos(angle) * force * 10;
                y += Math.sin(angle + direction) * 5 + Math.sin(angle) * force * 10;

                points.push({ x, y });

                if (x < 0 || x > canvas.width || y < 0 || y > canvas.height) break;
            }

            if (points.length > 1) {
                ctx.beginPath();
                ctx.moveTo(startX, startY);
                points.forEach((p, i) => {
                    ctx.lineTo(p.x, p.y);
                    const hue = (i * 2) % 360;
                    const opacity = 1 - i / points.length;
                    ctx.strokeStyle = `oklch(0.65 0.2 ${hue} / ${opacity * 0.6})`;
                    ctx.lineWidth = 2;
                    ctx.stroke();
                    if (i < points.length - 1) {
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                    }
                });
            }
        };

        const animate = () => {
            ctx.fillStyle = 'oklch(0.12 0 0)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Draw field lines from edges
            const lineCount = 15;
            for (let i = 0; i < lineCount; i++) {
                const t = i / lineCount;

                // From left
                drawFieldLine(0, t * canvas.height, 0);
                // From right
                drawFieldLine(canvas.width, t * canvas.height, Math.PI);
                // From top
                drawFieldLine(t * canvas.width, 0, Math.PI / 2);
                // From bottom
                drawFieldLine(t * canvas.width, canvas.height, -Math.PI / 2);
            }

            // Draw cursor position
            ctx.beginPath();
            ctx.arc(mouseRef.current.x, mouseRef.current.y, 10, 0, Math.PI * 2);
            ctx.fillStyle = 'oklch(0.8 0.25 180)';
            ctx.fill();

            ctx.beginPath();
            ctx.arc(mouseRef.current.x, mouseRef.current.y, 15, 0, Math.PI * 2);
            ctx.strokeStyle = 'oklch(0.8 0.25 180 / 0.5)';
            ctx.lineWidth = 2;
            ctx.stroke();

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
