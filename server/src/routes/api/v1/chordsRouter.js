import express from "express"
import { ValidationError } from "objection"

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

chordsRouter.post("/", async (req, res) =>{
  const body = req.body
  const serializedChords = await ChordSerializer.handleUserChords(body, req.user.id)
  console.log("Serialized chords,  ",serializedChords)
  if(!serializedChords){
    return res.status(423).json({errors: "That name is already in use.  Please choose another."})
  }
  try{
    const newProgression = await Chord.query().insertGraph(serializedChords)
    return res.status(200).json({chords: newProgression})
  }catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data })
    }
    return res.status(500).json({ errors: error })
  }
  //handle the code for inserting multiple rows here.  account for validation error return
})

export default chordsRouter