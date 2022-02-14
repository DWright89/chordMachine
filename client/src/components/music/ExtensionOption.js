import React from "react"

const ExtensionOption = (props) =>{
  const { extension } = props
  return(
    <option
    name="extension"
    value={extension}>
      {extension}
    </option>
  )

}

export default ExtensionOption