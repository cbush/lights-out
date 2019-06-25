import random from 'random'
import React from 'react'
import Realm from 'realm'

import {SERVER_URL, REALM_URL} from '../constants'
import {Game, Cell} from '../schema'
import {BOARD_SIZE, clickBoard} from './Board'

function generateCells(cellPrototype) {
  const cells = []

  for (let i = 0; i < BOARD_SIZE * BOARD_SIZE; ++i) {
    cells.push({
      ...cellPrototype,
      active: 0,
    })
  }

  for (let i = 0; i < 10; ++i) {
    const ind = random.int(0, 24)
    clickBoard(cells, ind)
  }

  return cells
}
export default Component => (
  class extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        user: null,
        realm: null,
        game: null,
        cells: null,
      }
    }

    componentDidMount() {
      const creds = Realm.Sync.Credentials.usernamePassword('admin', 'admin666')
      Realm.Sync.User.login(SERVER_URL, creds)
        .then(this.onLogin)
    }

    onLogin = async (user) => {
      const config = {
        schema: [Game, Cell],
        sync: {
          url: `${REALM_URL}/lightsout`,
          user,
          partial: false,
        },
      }

      const realm = await Realm.open(config)
      const gameId = 'test'
      let game = realm.objectForPrimaryKey('Game', gameId)
      if (game === undefined) {
        realm.write(() => {
          game = realm.create('Game', {
            gameId,
            cells: generateCells({
              gameId,
            }),
          })
        })
      }
      const cells = realm.objects('Cell').filtered(`gameId == '${gameId}'`)
      cells.addListener((collection, changes) => {
        this.setState({cells})
      })
      this.setState({user, realm, game, cells})
    }

    render() {
      return (
        <Component
          {...this.props}
          {...this.state}
        />
      )
    }
  }
)
