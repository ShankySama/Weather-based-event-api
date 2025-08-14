const  mongoose = require('mongoose');

const connectToDb = async()=>{
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>console.log('Mongoose Connected'))
    .catch((err)=>console.log("Error",err))
}

module.exports = { connectToDb }