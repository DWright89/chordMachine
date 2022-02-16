import express from "express"

import dictionary from "../../../services/dictionary.js"

const wordsRouter = new express.Router()

wordsRouter.get("/", (req, res)=>{
  const max = dictionary.length
  let words = []
words.push(dictionary[Math.floor(Math.random() * max)])
words.push(dictionary[Math.floor(Math.random() * max)])

return res.status(200).json(words)
})

export default wordsRouter