import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom"
import MIDISounds from "midi-sounds-react";

import ChordForm from "./ChordForm.js";
import SheetMusic from "./SheetMusic.js"
import ChordLookup from "./ChordLookup.js"
import BigChordStats from "./BigChordStats.js"
import { chordBuilderTwo } from "./musicTheory/chordGenerator"
import noteTranslator from "./musicTheory/noteTranslator.js";
import ErrorList from "../layout/ErrorList.js"
import translateServerErrors from "../../services/translateServerErrors.js"


const Midi = (props) => {
  const [errors, setErrors] = useState([])
  const [localErrors, setLocalErrors] = useState('')
  const [chords, setChords] = useState({
    1: {
      degree: "4",
      root: "65",
      flavor: "major",
      extension: "none",
      inversion: "root",
    }, 2: {
      degree: "5",
      root: "67",
      flavor: "major",
      extension: "none",
      inversion: "root",
    }, 3: {
      degree: "6",
      root: "69",
      flavor: "minor",
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


  const [chordName, setChordName] = useState('')
  const [userNotes, setUserNotes] = useState([])
  const [vexNotes, setVexNotes] = useState([])
  const [noteFix, setNoteFix] = useState(true)




  const ref = useRef(null);

  const bpm = 120;
  const N = (4 * 60) / bpm;

  const fixNotes = ()=>{
    document.querySelectorAll('.vf-stavenote').forEach(e => e.remove());
    setNoteFix(!noteFix)
  }

  const playFour = (chordArray) => {
    let when = ref.current.contextTime()
    let b = 0.1
    ref.current.playChordAt(when + b * 0, 4, chordArray[0], 1)
    ref.current.playChordAt(when + b * 7, 4, chordArray[1], 1)
    ref.current.playChordAt(when + b * 14, 4, chordArray[2], 1)
    ref.current.playChordAt(when + b * 21, 4, chordArray[3], 1)
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

  const createUserNotes = (event) => {
    event.preventDefault()
    let output = []
    for (const [key, value] of Object.entries(chords)) {
      output.push(chordBuilderTwo(value.root, value.flavor, value.extension, value.inversion))
    }
    setUserNotes(output)
    playFour(output)
  }

  const initializeUserNotes = ()=>{
    let midiNotesArray = []
    
    for (const [key, value] of Object.entries(chords)) {
      midiNotesArray.push(chordBuilderTwo(value.root, value.flavor, value.extension, value.inversion))
    }
    const vexNotesArray = translateIntegerNotes(midiNotesArray)
    setUserNotes(midiNotesArray)
    fixNotes()
    setVexNotes(vexNotesArray)
  }


  const playTestInstrument = (noteArray) => {
    ref.current.playChordNow(4, noteArray, 1.5);
  };

  const handleFormChanges = (chordNumber, formData) => {
    setChords({ ...chords, [chordNumber]: formData })
  }

  const handleNameChange = (event) =>{
    setChordName(event.currentTarget.value)
  }

  const getRandomName = async () =>{
    try{
      const response = await fetch("/api/v1/words")
      const randomWords = await response.json()
      const stringWords = randomWords.join(' ')
      const array = stringWords.split(" ")
        for (let i = 0; i < array.length; i++) {
          array[i] = array[i].charAt(0).toUpperCase() + array[i].slice(1);
        }
      const capitalized = array.join(" ")
      setChordName(capitalized)
    }catch(error){
      console.log("There was an error in the random word API: ", error)
    }
  }

  const sequence = [1, 2, 3, 4]
  const formArray = sequence.map((number) => {
    return <ChordForm
      key={number}
      position={number}
      handleFormChanges={handleFormChanges}
      playTestInstrument={playTestInstrument}
    />
  })


  
  const postChords = async (event) =>{
    event.preventDefault()
    if(chordName === ''){
      return setLocalErrors("You must enter a name.")
    }
    const name = chordName
    const url = chordName.replace(/\s+/g, '').toLowerCase()
    const chordPayload = { name, url, chords }
    try{
      const response = await fetch("/api/v1/chords", {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json"
        }),
        body: JSON.stringify(chordPayload)
      })
      if(!response.ok){
        if(response.status === 422){
          const body = await response.json()
          const newErrors = translateServerErrors(body.errors)
          return setErrors(newErrors)
        } else {
          const errorMessage = `${response.status} (${response.statusText})`
          const error = new Error(errorMessage)
          throw(error)
        }
      }
      else {
        const body = await response.json()
        const destination = url.replace(/[^a-zA-Z0-9-_]/g, '')
        location.href = `/chords/${destination}`
      }
    }catch(error){
      console.error("The post route broke", error)
    }
  }
  
  
    let saveButton = <p>If you want to save these chords, you should <Link to="/user-sessions/new">sign in</Link>
                        or <Link to="/users/new">sign up!</Link></p>
    if(props.user){
      saveButton = <form>
                    <button  className="button" onClick={postChords}>Save your chords!</button>
                   </form>
                  
    }
    


  useEffect(()=>{
    initializeUserNotes()
  }, [chords])

  return (
    <div className="app">
      <p className="App-intro"></p>
      <div id="staff" >
       <SheetMusic 
        notes={vexNotes}
        setChordName={setChordName}
        chordName={chordName}/>
      </div>
      <div className="grid-x grid-margin-x">
        <div className="cell medium-4 left-side">
          <ChordLookup 
          chords={chords}/>
        </div>


      <div className="cell medium-4">
        <div className="formErrors centered">
          <ErrorList errors={errors} />
          {localErrors}
        </div>
          <form onSubmit={createUserNotes}>
            <label htmlFor='name'>Provide a beautiful name for your chords:</label>
              <input
                type='text'
                name='name'
                id='name'
                onChange={handleNameChange}
                value={chordName}
              />
              <br/>
            <button className="button">Play all four</button>
          </form>
          <div>
            <form>
              <button className="button" onClick={getRandomName}>Get me a random name</button>
            </form>
          </div>
          <div>
            {saveButton}
          </div>
          <div className="grid-x grid-margin-x">
            {formArray}
          </div>
        </div>


        
        <div className="cell medium-4">
          <BigChordStats
          chords={chords}
          />
          </div>
        </div>
        <div className="centered">
      <MIDISounds className="centered" ref={ref} appElementName="app" instruments={[3, 4]} />
      </div>
    </div>
  );
};

export default Midi;
