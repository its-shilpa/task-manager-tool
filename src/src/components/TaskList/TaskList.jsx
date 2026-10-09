import React, { useRef, useState } from 'react'
import AcceptTask from './AcceptTask'
import NewTask from './NewTask'
import CompleteTask from './CompleteTask'
import FailedTask from './FailedTask'

const TaskList = ({userData}) => {
  
  const listRef = useRef(null)
  const [isDragging, setIsDragging] = useState(false)
  const startX = useRef(0)
  const scrollStart = useRef(0)

  const handleMouseDown = (e) => {
    setIsDragging(true)
    startX.current = e.pageX - listRef.current.offsetLeft
    scrollStart.current = listRef.current.scrollLeft
  }

  const stopDragging = () => setIsDragging(false)

  const handleMouseMove = (e) => {
    if (!isDragging) return
    e.preventDefault()
    const x = e.pageX - listRef.current.offsetLeft
    const walk = (x - startX.current) * 1.5 // drag speed multiplier
    listRef.current.scrollLeft = scrollStart.current - walk
  }
    
  return (
     <div
      id='tasklist'
      ref={listRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={stopDragging}
      onMouseLeave={stopDragging}
      className={`h-[55%] overflow-x-auto w-full flex items-center justify-start gap-5 py-5 mt-10 flex-nowrap select-none ${
        isDragging ? 'cursor-grabbing' : 'cursor-grab'
      }`}
    >

      {userData?.tasks?.map((task) => {
        if(task.newTask){
          return <NewTask key={task.taskId} userData={task}/>
        }
        if(task.active) {
          return <AcceptTask key={task.taskId} userData={task}/>
        }
        if(task.completed){
          return <CompleteTask key={task.taskId} userData={task}/>
        }
        if(task.failed){
          return <FailedTask key={task.taskId} userData={task}/>
        }
        
      })}
        {/* <AcceptTask/>
        <NewTask/>
        <CompleteTask/>
        <FailedTask/> */}
        {/* <div className='flex-shrink-0 h-full w-[300px] p-5 bg-gradient-to-br from-orange-400 to-yellow-300 rounded-xl'>
            <div className='flex justify-between items-center'>
                <h3 className='bg-red-500 text-sm px-3 py-1 rounded'>High</h3>
                <h4 className='text-sm'>20 Feb 2026</h4>
            </div>
            <h2 className='mt-5 text-xl font-semibold'>Make a Youtube Video</h2>
            <p className='text-sm mt-2'>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus, tempore quae! Error nulla tempore inventore!
            </p>
        </div>      */}
        
    </div>
  )
}

export default TaskList