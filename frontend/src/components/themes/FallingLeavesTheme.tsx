import { useEffect, useRef } from 'react';

interface Leaf {
    x: number;
    y: number;
    rotation: number;
    rotationSpeed: number;
    swayOffset: number;
    fallSpeed: number;
    size: number;
    color: string;
}

export default function FallingLeavesTheme() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const leavesRef = useRef<Leaf[]>([]);
    const animationRef = useRef<number | undefined>(undefined);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const resizeCanvas = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
            initLeaves();
        };

        const colors = [
            'oklch(0.6 0.15 40)',   // Orange
            'oklch(0.55 0.18 60)',  // Yellow-orange
            'oklch(0.5 0.12 30)',   // Red-brown
            'oklch(0.45 0.1 50)'    // Brown
        ];

        const initLeaves = () => {
            leavesRef.current = [];
            for (let i = 0; i < 25; i++) {
                leavesRef.current.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height - canvas.height,
                    rotation: Math.random() * Math.PI * 2,
                    rotationSpeed: (Math.random() - 0.5) * 0.05,
                    swayOffset: Math.random() * Math.PI * 2,
                    fallSpeed: Math.random() * 0.5 + 0.5,
                    size: Math.random() * 15 + 10,
                    color: colors[Math.floor(Math.random() * colors.length)]
                });
            }
        };

        let time = 0;

        const animate = () => {
            time += 0.02;

            // Sky gradient
            const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
            gradient.addColorStop(0, 'oklch(0.7 0.08 240)');
            gradient.addColorStop(1, 'oklch(0.8 0.05 60)');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            leavesRef.current.forEach(leaf => {
                // Update position
                leaf.y += leaf.fallSpeed;
                leaf.x += Math.sin(time + leaf.swayOffset) * 0.5;
                leaf.rotation += leaf.rotationSpeed;

                // Reset when off screen
                if (leaf.y > canvas.height + leaf.size) {
                    leaf.y = -leaf.size;
                    leaf.x = Math.random() * canvas.width;
                }

                // Draw leaf
                ctx.save();
                ctx.translate(leaf.x, leaf.y);
                ctx.rotate(leaf.rotation);

                // Simple leaf shape (ellipse)
                ctx.beginPath();
                ctx.ellipse(0, 0, leaf.size * 0.6, leaf.size, 0, 0, Math.PI * 2);
                ctx.fillStyle = leaf.color;
                ctx.fill();

                // Leaf vein
                ctx.beginPath();
                ctx.moveTo(0, -leaf.size);
                ctx.lineTo(0, leaf.size);
                ctx.strokeStyle = 'oklch(0.3 0.05 40 / 0.5)';
                ctx.lineWidth = 1;
                ctx.stroke();

                ctx.restore();
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
