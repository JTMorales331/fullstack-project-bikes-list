import express from "express"
import { v4 as uuidv4 } from "uuid"
import b from "../artifacts/json-server-test.json" with { type: "json" }

import Bike from "../models/bike.js"

const router = express.Router()

let bikes = b

router.get("/", async (req, res) => {

  try {
    const bikesData = await Bike.find().exec()

    if (!bikesData || bikesData.length === 0) {
      return res.status(404).json({ message: "No stuff found" });
    }

    res.status(200).json(bikesData);
  } catch (err) {
    res.status(500).json({ message: "Server error: ", err })
  }
})

router.get("/:id", async (req, res) => {

  try {
    // const id = Bike.find((item) => {
    //   return item.id === req.params.id
    // })

    const id = req.params.id
    const bikeData = await Bike.findById(id).exec()

    if (!bikeData || bikeData === null) {
      return res.status(404).json({ message: "Record not found" })
    }

    res.status(200).json(bikeData)

  } catch (err) {
    return res.status(500).json({ message: "server error: ", err })
  }
})

router.post("/", async (req, res) => {
  // Error handling
  // const { error } = validatePerson(req.body);
  // if (error) {
  //   const errors = error.details.map(item => item.message)
  //   return res.status(400).json(errors)
  // }

  try {
    // const uuid = uuidv4()
    // req.body.id = uuid;
    const newBike = new Bike(req.body)

    const newRecord = await newBike.save()

    res.status(201).json(newRecord);

  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(422).json(err.errors)
    }
    return res.status(500).send({ message: "server error: ", err })
  }

})

router.put("/:id", async (req, res) => {

  try {
    const id = req.params.id

    const reqBody = req.body
    const updatedRecord = await Bike.findByIdAndUpdate(id, reqBody, { new: true, runValidators: true })
    if (!updatedRecord) {
      return res.status(404).json({ message: "Record not found" })
    }

    // 204 if you don't return anything
    // 200 if you want to return something with the response
    res.status(200).json(updatedRecord)
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(422).json(err.errors)
    }
    return res.status(500).json({ message: "server error: ", err })
  }
})

router.delete("/:id", async (req, res) => {
  // const filteredBody = bikes.filter((item) => {
  //   return item.id !== req.params.id
  // })

  // if (filteredBody.length === bikes.length) {
  //   res.status(404).send({ error: "Deletion unsuccessful" })
  // } else {
  //   bikes = filteredBody
  //   res.status(200).json({ message: "Body deleted successfully" })
  // }


  try {
    const id = req.params.id

    const deletedData = await Bike.findByIdAndDelete(id).exec()
    if (!deletedData) {
      return res.status(404).send({ error: "Deletion unsuccessful" })
    }
    res.status(204).json(deletedData)

  } catch (err) {
    return res.status(500).send({ message: "server error: ", err })
  }
})


export default router;