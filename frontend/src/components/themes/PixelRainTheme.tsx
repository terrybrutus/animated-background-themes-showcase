import { useEffect, useRef } from 'react';

interface Pixel {
    x: number;
    y: number;
    speed: number;
    color: string;
    alpha: number;
}

export default function PixelRainTheme() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const pixelsRef = useRef<Pixel[]>([]);
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

        const pixelSize = 8;
        const colors = [
            'oklch(0.7 0.25 0)',    // Red
            'oklch(0.7 0.25 60)',   // Yellow
            'oklch(0.7 0.25 120)',  // Green
            'oklch(0.7 0.25 180)',  // Cyan
            'oklch(0.7 0.25 240)',  // Blue
            'oklch(0.7 0.25 300)'   // Magenta
        ];

        const animate = () => {
            // Dark background with fade trail
            ctx.fillStyle = 'oklch(0.1 0 0 / 0.2)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Add new pixels
            if (Math.random() > 0.7) {
                const x = Math.floor(Math.random() * (canvas.width / pixelSize)) * pixelSize;
                pixelsRef.current.push({
                    x,
                    y: 0,
                    speed: Math.random() * 3 + 2,
                    color: colors[Math.floor(Math.random() * colors.length)],
                    alpha: 1
                });
            }

            // Update and draw pixels
            pixelsRef.current = pixelsRef.current.filter(pixel => {
                pixel.y += pixel.speed;
                pixel.alpha -= 0.01;

                if (pixel.y > canvas.height || pixel.alpha <= 0) {
                    return false;
                }

                ctx.fillStyle = pixel.color.replace(')', ` / ${pixel.alpha})`);
                ctx.fillRect(pixel.x, pixel.y, pixelSize, pixelSize);

                return true;
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
