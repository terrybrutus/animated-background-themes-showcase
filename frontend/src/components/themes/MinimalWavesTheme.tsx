import { useEffect, useRef } from 'react';

export default function MinimalWavesTheme() {
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

        let time = 0;

        const animate = () => {
            time += 0.01;

            // Light background
            ctx.fillStyle = 'oklch(0.98 0.005 240)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            const centerY = canvas.height / 2;
            const waves = [
                { amplitude: 30, frequency: 0.01, phase: 0, offset: -40 },
                { amplitude: 40, frequency: 0.008, phase: Math.PI / 3, offset: 0 },
                { amplitude: 25, frequency: 0.012, phase: Math.PI / 2, offset: 40 }
            ];

            waves.forEach((wave, index) => {
                ctx.beginPath();
                
                for (let x = 0; x <= canvas.width; x++) {
                    const y = centerY + wave.offset + 
                             Math.sin(x * wave.frequency + time + wave.phase) * wave.amplitude;
                    
                    if (x === 0) {
                        ctx.moveTo(x, y);
                    } else {
                        ctx.lineTo(x, y);
                    }
                }

                const alpha = 0.7 - index * 0.15;
                ctx.strokeStyle = `oklch(0.4 0.05 240 / ${alpha})`;
                ctx.lineWidth = 2;
                ctx.stroke();
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
