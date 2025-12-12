/*
  HDRI Loader Utility
  - Uses Three.js RGBELoader to load .hdr files
  - Uses PMREMGenerator to pre-process env maps for PBR
  - Caches processed textures to prevent redundant network calls
*/

import * as THREE from 'three'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'

const cache = new Map()
const loader = new RGBELoader()

/**
 * Loads and processes an HDRI environment map.
 * @param {string} url - Path to the .hdr file
 * @param {THREE.WebGLRenderer} renderer - The active Three.js renderer
 * @returns {Promise<THREE.Texture>} - Processed PMREM texture
 */
export const loadHDRI = async (url, renderer) => {
  if (!url || !renderer) return null

  if (cache.has(url)) {
    return cache.get(url)
  }

  return new Promise((resolve, reject) => {
    loader.load(
      url,
      (texture) => {
        try {
          const pmremGenerator = new THREE.PMREMGenerator(renderer)
          pmremGenerator.compileEquirectangularShader()

          const envMap = pmremGenerator.fromEquirectangular(texture).texture

          // Cleanup raw texture to save memory
          texture.dispose()
          pmremGenerator.dispose()

          cache.set(url, envMap)
          resolve(envMap)
        } catch (error) {
          console.error('[HDRILoader] PMREM Generation failed:', error)
          reject(error)
        }
      },
      undefined,
      (err) => {
        console.warn(`[HDRILoader] Failed to load HDRI: ${url}`, err)
        reject(err)
      }
    )
  })
}
