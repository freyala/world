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

export const FetchMarketNfts = (marketToken, filters, pagination = undefined, orderInfo = undefined) => {
    const sortQuery = !orderInfo ? '' : `orderBy: ${orderInfo.orderBy}, orderDirection: ${orderInfo.orderDirection},`;

    const paginationQuery = !pagination ? '' : `first: ${paginationInfo.perPage}, skip: ${paginationInfo.page * paginationInfo.perPage},`;

    const attributeFilter = filters && filters.attributeFilter ? filters.attributeFilter : "[]";

    const currencyFilter = filters && filters.currency ? 'currentCurrency: "' + filters.currency + '", ' : "";

    return `
    {
      sales: nfts(${sortQuery}${paginationQuery} where: {market: "${marketToken}", ${currencyFilter} attributes: ${attributeFilter}, currentSellOrder_not: null}) {
        tokenId,
        currentPrice
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
      auctions: nfts(${sortQuery}${paginationQuery} where: {market: "${marketToken}", ${currencyFilter} attributes: ${attributeFilter}, currentAuction_not: null}) {
        tokenId
        currentPrice
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