import { createContext, useCallback, useContext, useLayoutEffect, useMemo, useRef, useState } from 'react'
import gsap from 'gsap'
import { prefersReducedMotion } from '../utils/motion'
import Icon from '../components/ui/Icon'

const ToastContext = createContext(null)
let nextId = 1

function Toast({ message, type }) {
  const ref = useRef(null)

  // Slide the message in when it appears
  useLayoutEffect(() => {
    if (prefersReducedMotion() || !ref.current) return
    const tween = gsap.fromTo(
      ref.current,
      { y: 16, opacity: 0, scale: 0.97 },
      { y: 0, opacity: 1, scale: 1, duration: 0.35, ease: 'power3.out' }
    )
    return () => tween.kill()
  }, [])

  const isError = type === 'error'

  return (
    <div
      ref={ref}
      className="card flex items-center gap-3 px-4 py-3 text-sm font-medium"
    >
      <span
        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-white ${
          isError ? 'bg-rose-500' : 'bg-emerald-500'
        }`}
      >
        <Icon name={isError ? 'x' : 'check'} className="h-4 w-4" />
      </span>
      <span>{message}</span>
    </div>
  )
}

export default function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const toast = useCallback((message, type = 'success') => {
    const id = nextId++
    setToasts((prev) => [...prev, { id, message, type }])
    setTimeout(() => setToasts((prev) => prev.filter((item) => item.id !== id)), 3200)
  }, [])

  const value = useMemo(() => ({ toast }), [toast])

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        role="status"
        aria-live="polite"
        className="pointer-events-none fixed inset-x-4 bottom-4 z-50 flex flex-col gap-2 sm:inset-x-auto sm:right-6 sm:bottom-6 sm:w-80"
      >
        {toasts.map((item) => (
          <Toast key={item.id} message={item.message} type={item.type} />
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export const useToast = () => useContext(ToastContext)
