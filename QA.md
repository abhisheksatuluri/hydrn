# Hydrn QA Checklist

## Critical User Flows

- [ ] **Home Load:** Page loads under 2s on 4G. Hero video plays automatically.
- [ ] **Theme Switch:** Toggling theme instantly updates background, text colors, and 3D lighting (Sunrise/Rave).
- [ ] **Navigation:** Clicking "About" navigates via client-side routing (no full reload).
- [ ] **Scroll Interaction:** Scrolling down the Home page triggers "Route" section camera movement.
- [ ] **Video Slider:** Swiping left/right on video cards works smoothly. Lazy loading applies.

## 3D & FX

- [ ] **Materials:** Shoe model loads with correct PBR textures (verified via console logs if placeholder).
- [ ] **Particles:** Animated particles visible in background.
- [ ] **Trails:** Swipe gesture leaves a cyan/white trail.
- [ ] **Bubbles:** Floating bubbles appear in the overlay.
- [ ] **Performance:** 3D canvas does not lag scrolling. `devicePixelRatio` cap is effective.

## Accessibility (a11y)

- [ ] **Keyboard:** Can Tab through all nav links and Theme Toggle.
- [ ] **Contrast:** Dark mode text is legible against dark backgrounds.
- [ ] **ARIA:** Screen reader announces "Switch to light mode" on toggle.
- [ ] **Motion:** `prefers-reduced-motion` is respected (if implemented).

## Tech & SEO

- [ ] **Meta Tags:** Verify `<title>` and `<meta name="description">` match content.
- [ ] **PWA:** "Install Hydrn" banner appears (Android). Offline mode works.
- [ ] **Console:** No Red/Error logs during normal usage.
