const mongoose =require("mongoose")
const connectDB= async()=>{
    try{
        const dburl = process.env.MONGO_URI || "mongodb://localhost:27017/swiftcart"
        console.log(dburl)
        const conn = await mongoose.connect(dburl,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
        });
        console.log("Successfully connected to db")
        }catch(error){
            console.log(`Error : ${error.message}`)
            process.exit()
        }
}

module.exports = connectDB
