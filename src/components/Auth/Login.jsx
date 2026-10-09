import React, { useState } from 'react'

const Login = ({ handelLogin }) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const submitHandler = (e) => {
        e.preventDefault();
        console.log('email:',email);
        console.log('pass:',password);

        // Send email and password to App.jsx
        handelLogin(email, password)

        setEmail("")
        setPassword("")
    }

  return (
    <div className='flex h-screen w-screen items-center justify-center'>
        <div className='border-2 border-emerald-300 rounded-xl p-20'>
            <form
            onSubmit={(e) =>{
                submitHandler(e)
            }}
            className='flex flex-col items-center justify-center gap-3'>
                <input
                value={email}
                onChange={(e) => {
                    setEmail(e.target.value)
                }}
                className='border-2 border-cyan-400 rounded-2xl text-xl outline-none bg-transparent py-3 px-4 placeholder:text-xl' type="email" placeholder='Enter Your Email' required/>
                <input
                value={password}
                onChange={(e) => {
                    setPassword(e.target.value)
                }}
                className='border-2 border-cyan-400 rounded-2xl text-xl outline-none bg-transparent py-3 px-4 placeholder:text-xl' type="password" placeholder='Enter Your Password' required/>
                <button className='w-full border-2 border-none bg-cyan-600 rounded-full text-xl outline-none py-3 px-4 transition-transform hover:scale-105 active:scale-95'>Login</button>
            </form>
        </div>
    </div>
  )
}

export default Login