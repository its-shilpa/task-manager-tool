import { initials } from '../../utils/format'

export default function Avatar({ name, className = 'h-9 w-9 text-sm' }) {
  return (
    <span
      className={`flex shrink-0 items-center justify-center rounded-full bg-linear-to-br from-blue-600 via-indigo-600 to-purple-600 font-bold text-white ${className}`}
      aria-hidden="true"
    >
      {initials(name)}
    </span>
  )
}
