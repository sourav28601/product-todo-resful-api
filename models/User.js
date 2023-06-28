const mongoose = require('mongoose')

// Schema 
const UserSchema = new mongoose.Schema({        
    name:{
        type:String,
        Required:true,  
    },
    email:{
        type:String,
        Required:true,
        unique:true,
    },
    password:{
        type:String,
        Required:true,
    }
},{timestamps:true})

//create model

const UserModel = mongoose.model('user',UserSchema); 

module.exports = UserModel