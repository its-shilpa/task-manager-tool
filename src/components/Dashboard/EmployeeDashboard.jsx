import React from 'react'
import Header from '../Other/Header'
import TaskListNumbers from '../Other/TaskListNumbers'
import TaskList from '../TaskList/TaskList'

const EmployeeDashboard = ({userData, changeUser}) => {
  
  return (
    <div className='h-screen p-10 bg-[#1C1C1C]'>
        <Header changeUser={changeUser} userData={userData}/>
        <TaskListNumbers userData={userData}/>
        <TaskList userData={userData}/>
    </div>
  )
}

export default EmployeeDashboard