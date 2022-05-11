import { createTheme } from '@mui/material'
import { blue, red } from '@mui/material/colors'

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#fff'
    },
    primary: {
      main: blue.A400
    },
    secondary: {
      main: '#19857b'
    },
    error: {
      main: red.A400
    }
  },
  components: {

  }
})
