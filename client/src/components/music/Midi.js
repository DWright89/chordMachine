import React, { useEffect, useState, useRef } from "react";
import MIDISounds from "midi-sounds-react";
import ChordForm from "./ChordForm.js";
import SheetMusic from "./SheetMusic.js"
import { chordBuilderTwo } from "./musicTheory/chordGenerator"

import noteTranslator from "./musicTheory/noteTranslator.js";

const Midi = (props) => {
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

  const sequence = [1, 2, 3, 4]
  const formArray = sequence.map((number) => {
    return <ChordForm
      key={number}
      position={number}
      handleFormChanges={handleFormChanges}
      playTestInstrument={playTestInstrument}
    />
  })




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
        <div className="cell medium-2 formHolder" />
        {formArray}
        <form onSubmit={createUserNotes}>
          <button>Play all four</button>
        </form>
      </div>
      <button onClick={playMelody}>melody</button>
      <button onClick={playTestInstrument}>Playtest</button>



      <MIDISounds ref={ref} appElementName="app" instruments={[3, 4]} />
    </div>
  );
};

export default Midi;
