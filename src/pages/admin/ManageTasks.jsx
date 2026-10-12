import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthProvider'
import { useTasks } from '../../context/TaskProvider'
import { useToast } from '../../context/ToastContext'
import useReveal from '../../hooks/useReveal'
import { countByStatus, STATUS, STATUS_META, STATUS_ORDER } from '../../utils/status'
import { firstName, formatDate } from '../../utils/format'
import Avatar from '../../components/ui/Avatar'
import EmptyState from '../../components/ui/EmptyState'
import FilterTabs from '../../components/ui/FilterTabs'
import Icon from '../../components/ui/Icon'
import PageHeader from '../../components/ui/PageHeader'
import StatusBadge from '../../components/ui/StatusBadge'

export default function ManageTasks() {
  const { tasks, removeTask, reassignTask } = useTasks()
  const { employees, getUser } = useAuth()
  const { toast } = useToast()
  const scope = useReveal()
  const [filter, setFilter] = useState('all')

  const counts = countByStatus(tasks)
  const tabs = [
    { value: 'all', label: 'All', count: counts.total },
    ...STATUS_ORDER.map((status) => ({
      value: status,
      label: STATUS_META[status].label,
      count: counts[status],
    })),
  ]

  const visible = filter === 'all' ? tasks : tasks.filter((task) => task.status === filter)

  const handleDelete = (task) => {
    if (!window.confirm(`Delete "${task.title}"? This can't be undone.`)) return
    removeTask(task.id)
    toast('Task deleted')
  }

  const handleReassign = (task, employeeId) => {
    if (!employeeId) return
    reassignTask(task.id, employeeId)
    toast(`Task moved to ${firstName(getUser(employeeId)?.name)}`)
  }

  return (
    <div ref={scope}>
      <PageHeader title="Tasks" subtitle="Every task in one place. New tasks can still be moved or deleted.">
        <Link to="/admin/tasks/new" className="btn-gradient">
          <Icon name="plus" className="h-4 w-4" />
          New task
        </Link>
      </PageHeader>

      <div data-reveal>
        <FilterTabs tabs={tabs} active={filter} onChange={setFilter} />
      </div>

      <div data-reveal className="mt-5">
        {visible.length === 0 ? (
          <EmptyState
            icon="clipboard"
            title="No tasks here"
            text={filter === 'all' ? 'Create a task to get started.' : 'No tasks have this status right now.'}
          />
        ) : (
          <ul className="space-y-3">
            {visible.map((task) => {
              const assignee = getUser(task.assignedTo)
              const isNew = task.status === STATUS.NEW

              return (
                <li key={task.id} className="card flex flex-col gap-4 p-4 sm:p-5 lg:flex-row lg:items-center">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-bold">{task.title}</h3>
                      <StatusBadge status={task.status} />
                    </div>
                    <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted">
                      <span className="flex items-center gap-2">
                        <Avatar name={assignee?.name} className="h-6 w-6 text-[10px]" />
                        {assignee?.name || 'Unassigned'}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Icon name="calendar" className="h-4 w-4" />
                        {formatDate(task.dueDate)}
                      </span>
                      <span className="rounded-lg bg-surface-2 px-2 py-0.5 text-xs font-semibold">
                        {task.category}
                      </span>
                    </div>
                  </div>

                  {isNew ? (
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                      <select
                        value=""
                        onChange={(e) => handleReassign(task, e.target.value)}
                        className="field py-2 text-sm sm:w-48"
                        aria-label={`Reassign ${task.title}`}
                      >
                        <option value="" disabled>
                          Reassign to...
                        </option>
                        {employees
                          .filter((employee) => employee.id !== task.assignedTo)
                          .map((employee) => (
                            <option key={employee.id} value={employee.id}>
                              {employee.name}
                            </option>
                          ))}
                      </select>
                      <button type="button" onClick={() => handleDelete(task)} className="btn-danger">
                        <Icon name="trash" className="h-4 w-4" />
                        Delete
                      </button>
                    </div>
                  ) : (
                    <p
                      className="flex items-center gap-1.5 text-sm text-muted"
                      title="Only new tasks can be moved or deleted"
                    >
                      <Icon name="lock" className="h-4 w-4" />
                      Locked
                    </p>
                  )}
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </div>
  )
}
