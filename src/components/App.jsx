import React from 'react'
import {createGlobalStyle, ThemeProvider} from 'styled-components'
import {
  Button, reset, themes, Toolbar, Window, WindowHeader,
} from 'react95'
import Board from './Board'

const ResetStyles = createGlobalStyle`
  ${reset}
`

export default () => (
  <div className="App">
    <ResetStyles />
    <ThemeProvider theme={themes.default}>
      <Window
        style={{
          width: '100vw',
          height: '100vh',
          display: 'flex',
          flexFlow: 'column',
        }}
      >
        <WindowHeader
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <span>LIGHTSOU.EXE</span>
          <Button style={{marginRight: '-6px', marginTop: '1px'}} size="sm" square>
            <span style={{fontWeight: 'bold', transform: 'translateY(-1px)'}}>x</span>
          </Button>
        </WindowHeader>
        <Toolbar>
          <Button variant="menu" size="sm">
              File
          </Button>
          <Button variant="menu" size="sm">
              Edit
          </Button>
          <Button variant="menu" size="sm" disabled>
              Save
          </Button>
        </Toolbar>
        <Board />
      </Window>
    </ThemeProvider>
  </div>
)
