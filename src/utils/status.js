// One place that describes every task status.
// A task has exactly ONE status: new -> active -> completed | failed

export const STATUS = {
  NEW: 'new',
  ACTIVE: 'active',
  COMPLETED: 'completed',
  FAILED: 'failed',
}

export const STATUS_ORDER = [STATUS.NEW, STATUS.ACTIVE, STATUS.COMPLETED, STATUS.FAILED]

export const STATUS_META = {
  new: {
    label: 'New',
    badge: 'bg-sky-500/15 text-sky-700 dark:text-sky-300',
    dot: 'bg-sky-500',
    gradient: 'from-sky-500 to-indigo-500',
  },
  active: {
    label: 'In progress',
    badge: 'bg-amber-500/15 text-amber-700 dark:text-amber-300',
    dot: 'bg-amber-500',
    gradient: 'from-amber-500 to-orange-500',
  },
  completed: {
    label: 'Completed',
    badge: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300',
    dot: 'bg-emerald-500',
    gradient: 'from-emerald-500 to-teal-500',
  },
  failed: {
    label: 'Failed',
    badge: 'bg-rose-500/15 text-rose-700 dark:text-rose-300',
    dot: 'bg-rose-500',
    gradient: 'from-rose-500 to-pink-500',
  },
}

// Which status changes are allowed (used by the task context)
export const ALLOWED_TRANSITIONS = {
  new: ['active'],
  active: ['completed', 'failed'],
  completed: [],
  failed: [],
}

export const CATEGORIES = [
  'Design',
  'Development',
  'Bug Fix',
  'Testing',
  'Documentation',
  'Management',
  'Other',
]

export const countByStatus = (tasks) => ({
  total: tasks.length,
  new: tasks.filter((t) => t.status === STATUS.NEW).length,
  active: tasks.filter((t) => t.status === STATUS.ACTIVE).length,
  completed: tasks.filter((t) => t.status === STATUS.COMPLETED).length,
  failed: tasks.filter((t) => t.status === STATUS.FAILED).length,
})
