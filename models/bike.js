import mongoose from "mongoose"

const groupsetSchema = new mongoose.Schema({
  crank: {
    type: {
      model: { type: String, required: true },
      crank_arm_length_mm: { type: Number, required: true },
      chainrings: { type: String, required: true }
    },
    required: true
  },
  sti_levers: { type: String, required: true },
  front_derailleur: { type: String, required: true },
  rear_derailleur: { type: String, required: true },
  cassette: { type: String, required: true }
})

const bikeSchema = new mongoose.Schema({
  brand: {
    type: String,
    minlength: 2,
    maxlength: 50,
    required: true
  },
  model: {
    type: String,
    minlength: 3,
    maxlength: 50,
    required: true
  },
  size: {
    type: String,
    required: true
  },
  color: String,
  date_sold: Date,
  groupset: groupsetSchema, // optional, for framesets maybe
  tags: [String],
  price: { type: Number, required: true },
  bike_image: String
}, { collection: "fullstack_prog_bikes", versionKey: false })

export default mongoose.model("Bike", bikeSchema)