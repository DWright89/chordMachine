import React, { useRef, useEffect, useState } from 'react'
import { Score } from "./VexFlowComponent"

import noteTranslator from "./musicTheory/noteTranslator.js"
import StaffDisplay from "./StaffDisplay.js"

const SheetMusic = (props) => {
const [vexNotes, setVexNotes] = useState([])
const [clicked, setClicked] = useState(1)
const renderCount = useRef(1)

const incrementClick = () =>{
  setClicked(clicked +1)
}


let score = ""

const eraseNotes = () =>{
  //document.getElementById("svgElement").querySelectorAll('*').forEach(n => n.remove())
  document.querySelectorAll('.vf-stavenote').forEach(e => e.remove());
  props.setChordName(props.chordName)
}

//look into minimum margins for the form div
//put the sheet music component inside a parent div with a fixed height of ~175?


if(props.notes.length > 0){
  score = <Score
  clef="treble"
  staves={[
    [
      {
        keys: props.notes[0],
        duration: "4",
        stem_direction: -1
      },
      { 
        keys: props.notes[1],
        duration: "4",
        stem_direction: -1
      },
      { 
        keys: props.notes[2],
        duration: "4",
        stem_direction: -1
      },
      { 
        keys: props.notes[3],
        duration: "4",
        stem_direction: -1
      }
    ]
  ]}
  />
}

  useEffect(()=>{
    setVexNotes(props.notes)
  },[vexNotes])
//debugger
  return (
    <div id="music" className="centered">
      {score}
      <button onClick={eraseNotes}>Click</button>
   
    </div>
  )
}

export default SheetMusic