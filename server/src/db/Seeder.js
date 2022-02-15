/* eslint-disable no-console */
import { connection } from "../boot.js"
import ChordSeeder from "./seeders/chordSeeder.js"

class Seeder {
  static async seed() {
    console.log("seeding chords")
    await ChordSeeder.seed()
  

    console.log("Done!")
    await connection.destroy()
  }
}

export default Seeder