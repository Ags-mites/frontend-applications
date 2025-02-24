import { createTheme } from '@mui/material';
import { red } from '@mui/material/colors';
import { light } from '@mui/material/styles/createPalette';

export const colorTheme = createTheme({
    palette: {
        primary: {
            main: '#011C26',
        },
        secondary: {
            main: '#225C73',
        },
        error: {
            main: red.A400,
        },
        light: {
            main: '#fff',
        }
    }
})