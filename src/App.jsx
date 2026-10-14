import { Navigate, Route, Routes } from 'react-router-dom'
import { useAuth } from './context/AuthProvider'
import DashboardLayout from './components/layout/DashboardLayout'
import ProtectedRoute from './components/layout/ProtectedRoute'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import AdminOverview from './pages/admin/Overview'
import ManageTasks from './pages/admin/ManageTasks'
import CreateTask from './pages/admin/CreateTask'
import Employees from './pages/admin/Employees'
import MyTasks from './pages/employee/MyTasks'


// Sidebar links for each role. Add a link here when you add a new page.
const adminLinks = [
  { to: '/admin', label: 'Overview', icon: 'dashboard', end: true },
  { to: '/admin/tasks', label: 'Tasks', icon: 'list', end: true },
  { to: '/admin/tasks/new', label: 'New task', icon: 'plus', end: true },
  { to: '/admin/employees', label: 'Employees', icon: 'users', end: true },
]


const employeeLinks = [{ to: '/employee', label: 'My tasks', icon: 'list', end: true }]

// "/" sends people to the right place
function Home() {
  const { currentUser } = useAuth()
  if (!currentUser) return <Navigate to="/login" replace />
  return <Navigate to={currentUser.role === 'admin' ? '/admin' : '/employee'} replace />
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />

      {/* Admin only */}
      <Route element={<ProtectedRoute role="admin" />}>
        <Route path="/admin" element={<DashboardLayout links={adminLinks} />}>
          <Route index element={<AdminOverview />} />
          <Route path="tasks" element={<ManageTasks />} />
          <Route path="tasks/new" element={<CreateTask />} />
          <Route path="employees" element={<Employees />} />
        </Route>
      </Route>

      {/* Employee only */}
      <Route element={<ProtectedRoute role="employee" />}>
        <Route path="/employee" element={<DashboardLayout links={employeeLinks} />}>
          <Route index element={<MyTasks />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
