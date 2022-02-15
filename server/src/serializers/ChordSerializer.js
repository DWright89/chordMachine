import flavorLookup from "../services/ChordServices.js";

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
}

export default ChordSerializer