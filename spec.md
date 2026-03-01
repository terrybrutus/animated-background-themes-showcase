# Animated Background Themes Showcase

## Overview
A React + TypeScript frontend application that showcases various animated background themes in an interactive carousel format. Users can browse, preview, and copy implementation prompts for different animated background effects.

## Core Features

### Theme Carousel
- Display animated background themes in a scrollable carousel interface
- Each theme runs as a live demo in a fixed-dimension preview box
- Touch-friendly navigation with swipe gestures
- Visual thumbnails for quick theme identification
- Clear indicators showing the currently active theme

### Theme Categories and Search
- Category filters to organize themes by type: Abstract, Nature, Tech/Sci-Fi, Retro, Minimal, Interactive
- Search functionality to find specific themes by name or keywords
- Filter and search results update the carousel display in real-time

### Interactive Theme Previews
- All themes support both mouse and touch input
- Interactive effects like cursor spotlight, parallax scrolling, and particle interactions work within preview boxes
- Smooth, performant animations with proper event handling
- Themes include: parallax effects, mercury reveal, cursor spotlight, interactive particles, and other animated backgrounds
- Expanded collection of animated background themes across all categories, each visually distinct and fully interactive

### Theme Collection Expansion
The application includes an expanded collection of diverse animated background themes:
- **Abstract**: Geometric patterns, flowing shapes, morphing forms, color transitions, wave animations, gradient flows
- **Nature**: Organic movements, natural phenomena simulations, environmental effects, particle systems mimicking natural elements
- **Tech/Sci-Fi**: Digital interfaces, data visualizations, futuristic elements, circuit patterns, matrix effects, holographic displays
- **Retro**: Vintage-inspired animations, nostalgic color schemes, classic design patterns, retro gaming aesthetics
- **Minimal**: Clean, subtle animations with simple geometric forms and muted colors, breathing effects, gentle transitions
- **Interactive**: Cursor-responsive effects, touch-based interactions, user-driven animations, reactive particle systems

### Theme Data Management
- Review existing themes in themeData.ts and /themes directory to identify current collection
- Add only unique animated background themes that are not already present in the application
- Ensure no duplicate themes are added to maintain collection integrity
- Each new theme includes proper categorization, naming, and prompt descriptions

### New Theme Implementation
- Each new theme implemented as a fully functional React component in the /themes directory
- Follow existing component structure and animation standards for consistency
- Ensure all new themes are fully interactive and touch-compatible
- Maintain text and UI readability across all new animated backgrounds
- Include visual thumbnails for each new theme in the carousel interface

### Copyable Prompts
- Each theme includes a detailed prompt describing how to recreate the effect
- Copy button with visual feedback (e.g., "Copied!" confirmation)
- Prompts displayed in a dedicated, readable area below or alongside each theme preview

### User Interface
- Clean, minimal, modern design with card-based layouts
- Proper z-index management and spacing
- Responsive design optimized for both desktop and mobile devices
- Keyboard navigation support for accessibility
- Text and UI elements maintain readability over all animated backgrounds
- No off-screen content issues

## Technical Requirements
- All theme configurations and prompts stored as frontend constants
- Each new theme implemented as a fully functional React component
- All themes are responsive and mobile-friendly
- Touch and cursor support for interactive elements
- No backend or persistent storage required
- All content and UI elements in English
- Smooth performance across different devices and screen sizes

## Data Structure
- Theme data includes: name, category, animation configuration, implementation prompt, and thumbnail reference
- Categories for organizing themes: Abstract, Nature, Tech/Sci-Fi, Retro, Minimal, Interactive
- Search keywords associated with each theme for filtering functionality
- Updated theme collection with new unique entries distributed across all categories
- Integration with existing themeData.ts structure and carousel system
