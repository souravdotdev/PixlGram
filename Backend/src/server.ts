import "dotenv/config";
import { app } from "./app";

app.listen(process.env.PORT,()=>{
    console.log(`Server running on Port ${process.env.PORT}`);
})