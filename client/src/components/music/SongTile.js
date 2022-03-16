import React from "react"

const SongTile = (props) =>{
const {artist, song, section, url} = props.song
//much like Chord Report, this component is iterated over with the API
//returns for the songs that contain the user's submitted chords
  return(
  <div>
    <p>{`The ${section} of ${song} by ${artist}`}</p>
    <ul>
      <li><a href={url}>Check it out on Hooktheory.</a></li>
    </ul>
  </div>
  )
}

export default SongTile