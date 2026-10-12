import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { prefersReducedMotion } from '../utils/motion'

// Fades the main blocks of a page in, one after another, when the page opens.
// Usage:  const scope = useReveal()
//         <div ref={scope}> <section data-reveal> ... </section> </div>
export default function useReveal() {
  const scope = useRef(null)

  useLayoutEffect(() => {
    if (prefersReducedMotion() || !scope.current) return

    const ctx = gsap.context(() => {
      gsap.from('[data-reveal]', {
        opacity: 0,
        y: 14,
        duration: 0.5,
        ease: 'power2.out',
        stagger: 0.07,
        clearProps: 'opacity,transform',
      })
    }, scope)

    return () => ctx.revert()
  }, [])

  return scope
}
