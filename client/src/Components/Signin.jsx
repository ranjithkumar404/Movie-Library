
import React, { useState } from 'react'
import { useNavigate,Link } from 'react-router-dom';
import axios from 'axios';
const Signin = () => {
    const [password,setPassword]=useState('')
    const [username,setName]=useState('')
    const navigate=useNavigate()
    const submit=async (e)=>{
      e.preventDefault();
      
    try {
      const res= await axios.post('http://localhost:3001/user',{username,password})
      console.log(res.status);
      //if(res.status ===404) alert("User not found");
     
        localStorage.setItem('username',username);
        navigate('/',{state:{username}})
       
    } catch (error) {
     if(error.response.status ===404) alert("User name already exist!!")
      console.log(error);
    }
     }
  return (
    <div className=' text-black h-[90vh]   items-center justify-center flex  '>
    <form className='flex flex-col items-center justify-center w-[350px] h-[350px] border-2 border-green-400   focus:border rounded-md  space-y-3' onSubmit={submit}>
      <input required onChange={(e)=>{setName(e.target.value)}}  value={username }className=' focus:outline-none bg-transparent  border-[1px] rounded-md border-black placeholder-black focus:border-green-400 py-2 px-7'placeholder='User name' type="text" name="" id="" />
      <input required onChange={(e)=>{setPassword(e.target.value)}} value={password} className=' focus:outline-none bg-transparent  border-[1px] rounded-md border-black placeholder-black focus:border-green-400 py-2 px-7' placeholder='Password' type="password" name="" id="" />
      <button  className='bg-[#21C55C] font-semibold hover:bg-white hover:text-green-500  text-xl  rounded-md text-white px-3 py-1' type="submit">Sign Up</button>
      <p>already have an account? <Link className='text-green-400 hover:underline' to="/login ">Login</Link></p>
    </form>
 </div>
  )
}

export default Signin