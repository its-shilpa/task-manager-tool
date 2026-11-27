import Icon from './Icon'

export default function Logo({ className = '' }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-br from-blue-600 via-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-500/25">
        <Icon name="check" className="h-5 w-5" />
      </span>
      <span className="text-lg font-extrabold tracking-tight">TaskFlow</span>
    </div>
  )
}
