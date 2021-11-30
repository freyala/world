export const FetchMarketTokens = () => {
    return `
    {
      currencies {
        id
      }
    }
    `;
};

export const FetchPendingNFTs = (market, user) => {
    return `
    {
      nfts(where: {market: "${market}", currentOwner: "${user}", currentOwner_not: null}){
        tokenId
        image
      }
    } 
    `;
};

export const FetchNFTData = (market, tokenId) => {
    return `
  {
    nfts(where:{market: "${market}", tokenId: ${tokenId}}){
      attributes{
        trait_type: key
        value
      }
      sales(where:{buyer_not:null}){
        price
        timestamp
        buyer{
          id
        }
        seller{
          id
        }
      }
      auctions(where:{highestBidder_not: null}){
        highestBidder
        highestBid
        timestamp
        seller{
          id
        }
      }
    }
  }`
};

export const FetchUserSales = (marketToken, filters, orderInfo = undefined) => {
    const sortQuery = !orderInfo ? '' : `orderBy: ${orderInfo.orderBy}, orderDirection: ${orderInfo.orderDirection},`;

    const byAttributes = filters && filters.attributeFilter ? filters.attributeFilter : "[]";
    const byCurrency = filters && filters.currency ? 'currentCurrency: "' + filters.currency + '", ' : "";
    const byId = filters && filters.tokenId > 0 ? `${filters.tokenIdComparator}: ` + filters.tokenId + ', ' : "";

    return `
  {
    sales: nfts(${sortQuery}where: {market: "${marketToken}",${byId} ${byCurrency} attributes: ${byAttributes}, currentSellOrder_not: null}){
      tokenId
      currentPrice
      image
      currency: currentCurrency{
        id
      }
      order: currentSellOrder{
        seller{
          id
        }
        timestamp
      }
    }
    auctions: nfts(${sortQuery}where: {market: "${marketToken}",${byId} ${byCurrency} attributes: ${byAttributes}, currentAuction_not: null}){
      tokenId
      currentPrice
      image
      currency: currentCurrency{
        id
      }
      order: currentAuction {
        highestBidder
        seller{
          id
        }
        timestamp
        ended
        endsAt
      }
    }
  }
  `
}

export const FetchMarketNFTs = (marketToken, filters, pagination = undefined, orderInfo = undefined) => {
    const sortQuery = !orderInfo ? '' : `orderBy: ${orderInfo.orderBy}, orderDirection: ${orderInfo.orderDirection},`;
    const paginationQuery = !pagination ? '' : `first: ${pagination.perPage}, skip: ${(pagination.page - 1) * pagination.perPage},`;

    const byAttributes = filters && filters.attributeFilter ? filters.attributeFilter : "[]";
    const byCurrency = filters && filters.currency ? 'currentCurrency: "' + filters.currency + '", ' : "";
    const byId = filters && filters.tokenId > 0 ? `${filters.tokenIdComparator}: ` + filters.tokenId + ', ' : "";

    return `
    {
      sales: nfts(${sortQuery}where: {market: "${marketToken}", ${byId} ${byCurrency} attributes: ${byAttributes}, currentSellOrder_not: null}${paginationQuery}) {
        tokenId,
        currentPrice
        image
        currency: currentCurrency{
          id
        }
        order: currentSellOrder {
          seller{
            id
          }
          timestamp
        }
      }
      auctions: nfts(${sortQuery} where: {market: "${marketToken}", ${byId} ${byCurrency} attributes: ${byAttributes}, currentAuction_not: null}${paginationQuery}) {
        tokenId
        currentPrice
        image
        currency: currentCurrency{
          id
        }
        order: currentAuction {
          highestBidder
          seller{
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