export const APP_CONFIG = {
  defaultTheme: 'dark',
  assetManifestPath: '/src/assets-manifest.json', // In prod this might differ
  spline: {
    heroSceneId: 'hero', // logical ID, mapped to file in splineLoader
    preload: ['hero']
  }
}
