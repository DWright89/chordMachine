import express from "express"
import dotenv from 'dotenv'
import HookTheoryClient from "../../../services/hookTheoryClient.js"

const theoryRouter = new express.Router()
dotenv.config()
const apiKey = process.env.HOOKTHEORY_KEY

theoryRouter.post("/lookup", async (req, res) =>{
  console.log("Payload on the back, ", req.body)
  try{
    const chords = await HookTheoryClient.queryChords(apiKey, req.body)
    return res.status(200).json(chords)
  } catch(error) {
    return res.status(401).json({errors: error})
  }
})
export default theoryRouter