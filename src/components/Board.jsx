import React from 'react'
import Cell from './Cell'

export const BOARD_SIZE = 5

function indexToXY(index, width) {
  return [
    parseInt(index % width, 10),
    parseInt(index / width, 10),
  ]
}

function XYToIndex(x, y, width) {
  return y * width + x
}

export function clickBoard(board, index) {
  board[index].active ^= 1
  const [x, y] = indexToXY(index, BOARD_SIZE)
  if (y > 0) board[XYToIndex(x, y - 1, BOARD_SIZE)].active ^= 1
  if (x > 0) board[XYToIndex(x - 1, y, BOARD_SIZE)].active ^= 1
  if (y < BOARD_SIZE - 1) board[XYToIndex(x, y + 1, BOARD_SIZE)].active ^= 1
  if (x < BOARD_SIZE - 1) board[XYToIndex(x + 1, y, BOARD_SIZE)].active ^= 1
}

export default class Board extends React.Component {
  renderGrid = () => {
    const {cells, realm, user} = this.props
    if (!cells) {
      return []
    }

    return cells.map((cell, index) => {
      const {active} = cell
      return (
        <Cell
          key={index}
          active={active}
          onClick={() => {
            realm.write(() => {
              clickBoard(cells, index)
              cells[index].lastTouchedBy = user.identity
            })
            this.setState({cells})
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
