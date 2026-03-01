import { useEffect, useRef } from 'react';

export default function KaleidoscopeTheme() {
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

        const segments = 8;
        const angleStep = (Math.PI * 2) / segments;

        const animate = (time: number) => {
            const t = time * 0.001;

            ctx.fillStyle = 'oklch(0.15 0 0)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;

            ctx.save();
            ctx.translate(centerX, centerY);

            // Draw one segment, then mirror it
            for (let i = 0; i < segments; i++) {
                ctx.save();
                ctx.rotate(i * angleStep);

                // Mirror every other segment
                if (i % 2 === 1) {
                    ctx.scale(-1, 1);
                }

                // Draw patterns in this segment
                for (let j = 0; j < 5; j++) {
                    const radius = 50 + j * 40;
                    const angle = t * 0.5 + j * 0.3;
                    const x = Math.cos(angle) * radius;
                    const y = Math.sin(angle) * radius;

                    const hue = (t * 30 + j * 60) % 360;
                    
                    ctx.beginPath();
                    ctx.arc(x, y, 15 - j * 2, 0, Math.PI * 2);
                    ctx.fillStyle = `oklch(0.7 0.2 ${hue})`;
                    ctx.fill();

                    ctx.beginPath();
                    ctx.moveTo(0, 0);
                    ctx.lineTo(x, y);
                    ctx.strokeStyle = `oklch(0.6 0.15 ${hue} / 0.5)`;
                    ctx.lineWidth = 2;
                    ctx.stroke();
                }

                // Draw rotating triangles
                const triAngle = t * 0.8;
                const triRadius = 120;
                ctx.beginPath();
                for (let k = 0; k < 3; k++) {
                    const a = triAngle + (k * Math.PI * 2) / 3;
                    const x = Math.cos(a) * triRadius;
                    const y = Math.sin(a) * triRadius;
                    if (k === 0) ctx.moveTo(x, y);
                    else ctx.lineTo(x, y);
                }
                ctx.closePath();
                const hue2 = (t * 40) % 360;
                ctx.strokeStyle = `oklch(0.75 0.25 ${hue2})`;
                ctx.lineWidth = 3;
                ctx.stroke();

                ctx.restore();
            }

            ctx.restore();

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
