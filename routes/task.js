const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/nodeproject")

const taskSchema=mongoose.Schema({
 
  taskName:String,
  taskStatus:String,
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'user'
  },
})

module.exports = mongoose.model("task",taskSchema);