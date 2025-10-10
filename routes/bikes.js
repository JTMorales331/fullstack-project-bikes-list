import express from "express"
import { v4 as uuidv4 } from "uuid"
import b from "../artifacts/json-server-test.json" with { type: "json" }
const router = express.Router()

let bikes = b

router.get("/", (req, res) => {
  if (!bikes || bikes.length === 0) {
    return res.status(404).json({ message: "No stuff found" });
  }
  res.status(200).json(bikes);
})

router.get("/:id", (req, res) => {
  const id = bikes.find((item) => {
    return item.id === req.params.id
  })

  if (!id) {
    return res.status(404).send({ message: "ID not found" })
  }

  res.status(200).json(id)
})

router.post("/", (req, res) => {
  // Error handling
  // const { error } = validatePerson(req.body);
  // if (error) {
  //   const errors = error.details.map(item => item.message)
  //   return res.status(400).json(errors)
  // }

  const uuid = uuidv4()
  req.body.id = uuid;
  bikes.push(req.body)
  res.status(201).json(req.body);
})

router.put("/:id", (req, res) => {
  const id = req.params.id

  const updatedBody = req.body

  // Error handling
  // const { error } = validatePerson(updatedBody);
  // if (error) {
  //   const errors = error.details.map(item => item.message)
  //   return res.status(400).json(errors)
  // }

  const bodyIndex = bikes.find((item) => {
    return item.id === id;
  })

  if (!id || !bodyIndex) {
    return res.status(404).send({ message: "ID not found" })
  }

  req.body.id = id;

  const bodyToUpdateIndex = bikes.indexOf(bodyIndex)

  bikes[bodyToUpdateIndex] = { id, ...updatedBody }

  res.status(200).json(bikes[bodyToUpdateIndex])
})

router.delete("/:id", (req, res) => {
  const filteredBody = bikes.filter((item) => {
    return item.id !== req.params.id
  })

  if (filteredBody.length === bikes.length) {
    res.status(404).send({ error: "Deletion unsuccessful" })
  } else {
    bikes = filteredBody
    res.status(200).json({ message: "Body deleted successfully" })
  }
})

export default router;