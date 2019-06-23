import React from 'react'
import Cell from './Cell'
import '../style/Board.css'

export default class Board extends React.Component {
  constructor(props) {
    super(props)
    const board = []
    for (let i = 0; i < 5 * 5; ++i) {
      board.push({
        color: 'white',
      })
    }
    this.state = {
      board,
    }
  }

  changeColor = () => {
    const {color} = this.state
    const newColor = color === 'white' ? 'black' : 'white'
    this.setState({color: newColor})
  }

  renderGrid = () => {
    const {board} = this.state
    return board.map((cell, index) => {
      const {color} = cell
      return (
        <Cell
          index={index}
          color={color}
          onClick={() => {
            const newColor = color === 'white' ? 'black' : 'white'
            board[index].color = newColor
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
