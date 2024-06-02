import {React,useState,useEffect} from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation ,useNavigate} from 'react-router-dom';
import { FaHome } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
const List = () => {
    const [name,setName]=useState('')
  const [mname,setMname]=useState('')
  const [list,setList]=useState([])
  const [loading,setLoading]=useState(false)
  const location=useLocation()
const naviagte=useNavigate()
const {username}=location.state
useEffect(() => {
  const fetchList = async () => {
    try {
      const res = await axios.get(`http://localhost:3001/list/${username}`);
      console.log(res.data);
      setList(res.data);
    } catch (error) {
      console.error("Error fetching the movie list:", error);
    }
  };

  if (username) {
    fetchList();
  }
}, [username]);
    const search=async(e)=>{
        e.preventDefault();
    try {
      if(!name) return toast.error("Please enter movie name");
      setLoading(true);
      const response=await axios.get(`http://www.omdbapi.com/?t=${name}&apikey=219db2ef`)
    console.log(response.data);
    if(response.data.Response=== 'False') {
    
      setLoading(false);
      return toast.error("Movie not found");
      
    }
    setMname(response.data);
    const {  Title, Actors, Released, Runtime, Genre ,Poster} = response.data;
    const res=await axios.post('http://localhost:3001/list',{username,Title, Actors, Released, Runtime, Genre,Poster})
     console.log("response after pushing into DB",res);
    toast.success("Movie added to your list");
     setLoading(false);
    
    } catch (error) {
      console.log(error);
    }
      }
      const handleInputChange = (e) => {
        const value = e.target.value;
        setName(value);
        if (value === '') {
          setMname(null); 
        }
      };
      const home=()=>{
        naviagte('/',{state:{username}})
      }
      const dlt=async()=>{
           alert("Are you sure you want to delete this movie from your list")
      }
  return (
    <div className='flex flex-col space-y-9 items-center p-3 justify-center'>
      <h1 className='text-2xl' >Add your Favourite movie to your list</h1>
      <div className='flex  space-x-4'>
      <ToastContainer />
      <input value={name}   onChange={handleInputChange} className='focus:outline-none  focus:border-green-400 p-3 border-2 rounded-md w-[450px]'     placeholder='Search your Movie' type="text" />
        <button className='bg-[#21C55C] font-semibold   text-xl  rounded-md text-white px-3 py-1'onClick={search} type="submit">ADD</button>
      </div>
      <div>
        {
            mname?(<div className=' hover:scale-105 p-4 duration-700  grid gap-3 md:flex md:col-span-3 items-center  space-x-4 rounded-md shadow-md  '>
              <div className='space-y-3'>
               
              <h1><span className='font-bold'>Movie Name:</span> {mname.Title}</h1>
              <h1><span className='font-bold'>Cast</span>:{mname.Actors}</h1>
      <h1><span className='font-bold'>Genre</span>:{mname.Genre}</h1>
      <h1><span className='font-bold'>Realsed On</span>:{mname.Released}</h1>
      <h1><span className='font-bold'>Run time</span>:{mname.Runtime}</h1>
            <button><MdDelete /></button>
             </div>
              <div>
                <img className='rounded-md w-[200px] h-[200px]'  src={mname.Poster} alt="" />
              </div>
            </div>):
            (<div>
                </div>)
        }
      </div>
<div>
  {
    list.length >0 ? (
      <div className='  grid gap-7 grid-cols-1 md:grid-cols-2 items-center   '>
        {list.map((movie, index) => (
        <div key={index} className='border shadow-md flex items-center justify-center   hover:scale-105 p-5 duration-700 text-left  space-x-3 rounded-md mb-2 '>
        <div>
          <img className='rounded-md  w-[200px] h-[200px]' src={movie.poster} alt="movie.png" />
         </div>
         <div className='space-y-2'>
         <h3><span className='font-bold'>Movie Name:</span> {movie.name}</h3>
          <p><span className='font-bold'>Cast:</span> {movie.cast ? movie.cast.join(', ') : 'N/A'}</p>
          <p><span className='font-bold'>Genre:</span> {movie.genre ? movie.genre.join(', ') : 'N/A'}</p>
          <p><span className='font-bold'>Released On:</span> {movie.releaseDate ? new Date(movie.releaseDate).toDateString() : 'N/A'}</p>
          <p><span className='font-bold'>Run time:</span> {movie.runtime ? `${movie.runtime} mins` : 'N/A'}</p>
          <button onClick={dlt} className='text-red-600 text-2xl'><MdDelete /></button>
         </div>
         
        </div>
      ))}
      </div>
    ):(<div></div>)
  }
</div>
      <div>
        <button className='flex items-center  space-x-2 border-2 hover:text-white hover:border-none hover:bg-green-500 rounded-md px-3 py-1  border-black text-2xl' onClick={home}><h1>Back to</h1><FaHome /> </button>
      </div>
    </div>
  )
}

export default List
