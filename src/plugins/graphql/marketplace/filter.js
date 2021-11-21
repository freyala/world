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
          tokenId,
          attributes{
            key,
            value
          }
        }
      }
    }    
    `;
};

export const FetchMarketNfts = (marketToken, filter) => {
    return `
    {
      sales: nfts(where: {market: "${marketToken}", attributes: ${filter}, currentSellOrder_not: null}) {
        tokenId,
        attributes{
          key
          value
        }
        order: currentSellOrder {
          price
          currency {
            id
          }
        }
      }
      auctions: nfts(where: {market: "${marketToken}", attributes: ${filter}, currentAuction_not: null}) {
        tokenId
        attributes{
          key
          value
        }
        order: currentAuction {
          highestBidder
          price: highestBid
          currency{
            id
          }
          timestamp
          ended
          endsAt
        }
      }
    }
  `
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