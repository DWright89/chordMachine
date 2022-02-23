import React, { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom"
import MIDISounds from "midi-sounds-react";

import SheetMusic from "./SheetMusic.js"
import { intervals, major, minor, dim, chordBuilderTwo, rootLookup, flavorLookup } from "./musicTheory/chordGenerator"
import BigChordStats from "./BigChordStats.js";
import noteTranslator from "./musicTheory/noteTranslator.js"
import ChordStats from "./ChordStats.js"
import SongTile from "./SongTile.js";

const ProgressionShow = (props) =>{
  const params = useParams()
  const [title, setTitle] = useState('')
  const [chords, setChords] = useState([])
  const [notes, setNotes] = useState([])
  const [vexNotes, setVexNotes] = useState([])
  const [songList, setSongList] = useState([])

  const ref = useRef(null);

  const bpm = 120;
  const N = (4 * 60) / bpm;


  const playOne = (event) =>{
    event.preventDefault()
    ref.current.playChordNow(4, notes[event.currentTarget.value], 1.5)
  }

  const playFour = () => {
    let when = ref.current.contextTime()
    let b = 0.1
    ref.current.playChordAt(when + b * 0, 4, notes[0], 1)
    ref.current.playChordAt(when + b * 7, 4, notes[1], 1)
    ref.current.playChordAt(when + b * 14, 4, notes[2], 1)
    ref.current.playChordAt(when + b * 21, 4, notes[3], 1)
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

  let songTiles = ''

  const generateSongTiles = (songs) =>{
    let output = songs.map((song, index)=>{
      return (
        <SongTile 
        key={index}
        song={song}
        />
      )
    })
    return output
  }

  if (songList.length > 1){
    songTiles = generateSongTiles(songList)
  }

  const getChords = async() =>{
    const progressionId = params.id
    try {
      const response = await fetch(`/api/v1/chords/${progressionId}`)
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw (error)
      } const body = await response.json()
      handleChordData(body.chords)
      setTitle(body.chords[0].name)
      setSongList(body.songs)
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
      <div className="centered title">
        <h2>{title}</h2>
    </div>
      <div className="grid-x grid-margin-x">
        <div className="cell medium-4 songList left-side">
          <p>Here are some sections of songs that include these chords:</p>
          {songTiles}
          </div>

            <div className="cell medium-4 centered">
          <div id="staff" >
            <SheetMusic 
            notes={vexNotes}/>
          </div>
        <button className="centered" onClick={playFour}>Hear all four</button>
       
         <div className="grid-x grid-margin-x">
        <div className="cell medium-3">
          <button value="0" onClick={playOne}>Hear this chord!</button>
            
        </div>
        <div className="cell medium-3">
          <button value="1" onClick={playOne}>Hear this chord!</button>
          
        </div>
        <div className="cell medium-3">
          <button value="2" onClick={playOne}>Hear this chord!</button>
          
        </div>
        <div className="cell medium-3">
          <button value="3" onClick={playOne}>Hear this chord!</button>
           
       
            </div>
            </div>
        </div>

        <div className="cell medium-4">
          <BigChordStats
          chords={chords}
          />
      </div>
          </div>
     
      <div className="centered">
      <MIDISounds ref={ref} appElementName="app" instruments={[3, 4]} />
      </div>
      </div>
      
  )
}

export default ProgressionShow