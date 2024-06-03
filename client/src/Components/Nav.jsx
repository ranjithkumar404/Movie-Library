import {React,useState,useEffect} from 'react'
import { Link,useNavigate,useLocation } from 'react-router-dom'
import { RiMovie2Line } from "react-icons/ri";

const Nav = () => {
  const [loading,setLoading]=useState(false)
  const location=useLocation()
  
const navigate=useNavigate()
  const [n,setn]=useState('')
  useEffect(() => {
    const names = location.state?.username || '';
    setn(names);
  }, [location.state?.username]);
  const handlelog=()=>{
   // localStorage.removeItem('username');
    setn(null)
    navigate('/',{state:{username:null}})
  }
  // useEffect(() => {
  //   const storedUsername = localStorage.getItem('username');
  //   console.log(storedUsername);
  //   setn(storedUsername);
  
  // }, []);
  return (
    <div className='flex justify-between backdrop-blur-sm items-center p-4 '>
      <div>
<Link className='text-green-500  flex space-x-2  items-center font-bold text-4xl' to="/" >
  <h1 >Movie-Link </h1> 
<RiMovie2Line  size={30}/>
</Link>

      </div>
<div>
  {
    n? (<div className='flex  items-center'><h1 className='text-black px-3 text-[20px] '>{n}</h1>
    <Link to='/' onClick={handlelog} className='bg-green-500  font-semibold  hover:shadow-lg  text-2xl  rounded-md text-white px-3 py-1' type="button">Logout</Link></div>):(
      <Link to="/signin"  className='bg-green-500  font-semibold  hover:shadow-lg  text-2xl  rounded-md text-white px-3 py-1' type="button">Sign Up</Link>
    )
  }

</div>
    </div>
  )
}

export default Nav