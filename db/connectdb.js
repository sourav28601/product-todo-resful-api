const mongoose = require('mongoose');

const connectDB=()=>{
    return mongoose.connect('mongodb://localhost:27017/products')
    .then(()=>{
        console.log('Connection Successfully');
    }).catch((err)=>{
        console.log(err);
    })

}

module.exports = connectDB;