import React, { createContext, useEffect, useState } from 'react'
import { getLocalStorage, setLocalStorage } from '../utils/localStorage'

export const AuthContext = createContext()

const AuthProvider = ({children}) => {

  const [userData, setUserData] = useState({
    employees: [],
    admins: []
  })

  useEffect(() => {
    setLocalStorage()
    const {employees, admins} = getLocalStorage()
    setUserData({employees, admins})
  }, [])
  
  

  return (
    <div>
      <AuthContext.Provider value={userData}>
        {children}
      </AuthContext.Provider>
    </div>
  )
}

export default AuthProvider