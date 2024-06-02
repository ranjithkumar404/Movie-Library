import {React,useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import { RiMovie2Line } from "react-icons/ri";

const Nav = () => {
  
  const [n,setn]=useState(localStorage.getItem('username'))
  const handlelog=()=>{
    localStorage.removeItem('username');
    setn(null)
  }
  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    setn(storedUsername);
  }, []);
  return (
    <div className='flex justify-between backdrop-blur-sm items-center p-4 '>
      <div>
<Link className='text-red-500 flex space-x-2  items-center text-2xl' to="/" >
  <h1 >Movie-Link </h1> 
<RiMovie2Line  size={30}/>
</Link>

      </div>
<div>
  {
    n? (<div className='flex  items-center'><h1 className='text-black px-3 text-[20px] '>{n}</h1>
    <Link to='/' onClick={handlelog} className='bg-[#21C55C] font-semibold hover:bg-white hover:text-green-500  text-xl  rounded-md text-white px-3 py-1' type="button">Logout</Link></div>):(
      <Link to="/signin"  className='bg-[#21C55C] font-semibold hover:bg-white hover:text-green-500  text-xl  rounded-md text-white px-3 py-1' type="button">Sign Up</Link>
    )
  }

</div>
    </div>
  )
}

export default Nav