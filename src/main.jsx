import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import CssBaseline from '@mui/material/CssBaseline';

import App from './App.jsx'
import { createTheme, ThemeProvider } from '@mui/material';
import theme from './assets/theme.js';



createRoot(document.getElementById('root')).render(
   <ThemeProvider theme={theme}>
  <StrictMode>
        <CssBaseline />

    <App />
  </StrictMode>
  </ThemeProvider>,
)
