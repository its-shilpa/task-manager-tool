import { Link } from 'react-router-dom'
import Logo from '../components/ui/Logo'
import ThemeToggle from '../components/ui/ThemeToggle'

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <Logo className="mb-10" />
      <p className="gradient-text text-8xl font-extrabold">404</p>
      <h1 className="mt-4 text-2xl font-bold">This page doesn't exist</h1>
      <p className="mt-2 max-w-sm text-muted">The link may be broken, or the page may have moved.</p>
      <Link to="/" className="btn-gradient mt-8">
        Back to home
      </Link>
    </div>
  )
}
