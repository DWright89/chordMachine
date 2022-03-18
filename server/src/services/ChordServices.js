const flavorLookup = (chordDegree) =>{
  if(chordDegree == 1 || chordDegree ==4 || chordDegree==5){
    return 'major'
  } else if(chordDegree == 2|| chordDegree==3 || chordDegree==6){
    return 'minor'
  } else{
    return 'dim'
  }
}

export default flavorLookup