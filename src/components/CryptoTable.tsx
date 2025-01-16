import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Container,
  Typography,
  Button,
  Pagination,
  Box,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  SelectChangeEvent
} from '@mui/material';
import { Link } from 'react-router-dom';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { useEffect, useState } from 'react';
import { fetchCryptos } from '../services/CryptoService';
import { Crypto, PinnedItemType } from '../types/Crypto';
import Search from './Search';
import { MdPushPin } from "react-icons/md";
import { CheckIfCoinExits } from '../lib/Helpers';
import PinnedList from './PinnedList';


const CryptoTable: React.FC = () => {
  const [cryptos, setCryptos] = useState<Crypto[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [order, setOrder] = useState<string >('market_cap_desc');
  const [pinnedList, setPinnedList] = useState<PinnedItemType[]>([]);

  useEffect(() => {
    const getCryptos = async () => {
      setLoading(true); 
      setError(null);
      try {
        const data = await fetchCryptos(page, order);
        setCryptos(data);
      } catch (error: any) {
        if (error.response && (error.response.status === 429 || error.response.status === 500)) { 
          setError(`Error: ${error.response.status} - ${`${error.response.data.status.error_message} Refresh in a minute and everything should be alright.`}`); 
        } else { 
          setError('An unexpected error occurred.'); 
        }
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    getCryptos();
  }, [page, order]);

  const handleChangePage = (_: React.ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeOrder = (event: SelectChangeEvent<string>) => {
    setOrder(event.target.value as string);
  };

  const handlePinClick = (id : string, name : string, image : string) => {
    setPinnedList((prevPinnedList) => {
      if (CheckIfCoinExits(id, prevPinnedList)) {
      return prevPinnedList.filter((item) => item.id !== id);
      } else {
      return [...prevPinnedList, { id, name, image }];
      }
    });
  }

  const handleRemovePin = (id : string) => {
    setPinnedList((prevPinnedList) => {
      return prevPinnedList.filter((item) => item.id !== id);
    })
  }

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography variant="h6" color="error"> {error} </Typography>
    );
  }

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        Pinned List
      </Typography>
      <PinnedList pinnedList={pinnedList} handleRemovePin={handleRemovePin}/>
      <Typography variant="h4" align="center" gutterBottom>
        Cryptocurrency Prices
      </Typography>
      <Box display="flex" justifyContent="space-between" width="100%" mb={2}>
        <Search />
        <Box flex={1} ml={1}>
          <FormControl variant="outlined" fullWidth margin="normal">
            <InputLabel>Order By</InputLabel>
            <Select
              value={order}
              onChange={handleChangeOrder}
              label="Order By"
            >
              <MenuItem value="market_cap_asc">Market Cap Ascending</MenuItem>
              <MenuItem value="market_cap_desc">Market Cap Descending</MenuItem>
              <MenuItem value="volume_asc">Volume Ascending</MenuItem>
              <MenuItem value="volume_desc">Volume Descending</MenuItem>
              <MenuItem value="id_asc">ID Ascending</MenuItem>
              <MenuItem value="id_desc">ID Descending</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>
      <TableContainer
        component={Paper}
        sx={{
          maxWidth: '95%',
          overflowX: 'auto',
          margin: '0 auto',
          background: '#fff',
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Table>
          <TableHead sx={{ backgroundColor: '#1976d2' }}>
            <TableRow>
              {['Rank', 'Pinned', 'Name', 'Symbol', 'Price', 'Market Cap', 'ATH', '24h Change', 'Total Volume', 'Details'].map(
                (header) => (
                  <TableCell key={header} sx={{ color: '#fff', fontWeight: 'bold' }}>
                    {header}
                  </TableCell>
                )
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {cryptos.map((crypto) => (
              <TableRow key={crypto.id}>
                <TableCell>{crypto.market_cap_rank}</TableCell>
                <TableCell><Typography onClick={() => handlePinClick(crypto.id, crypto.name, crypto.image)}><MdPushPin color={CheckIfCoinExits(crypto.id, pinnedList) ? '#ffd480' :'#00004d'} /></Typography></TableCell>
                <TableCell>
                  <Box display="flex" alignItems="center">
                    <img
                      style={{ height: '30px', width: '30px', marginRight: '10px' }}
                      src={crypto.image}
                      alt="coin"
                    />
                    {crypto.name}
                  </Box>
                </TableCell>
                <TableCell>{crypto.symbol.toUpperCase()}</TableCell>
                <TableCell>${crypto.current_price.toLocaleString()}</TableCell>
                <TableCell>${crypto.market_cap.toLocaleString()}</TableCell>
                <TableCell>${crypto.ath.toLocaleString()}</TableCell>
                <TableCell>
                  <Box display="flex" alignItems="center" gap={0.5}>
                    {crypto.price_change_percentage_24h > 0 ? (
                      <ArrowDropUpIcon fontSize="large" color="success" />
                    ) : (
                      <ArrowDropDownIcon fontSize="large" color="error" />
                    )}
                    <Typography variant="body1">
                      {crypto.price_change_percentage_24h}%
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>${crypto.total_volume.toLocaleString()}</TableCell>
                <TableCell>
                  <Button component={Link} to={`/crypto/${crypto.id}`} variant="contained" color="primary">
                    Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box display="flex" justifyContent="center" mt={2} mb={2}>
        <Pagination count={1640} page={page} onChange={handleChangePage} color="primary" />
      </Box>
    </Container>
  );
};

export default CryptoTable;
