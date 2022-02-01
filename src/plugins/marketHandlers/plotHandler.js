import {
    ethers
} from 'ethers';
import PLOT_HANDLER from '../artifacts/plothandler.json';
import PLOT_EMITTER from '../artifacts/plotEmitter.json';

async function manage(signer, item) {
    try{
        const tokenId = item.tokenId; 
        const neighbourhood = item.attributes.filter(c => c.trait_type === 'Neighbourhood')[0].value;
        const plotType = neighbourhood < 16 ? 0 : neighbourhood >= 16 && neighbourhood < 18 ? 2 : 1;
        
        const contract = await new ethers.Contract(PLOT_HANDLER.address, PLOT_HANDLER.abi, signer);
        const plotEmitter = await new ethers.Contract(PLOT_EMITTER.address, PLOT_EMITTER.abi, signer);

        const data = await contract.getPlotData(plotType, tokenId);
        const paidFee = await plotEmitter.hasPlotPaidOneTimeFee(plotType, tokenId);
    
        const [baseLevel, level] = [data.levelBase * 1, data.level * 1];
        const [baseFertility, fertility] = [data.fertilityBase * 1, data.fertility * 1]; 
        const [baseCrimeRate, crimeRate] = [data.crimeRateBase * 1, data.crimeRate * 1]; 
        const defense = data.defence * 1; 
    
        item.attributes.push({
            trait_type: "Treasury",
            value: (data.amountOwnedByPlot / 10 ** 18).toFixed(2)
        });
    
        for(let i = 0; i < item.attributes.length; i++){
            const attribute = item.attributes[i];
            if(attribute.trait_type === "Fertility"){
                attribute.value = `${fertility}  (+${fertility - baseFertility})`;
            }
            else if(attribute.trait_type === "Crime Rate"){
                attribute.value = `${crimeRate}  (+${crimeRate - baseCrimeRate})`;
            }
            else if(attribute.trait_type === "Defense"){
                attribute.value = `${defense}`;
            }
            else if(attribute.trait_type === "Level"){
                attribute.value = `${level}  (+${level - baseLevel})`;
            }
        }

        item.attributes.push({
            trait_type: "Paid Feed",
            value: paidFee
        });
    }
    catch(err){
        return;
    }
};

export default manage;