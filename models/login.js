import mongoose from "mongoose";
import validator from "validator"

const loginSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, "Invalid email format"]
  },
  password: { type: String, required: true}
})

export default mongoose.model("Login", loginSchema)