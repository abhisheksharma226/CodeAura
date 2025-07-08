const mongoose = require("mongoose");

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI).then(() => {
            console.log("Mongodb Connected");
        }).catch((err) => {
            console.log("Error connecting to Atlas", err);
        })
    }catch(err){
        console.error('❌ MongoDB connection error:', err.message);
        process.exit(1); // Exit on failure
      }
    }

module.exports = connectDB;

