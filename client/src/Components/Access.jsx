import React, { useState } from 'react'
import { useNavigate,Link } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Access = () => {
    const [id,setId]=useState('')
    const [movies,setMovies]=useState([])
    const getmovie=async()=>{
        try {
            console.log("we are sending the request to get ur frnd's movie list movie list");
            console.log("the id entered is",id);
            if(!id) return toast.error("Please enter the ID to access the movie list")
            const res=await axios.get(`https://movie-library-jwwr.onrender.com/list/share/${id}`)
            console.log("we got the response for the list");
            
            console.log(res.data);
            setMovies(res.data);

        } catch (error) {
            console.log("in front end",error);
           if( error.response.status === 404) {
               setMovies([])
            return toast.error("No movies found")
           }
        }
    
    }
  return (
    <div className='flex flex-col p-5 justify-center items-center gap-3'>
 <div>
    <ToastContainer />
                <input 
                    type="text" 
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    placeholder="Enter the ID to access the Movie list"
                    className="border-2 rounded-md p-2 w-[300px] focus:outline-none focus:border-green-400"
                />
                <button 
                    onClick={getmovie}
                    className="bg-[#21C55C] font-semibold text-xl rounded-md text-white px-3 py-1 ml-2"
                >
                    Get Movies
                </button>
            </div>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {
                    movies.length > 0 ? (
                        movies.map((movie, index) => (
                            <div key={index} className="border shadow-md p-4 rounded-md flex space-x-4">
                                <img src={movie.poster} alt={movie.name} className="w-[100px] h-[150px] rounded-md" />
                                <div className="flex flex-col space-y-2">
                                <h3><span className='font-bold'>Movie Name:</span> {movie.name}</h3>
          <p><span className='font-bold'>Cast:</span> {movie.cast ? movie.cast.join(', ') : 'N/A'}</p>
          <p><span className='font-bold'>Genre:</span> {movie.genre ? movie.genre.join(', ') : 'N/A'}</p>
          <p><span className='font-bold'>Released On:</span> {movie.releaseDate ? new Date(movie.releaseDate).toDateString() : 'N/A'}</p>
          <p><span className='font-bold'>Run time:</span> {movie.runtime ? `${movie.runtime} mins` : 'N/A'}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div>No movies to display</div>
                    )
                }
            </div>
    </div>
  )
}

export default Access
