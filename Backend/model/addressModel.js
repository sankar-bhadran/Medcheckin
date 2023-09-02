import mongoose from "mongoose";
// import User from "./User";

const addressSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Types.ObjectId,
    ref: "user",
  },

  house: {
    type: String,
    required: true,
  },

  area: {
    type: String,
    required: true,
  },

  city:{
    type:String,
    required:true
  },

  state:{
    type:String,
    required:true
  },

  pincode:{
    type:Number,
    required:true
  },

  defaultaddress:{
    type:Boolean,
    default:false
  }
});

export default mongoose.model("address",addressSchema)
