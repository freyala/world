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