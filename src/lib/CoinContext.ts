// import { createContext, useState } from "react";

// interface CoinContextType {
//     coins: string[] | null;
//     addCoin: (coin: string) => void;
//     removeCoin: (coin: string) => void;
// }

// interface CoinProviderProps {
//     children: React.ReactNode;
// }

// const CoinContext = createContext<CoinContextType>({});


// const CoinProvider: React.FC<CoinProviderProps> = ({ children }) => {
//     const [coins, setCoins] = useState<string[]>([]);

//     const addCoin = (coin: string) => {
//         setCoins((prevCoins) => [...prevCoins, coin]);
//     };

//     const removeCoin = (coin: string) => {
//         setCoins((prevCoins) => prevCoins.filter((c) => c !== coin));
//     };

//     return (
//         <CoinContext.Provider value={{ coins, addCoin, removeCoin }}>
//             {children}
//         </CoinContext.Provider>
//     );
// };

// export { CoinContext, CoinProvider };