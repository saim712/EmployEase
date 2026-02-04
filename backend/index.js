const mongoose=require('mongoose');
require('dotenv').config();

const app=require('./app'); 


// db connection
mongoose.connect(`${process.env.MONGODB_URI}${process.env.DB_NAME}`)
.then(()=>{
    console.log("database connected successfully");
})
.catch((error)=>{
    console.log("Database connection failed:", error.message);
    process.exit(1);
});

// Server startup
app.listen(process.env.PORT || 3001, ()=>{
    console.log('Server is running on port:', process.env.PORT || 3001);
});