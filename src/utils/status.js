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
    badge: 'bg-blue-500/12 text-blue-700 dark:bg-blue-400/15 dark:text-blue-300',
    dot: 'bg-blue-500 dark:bg-blue-400',
    gradient: 'from-blue-500 to-indigo-600',
  },
  active: {
    label: 'In progress',
    badge: 'bg-amber-500/12 text-amber-700 dark:bg-amber-400/15 dark:text-amber-300',
    dot: 'bg-amber-500 dark:bg-amber-400',
    gradient: 'from-amber-500 to-orange-500',
  },
  completed: {
    label: 'Completed',
    badge: 'bg-emerald-500/12 text-emerald-700 dark:bg-emerald-400/15 dark:text-emerald-300',
    dot: 'bg-emerald-500 dark:bg-emerald-400',
    gradient: 'from-emerald-500 to-teal-500',
  },
  failed: {
    label: 'Failed',
    badge: 'bg-rose-500/12 text-rose-700 dark:bg-rose-400/15 dark:text-rose-300',
    dot: 'bg-rose-500 dark:bg-rose-400',
    gradient: 'from-rose-500 to-pink-600',
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
