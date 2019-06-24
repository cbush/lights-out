import React from 'react'
import Cell from './Cell'

import {dot} from 'mathjs'

const math = require('..')
const random = require('random')


const BOARD_SIZE = 5
const N1 = [ 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0 ]
const N2 = [ 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1 ]
//const zero = zeros(5)

function indexToXY(index, width) {
  return [
    parseInt(index % width, 10),
    parseInt(index / width, 10),
  ]
}

function XYToIndex(x, y, width) {
  return y * width + x
}

function checkBoard() {
  const board_array = []

  for (let i = 0; i < BOARD_SIZE * BOARD_SIZE; ++i) {
    board_array.push(random.int(0, 1))
  } 
  //const board_matrix = reshape(board_array, [BOARD_SIZE*BOARD_SIZE, 1])

  const d1 = dot(board_array, N1)
  const d2 = dot(board_array, N2) 
  console.log(d1)
  console.log(d2)

  
  if (d1 == 8 && d2== 6) {
    return board_array
  } else {
    checkBoard()
  }

  return board_array
}

export default class Board extends React.Component {
  constructor(props) {
    super(props)
    const board = [] 
    const board_arr = checkBoard()

    for (let i = 0; i < BOARD_SIZE * BOARD_SIZE; ++i) { 
      if (board_arr[i] == 1){
        board.push({
          active: true, 
        })
      } else {
        board.push({
          active: false,
        })
      }
    }
    this.state = {
      board,
    }
  }

  renderGrid = () => {
    const {board} = this.state
    return board.map((cell, index) => {
      const {active} = cell
      return (
        <Cell
          index={index}
          active={active}
          onClick={() => {
            board[index].active ^= 1
            const [x, y] = indexToXY(index, BOARD_SIZE)
            if (y > 0) board[XYToIndex(x, y - 1, BOARD_SIZE)].active ^= 1
            if (x > 0) board[XYToIndex(x - 1, y, BOARD_SIZE)].active ^= 1
            if (y < BOARD_SIZE - 1) board[XYToIndex(x, y + 1, BOARD_SIZE)].active ^= 1
            if (x < BOARD_SIZE - 1) board[XYToIndex(x + 1, y, BOARD_SIZE)].active ^= 1
            this.setState({board})
          }}
        />
      )
    })
  }

  render() {
    return (
      <div
        style={{
          flex: 1,
        }}
      >
        <div className="Board">
          {this.renderGrid()}
        </div>
      </div>
    )
  }
}
