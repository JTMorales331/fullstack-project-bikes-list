import mongoose from "mongoose"

const groupsetSchema = new mongoose.Schema({
  crank: {
    type: {
      model: {
        type: String,
        minlength: [3, "Must be at least 3, got {VALUE}"],
        maxlength: [100, "Must be at most 100, got {VALUE}"],
        required: true
      },
      crank_arm_length_mm: {
        type: Number,
        minlength: [3, "Must be at least 3, got {VALUE}"],
        maxlength: [100, "Must be at most 100, got {VALUE}"],
        required: true
      },
      chainrings: {
        type: String,
        minlength: [3, "Must be at least 3, got {VALUE}"],
        maxlength: [100, "Must be at most 100, got {VALUE}"],
        required: true
      }
    },
    required: true,
    _id: false
  },
  sti_levers: {
    type: String,
    minlength: [3, "Must be at least 3, got {VALUE}"],
    maxlength: [100, "Must be at most 100, got {VALUE}"],
    required: true
  },
  front_derailleur: {
    type: String,
    minlength: [3, "Must be at least 3, got {VALUE}"],
    maxlength: [100, "Must be at most 100, got {VALUE}"],
    required: true
  },
  rear_derailleur: {
    type: String,
    minlength: [3, "Must be at least 3, got {VALUE}"],
    maxlength: [100, "Must be at most 100, got {VALUE}"],
    required: true
  },
  cassette: {
    type: String,
    minlength: [3, "Must be at least 3, got {VALUE}"],
    maxlength: [100, "Must be at most 100, got {VALUE}"],
    required: true
  }
}, { _id: false })

const bikeSchema = new mongoose.Schema({
  brand: {
    type: String,
    minlength: [2, "Must be at least 2, got {VALUE}"],
    maxlength: [100, "Must be at least 100m got {VALUE}"],
    required: true
  },
  model: {
    type: String,
    minlength: [3, "Must be at least 3, got {VALUE}"],
    maxlength: [100, "Must be at most 100, got {VALUE}"],
    required: true
  },
  size: {
    type: String,
    required: true
  },
  color: {
    type: String,
    minlength: [3, "Must be at least 3, got {VALUE}"],
    maxlength: [100, "Must be at most 100, got {VALUE}"],
  },
  date_sold: Date,
  groupset: groupsetSchema, // optional, for framesets maybe
  tags: [String],
  price: { type: Number, required: true },
  bike_image: String
},
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    },
    collection: "fullstack_prog_bikes", versionKey: false
  }
)

export default mongoose.model("Bike", bikeSchema)