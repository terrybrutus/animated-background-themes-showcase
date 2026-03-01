import { useEffect, useRef } from 'react';

export default function CassetteTapeTheme() {
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
        let tapePosition = 0;

        const animate = () => {
            ctx.fillStyle = 'oklch(0.25 0.05 30)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;

            // Cassette body
            const cassetteWidth = Math.min(canvas.width * 0.6, 300);
            const cassetteHeight = cassetteWidth * 0.6;

            ctx.fillStyle = 'oklch(0.15 0 0)';
            ctx.fillRect(
                centerX - cassetteWidth / 2,
                centerY - cassetteHeight / 2,
                cassetteWidth,
                cassetteHeight
            );

            ctx.strokeStyle = 'oklch(0.4 0 0)';
            ctx.lineWidth = 3;
            ctx.strokeRect(
                centerX - cassetteWidth / 2,
                centerY - cassetteHeight / 2,
                cassetteWidth,
                cassetteHeight
            );

            // Label area
            ctx.fillStyle = 'oklch(0.85 0.05 60)';
            ctx.fillRect(
                centerX - cassetteWidth / 2 + 20,
                centerY - cassetteHeight / 2 + 20,
                cassetteWidth - 40,
                cassetteHeight * 0.4
            );

            // Reels
            const reelRadius = cassetteHeight * 0.15;
            const reelY = centerY + cassetteHeight * 0.15;
            const leftReelX = centerX - cassetteWidth * 0.25;
            const rightReelX = centerX + cassetteWidth * 0.25;

            rotation += 0.05;
            tapePosition = (tapePosition + 0.5) % 100;

            // Draw reels
            [leftReelX, rightReelX].forEach((reelX, index) => {
                // Reel hub
                ctx.fillStyle = 'oklch(0.3 0 0)';
                ctx.beginPath();
                ctx.arc(reelX, reelY, reelRadius, 0, Math.PI * 2);
                ctx.fill();

                // Reel spokes
                ctx.save();
                ctx.translate(reelX, reelY);
                ctx.rotate(rotation * (index === 0 ? 1 : -1));

                for (let i = 0; i < 6; i++) {
                    const angle = (i * Math.PI * 2) / 6;
                    ctx.beginPath();
                    ctx.moveTo(0, 0);
                    ctx.lineTo(Math.cos(angle) * reelRadius * 0.8, Math.sin(angle) * reelRadius * 0.8);
                    ctx.strokeStyle = 'oklch(0.5 0 0)';
                    ctx.lineWidth = 2;
                    ctx.stroke();
                }

                ctx.restore();

                // Center hole
                ctx.fillStyle = 'oklch(0.15 0 0)';
                ctx.beginPath();
                ctx.arc(reelX, reelY, reelRadius * 0.3, 0, Math.PI * 2);
                ctx.fill();
            });

            // Tape between reels
            ctx.fillStyle = 'oklch(0.2 0.05 30)';
            ctx.fillRect(
                leftReelX + reelRadius,
                reelY - 3,
                rightReelX - leftReelX - reelRadius * 2,
                6
            );

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
