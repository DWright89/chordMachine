import express from "express"
import dotenv from 'dotenv'
import hookTheoryClient from "../../../services/HookTheoryClient.js"

const theoryRouter = new express.Router()
dotenv.config()
const apiKey = process.env.HOOKTHEORY_KEY

//this is the endpoint for users querying about some or all of their chords
//to get information on what their next chord should be
theoryRouter.post("/lookup", async (req, res) =>{
  try{
    const chords = await hookTheoryClient.queryChords(apiKey, req.body)
    return res.status(200).json(chords)
  } catch(error) {
    return res.status(401).json({errors: error})
  }
})
export default theoryRouter