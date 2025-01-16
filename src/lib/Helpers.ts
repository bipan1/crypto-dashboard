import { PinnedItemType } from "../types/Crypto"

export const CheckIfCoinExits = (id : string, pinnedList: PinnedItemType[]) => {
    const foundItem = pinnedList.find((item: PinnedItemType) => item.id === id);
    return foundItem ? true : false;
}