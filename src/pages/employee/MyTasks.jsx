import { useState } from 'react'
import { useAuth } from '../../context/AuthProvider'
import { useTasks } from '../../context/TaskProvider'
import useReveal from '../../hooks/useReveal'
import { countByStatus, STATUS_META, STATUS_ORDER } from '../../utils/status'
import { firstName, percent } from '../../utils/format'
import EmptyState from '../../components/ui/EmptyState'
import FilterTabs from '../../components/ui/FilterTabs'
import PageHeader from '../../components/ui/PageHeader'
import ProgressBar from '../../components/ui/ProgressBar'
import StatCard from '../../components/ui/StatCard'
import TaskCard from '../../components/ui/TaskCard'

const STAT_ICONS = { new: 'inbox', active: 'play', completed: 'check', failed: 'alert' }

const EMPTY_TEXT = {
  all: 'When your admin assigns you a task, it will show up here.',
  new: "No new tasks. You're all caught up.",
  active: 'Accept a new task to start working on it.',
  completed: 'Finished tasks will be listed here.',
  failed: 'Nothing has failed. Nice.',
}

export default function MyTasks() {
  const { currentUser } = useAuth()
  const { tasks } = useTasks()
  const scope = useReveal()
  const [filter, setFilter] = useState('all')

  // Only the tasks that belong to the logged-in employee
  const mine = tasks.filter((task) => task.assignedTo === currentUser.id)
  const counts = countByStatus(mine)
  const progress = percent(counts.completed, counts.total)

  const tabs = [
    { value: 'all', label: 'All', count: counts.total },
    ...STATUS_ORDER.map((status) => ({
      value: status,
      label: STATUS_META[status].label,
      count: counts[status],
    })),
  ]

  const visible = filter === 'all' ? mine : mine.filter((task) => task.status === filter)

  return (
    <div ref={scope}>
      <PageHeader
        title="My tasks"
        subtitle={`Hi ${firstName(currentUser.name)}, here is what is on your plate.`}
      />

      <div data-reveal className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {STATUS_ORDER.map((status) => (
          <StatCard
            key={status}
            label={STATUS_META[status].label}
            value={counts[status]}
            icon={STAT_ICONS[status]}
            gradient={STATUS_META[status].gradient}
          />
        ))}
      </div>

      <section data-reveal className="card mt-6 p-5">
        <div className="mb-3 flex items-center justify-between text-sm">
          <span className="font-semibold">Your progress</span>
          <span className="font-bold tabular-nums">
            {counts.completed} of {counts.total} done
          </span>
        </div>
        <ProgressBar value={progress} label="Share of your tasks completed" />
      </section>

      <div data-reveal className="mt-6">
        <FilterTabs tabs={tabs} active={filter} onChange={setFilter} />
      </div>

      <div data-reveal className="mt-5">
        {visible.length === 0 ? (
          <EmptyState icon="clipboard" title="Nothing here" text={EMPTY_TEXT[filter]} />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {visible.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
