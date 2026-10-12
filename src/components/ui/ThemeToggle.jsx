import { useRef } from 'react'
import gsap from 'gsap'
import { useTheme } from '../../context/ThemeContext'
import { prefersReducedMotion } from '../../utils/motion'
import Icon from './Icon'

export default function ThemeToggle({ className = '' }) {
  const { theme, toggleTheme } = useTheme()
  const iconRef = useRef(null)

  const handleClick = () => {
    toggleTheme()
    // Small spin so the click feels acknowledged
    if (!prefersReducedMotion() && iconRef.current) {
      gsap.fromTo(
        iconRef.current,
        { rotate: -90, scale: 0.6, opacity: 0.4 },
        { rotate: 0, scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(2)' }
      )
    }
  }

  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`btn-ghost h-10 w-10 p-0 ${className}`}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      title={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
    >
      <span ref={iconRef} className="flex">
        <Icon name={isDark ? 'sun' : 'moon'} className="h-5 w-5" />
      </span>
    </button>
  )
}
