export const Game = {
  name: 'Game',
  primaryKey: 'gameId',
  properties: {
    gameId: 'string',
    cells: 'Cell[]',
  },
}

export const Cell = {
  name: 'Cell',
  properties: {
    gameId: 'string',
    active: 'int',
    whoIsHovering: 'string[]', // Array of player IDs who are currently hovering over the cell
    lastTouchedBy: 'string?', // Player ID who last touched the cell
  },
}
