import React from 'react'
import Cell from './Cell'

const BOARD_SIZE = 5

function indexToXY(index, width) {
  return [
    parseInt(index % width, 10),
    parseInt(index / width, 10),
  ]
}

function XYToIndex(x, y, width) {
  return y * width + x
}

export default class Board extends React.Component {
  constructor(props) {
    super(props)
    const board = []
    for (let i = 0; i < BOARD_SIZE * BOARD_SIZE; ++i) {
      board.push({
        active: false,
      })
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
