import mongoose from "mongoose";
import validator from "validator";
import mongooseUniqueValidator from "mongoose-unique-validator";

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
    unique: [true, "Email already exists"],
    required: true,
    // https://codemia.io/knowledge-hub/path/mongoose_-_validate_email_syntax
    validate: [validator.isEmail, "Invalid email format"]
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
  collection: "users",
  versionKey: false
})

userSchema.plugin(mongooseUniqueValidator)

export default mongoose.model("User", userSchema)