import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  res.send("GET ALL EVENTS")
})

router.get("/:id", (req, res) => {
  res.send(`ID: ${req.params.id}`)
})

router.post("/", (req, res) => {
  res.json(req.body);
})

router.put("/:id", (req, res) => {
  res.json(req.body);
})

router.delete("/:id", (req, res) => {
  res.json(req.body);
})

export default router