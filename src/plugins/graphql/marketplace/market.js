export const FetchMarketAttributes = (marketId) => {
    return `
    {
        markets(where: {token: "${marketId}"}) {
        token
        attributes {
          key
          values
        }
      }
    }
    `
};

export const FetchMarketStats = (tokenId) => {
    return `
    {
      markets(where:{token:"${tokenId}"}){
        items: totalNfts
        currencyStats{
          volume
          floor
          currency{
            id
          }
        }
      }
    }
  `
}

export const FetchMarketTokens = () => {
    return `
  {
    currencies {
      id
    }
  }
  `;
};