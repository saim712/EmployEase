const mongoose=require('mongoose');

const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:[true,"name is required"],
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        minLength:[6,'Password must be at least 6 characters long'],
        select:false // Password will not be sent until explicitly requested using select('+password')
    }
})

module.exports=mongoose.model("User",userSchema);