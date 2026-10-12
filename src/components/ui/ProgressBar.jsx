export default function ProgressBar({ value, label }) {
  return (
    <div
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label}
      className="h-2 w-full overflow-hidden rounded-full bg-surface-2"
    >
      <div
        className="h-full rounded-full bg-linear-to-r from-indigo-500 via-violet-500 to-fuchsia-500 transition-[width] duration-700 ease-out"
        style={{ width: `${value}%` }}
      />
    </div>
  )
}
