// import IUniswapV2Router02 from "../plugins/artifacts/IUniswapV2Router02.json"
// import IERC20 from "../plugins/artifacts/freyala.json"
//
// import {ethers} from "ethers"
// import {mapActions, mapGetters} from 'vuex'
//
// const {Route, Price, Token, Fetcher, Trade, TokenAmount, TradeType, Percent} = require("../shared/sdk")
//
// export default {
//     computed: {
//         ...mapGetters(['metaMaskAccount', 'metaMaskWallet'])
//     },
//     methods: {
//         ...mapActions('exchange/swapper', ['setBtnState']),
//         ...mapActions('liquidity/buttons', ['setBtnState']),
//         async getTokenBalance(token, wallet, account) {
//             const abi = [
//                 {
//                     constant: true,
//                     inputs: [{name: "_owner", type: "address"}],
//                     name: "balanceOf",
//                     outputs: [{name: "balance", type: "uint256"}],
//                     type: "function"
//                 },
//                 {
//                     constant: true,
//                     inputs: [],
//                     name: "decimals",
//                     outputs: [{name: "", type: "uint8"}],
//                     type: "function"
//                 }
//             ]
//
//             if (token.oneZeroXAddress === '0xcF664087a5bB0237a0BAd6742852ec6c8d69A27a') {
//                 const provider = new ethers.providers.Web3Provider(window.ethereum)
//                 const balance = await provider.getBalance(account)
//                 return ethers.utils.formatUnits(balance.toString(), token.decimals).toString()
//             } else {
//                 const contract = new ethers.Contract(token.oneZeroXAddress, abi, wallet.signer)
//                 const balance = await contract.balanceOf(account)
//                 return ethers.utils.formatUnits(balance.toString(), token.decimals).toString()
//             }
//         },
//         async approveSpending(token1, contractAddr, wallet, account) {
//             let isDefaultWallet = this.checkSignedIn(account)
//             if (isDefaultWallet) return 1
//             const wei = ethers.BigNumber.from("115792089237316195423570985008687907853269984665640564039457584007913129639935")
//             const abi = IERC20.abi
//
//             const contract = new ethers.Contract(token1.oneZeroXAddress, abi, wallet.signer)
//
//             const tx = await contract.approve(contractAddr, wei).catch(error => {
//                 throw error
//             })
//
//             await tx.wait(1)
//         },
//         checkAllowance(token1, contractAddr, wallet, account) {
//             const abi = IERC20.abi
//             const contract = new ethers.Contract(token1.oneZeroXAddress, abi, wallet.signer)
//             return contract.allowance(account, contractAddr)
//         },
//
//         async getPair(token0, token1) {
//             const Token0 = await Fetcher.fetchTokenData(1666600000, token0.oneZeroXAddress)
//             const Token1 = await Fetcher.fetchTokenData(1666600000, token1.oneZeroXAddress)
//
//             return await Fetcher.fetchPairData(Token0, Token1).catch(error => {
//                 console.log(error)
//                 throw error
//             })
//         },
//         getRate(pair, token1) {
//             let rate = []
//
//             if (
//                 pair["tokenAmounts"][0].currency.address !== token1.oneZeroXAddress
//             ) {
//                 rate = pair.token1Price.toFixed(8)
//             } else {
//                 rate = pair.token0Price.toFixed(8)
//             }
//
//             return rate
//         },
//         getReserves(pair, token1) {
//             let reserves = []
//
//             if (
//                 pair["tokenAmounts"][0].currency.address !== token1.oneZeroXAddress
//             ) {
//                 reserves[1] = ethers.utils.commify(pair.reserve0.toFixed(6))
//                 reserves[0] = ethers.utils.commify(pair.reserve1.toFixed(6))
//             } else {
//                 reserves[0] = ethers.utils.commify(pair.reserve0.toFixed(6))
//                 reserves[1] = ethers.utils.commify(pair.reserve1.toFixed(6))
//             }
//
//             return reserves
//         },
//
//         async getBestRoute(parsedAmount, token0, token1) {
//             const [Token0, Token1, TokenX, TokenY, TokenZ, EUSDC, BUSDC] = await Promise.all([
//                 Fetcher.fetchTokenData(
//                     1666600000,
//                     token0.oneZeroXAddress
//                 ),
//                 Fetcher.fetchTokenData(
//                     1666600000,
//                     token1.oneZeroXAddress
//                 ),
//                 new Token(
//                     1666600000,
//                     '0xcF664087a5bB0237a0BAd6742852ec6c8d69A27a',
//                     18
//                 ),
//                 new Token(
//                     1666600000,
//                     '0x9b68bf4bf89c115c721105eaf6bd5164afcc51e4',
//                     18
//                 ),
//                 new Token(
//                     1666600000,
//                     '0xE176EBE47d621b984a73036B9DA5d834411ef734',
//                     18
//                 ),
//                 new Token(
//                     1666600000,
//                     '0x985458E523dB3d53125813eD68c274899e9DfAb4',
//                     6
//                 ),
//                 new Token(
//                     1666600000,
//                     '0x44cED87b9F1492Bf2DCf5c16004832569f7f6cBa',
//                     18
//                 )
//             ])
//
//             const pairTHATEXISTS = await Fetcher.fetchPairData(TokenZ, TokenX)
//
//             const [pair01, paira, pairab, pairc, paircd, paire, pairef, pairfg, pairgh, pairij] = await Promise.all([
//                 Fetcher.fetchPairData(Token0, Token1).catch(() => {
//                     return pairTHATEXISTS
//                 }),
//                 Fetcher.fetchPairData(Token0, TokenX).catch(() => {
//                     return pairTHATEXISTS
//                 }),
//                 Fetcher.fetchPairData(TokenX, Token1).catch(() => {
//                     return pairTHATEXISTS
//                 }),
//                 Fetcher.fetchPairData(Token0, TokenY).catch(() => {
//                     return pairTHATEXISTS
//                 }),
//                 Fetcher.fetchPairData(TokenY, Token1).catch(() => {
//                     return pairTHATEXISTS
//                 }),
//                 Fetcher.fetchPairData(Token0, TokenZ).catch(() => {
//                     return pairTHATEXISTS
//                 }),
//                 Fetcher.fetchPairData(TokenZ, Token1).catch(() => {
//                     return pairTHATEXISTS
//                 }),
//                 Fetcher.fetchPairData(Token1, EUSDC).catch(() => {
//                     return pairTHATEXISTS
//                 }),
//                 Fetcher.fetchPairData(BUSDC, EUSDC).catch(() => {
//                     return pairTHATEXISTS
//                 }),
//                 Fetcher.fetchPairData(EUSDC, BUSDC).catch(() => {
//                     return pairTHATEXISTS
//                 })
//             ])
//
//             const bestRoute = await Trade.bestTradeExactIn([paira, pairab, pairc, paircd, paire, pairef, pairgh, pairij, pairfg, pair01, pairTHATEXISTS], new TokenAmount(Token0, parsedAmount), Token1)
//
//             return bestRoute[0]
//         },
//         getPath(bestRoute) {
//             let i = 0
//             let path = []
//
//             while (bestRoute.route.path.length > i) {
//                 path.push(bestRoute.route.path[i].address)
//                 i++
//             }
//
//             return path
//         },
//         async getTrade(route, amount, token0) {
//             const Token0 = await Fetcher.fetchTokenData(1666600000, token0.oneZeroXAddress)
//             return new Trade(route, new TokenAmount(Token0, amount), TradeType.EXACT_INPUT)
//         },
//         async getAmountsLiquidity(pair, token0, token1, amount) {
//             const Token0 = await Fetcher.fetchTokenData(1666600000, token0.oneZeroXAddress)
//
//             const route = new Route([pair], Token0)
//             const price = Price.fromRoute(route)
//             const amountIn = ethers.BigNumber.from(this.getUnits(amount, token0))
//
//             return price.quote(new TokenAmount(Token0, amountIn.toString())).toFixed(token1.decimals)
//         },
//         async swapETHForExactTokens(amountIn, amountOutMin, path, token1, wallet, account) {
//             let isDefaultWallet = this.checkSignedIn(account)
//             if (isDefaultWallet) return 1
//
//             const value = ethers.utils.parseEther(amountIn)
//             const deadline = this.getDeadline()
//             const amountOutParsed = this.getUnits(amountOutMin, token1)
//             const abi = IUniswapV2Router02.abi
//
//             let valueOverride = {value: value}
//
//             const contract = new ethers.Contract('0x24ad62502d1C652Cc7684081169D04896aC20f30', abi, wallet.signer)
//             const tx = await contract.swapExactETHForTokens(amountOutParsed, path, account, deadline, valueOverride).catch(() => {
//                 this.setBtnState({swap: 'swap'})
//             })
//
//             await tx.wait(1)
//         },
//         async swapTokensForExactETH(amountIn, amountOutMin, path, token0, wallet, account) {
//             let isDefaultWallet = this.checkSignedIn(account)
//             if (isDefaultWallet) return 1
//
//             let deadline = this.getDeadline()
//             let amountInParsed = this.getUnits(amountIn, token0)
//             let amountOutParsed = ethers.utils.parseEther(amountOutMin)
//             const abi = IUniswapV2Router02.abi
//
//             const contract = new ethers.Contract('0x24ad62502d1C652Cc7684081169D04896aC20f30', abi, wallet.signer)
//             const tx = await contract.swapExactTokensForETH(amountInParsed, amountOutParsed, path, account, deadline).catch(() => {
//                 this.setBtnState({swap: 'swap'})
//             })
//
//             await tx.wait(1)
//         },
//         async swapExactTokensForTokens(amountIn, amountOutMin, path, token0, token1, wallet, account) {
//             let isDefaultWallet = this.checkSignedIn(account)
//             if (isDefaultWallet) return 1
//
//             let deadline = this.getDeadline()
//             let amountInParsed = this.getUnits(amountIn, token0)
//             let amountOutParsed = this.getUnits(amountOutMin, token1)
//             const abi = IUniswapV2Router02.abi
//
//             const contract = new ethers.Contract('0x24ad62502d1C652Cc7684081169D04896aC20f30', abi, wallet.signer)
//
//             const tx = await contract.swapExactTokensForTokens(amountInParsed, amountOutParsed, path, account, deadline).catch(() => {
//                 this.setBtnState({swap: 'swap'})
//             })
//
//             await tx.wait(1)
//         },
//         async calculateSlippage(amount, slippage) {
//             slippage = ethers.BigNumber.from(String(parseFloat(slippage) * 10))
//             const divider = ethers.BigNumber.from("1000")
//
//             const value = amount.div(divider).mul(slippage)
//             return amount.sub(value)
//         },
//
//         getDeadline() {
//             let deadline = new Date()
//
//             deadline = parseInt(deadline / 1000) + 480
//
//             return deadline
//         },
//         checkSignedIn(account) {
//             return account === '0x0000000000000000000000000000000000000009'
//         },
//         async getAmountOutWithSlippage(amount, bestRoute, slippageRate, token1, token2) {
//             let parsedAmount = this.getUnits(amount, token1)
//             let Token0 = await Fetcher.fetchTokenData(
//                 1666600000,
//                 token1.oneZeroXAddress
//             )
//
//             const trade = new Trade(
//                 bestRoute.route,
//                 new TokenAmount(Token0, parsedAmount),
//                 TradeType.EXACT_INPUT
//             )
//
//             let slippageTolerance = new Percent(String(parseFloat(slippageRate) * 10), "1000")
//             return trade.minimumAmountOut(slippageTolerance).toFixed(token2.Decimals)
//
//         },
//         async getAmountInWithSlippage(amount, bestRoute, token1, token2) {
//             let parsedAmount = this.getUnits(amount, token1)
//             let path = this.getPath(bestRoute)
//             const abi = IUniswapV2Router02.abi
//
//             console.log(path)
//
//             const contract = new ethers.Contract('0x24ad62502d1C652Cc7684081169D04896aC20f30', abi, this.metaMaskWallet.signer)
//             let allowance = await contract.getAmountsIn(parsedAmount, path)
//
//             console.log(allowance.toString())
//
//             return this.getFormattedUnits(allowance[0].toString(), token2)
//         },
//         getUnits(amount, token) {
//             return ethers.utils.parseUnits(amount, token.decimals)
//         },
//         getFormattedUnits(amount, token) {
//             return ethers.utils.formatUnits(amount, token.decimals)
//         },
//         getEthUnits(amount) {
//             return ethers.utils.formatEther(amount)
//         }
//     }
// }