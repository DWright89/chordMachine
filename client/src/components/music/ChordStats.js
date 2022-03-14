import React from "react"

import nameLookup from "./musicTheory/nameLookup.js"

const ChordStats = props =>{
const { chord } = props
let note
let flavor
let extension = ''
let inversion
let stats = ""
if(props.chord){
if(chord.degree){
  note = nameLookup[chord.degree]
}

if(chord.flavor){
  flavor = chord.flavor
}

if(chord.extension){
  if(chord.extension !== "none"){
    extension = chord.extension
  }
}

if(chord.inversion){
  if(chord.inversion === 'root'){
    inversion = "in root position"
  } if (chord.inversion === 'first'){
    inversion = "in the first inversion"
  } if (chord.inversion === 'second'){
    inversion = "in the second inversion"
  } if (chord.inversion === 'third'){
    inversion = "in the third inversion"
  }

  stats = `This is a ${note} ${flavor} ${extension} chord ${inversion}`
}

}
  return (
    <div>
    <p>{stats}</p>
    </div>
  )
}
export default ChordStats