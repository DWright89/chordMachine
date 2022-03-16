import React, { useState, useEffect } from "react"

import ChordReport from "./ChordReport.js"

const ChordLookup = (props) =>{

  const [formState, setFormState] = useState(0)
  const [responseState, setResponseState] = useState([])
  
//generates dropdown options
  const dropdownOptions = ["Tell me about the first two",
                           "Tell me about the middle two", 
                           "Tell me about all four"]

  const lookupOptions = dropdownOptions.map((option, index) =>{
    return(
      <option 
      key={index}
      value={index}>
        {option}
      </option>
    )
  })
//sends the user's selected chords from the frontend through the HookTheoryAPI
  const handleSubmit = async (event) =>{
    event.preventDefault()
    const payload = deriveFormPayload(formState)
   try{
     const response = await fetch("/api/v1/theory/lookup",{
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json"
        }),
        body: JSON.stringify(payload)
     })
     const body = await response.json()
     setResponseState(body)
   }catch(error){
     console.error("Error in Chord Lookup: ", error)
   }
  }
//Grabs the appropriate chord degrees 
  const deriveFormPayload = (formValue) =>{
    if(formValue == 0){
      return [props.chords[1].degree, props.chords[2].degree]
    } else if(formValue == 1){
      return [props.chords[2].degree, props.chords[3].degree]
    } else{
      return[props.chords[1].degree, props.chords[2].degree, props.chords[3].degree, props.chords[4].degree]
    }
  }


  const handleChange = (event) =>{
    setFormState(event.currentTarget.value)
  }
//Displays the returns from the API, initialized as nothing
  let chordReport
  if(responseState.length > 1){
    const queriedChords = deriveFormPayload(formState)
    chordReport = <ChordReport
                    userChords={queriedChords}
                    chords={responseState}
                    />
  }

  useEffect(()=>{
  
 }, [formState, responseState])  

  return(
    <div>
      <p>Help me pick my next chord...</p>
      <div className="grid-x grid-margin-x">
      <div className="cell small-10">
        <form onSubmit={handleSubmit}>
          <select onChange={handleChange}>
            {lookupOptions}
          </select>
            <button className="button">Help me!</button>
        </form>
        </div>
        </div>
        {chordReport}
    </div>
  )
}

export default ChordLookup