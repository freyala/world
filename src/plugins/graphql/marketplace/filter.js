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

export const FetchMarkstNFTs = () => {
    return `
    query 
   nfts($market: String!, $tokenId: BigInt, $attributes: [AttributeInput!], $orderBy: Nft_orderBy, $orderDirection: OrderDirection){    
    
    sales: nfts(orderBy: $orderBy, orderDirection: $orderDirection, where: {tokenId: $tokenId, market: $market,  attributes: $attributes, currentSellOrder_not: null}) {
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
      attributes{
        trait_type: key
        value
      }
    }
    auctions: nfts(orderBy: $orderBy, orderDirection: $orderDirection, where: {tokenId: $tokenId, market: $market,  attributes: $attributes, currentAuction_not: null}) {
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
      attributes{
        trait_type: key
        value
      }
    }
  }
`
};

export const FetchMarketNFTs = (marketToken, filters, pagination = undefined, orderInfo = undefined) => {
    const sortQuery = !orderInfo ? '' : `orderBy: ${orderInfo.orderBy}, orderDirection: ${orderInfo.orderDirection},`;

    const paginationQuery = !pagination ? '' : `first: ${paginationInfo.perPage}, skip: ${paginationInfo.page * paginationInfo.perPage},`;

    const attributeFilter = filters && filters.attributeFilter ? filters.attributeFilter : "[]";

    const currencyFilter = filters && filters.currency ? 'currentCurrency: "' + filters.currency + '", ' : "";

    const tokenId = filters && filters.tokenId > 0 ? `${filters.tokenIdComparator}: ` + filters.tokenId + ', ' : "";

    return `
    {
      sales: nfts(first:300, ${sortQuery}${paginationQuery} where: {market: "${marketToken}", ${tokenId} ${currencyFilter} attributes: ${attributeFilter}, currentSellOrder_not: null}) {
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
        attributes{
          trait_type: key
          value
        }
      }
      auctions: nfts(first:300, ${sortQuery}${paginationQuery} where: {market: "${marketToken}", ${tokenId} ${currencyFilter} attributes: ${attributeFilter}, currentAuction_not: null}) {
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
        attributes{
          trait_type: key
          value
        }
      }
    }
  `
};