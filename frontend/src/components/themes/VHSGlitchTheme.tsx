import { useEffect, useRef } from 'react';

export default function VHSGlitchTheme() {
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

        let glitchTimer = 0;
        let isGlitching = false;

        const animate = () => {
            // Base gradient
            const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
            gradient.addColorStop(0, 'oklch(0.35 0.05 280)');
            gradient.addColorStop(0.5, 'oklch(0.3 0.04 300)');
            gradient.addColorStop(1, 'oklch(0.25 0.03 320)');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Scan lines
            for (let y = 0; y < canvas.height; y += 4) {
                ctx.fillStyle = 'oklch(0 0 0 / 0.15)';
                ctx.fillRect(0, y, canvas.width, 2);
            }

            // Random glitch effect
            glitchTimer++;
            if (glitchTimer > 60 && Math.random() > 0.95) {
                isGlitching = true;
                glitchTimer = 0;
            }

            if (isGlitching && glitchTimer < 10) {
                // RGB channel offset
                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                const data = imageData.data;
                const offset = Math.floor(Math.random() * 20) - 10;

                for (let i = 0; i < data.length; i += 4) {
                    const shiftIndex = i + offset * 4;
                    if (shiftIndex >= 0 && shiftIndex < data.length) {
                        data[i] = data[shiftIndex]; // R channel shift
                    }
                }

                ctx.putImageData(imageData, 0, 0);

                // Horizontal displacement
                const numGlitches = Math.floor(Math.random() * 5) + 1;
                for (let i = 0; i < numGlitches; i++) {
                    const y = Math.random() * canvas.height;
                    const height = Math.random() * 50 + 10;
                    const displacement = (Math.random() - 0.5) * 40;

                    const sliceData = ctx.getImageData(0, y, canvas.width, height);
                    ctx.putImageData(sliceData, displacement, y);
                }
            } else {
                isGlitching = false;
            }

            // Noise overlay
            for (let i = 0; i < 100; i++) {
                const x = Math.random() * canvas.width;
                const y = Math.random() * canvas.height;
                const size = Math.random() * 2;
                ctx.fillStyle = `oklch(0.5 0 0 / ${Math.random() * 0.3})`;
                ctx.fillRect(x, y, size, size);
            }

            // Vignette
            const vignette = ctx.createRadialGradient(
                canvas.width / 2, canvas.height / 2, 0,
                canvas.width / 2, canvas.height / 2, canvas.width * 0.7
            );
            vignette.addColorStop(0, 'oklch(0 0 0 / 0)');
            vignette.addColorStop(1, 'oklch(0 0 0 / 0.5)');
            ctx.fillStyle = vignette;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

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
