export const formatDate = (iso) => {
  if (!iso) return 'No date'
  const date = new Date(`${iso}T00:00:00`)
  if (Number.isNaN(date.getTime())) return iso
  return date.toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })
}

// Today as YYYY-MM-DD in the user's local time (used as the min date in the form)
export const todayISO = () => {
  const d = new Date()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${d.getFullYear()}-${month}-${day}`
}

export const firstName = (name = '') => name.trim().split(' ')[0] || ''

export const initials = (name = '') =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('')

export const percent = (part, total) => (total === 0 ? 0 : Math.round((part / total) * 100))
