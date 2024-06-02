import {React,useState} from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation ,useNavigate} from 'react-router-dom';
const List = () => {
    const [name,setName]=useState('')
  const [mname,setMname]=useState('')
 
  const [loading,setLoading]=useState(false)
  const location=useLocation()
const naviagte=useNavigate()
const {username}=location.state
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
  return (
    <div className='flex flex-col space-y-5 items-center justify-center'>
      <h1 className='text-2xl' >Add your Favourite movie to your list</h1>
      <div className='flex  space-x-4'>
      <ToastContainer />
      <input value={name}   onChange={handleInputChange} className='focus:outline-none  focus:border-green-400 p-3 border-2 rounded-md w-[450px]'     placeholder='Search your Movie' type="text" />
        <button className='bg-[#21C55C] font-semibold hover:bg-white hover:text-green-500  text-xl  rounded-md text-white px-3 py-1'onClick={search} type="submit">ADD</button>
      </div>
      <div>
        {
            mname?(<div className='border-[3px] p-2 grid gap-3 md:flex md:col-span-3 items-center  space-x-4 rounded-md   border-black'>
              <div>
               
              <h1><span className='font-bold'>Movie Name:</span> {mname.Title}</h1>
              <h1><span className='font-bold'>Cast</span>:{mname.Actors}</h1>
      <h1><span className='font-bold'>Genre</span>:{mname.Genre}</h1>
      <h1><span className='font-bold'>Realsed On</span>:{mname.Released}</h1>
      <h1><span className='font-bold'>Run time</span>:{mname.Runtime}</h1>
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
        <button onClick={home}>Back to Home</button>
      </div>
    </div>
  )
}

export default List
