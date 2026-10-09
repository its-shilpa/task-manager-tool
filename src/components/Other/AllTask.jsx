import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthProvider'

const AllTask = () => {
  const authData = useContext(AuthContext)
  const employees = authData?.employees || []

  return (
    <div className="mt-8 rounded-2xl border border-white/10 bg-gradient-to-br from-[#252525] via-[#202020] to-[#151515] p-4 sm:p-6 shadow-2xl">

      {/* Section Header */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white">
            All Employees
          </h2>
          <p className="mt-1 text-sm text-gray-400">
            Manage and track employee task progress
          </p>
        </div>

        <span className="w-fit rounded-full bg-white/10 px-4 py-2 text-xs font-medium text-gray-300">
          {employees.length} Employees
        </span>
      </div>

      {/* Scrollable Table */}
      <div className="max-h-[420px] overflow-auto rounded-xl">

        {/* Column Header */}
        <div className="grid min-w-[650px] grid-cols-5 gap-4 border-b border-white/10 bg-[#202020] px-5 py-4 text-xs font-semibold uppercase tracking-wider text-gray-400">
          <span>Employee</span>
          <span className="text-center">New Tasks</span>
          <span className="text-center">Active Tasks</span>
          <span className="text-center">Completed</span>
          <span className="text-center">Failed</span>
        </div>

        {/* Employee Rows */}
        {employees.map((employee) => {
          const counts = employee.taskCounts || {
            newTask: employee.tasks?.filter(task => task.newTask).length || 0,
            active: employee.tasks?.filter(task => task.active).length || 0,
            completed: employee.tasks?.filter(task => task.completed).length || 0,
            failed: employee.tasks?.filter(task => task.failed).length || 0,
          }

          return (
            <div
              key={employee.id}
              className="grid min-w-[650px] grid-cols-5 items-center gap-4 border-b border-white/5 px-5 py-4 transition hover:bg-white/5"
            >

              {/* Employee Info */}
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-500/20 text-sm font-semibold text-blue-400">
                  {employee.name?.charAt(0).toUpperCase()}
                </div>

                <div className="min-w-0">
                  <h3 className="truncate text-sm font-medium text-white">
                    {employee.name}
                  </h3>
                  <p className="truncate text-xs text-gray-500">
                    {employee.role}
                  </p>
                </div>
              </div>

              {/* New Tasks */}
              <div className="text-center">
                <span className="inline-flex min-w-9 justify-center rounded-lg bg-blue-500/15 px-3 py-2 text-sm font-semibold text-blue-400">
                  {counts.newTask}
                </span>
              </div>

              {/* Active Tasks */}
              <div className="text-center">
                <span className="inline-flex min-w-9 justify-center rounded-lg bg-amber-500/15 px-3 py-2 text-sm font-semibold text-amber-400">
                  {counts.active}
                </span>
              </div>

              {/* Completed Tasks */}
              <div className="text-center">
                <span className="inline-flex min-w-9 justify-center rounded-lg bg-emerald-500/15 px-3 py-2 text-sm font-semibold text-emerald-400">
                  {counts.completed}
                </span>
              </div>

              {/* Failed Tasks */}
              <div className="text-center">
                <span className="inline-flex min-w-9 justify-center rounded-lg bg-red-500/15 px-3 py-2 text-sm font-semibold text-red-400">
                  {counts.failed}
                </span>
              </div>

            </div>
          )
        })}

        {employees.length === 0 && (
          <p className="py-10 text-center text-sm text-gray-500">
            No employees found.
          </p>
        )}
      </div>
    </div>
  )
}

export default AllTask
