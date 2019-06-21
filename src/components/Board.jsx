import React from 'react'
import '../style/Board.css'

class Cell extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      color: 'white',
    }
  }

  changeColor = () => {
    const {color} = this.state
    const newColor = color === 'white' ? 'black' : 'white'
    this.setState({color: newColor})
  };

  render() {
    const {index} = this.props
    return (
      <div
        className="box"
        style={{background: this.state.color}}
        onClick={this.changeColor}
      >
        {index}
      </div>
    )
  }
}

function createGrid() {
  const children = []
  for (let i = 0; i < 5 * 5; ++i) {
    children.push(
      <Cell index={i} />,
    )
  }
  return children
}

export default class Board extends React.Component {
  render() {
    return (
      <div className="Board">
        {createGrid()}
      </div>
    )
  }
}
