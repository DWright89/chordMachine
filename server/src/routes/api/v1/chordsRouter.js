import express from "express"
import { ValidationError } from "objection"

import { Chord } from "../../../models/index.js"
import ChordSerializer from "../../../serializers/ChordSerializer.js"

const chordsRouter = new express.Router()

chordsRouter.get("/", async (req, res)=>{
  const allChords = await Chord.query().distinct("name", "url")
  return res.status(200).json(allChords)
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
})

export default chordsRouter