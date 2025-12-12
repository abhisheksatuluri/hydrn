# QA Checklist - Phase 1

Use this checklist to verify the successful initialization of the Hydrn Web App.

## Project Structure

- [ ] `package.json` exists with correct scripts (dev, build, lint).
- [ ] Directory structure matches the specification (src, public, assets).
- [ ] Config files (`vite.config.js`, `tailwind.config.cjs`) are present.

## Assets

- [ ] `src/assets` contains `videos` and `images` folders.
- [ ] `src/assets-manifest.json` exists and maps keys to valid paths.
- [ ] Hero video (`morning_rave_hero.mp4`) is correctly placed and mapped.
- [ ] Logo files exist in `public/icons` and `src/assets/images/Logos`.

## Components & UI

- [ ] App compiles without errors (`npm run dev`).
- [ ] Home page loads with Hero video background (muted, autoplay).
- [ ] "Hydrn" title and "Get Started" button animate in.
- [ ] Video Slider displays thumbnails/videos from `Morning Rave` folder.
- [ ] Theme Toggle switches between dark/light modes (console log or visual change).
- [ ] Navigation works (Home <-> About).
- [ ] Pages use UK English spelling (e.g., "specialise", "organise") and no em dashes.

## PWA & Performance

- [ ] `manifest.webmanifest` is valid (check DevTools > Application > Manifest).
- [ ] Service worker registration script is integrated (check console for registration message in prod preview).

## Build

- [ ] `npm run build` completes successfully.
- [ ] `dist` folder is generated.
