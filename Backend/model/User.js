import mongoose from "mongoose";

const Userschema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    phonenumber: {
      type: Number,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },
  }

  //  timestamps: true }
);

export default mongoose.model("user", Userschema);
