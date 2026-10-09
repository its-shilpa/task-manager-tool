import React, { useState } from 'react'

    const CreateTask = () => {
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

        // Add default task status properties
        const newTask = {
        ...taskData,
        taskId: Date.now(),
        newTask: true,
        active: false,
        completed: false,
        failed: false
        }
    //    console.log('New Task:', newTask)

     const data = JSON.parse(localStorage.getItem('employees'))
        
        data.forEach(function(elem) {
            if(newTask.assignedTo === elem.name) {
                elem.tasks.push(newTask)
                console.log(elem);
                
            }
            
        })

        // Clear the form after submission
        setTaskData({
            taskTitle: '',
            taskDate: '',
            assignedTo: '',
            taskCategory: '',
            taskDescription: ''
        })       
        
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
                <div>
                    <label className="mb-2 block text-sm font-medium text-gray-300">
                    Task Assign To
                    </label>
                    <input
                    type="text"
                    name="assignedTo"
                    value={taskData.assignedTo}
                    onChange={handelChange}
                    placeholder="Employee name"
                    className="w-full rounded-lg border border-white/10 bg-[#1C1C1C] px-4 py-3 text-sm text-white placeholder-gray-500 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
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