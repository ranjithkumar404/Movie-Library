const { log } = require('console');
const  user=require('../models/user')
const crypto = require('crypto');

const createlist=async(req,res,next)=>{
   try {
    console.log("started to push into DB");
  
    const {username,Title, Actors, Released, Runtime, Genre,Poster} = req.body;
   console.log("req.body",req.body);
    const userdetail=await  user.findOne({username:username})
    if (!userdetail) {
        return res.status(404).json({ error: "User not found" });
      }
    console.log("userdetail",userdetail);
    const newMovie = {
        name: Title,
        cast: Actors.split(', '), 
        releaseDate: new Date(Released),
        runtime: parseInt(Runtime), 
        genre: Genre.split(', '),
        poster:Poster ,
        
      };
      userdetail.movies.push(newMovie);
      await userdetail.save();

     
  
      res.status(200).json(userdetail);
   } catch (error) {
    console.log("error",error);
    next(error)
   }

}

const getId=async(req,res,next)=>{
  const {username,ispub}=req.body;
  console.log("hey I'm backend I got ur resquest");
  try {
    const userdetail=await  user.findOne({username:username}) 
    console.log("hey I'm backend I got ur username"); 
    console.log("pub status ",ispub); 
     if(!ispub){
        if(userdetail.shareableLink)  return res.status(200).json({ shareableLink: userdetail.shareableLink });

            else{
               userdetail.shareableLink = crypto.randomBytes(16).toString('hex');
               await userdetail.save(); 
               return res.status(200).json({ shareableLink: userdetail.shareableLink });
            }
     }   
  } catch (error) {
    console.log("error",error);
    next(error)
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

const getmovies=async(req,res,next)=>{
    console.log("I'm backend and I got ur request for ur frnd movie list");
    const {id}=req.params
    console.log("id",id);
    try {
        const userdetail=await  user.findOne({shareableLink:id})
        console.log("userdetail",userdetail);
        if (userdetail && userdetail.movies && userdetail.movies.length > 0) {
            return res.status(200).json(userdetail.movies);
        } else {
            return res.status(404).json({ message: "No movies to display" });
        }
    }
    catch(error){
        console.log("error",error);
        next(error)
}
}
    


module.exports={createlist,getlist,deletemovie,getId,getmovies}