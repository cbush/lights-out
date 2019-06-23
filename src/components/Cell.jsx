import React from 'react'
import '../style/Board.css'
import {Button} from 'react95'

export default function(props) {
  const {index, color, onClick} = props
  return (
    <Button
      active={color !== 'white'}
      onClick={onClick}
    />
  )
}
