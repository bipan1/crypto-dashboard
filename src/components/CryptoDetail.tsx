import { useEffect, useState } from 'react';
import { fetchCryptoById } from '../services/CryptoService';
import { CircularProgress, Container, Typography, Box, Paper } from '@mui/material';
import { useParams } from 'react-router-dom';
import { CryptoDetailType } from '../types/Crypto';

const CryptoDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [crypto, setCrypto] = useState<CryptoDetailType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getCrypto = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchCryptoById(id!);
        setCrypto(data);
      } catch (error: any) {
        console.error(error);
        if (error.response && (error.response.status === 429 || error.response.status === 500)) {
          setError(`Error: ${error.response.status} - ${error.response.data.status.error_message}`);
        } else {
          setError('An unexpected error occurred.');
        }
      } finally {
        setLoading(false);
      }
    };
    getCrypto();
  }, [id]);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return (
      <Typography variant="h6" color="error"> {error} </Typography>
    );
  }

  if (!crypto) {
    return <Typography variant="h6">Cryptocurrency not found</Typography>;
  }

  return (
    <Container>
      <Box display="flex" flexDirection="column" alignItems="center" mt={4}>
        <Typography variant="h4" gutterBottom>
          {crypto.name} Details
        </Typography>
        <Paper elevation={3} style={{ padding: '20px', width: '100%', maxWidth: '800px' }}>
          <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} alignItems="center">
            <Box display="flex" justifyContent="center" alignItems="center" mr={{ md: 3 }} mb={{ xs: 3, md: 0 }}>
              <img
                src={crypto.image}
                alt={crypto.name}
                style={{ height: '100px', width: '100px', borderRadius: '10px' }}
              />
            </Box>
            <Box display="flex" flexDirection="column" alignItems={{ xs: 'center', md: 'flex-start' }} textAlign={{ xs: 'center', md: 'left' }}>
              <Typography variant="h5" component="div" color="primary" fontWeight="bold" gutterBottom>
                ${crypto.current_price}
              </Typography>
              <Typography variant="body1" color={crypto.price_change_percentage_24h > 0 ? "success.main" : "error.main"} gutterBottom>
                {crypto.price_change_percentage_24h > 0 ? '+' : ''}{crypto.price_change_percentage_24h}%
              </Typography>
              <Typography variant="body1" gutterBottom>
                Volume: ${crypto.total_volume.toLocaleString()}
              </Typography>
            </Box>
          </Box>
        </Paper>
        <Paper elevation={3} style={{ padding: '20px', marginTop: '20px', width: '100%', maxWidth: '800px' }}>
          <Typography variant="h5" gutterBottom>Additional Information</Typography>
          <Box display="flex" flexWrap="wrap" justifyContent="space-between">
            <Box width={{ xs: '100%', sm: '48%' }} mb={2}>
              <Typography variant="body1"><strong>Market Cap:</strong> ${crypto.market_cap.toLocaleString()}</Typography>
            </Box>
            <Box width={{ xs: '100%', sm: '48%' }} mb={2}>
              <Typography variant="body1"><strong>Rank:</strong> {crypto.market_cap_rank}</Typography>
            </Box>
            <Box width={{ xs: '100%', sm: '48%' }} mb={2}>
              <Typography variant="body1"><strong>All-Time High:</strong> ${crypto.ath.toLocaleString()}</Typography>
            </Box>
            <Box width={{ xs: '100%', sm: '48%' }} mb={2}>
              <Typography variant="body1"><strong>24h High:</strong> ${crypto.high_24h.toLocaleString()}</Typography>
            </Box>
            <Box width={{ xs: '100%', sm: '48%' }} mb={2}>
              <Typography variant="body1"><strong>24h Low:</strong> ${crypto.low_24h.toLocaleString()}</Typography>
            </Box>
            <Box width={{ xs: '100%', sm: '48%' }} mb={2}>
              <Typography variant="body1"><strong>Circulating Supply:</strong> ${crypto.circulating_supply.toLocaleString()}</Typography>
            </Box>
            <Box width={{ xs: '100%', sm: '48%' }} mb={2}>
              <Typography variant="body1"><strong>Total Supply:</strong> ${crypto.total_supply.toLocaleString()}</Typography>
            </Box>
            <Box width={{ xs: '100%', sm: '48%' }} mb={2}>
              <Typography variant="body1"><strong>ATH Change Percentage:</strong> ${crypto.ath_change_percentage.toLocaleString()}</Typography>
            </Box>
            <Box width={{ xs: '100%', sm: '48%' }} mb={2}>
              <Typography variant="body1"><strong>ATH Date:</strong> {new Date(crypto.ath_date).toLocaleDateString()}</Typography>
            </Box>
            <Box width={{ xs: '100%', sm: '48%' }} mb={2}>
              <Typography variant="body1"><strong>ATL:</strong> ${crypto.atl.toLocaleString()}</Typography>
            </Box>
            <Box width={{ xs: '100%', sm: '48%' }} mb={2}>
              <Typography variant="body1"><strong>ATL Change Percentage:</strong> ${crypto.atl_change_percentage.toLocaleString()}</Typography>
            </Box>
            <Box width={{ xs: '100%', sm: '48%' }} mb={2}>
              <Typography variant="body1"><strong>ATL Date:</strong> {new Date(crypto.atl_date).toLocaleDateString()}</Typography>
            </Box>
            <Box width={{ xs: '100%', sm: '48%' }} mb={2}>
              <Typography variant="body1"><strong>Last Updated:</strong> {new Date(crypto.last_updated).toLocaleDateString()}</Typography>
            </Box>
            <Box width={{ xs: '100%', sm: '48%' }} mb={2}>
              <Typography variant="body1"><strong>Fully Diluted Valuation:</strong> ${crypto.fully_diluted_valuation.toLocaleString()}</Typography>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default CryptoDetail;
