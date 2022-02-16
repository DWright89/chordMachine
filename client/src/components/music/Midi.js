import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom"
import MIDISounds from "midi-sounds-react";

import ChordForm from "./ChordForm.js";
import SheetMusic from "./SheetMusic.js"
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

  console.log("Line 44 the current user is: ", props.user)

  const [chordName, setChordName] = useState('')
  const [userNotes, setUserNotes] = useState([])
  const [vexNotes, setVexNotes] = useState([])


  const [scale, setScale] = useState({
    tonic: [60, 64],
    supertonic: [62, 65],
    mediant: [64, 67],
    subdominant: [65, 69],
    dominant: [67, 71],
    superdominant: [69, 60],
    leadingTone: [71, 62],
    octave: [72, 60],
  });


  const ref = useRef(null);

  const bpm = 120;
  const N = (4 * 60) / bpm;

  const playMelody = () => {
    let when = ref.current.contextTime();
    let b = 0.1;
    ref.current.playChordAt(when + b * 0, 4, scale.tonic, 1);
    ref.current.playChordAt(when + b * 3, 4, scale.supertonic, 1)
    ref.current.playChordAt(when + b * 6, 4, scale.mediant, 1)
    ref.current.playChordAt(when + b * 9, 4, scale.subdominant, 1)
    ref.current.playChordAt(when + b * 12, 4, scale.dominant, 1)
    ref.current.playChordAt(when + b * 15, 4, scale.superdominant, 1)
    ref.current.playChordAt(when + b * 18, 4, scale.leadingTone, 1)
    ref.current.playChordAt(when + b * 21, 4, scale.octave, 1);
  };

  const playFour = (chordArray) => {
    let when = ref.current.contextTime()
    let b = 0.1
    ref.current.playChordAt(when + b * 0, 4, chordArray[0], 1)
    ref.current.playChordAt(when + b * 6, 4, chordArray[1], 1)
    ref.current.playChordAt(when + b * 12, 4, chordArray[2], 1)
    ref.current.playChordAt(when + b * 18, 4, chordArray[3], 1)
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
      //eventually grab the degree here to send to the API?
    }
    setUserNotes(output)
    playFour(output)
  }

  const initializeUserNotes = ()=>{
    let midiNotesArray = []
    
    for (const [key, value] of Object.entries(chords)) {
      midiNotesArray.push(chordBuilderTwo(value.root, value.flavor, value.extension, value.inversion))
      //eventually grab the degree here to send to the API?
    }
    const vexNotesArray = translateIntegerNotes(midiNotesArray)
    setUserNotes(midiNotesArray)
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
      const response = await fetch("https://random-word-api.herokuapp.com/word?number=2&swear=0")
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
        console.log("Back in the post request, get the url and redirect here ", body)
        location.href = `/chords/${url}`
      }
    }catch(error){
      console.error("The post route broke", error)
    }
  }
  
  
    let saveButton = <p>If you want to save these chords, you should <Link to="/user-sessions/new">sign in</Link>
                        or <Link to="/users/new">sign up!</Link></p>
    if(props.user){
      saveButton = <button onClick={postChords}>Save your chords!</button>
    }
    


  useEffect(()=>{
    initializeUserNotes()
  }, [chords])

  return (
    <div className="app">
      <p className="App-intro"></p>

      <div id="staff" >
      <SheetMusic 
      notes={vexNotes}/>
      </div>
      <div className="grid-x grid-margin-x">
        <div className="cell medium-4" />
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
          <button className="centered">Play all four</button>
        </form>
        <div className="cell small 2">
          <button onClick={getRandomName}>Get me a random name</button>
              </div>
              <div className="cell small 2">
              {saveButton}
          </div>
        </div>
        <div className="cell medium-4" />
        </div>
      
      <div className="grid-x grid-margin-x">
        <div className="cell medium-2 formHolder" />
        {formArray}
      </div>
      <button onClick={playMelody}>melody</button>
      <button onClick={playTestInstrument}>Playtest</button>



      <MIDISounds ref={ref} appElementName="app" instruments={[3, 4]} />
    </div>
  );
};

export default Midi;
