import React from "react"

const InversionOption = (props) =>{
  const { inversion } = props
  return(
    <option
    name="inversion"
    value={inversion}>
      {inversion}
    </option>
  )
}

export default InversionOption