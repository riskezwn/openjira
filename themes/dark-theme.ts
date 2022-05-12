import { createTheme } from '@mui/material'
import { blue, red } from '@mui/material/colors'

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    error: {
      main: red.A400
    }
  },
  components: {
    MuiAppBar: {
      defaultProps: {},
      styleOverrides: {
        root: {
          backgroundColor: blue[700]
        }
      }
    }
  }
})
