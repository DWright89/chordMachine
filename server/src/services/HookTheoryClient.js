import got from "got"
import dotenv from 'dotenv'



dotenv.config()
const apiKey = process.env.HOOKTHEORY_KEY

class HookTheoryClient {
  static async twoChords(key, chordOne, chordTwo){
    const url = "https://api.hooktheory.com/v1/trends/nodes?cp="
   try{
    const response = await got(`${url}${chordOne},${chordTwo}`, 
    {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${key}`
      }
    })
   
    const chords = response.body
    return chords
   }catch(error){
     return { error }
   }
  }

}

export default HookTheoryClient