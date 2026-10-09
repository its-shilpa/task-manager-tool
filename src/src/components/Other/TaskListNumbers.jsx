import React from 'react'

const TaskListNumbers = ({userData}) => {
    
  return (
    <div className='flex mt-10 justify-between gap-5 screen'>
        <div className='rounded-xl w-[45%] py-6 px-8 bg-gradient-to-t from-blue-300 to-pink-300'>
            <h2 className='text-2xl font-semibold'>{userData?.taskCounts?.newTask}</h2>
            <h3 className='text-xl font-semiblod'>New Task</h3>
        </div>
        <div className='rounded-xl w-[45%] py-6 px-8 bg-gradient-to-t from-indigo-300 to-emerald-300'>
            <h2 className='text-2xl font-semibold'>{userData?.taskCounts?.active}</h2>
            <h3 className='text-xl font-medium'>Accepted Task</h3>
        </div>
        <div className='rounded-xl w-[45%] py-6 px-8 bg-gradient-to-t from-violet-300 to-rose-300'>
            <h2 className='text-2xl font-semibold'>{userData?.taskCounts?.completed}</h2>
            <h3 className='text-xl font-medium'>Completed Task</h3>
        </div>
        <div className='rounded-xl w-[45%] py-6 px-8 bg-gradient-to-t from-yellow-300 to-orange-300'>
            <h2 className='text-2xl font-semibold'>{userData?.taskCounts?.failed}</h2>
            <h3 className='text-xl font-medium'>Failed Task</h3>
        </div>
    </div>
  )
}

export default TaskListNumbers