import React from 'react'
import {Button} from 'react95'

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
    let backgroundColor = '#'
    backgroundColor += hover ? 'e' : 'c'
    backgroundColor += hoverers.length > 0 ? 'ce' : 'cc'
    return (
      <Button
        style={{
          backgroundColor,
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
        &nbsp;
      </Button>
    )
  }
}
