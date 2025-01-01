export interface Crypto {
    id: string;
    symbol: string;
    name: string;
    current_price: number;
    market_cap: number;
    market_cap_rank: number;
    ath: number;
    price_change_percentage_24h : number;
    total_volume : number;
    image : string;
}


export interface CryptoDetailType {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  ath: number;
  price_change_percentage_24h : number;
  total_volume : number;
  image : string;
  fully_diluted_valuation: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number;
  ath_change_percentage: number,
  ath_date: Date
  atl: number,
  atl_change_percentage: number,
  atl_date: Date,
  last_updated: Date
}