const cors=require('cors');
require('dotenv').config()
const express=require('express');
const userRouter=require('./routes/user.route')
const app=express();


// seting middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors())

// setting the routes
app.use('/api/users',userRouter);

module.exports=app;