import React, { useEffect, useState, useRef, useImperativeHandle, forwardRef } from 'react'
import Spline from '@splinetool/react-spline'
import { loadScene, preloadScene } from '../lib/splineLoader'
import { loadHDRI } from '../lib/hdriLoader'
import assets from '../assets-manifest.json'

// Setup texture cache for injection
const KEY_TEXTURES = {
  // PBR Shoe
  shoe_albedo: assets['pbr:shoe:albedo'],
  shoe_normal: assets['pbr:shoe:normal'],
  shoe_roughness: assets['pbr:shoe:roughness'],
  shoe_emissive: assets['pbr:shoe:emissive'],

  // FX
  fx_techno: assets['fx:techno'],
  fx_bloom: assets['fx:bloom'],
  fx_bubble: assets['fx:bubble'],

  // Terrain
  terrain_albedo: assets['terrain:albedo'],
  terrain_roughness: assets['terrain:roughness']
}

// Fallback renderer for GLB files using raw Three.js
const ThreeCanvas = ({ url, className, onLoad, theme }) => {
  const containerRef = useRef(null)
  const requestRef = useRef(null)
  const rendererRef = useRef(null)

  // Dynamic imports for Three.js to avoid bundling if not used
  useEffect(() => {
    let scene, camera, renderer, mixer, controls
    let isMounted = true

    const init = async () => {
      if (!containerRef.current) return

      // Import Three.js dependencies dynamically
      const THREE = await import('three')
      const { GLTFLoader } = await import('three/examples/jsm/loaders/GLTFLoader.js')
      const { DRACOLoader } = await import('three/examples/jsm/loaders/DRACOLoader.js')
      const { RGBELoader } = await import('three/examples/jsm/loaders/RGBELoader.js')

      // Scene Setup
      scene = new THREE.Scene()

      // Camera
      const aspect = containerRef.current.clientWidth / containerRef.current.clientHeight
      camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 1000)
      camera.position.set(0, 5, 10)
      camera.lookAt(0, 0, 0)

      // Renderer
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
      renderer.toneMapping = THREE.ACESFilmicToneMapping
      renderer.toneMappingExposure = 1.0
      renderer.outputColorSpace = THREE.SRGBColorSpace
      containerRef.current.appendChild(renderer.domElement)
      rendererRef.current = renderer

      // Lights (Fallback if no HDRI)
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
      scene.add(ambientLight)
      const dirLight = new THREE.DirectionalLight(0xffffff, 1)
      dirLight.position.set(5, 10, 7)
      scene.add(dirLight)

      // HDRI Logic
      const loadEnvironment = async () => {
        // Locked to Dark/Rave mode
        // Note: HDRI file 'rave_ambient_hdri_4k.hdr' is reporting format errors. 
        // Disabling HDRI to prevent crash and rely on fallback lights.
        /*
        const hdriKey = 'hdri:rave'
        const hdriUrl = assets[hdriKey]
        if (hdriUrl) {
          new RGBELoader().load(hdriUrl, (texture) => {
            texture.mapping = THREE.EquirectangularReflectionMapping
            scene.environment = texture
          }, undefined, (err) => {
            console.warn(`[SplineCanvas] Failed to load HDRI: ${hdriUrl}. Using default lighting.`, err)
          })
        }
        */
      }
      loadEnvironment()

      // Load GLB
      const loader = new GLTFLoader()

      // DRACO Support
      const dracoLoader = new DRACOLoader()
      dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/')
      loader.setDRACOLoader(dracoLoader)

      loader.load(url, (gltf) => {
        if (!isMounted) return
        const model = gltf.scene

        // Auto-center and scale
        const box = new THREE.Box3().setFromObject(model)
        const center = box.getCenter(new THREE.Vector3())
        const size = box.getSize(new THREE.Vector3())

        const maxDim = Math.max(size.x, size.y, size.z)
        const scale = 5 / maxDim
        model.scale.setScalar(scale)
        model.position.sub(center.multiplyScalar(scale))

        scene.add(model)

        // Animation Mixer
        if (gltf.animations && gltf.animations.length) {
          mixer = new THREE.AnimationMixer(model)
          gltf.animations.forEach(clip => mixer.clipAction(clip).play())
        }

        if (onLoad) onLoad({ _scene: scene, _renderer: renderer }) // Mock SplineApp interface
      })

      // Resize Handler
      const handleResize = () => {
        if (!containerRef.current) return
        camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight
        camera.updateProjectionMatrix()
        renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
      }
      window.addEventListener('resize', handleResize)

      // Animation Loop
      const clock = new THREE.Clock()
      const animate = () => {
        if (!isMounted) return
        requestRef.current = requestAnimationFrame(animate)
        if (mixer) mixer.update(clock.getDelta())

        // Gentle rotation for placeholders
        if (scene.children.length > 0) {
          scene.rotation.y += 0.001
        }

        renderer.render(scene, camera)
      }
      animate()

      return () => {
        isMounted = false
        window.removeEventListener('resize', handleResize)
        cancelAnimationFrame(requestRef.current)
        if (renderer) renderer.dispose()
        // clean up scene...
      }
    }

    init()

    return () => {
      // cleanup handled in init return
    }
  }, [url, theme])

  return <div ref={containerRef} className={className} />
}

