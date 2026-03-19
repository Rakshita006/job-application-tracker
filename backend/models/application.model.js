
import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
  company:{
    type:String,
    required:true
  },
  role:{
    type:String,
    required:true
  },
  status:{
    type:String,
    enum:["Applied","Interview","Rejected","Offer"],
    default:"Applied"
  },
  dateApplied:{
    type:Date,
    default:Date.now
  },
  notes:{
    type:String
  },
  jobLink:{
    type:String
  },
  userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true,
    index:true
  }
},{
  timestamps:true
});

export default mongoose.model("Application", applicationSchema);
