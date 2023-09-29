const mongoose = require("mongoose")
const courseSchema =mongoose.Schema({
    name:{type:String,require:true},
    time:{type:String},
    session:{type:String},
    fee:{type:String}
})

const Course = mongoose.model("course",courseSchema)

module.exports = Course

