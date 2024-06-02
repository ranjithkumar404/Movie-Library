const  user=require('../models/user')


// const bcrypt = require('bcrypt');
// const jwt=require('jsonwebtoken')
require('dotenv').config()
const createUser=async(req,res,next)=>{
  try {
    console.log("Creating user");
    const userdetail=await  user.findOne({username:req.body.username})
    if(userdetail) return res.status(404).json("Username already exist!!!")
    //const salt = bcrypt.genSaltSync(10);//measure of how many times the password will be hashed.
//const hash = bcrypt.hashSync(req.body.password, salt);//to protect the password stored in DB
    await user.create({
        username:req.body.username,
        password:req.body.password
    })
  res.status(200).send("User has been created")
  } catch (error) {
    next(error)
  }

}
const login=async(req,res,next)=>{
    try{
      console.log(req.body);
     const userdetail=await  user.findOne({username:req.body.username})
     if(!userdetail) return res.status(404).json("User not found!!!")
    const isPassword=userdetail.password===req.body.password
    if(!isPassword) return res.status(400).json("Wrong password!!!")
 
    res.status(200).json("Logged in successfully")
    }catch(error){
        next(error)
    }
}

const getUser=async(req,res,next)=>{
    try {
      const getUser= await user.findById(req.params.id)
       res.status(200).json(getUser)
    } catch (error) {
        next(error)
    }
}


module.exports={createUser,login,getUser}