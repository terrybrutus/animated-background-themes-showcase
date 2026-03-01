import { useEffect, useRef } from 'react';

interface Star {
    x: number;
    y: number;
    size: number;
    brightness: number;
    pulseOffset: number;
}

export default function ConstellationTheme() {
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
            const starCount = 60;
            for (let i = 0; i < starCount; i++) {
                starsRef.current.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    size: Math.random() * 2 + 1,
                    brightness: Math.random() * 0.5 + 0.5,
                    pulseOffset: Math.random() * Math.PI * 2
                });
            }
        };

        let time = 0;

        const animate = () => {
            time += 0.02;
            ctx.fillStyle = 'oklch(0.08 0 0)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Draw connections near cursor
            starsRef.current.forEach((star1, i) => {
                const dx1 = mouseRef.current.x - star1.x;
                const dy1 = mouseRef.current.y - star1.y;
                const dist1 = Math.sqrt(dx1 * dx1 + dy1 * dy1);

                if (dist1 < 150) {
                    starsRef.current.slice(i + 1).forEach(star2 => {
                        const dx2 = mouseRef.current.x - star2.x;
                        const dy2 = mouseRef.current.y - star2.y;
                        const dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);

                        if (dist2 < 150) {
                            const dx = star1.x - star2.x;
                            const dy = star1.y - star2.y;
                            const distance = Math.sqrt(dx * dx + dy * dy);

                            if (distance < 150) {
                                const alpha = (1 - Math.max(dist1, dist2) / 150) * 0.5;
                                ctx.beginPath();
                                ctx.moveTo(star1.x, star1.y);
                                ctx.lineTo(star2.x, star2.y);
                                ctx.strokeStyle = `oklch(0.7 0.15 220 / ${alpha})`;
                                ctx.lineWidth = 1;
                                ctx.stroke();
                            }
                        }
                    });
                }
            });

            // Draw stars
            starsRef.current.forEach(star => {
                const pulse = Math.sin(time + star.pulseOffset) * 0.3 + 0.7;
                const dx = mouseRef.current.x - star.x;
                const dy = mouseRef.current.y - star.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                const nearCursor = dist < 150 ? 1.5 : 1;

                const gradient = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.size * 3);
                gradient.addColorStop(0, `oklch(0.9 0.1 220 / ${star.brightness * pulse * nearCursor})`);
                gradient.addColorStop(1, `oklch(0.7 0.1 220 / 0)`);

                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.size * nearCursor, 0, Math.PI * 2);
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
