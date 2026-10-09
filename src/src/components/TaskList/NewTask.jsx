import React from 'react'

const NewTask = ({userData}) => {
  return (
    <div className='flex-shrink-0 h-full w-[300px] p-5 border border-white/5 bg-gradient-to-r from-blue-500/10 to-purple-500/10 px-5 py-4 transition duration-300 hover:-translate-y-0.5 hover:border-blue-400/30 hover:from-blue-500/20 hover:to-purple-500/20 rounded-xl'>
        <div className='flex justify-between items-center'>
            <h3 className='bg-red-500 text-sm px-3 py-1 rounded'>{userData?.taskCategory}</h3>
            <h4 className='text-sm'>{userData?.taskDate}</h4>
        </div>
        <h2 className='mt-5 text-xl font-semibold'>{userData?.taskTitle}</h2>
        <p className='text-sm mt-2'>
            {userData?.taskDescription}
        </p>
        <div className='mt-4'>
            <button>Accept Task</button>
        </div>
    </div>
  )
}

export default NewTask