# Retro CRT Terminal Portfolio

A highly polished, interactive developer portfolio themed as a vintage 80s CRT monitor and command deck. Built with high-fidelity styling, dynamic animations, and interactive controls.

## 📺 Key Features

- **Interactive CRT Television**: A fully interactive retro television set featuring:
  - **Rabbit-Ear Telescopic Antennas**: Click to extend/retract or scroll to adjust telescopic height.
  - **Clickable Control Knobs**: Rotate knobs to cycle through color themes or toggle TV power (LED status light shifts green/red).
  - **CRT Screen Overlays**: Retro scanlines, corner vignettes, and animated snow static noise.
- **Live Terminal Console**: An animated typing command terminal displaying system logs corresponding to selected navigation categories.
- **Responsive Proportional Scaling**: Built using fluid parent wrappers and dynamic transform factors, ensuring the CRT frame, knobs, and antennas scale down proportionally on mobile viewports without layout warp.
- **Skills Matrix (Capabilities Deck)**: Organizes technical skillsets into modular diagnostic cards with Lucide indicators.
- **Circular Projects Gallery**: A premium horizontal project swipe deck featuring interactive terminal mockups, launch links, and source code archives.
- **SMTP/HTTP Communication Deck**: Structured contact cards styled as connection ports (SMTP PORT-25, HTTP PORT-80, HTTPS PORT-443) with smooth hover translations.
- **Modern Navigation**: Fixed floating command panel with a fullscreen backdrop blur overlay for enhanced contrast and touch-target optimization.

## 🛠️ Technology Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vite.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) & Vanilla CSS variables
- **Animations**: CSS Keyframe Sequences & Transitions
- **Icons**: [Lucide React](https://lucide.dev/)

## 🚀 Setup & Commands

First, clone the repository and navigate into the project directory:

```bash
git clone https://github.com/ka-te-vey/Portfolio.git
cd Portfolio
```

### Install Dependencies
```bash
npm install
```

### Run Locally (Development Server)
```bash
npm run dev
```

### Build for Production
Compiles minified production-ready assets inside the `dist/` directory:
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```
