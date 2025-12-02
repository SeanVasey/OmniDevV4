# OmniDev v4.0 - Implementation Guide

## 📋 Overview

**OmniDev v4.0** is a fully-featured multimodal AI workspace built with modern web technologies and the VASEY/AI design system. This implementation follows the comprehensive master prompt specifications to deliver a production-ready application.

## 🎯 Project Structure

```
OmniDevV4/
├── public/                          # Static assets
│   ├── manifest.json               # PWA manifest
│   └── vite.svg                    # Default Vite icon
├── src/
│   ├── components/                 # React components
│   │   ├── ChatArea.tsx           # Main chat display area
│   │   ├── ChatArea.css           # Chat area styling
│   │   ├── Composer.tsx           # Message input composer
│   │   ├── Composer.css           # Composer styling
│   │   ├── LandscapeNotice.tsx    # Mobile orientation notice
│   │   ├── LandscapeNotice.css    # Landscape notice styling
│   │   ├── Message.tsx            # Individual message component
│   │   ├── Message.css            # Message styling
│   │   ├── ModelSelector.tsx      # AI model selection panel
│   │   ├── ModelSelector.css      # Model selector styling
│   │   ├── Sidebar.tsx            # Navigation sidebar
│   │   └── Sidebar.css            # Sidebar styling
│   ├── styles/
│   │   └── design-system.css      # Complete VASEY/AI design tokens
│   ├── utils/
│   │   └── haptics.ts             # Mobile haptic feedback utility
│   ├── App.tsx                     # Main application component
│   ├── App.css                     # Application layout styles
│   └── main.tsx                    # Application entry point
├── dist/                           # Production build output
├── OmniDev3_Master_Prompt.txt     # Original specification
├── README.md                       # Project overview
├── package.json                    # Dependencies and scripts
├── vite.config.ts                  # Vite configuration with PWA
└── tsconfig.json                   # TypeScript configuration
```

## 🎨 Design System Implementation

### VASEY/AI Color Palette

The application implements the complete VASEY/AI design token system:

- **Primary Accent**: `#22A4C1` (Teal) - Used for primary actions, focus states
- **Solid Cyan**: `#008A9C` - Used for borders and utility bars
- **Dark Blue**: `#2B3E47` - Primary background color
- **Charcoal**: `#32505A` - Secondary accent for folders and actions
- **Glassmorphism**: Translucent backgrounds with backdrop blur effects

### Typography

- **Font Family**: Reddit Pro Sans (imported from Google Fonts)
- **Headers**: Always uppercase with wide letter spacing
- **Font Weights**: 300-900 range for different emphasis levels
- **Responsive Scale**: xs (12px) to 4xl (36px)

### Spacing & Layout

- **Base Unit**: 8px spacing system
- **Border Radius**: Consistently rounded corners (4px - 32px)
- **Shadows**: Multiple elevation levels with glow effects
- **Transitions**: Smooth animations (150ms - 500ms)

## 🧩 Component Architecture

### 1. **App.tsx** - Main Application Container

- Manages global state (sidebar, incognito mode, model selection)
- Handles orientation detection for mobile devices
- Orchestrates layout of all major components

### 2. **Sidebar.tsx** - Navigation & Chat History

**Features**:
- Collapsible sidebar with glassmorphism effects
- Search functionality for chat history
- Incognito mode toggle
- Recent chats with folder organization
- User profile section
- Haptic feedback on interactions

### 3. **ChatArea.tsx** - Message Display

**Features**:
- Welcome screen with quick action cards
- Scrollable message container
- Auto-scroll to latest message
- Smooth entry animations

### 4. **Message.tsx** - Individual Message Component

**Features**:
- User and assistant message variants
- System message support
- Streaming indicator animation
- Copy and regenerate actions
- Timestamp display
- Model badge for assistant messages

### 5. **Composer.tsx** - Message Input

**Features**:
- Auto-expanding textarea
- File attachment support
- Aspect ratio selector for media
- Keyboard shortcuts (Enter to send, Shift+Enter for newline)
- Floating capsule design with glassmorphism
- Model indicator with live status

### 6. **ModelSelector.tsx** - AI Model Selection

**Features**:
- Floating trigger button
- Modal panel with model grid
- Multiple AI models (GPT-4, Claude, Gemini, Llama)
- Model capabilities badges
- Selected state indication
- Smooth animations

