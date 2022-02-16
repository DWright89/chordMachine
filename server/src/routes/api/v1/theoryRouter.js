import express from "express"
import dotenv from 'dotenv'
import HookTheoryClient from "../../../services/hookTheoryClient.js"

const theoryRouter = new express.Router()
dotenv.config()
const apiKey = process.env.HOOKTHEORY_KEY

theoryRouter.get("/", async (req, res) =>{
console.log(apiKey)
try{
  const data = await HookTheoryClient.twoChords(apiKey, 4, 5)
 
  console.log("Inside the got thing ", data)
  return res.status(200).json(data)
}catch(error){
  return res.status(401).json({errors: error})
}
})
export default theoryRouter