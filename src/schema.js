export const Game = {
  name: 'Game',
  primaryKey: 'gameId',
  properties: {
    gameId: 'string',
    board: 'Cell[]',
  },
}

export const Cell = {
  name: 'Cell',
  primaryKey: 'cellId',
  properties: {
    cellId: 'string',
    active: 'bool',
    whoIsHovering: 'string[]', // Array of player IDs who are currently hovering over the cell
    lastTouchedBy: 'string', // Player ID who last touched the cell
  },
}
