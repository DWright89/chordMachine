import express from "express"

import { Chord } from "../../../models/index.js"
import ChordSerializer from "../../../serializers/ChordSerializer.js"

const chordsRouter = new express.Router()

chordsRouter.get("/", (req, res)=>{
  console.log("Hit the root router for chords")
  return res.status(200).json("stuff")
})

chordsRouter.get("/:id", async (req, res)=>{
  const id = req.params.id
  const response = await Chord.query().where("url", "=", id).orderBy("order")
  const chords = ChordSerializer.getDetails(response)
  return res.status(200).json({chords})
})

export default chordsRouter