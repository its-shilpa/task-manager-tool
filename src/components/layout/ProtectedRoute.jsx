import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthProvider'

// Wrap routes with this to keep the wrong people out.
//   not logged in           -> /login
//   logged in, wrong role   -> their own dashboard
export default function ProtectedRoute({ role }) {
  const { currentUser } = useAuth()
  const location = useLocation()

  if (!currentUser) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />
  }

  if (role && currentUser.role !== role) {
    return <Navigate to={currentUser.role === 'admin' ? '/admin' : '/employee'} replace />
  }

  return <Outlet />
}
