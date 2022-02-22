import React, { useState, useEffect } from "react"
import {Link} from "react-router-dom"

const IndexPage = (props) =>{

  const [progressions, setProgressions] = useState([])

  const getAllProgressions = async () =>{
    try{
      const response = await fetch("/api/v1/chords")
      const body = await response.json()
      return setProgressions(body)

    }catch(error){
      console.error("There was a problem on the index page: ", error)
    }
  }

  let list = ''


  if(progressions.length > 1){
    list = progressions.map((progression)=>{
      return(
        <Link to={`/chords/${progression.url}`}><li>{progression.name}</li></Link>
      )
    })
  }

  useEffect(()=>{
    getAllProgressions()
  }, [])

  return(
    <div>
      <div className="centered title">
        <h2>Click through and learn about the great chords others have created!</h2>
      </div>
      <div className="grid-x grid-margin-x">
        <div className="cell small-2"/>
        <div className="cell small-4 progressionList">
          <ul>
            {list}
          </ul>
        </div>
        <div className="cell small-6" />
      </div>

    </div>
  )
}

export default IndexPage