
import React, { useState } from 'react'
import { useNavigate,Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
const Login = () => {
    const [password,setPassword]=useState('')
    const [username,setName]=useState('')
    const navigate=useNavigate()
    const submit=async (e)=>{
      e.preventDefault();
      
    try {
      const res= await axios.post('https://movie-library-jwwr.onrender.com/user/login',{username,password})
      console.log(res.status);
      if(res.status ===404) alert("User not found");
       else{
        toast.success("User logged in successfully")
        localStorage.setItem('username',username);
        navigate('/',{state:{username}})
       } 
    } catch (error) {
     console.log(error);
      if(error.status === 404  ){
       alert("User not found!!");
      navigate('/signin')
      }
      else if(error.response.status === 400){
        alert("Wrong password!!")
        
      }
      // console.log(error);
    }
     }
  return (
    <div className=' text-black h-[90vh]   items-center justify-center flex  '>
    <form className='flex flex-col items-center scale-125 shadow-md justify-center w-[350px] h-[350px] border-2    focus:border rounded-md  space-y-3' action="" method="post">
      <input required onChange={(e)=>{setName(e.target.value)}}  value={username }className=' focus:outline-none bg-transparent  border-[1px] placeholder rounded-md  placeholder-black focus:border-green-400 py-2  px-7' placeholder='User name' type="text" name="" id="" />
      <input required onChange={(e)=>{setPassword(e.target.value)}} value={password} className=' focus:outline-none bg-transparent  border-[1px] placeholder rounded-md  placeholder-black focus:border-green-400 py-2  px-7' placeholder='Password' type="password" name="" id="" />
      <button  className='bg-[#21C55C] font-semibold   text-xl  rounded-md text-white px-3 py-1' onClick={submit} type="submit">Log In</button>
    
    </form>
 </div>
  )
}

export default Login
