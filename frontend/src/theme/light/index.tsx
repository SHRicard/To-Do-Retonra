import { createTheme } from '@mui/material/styles';

const lightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: 'hsl(220, 98%, 61%)',
        },
        secondary: {
            main: 'hsl(192, 100%, 67%)',
        },
        background: {
            default: 'hsl(0, 0%, 98%)',
            paper: 'hsl(236, 33%, 92%)',
        },
        text: {
            primary: 'hsl(236, 9%, 61%)',
            secondary: 'hsl(233, 11%, 84%)',
        },
        action: {
            hover: 'hsl(236, 33%, 92%)',
        },
    },
    typography: {
        fontFamily: 'Josefin Sans, sans-serif',
        fontSize: 18,
        fontWeightRegular: 400,
        fontWeightBold: 700,
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

export default lightTheme;
