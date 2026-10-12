import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import seedUsers from '../data/users.json'
import { loadJSON, removeKey, saveJSON } from '../utils/storage'

const AuthContext = createContext(null)
const SESSION_KEY = 'taskflow.session'

// Demo only: users come from a JSON file and passwords are checked in the browser.
// A real app checks credentials on a server and never ships passwords to the client.
const users = seedUsers.map(({ password, ...safeUser }) => ({ ...safeUser, _password: password }))
const publicUsers = users.map(({ _password, ...safeUser }) => safeUser)

export default function AuthProvider({ children }) {
  // We only remember the id of the logged-in user, never the whole object
  const [sessionId, setSessionId] = useState(() => loadJSON(SESSION_KEY, null))

  const currentUser = useMemo(
    () => publicUsers.find((user) => user.id === sessionId) || null,
    [sessionId]
  )

  const employees = useMemo(() => publicUsers.filter((user) => user.role === 'employee'), [])

  const getUser = useCallback((id) => publicUsers.find((user) => user.id === id) || null, [])

  const login = useCallback((email, password) => {
    const match = users.find(
      (user) => user.email.toLowerCase() === email.trim().toLowerCase() && user._password === password
    )

    if (!match) {
      return { ok: false, error: 'Email or password is incorrect.' }
    }

    setSessionId(match.id)
    saveJSON(SESSION_KEY, match.id)
    const { _password, ...safeUser } = match
    return { ok: true, user: safeUser }
  }, [])

  const logout = useCallback(() => {
    setSessionId(null)
    removeKey(SESSION_KEY)
  }, [])

  const value = useMemo(
    () => ({ currentUser, employees, getUser, login, logout }),
    [currentUser, employees, getUser, login, logout]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
