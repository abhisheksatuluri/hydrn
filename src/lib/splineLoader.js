/* 
  Spline Scene Loader
  - Lazy loads scenes based on logical ID
  - Preloads critical scenes (Hero)
  - Caches scenes for performance
  - Maps logical IDs to local .glb files
*/

// Map logical IDs to real local paths (Phase 3 Integration)
const SCENE_MAP = {
  hero: '/spline_scenes/hero.glb',
  bubbles: '/spline_scenes/bubbles.glb',
  route: '/spline_scenes/route.glb',
  medal: '/spline_scenes/medal.glb',
  rave: '/spline_scenes/rave_lights.glb',
  shoe_morph: '/spline_scenes/shoe_morph.glb',
  about: '/spline_scenes/route.glb', // Reusing route for about preview
  footer: '/spline_scenes/bubbles.glb' // Reusing bubbles for footer
}

const sceneCache = new Map()

export const preloadScene = (sceneId) => {
  if (!SCENE_MAP[sceneId]) return
  if (sceneCache.has(sceneId)) return

  console.log(`[SplineLoader] Preloading scene: ${sceneId}`)

  // Use a fetch-based preload for .glb binary files
  const url = SCENE_MAP[sceneId]

  // Hint browser to preload
  const link = document.createElement('link')
  link.rel = 'preload'
  link.as = 'fetch'
  link.crossOrigin = 'anonymous'
  link.href = url
  document.head.appendChild(link)

  sceneCache.set(sceneId, { status: 'preloading', url })
}

export const loadScene = async (sceneId) => {
  if (!SCENE_MAP[sceneId]) {
    console.warn(`[SplineLoader] Scene ID "${sceneId}" not found in map.`)
    return null
  }

  console.log(`[SplineLoader] Loading scene: ${sceneId}`)
  return SCENE_MAP[sceneId] // Return the URL for Spline component/Three loader
}
