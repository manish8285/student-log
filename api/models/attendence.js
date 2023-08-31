const mongoose = require("mongoose")
const attendenceSchema =mongoose.Schema({
    course:{type:mongoose.Schema.Types.ObjectId,ref:"course"},
    student:{type:mongoose.Schema.Types.ObjectId,ref:"Student"},
    status:{type:String,required:true},
    date:{type:Date,default:Date.now}
})

const Attendence = mongoose.model("Attendence",attendenceSchema);
module.exports=Attendence