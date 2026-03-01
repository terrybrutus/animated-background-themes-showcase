import { useEffect, useRef } from 'react';

interface Ripple {
    x: number;
    y: number;
    radius: number;
    maxRadius: number;
    alpha: number;
}

export default function RippleEffectTheme() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const ripplesRef = useRef<Ripple[]>([]);
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

        const createRipple = (x: number, y: number) => {
            ripplesRef.current.push({
                x,
                y,
                radius: 0,
                maxRadius: 200,
                alpha: 1
            });
        };

        const animate = () => {
            // Gradient background
            const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
            gradient.addColorStop(0, 'oklch(0.3 0.1 240)');
            gradient.addColorStop(1, 'oklch(0.2 0.08 220)');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Update and draw ripples
            ripplesRef.current = ripplesRef.current.filter(ripple => {
                ripple.radius += 2;
                ripple.alpha = 1 - (ripple.radius / ripple.maxRadius);

                if (ripple.alpha <= 0) return false;

                // Draw multiple concentric circles
                for (let i = 0; i < 3; i++) {
                    const r = ripple.radius - i * 15;
                    if (r > 0) {
                        ctx.beginPath();
                        ctx.arc(ripple.x, ripple.y, r, 0, Math.PI * 2);
                        const hue = 200 + (ripple.radius / ripple.maxRadius) * 60;
                        ctx.strokeStyle = `oklch(0.7 0.15 ${hue} / ${ripple.alpha * 0.6})`;
                        ctx.lineWidth = 2;
                        ctx.stroke();
                    }
                }

                return true;
            });

            animationRef.current = requestAnimationFrame(animate);
        };

        const handleClick = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            createRipple(e.clientX - rect.left, e.clientY - rect.top);
        };

        const handleTouch = (e: TouchEvent) => {
            e.preventDefault();
            const rect = canvas.getBoundingClientRect();
            const touch = e.touches[0];
            createRipple(touch.clientX - rect.left, touch.clientY - rect.top);
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        canvas.addEventListener('click', handleClick);
        canvas.addEventListener('touchstart', handleTouch);
        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            canvas.removeEventListener('click', handleClick);
            canvas.removeEventListener('touchstart', handleTouch);
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, []);

    return <canvas ref={canvasRef} className="w-full h-full" />;
}
