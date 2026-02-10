import mongoose from "mongoose";

export default async function connectToDb(){
    if(!process.env.MONGODB_URI){
        console.log("MongoDB credentials required");
        process.exit(1);
    }

    await mongoose.connect(process.env.MONGODB_URI);

    console.log("Connected to DB");
}