import { useTasks } from '../../context/TaskProvider'
import { useToast } from '../../context/ToastContext'
import { STATUS } from '../../utils/status'
import { formatDate } from '../../utils/format'
import Icon from './Icon'
import StatusBadge from './StatusBadge'

// One task as seen by an employee, with the buttons for its current status.
export default function TaskCard({ task }) {
  const { setTaskStatus } = useTasks()
  const { toast } = useToast()

  const accept = () => {
    setTaskStatus(task.id, STATUS.ACTIVE)
    toast('Task accepted')
  }

  const complete = () => {
    setTaskStatus(task.id, STATUS.COMPLETED)
    toast('Task completed')
  }

  const fail = () => {
    if (!window.confirm(`Mark "${task.title}" as failed? This can't be undone.`)) return
    setTaskStatus(task.id, STATUS.FAILED)
    toast('Task marked as failed', 'error')
  }

  return (
    <article className="card flex flex-col p-5 transition hover:-translate-y-0.5">
      <div className="flex items-center justify-between gap-3 text-sm">
        <span className="truncate rounded-lg bg-surface-2 px-2.5 py-1 text-xs font-semibold text-muted">
          {task.category}
        </span>
        <span className="flex shrink-0 items-center gap-1.5 text-muted">
          <Icon name="calendar" className="h-4 w-4" />
          {formatDate(task.dueDate)}
        </span>
      </div>

      <h3 className="mt-4 text-lg font-bold leading-snug">{task.title}</h3>
      <p className="mt-2 mb-5 line-clamp-3 text-sm leading-relaxed text-muted">{task.description}</p>

      <div className="mt-auto flex flex-wrap items-end justify-between gap-3 border-t border-line pt-4">
        <StatusBadge status={task.status} />

        <div className="flex flex-wrap gap-2">
          {task.status === STATUS.NEW && (
            <button type="button" onClick={accept} className="btn-gradient">
              Accept task
            </button>
          )}

          {task.status === STATUS.ACTIVE && (
            <>
              <button type="button" onClick={fail} className="btn-danger">
                Mark as failed
              </button>
              <button type="button" onClick={complete} className="btn-gradient">
                Complete task
              </button>
            </>
          )}
        </div>
      </div>
    </article>
  )
}
