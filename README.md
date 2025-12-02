# OmniDev v4.0

**Mobile-first multimodal AI chat workspace with progressive web app capabilities**

## Overview

OmniDev v4.0 is a production-grade, mobile-first, multimodal AI chat workspace that synthesizes the best UX patterns from ChatGPT, Claude, and Qwen into a cohesive, haptic-enabled design system.

## Design Philosophy

OmniDev implements a hybrid design system drawing from industry-leading AI chat interfaces:

- **ChatGPT** → Sidebar architecture, project organization, search functionality
- **Claude** → Floating capsule composer, incognito/ghost mode, context pills, model selector
- **Qwen/Grok** → Media upload tools, aspect ratio controls, feature toggle pills

## Key Features

### Core Capabilities
- **Mobile-First Design**: Native-like touch interactions with haptic feedback integration
- **Multimodal Interface**: Support for text, images, audio, and video inputs
- **Progressive Web App**: Installable, offline-capable, and responsive across all devices
- **Advanced Model Selection**: Dynamic AI model switching with context preservation
- **Project Organization**: Hierarchical chat management with folders and tags

### Design System
- **Typography**: Inter variable font with comprehensive type scale
- **Color Palette**: VASEY/AI brand colors with teal primary accent
- **Glassmorphism**: Modern floating UI elements with backdrop blur
- **Dark Mode**: Default dark theme with incognito/ghost mode support
- **Responsive Layout**: Adaptive interface from mobile to desktop

## Technical Stack

- **Frontend Framework**: React with TypeScript
- **Styling**: CSS custom properties with modern design tokens
- **Build Tool**: Vite for fast development and optimized production builds
- **PWA Support**: Service workers for offline functionality
- **Mobile Optimization**: Touch gestures, haptic feedback, and native-like interactions

## Documentation

The complete system specification and implementation guide is available in:
- [`OmniDev3_Master_Prompt.txt`](./OmniDev3_Master_Prompt.txt) - Comprehensive master prompt with all design tokens, component specifications, and implementation details

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or pnpm
- Modern browser with PWA support

### Installation

```bash
# Clone the repository
git clone https://github.com/SeanVasey/OmniDevV4.git
cd OmniDevV4

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production

```bash
# Create optimized production build
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
OmniDevV4/
├── src/
│   ├── components/      # React components
│   ├── styles/          # CSS and design tokens
│   ├── hooks/           # Custom React hooks
│   ├── utils/           # Utility functions
│   └── types/           # TypeScript type definitions
├── public/              # Static assets
├── docs/                # Additional documentation
└── OmniDev3_Master_Prompt.txt  # Master specification
```

## Design Tokens

The application uses a comprehensive design token system based on the VASEY/AI brand:

- **Primary Accent**: Teal (#22A4C1)
- **Dark Background**: Dark Blue (#2B3E47)
- **Secondary Accent**: Charcoal (#32505A)
- **Typography**: Inter variable font family
- **Spacing**: 8px base unit with consistent scale

## Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is proprietary and confidential.

## Contact

**VASEY Multimedia**
- Website: [vasey.ai](https://vasey.ai)
- GitHub: [@SeanVasey](https://github.com/SeanVasey)

---

Built with ❤️ by the VASEY team
