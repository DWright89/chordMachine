import got from "got"

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
}

export default hookTheoryClient