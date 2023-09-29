import React from 'react'
import SignIn from '../components/SignIn'
import Topbar from '../components/Topbar'

const Login = () => {
  return (
    <>
    <Topbar />
    <div className='sm:flex w-full h-[100vh] shadow-inner sm:mt-[-60px]'>
        <div className='sm:w-1/2 flex  items-center justify-center'>
            <div className='w-[80%] inline-block font-roboto'>
            <div className='login-text'>
                <h1>Attendance</h1>
                <h1>for your business</h1>
            </div>
            <div className='mt-[40px] text-justify'>
                <p>Our attendance management system, named StudentLog,
                     simplifies tracking student attendance efficiently,
                      enabling educational institutions to effortlessly manage 
                      attendance records and enhance overall class management.</p>
            </div>
            </div>
        </div>
        <div className=' sm:w-1/2 flex items-center justify-center'>
           
            <div className='border bg-white rounded p-2 w-[524px]  inline-block p-[40px]'>
                <SignIn />
            </div>
        </div>


    </div>
    </>
  )
}

export default Login