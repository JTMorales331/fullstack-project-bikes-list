import express from "express"
import { v4 as uuidv4 } from "uuid"
import b from "../../artifacts/json-server-test.json" with { type: "json" }
import { verifyToken } from "../../middleware/Authentication.js"
import NodeCache from "node-cache"

import Bike from "../../models/bike.js"

const cache = new NodeCache();

const router = express.Router()


router.get("/", async (req, res) => {

  try {

    const query = req.query?.q?.trim().toLowerCase();

    // I'll be honest I just discovered this portion via ai
    // /\s+/ is basically
    const queries = query ? query.split(/\s+/) : [];
    console.log(queries)
    let cacheKey;

    if (queries && queries.length > 0) {
      // sort this
      const sortedWordsQuery = queries.sort().join("_")
      console.log(sortedWordsQuery)
      // cache section
      // basically so that we can just use the same cache whether "Giant TCR" or "TCR Giant"
      cacheKey = `search_${encodeURIComponent(sortedWordsQuery)}`;
    } else {
      cacheKey = "all_bikes"
    }


    // get the cache based on cache key
    const cached = cache.get(cacheKey)

    // return the cache data
    if (cached) {
      console.log("Cache hit: ", cacheKey)
      return res.status(200).json(cached)
    }

    let filter = {};

    if (query && query.length > 0) {


      filter = {

        // and is equivalent to saying:
        // I want "Giant" to appear in either brand or model AND I want TCR to also
        // appear in either brand or model
        $and: queries.map(q => ({
          $or: [
            { brand: { $regex: q, $options: "i" } },
            { model: { $regex: q, $options: "i" } }
          ]
        }))
      }
    }

    const bikesData = await Bike.find(filter)
      .sort({ brand: 1, model: 1 })
      .exec();

    // set the new bikes data and replace the cacheKey, 30 seconds
    const time = bikesData.length > 0 ? 30 : 0;
    cache.set(cacheKey, bikesData, time);

    res.status(200).json(bikesData);
  } catch (err) {
    console.log("error: ", err)
    res.status(500).json({ message: "Server error: ", err })
  }
})

router.get("/:id", async (req, res) => {

  try {
    // const id = Bike.find((item) => {
    //   return item.id === req.params.id
    // })
    const id = req.params.id

    const cacheKey = `bike_id_${id}`

    const cached = cache.get(cacheKey)

    if (cached) {
      console.log("Cache hit: ", cacheKey)
      return res.status(200).json(cached)
    }

    const bikeData = await Bike.findById(id).exec()

    if (!bikeData || bikeData === null) {
      return res.status(404).json({ message: "Record not found" })
    }

    if (bikeData) {
      cache.set(cacheKey, bikeData, 120)
    }

    res.status(200).json(bikeData)

  } catch (err) {
    return res.status(500).json({ message: "server error: ", err })
  }
})

router.post("/", verifyToken, async (req, res) => {
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

router.put("/:id", verifyToken, async (req, res) => {

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

router.delete("/:id", verifyToken, async (req, res) => {
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