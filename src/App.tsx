import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CssBaseline, Container, Typography } from '@mui/material';
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
