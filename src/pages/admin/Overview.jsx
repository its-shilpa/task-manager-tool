import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthProvider'
import { useTasks } from '../../context/TaskProvider'
import useReveal from '../../hooks/useReveal'
import { countByStatus, STATUS_META } from '../../utils/status'
import { formatDate, percent } from '../../utils/format'
import EmptyState from '../../components/ui/EmptyState'
import Icon from '../../components/ui/Icon'
import PageHeader from '../../components/ui/PageHeader'
import ProgressBar from '../../components/ui/ProgressBar'
import StatCard from '../../components/ui/StatCard'
import StatusBadge from '../../components/ui/StatusBadge'

export default function Overview() {
  const { tasks } = useTasks()
  const { getUser } = useAuth()
  const scope = useReveal()

  const counts = countByStatus(tasks)
  const completion = percent(counts.completed, counts.total)
  const recent = tasks.slice(0, 6)

  return (
    <div ref={scope}>
      <PageHeader title="Overview" subtitle="How the team is doing across all tasks.">
        <Link to="/admin/tasks/new" className="btn-gradient">
          <Icon name="plus" className="h-4 w-4" />
          New task
        </Link>
      </PageHeader>

      <div data-reveal className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
        <StatCard label="All tasks" value={counts.total} icon="clipboard" className="col-span-2 sm:col-span-1" />
        <StatCard label="New" value={counts.new} icon="inbox" gradient={STATUS_META.new.gradient} />
        <StatCard label="In progress" value={counts.active} icon="play" gradient={STATUS_META.active.gradient} />
        <StatCard label="Completed" value={counts.completed} icon="check" gradient={STATUS_META.completed.gradient} />
        <StatCard label="Failed" value={counts.failed} icon="alert" gradient={STATUS_META.failed.gradient} />
      </div>

      <section data-reveal className="card mt-6 p-5 sm:p-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold">Overall progress</h2>
            <p className="mt-1 text-sm text-muted">
              {counts.completed} of {counts.total} tasks completed
            </p>
          </div>
          <p className="gradient-text text-3xl font-extrabold tabular-nums">{completion}%</p>
        </div>
        <div className="mt-4">
          <ProgressBar value={completion} label="Share of tasks completed" />
        </div>
      </section>

      <section data-reveal className="mt-6">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-bold">Latest tasks</h2>
          <Link to="/admin/tasks" className="text-sm font-semibold text-muted hover:text-fg">
            See all tasks
          </Link>
        </div>

        {recent.length === 0 ? (
          <EmptyState
            icon="clipboard"
            title="No tasks yet"
            text="Create the first task and assign it to someone on your team."
          >
            <Link to="/admin/tasks/new" className="btn-gradient">
              Create a task
            </Link>
          </EmptyState>
        ) : (
          <ul className="card divide-y divide-line overflow-hidden">
            {recent.map((task) => (
              <li
                key={task.id}
                className="flex flex-col gap-2 px-4 py-3.5 sm:flex-row sm:items-center sm:justify-between sm:px-5"
              >
                <div className="min-w-0">
                  <p className="truncate font-semibold">{task.title}</p>
                  <div className="mt-0.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted">
                    <span>{getUser(task.assignedTo)?.name || 'Unassigned'}</span>
                    <span className="flex items-center gap-1.5">
                      <Icon name="calendar" className="h-4 w-4" />
                      {formatDate(task.dueDate)}
                    </span>
                  </div>
                </div>
                <StatusBadge status={task.status} />
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}
