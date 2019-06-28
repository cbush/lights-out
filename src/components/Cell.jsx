import React from 'react'
import {Button} from 'react95'
import idToEmoji from '../idToEmoji'

export default class Cell extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hover: false,
    }
  }

  render() {
    const {active, onClick, onMouseEnter, onMouseLeave, hoverers} = this.props
    const {hover} = this.state
    return (
      <Button
        style={{
          backgroundColor: hover ? '#eee' : '#ccc',
        }}
        active={!!active}
        onClick={onClick}
        onMouseEnter={() => {
          this.setState({hover: true})
          if (onMouseEnter) {
            onMouseEnter()
          }
        }}
        onMouseLeave={() => {
          this.setState({hover: false})
          if (onMouseLeave) {
            onMouseLeave()
          }
        }}
      >
        {hoverers.map(hoverer => idToEmoji(hoverer.id)).join(' ')}
      </Button>
    )
  }
}
