import got from "got"

//One method for chords, one method for songs
//Both check to remove repetetive chord degrees, which will
//cause an error in the return.
//both of these functions are only limited to chord progression
//lengths that the HookTheory API is limited to
class hookTheoryClient {
  static async queryChords(key, degreeArray){
    const unique = []
    degreeArray.forEach((number)=>{
      if(!unique.includes(number)){
        unique.push(number)
      }
    })
    const queryString = unique.join()
    
    const url = "https://api.hooktheory.com/v1/trends/nodes?cp="
   try{
    const response = await got(`${url}${queryString}`, 
    {
      headers: {
        "Authorization": `Bearer ${key}`
      }
    })
    const allChords = JSON.parse(response.body)
    const topThree = allChords.slice(0, 3)
    return topThree
   }catch(error){
     return { error }
   }
  }

  static async getSongs(key,chordsFromDatabase){
   
    let chordDegrees = []
    for (const chord of chordsFromDatabase){
      chordDegrees.push(chord.degree)
    }

    const unique = []
    chordDegrees.forEach((number)=>{
      if(!unique.includes(number)){
        unique.push(number)
      }
    })
    
    const queryString = unique.join()
    const url = "https://api.hooktheory.com/v1/trends/songs?cp="
   
    try{
      const response = await got(`${url}${queryString}`, 
    {
      headers: {
        "Authorization": `Bearer ${key}`
      }
    })
    const allSongs = JSON.parse(response.body)
    return allSongs
    }catch(error){
      return {error }
    }
  }
}

export default hookTheoryClient