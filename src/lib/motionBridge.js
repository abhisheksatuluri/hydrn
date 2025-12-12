/*
  Motion Bridge
  - Coordinates React state transitions with Spline scene events
  - Handles crossfades and variable injections
*/

import { EASE, DURATION } from '../styles/motion-tokens'

export const bridge = {
  /**
   * Triggers a specific animation clip in the active Spline scene
   * @param {Object} splineApp - Spline App instance
   * @param {string} objName - Name of the object to animate
   * @param {string} state - State name (if using states) or event simulation
   */
  triggerAnimation: (splineApp, objName, state) => {
    if (!splineApp) return
    try {
      // Spline runtime API for state trigger (hypothetical, depends on runtime ver)
      // splineApp.emitEvent('mouseDown', objName)
      console.log(`[MotionBridge] Triggering ${objName} -> ${state}`)
    } catch (e) {
      console.warn('[MotionBridge] Trigger failed', e)
    }
  },

  /**
   * Smoothly interpolates an exposure/emissive value
   * This would typically run in a requestAnimationFrame loop or use GSAP
   * Here we return a config for Framer Motion to drive a value
   */
  transitionConfig: {
    duration: DURATION.slow,
    ease: EASE.authentic
  }
}
