
    const chordData = [
      {
          name: "1",
          extensions: ["none", "add 7", "add 9"]
      },
      {
          name: "2",
          extensions: ["none", "add 7", "add 9"]
      },
      {
          name: "3",
          extensions: ["none", "add 7", "minor 9"]
      },
      {
          name: "4",
          extensions: ["none", "add 7", "add 9"]
      },
      {
          name: "5",
          extensions: ["none", "dominant 7", "add 9"]
      },
      {
          name: "6",
          extensions: ["none", "add 7", "add 9"]
      },
      {
          name: "7",
          extensions: ["none"]
      }
  ]

  const inversionData = [
      {
          name: "none",
          inversions: ["root", "first", "second"]
      },
      {
          name: "add 7",
          inversions: ["root", "first", "second", "third"]
      },
      {
          name: "dominant 7",
          inversions: ["root", "first", "second", "third"]
      },
      {
          name: "add 9",
          inversions: ["root", "first", "second", "third"]
      },
      {
          name: "minor 9",
          inversions: ["root", "first", "second", "third"]
      }
  ]
  
  export {chordData, inversionData} 