import React from "react"
import {Link} from "react-router-dom"

const LandingPage = (props) =>{

  return(
    <div>
      <p className="fade-in-text text">Welcome to Chordmachine</p>
      <p className="fade-in-text-2 text-2">An app for creating and learning about chord progressions</p>

      <p className="fade-in-text-2 text-3"><Link to="/chords/new">Get started</Link></p>
      <img src="https://i.imgur.com/Cp1IT0m.jpeg"></img>
    </div>
  )
}

export default LandingPage