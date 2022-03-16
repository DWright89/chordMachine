import express from "express"
import dotenv from "dotenv"
import { ValidationError } from "objection"

import { Chord } from "../../../models/index.js"
import ChordSerializer from "../../../serializers/ChordSerializer.js"
import hookTheoryClient from "../../../services/HookTheoryClient.js"

dotenv.config()
const apiKey = process.env.HOOKTHEORY_KEY

const chordsRouter = new express.Router()

//uses .distinct() to return the first unique name and url fields
//from the chord table.
//Runs them through a serializer that only returns the necessary
//information for generating a list of links to show pages
chordsRouter.get("/", async (req, res)=>{
  const allChords = await Chord.query().distinct("name", "url")
  const cleanedChords = ChordSerializer.prepareIndex(allChords)
  return res.status(200).json(cleanedChords)
})

//matches the URL parameters to the database and orders them by the 'order' field
//which ensures that the chords are rendered and played in the correct order
//This also contains the API call to HookTheory that returns songs sharing
//the same chords
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

//passes user chords into handler functions that prepare them for being entered into the DB
//uses insertGraph to put all chord objects into the DB in one transaction
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