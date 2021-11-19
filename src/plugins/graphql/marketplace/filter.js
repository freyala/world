export const ApplyMarketFilters = (filter) => {
    return `
    {
        nfts: nfts(where: {attributes: ${filter}}) {
          id
          attributes {
            key
            value
          }
        }
    }
    `;
};

export const FetchMarketSales = (marketToken) => {
    return `
    {
      sellOrders(where: {market: "${marketToken}"}) {
        seller {
          id
        }
        price
        timestamp
        currency {
          id
        }
        nft {
          token
          tokenId
        }
      }
    }    
    `;
};

export const FetchMarketSalesByCurrency = (marketToken, currency) => {
    return `
  {
    markets(where: {token: "${marketToken}"}) {
      totalAuctions,
      totalSales,
      nfts{
        sellOrders(where: {currency: "${currency}"}){
          seller{
            id
          },
          price,
          timestamp,
          nft{
            token,
            tokenId
          }
        }
      }
    }
  }  
  `;
};