import { createTheme } from '@mui/material'
import { red } from '@mui/material/colors'

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    error: {
      main: red.A400
    }
  },
  components: {

  }
})
