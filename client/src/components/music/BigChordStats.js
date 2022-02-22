import React, { useEffect, useState } from "react"

import nameLookup from "./musicTheory/nameLookup.js"
import { chordBuilderTwo, rootLookup } from "./musicTheory/chordGenerator.js"
import noteTranslator from "./musicTheory/noteTranslator"

const BigChordStats = (props) =>{
  const [chords, setChords] = useState(null)

  const handleChordChange = () =>{
    setChords(props.chords)
  }

  const translateIntegerNotesStats = (oneChord) =>{
    let output = oneChord.map((note) =>{
      return noteTranslator[note].substring(0,1)
    })
    return output
  }

  let statList

  const generateStats = (chordArray) =>{
    let output = []
   for (const [key, value] of Object.entries(chordArray)){
     if(!value.root){
       value.root = rootLookup(value.degree)
     }
     const integerNotes = chordBuilderTwo(value.root, value.flavor, value.extension, "root")
     const textNotes = translateIntegerNotesStats(integerNotes).join(', ')
    const name = nameLookup[value.degree]
    let extension = ''
    let inversion = ''
    let flavor = value.flavor
    
    if(value.extension !== "none"){
      extension = value.extension
    } 

    if(value.extension === "dominant 7"){
      flavor = ''
    }

    if(value.extension === "minor 9"){
      flavor = ''
    }

    if(value.inversion === 'root'){
      inversion = "root position"
    } if (value.inversion === 'first'){
      inversion = "first inversion"
    } if (value.inversion === 'second'){
      inversion = "second inversion"
    } if (value.inversion === 'third'){
      inversion = "third inversion"
    }
  
      output.push(<li>{`${name} ${flavor} ${extension} (${textNotes}), ${inversion}`}</li>)
   }
   return output
  }




if(chords !==  null){
  statList = generateStats(chords)
}

useEffect(()=>{
  handleChordChange()
}, [props])

  return(
    <div>
      <p>If you are unfamiliar with musical notation:</p>
      <ol>
        {statList}
      </ol>
    </div>
  )
}

export default BigChordStats