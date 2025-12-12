# Hydrn Web App

A production-ready cinematic 3D web experience built with Vite, React, and Tailwind CSS.

## Project Overview

Hydrn is an immersive web application designed to connect the running community with electronic music culture. This project utilizes advanced web technologies to deliver a premium, app-like experience.

### Tech Stack

- **Core:** Vite + React (JavaScript)
- **Styling:** Tailwind CSS + PostCSS
- **Animation:** Framer Motion
- **3D:** Three.js + @splinetool/react-spline
- **PWA:** Workbox

## Local Development

1. **Install Dependencies**

   ```bash
   npm install
   ```

2. **Start Dev Server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) to view it in your browser.

## Build

To build the project for production:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

## Vercel Deployment

1. Connect your repository to Vercel.
2. Use the default Vite settings:
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
3. Ensure `public/assets` are correctly served.

## PWA Testing

To test the PWA functionality:

1. Run `npm run build`.
2. Run `npm run preview`.
3. Open the preview URL and look for the install icon in the address bar (Chrome/Edge).

## Asset Architecture

Assets are managed via `src/assets-manifest.json`. This maps logical keys (e.g., `video:hero`) to physical file paths.

- **Videos:** `src/assets/videos/`
- **Images:** `src/assets/images/`
- **Manifest:** `src/assets-manifest.json`

## Notes for Contributors

- **Language:** UK English only.
- **Typography:** No em dashes. Use hyphens or commas instead.
- **Spline:** The Hero scene is preloaded; others are lazy-loaded.

---

© 2025 Hydrn

## Accessibility & Performance

- **Accessibility:**
  - Valid ARIA structure.
  - Keyboard navigation support.
  - WCAG AA contrast ratio compliance on main text.
- **Performance:**
  - Route-based code splitting using `React.lazy`.
  - Lazy-loaded Spline scenes to reduce initial TBT.
  - HDRI caching with PMREM generation.
- **SEO:**
  - Dynamic meta tags per page.
  - Sitemap and Robots.txt included.
  - Open Graph tags for social sharing.
