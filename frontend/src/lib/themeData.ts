export interface Theme {
    id: string;
    name: string;
    description: string;
    category: string;
    keywords: string[];
    prompt: string;
}

export const categories = [
    'Abstract',
    'Nature',
    'Tech/Sci-Fi',
    'Retro',
    'Minimal',
    'Interactive'
];

export const themes: Theme[] = [
    {
        id: 'particles',
        name: 'Interactive Particles',
        description: 'Floating particles that connect and react to mouse/touch movement with smooth animations.',
        category: 'Interactive',
        keywords: ['particles', 'interactive', 'connections', 'mouse', 'touch', 'network'],
        prompt: `Create an interactive particle system with the following features:
- Generate 50-100 particles with random positions, velocities, and sizes
- Particles should move continuously and bounce off canvas edges
- Draw connecting lines between particles within 100px distance
- Particles should move away from cursor/touch position within 100px radius
- Use canvas 2D context for rendering
- Implement smooth animations at 60fps
- Support both mouse and touch events
- Use a dark background with bright particle colors
- Fade connection lines based on distance between particles`
    },
    {
        id: 'gradient-wave',
        name: 'Animated Gradient Waves',
        description: 'Flowing gradient background with animated wave patterns that shift colors over time.',
        category: 'Abstract',
        keywords: ['gradient', 'waves', 'animated', 'flowing', 'colors', 'smooth'],
        prompt: `Create animated gradient waves with these specifications:
- Use canvas 2D context with linear gradients
- Animate gradient colors by rotating hue values over time
- Draw 3 overlapping sine wave layers with different frequencies
- Each wave should have semi-transparent fill
- Waves should move continuously using sine functions
- Background should be a smooth color gradient
- Update animation at 60fps using requestAnimationFrame
- Use OKLCH color space for vibrant, perceptually uniform colors
- Layer waves from back to front with decreasing opacity`
    },
    {
        id: 'parallax-stars',
        name: 'Parallax Starfield',
        description: 'Multi-layered starfield with parallax effect responding to mouse/touch movement.',
        category: 'Nature',
        keywords: ['parallax', 'stars', 'depth', 'layers', 'space', 'movement'],
        prompt: `Create a parallax starfield effect with:
- Generate 200 stars with random positions and depth layers (z-index)
- Stars at different depths should have different sizes and brightness
- Implement parallax scrolling based on mouse/touch position
- Stars closer to viewer (higher z) move more with cursor
- Use dark space background
- Stars should have varying opacity based on depth
- Center the parallax effect around canvas center
- Smooth interpolation of star positions
- Support both mouse and touch input for parallax control`
    },
    {
        id: 'cursor-spotlight',
        name: 'Cursor Spotlight',
        description: 'Dark background with a radial gradient spotlight that follows the cursor or touch point.',
        category: 'Interactive',
        keywords: ['spotlight', 'cursor', 'radial', 'gradient', 'follow', 'interactive'],
        prompt: `Create a cursor spotlight effect with:
- Dark base background color
- Radial gradient centered on cursor/touch position
- Gradient should fade from bright center to transparent edges
- Spotlight radius of approximately 200px
- Smooth color transitions in the gradient
- Update spotlight position on mousemove and touchmove events
- Use requestAnimationFrame for smooth rendering
- Initialize spotlight at canvas center
- Support both mouse and touch input
- Use vibrant colors for the spotlight center`
    },
    {
        id: 'mercury-reveal',
        name: 'Mercury Liquid Reveal',
        description: 'Animated gradient revealed through a circular mask that follows cursor movement.',
        category: 'Interactive',
        keywords: ['reveal', 'mask', 'liquid', 'mercury', 'gradient', 'animated'],
        prompt: `Create a mercury liquid reveal effect with:
- Base layer with subtle gradient background
- Animated colorful gradient layer underneath
- Circular clipping mask (150px radius) following cursor/touch
- Gradient colors should rotate/animate over time
- Use canvas clip() for circular reveal effect
- Smooth cursor tracking for mask position
- Initialize mask at canvas center
- Support both mouse and touch events
- Use vibrant, shifting colors for revealed gradient
- Animate gradient hue rotation continuously`
    },
    {
        id: 'floating-bubbles',
        name: 'Floating Bubbles',
        description: 'Colorful translucent bubbles floating and bouncing around the canvas.',
        category: 'Abstract',
        keywords: ['bubbles', 'floating', 'organic', 'colorful', 'translucent', 'bounce'],
        prompt: `Create floating bubbles animation with:
- Generate 15-20 bubbles with random sizes (20-60px radius)
- Each bubble has random position, velocity, and hue
- Bubbles should bounce off canvas edges
- Draw bubbles with radial gradients for 3D effect
- Add subtle stroke/outline to each bubble
- Use semi-transparent colors for bubble fills
- Animate bubbles continuously at 60fps
- Vary bubble colors across the spectrum
- Create depth with gradient positioning (light source effect)
- Smooth, organic movement patterns`
    },
    {
        id: 'geometric-patterns',
        name: 'Rotating Geometric Grid',
        description: 'Grid of rotating geometric shapes with color-shifting patterns.',
        category: 'Abstract',
        keywords: ['geometric', 'grid', 'rotation', 'patterns', 'shapes', 'animated'],
        prompt: `Create rotating geometric patterns with:
- Grid layout with 60px cell size
- Draw rotated squares in each grid cell
- Each shape rotates based on time and grid position
- Colors shift based on position and time
- Use semi-transparent fills and strokes
- Rotate shapes around their centers
- Animate rotation continuously
- Create wave-like color patterns across grid
- Use canvas save/restore for transformations
- Vary rotation speed based on grid position`
    },
    {
        id: 'aurora',
        name: 'Aurora Borealis',
        description: 'Northern lights effect with flowing, layered waves of color.',
        category: 'Nature',
        keywords: ['aurora', 'northern lights', 'waves', 'flowing', 'colorful', 'atmospheric'],
        prompt: `Create an aurora borealis effect with:
- Multiple overlapping wave layers (5 layers)
- Each layer uses sine waves with different frequencies
- Combine multiple sine functions for organic movement
- Use semi-transparent fills for layering effect
- Animate waves continuously with time-based offsets
- Colors should shift through green, blue, purple spectrum
- Waves should flow from bottom to top of canvas
- Layer opacity decreases from front to back
- Create depth with varying wave amplitudes
- Smooth, ethereal animation at 60fps`
    },
    {
        id: 'matrix-rain',
        name: 'Matrix Digital Rain',
        description: 'Falling digital characters creating the iconic Matrix rain effect.',
        category: 'Tech/Sci-Fi',
        keywords: ['matrix', 'rain', 'digital', 'code', 'falling', 'characters'],
        prompt: `Create Matrix-style digital rain with:
- Columns of falling characters across canvas width
- Use monospace font (14px) for characters
- Random characters from set: A-Z, 0-9, and symbols
- Each column falls at independent speed
- Characters fade with trail effect using semi-transparent overlay
- Bright green color for characters
- Random column reset when reaching bottom
- Dark background with fade trails
- Continuous animation at 60fps
- Vary character brightness for depth effect`
    },
    {
        id: 'dna-helix',
        name: 'DNA Helix',
        description: 'Rotating double helix structure with glowing connection points.',
        category: 'Tech/Sci-Fi',
        keywords: ['dna', 'helix', 'science', 'biology', 'rotation', 'molecular'],
        prompt: `Create a DNA helix animation with:
- Two parallel sine wave strands rotating in 3D space
- Connection lines between strands at regular intervals
- Glowing spheres at connection points
- Continuous rotation around vertical axis
- Use perspective projection for 3D effect
- Gradient colors along the helix (blue to purple)
- Smooth animation at 60fps
- Add glow effects to connection points
- Dark background for contrast
- Vary opacity based on depth (z-position)`
    },
    {
        id: 'ripple-effect',
        name: 'Interactive Ripples',
        description: 'Water ripple effect that emanates from cursor clicks and touch points.',
        category: 'Interactive',
        keywords: ['ripple', 'water', 'waves', 'interactive', 'click', 'touch'],
        prompt: `Create interactive water ripples with:
- Generate expanding circular ripples on click/touch
- Multiple concurrent ripples with different phases
- Ripples expand outward and fade over time
- Use sine wave for ripple amplitude
- Draw concentric circles with decreasing opacity
- Support multiple simultaneous ripples
- Remove ripples after they fade completely
- Smooth animation at 60fps
- Gradient background (blue tones)
- Ripple color shifts as they expand`
    },
    {
        id: 'constellation',
        name: 'Constellation Mapper',
        description: 'Interactive star constellation with connecting lines that form on hover.',
        category: 'Interactive',
        keywords: ['constellation', 'stars', 'connect', 'interactive', 'astronomy', 'lines'],
        prompt: `Create an interactive constellation effect with:
- Generate 50-80 stars at random positions
- Stars glow with pulsing animation
- Draw lines connecting stars near cursor (within 150px)
- Lines fade based on distance from cursor
- Stars brighten when connected
- Support both mouse and touch interaction
- Dark space background
- Use varying star sizes and brightness
- Smooth line drawing with anti-aliasing
- Create constellation patterns dynamically`
    },
    {
        id: 'neon-grid',
        name: 'Neon Grid',
        description: 'Retro-futuristic neon grid with perspective and pulsing lights.',
        category: 'Retro',
        keywords: ['neon', 'grid', 'retro', 'synthwave', 'perspective', 'cyberpunk'],
        prompt: `Create a neon grid effect with:
- Perspective grid receding into distance
- Horizontal and vertical grid lines
- Pulsing neon glow on grid lines
- Gradient from bright (near) to dim (far)
- Use pink/cyan neon colors
- Add scanline effect overlay
- Animate grid movement (scrolling forward)
- Stars or dots in background
- Dark background with gradient
- Retro 80s aesthetic with glow effects`
    },
    {
        id: 'plasma-field',
        name: 'Plasma Energy Field',
        description: 'Swirling plasma effect with multiple sine wave interference patterns.',
        category: 'Abstract',
        keywords: ['plasma', 'energy', 'swirl', 'interference', 'colorful', 'psychedelic'],
        prompt: `Create a plasma field effect with:
- Combine multiple sine/cosine functions for each pixel
- Create interference patterns with different frequencies
- Animate by shifting phase values over time
- Map calculated values to color spectrum
- Use full OKLCH color range for vibrant output
- Smooth color transitions
- Update entire canvas each frame
- Create organic, flowing patterns
- 60fps animation
- Psychedelic color palette`
    },
    {
        id: 'fireflies',
        name: 'Fireflies at Night',
        description: 'Glowing fireflies floating with organic movement and pulsing lights.',
        category: 'Nature',
        keywords: ['fireflies', 'glow', 'nature', 'organic', 'night', 'insects'],
        prompt: `Create fireflies animation with:
- Generate 30-40 fireflies with random positions
- Each firefly has organic floating movement
- Pulsing glow effect (sine wave brightness)
- Random pulse timing for each firefly
- Use radial gradients for glow effect
- Warm yellow/green colors
- Dark night background
- Fireflies move in curved paths
- Vary firefly sizes and brightness
- Smooth, natural movement patterns`
    },
    {
        id: 'circuit-board',
        name: 'Circuit Board',
        description: 'Animated circuit board with flowing electricity and glowing nodes.',
        category: 'Tech/Sci-Fi',
        keywords: ['circuit', 'technology', 'electricity', 'nodes', 'digital', 'electronic'],
        prompt: `Create animated circuit board with:
- Draw circuit paths (lines and corners)
- Glowing nodes at intersections
- Animated electricity flowing through paths
- Pulsing node lights
- Use cyan/blue electric colors
- Dark background (circuit board green/black)
- Particles traveling along circuit paths
- Random path activation
- Glow effects on active circuits
- Technical, futuristic aesthetic`
    },
    {
        id: 'vhs-glitch',
        name: 'VHS Glitch',
        description: 'Retro VHS tape glitch effect with scan lines and color distortion.',
        category: 'Retro',
        keywords: ['vhs', 'glitch', 'retro', 'distortion', 'analog', 'vintage'],
        prompt: `Create VHS glitch effect with:
- Horizontal scan lines across canvas
- Random RGB channel offset (chromatic aberration)
- Periodic glitch distortions
- Noise/static overlay
- Color bleeding effect
- Tracking errors (horizontal displacement)
- Animate glitches randomly
- Use muted, desaturated colors
- Add vignette effect
- Retro 80s/90s VHS aesthetic`
    },
    {
        id: 'breathing-circles',
        name: 'Breathing Circles',
        description: 'Concentric circles that expand and contract in a calming rhythm.',
        category: 'Minimal',
        keywords: ['circles', 'breathing', 'minimal', 'calm', 'meditation', 'zen'],
        prompt: `Create breathing circles animation with:
- Multiple concentric circles from center
- Circles expand and contract smoothly
- Use sine wave for breathing rhythm
- Minimal color palette (2-3 colors)
- Thin stroke lines, no fill
- Synchronized breathing pattern
- Clean, minimal aesthetic
- Smooth animation at 60fps
- Light background
- Calming, meditative effect`
    },
    {
        id: 'falling-leaves',
        name: 'Falling Autumn Leaves',
        description: 'Leaves falling and swaying with realistic physics and rotation.',
        category: 'Nature',
        keywords: ['leaves', 'autumn', 'fall', 'nature', 'seasonal', 'organic'],
        prompt: `Create falling leaves animation with:
- Generate 20-30 leaf shapes
- Leaves fall with gravity
- Swaying motion (sine wave horizontal movement)
- Rotation as leaves fall
- Use autumn colors (red, orange, yellow, brown)
- Leaves reset to top when reaching bottom
- Vary leaf sizes and fall speeds
- Add slight wind effect
- Organic, natural movement
- Gradient sky background`
    },
    {
        id: 'wave-interference',
        name: 'Wave Interference',
        description: 'Multiple wave sources creating beautiful interference patterns.',
        category: 'Abstract',
        keywords: ['waves', 'interference', 'physics', 'patterns', 'ripples', 'science'],
        prompt: `Create wave interference pattern with:
- Multiple wave sources (3-5 points)
- Calculate wave amplitude at each pixel
- Combine waves using superposition
- Animate wave phase over time
- Map amplitude to color/brightness
- Create constructive/destructive interference
- Smooth, flowing animation
- Use color gradient for amplitude
- 60fps rendering
- Physics-based wave simulation`
    },
    {
        id: 'pixel-rain',
        name: 'Pixel Rain',
        description: 'Colorful pixels falling like rain with varying speeds and colors.',
        category: 'Retro',
        keywords: ['pixel', 'rain', 'retro', '8-bit', 'arcade', 'colorful'],
        prompt: `Create pixel rain effect with:
- Small square pixels falling down
- Random colors for each pixel
- Varying fall speeds
- Pixels fade as they fall
- Retro 8-bit aesthetic
- Grid-aligned pixel positions
- Continuous generation at top
- Remove pixels at bottom
- Bright, saturated colors
- Dark background for contrast`
    },
    {
        id: 'minimal-waves',
        name: 'Minimal Waves',
        description: 'Simple, elegant sine waves with subtle animation and monochrome palette.',
        category: 'Minimal',
        keywords: ['waves', 'minimal', 'simple', 'elegant', 'monochrome', 'clean'],
        prompt: `Create minimal wave animation with:
- 2-3 sine wave lines
- Smooth, slow animation
- Monochrome or duotone color scheme
- Thin, clean lines
- Subtle phase shifting
- Minimal aesthetic
- Light or white background
- Waves at different amplitudes
- Synchronized movement
- Calm, elegant appearance`
    },
    {
        id: 'hexagon-grid',
        name: 'Hexagon Grid',
        description: 'Honeycomb pattern with hexagons that light up in waves.',
        category: 'Minimal',
        keywords: ['hexagon', 'honeycomb', 'grid', 'geometric', 'pattern', 'minimal'],
        prompt: `Create hexagon grid animation with:
- Tessellated hexagon pattern
- Wave of color/brightness across grid
- Each hexagon lights up in sequence
- Use minimal color palette
- Clean, geometric aesthetic
- Smooth wave propagation
- Hexagons with stroke outlines
- Light background
- Subtle fill color changes
- Mathematical, precise layout`
    },
    {
        id: 'starfield-warp',
        name: 'Starfield Warp',
        description: 'Stars stretching into lines as if traveling at warp speed.',
        category: 'Tech/Sci-Fi',
        keywords: ['starfield', 'warp', 'speed', 'space', 'travel', 'sci-fi'],
        prompt: `Create starfield warp effect with:
- Stars moving from center outward
- Stars stretch into lines at high speed
- Continuous star generation at center
- Remove stars when off-screen
- Acceleration effect (speed increases)
- White stars on black background
- Motion blur effect on star trails
- Perspective scaling (stars grow as they approach)
- Fast, dynamic animation
- Space travel aesthetic`
    },
    {
        id: 'kaleidoscope',
        name: 'Kaleidoscope',
        description: 'Rotating symmetrical patterns with vibrant colors creating mesmerizing kaleidoscope effect.',
        category: 'Abstract',
        keywords: ['kaleidoscope', 'symmetry', 'rotation', 'patterns', 'colorful', 'mandala'],
        prompt: `Create a kaleidoscope effect with:
- Radial symmetry with 6-8 segments
- Draw patterns in one segment, mirror to others
- Rotating geometric shapes and lines
- Vibrant, shifting colors over time
- Use canvas transformations for symmetry
- Animate rotation continuously
- Layer multiple pattern elements
- Smooth color transitions
- Psychedelic, mesmerizing aesthetic
- 60fps animation with complex patterns`
    },
    {
        id: 'rain-drops',
        name: 'Rain Drops',
        description: 'Realistic rain with falling drops, splashes, and ripples on impact.',
        category: 'Nature',
        keywords: ['rain', 'drops', 'water', 'weather', 'splash', 'realistic'],
        prompt: `Create realistic rain effect with:
- Falling rain drops with varying speeds
- Splash effect when drops hit bottom
- Expanding ripples from impact points
- Rain drops as thin vertical lines
- Splash particles scatter outward
- Ripples fade over time
- Gray/blue atmospheric background
- Varying drop sizes and opacity
- Continuous rain generation
- Natural, weather-like appearance`
    },
    {
        id: 'hologram-scan',
        name: 'Hologram Scan',
        description: 'Futuristic holographic scanning effect with grid lines and glitch artifacts.',
        category: 'Tech/Sci-Fi',
        keywords: ['hologram', 'scan', 'futuristic', 'grid', 'glitch', 'sci-fi'],
        prompt: `Create holographic scan effect with:
- Horizontal scan line moving vertically
- Grid overlay with perspective distortion
- Glitch artifacts and digital noise
- Cyan/blue holographic colors
- Scan line with bright glow
- Random data visualization elements
- Flickering and interference effects
- Semi-transparent layers
- Technical readout aesthetic
- Continuous scanning animation`
    },
    {
        id: 'cassette-tape',
        name: 'Cassette Tape',
        description: 'Animated cassette tape with rotating reels and magnetic tape movement.',
        category: 'Retro',
        keywords: ['cassette', 'tape', 'retro', '80s', 'music', 'analog'],
        prompt: `Create animated cassette tape with:
- Two circular reels rotating
- Magnetic tape moving between reels
- Retro cassette design with label area
- Rotating motion simulating playback
- Use brown/black tape colors
- Plastic cassette shell outline
- Smooth reel rotation
- Tape thickness changes as it moves
- Nostalgic 80s/90s aesthetic
- Continuous looping animation`
    },
    {
        id: 'zen-garden',
        name: 'Zen Garden',
        description: 'Minimalist zen garden with animated sand ripples and stones.',
        category: 'Minimal',
        keywords: ['zen', 'garden', 'minimal', 'meditation', 'sand', 'peaceful'],
        prompt: `Create zen garden animation with:
- Circular ripple patterns in sand
- Static stones/rocks as focal points
- Ripples emanate from stones
- Minimal earth-tone color palette
- Thin, delicate line work
- Slow, calming animation
- Concentric circles around stones
- Light beige/tan background
- Meditative, peaceful aesthetic
- Subtle, gentle movements`
    },
    {
        id: 'magnetic-field',
        name: 'Magnetic Field',
        description: 'Interactive magnetic field lines that bend and flow around cursor position.',
        category: 'Interactive',
        keywords: ['magnetic', 'field', 'physics', 'interactive', 'lines', 'force'],
        prompt: `Create interactive magnetic field with:
- Field lines flowing in curves
- Lines bend around cursor position
- Simulate magnetic attraction/repulsion
- Multiple field lines across canvas
- Lines follow physics-based curves
- Color gradient along field lines
- Smooth cursor interaction
- Support mouse and touch input
- Scientific visualization aesthetic
- Real-time field line calculation`
    },
    {
        id: 'nebula-cloud',
        name: 'Nebula Cloud',
        description: 'Swirling space nebula with colorful gas clouds and stars.',
        category: 'Nature',
        keywords: ['nebula', 'space', 'clouds', 'cosmic', 'stars', 'astronomy'],
        prompt: `Create nebula cloud effect with:
- Swirling gas cloud patterns
- Multiple color layers (purple, blue, pink)
- Scattered stars in background
- Organic, flowing cloud movement
- Use gradients and blur effects
- Slow, majestic animation
- Deep space black background
- Varying cloud density and opacity
- Cosmic, ethereal aesthetic
- Smooth color blending`
    },
    {
        id: 'binary-code',
        name: 'Binary Code Stream',
        description: 'Flowing streams of binary code with glowing highlights and data packets.',
        category: 'Tech/Sci-Fi',
        keywords: ['binary', 'code', 'data', 'stream', 'digital', 'computer'],
        prompt: `Create binary code stream with:
- Vertical streams of 0s and 1s
- Code flows downward continuously
- Random binary digits
- Occasional glowing highlights
- Green or cyan monochrome colors
- Varying stream speeds
- Data packet bursts
- Monospace font rendering
- Dark background
- Digital, technical aesthetic`
    },
    {
        id: 'lava-lamp',
        name: 'Lava Lamp',
        description: 'Classic lava lamp effect with floating blobs that merge and separate.',
        category: 'Retro',
        keywords: ['lava', 'lamp', 'blobs', 'retro', '70s', 'psychedelic'],
        prompt: `Create lava lamp effect with:
- Floating organic blob shapes
- Blobs rise and fall slowly
- Blobs merge when touching
- Blobs separate and reform
- Use metaball rendering technique
- Warm colors (orange, red, yellow)
- Smooth, liquid-like movement
- Gradient background
- Retro 70s aesthetic
- Hypnotic, flowing animation`
    },
    {
        id: 'origami-fold',
        name: 'Origami Fold',
        description: 'Geometric shapes folding and unfolding in origami-style animation.',
        category: 'Minimal',
        keywords: ['origami', 'fold', 'geometric', 'paper', 'minimal', 'japanese'],
        prompt: `Create origami folding animation with:
- Geometric polygon shapes
- Folding/unfolding transformations
- Clean, sharp edges
- Minimal color palette (2-3 colors)
- Smooth transition animations
- Paper-like flat shading
- Geometric precision
- Sequential folding patterns
- Japanese aesthetic influence
- Elegant, minimalist design`
    }
];
