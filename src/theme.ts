import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    background: {
      default: '#f5f5f5', // Light grey background
    },
    primary: {
      main: '#1976d2', // Blue
    },
    secondary: {
      main: '#f50057', // Pink
    },
    text: {
      primary: '#333', // Dark text
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
});
