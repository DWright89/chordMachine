//this needs to have state that can track the four chords below it, and with one function create the note arrays to send upstairs to play.
//sits below midi and above the chord form.
//needs access to playChordNow to test chords

import React,{ useState } from "react"

import ChordForm from "./ChordForm.js"

const ChordHandler = (props) =>{
  
  const [chords, setChords] = useState({
    1: {
      degree: "1",
      root: "60",
      flavor: "major",
      extension: "none",
      inversion: "root",
    }, 2: {
      degree: "1",
      root: "60",
      flavor: "major",
      extension: "none",
      inversion: "root",
    }, 3: {
      degree: "1",
      root: "60",
      flavor: "major",
      extension: "none",
      inversion: "root",
    }, 4: {
      degree: "1",
      root: "60",
      flavor: "major",
      extension: "none",
      inversion: "root",
    }
  })

  // const handleFormChanges = (chordNumber, formData) =>{
  //   console.log("Handle form changes chord number, ", chordNumber)
  //   console.log("handle form changes input, ", formData)
  //   //setChords({...chords, [chordNumber]: formData})
  // }

  // const sequence = [1, 2, 3, 4]
  // const formArray = sequence.map((number) =>{
  //   return <ChordForm 
  //             key={number}
  //             position={number}
  //             handleFormChanges={handleFormChanges}
  //             />
  // })


  return(
    <div className="grid-x grid-margin-x">
    {formArray}
    </div>
  )
}

export default ChordHandler