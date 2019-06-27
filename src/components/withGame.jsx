import random from 'random'
import React from 'react'
import Realm from 'realm'

import {SERVER_URL, REALM_URL} from '../constants'
import {Game, Cell, Player} from '../schema'
import {BOARD_SIZE, clickBoard} from './Board'
import {addToSet, removeFromSet} from '../setOperations'

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
      const creds = Realm.Sync.Credentials.anonymous()
      // const creds = Realm.Sync.Credentials.usernamePassword('admin', 'admin666')
      Realm.Sync.User.login(SERVER_URL, creds)
        .then(this.onLogin)
    }

    componentWillUnmount() {
      const {cells, realm, user} = this.state
      if (realm === undefined || cells === undefined || user === undefined) {
        return
      }
      console.log('unmount...')
      realm.write(() => {
        cells.map(cell => removeFromSet(cell.whoIsHovering, user.identity))
      })
    }

    onLogin = async (user) => {
      console.log('user', user.identity)
      const config = {
        schema: [Game, Cell, Player],
        sync: {
          url: `${REALM_URL}/lightsout`,
          user,
          fullSynchronization: true,
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

      const players = this.getAndWatchPlayers(realm, gameId, user)

      // Add player to the game
      realm.write(() => {
        if (game.players.find(player => player.id === user.identity) !== undefined) {
          return
        }

        game.players.push({
          id: user.identity,
          gameId,
          lastSeen: new Date(),
          hoverIndex: null,
        })
      })

      const player = realm.objects('Player').filtered(`gameId == "${gameId}" && id == "${user.identity}"`)[0]

      const cells = realm.objects('Cell').filtered(`gameId == "${gameId}"`)

      cells.addListener((collection, changes) => {
        this.setState({cells})
      })

      this.setState({user, realm, game, cells, players, player})
    }

    getAndWatchPlayers = (realm, gameId, user) => {
      const players = realm.objects('Player').filtered(
        'gameId == $0 && id != $1 && lastSeen > $2',
        gameId,
        user.identity,
        new Date(new Date().getTime() - (10 * 1000)), // lastSeen > 10 seconds ago
      )
      players.addListener(() => {
        this.setState({players})
      })
      return players
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
