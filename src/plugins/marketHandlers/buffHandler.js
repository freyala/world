import {
    ethers
} from 'ethers';
import PLOT_BUFF_HANDLER from '../artifacts/plotBuffHandler.json';

const attributes = [
    "Fertility",
    "Level",
    "Crime",
    "Defense",
];

async function manage(signer, item) {
    try{
        const contract = await new ethers.Contract(PLOT_BUFF_HANDLER.address, PLOT_BUFF_HANDLER.abi, signer);
        const itemModifiers = await contract.getAssetModifierValues(item.token, item.tokenId);

        for(let i = 0; i < 4; i++){
            if(i >= itemModifiers[1].length) return;
            if(itemModifiers[2][i] * 1 !== 0){
                item.attributes.push({
                    trait_type: `Plot ${attributes[itemModifiers[1][i] * 1]}`,
                    value: "+" + itemModifiers[2][i] * 1
                });
            }
        }
    }
    catch(err){
        return;
    }
};

export default manage;