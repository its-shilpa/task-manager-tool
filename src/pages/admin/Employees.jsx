import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthProvider'
import { useTasks } from '../../context/TaskProvider'
import useReveal from '../../hooks/useReveal'
import { countByStatus, STATUS_META, STATUS_ORDER } from '../../utils/status'
import { percent } from '../../utils/format'
import Avatar from '../../components/ui/Avatar'
import Icon from '../../components/ui/Icon'
import PageHeader from '../../components/ui/PageHeader'
import ProgressBar from '../../components/ui/ProgressBar'

export default function Employees() {
  const { employees } = useAuth()
  const { tasks } = useTasks()
  const scope = useReveal()

  return (
    <div ref={scope}>
      <PageHeader title="Employees" subtitle="See how far each person is with their tasks." />

      <div data-reveal className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {employees.map((employee) => {
          const mine = tasks.filter((task) => task.assignedTo === employee.id)
          const counts = countByStatus(mine)
          const progress = percent(counts.completed, counts.total)

          return (
            <article key={employee.id} className="card flex flex-col p-5">
              <div className="flex items-center gap-3">
                <Avatar name={employee.name} className="h-11 w-11" />
                <div className="min-w-0">
                  <h3 className="truncate font-bold">{employee.name}</h3>
                  <p className="truncate text-sm text-muted">{employee.position}</p>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-4 gap-2 text-center">
                {STATUS_ORDER.map((status) => (
                  <div key={status} className="rounded-xl bg-surface-2 px-1 py-2.5">
                    <p className="text-lg font-extrabold tabular-nums">{counts[status]}</p>
                    <p className="flex items-center justify-center gap-1 text-[11px] text-muted">
                      <span className={`h-1.5 w-1.5 rounded-full ${STATUS_META[status].dot}`} />
                      {STATUS_META[status].label}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-5">
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="text-muted">Completed</span>
                  <span className="font-bold tabular-nums">{progress}%</span>
                </div>
                <ProgressBar value={progress} label={`${employee.name} progress`} />
              </div>

              <Link
                to={`/admin/tasks/new?employee=${employee.id}`}
                className="btn-ghost mt-5 w-full"
              >
                <Icon name="plus" className="h-4 w-4" />
                Assign a task
              </Link>
            </article>
          )
        })}
      </div>
    </div>
  )
}
