import { createTheme } from '@mui/material';
import { red } from '@mui/material/colors';

export const colorTheme = createTheme({
    palette: {
        primary: {
            main: '#133E87',
        },
        secondary: {
            main: '#608BC1',
        },
        error: {
            main: red.A400,
        }
    }
})