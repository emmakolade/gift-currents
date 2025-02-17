// import mongoose from "mongoose";
import mongoose from 'mongoose';


const dbConfig = async  () =>{
    try{
       const mongo =  await mongoose.connect(process.env.MONGO_URI);
       console.log("MongoDB Connected Successfully", mongo.connection.host, mongo.connection.name);
    }
    catch(err){
        console.error(err.message)
        process.exit(1);
    }
};
export default dbConfig;

