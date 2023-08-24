const mongoose = require("mongoose");
//const {getNextRollNumber} = require("../controllers/studentController");

const studentSchema =mongoose.Schema({
    name:{type:String,require:true},
    rollNo:{type:String,require:true},
    class:{type:String,require:true},
    course:{type:mongoose.Schema.Types.ObjectId,ref:"Course",require:true}
});

studentSchema.pre("save",async function(next){
    if(!this.isModified){
        next()
    }
    if(!this.rollNo){
        let num=""
        const lastStudent = await Student.findOne({},{},{sort:{_id:-1}})
            if(!lastStudent){
                num= "001"
            }else{
                const lastRollNo = parseInt(lastStudent.rollNo,10)
                num = (lastRollNo+1).toString().padStart(3,"0")
            }
        this.rollNo = num
    }
    next()
})

const Student =mongoose.model("Student",studentSchema)

module.exports = Student