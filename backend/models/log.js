import mongoose from "mongoose";

const logSchema = new mongoose.Schema({
  website: { type: String, required: true },
  timeSpent: { type: Number, required: true },
  category: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

export default mongoose.model("Log", logSchema);
