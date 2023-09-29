import  React ,{ useState } from 'react'
import { signInUser } from '../services/userService'
import {saveUser} from "../services/helper"
import {useNavigate} from "react-router-dom"

const SignIn = () => {
    let navigate = useNavigate()
    const [email,setEmail]= useState("")
    const [password,setPassword]= useState("")
    const [message,setMessage]= useState("")
    const [loader,setLoader] = useState(false)

    const Login=()=>{
        setMessage("")
        setLoader(true)
        console.log({email,password})
        signInUser({email,password}).then(data=>{
            console.log(data)
            saveUser(data)
           navigate("/attendence-sheet")
        }).catch(e=>{
            setLoader(false)
            console.log(e)
            let msg = e?.response?.data
            setMessage("Something went wrong")
        })
        

    }

  return (
    <div className='font-roboto text-[#212529] space-y-10'>
        {/* <div className='sm:flex justify-between space-y-2 sm:space-y-0 '>
            <div className='flex items-center border border-[#4154F1] rounded p-2 space-x-2 w-[207px] h-[56px]'>
                <input type="radio" name="user" id='rbtn' className='' />
                <label htmlFor="rbtn">Teacher</label>

            </div>
            <div className='flex border border-[#4154F1] items-center  rounded p-2 space-x-2 w-[207px] h-[56px]'>
                <input type="radio" id='rbtn'  name="user" className='' />
                <label htmlFor="rbtn">Admin</label>

            </div>
        </div> */}
        <form  className='space-y-6'>
            <div className='w-full'>
                <label htmlFor="">Username</label>
                <input type="text" onChange={(event)=>setEmail(event.target.value)} value={email} className='w-full h-[38px] p-3  border rounded' />
            </div>
            <div className='w-full'>
                <label htmlFor="">Password</label>
                <input type="password" onChange={(event)=>setPassword(event.target.value)} value={password} className='w-full h-[38px] p-3 border rounded' />
            </div>

                
            {
                message && (<div className='border pl-2 py-1 rounded-lg border-red-400 text-red-400'>{message}</div>)
            }
            

            <div>
                <button onClick={()=>Login()} disabled={loader} type='button' className='button bg-[#4154F1] text-white px-6 py-1 rounded'>{loader?'Please Wait ...':'Sign In'}</button>
            </div>
            {/* <div><a href="">Forget Password ?</a></div>
            <div className='sm:flex space-x-1'><p>Don't have an account ?</p> <a className='text-[#0DCAF0]' href="#">create account</a></div>
         */}
        </form>
    </div>
  )
}

export default SignIn