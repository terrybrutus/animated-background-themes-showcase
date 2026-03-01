import { useEffect, useRef } from 'react';

interface WaveSource {
    x: number;
    y: number;
    phase: number;
}

export default function WaveInterferenceTheme() {
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

        const sources: WaveSource[] = [
            { x: 0.3, y: 0.3, phase: 0 },
            { x: 0.7, y: 0.3, phase: 0 },
            { x: 0.5, y: 0.7, phase: 0 }
        ];

        let time = 0;

        const animate = () => {
            time += 0.05;

            const imageData = ctx.createImageData(canvas.width, canvas.height);
            const data = imageData.data;

            const resolution = 2; // Sample every 2 pixels for performance

            for (let y = 0; y < canvas.height; y += resolution) {
                for (let x = 0; x < canvas.width; x += resolution) {
                    let amplitude = 0;

                    // Calculate wave interference
                    sources.forEach(source => {
                        const sx = source.x * canvas.width;
                        const sy = source.y * canvas.height;
                        const dx = x - sx;
                        const dy = y - sy;
                        const distance = Math.sqrt(dx * dx + dy * dy);
                        
                        const wavelength = 50;
                        const wave = Math.sin((distance / wavelength) * Math.PI * 2 - time + source.phase);
                        amplitude += wave / sources.length;
                    });

                    // Map amplitude to color
                    const normalized = (amplitude + 1) / 2; // 0 to 1
                    const hue = 200 + normalized * 60;
                    const lightness = 0.3 + normalized * 0.4;

                    // Simple color mapping
                    const r = Math.floor(lightness * 255 * (0.5 + Math.cos(hue * Math.PI / 180) * 0.5));
                    const g = Math.floor(lightness * 255 * (0.5 + Math.cos((hue + 120) * Math.PI / 180) * 0.5));
                    const b = Math.floor(lightness * 255 * (0.5 + Math.cos((hue + 240) * Math.PI / 180) * 0.5));

                    // Fill resolution x resolution block
                    for (let dy = 0; dy < resolution && y + dy < canvas.height; dy++) {
                        for (let dx = 0; dx < resolution && x + dx < canvas.width; dx++) {
                            const index = ((y + dy) * canvas.width + (x + dx)) * 4;
                            data[index] = r;
                            data[index + 1] = g;
                            data[index + 2] = b;
                            data[index + 3] = 255;
                        }
                    }
                }
            }

            ctx.putImageData(imageData, 0, 0);

            // Draw source points
            sources.forEach(source => {
                const x = source.x * canvas.width;
                const y = source.y * canvas.height;
                
                ctx.beginPath();
                ctx.arc(x, y, 5, 0, Math.PI * 2);
                ctx.fillStyle = 'oklch(0.9 0.2 220)';
                ctx.fill();
                ctx.strokeStyle = 'oklch(0.95 0.15 220)';
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
