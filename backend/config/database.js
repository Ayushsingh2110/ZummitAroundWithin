const mongoose= require("mongoose");

require("dotenv").config();
const dbConnect=()=>{
    mongoose.connect(process.env.DATABASE_URL,{
        dbName : "Zummit"
    })
    .then(()=>console.log("db connect sucessfully"))
    .catch((error)=>{
        console.log("issue in DB Connection");
        console.log(error)
        process.exit(1);
    });

}

module.exports=dbConnect;
