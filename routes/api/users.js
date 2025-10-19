import express from 'express';
import User from "../../models/user.js"
import bcrypt from "bcrypt"
import { passwordStrength } from 'check-password-strength';

const router = express.Router();

/* GET users listing. */
router.get('/', async function (req, res, next) {
  try {
    const userData = await User.find().exec()

    if (!userData || !userData.length === 0) {
      return res.status(404).json({ message: "No stuff found" })
    }

    res.status(200).json(userData)
  } catch (err) {
    res.status(500).json({ message: "Server error: ", err })
  }
});

// for checking
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id
    const userData = await User.findById(id).exec()

    if (!userData) {
      return res.status(404).json({ message: "Record not  found" })
    }

    res.status(200).json(userData)
  } catch (err) {
    return res.status(500).json({ message: "Server error: ", err })
  }
})


// register
router.post("/register", async (req, res) => {
  try {
    // A bit more understanding: this creates a new User document
    
    // then we check the password strength
    const { password } = req.body;
    
    
    if (passwordStrength(password).id < 1) {
      return res.status(400).json({ message: `Password is ${passwordStrength(password).value.toString().toLowerCase()}` })
    }
    
    const saltRounds = 10
    const salt = await bcrypt.genSalt(saltRounds)
    
    const hashedPassword = await bcrypt.hash(password, salt)
    
    const newUser = new User({...req.body, password: hashedPassword})

    // and THIS actually saves said document to MongoDB
    const newRecord = await newUser.save()

    return res.status(201).json(newRecord)
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(422).json(err.errors)
    }
    return res.status(500).send({ message: "server error: ", err })
  }
})

// regiter
// router.post("/login", async (req, res) => {
//   try {

//   } catch (err) {

//   }
// })

export default router;