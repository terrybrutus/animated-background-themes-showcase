import { useEffect, useRef } from 'react';

export default function HexagonGridTheme() {
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

        const hexRadius = 30;
        const hexHeight = hexRadius * Math.sqrt(3);

        const drawHexagon = (x: number, y: number, radius: number) => {
            ctx.beginPath();
            for (let i = 0; i < 6; i++) {
                const angle = (Math.PI / 3) * i;
                const hx = x + radius * Math.cos(angle);
                const hy = y + radius * Math.sin(angle);
                if (i === 0) {
                    ctx.moveTo(hx, hy);
                } else {
                    ctx.lineTo(hx, hy);
                }
            }
            ctx.closePath();
        };

        let time = 0;

        const animate = () => {
            time += 0.02;

            // Light background
            ctx.fillStyle = 'oklch(0.96 0.01 240)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            const cols = Math.ceil(canvas.width / (hexRadius * 1.5)) + 2;
            const rows = Math.ceil(canvas.height / hexHeight) + 2;

            for (let row = -1; row < rows; row++) {
                for (let col = -1; col < cols; col++) {
                    const x = col * hexRadius * 1.5;
                    const y = row * hexHeight + (col % 2) * (hexHeight / 2);

                    // Wave effect
                    const distance = Math.sqrt(
                        Math.pow(x - canvas.width / 2, 2) + 
                        Math.pow(y - canvas.height / 2, 2)
                    );
                    const wave = Math.sin(distance * 0.02 - time) * 0.5 + 0.5;

                    drawHexagon(x, y, hexRadius * 0.9);

                    // Fill
                    ctx.fillStyle = `oklch(0.85 0.05 ${240 + wave * 40} / ${0.2 + wave * 0.3})`;
                    ctx.fill();

                    // Stroke
                    ctx.strokeStyle = `oklch(0.6 0.08 ${240 + wave * 40} / ${0.4 + wave * 0.4})`;
                    ctx.lineWidth = 1.5;
                    ctx.stroke();
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
