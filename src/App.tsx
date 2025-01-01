import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CssBaseline, Container, Typography, Box, Alert } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import CryptoTable from './components/CryptoTable';
import CryptoDetail from './components/CryptoDetail';
import {theme} from './theme';
import './App.css';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Container>
        <Box bgcolor="#f5f5f5" py={2}> 
          <Container> 
            <Alert severity="info" variant="filled"> Note: This app uses the free version of the CoinGecko API, which has rate limits. 
              Frequent requests may result in errors.
            </Alert> 
          </Container> 
        </Box>
          <Typography variant="h3" align="center" gutterBottom>
            <span>Crypto Dashboard</span>
          </Typography>
          <Routes>
            <Route path="/" element={<CryptoTable />} />
            <Route path="/crypto/:id" element={<CryptoDetail />} />
          </Routes>
        </Container>
      </Router>
    </ThemeProvider>
  );
};

export default App;
