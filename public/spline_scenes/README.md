# Spline Scenes

This directory contains the optimized GLB (glTF 2.0) scene files for the Hydrn Web App.

## Files

- `hero.glb`: Main runner scene. Root node: `HydrnRunner`.
- `bubbles.glb`: Floating bubbles. Root node: `BubbleGroup`.
- `route.glb`: 3D map/route. Root node: `RouteMap`.
- `medal.glb`: Reward asset. Root node: `Medal`.
- `rave_lights.glb`: Volumetric lights. Root node: `LightRig`.
- `shoe_morph.glb`: Shoe to logo morph. Root node: `HydrnShoe`.

## Authoring Guidelines

1. **Format:** GLB (Binary glTF).
2. **Textures:** Do not embed heavy textures. Reference them from `src/assets/images` if possible, or use compressed textures.
3. **Animations:** Ensure animation clips are named and present at the root level.
4. **Optimization:** Keep total scene size under 25MB for Hero, under 5MB for others.
5. **Language:** Metadata and node names should be in UK English where applicable (e.g. `colour_variant`).

## Updating Scenes

To update a scene:

1. Export your optimized .glb from Spline/Blender.
2. Overwrite the file in this directory.
3. Update `export-log.json` with the new file size and triangle count.
