import React from 'react'
import {
  AppBar,
  Container,
  ThemeProvider,
  Toolbar,
  Typography,
} from '@material-ui/core'
import TableData from 'components/table-data/TableData'
import Theme from 'theme'

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={Theme}>
        <AppBar position="static" variant="outlined">
          <Toolbar>
            <Typography variant="h6">useSort</Typography>
          </Toolbar>
        </AppBar>
        <Container>
          <TableData />
        </Container>
      </ThemeProvider>
    </div>
  )
}

export default App
