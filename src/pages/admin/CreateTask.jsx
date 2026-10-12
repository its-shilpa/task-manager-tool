import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../../context/AuthProvider'
import { useTasks } from '../../context/TaskProvider'
import { useToast } from '../../context/ToastContext'
import useReveal from '../../hooks/useReveal'
import { CATEGORIES } from '../../utils/status'
import { firstName, todayISO } from '../../utils/format'
import PageHeader from '../../components/ui/PageHeader'

export default function CreateTask() {
  const { employees } = useAuth()
  const { addTask } = useTasks()
  const { toast } = useToast()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const scope = useReveal()

  // /admin/tasks/new?employee=e2 pre-selects Rahul (used by the Employees page)
  const preselected = employees.some((e) => e.id === searchParams.get('employee'))
    ? searchParams.get('employee')
    : ''

  const [form, setForm] = useState({
    title: '',
    description: '',
    category: CATEGORIES[0],
    dueDate: '',
    assignedTo: preselected,
  })
  const [errors, setErrors] = useState({})

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
    // Clear the error of the field being edited
    setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const validate = () => {
    const next = {}
    if (!form.title.trim()) next.title = 'Give the task a title.'
    if (!form.assignedTo) next.assignedTo = 'Choose who should do this task.'
    if (!form.dueDate) next.dueDate = 'Pick a due date.'
    else if (form.dueDate < todayISO()) next.dueDate = 'The due date can\'t be in the past.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!validate()) return

    const task = addTask(form)
    const employee = employees.find((e) => e.id === task.assignedTo)
    toast(`Task assigned to ${firstName(employee?.name)}`)
    navigate('/admin/tasks')
  }

  return (
    <div ref={scope}>
      <PageHeader title="New task" subtitle="Describe the work and choose who does it." />

      <form
        data-reveal
        onSubmit={handleSubmit}
        noValidate
        className="card grid max-w-3xl gap-5 p-5 sm:grid-cols-2 sm:p-7"
      >
        <div className="sm:col-span-2">
          <label htmlFor="title" className="mb-1.5 block text-sm font-semibold">
            Title
          </label>
          <input
            id="title"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Example: Build the login page"
            className="field"
            aria-invalid={Boolean(errors.title)}
            aria-describedby={errors.title ? 'title-error' : undefined}
          />
          {errors.title && <FieldError id="title-error">{errors.title}</FieldError>}
        </div>

        <div>
          <label htmlFor="assignedTo" className="mb-1.5 block text-sm font-semibold">
            Assign to
          </label>
          <select
            id="assignedTo"
            name="assignedTo"
            value={form.assignedTo}
            onChange={handleChange}
            className="field"
            aria-invalid={Boolean(errors.assignedTo)}
            aria-describedby={errors.assignedTo ? 'assignedTo-error' : undefined}
          >
            <option value="">Select an employee</option>
            {employees.map((employee) => (
              <option key={employee.id} value={employee.id}>
                {employee.name} ({employee.position})
              </option>
            ))}
          </select>
          {errors.assignedTo && <FieldError id="assignedTo-error">{errors.assignedTo}</FieldError>}
        </div>

        <div>
          <label htmlFor="dueDate" className="mb-1.5 block text-sm font-semibold">
            Due date
          </label>
          <input
            id="dueDate"
            name="dueDate"
            type="date"
            min={todayISO()}
            value={form.dueDate}
            onChange={handleChange}
            className="field"
            aria-invalid={Boolean(errors.dueDate)}
            aria-describedby={errors.dueDate ? 'dueDate-error' : undefined}
          />
          {errors.dueDate && <FieldError id="dueDate-error">{errors.dueDate}</FieldError>}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="category" className="mb-1.5 block text-sm font-semibold">
            Category
          </label>
          <select id="category" name="category" value={form.category} onChange={handleChange} className="field">
            {CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="description" className="mb-1.5 block text-sm font-semibold">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={5}
            value={form.description}
            onChange={handleChange}
            placeholder="What needs to be done, and what does done look like?"
            className="field resize-y"
          />
        </div>

        <div className="flex flex-col-reverse gap-3 border-t border-line pt-5 sm:col-span-2 sm:flex-row sm:justify-end">
          <button type="button" onClick={() => navigate(-1)} className="btn-ghost">
            Cancel
          </button>
          <button type="submit" className="btn-gradient">
            Create task
          </button>
        </div>
      </form>
    </div>
  )
}

function FieldError({ id, children }) {
  return (
    <p id={id} role="alert" className="mt-1.5 text-sm font-medium text-rose-600 dark:text-rose-300">
      {children}
    </p>
  )
}
