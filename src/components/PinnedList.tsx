import { Box, Typography } from "@mui/material"
import { PinnedItemType } from "../types/Crypto"
import PinnedCoin from "./PinnedCoin"

interface Props {
    pinnedList : PinnedItemType[];
    handleRemovePin : (id : string) => void;
}

const PinnedList = ({pinnedList, handleRemovePin}: Props) => {

    if(pinnedList.length === 0){
        return <Typography align="center" variant="h6">
            No coins are pinned.
        </Typography>
    }

    return (
        <Box display="flex" flexDirection="row" margin="auto">
            {pinnedList.map((item: PinnedItemType) => {
                return (
                    <PinnedCoin handleRemovePin={handleRemovePin} coin={item}/>
                )
            })}
        </Box>
    )
}

export default PinnedList