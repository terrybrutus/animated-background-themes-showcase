import { useEffect, useRef } from 'react';

export default function NeonGridTheme() {
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

        let offset = 0;

        const animate = () => {
            // Background gradient
            const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
            gradient.addColorStop(0, 'oklch(0.15 0.05 280)');
            gradient.addColorStop(1, 'oklch(0.08 0.03 320)');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            offset += 2;

            const gridSize = 40;
            const perspective = 0.5;
            const horizonY = canvas.height * 0.4;

            // Draw horizontal lines
            for (let i = 0; i < 15; i++) {
                const y = horizonY + (i * gridSize) + (offset % gridSize);
                const scale = (y - horizonY) / canvas.height;
                const lineWidth = 1 + scale * 2;
                
                const pulse = Math.sin(offset * 0.05 + i * 0.3) * 0.3 + 0.7;
                const alpha = 0.3 + scale * 0.5;

                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(canvas.width, y);
                ctx.strokeStyle = `oklch(0.7 0.25 320 / ${alpha * pulse})`;
                ctx.lineWidth = lineWidth;
                ctx.shadowBlur = 10;
                ctx.shadowColor = `oklch(0.7 0.25 320 / ${alpha})`;
                ctx.stroke();
                ctx.shadowBlur = 0;
            }

            // Draw vertical lines with perspective
            const numVertical = 20;
            for (let i = -numVertical / 2; i <= numVertical / 2; i++) {
                const xTop = canvas.width / 2 + i * 20;
                const xBottom = canvas.width / 2 + i * gridSize * 2;
                
                const pulse = Math.sin(offset * 0.05 + i * 0.2) * 0.3 + 0.7;

                ctx.beginPath();
                ctx.moveTo(xTop, horizonY);
                ctx.lineTo(xBottom, canvas.height);
                ctx.strokeStyle = `oklch(0.65 0.25 280 / ${0.4 * pulse})`;
                ctx.lineWidth = 1.5;
                ctx.shadowBlur = 8;
                ctx.shadowColor = `oklch(0.65 0.25 280 / 0.4)`;
                ctx.stroke();
                ctx.shadowBlur = 0;
            }

            // Draw stars
            for (let i = 0; i < 50; i++) {
                const x = (i * 137.5) % canvas.width;
                const y = (i * 73.3) % horizonY;
                const size = Math.random() * 1.5;
                
                ctx.fillStyle = `oklch(0.9 0.1 280 / ${0.3 + Math.random() * 0.4})`;
                ctx.fillRect(x, y, size, size);
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
