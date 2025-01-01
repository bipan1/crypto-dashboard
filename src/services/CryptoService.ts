import axios from 'axios';
import { Crypto, CryptoDetailType, CryptoSearchCoin, CryptoSearchResponse } from '../types/Crypto';

export const fetchCryptos = async (page : number, order : string): Promise<Crypto[]> => {
  try {
    const response = await axios.get<Crypto[]>(`${import.meta.env.VITE_API_BASE_URL}/coins/markets`, {
      params: {
        vs_currency: 'aud',
        per_page: 10,
        page: page,
        sparkline: false,
        order
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching cryptocurrencies', error);
    throw error;
  }
};

export const fetchCryptoById = async (id: string): Promise<CryptoDetailType> => {
  try {
    const response = await axios.get<CryptoDetailType[]>(`${import.meta.env.VITE_API_BASE_URL}/coins/markets`, {
      params: {
        vs_currency: 'aud',
        ids: id,
      },
    });
    return response.data[0];
  } catch (error) {
    console.error('Error fetching cryptocurrency', error);
    throw error;
  }
};

export const searchCryptoByName = async (query : string) : Promise<CryptoSearchCoin[]> => {
  try {
    const response = await axios.get<CryptoSearchResponse>(`${import.meta.env.VITE_API_BASE_URL}/search`, {
      params: {
        query
      },
    });
    return response.data.coins;
  } catch (error) {
    console.error('Error fetching cryptocurrency', error);
    throw error;
  }
}