const SplineCanvas = forwardRef(({ sceneId: initialSceneId, className, onLoaded }, ref) => {
  const [currentSceneUrl, setCurrentSceneUrl] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [theme] = useState('dark') // Locked to dark
  const splineAppRef = useRef(null)

  // Manifest Validation Hook
  useEffect(() => {
    // Check if the requested scene exists in the manifest
    if (initialSceneId) {
      // We import manifest via splineLoader or checking assets
      // Since we don't have direct access to the raw manifest json file here (it's imported as assets in calling code or verify dynamically)
      // But we can check if loadScene resolves correctly.
    }
  }, [initialSceneId])

  useImperativeHandle(ref, () => ({
    preload: preloadScene,
    load: loadSceneById,
    // Add alias for attachScene as requested
    attachScene: (id) => {
      console.log(`[SplineCanvas] Attaching scene: ${id}`)
      loadSceneById(id)
    },
    setTheme: (t) => { setTheme(t); updateSplineTheme(t) },
    updateEnvironment: updateEnvironment,
    dispose: () => { }
  }))

  const loadSceneById = async (id) => {
    // Prevent reload if same
    if (!id) return;

    setIsLoading(true)
    try {
      // Verify via manifest logic inside loadScene
      const url = await loadScene(id)

      if (!url) {
        console.error(`[SplineCanvas] Scene ID "${id}" not found in manifest.`)
        // Could set a fallback URL here if needed
        return
      }

      setCurrentSceneUrl(url)

      // If mock Three.js loading, the onLoad is called in ThreeCanvas.
      // If real Spline, it calls onLoad when mounted.
      // For now, assume if URL is set we are mostly ready or wait for component onLoad
      if (isGLB && onLoaded) {
        // ThreeCanvas calls onLoad when fully loaded
      }
    } catch (err) {
      console.error(`[SplineCanvas] Failed to load scene: ${id}`, err)
      // trigger loaded even on error to avoid blocking UI
      if (onLoaded) onLoaded()
    } finally {
      setIsLoading(false)
    }
  }

  // --- Environment Logic ---
  const updateEnvironment = async (t) => {
    // If using ThreeCanvas, the useEffect there handles it on theme change.
    // If using Spline, we try to use the ref.
    if (splineAppRef.current) {
      // Placeholder for real Spline API calls if available
    }
  }

  const updateSplineTheme = (t) => {
    // Placeholder
  }

  // Theme listener removed - app is locked to dark mode

  useEffect(() => {
    if (initialSceneId) {
      if (initialSceneId === 'hero') preloadScene('hero')
      loadSceneById(initialSceneId)
    }
  }, [initialSceneId])

  const handleSplineLoad = (splineApp) => {
    splineAppRef.current = splineApp
    if (onLoaded) onLoaded(splineApp)
  }

  // Determine renderer type
  const isGLB = currentSceneUrl?.endsWith('.glb') || currentSceneUrl?.endsWith('.gltf')

  return (
    <div
      className={`relative w-full h-full ${className} transition-opacity duration-700 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
    >
      {currentSceneUrl && (
        isGLB ? (
          <ThreeCanvas url={currentSceneUrl} className="w-full h-full" onLoad={handleSplineLoad} theme={theme} />
        ) : (
          <Spline
            scene={currentSceneUrl}
            onLoad={(e) => {
              handleSplineLoad(e)
              if (onLoaded) onLoaded(e)
            }}
            className="w-full h-full"
            renderOnDemand={false}
          />
        )
      )}
    </div>
  )
})

SplineCanvas.displayName = 'SplineCanvas'

export default SplineCanvas
