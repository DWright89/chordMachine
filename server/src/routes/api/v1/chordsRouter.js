import express from "express"
import dotenv from "dotenv"
import { ValidationError } from "objection"

import { Chord } from "../../../models/index.js"
import ChordSerializer from "../../../serializers/ChordSerializer.js"
import hookTheoryClient from "../../../services/HookTheoryClient.js"

dotenv.config()
const apiKey = process.env.HOOKTHEORY_KEY

const chordsRouter = new express.Router()

chordsRouter.get("/", async (req, res)=>{
  const allChords = await Chord.query().distinct("name", "url")
  const cleanedChords = ChordSerializer.prepareIndex(allChords)
  return res.status(200).json(cleanedChords)
})

chordsRouter.get("/:id", async (req, res)=>{
  let data = {}
  const id = req.params.id
  const response = await Chord.query().where("url", "=", id).orderBy("order")
  let chords = ChordSerializer.getDetails(response)
  const songs = await hookTheoryClient.getSongs(apiKey, chords)
  data.chords = chords
  data.songs = songs
  return res.status(200).json(data)
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