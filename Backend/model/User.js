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

    is_admin: {
      type: Number,
      required: true,
    },

    emailtoken: {
      type: String,
    },

    userType: {
      type: String,
    },

    is_blocked: {
      type: Boolean,
      default: false,
    },

    addressDetails: [
      {
        type: mongoose.Types.ObjectId,
        ref: "address",
      },
    ],
  }

  //  timestamps: true }
);

export default mongoose.model("user", Userschema);
