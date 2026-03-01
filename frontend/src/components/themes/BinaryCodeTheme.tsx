import { useEffect, useRef } from 'react';

interface BinaryStream {
    x: number;
    y: number;
    speed: number;
    digits: string[];
    highlight: number;
}

export default function BinaryCodeTheme() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const streamsRef = useRef<BinaryStream[]>([]);
    const animationRef = useRef<number | undefined>(undefined);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const resizeCanvas = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
            initStreams();
        };

        const initStreams = () => {
            streamsRef.current = [];
            const streamCount = Math.floor(canvas.width / 30);
            for (let i = 0; i < streamCount; i++) {
                const digits: string[] = [];
                for (let j = 0; j < 30; j++) {
                    digits.push(Math.random() > 0.5 ? '1' : '0');
                }
                streamsRef.current.push({
                    x: i * 30 + 15,
                    y: Math.random() * canvas.height,
                    speed: Math.random() * 2 + 1,
                    digits,
                    highlight: Math.floor(Math.random() * 30)
                });
            }
        };

        const animate = () => {
            ctx.fillStyle = 'oklch(0.08 0 0 / 0.2)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.font = '14px monospace';
            ctx.textAlign = 'center';

            streamsRef.current.forEach((stream) => {
                stream.y += stream.speed;

                if (stream.y > canvas.height + 200) {
                    stream.y = -200;
                    stream.highlight = Math.floor(Math.random() * 30);
                }

                // Occasionally change a digit
                if (Math.random() < 0.05) {
                    const idx = Math.floor(Math.random() * stream.digits.length);
                    stream.digits[idx] = Math.random() > 0.5 ? '1' : '0';
                }

                stream.digits.forEach((digit, i) => {
                    const y = stream.y + i * 20;
                    if (y > -20 && y < canvas.height + 20) {
                        const isHighlight = i === stream.highlight;
                        const opacity = isHighlight ? 1 : 0.3 + (1 - i / stream.digits.length) * 0.4;

                        ctx.fillStyle = isHighlight
                            ? 'oklch(0.85 0.2 160)'
                            : `oklch(0.65 0.15 160 / ${opacity})`;
                        ctx.fillText(digit, stream.x, y);
                    }
                });
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
