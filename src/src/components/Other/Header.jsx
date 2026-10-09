import React from 'react'
import { setLocalStorage } from '../../utils/localStorage'

const Header = ({userData, changeUser}) => {

  const logOutUser = () => {
    localStorage.setItem('loggedInUser','')
    changeUser('')
    // window.location.reload()
  }  

  return (
    <div className='flex items-center justify-between'>
        <h1 className='text-xl font-medium'> Hello, <span className='text-2xl font-semibold'>{userData?.name}</span></h1>
        <button onClick={logOutUser} className='bg-red-500 text-lg font-semibold text-white px-3 py-2 rounded-sm active:scale-95'>LogOut</button>
    </div>
  )
}

export default Header