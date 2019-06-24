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
    const {active, onClick} = this.props
    const {hover} = this.state
    return (
      <Button
        style={{
          backgroundColor: hover ? '#fdd' : '#ccc',
        }}
        active={active}
        onClick={onClick}
        onMouseEnter={() => this.setState({hover: true})}
        onMouseLeave={() => this.setState({hover: false})}
      />
    )
  }
}
