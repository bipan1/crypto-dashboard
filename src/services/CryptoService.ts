import axios from 'axios';
import { Crypto, CryptoDetailType } from '../types/Crypto';

export const fetchCryptos = async (page : number): Promise<Crypto[]> => {
  try {
    const response = await axios.get<Crypto[]>(`${import.meta.env.VITE_API_BASE_URL}/coins/markets`, {
      params: {
        vs_currency: 'aud',
        order: 'market_cap_desc',
        per_page: 10,
        page: page,
        sparkline: false,
      },
    });
    console.log(response);
    console.log(response.headers['total']);
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
    console.log(response)
    return response.data[0];
  } catch (error) {
    console.error('Error fetching cryptocurrency', error);
    throw error;
  }
};
