import React from "react"

const SongTile = (props) =>{
const {artist, song, section, url} = props.song

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