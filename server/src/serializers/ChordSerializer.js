import flavorLookup from "../services/ChordServices.js";

import { Chord } from "../models/index.js"


class ChordSerializer {

  static getDetails (chords) {
    let output = []
    const allowedAttributes = ["userId", "name", "degree", "extension", "inversion"]
    for (const chord of chords){
      let detailedChord = {}
        for(const attribute of allowedAttributes){
          detailedChord[attribute] = chord[attribute]
          detailedChord.flavor = flavorLookup(chord.degree)
      }
      output.push(detailedChord)
    }
    return output
  }

  static async handleUserChords(chordPayload, currentUserId){
    const existsAlready = await Chord.query().where("url", "=", chordPayload.url)
    if(existsAlready.length > 1){
      return false
    }
    
    let output = []
    const allowedAttributes = ["degree", "extension", "inversion"]
    for (const [key, value] of Object.entries(chordPayload.chords)){
      let preparedChord = {}
        for(const attribute of allowedAttributes){
          preparedChord[attribute] = value[attribute]
        }
        preparedChord.order = key
        preparedChord.name = chordPayload.name
        preparedChord.url = chordPayload.url.replace(/[^a-zA-Z0-9-_]/g, '');
        preparedChord.userId = currentUserId
        output.push(preparedChord)
    }
    return output
  }

  static prepareIndex(allChords){
    let output = []
    allChords.forEach((chord)=>{
      chord.url = encodeURI(chord.url)
      output.push(chord)
    })
    return output
  }
}

export default ChordSerializer