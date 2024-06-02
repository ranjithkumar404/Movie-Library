const express=require('express')
const { default: mongoose } = require('mongoose')
const app=express()
const cors = require('cors');
const axios = require('axios');
app.use(cors());
require('dotenv').config()
const userRoute=require('./routes/login')
const listRoute=require('./routes/list')


app.use(express.json())
app.get('/',(req,res)=>{
    res.send("hello")
})

app.use('/user',userRoute)
app.use('/list',listRoute)

  
const connect=async()=>{
    try {
        await mongoose.connect(process.env.URL)
        console.log("Connected to DB");
    } catch (error) {
        console.log(error);
    }
    }

    app.listen(3001,()=>{
        connect()
        console.log("Server is listening!!!")
    })