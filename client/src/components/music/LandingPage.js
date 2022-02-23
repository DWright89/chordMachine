import React from "react"
import {Link} from "react-router-dom"

const LandingPage = (props) =>{

  return(
    <div className="landing-parent">
      <div className="fade-in-text">

      <p>Welcome to Chordmachine</p>
      <p>An app for creating and learning about chord progressions</p>

      <p><Link to="/chords/new">Get started</Link></p>
      </div>
      <img src="https://i.imgur.com/TBVB0eB.jpg"></img>
    </div>
  )
}

export default LandingPage