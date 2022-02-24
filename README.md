# Chordmachine
#### Made by: [Denny Wright](https://github.com/DWright89)

Chordmachine is an app that allows a user to make, see, and hear chords.
Written as a songwrtiging tool, the app is connected to the [HookTheory API](https://www.hooktheory.com/api/trends/docs) to provide music theory analysis on a user's chords

Audio is achieved through [MIDI Sounds React](https://github.com/surikov/midi-sounds-react)

Notation rendering is achieved thorugh [VexFlow](https://www.vexflow.com/)

Random name generation is achieved thorgh the [Random Word API](http://random-word-api.herokuapp.com/home)

In the app, users are able to:
- Create chords on any degree of the C Major scale
- Add a 7 or 9 to chords, where appropriate, a dominant 7 or minor 9
- Invert their chord in any configuration they wish
- Hear any or all chords
- Via HookTheory API, users can receive feedback on a selection of their chords to detemine what their next chord could be
- View their chords as traditional notation, as jazz lead sheet in their input, and as alphabetic letters to appeal to musicians at any skill level
- See what songs in the HookTheory database contain the exact chords that a user has saved.

Future features:
- Allow users to create chords outside of a tonal center
- Allow users to operate in any musical key


Running this app on your machine is extremely simple:
```
yarn install
createdb chord-machine-engage_development
cd server
yarn run migrate:latest
yarn run db:seed
cd ..
yarn run dev 
```