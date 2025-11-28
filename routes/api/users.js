import express from 'express';
import User from "../../models/user.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { passwordStrength } from 'check-password-strength';
import validator from "validator"
import "dotenv/config.js"
import { verifyToken } from '../../middleware/Authentication.js';
import Login from '../../models/login.js';

const router = express.Router();

/* GET users listing. */
router.get('/', verifyToken, async function (req, res, next) {
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
router.get("/:id", verifyToken, async (req, res) => {
  try {
    const id = req.params.id
    const userData = await User.findById(id).exec()

    if (!userData) {
      return res.status(404).json({ message: "Record not  found" })
    }

    // remove password
    const { password, ...rest } = userData.toObject();

    // trying another way
    // const finaluserData = userData.toObject();
    // delete finaluserData.password;

    res.status(200).json(rest)
  } catch (err) {
    return res.status(500).json({ message: "Server error: ", err })
  }
})


// register
router.post("/register", async (req, res) => {
  try {
    // A bit more understanding: this creates a new User document

    // then we check the password strength
    console.log("working....")
    const passwordObject = passwordStrength(req.body.password)
    console.log('password strength: ', passwordObject)
    if (passwordObject.id < 2) {
      return res.status(422).json({ message: `Password is ${passwordObject.value.toString().toLowerCase()}` })
    }
    const saltRounds = 10
    const salt = await bcrypt.genSalt(saltRounds)

    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    const newUser = new User({ ...req.body, password: hashedPassword })

    console.log("sdfdsfsdf... ")

    // and THIS actually saves said document to MongoDB
    const newRecord = await newUser.save()

    console.log("something:sdfsdff ")
    const { password, ...rest } = newRecord.toObject()

    return res.status(200).json(rest)
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(422).json(err.errors)
    }

    if (err.code === 11000) {
      // err.errmsg = "Email duplicate smth smth"
      return res.status(409).json({ message: "Email has already been used" })
    }

    return res.status(500).send({ message: "server error: ", err })
  }
})

// login
router.post("/login", async (req, res) => {
  try {

    const { email, password } = req.body
    console.log("starting login....")

    await Login.validate(req.body)

    // if(!validator.isEmail(email)) {
    //   console.log("checking...")
    //   return res.status(400).json({ message: "Invalid Email" })
    // }

    console.log("finding the user with email....")
    const user = await User.findOne({ email })

    if (!user) {
      return res.status(401).json({ message: "user email not found" })
    }

    const isMatched = await bcrypt.compare(password, user.password)
    if (!isMatched) {
      return res.status(401).json({ message: "Password does not match to user" })
    }

    // put whatever info of user do you need here
    const payload = {
      user_id: user.id,
      email: user.email
    }

    jwt.sign(
      payload,
      process.env.SECRET,
      { algorithm: 'HS256', expiresIn: "1m" },
      function (err, token) {
        if (err) {
          console.log("error thingY: ", err)
          return res.status(400).json({ error: "error on the token!: " + err.message })
        }

        // apply custom header before sending response
        // probably won't use the header
        res.header({ "x-auth-token": token });

        // send token to  an http only cookie
        res.cookie('jwt', token, { httpOnly: true, path: '/' });
        return res.status(200).json({ user_id: user.id, email: user.email })
      }
    );

    // res.status(200).json({ payload: finalPayload })

  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(422).json(err.errors)
    }
    return res.status(500).send({ message: "server error: ", err })
  }
})

router.post('logout', (req, res) => {
  // clear the httpOnly jwt cookie
  res.clearCookie('jwt');

  res.status(204).send();
})

// router.post("/verify", async (req, res) => {

//   try {
//     const authHeader = req.headers.authorization

//     if (!authHeader) {
//       return res.status(401).json({ error: "Invalid auth header" })
//     }

//     // We have to put Bearer but we gotta extract it
//     const token = authHeader && authHeader.split(' ')[1];

//     if (!token) {
//       return res.status(401).json({ error: "Invalid token" })
//     }

//     const decoded = jwt.verify(token, process.env.SECRET)
//     req.user = decoded;
//     return res.status(200).json({ headers: token, isValid: true })

//   } catch (err) {
//     if (err.name === "TokenExpiredError") {
//       return res.status(400).json({jwt_error: err.message})
//     }
//     return res.status(500).send({ message: "server error: ", err })
//   }

// })

export default router;