import { useEffect, useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthProvider'
import { firstName } from '../../utils/format'
import Avatar from '../ui/Avatar'
import Icon from '../ui/Icon'
import Logo from '../ui/Logo'
import ThemeToggle from '../ui/ThemeToggle'

// Shared shell for the admin and employee dashboards:
// sidebar on large screens, slide-in menu on phones and tablets.
export default function DashboardLayout({ links }) {
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  // Close the menu with the Escape key and stop the page behind it from scrolling
  useEffect(() => {
    if (!menuOpen) return

    const onKey = (event) => event.key === 'Escape' && setMenuOpen(false)
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  const closeMenu = () => setMenuOpen(false)

  return (
    <div className="min-h-screen lg:pl-64">
      {/* Dark overlay behind the mobile menu */}
      <div
        onClick={closeMenu}
        aria-hidden="true"
        className={`fixed inset-0 z-30 bg-black/50 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          menuOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-line bg-surface p-4 transition-[transform,visibility] duration-300 lg:visible lg:translate-x-0 ${
          menuOpen ? 'visible translate-x-0' : 'invisible -translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-2 py-2">
          <Logo />
          <button
            type="button"
            onClick={closeMenu}
            className="btn-ghost h-9 w-9 p-0 lg:hidden"
            aria-label="Close menu"
          >
            <Icon name="x" className="h-4 w-4" />
          </button>
        </div>

        <nav className="mt-8 flex flex-1 flex-col gap-1" aria-label="Main">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              onClick={closeMenu}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition ${
                  isActive
                    ? 'bg-linear-to-r from-indigo-600 to-fuchsia-600 text-white shadow-md shadow-violet-500/25'
                    : 'text-muted hover:bg-surface-2 hover:text-fg'
                }`
              }
            >
              <Icon name={link.icon} className="h-5 w-5" />
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="rounded-2xl border border-line bg-surface-2 p-3">
          <div className="flex items-center gap-3">
            <Avatar name={currentUser.name} />
            <div className="min-w-0">
              <p className="truncate text-sm font-bold">{currentUser.name}</p>
              <p className="truncate text-xs text-muted">{currentUser.position}</p>
            </div>
          </div>
          <button type="button" onClick={handleLogout} className="btn-ghost mt-3 w-full">
            <Icon name="logout" className="h-4 w-4" />
            Log out
          </button>
        </div>
      </aside>

      {/* Top bar */}
      <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-line bg-app/80 px-4 backdrop-blur sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="btn-ghost h-10 w-10 p-0 lg:hidden"
            aria-label="Open menu"
          >
            <Icon name="menu" className="h-5 w-5" />
          </button>
          <Logo className="lg:hidden" />
          <p className="hidden text-sm text-muted lg:block">
            Hello, <span className="font-semibold text-fg">{firstName(currentUser.name)}</span>
          </p>
        </div>

        <ThemeToggle />
      </header>

      <main className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <Outlet />
      </main>
    </div>
  )
}
