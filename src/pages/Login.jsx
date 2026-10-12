import { useLayoutEffect, useRef, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import gsap from 'gsap'
import { useAuth } from '../context/AuthProvider'
import { prefersReducedMotion } from '../utils/motion'
import Logo from '../components/ui/Logo'
import StatusBadge from '../components/ui/StatusBadge'
import ThemeToggle from '../components/ui/ThemeToggle'

const DEMO_ACCOUNTS = [
  { label: 'Admin', email: 'admin@example.com', password: 'admin123' },
  { label: 'Employee', email: 'shilpa@example.com', password: 'shilpa123' },
]

const PREVIEW_ROWS = [
  { title: 'Design login screen', status: 'completed' },
  { title: 'Write API documentation', status: 'active' },
  { title: 'Test form validation', status: 'new' },
]

export default function Login() {
  const { currentUser, login } = useAuth()
  const navigate = useNavigate()
  const scope = useRef(null)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  // The one big animation of the app: the login screen building itself
  useLayoutEffect(() => {
    if (prefersReducedMotion() || !scope.current) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.from('[data-hero]', { opacity: 0, y: 24, duration: 0.7, stagger: 0.12 })
        .from('[data-row]', { opacity: 0, x: -24, duration: 0.5, stagger: 0.12 }, '-=0.3')
        .from('[data-card]', { opacity: 0, y: 24, duration: 0.6 }, 0.1)
    }, scope)

    return () => ctx.revert()
  }, [])

  // Already logged in? Go straight to the right dashboard.
  if (currentUser) {
    return <Navigate to={currentUser.role === 'admin' ? '/admin' : '/employee'} replace />
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const result = login(email, password)

    if (!result.ok) {
      setError(result.error)
      return
    }

    navigate(result.user.role === 'admin' ? '/admin' : '/employee', { replace: true })
  }

  const fillDemo = (account) => {
    setEmail(account.email)
    setPassword(account.password)
    setError('')
  }

  return (
    <div ref={scope} className="grid min-h-screen lg:grid-cols-2">
      {/* Left: brand panel (large screens only) */}
      <section className="relative hidden overflow-hidden bg-linear-to-br from-indigo-700 via-violet-700 to-fuchsia-700 p-12 text-white lg:flex lg:flex-col lg:justify-between">
        <div className="absolute -top-24 -right-24 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-32 -left-16 h-96 w-96 rounded-full bg-fuchsia-400/20 blur-3xl" />

        <div className="relative" data-hero>
          <Logo />
        </div>

        <div className="relative max-w-md">
          <h1 data-hero className="text-5xl font-extrabold leading-tight tracking-tight">
            Know who is doing what, and what is done.
          </h1>
          <p data-hero className="mt-4 text-lg text-white/80">
            Assign work, follow progress, and close tasks without chasing anyone.
          </p>

          <div className="mt-10 space-y-3">
            {PREVIEW_ROWS.map((row) => (
              <div
                key={row.title}
                data-row
                className="flex items-center justify-between gap-4 rounded-2xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur"
              >
                <span className="truncate text-sm font-semibold">{row.title}</span>
                <span className="shrink-0 rounded-full bg-surface">
                  <StatusBadge status={row.status} />
                </span>
              </div>
            ))}
          </div>
        </div>

        <p className="relative text-sm text-white/60">Demo build. Data is saved in your browser only.</p>
      </section>

      {/* Right: form */}
      <section className="relative flex items-center justify-center px-4 py-16 sm:px-8">
        <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
          <ThemeToggle />
        </div>

        <div data-card className="w-full max-w-md">
          <Logo className="mb-8 lg:hidden" />

          <h2 className="gradient-text text-3xl font-extrabold tracking-tight sm:text-4xl">Welcome back</h2>
          <p className="mt-2 text-muted">Log in to see your tasks.</p>

          <form onSubmit={handleSubmit} className="card mt-8 space-y-5 p-6 sm:p-7" noValidate>
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-semibold">
                Email
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="field"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-1.5 block text-sm font-semibold">
                Password
              </label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Your password"
                className="field"
                required
              />
            </div>

            {error && (
              <p role="alert" className="rounded-xl bg-rose-500/10 px-3 py-2 text-sm font-medium text-rose-600 dark:text-rose-300">
                {error}
              </p>
            )}

            <button type="submit" className="btn-gradient w-full py-3">
              Log in
            </button>
          </form>

          <div className="mt-6 text-sm text-muted">
            <p>Want to look around? Fill in a demo account:</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {DEMO_ACCOUNTS.map((account) => (
                <button
                  key={account.label}
                  type="button"
                  onClick={() => fillDemo(account)}
                  className="btn-ghost"
                >
                  {account.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
