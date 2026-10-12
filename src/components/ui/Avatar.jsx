import { initials } from '../../utils/format'

export default function Avatar({ name, className = 'h-9 w-9 text-sm' }) {
  return (
    <span
      className={`flex shrink-0 items-center justify-center rounded-full bg-linear-to-br from-indigo-500 to-fuchsia-500 font-bold text-white ${className}`}
      aria-hidden="true"
    >
      {initials(name)}
    </span>
  )
}
