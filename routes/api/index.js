import express from "express"
import eventsRouter from "./events.js"
import usersRouter from "./users.js"
import bikesRouter from "./bikes.js"


const router = express.Router()

router.use("/events", eventsRouter)
router.use("/users", usersRouter)
router.use("/bikes", bikesRouter)

router.get("/", (req, res) => {
  res.send("Welcome to the API ^_^")
})

export default router