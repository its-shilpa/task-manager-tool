// Small wrappers around localStorage so a broken/blocked storage never crashes the app.

export const loadJSON = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

export const saveJSON = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    /* storage full or blocked - ignore */
  }
}

export const removeKey = (key) => {
  try {
    localStorage.removeItem(key)
  } catch {
    /* ignore */
  }
}
