import { useEffect, useRef } from 'react';

interface Node {
    x: number;
    y: number;
    active: boolean;
    pulsePhase: number;
}

interface Path {
    points: { x: number; y: number }[];
    progress: number;
    active: boolean;
}

export default function CircuitBoardTheme() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const nodesRef = useRef<Node[]>([]);
    const pathsRef = useRef<Path[]>([]);
    const animationRef = useRef<number | undefined>(undefined);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const resizeCanvas = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
            initCircuit();
        };

        const initCircuit = () => {
            nodesRef.current = [];
            pathsRef.current = [];

            const gridSize = 80;
            const cols = Math.ceil(canvas.width / gridSize);
            const rows = Math.ceil(canvas.height / gridSize);

            // Create nodes
            for (let i = 0; i < cols; i++) {
                for (let j = 0; j < rows; j++) {
                    if (Math.random() > 0.3) {
                        nodesRef.current.push({
                            x: i * gridSize + gridSize / 2,
                            y: j * gridSize + gridSize / 2,
                            active: Math.random() > 0.7,
                            pulsePhase: Math.random() * Math.PI * 2
                        });
                    }
                }
            }

            // Create paths between nearby nodes
            nodesRef.current.forEach((node, i) => {
                const nearby = nodesRef.current.filter((n, j) => {
                    if (i === j) return false;
                    const dx = n.x - node.x;
                    const dy = n.y - node.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    return dist < gridSize * 1.5 && Math.random() > 0.5;
                });

                nearby.forEach(target => {
                    pathsRef.current.push({
                        points: [
                            { x: node.x, y: node.y },
                            { x: target.x, y: target.y }
                        ],
                        progress: 0,
                        active: false
                    });
                });
            });
        };

        let time = 0;

        const animate = () => {
            time += 0.02;

            // Circuit board background
            ctx.fillStyle = 'oklch(0.12 0.02 140)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Randomly activate paths
            if (Math.random() > 0.97) {
                const inactivePaths = pathsRef.current.filter(p => !p.active);
                if (inactivePaths.length > 0) {
                    const path = inactivePaths[Math.floor(Math.random() * inactivePaths.length)];
                    path.active = true;
                    path.progress = 0;
                }
            }

            // Draw paths
            pathsRef.current.forEach(path => {
                const start = path.points[0];
                const end = path.points[1];

                // Inactive path
                ctx.beginPath();
                ctx.moveTo(start.x, start.y);
                ctx.lineTo(end.x, end.y);
                ctx.strokeStyle = 'oklch(0.3 0.05 180 / 0.3)';
                ctx.lineWidth = 1;
                ctx.stroke();

                // Active path with traveling particle
                if (path.active) {
                    path.progress += 0.02;

                    if (path.progress >= 1) {
                        path.active = false;
                        path.progress = 0;
                    } else {
                        const x = start.x + (end.x - start.x) * path.progress;
                        const y = start.y + (end.y - start.y) * path.progress;

                        // Glowing line
                        ctx.beginPath();
                        ctx.moveTo(start.x, start.y);
                        ctx.lineTo(x, y);
                        ctx.strokeStyle = 'oklch(0.7 0.2 200)';
                        ctx.lineWidth = 2;
                        ctx.shadowBlur = 10;
                        ctx.shadowColor = 'oklch(0.7 0.2 200)';
                        ctx.stroke();
                        ctx.shadowBlur = 0;

                        // Traveling particle
                        const gradient = ctx.createRadialGradient(x, y, 0, x, y, 8);
                        gradient.addColorStop(0, 'oklch(0.9 0.25 200)');
                        gradient.addColorStop(1, 'oklch(0.7 0.2 200 / 0)');
                        ctx.fillStyle = gradient;
                        ctx.beginPath();
                        ctx.arc(x, y, 8, 0, Math.PI * 2);
                        ctx.fill();
                    }
                }
            });

            // Draw nodes
            nodesRef.current.forEach(node => {
                const pulse = Math.sin(time + node.pulsePhase) * 0.3 + 0.7;
                const size = node.active ? 4 : 3;

                // Node glow
                if (node.active) {
                    const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, size * 3);
                    gradient.addColorStop(0, `oklch(0.8 0.2 200 / ${pulse})`);
                    gradient.addColorStop(1, 'oklch(0.6 0.15 200 / 0)');
                    ctx.fillStyle = gradient;
                    ctx.beginPath();
                    ctx.arc(node.x, node.y, size * 3, 0, Math.PI * 2);
                    ctx.fill();
                }

                // Node core
                ctx.fillStyle = node.active ? `oklch(0.8 0.2 200 / ${pulse})` : 'oklch(0.4 0.1 180 / 0.6)';
                ctx.beginPath();
                ctx.arc(node.x, node.y, size, 0, Math.PI * 2);
                ctx.fill();
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
