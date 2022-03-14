const intervals = {
    minorSecond: 1,
    majorSecond: 2,
    minorThird: 3,
    majorThird: 4,
    perfectFourth: 5,
    flatFifth: 6,
    perfectFifth: 7,
    minorSixth: 8,
    majorSixth: 9,
    minorSeventh: 10,
    majorSeventh: 11,
    octave: 12,
    minorNinth: 13,
    majorNinth: 14
}




const major = {
    "none": {
        root: [intervals.majorThird, intervals.perfectFifth],
        first: [intervals.minorThird, intervals.minorSixth],
        second: [intervals.perfectFourth, intervals.majorSixth]
    },
    "add 7": {
        root: [intervals.majorThird, intervals.perfectFifth, intervals.majorSeventh],
        first: [intervals.minorThird, intervals.perfectFifth, intervals.minorSixth],
        second: [intervals.majorThird, intervals.perfectFourth, intervals.majorSixth],
        third: [intervals.minorSecond, intervals.perfectFourth, intervals.minorSixth]
    },
    "dominant 7": {
        root: [intervals.majorThird, intervals.perfectFifth, intervals.minorSeventh],
        first: [intervals.minorThird, intervals.flatFifth, intervals.minorSixth],
        second: [intervals.minorThird, intervals.perfectFourth, intervals.majorSixth],
        third: [intervals.majorSecond, intervals.flatFifth, intervals.majorSixth]
    },
    "add 9" :{
        root: [intervals.majorThird, intervals.perfectFifth, intervals.majorNinth],
        first: [intervals.minorThird, intervals.minorSixth, intervals.minorSeventh],
        second: [intervals.perfectFourth, intervals.perfectFifth, intervals.majorSixth],
        third: [intervals.majorSecond, intervals.perfectFourth, intervals.minorSeventh]
    },
    "inversionRoot" :{
        "none": [intervals.majorThird, intervals.perfectFifth],
        "add 7": [intervals.majorThird, intervals.perfectFifth, intervals.majorSeventh],
        "add 9": [intervals.majorThird, intervals.perfectFifth, intervals.majorNinth]
    }
}

const minor = {
    "none": {
        root: [intervals.minorThird, intervals.perfectFifth],
        first: [intervals.majorThird, intervals.majorSixth],
        second: [intervals.perfectFourth, intervals.minorSixth]
    },
    "add 7": {
        root: [intervals.minorThird, intervals.perfectFifth, intervals.minorSeventh],
        first: [intervals.majorThird, intervals.perfectFifth, intervals.majorSixth],
        second: [intervals.minorThird, intervals.perfectFourth, intervals.minorSixth],
        third: [intervals.majorSecond, intervals.perfectFourth, intervals.majorSixth]
    },
    "add 9": {
        root:[intervals.minorThird, intervals.perfectFifth, intervals.majorNinth],
        first:[intervals.majorThird, intervals.majorSixth, intervals.majorSeventh],
        second:[intervals.perfectFourth, intervals.perfectFifth, intervals.minorSixth],
        third:[intervals.minorSecond, intervals.perfectFourth, intervals.minorSeventh]
    },
    "minor 9": {
        root:[intervals.minorThird, intervals.perfectFifth, intervals.minorNinth],
        first:[intervals.majorThird, intervals.majorSixth, intervals.minorSeventh],
        second:[intervals.perfectFourth, intervals.flatFifth, intervals.minorSixth],
        third:[intervals.majorSecond, intervals.flatFifth, intervals.majorSeventh]
    },
    "inversionRoot" : {
        "none": [intervals.minorThird, intervals.perfectFifth],
        "add 7": [intervals.minorThird, intervals.perfectFifth, intervals.minorSeventh],
        "add 9": [intervals.minorThird, intervals.perfectFourth, intervals.majorNinth],
        "minor 9":[intervals.minorThird, intervals.perfectFifth, intervals.minorNinth]
    }
}

const dim = {
    "none": {
        root: [intervals.minorThird, intervals.flatFifth],
        first:[intervals.minorThird, intervals.majorSixth],
        second:[intervals.flatFifth, intervals.majorSixth]
    },
    "inversionRoot" : {
        "none": [intervals.minorThird, intervals.flatFifth]
    }
}

const rootLookup = (chordDegree) =>{
    const rootNotes = [60, 62, 64, 65, 67, 69, 71]
    return (rootNotes[(chordDegree-1)])
}

const flavorLookup = (chordDegree) =>{
    if(chordDegree == 1 || chordDegree ==4 || chordDegree==5){
        return 'major'
    } else if(chordDegree == 2|| chordDegree==3 || chordDegree==6){
        return 'minor'
    } else{
        return 'dim'
    }
}

const chordBuilderTwo = (lowest, flavor, extension, inversion) =>{

    let inversions 
    let rootNote = parseInt(lowest)
    if(flavor === "major"){
        inversions = major[extension]
    } else if(flavor === "minor"){
        inversions = minor[extension]
    } else{
        inversions = dim[extension]
    }

    const rootLookup = inversions.root
    const finalInversion = inversions[inversion]
    
    if(inversion === 'first'){
        rootNote = rootNote + rootLookup[0]
    } if (inversion === 'second'){
        rootNote = rootNote + rootLookup[1]
    } if (inversion === 'third'){
        rootNote = rootNote + rootLookup[2]
    }
  
    const noteArray = chordBuilder(rootNote, finalInversion)
    return noteArray
}

const chordBuilder = (lowest, inversionArray) =>{
    
    let output = [lowest-12, lowest]
  
    for (const interval of inversionArray){ 
        let newNote = lowest + interval
        if(newNote > 84){
            newNote = newNote - 12
        }
        output.push(newNote)
    }
    return output
}

 export {intervals, major, minor, dim, rootLookup, flavorLookup, chordBuilder, chordBuilderTwo}