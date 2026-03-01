import { useEffect, useRef } from 'react';

export default function GeometricPatternsTheme() {
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

            ctx.fillStyle = 'oklch(0.145 0 0)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            const gridSize = 60;
            const cols = Math.ceil(canvas.width / gridSize);
            const rows = Math.ceil(canvas.height / gridSize);

            for (let i = 0; i < cols; i++) {
                for (let j = 0; j < rows; j++) {
                    const x = i * gridSize;
                    const y = j * gridSize;
                    const rotation = timeRef.current + (i + j) * 0.1;

                    ctx.save();
                    ctx.translate(x + gridSize / 2, y + gridSize / 2);
                    ctx.rotate(rotation);

                    const hue = ((i + j) * 30 + timeRef.current * 50) % 360;
                    ctx.fillStyle = `oklch(0.6 0.15 ${hue} / 0.3)`;
                    ctx.fillRect(-gridSize / 4, -gridSize / 4, gridSize / 2, gridSize / 2);

                    ctx.strokeStyle = `oklch(0.8 0.1 ${hue} / 0.5)`;
                    ctx.lineWidth = 2;
                    ctx.strokeRect(-gridSize / 4, -gridSize / 4, gridSize / 2, gridSize / 2);

                    ctx.restore();
                }
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
