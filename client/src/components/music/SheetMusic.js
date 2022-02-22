import React, { useRef, useEffect, useState } from 'react'
import { Score } from "./VexFlowComponent"



const SheetMusic = (props) => {
const [vexNotes, setVexNotes] = useState([])
const [clicked, setClicked] = useState(1)
const renderCount = useRef(1)


let score = ""

const eraseNotes = () =>{
  document.querySelectorAll('.vf-stavenote').forEach(e => e.remove());
  props.setChordName(props.chordName)
}



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

  return (
    <div id="music" className="centered">
      {score}
    </div>
  )
}

export default SheetMusic