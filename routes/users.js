
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/nodeproject")

const userSchema=mongoose.Schema({
  name:String,
  email:String,
  mobile:Number,
  id:Number,
  task:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'task',
    default:[]
  }]
})

module.exports = mongoose.model("user",userSchema);

