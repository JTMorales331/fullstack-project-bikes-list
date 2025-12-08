import mongoose from "mongoose"

const crankSchema = new mongoose.Schema({
  model: {
    type: String,
    minlength: [3, "Must be at least 3, got {VALUE}"],
    maxlength: [100, "Must be at most 100, got {VALUE}"],
    required: true
  },
  crank_arm_length_mm: {
    type: Number,
    min: [0, "Must be at least 0, got {VALUE}"],
    required: true
  },
  chainrings: {
    type: String,
    minlength: [3, "Must be at least 3, got {VALUE}"],
    maxlength: [100, "Must be at most 100, got {VALUE}"],
    required: true
  }
}, { _id: false })

const groupsetSchema = new mongoose.Schema({
  crank: {
    type: crankSchema,
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
    required: true
  },
  date_sold: Date,
  groupset: groupsetSchema, // optional, for framesets maybe
  tags: {
    type: [String],
    required: true,
    validate: [
      {
        validator: function (arr) {
          return arr.length > 0
        },
        message: "Should have at least one tag"
      }
    ]
  },
  price: { type: Number, min: [0, "Must be at least 0, got {VALUE}"], required: true },
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


// https://www.geeksforgeeks.org/mongodb/how-to-do-a-full-text-search-in-mongodb-using-mongoose/
bikeSchema.index({
  // brand: 'text',
  brand: 1,
  // model: 'text',
  model: 1,
})
bikeSchema.index({
  brand: 'text',
  // brand: 1,
  model: 'text',
  // model: 1,
})

export default mongoose.model("Bike", bikeSchema)