import { useEffect, useRef } from 'react';

export default function HologramScanTheme() {
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

        let scanY = 0;
        let glitchOffset = 0;

        const animate = (time: number) => {
            const t = time * 0.001;

            ctx.fillStyle = 'oklch(0.1 0.05 220)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Draw grid
            ctx.strokeStyle = 'oklch(0.5 0.15 200 / 0.2)';
            ctx.lineWidth = 1;

            const gridSize = 40;
            for (let x = 0; x < canvas.width; x += gridSize) {
                ctx.beginPath();
                ctx.moveTo(x, 0);
                ctx.lineTo(x, canvas.height);
                ctx.stroke();
            }

            for (let y = 0; y < canvas.height; y += gridSize) {
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(canvas.width, y);
                ctx.stroke();
            }

            // Random glitch effect
            if (Math.random() < 0.02) {
                glitchOffset = (Math.random() - 0.5) * 20;
            } else {
                glitchOffset *= 0.9;
            }

            // Draw data elements
            for (let i = 0; i < 10; i++) {
                const x = (i * canvas.width) / 10 + Math.sin(t + i) * 20;
                const y = (Math.sin(t * 0.5 + i * 0.5) * canvas.height) / 2 + canvas.height / 2;

                ctx.fillStyle = `oklch(0.7 0.2 200 / ${0.3 + Math.sin(t * 2 + i) * 0.2})`;
                ctx.fillRect(x + glitchOffset, y, 3, 20);
            }

            // Scan line
            scanY = (scanY + 3) % canvas.height;

            const gradient = ctx.createLinearGradient(0, scanY - 50, 0, scanY + 50);
            gradient.addColorStop(0, 'oklch(0.7 0.25 200 / 0)');
            gradient.addColorStop(0.5, 'oklch(0.8 0.25 200 / 0.8)');
            gradient.addColorStop(1, 'oklch(0.7 0.25 200 / 0)');

            ctx.fillStyle = gradient;
            ctx.fillRect(0, scanY - 50, canvas.width, 100);

            // Scan line core
            ctx.fillStyle = 'oklch(0.9 0.25 200)';
            ctx.fillRect(0, scanY - 2, canvas.width, 4);

            // Random noise
            if (Math.random() < 0.1) {
                for (let i = 0; i < 5; i++) {
                    const x = Math.random() * canvas.width;
                    const y = Math.random() * canvas.height;
                    const size = Math.random() * 10 + 5;
                    ctx.fillStyle = `oklch(0.7 0.2 200 / ${Math.random() * 0.3})`;
                    ctx.fillRect(x, y, size, 2);
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
