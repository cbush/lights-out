import React from 'react'

export default Component => (
  class extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        user: null,
      }
    }

    async componentDidMount() {
      // TODO: Log in anonymously and set the user to the state
    }

    render() {
      const {user} = this.state
      return (
        <Component
          {...this.props}
          user={user}
        />
      )
    }
  }
)
