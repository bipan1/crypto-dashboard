import { Box, CircularProgress, TextField, Typography, List, ListItem, Popper, ClickAwayListener, Paper, Avatar, ListItemAvatar, ListItemText } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CryptoSearchCoin } from "../types/Crypto";
import { searchCryptoByName } from "../services/CryptoService";

const Search: React.FC = () => {
  const [searchResults, setSearchResults] = useState<CryptoSearchCoin[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getSearchResult = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await searchCryptoByName(searchQuery);
        setSearchResults(data);
      } catch (error: any) {
        if (error.response && (error.response.status === 429 || error.response.status === 500)) { 
          setError(`Error: ${error.response.status} - ${error.response.data.status.error_message} Refresh in a minute and everything should be alright.`); 
        } else { 
          setError('An unexpected error occurred.'); 
        }
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (searchQuery) {
      getSearchResult();
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setAnchorEl(event.currentTarget);
  };

  const handleClickAway = () => {
    setAnchorEl(null);
  };

  const handleCoinClick = (id: string) => {
    navigate(`/crypto/${id}`);
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl) && searchResults.length > 0;
  const popperWidth = anchorEl ? anchorEl.clientWidth : undefined;

  return (
    <Box flex={1} mr={1} position="relative">
      <TextField
        label="Search by name"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <Popper open={open} anchorEl={anchorEl} placement="bottom-start" style={{ zIndex: 1300, width: popperWidth }}>
        <ClickAwayListener onClickAway={handleClickAway}>
          <Paper style={{ width: '100%' }}>
            {loading && (
              <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
                <CircularProgress />
              </Box>
            )}
            {error && (
              <Typography variant="h6" color="error"> {error} </Typography>
            )}
            <List style={{ maxHeight: '200px', overflowY: 'auto' }}>
              {searchResults.map((coin) => (
                <ListItem button key={coin.id} onClick={() => handleCoinClick(coin.id)}>
                  <ListItemAvatar>
                    <Avatar src={coin.thumb} alt={coin.name} />
                  </ListItemAvatar>
                  <ListItemText primary={`${coin.name} (${coin.symbol.toUpperCase()})`} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </ClickAwayListener>
      </Popper>
    </Box>
  );
};

export default Search;
