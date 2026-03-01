import { useEffect, useRef } from 'react';

interface RainDrop {
    x: number;
    y: number;
    speed: number;
    length: number;
}

interface Splash {
    x: number;
    y: number;
    age: number;
    particles: { x: number; y: number; vx: number; vy: number }[];
}

interface Ripple {
    x: number;
    y: number;
    radius: number;
    maxRadius: number;
    age: number;
}

export default function RainDropsTheme() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const dropsRef = useRef<RainDrop[]>([]);
    const splashesRef = useRef<Splash[]>([]);
    const ripplesRef = useRef<Ripple[]>([]);
    const animationRef = useRef<number | undefined>(undefined);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const resizeCanvas = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
            initRain();
        };

        const initRain = () => {
            dropsRef.current = [];
            for (let i = 0; i < 100; i++) {
                dropsRef.current.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    speed: Math.random() * 5 + 5,
                    length: Math.random() * 15 + 10
                });
            }
        };

        const createSplash = (x: number, y: number) => {
            const particles: { x: number; y: number; vx: number; vy: number }[] = [];
            for (let i = 0; i < 8; i++) {
                const angle = (Math.PI * 2 * i) / 8;
                particles.push({
                    x: 0,
                    y: 0,
                    vx: Math.cos(angle) * (Math.random() * 2 + 1),
                    vy: Math.sin(angle) * (Math.random() * 2 + 1) - 2
                });
            }
            splashesRef.current.push({ x, y, age: 0, particles });
            ripplesRef.current.push({ x, y, radius: 0, maxRadius: 30, age: 0 });
        };

        const animate = () => {
            ctx.fillStyle = 'oklch(0.35 0.05 240)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Draw rain drops
            dropsRef.current.forEach((drop) => {
                drop.y += drop.speed;

                if (drop.y > canvas.height) {
                    createSplash(drop.x, canvas.height);
                    drop.y = -drop.length;
                    drop.x = Math.random() * canvas.width;
                }

                ctx.beginPath();
                ctx.moveTo(drop.x, drop.y);
                ctx.lineTo(drop.x, drop.y - drop.length);
                ctx.strokeStyle = 'oklch(0.7 0.05 240 / 0.6)';
                ctx.lineWidth = 1;
                ctx.stroke();
            });

            // Draw ripples
            ripplesRef.current = ripplesRef.current.filter((ripple) => {
                ripple.radius += 1;
                ripple.age += 1;

                if (ripple.radius > ripple.maxRadius) return false;

                const opacity = 1 - ripple.radius / ripple.maxRadius;
                ctx.beginPath();
                ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
                ctx.strokeStyle = `oklch(0.75 0.1 240 / ${opacity * 0.5})`;
                ctx.lineWidth = 2;
                ctx.stroke();

                return true;
            });

            // Draw splashes
            splashesRef.current = splashesRef.current.filter((splash) => {
                splash.age += 1;

                if (splash.age > 20) return false;

                splash.particles.forEach((p) => {
                    p.x += p.vx;
                    p.y += p.vy;
                    p.vy += 0.3; // gravity

                    const opacity = 1 - splash.age / 20;
                    ctx.beginPath();
                    ctx.arc(splash.x + p.x, splash.y + p.y, 2, 0, Math.PI * 2);
                    ctx.fillStyle = `oklch(0.8 0.1 240 / ${opacity})`;
                    ctx.fill();
                });

                return true;
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
