import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  Testname: {
    type: String,
    unique: true,
    uppercase: true,
    required: true,
  },
  sub: {
    type: Object,
    required: true,
  },

  is_available: {
    type: Number,
    default: 1,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("category", categorySchema);
