import React, { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom"
import MIDISounds from "midi-sounds-react";

import SheetMusic from "./SheetMusic.js"
import { intervals, major, minor, dim, chordBuilderTwo, rootLookup, flavorLookup } from "./musicTheory/chordGenerator"
import noteTranslator from "./musicTheory/noteTranslator.js"
import ChordStats from "./ChordStats.js"

const ProgressionShow = (props) =>{
  const params = useParams()
  const [title, setTitle] = useState('')
  const [chords, setChords] = useState([])
  const [notes, setNotes] = useState([])
  const [vexNotes, setVexNotes] = useState([])

  const ref = useRef(null);

  const bpm = 120;
  const N = (4 * 60) / bpm;

  const playOne = (event) =>{
    event.preventDefault()
    // debugger
    ref.current.playChordNow(4, notes[event.currentTarget.value], 1.5)
  }

  const playFour = () => {
    let when = ref.current.contextTime()
    let b = 0.1
    ref.current.playChordAt(when + b * 0, 4, notes[0], 1)
    ref.current.playChordAt(when + b * 6, 4, notes[1], 1)
    ref.current.playChordAt(when + b * 12, 4, notes[2], 1)
    ref.current.playChordAt(when + b * 18, 4, notes[3], 1)
  }


  


  const translateIntegerNotes = (chordArray) =>{
    let output = []
    for (const chord of chordArray){
      const translatedArray = chord.map((note)=>{
        return noteTranslator[note]
      })
      output.push(translatedArray)
    }
    return output
  }

  const handleChordData = (chordArray) =>{
    
    let integerOutput = []
    for (const chord of chordArray){ 
      const { degree, extension, inversion } = chord
      const flavor = flavorLookup(degree)
      const lowest = rootLookup(degree)
      const integerArray = chordBuilderTwo(lowest, flavor, extension, inversion)
      integerOutput.push(integerArray)
    }
    setNotes(integerOutput)
    setVexNotes(translateIntegerNotes(integerOutput))
    return true
  }


  const getChords = async() =>{
    const progressionId = params.id
    console.log("The fetch started")
    try {
      const response = await fetch(`/api/v1/chords/${progressionId}`)
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw (error)
      } const body = await response.json()
      handleChordData(body.chords)
      setTitle(body.chords[0].name)
      //serialize chords in backend and get the flavor?
      return setChords(body.chords)
    }catch(error){ 
      console.error(error)
    }
  }

useEffect(()=>{
  getChords()
}, [])


  return(
    <div className="show">
    <div className="centered">
    <h3>{title}</h3>
    <div id="staff" >
      <SheetMusic 
      notes={vexNotes}/>
      </div>
      <button onClick={playFour}>Hear all four</button>
      </div>
      <div className="grid-x grid-margin-x">
      <div className="cell medium-2 formHolder" />
      <div className="cell medium-2">
      <button value="0" onClick={playOne}>Hear this chord!</button>
      <ChordStats 
      chord={chords[0]}/>
      </div>
      <div className="cell medium-2">
        <button value="1" onClick={playOne}>Hear this chord!</button>
        <ChordStats 
        chord={chords[1]}/>
      </div>
      <div className="cell medium-2">
      <button value="2" onClick={playOne}>Hear this chord!</button>
      <ChordStats 
      chord={chords[2]}/>
      </div>
      <div className="cell medium-2">
      <button value="3" onClick={playOne}>Hear this chord!</button>
      <ChordStats 
      chord={chords[3]}/>
      </div>

      </div>
      <div className="centered">
      <MIDISounds ref={ref} appElementName="app" instruments={[3, 4]} />
      </div>
      </div>
      
  )
}

export default ProgressionShow

{/* <div id="staff" >
      <SheetMusic 
      notes={vexNotes}/>
      </div>
      
      <div className="grid-x grid-margin-x">
        <div className="cell medium-2 formHolder" />
        {formArray}
        <form onSubmit={createUserNotes}>
          <button>Play all four</button>
        </form>
      </div>
      <button onClick={playMelody}>melody</button>
      <button onClick={playTestInstrument}>Playtest</button>



      <MIDISounds ref={ref} appElementName="app" instruments={[3, 4]} />
    </div> */}