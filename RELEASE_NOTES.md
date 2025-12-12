# Hydrn Web App v1.0 Release Notes

**Release Date:** 2025-12-12
**Version:** 1.0.0

## 🚀 New Features

- **Cinematic 3D Integration:** Full screen Hero with Spline 3D overlay and parallax depth.
- **Dynamic Themes:** "Sunrise" (Light) and "Rave" (Dark) modes with synchronized 3D lighting and FX.
- **Interactive Route Map:** Scroll-driven 3D camera exploration of the Hyderabad running route.
- **Community Hub:** Video slider showcasing event highlights.
- **PWA Support:** Installable on mobile devices with offline fallback.

## 🛠 Technical Highlights

- **Stack:** Vite, React, Tailwind, Three.js.
- **Performance:**
  - Route-based code splitting.
  - HDRI texture caching.
  - PMREM lighting generation.
  - Lazy-loaded assets.
- **SEO & Accessibility:** Fully optimized meta tags, JSON-LD structure, and WCAG compliance.

## ⚠️ Known Limitations (v1.0)

- **3D Assets:** Currently using placeholder `.glb` files. Visuals will appear as geometric primitives until final assets are swapped in `spline_scenes/`.
- **Browser Support:** WebGL 2.0 required. Fallback for very old devices is static images.

## 📦 Deployment

Built to `dist/` directory. Optimized for Vercel/Netlify.

1. `npm install`
2. `npm run build`
3. `serve dist`
