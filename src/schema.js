export const Game = {
  name: 'Game',
  primaryKey: 'gameId',
  properties: {
    gameId: 'string',
    cells: 'Cell[]',
    players: 'Player[]',
  },
}

export const Cell = {
  name: 'Cell',
  properties: {
    gameId: 'string',
    active: 'int',
    lastTouchedBy: 'Player?',
  },
}

export const Player = {
  name: 'Player',
  properties: {
    id: 'string',
    gameId: 'string',
    lastSeen: 'date',
    hoverIndex: 'int?',
  },
}