### 7. **LandscapeNotice.tsx** - Mobile Orientation

**Features**:
- Enforces landscape mode on mobile
- Animated rotation indicator
- Blocks app until proper orientation
- Responsive to orientation changes

## 🔧 Technical Implementation

### PWA Configuration

The application is configured as a Progressive Web App:

```typescript
// vite.config.ts
VitePWA({
  registerType: 'autoUpdate',
  manifest: {
    name: 'OmniDev v4.0',
    short_name: 'OmniDev',
    theme_color: '#008A9C',
    background_color: '#0A1628',
    display: 'standalone',
    orientation: 'landscape'
  },
  workbox: {
    globPatterns: ['**/*.{js,css,html,ico,png,svg,woff,woff2}'],
    runtimeCaching: [/* Google Fonts caching */]
  }
})
```

### Haptic Feedback

Mobile haptic feedback is implemented using the Vibration API:

```typescript
// src/utils/haptics.ts
export function triggerHaptic(intensity: 'light' | 'medium' | 'heavy' | 'success' | 'warning' | 'error'): void {
  if ('vibrate' in navigator) {
    navigator.vibrate(hapticPatterns[intensity]);
  }
}
```

### Glassmorphism Effects

Liquid glass styling is achieved through CSS custom properties:

```css
.glass {
  background: var(--glass-bg);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid var(--glass-border);
}
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

```bash
# Clone the repository
git clone https://github.com/SeanVasey/OmniDevV4.git
cd OmniDevV4

# Install dependencies
pnpm install

# Start development server
pnpm run dev

# Build for production
pnpm run build

# Preview production build
pnpm run preview
```

### Development Server

The development server runs on `http://localhost:5173` with hot module replacement enabled.

## 📱 Mobile Optimization

### Landscape Mode Enforcement

The application enforces landscape orientation on mobile devices for optimal viewing:

```typescript
useEffect(() => {
  const checkOrientation = () => {
    const landscape = window.matchMedia('(orientation: landscape)').matches;
    setIsLandscape(landscape);
  };
  // ... orientation change listeners
}, []);
```

### Responsive Breakpoints

- **Desktop**: > 1024px - Full sidebar visible
- **Tablet**: 768px - 1024px - Collapsible sidebar
- **Mobile**: < 768px - Overlay sidebar, landscape enforced
- **Mobile Landscape**: < 600px height - Compact spacing

## 🎭 Theming

### Dark Mode (Default)

The application uses dark mode by default with the VASEY/AI color scheme.

### Incognito Mode

Activated via the sidebar toggle, incognito mode provides:
- Pure black backgrounds
- Reduced accent colors
- Privacy-focused UI

```css
[data-mode="incognito"] {
  --bg-primary: var(--black-pure);
  --accent-primary: var(--grey-400);
}
```

## 🔮 Future Enhancements

Based on the master prompt, potential future additions include:

1. **Backend Integration**: Connect to actual AI APIs
2. **Real-time Streaming**: Implement SSE for streaming responses
3. **Media Processing**: Full multimodal input handling
4. **Context Management**: Advanced conversation context controls
5. **Project Organization**: Folder management and tagging
6. **Export Functionality**: Download conversations
7. **Collaboration**: Multi-user features
8. **Voice Input**: Speech-to-text integration

## 📚 Key Technologies

- **React 18**: UI framework with hooks
- **TypeScript**: Type-safe development
- **Vite**: Fast build tool and dev server
- **PWA**: Progressive Web App capabilities
- **CSS Custom Properties**: Dynamic theming
- **Vibration API**: Mobile haptic feedback

## 🎯 Design Principles

1. **Glassmorphism**: Translucent, polished UI elements
2. **Smooth Animations**: All interactions are animated
3. **Haptic Feedback**: Tactile responses on mobile
4. **Responsive Design**: Mobile-first approach
5. **Accessibility**: Semantic HTML and ARIA labels
6. **Performance**: Optimized builds and lazy loading

## 📄 License

This project follows the specifications provided in the OmniDev3 Master Prompt.

## 🤝 Contributing

This is a specification-driven implementation. Any contributions should align with the master prompt requirements and VASEY/AI design guidelines.

---

**Built with ❤️ following the OmniDev v4.0 Master Prompt**
