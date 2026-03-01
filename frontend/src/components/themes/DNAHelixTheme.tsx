import { useEffect, useRef } from 'react';

interface HelixPoint {
    angle: number;
    y: number;
}

export default function DNAHelixTheme() {
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

        let rotation = 0;

        const animate = () => {
            ctx.fillStyle = 'oklch(0.1 0 0)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            const centerX = canvas.width / 2;
            const amplitude = Math.min(canvas.width, canvas.height) * 0.15;
            const spacing = 20;
            const numPoints = Math.floor(canvas.height / spacing);

            rotation += 0.01;

            // Draw two helical strands
            for (let strand = 0; strand < 2; strand++) {
                const offset = strand * Math.PI;
                ctx.beginPath();

                for (let i = 0; i < numPoints; i++) {
                    const y = i * spacing;
                    const angle = (i * 0.3) + rotation + offset;
                    const x = centerX + Math.sin(angle) * amplitude * Math.cos(rotation);
                    const z = Math.cos(angle) * amplitude;
                    const scale = (z + amplitude) / (amplitude * 2);

                    if (i === 0) {
                        ctx.moveTo(x, y);
                    } else {
                        ctx.lineTo(x, y);
                    }

                    // Draw connection points
                    if (i % 3 === 0 && strand === 0) {
                        const angle2 = angle + Math.PI;
                        const x2 = centerX + Math.sin(angle2) * amplitude * Math.cos(rotation);
                        
                        ctx.save();
                        ctx.strokeStyle = `oklch(0.7 0.15 ${200 + i * 5} / 0.4)`;
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(x, y);
                        ctx.lineTo(x2, y);
                        ctx.stroke();
                        ctx.restore();

                        // Glowing spheres at connection points
                        const gradient = ctx.createRadialGradient(x, y, 0, x, y, 6);
                        gradient.addColorStop(0, `oklch(0.8 0.2 ${250 + i * 5} / 0.9)`);
                        gradient.addColorStop(1, `oklch(0.5 0.15 ${250 + i * 5} / 0)`);
                        ctx.fillStyle = gradient;
                        ctx.beginPath();
                        ctx.arc(x, y, 6, 0, Math.PI * 2);
                        ctx.fill();
                    }
                }

                const hue = strand === 0 ? 250 : 280;
                ctx.strokeStyle = `oklch(0.6 0.2 ${hue} / 0.8)`;
                ctx.lineWidth = 2;
                ctx.stroke();
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
