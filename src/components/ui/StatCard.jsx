import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { prefersReducedMotion } from '../../utils/motion'
import Icon from './Icon'

// A number with a label. The number counts up when it appears or changes.
export default function StatCard({ label, value, icon, gradient = 'from-indigo-500 to-violet-500', className = '' }) {
  const shown = useRef(0)
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (prefersReducedMotion()) {
      shown.current = value
      setDisplay(value)
      return
    }

    const counter = { n: shown.current }
    const tween = gsap.to(counter, {
      n: value,
      duration: 0.9,
      ease: 'power2.out',
      onUpdate: () => {
        shown.current = counter.n
        setDisplay(Math.round(counter.n))
      },
    })
    return () => tween.kill()
  }, [value])

  return (
    <div className={`card flex items-center gap-4 p-4 sm:p-5 ${className}`}>
      <span
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-linear-to-br text-white ${gradient}`}
      >
        <Icon name={icon} className="h-5 w-5" />
      </span>
      <div className="min-w-0">
        <p className="text-2xl font-extrabold leading-none tabular-nums">{display}</p>
        <p className="mt-1.5 truncate text-sm text-muted">{label}</p>
      </div>
    </div>
  )
}
