import { Box, Card, CardContent, CardHeader } from '@mui/material'
import { IoIosCloseCircle } from "react-icons/io";
import {  PinnedItemType } from '../types/Crypto';

interface Props  {
    coin : PinnedItemType;
    handleRemovePin : (id : string) => void;
}

const PinnedCoin = ({coin, handleRemovePin}: Props) => {

return (
            <Card style={{marginRight : '10px'}} onClick={(e) => {
                e.stopPropagation();
                window.location.href = `/crypto/${coin.id}`;
            }}>
            <CardHeader
                    action={
                            <IoIosCloseCircle onClick={(e) => {
                                    e.stopPropagation();
                                    handleRemovePin(coin.id);
                            }} />
                    }
            />
            <CardContent>
            <Box display="flex" alignItems="center">
                    <img
                            style={{ height: '30px', width: '30px', marginRight: '10px' }}
                            src={coin.image}
                            alt="coin"
                    />
                    {coin.name}
                    </Box>
            </CardContent>
    </Card>
)
}

export default PinnedCoin