import React, { useContext, useEffect, useState } from 'react'
import Login from './components/Auth/Login'
import EmployeeDashboard from './components/Dashboard/EmployeeDashboard'
import AdminDashboard from './components/Dashboard/AdminDashboard'
import { AuthContext } from './context/AuthProvider'

const App = () => {

  const [user, setUser] = useState(null)
  const [loggedInUserData, setLoggedInUserData] = useState(null)

  const [authData, setAuthData] = useContext(AuthContext)

  // Check if user was already logged in
  
useEffect(() => {
  if (!authData) return

  const loggedInUser = localStorage.getItem("loggedInUser")

  if (!loggedInUser) return

  const userData = JSON.parse(loggedInUser)

  setUser(userData.role)

  if (userData.role === "employee") {
    const employee = authData.employees.find(
      (e) => e.id === userData.id
    )
    setLoggedInUserData(employee || null)
  }

  if (userData.role === "admin") {
    const admin = authData.admins.find(
      (e) => e.id === userData.id
    )
    setLoggedInUserData(admin || null)
  }
}, [authData])



  const handelLogin = (email, password) => {

    if (!authData) return


    // -------------------------
    // Check Admin
    // -------------------------

    const admin = authData.admins.find(
      (e) =>
        email === e.email &&
        password === e.password
    )

    if (admin) {

      setUser('admin')
      setLoggedInUserData(admin)

      localStorage.setItem(
        'loggedInUser',
        JSON.stringify({
          role: 'admin',
          id: admin.id
        })
      )

      return
    }


    // -------------------------
    // Check Employee
    // -------------------------

    const employee = authData.employees.find(
      (e) =>
        email === e.email &&
        password === e.password
    )

    if (employee) {

      setUser('employee')
      setLoggedInUserData(employee)

      localStorage.setItem(
        'loggedInUser',
        JSON.stringify({
          role: 'employee',
          id: employee.id
        })
      )

      return
    }

    alert("Invalid Credentials")
  }


  return (
    <div className="h-screen text-white bg-gray-900">

      {!user && (
        <Login handelLogin={handelLogin} />
      )}

      {user === 'admin' && (
        <AdminDashboard userData={loggedInUserData} changeUser={setUser}/>
      )}

      {user === 'employee' && (
        <EmployeeDashboard userData={loggedInUserData} changeUser={setUser}/>
      )}

    </div>
  )
}

export default App