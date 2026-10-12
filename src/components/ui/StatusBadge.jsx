import { STATUS_META } from '../../utils/status'

export default function StatusBadge({ status }) {
  const meta = STATUS_META[status]
  if (!meta) return null

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${meta.badge}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${meta.dot}`} />
      {meta.label}
    </span>
  )
}
