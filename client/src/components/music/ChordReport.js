import React, { useEffect } from "react"

const ChordReport = (props) =>{

  const decimalToPercent = (decimal) =>{
    const percent = Math.round((decimal*100))
    return `${percent}%`
  }
  
  const generateReport = () =>{
    const percents = props.chords.map((chord)=>{
      return decimalToPercent(chord.probability)
    })

    return(
      <div>
      <p>{`Your chords are a ${props.userChords[0]} and a ${props.userChords[1]}`}</p>
      <p>{`The top three next options are: ${props.chords[0].chord_HTML}, ${props.chords[1].chord_HTML}, and ${props.chords[2].chord_HTML} `}</p>
      <p>{`${percents[0]}, ${percents[1]}, and ${percents[2]} of songs, respectively, follow that pattern`}</p>
      </div>
    )
  }



let report = generateReport()


  return(
  <div>
    {report}
    </div>
  )
}
export default ChordReport