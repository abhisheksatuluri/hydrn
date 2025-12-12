export const EASE = {
  // Cubic beziers
  authentic: [0.4, 0, 0.2, 1], // Standard, natural
  out: [0, 0, 0.2, 1], // Decelerate
  in: [0.4, 0, 1, 1], // Accelerate
  elastic: [0.5, 1.25, 0.25, 1.25] // Bouncy
}

export const DURATION = {
  instant: 0,
  fast: 0.2,
  base: 0.4,
  slow: 0.8,
  long: 1.5
}

export const VARIANTS = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: DURATION.base, ease: EASE.authentic }
  },
  fadeUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: DURATION.base, ease: EASE.out }
  },
  staggerContainer: {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }
}
