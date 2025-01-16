import { createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: 'hsl(220, 98%, 61%)',
        },
        secondary: {
            main: 'hsl(192, 100%, 67%)',
        },
        background: {
            default: 'hsl(235, 21%, 11%)',
            paper: 'hsl(235, 24%, 19%)',
        },
        text: {

            primary: 'hsl(234, 39%, 85%)',
            secondary: 'hsl(234, 11%, 52%)',
        },
        action: {
            hover: 'hsl(236, 33%, 92%)',
        },
    },
    typography: {
        fontFamily: 'Josefin Sans, sans-serif',
        fontSize: 18,
        fontWeightRegular: 400, // Peso negrita
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    background: 'linear-gradient(hsl(192, 100%, 67%) to hsl(280, 87%, 65%))',
                    '&:hover': {
                        background: 'linear-gradient(hsl(192, 100%, 67%) to hsl(280, 87%, 65%))',
                    },
                },
            },
        },
    },
});

export default darkTheme;
