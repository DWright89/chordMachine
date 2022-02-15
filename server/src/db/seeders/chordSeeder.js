import { Chord } from "../../models/index.js"

class ChordSeeder {
  static async seed() {
  
    const chordData = [
      {
        userId: 1,
        name: "Two Five One",
        order: 1,
        degree: 2,
        extension: "none",
        inversion: "root",
        url: "twofiveone"
      },
      {
        userId: 1,
        name: "Two Five One",
        order: 2,
        degree: 5,
        extension: "none",
        inversion: "second",
        url: "twofiveone"
      },
      {
        userId: 1,
        name: "Two Five One",
        order: 3,
        degree: 5,
        extension: "none",
        inversion: "first",
        url: "twofiveone"
      },
      {
        userId: 1,
        name: "Two Five One",
        order: 4,
        degree: 1,
        extension: "none",
        inversion: "root",
        url: "twofiveone"
      }
    ]
    for (const chord of chordData) {
      const currentChord = await Chord.query().findOne(chord)
      if(!currentChord) {
        await Chord.query().insert(chord)
      }
    }
  }
}

export default ChordSeeder