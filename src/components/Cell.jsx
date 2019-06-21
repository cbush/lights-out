import React from 'react'
import '../style/Board.css'

export default function(props) {
  const {index, color, onClick} = props
  return (
    <div
      className="box"
      style={{background: color}}
      onClick={onClick}
    >
      {index}
    </div>
  )
}
