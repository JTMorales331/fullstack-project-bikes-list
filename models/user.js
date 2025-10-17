import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    minlength: [2, "Must be at least 2, got {VALUE}"],
    maxlength: [100, "Must be at most 100, got {VALUE}"],
    required: true
  },
  last_name: {
    type: String,
    minlength: [2, "Must be at least 2, got {VALUE}"],
    maxlength: [100, "Must be at most 100, got {VALUE}"],
    required: true
  },
  email: {
    type: String,
    minlength: [2, "Must be at least 2, got {VALUE}"],
    maxlength: [100, "Must be at most 100, got {VALUE}"],
    required: true
  },
  password: {
    type: String,
    minlength: [2, "Must be at least 2, got {VALUE}"],
    maxlength: [255, "Must be at most 255, got {VALUE}"],
    required: true
  }
  

}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  },
  versionKey: false
})


export default mongoose.model("Bike", userSchema)