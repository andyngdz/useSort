import React from 'react'
import {
  AppBar,
  Box,
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
        <Box pt={5}>
          <TableData />
        </Box>
      </ThemeProvider>
    </div>
  )
}

export default App
