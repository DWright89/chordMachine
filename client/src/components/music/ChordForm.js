import React, {useState, useRef} from "react"

import { chordData, inversionData } from "./musicTheory/chordData"
import { rootLookup, flavorLookup, chordBuilderTwo } from "./musicTheory/chordGenerator"


const ChordForm = props =>{
    const [menuState, setMenuState] = useState({
        chord : {
            degree: "1",
            root: "60",
            flavor: "major",
            extension: "none",
            inversion: "root",       }
    })

    const [degreeHover, setDegreeHover] = useState(false)
    const [extensionHover, setExtensionHover] = useState(false)
    const [inversionHover, setInversionHover] = useState(false)

   const chords = ["I", "ii", "iii", "IV", "V", "vi", "vii"]


    const extensionOptions = chordData.find(
        (chord) => chord.name === menuState.chord.degree)
        ?.extensions.map((extension) => (
            <option key={extension} value={extension}>
                {extension}
            </option>
        ))

    const inversionOptions = inversionData.find(
        (extension) => extension.name === menuState.chord.extension)
        ?.inversions.map((inversion)=> (
            <option key={inversion} value={inversion}>
                {inversion}
            </option>        
            ))
        

const handleDegreeChange = (event) =>{
    const degree = event.currentTarget.value
    const root = rootLookup(degree)
    const flavor = flavorLookup(degree)
    const chord = {...menuState.chord, 
                    degree: event.currentTarget.value,
                    root: root,
                    flavor: flavor}
    chord.extension = "none"
    chord.inversion = "root"
    setMenuState({...menuState,
                chord})
    props.handleFormChanges(props.position, chord)
}

const handleExtensionChange = (event) => {
    const chord = {...menuState.chord, extension: event.currentTarget.value, inversion: "root"}
    setMenuState({...menuState,
                chord})
    props.handleFormChanges(props.position, chord)
}

const handleInversionChange = (event) =>{
    const chord = {...menuState.chord, inversion: event.currentTarget.value}
    setMenuState({...menuState,
                chord})
    props.handleFormChanges(props.position, chord)
}



    const handleSubmit = (event) =>{
        event.preventDefault()
        const chord = menuState.chord
        const noteArray = chordBuilderTwo(chord.root, chord.flavor, chord.extension, chord.inversion)
        props.playTestInstrument(noteArray)
    }


  
    const chordOptions = chords.map((chord, index) => {
        const degree = index+1
        return(
            <option
            key={index}
            value={degree}
            > {chord}
            </option>
        )
    })

    
    return(
    <div className="cell medium-3 form-parent">
        <form onSubmit={handleSubmit} >
            <label
            onMouseEnter={() => setDegreeHover(true)}
            onMouseLeave={() => setDegreeHover(false)}
              >Scale degree:</label>
               {degreeHover && (
                <div className="degree-tip">
                  Which degree of the scale will your chord be built from?
                </div>
              )}
        <select onChange={handleDegreeChange}>
       {chordOptions}
       </select>
       <label
        onMouseEnter={() => setExtensionHover(true)}
        onMouseLeave={() => setExtensionHover(false)}
        >Extensions:</label>
            {extensionHover && (
                <div className="extension-tip">
                    Choose an additional note for your chord
                </div>
            )}
       <select onChange={handleExtensionChange}>
       {extensionOptions}
       </select>
       <label
        onMouseEnter={() => setInversionHover(true)}
        onMouseLeave={() => setInversionHover(false)}
        >Inversion:</label>
            {inversionHover && (
                <div className="inversion-tip">
                    Choose your inversion (lowest note is 'flipped' to the top!)
                </div>
            )}
       <select onChange={handleInversionChange}>
        {inversionOptions}
       </select>
       <br/>
       <button>Play me!</button>
        </form>
        
    </div>
    )
}


export default ChordForm