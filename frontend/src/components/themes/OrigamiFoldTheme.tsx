import { useEffect, useRef } from 'react';

interface Polygon {
    points: { x: number; y: number }[];
    color: string;
    rotation: number;
    scale: number;
}

export default function OrigamiFoldTheme() {
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

        const createPolygon = (sides: number, size: number): { x: number; y: number }[] => {
            const points: { x: number; y: number }[] = [];
            for (let i = 0; i < sides; i++) {
                const angle = (i * Math.PI * 2) / sides - Math.PI / 2;
                points.push({
                    x: Math.cos(angle) * size,
                    y: Math.sin(angle) * size
                });
            }
            return points;
        };

        const animate = (time: number) => {
            const t = time * 0.001;

            ctx.fillStyle = 'oklch(0.95 0.01 60)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;

            // Draw multiple folding shapes
            const shapes: Polygon[] = [
                {
                    points: createPolygon(3, 80),
                    color: 'oklch(0.7 0.15 30)',
                    rotation: t * 0.5,
                    scale: 1 + Math.sin(t) * 0.2
                },
                {
                    points: createPolygon(4, 60),
                    color: 'oklch(0.65 0.12 60)',
                    rotation: -t * 0.7,
                    scale: 1 + Math.cos(t * 1.2) * 0.2
                },
                {
                    points: createPolygon(6, 50),
                    color: 'oklch(0.6 0.1 90)',
                    rotation: t * 0.3,
                    scale: 1 + Math.sin(t * 0.8) * 0.2
                }
            ];

            shapes.forEach((shape, index) => {
                ctx.save();
                ctx.translate(centerX, centerY);
                ctx.rotate(shape.rotation);
                ctx.scale(shape.scale, shape.scale);

                // Draw shape
                ctx.beginPath();
                shape.points.forEach((point, i) => {
                    if (i === 0) {
                        ctx.moveTo(point.x, point.y);
                    } else {
                        ctx.lineTo(point.x, point.y);
                    }
                });
                ctx.closePath();

                ctx.fillStyle = shape.color;
                ctx.fill();

                ctx.strokeStyle = 'oklch(0.4 0.05 60)';
                ctx.lineWidth = 2;
                ctx.stroke();

                // Draw fold lines
                ctx.beginPath();
                ctx.moveTo(0, 0);
                shape.points.forEach((point) => {
                    ctx.lineTo(point.x, point.y);
                    ctx.moveTo(0, 0);
                });
                ctx.strokeStyle = 'oklch(0.5 0.05 60 / 0.3)';
                ctx.lineWidth = 1;
                ctx.stroke();

                ctx.restore();
            });

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
