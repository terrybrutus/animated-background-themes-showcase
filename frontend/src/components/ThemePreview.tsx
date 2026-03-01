import { useEffect, useRef } from 'react';
import type { Theme } from '@/lib/themeData';
import ParticlesTheme from './themes/ParticlesTheme';
import GradientWaveTheme from './themes/GradientWaveTheme';
import ParallaxStarsTheme from './themes/ParallaxStarsTheme';
import CursorSpotlightTheme from './themes/CursorSpotlightTheme';
import MercuryRevealTheme from './themes/MercuryRevealTheme';
import FloatingBubblesTheme from './themes/FloatingBubblesTheme';
import GeometricPatternsTheme from './themes/GeometricPatternsTheme';
import AuroraTheme from './themes/AuroraTheme';
import MatrixRainTheme from './themes/MatrixRainTheme';
import DNAHelixTheme from './themes/DNAHelixTheme';
import RippleEffectTheme from './themes/RippleEffectTheme';
import ConstellationTheme from './themes/ConstellationTheme';
import NeonGridTheme from './themes/NeonGridTheme';
import PlasmaFieldTheme from './themes/PlasmaFieldTheme';
import FirefliesTheme from './themes/FirefliesTheme';
import CircuitBoardTheme from './themes/CircuitBoardTheme';
import VHSGlitchTheme from './themes/VHSGlitchTheme';
import BreathingCirclesTheme from './themes/BreathingCirclesTheme';
import FallingLeavesTheme from './themes/FallingLeavesTheme';
import WaveInterferenceTheme from './themes/WaveInterferenceTheme';
import PixelRainTheme from './themes/PixelRainTheme';
import MinimalWavesTheme from './themes/MinimalWavesTheme';
import HexagonGridTheme from './themes/HexagonGridTheme';
import StarfieldWarpTheme from './themes/StarfieldWarpTheme';
import KaleidoscopeTheme from './themes/KaleidoscopeTheme';
import RainDropsTheme from './themes/RainDropsTheme';
import HologramScanTheme from './themes/HologramScanTheme';
import CassetteTapeTheme from './themes/CassetteTapeTheme';
import ZenGardenTheme from './themes/ZenGardenTheme';
import MagneticFieldTheme from './themes/MagneticFieldTheme';
import NebulaCloudTheme from './themes/NebulaCloudTheme';
import BinaryCodeTheme from './themes/BinaryCodeTheme';
import LavaLampTheme from './themes/LavaLampTheme';
import OrigamiFoldTheme from './themes/OrigamiFoldTheme';

interface ThemePreviewProps {
    theme: Theme;
}

export default function ThemePreview({ theme }: ThemePreviewProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Reset any animations when theme changes
        if (containerRef.current) {
            containerRef.current.style.opacity = '0';
            setTimeout(() => {
                if (containerRef.current) {
                    containerRef.current.style.opacity = '1';
                }
            }, 50);
        }
    }, [theme.id]);

    const renderTheme = () => {
        switch (theme.id) {
            case 'particles':
                return <ParticlesTheme />;
            case 'gradient-wave':
                return <GradientWaveTheme />;
            case 'parallax-stars':
                return <ParallaxStarsTheme />;
            case 'cursor-spotlight':
                return <CursorSpotlightTheme />;
            case 'mercury-reveal':
                return <MercuryRevealTheme />;
            case 'floating-bubbles':
                return <FloatingBubblesTheme />;
            case 'geometric-patterns':
                return <GeometricPatternsTheme />;
            case 'aurora':
                return <AuroraTheme />;
            case 'matrix-rain':
                return <MatrixRainTheme />;
            case 'dna-helix':
                return <DNAHelixTheme />;
            case 'ripple-effect':
                return <RippleEffectTheme />;
            case 'constellation':
                return <ConstellationTheme />;
            case 'neon-grid':
                return <NeonGridTheme />;
            case 'plasma-field':
                return <PlasmaFieldTheme />;
            case 'fireflies':
                return <FirefliesTheme />;
            case 'circuit-board':
                return <CircuitBoardTheme />;
            case 'vhs-glitch':
                return <VHSGlitchTheme />;
            case 'breathing-circles':
                return <BreathingCirclesTheme />;
            case 'falling-leaves':
                return <FallingLeavesTheme />;
            case 'wave-interference':
                return <WaveInterferenceTheme />;
            case 'pixel-rain':
                return <PixelRainTheme />;
            case 'minimal-waves':
                return <MinimalWavesTheme />;
            case 'hexagon-grid':
                return <HexagonGridTheme />;
            case 'starfield-warp':
                return <StarfieldWarpTheme />;
            case 'kaleidoscope':
                return <KaleidoscopeTheme />;
            case 'rain-drops':
                return <RainDropsTheme />;
            case 'hologram-scan':
                return <HologramScanTheme />;
            case 'cassette-tape':
                return <CassetteTapeTheme />;
            case 'zen-garden':
                return <ZenGardenTheme />;
            case 'magnetic-field':
                return <MagneticFieldTheme />;
            case 'nebula-cloud':
                return <NebulaCloudTheme />;
            case 'binary-code':
                return <BinaryCodeTheme />;
            case 'lava-lamp':
                return <LavaLampTheme />;
            case 'origami-fold':
                return <OrigamiFoldTheme />;
            default:
                return <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20" />;
        }
    };

    return (
        <div ref={containerRef} className="w-full h-full transition-opacity duration-300">
            {renderTheme()}
        </div>
    );
}
