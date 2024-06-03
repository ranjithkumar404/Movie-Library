import {React,useEffect,useState} from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate,Link,useLocation } from 'react-router-dom';
import ReactLoading from 'react-loading';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';
import { FaHome } from "react-icons/fa";

const Home = () => {
  const [name,setName]=useState('')
  const [mname,setMname]=useState('')
  const navigate=useNavigate()
  const location=useLocation()
  const [list,setList]=useState([])

  const username = location.state?.username || ''; 
  const [loading,setLoading]=useState(false)
  const search=async(e)=>{
    e.preventDefault();
try {
  if(!name) return toast.error("Please Enter a movie!")
  setLoading(true);
  const response=await axios.get(`http://www.omdbapi.com/?t=${name}&apikey=219db2ef`)
console.log(response.data.Response);
if(response.data.Response=== 'False') {

  setLoading(false);
  return toast.error("Movie not found");
  
}
setLoading(false);
setMname(response.data);
} catch (error) {
  console.log(error);
}
  }
  const handleInputChange = (e) => {
    const value = e.target.value;
    setName(value);
    if (value === '') {
      setLoading(false)
      setMname(null); 
    }
  };
  const movielist=()=>{
    if(!username) return toast.error("Please loggin to your account.")
    navigate('/movielist',{state:{username}})
  }
  useEffect(() => {
    const fetchList = async () => {
      try {
        if(!username) return setList([])
        const res = await axios.get(`https://movie-library-jwwr.onrender.com/list/${username}`);
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

  return (
    <div className='scroll-n'>
     <div className='p-3 flex flex-col justify-center  items-center'>
     {username && list.length >0 ? (
          <div className='flex space-y-5 flex-col items-center'>
            <h1 className='text-3xl  font-semibold text-green-400 text-center'>{username}'s Movie List</h1>
            
            <div className='   px-10  '>
         <Carousel className='w-[500px]' showArrows={true} autoFocus={true} autoPlay={true} showThumbs={false} infiniteLoop={true}  showStatus={false}>
  {list.map((movie, index) => (
    <div key={index} className='border shadow-md flex items-center justify-center   text-left p-5 space-x-3 rounded-md mb-2 '>
    <div>
      <img className='rounded-md w-[500px] h-[300px] ' src={movie.poster} alt="movie.png" />
     </div>
     <div className='space-y-2'>
     <h3><span className='font-bold'>Movie Name:</span> {movie.name}</h3>
      <p><span className='font-bold'>Cast:</span> {movie.cast ? movie.cast.join(', ') : 'N/A'}</p>
      <p><span className='font-bold'>Genre:</span> {movie.genre ? movie.genre.join(', ') : 'N/A'}</p>
      <p><span className='font-bold'>Released On:</span> {movie.releaseDate ? new Date(movie.releaseDate).toDateString() : 'N/A'}</p>
      <p><span className='font-bold'>Run time:</span> {movie.runtime ? `${movie.runtime} mins` : 'N/A'}</p>
     </div>
     
    </div>
  ))}
</Carousel>

            </div>
            <button onClick={movielist} className='bg-[#21C55C] font-semibold hover:bg-white hover:text-green-500 text-xl rounded-md text-white px-3 py-1'>
          Add Some More...
          </button>
          </div>
        ) : (
          <button onClick={movielist} className='bg-[#21C55C] font-semibold hover:scale-110 duration-700 text-xl rounded-md text-white px-3 py-3'>
            Create your own Movie List!
          </button>
        )}
      </div>
      <div className='p-3 flex flex-col justify-center items-center'>
    <form onSubmit={search} action="">
    <div>
    <ToastContainer />
    <input className='focus:outline-none  focus:border-green-400 p-3 border-2 rounded-md w-[450px]' value={name}   onChange={handleInputChange} placeholder='Search your Movie' type="text" />
    </div>
    </form>
    </div>
    <div>
      {loading ? (<div className='flex justify-center items-center'> 
      <ReactLoading type={'spin'}  color={"green"} height={175} width={175} />
      </div>):(
       <div>
        {mname? <div className='flex flex-col justify-center items-center'>
      <h1 className='font-bold text-2xl'>{mname.Title}</h1>
      <img className='rounded-md' src={mname.Poster} alt="" />
      <h1><span className='font-bold'>Cast</span>:{mname.Actors}</h1>
      <h1><span className='font-bold'>Genre</span>:{mname.Genre}</h1>
      <h1><span className='font-bold'>Realsed On</span>:{mname.Released}</h1>
      <h1><span className='font-bold'>Run time</span>:{mname.Runtime}</h1>
      </div>:
      <div>

      </div>
    }</div>)}
    </div>
    </div>
  )
}

export default Home
