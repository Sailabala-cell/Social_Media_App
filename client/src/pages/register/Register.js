import React, {useRef } from 'react'
import './register.css'
import axios from "axios"
import { useNavigate } from 'react-router-dom'

function Register() {
const username=useRef()
const email=useRef()
const password=useRef()
const confirmPassword=useRef()
const navigate = useNavigate()
const handleClick = async (e)=>{
   e.preventDefault()
   if(confirmPassword.current.value !== password.current.value){
    confirmPassword.current.setCustomValidity("Password don't match")
   }else{
    const user = {
        username : username.current.value,
        email:email.current.value,
        password:password.current.value
    };
    try{
         await axios.post("/auth/register",user)
         navigate('/login')

    }catch(error){
      console.log(error)
    }
   }
}

  return (
    <div className='login'>
        <div className='loginWrapper'>
            <div className='loginLeft'>
                <h3 className='loginLogo'> Sailabala </h3>
                <span className='loginDesc'>
                    Connect with friends and the world around you
                </span>
            </div>
            <div className='loginRight'>
                <form className='loginBox' onSubmit={handleClick}>
                    <input placeholder="Username" ref={username} className='loginInput'/>
                    <input placeholder="Email" type="email" ref={email} className='loginInput'/>
                    <input placeholder="Password" type="password" ref={password} className='loginInput'/>
                    <input placeholder="ConfirmPassword" ref={confirmPassword} className='loginInput'/>
                    <button className='loginButtton'>Sign Up</button>
                     <button className='loginRegisterButton'>Log into Account</button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Register