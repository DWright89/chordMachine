import React from "react"

const ChordOption = (props)=>{
    const {index, chord, degree} = props
        return(
           
                <option
                name="first"
                value={degree}     
                >{chord}
                </option>

            
        )
}

export default ChordOption