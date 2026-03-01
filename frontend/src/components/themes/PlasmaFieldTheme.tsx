import { useEffect, useRef } from 'react';

export default function PlasmaFieldTheme() {
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
            time += 0.03;

            const imageData = ctx.createImageData(canvas.width, canvas.height);
            const data = imageData.data;

            for (let y = 0; y < canvas.height; y++) {
                for (let x = 0; x < canvas.width; x++) {
                    const index = (y * canvas.width + x) * 4;

                    // Combine multiple sine waves for plasma effect
                    const value1 = Math.sin(x * 0.02 + time);
                    const value2 = Math.sin(y * 0.02 + time);
                    const value3 = Math.sin((x + y) * 0.01 + time);
                    const value4 = Math.sin(Math.sqrt(x * x + y * y) * 0.01 + time);

                    const plasma = (value1 + value2 + value3 + value4) / 4;
                    
                    // Map to hue (0-360)
                    const hue = ((plasma + 1) * 180) % 360;
                    const lightness = 0.5 + plasma * 0.2;
                    const chroma = 0.2;

                    // Convert OKLCH to RGB (simplified)
                    const hueRad = (hue * Math.PI) / 180;
                    const a = chroma * Math.cos(hueRad);
                    const b = chroma * Math.sin(hueRad);
                    
                    // Simplified conversion
                    const r = Math.max(0, Math.min(255, (lightness + a * 1.5) * 255));
                    const g = Math.max(0, Math.min(255, (lightness - a * 0.5 + b * 0.8) * 255));
                    const bl = Math.max(0, Math.min(255, (lightness - b * 1.5) * 255));

                    data[index] = r;
                    data[index + 1] = g;
                    data[index + 2] = bl;
                    data[index + 3] = 255;
                }
            }

            ctx.putImageData(imageData, 0, 0);

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
