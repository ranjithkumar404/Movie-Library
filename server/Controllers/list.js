const  user=require('../models/user')

const createlist=async(req,res,next)=>{
   try {
    console.log("started to push into DB");
    const {username,Title, Actors, Released, Runtime, Genre,Poster} = req.body;
    const userdetail=await  user.findOne({username:req.body.username})
    const newMovie = {
        name: Title,
        cast: Actors.split(', '), 
        releaseDate: new Date(Released),
        runtime: parseInt(Runtime), 
        genre: Genre.split(', '),
        poster:Poster 
      };
      userdetail.movies.push(newMovie);
      await userdetail.save();
  
      res.status(200).json(userdetail);
   } catch (error) {
    
   }

}

const getlist=async(req,res,next)=>{
    try {
        const userdetail=await  user.findOne({username:req.params.username})
        res.status(200).json(userdetail.movies)
    }
    catch(error){
        next(error)
    }
}

const deletemovie=async(req,res,next)=>{
    try {
        const userdetail=await  user.findOne({username:req.params.username})
        const {id}=req.params
        userdetail.movies=userdetail.movies.filter((movie)=>movie._id.toString() !== id)
        await userdetail.save()
        return res.status(200).json("Movie deleted Successfully!!")
    }
    catch(error){
        next(error)
    }
}




module.exports={createlist,getlist,deletemovie}