import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import seedTasks from '../data/tasks.json'
import { ALLOWED_TRANSITIONS, STATUS } from '../utils/status'
import { loadJSON, saveJSON } from '../utils/storage'

const TaskContext = createContext(null)
const TASKS_KEY = 'taskflow.tasks.v1'

export default function TaskProvider({ children }) {
  const [tasks, setTasks] = useState(() => loadJSON(TASKS_KEY, seedTasks))

  // Save every change, so tasks are still there after a refresh
  useEffect(() => {
    saveJSON(TASKS_KEY, tasks)
  }, [tasks])

  // Admin: create a task for an employee
  const addTask = useCallback((data) => {
    const task = {
      id: Date.now(),
      title: data.title.trim(),
      description: data.description.trim(),
      category: data.category,
      dueDate: data.dueDate,
      assignedTo: data.assignedTo,
      status: STATUS.NEW,
    }
    setTasks((prev) => [task, ...prev])
    return task
  }, [])

  // Employee: move a task forward (new -> active -> completed/failed)
  const setTaskStatus = useCallback((id, nextStatus) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id && ALLOWED_TRANSITIONS[task.status]?.includes(nextStatus)
          ? { ...task, status: nextStatus }
          : task
      )
    )
  }, [])

  // Admin: delete a task, only while nobody has accepted it yet
  const removeTask = useCallback((id) => {
    setTasks((prev) => prev.filter((task) => !(task.id === id && task.status === STATUS.NEW)))
  }, [])

  // Admin: give a task to somebody else, only while it is still new
  const reassignTask = useCallback((id, employeeId) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id && task.status === STATUS.NEW ? { ...task, assignedTo: employeeId } : task
      )
    )
  }, [])

  const value = useMemo(
    () => ({ tasks, addTask, setTaskStatus, removeTask, reassignTask }),
    [tasks, addTask, setTaskStatus, removeTask, reassignTask]
  )

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>
}

export const useTasks = () => useContext(TaskContext)
