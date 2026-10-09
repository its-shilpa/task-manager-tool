import React, { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthProvider'

    const CreateTask = () => {

        const [userData, setUserData] = useContext(AuthContext)
        const employees = userData?.employees || []

        // Store all form values in one state object
        const [taskData, setTaskData] = useState({
            taskTitle: '',
            taskDate: '',
            assignedTo: '',
            taskCategory: '',
            taskDescription: ''
        })

    // Handle changes for every input
    const handelChange = (e) => {
        const {name, value} = e.target

        setTaskData((prevData) => ({
            ...prevData,
            [name] : value
        }))
    }
  
    
const submitHandler = (e) => {
    e.preventDefault()

    if (!taskData.taskTitle.trim() || !taskData.assignedTo.trim()) {
        alert("Please enter a task title and employee name")
        return
    }

    const employeeExists = userData.employees.some(
        (employee) =>
        employee.name?.trim().toLowerCase() ===
        taskData.assignedTo.trim().toLowerCase()
    )

    if (!employeeExists) {
        alert("Employee not found. Please check the employee name.")
        return
    }

    const newTask = {
        ...taskData,
        taskId: Date.now(),
        newTask: true,
        active: false,
        completed: false,
        failed: false,
    }

    // Update React state immutably
    setUserData((prevData) => ({
        ...prevData,
        employees: prevData.employees.map((employee) => {
        if (
            employee.name?.trim().toLowerCase() !==
            newTask.assignedTo.trim().toLowerCase()
        ) {
            return employee
        }

        const tasks = [...(employee.tasks || []), newTask]

        return {
            ...employee,
            tasks,
            taskCounts: {
            newTask: tasks.filter((task) => task.newTask).length,
            active: tasks.filter((task) => task.active).length,
            completed: tasks.filter((task) => task.completed).length,
            failed: tasks.filter((task) => task.failed).length,
            },
        }
        }),
    }))

    setTaskData({
        taskTitle: "",
        taskDate: "",
        assignedTo: "",
        taskCategory: "",
        taskDescription: "",
    })

    alert("Task created successfully!")
    }


  return (
    <div className="mt-10">
        <form
        onSubmit={submitHandler}
        className="mx-auto max-w-6xl rounded-2xl border border-white/10 bg-[#252525] p-8 shadow-2xl">
        
        {/* Form Header */}
        <div className="mb-8">
            <h2 className="text-2xl font-semibold">Create New Task</h2>
            <p className="mt-1 text-sm text-gray-400">
            Add a new task and assign it to an employee.
            </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">

            {/* Left Side */}
            <div className="space-y-6">

                {/* Task Title */}
                <div>
                    <label className="mb-2 block text-sm font-medium text-gray-300">
                    Task Title
                    </label>
                    <input
                    type="text"
                    name="taskTitle"
                    value={taskData.taskTitle}
                    onChange={handelChange}
                    placeholder="Give task title"
                    className="w-full rounded-lg border border-white/10 bg-[#1C1C1C] px-4 py-3 text-sm text-white placeholder-gray-500 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                </div>

                {/* Task Date */}
                <div>
                    <label className="mb-2 block text-sm font-medium text-gray-300">
                    Task Date
                    </label>
                    <input
                    type="date"
                    name="taskDate"
                    value={taskData.taskDate}
                    onChange={handelChange}
                    className="w-full rounded-lg border border-white/10 bg-[#1C1C1C] px-4 py-3 text-sm text-white outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                </div>

                {/* Assign To */}
                
                {/* Assign To */}
                <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                    Task Assign To
                </label>

                <select
                    name="assignedTo"
                    value={taskData.assignedTo}
                    onChange={handelChange}
                    required
                    className="w-full rounded-lg border border-white/10 bg-[#1C1C1C] px-4 py-3 text-sm text-white outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                >
                    <option value="" disabled>
                    Select an employee
                    </option>

                    {employees.map((employee) => (
                    <option key={employee.id} value={employee.name}>
                        {employee.name}
                    </option>
                    ))}
                </select>
                </div>


                {/* Category */}
                <div>
                    <label className="mb-2 block text-sm font-medium text-gray-300">
                    Task Category
                    </label>
                    <input
                    type="text"
                    name="taskCategory"
                    value={taskData.taskCategory}
                    onChange={handelChange}
                    placeholder="Design, Development, etc."
                    className="w-full rounded-lg border border-white/10 bg-[#1C1C1C] px-4 py-3 text-sm text-white placeholder-gray-500 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                </div>

            </div>

            {/* Right Side */}
            <div>
            <label className="mb-2 block text-sm font-medium text-gray-300">
                Task Description
            </label>

            <textarea
                name="taskDescription"
                value={taskData.taskDescription}
                onChange={handelChange}
                placeholder="Describe the task..."
                rows="12"
                className="w-full resize-none rounded-lg border border-white/10 bg-[#1C1C1C] px-4 py-3 text-sm text-white placeholder-gray-500 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            ></textarea>
            </div>

        </div>

        {/* Button */}
        <div className="mt-8 flex justify-end border-t border-white/10 pt-6">
            <button
            type="submit"
            className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-blue-700 active:scale-95"
            >
            Create Task
            </button>
        </div>

        </form>
    </div>
  )
}

export default CreateTask