<template>
  <div class="flex flex-1 items-center">
    <div class="flex flex-col space-y-1 w-1/3 min-w-0">
      <div class="relative flex space-x-2 items-center h-10">
        <i @click="addTokenToMetamask(this.getToken()['token1'])" class="flex las la-plus text-sm p-1 text-yellow absolute top-0 left-0 items-center justify-center bg-slightGray dark:bg-slightDark rounded-full cursor-pointer shadow hover:bg-yellow dark:hover:bg-yellow hover:text-slightGray dark:hover:text-slightDark"></i>
        <img :src="this.getToken()['token1'].imgSrc" class="h-8 w-8 rounded-full flex items-center justify-center" alt="">
        <div class="flex flex-1 items-center min-w-0">
          <p class="text-sm text-el text-yellow-dark">{{this.getToken()['token1'].Symbol}}</p>
        </div>
      </div>

      <div class="flex pl-1 space-x-2 h-4">
        <p class="text-xs text-el">{{this.getToken()['token1'].name}}</p>
      </div>
    </div>

    <div class="flex flex-col space-y-1 flex-1 w-2/3 min-w-0">
      <div class="flex h-10">
        <Input0 :errors="errors" :rounded="'rounded-xl'" :placeholder="'Amount...'" :errorTop="'pt-10'">
          <div class="flex flex-1 st5-all items-center justify-end group-scope z-30 absolute right-0">
            <div @click="setMax()" class="flex h-10 items-center bg-gray-100 dark:bg-Dark-gray group-scope-hover:bg-yellow text-yellow-dark dark:text-yellow border-l border-black border-opacity-10 cursor-pointer px-3 rounded-xl">
              <p class="text-sm dark:group-scope-hover:text-Dark-gray group-scope-hover:text-gray-100">MAX</p>
            </div>
          </div>
        </Input0>
      </div>
      <div class="flex pl-2 space-x-2 h-4">
        <p class="text-xs flex-none dark:text-yellow-dark">Balance :</p>
        <p class="text-xs text-el text-gray-600 dark:text-gray-300">{{parseFloat(getBalanceToken(0)).toFixed(8)}}</p>
      </div>
    </div>
  </div>
</template>

<script>
  import Input0 from './Input0'
  import swap from "../../../shared/swap.js"
  import wallet from "../../../plugins/wallet"
  import { mapActions, mapGetters } from 'vuex'

  export default {
    name: 'SwapperToken0',
    components: {
      Input0
    },
    mixins: [swap, wallet],
    async mounted() {
      this.setBalanceToken({ 
        0: await this.getTokenBalance(this.getToken()['token1'], this.metaMaskWallet, this.metaMaskAccount)
      })
    },
    data() {
      return {
        errors: {},
      }
    },
    computed: {
      ...mapGetters('exchange/swapper', ['getBalanceToken', 'getInputAmount', 'getSlippageRate', 'getPriceImpact', ]),
      ...mapGetters([
        'metaMaskAccount',
        'metaMaskWallet',
      ])
    },
    methods: {
      ...mapGetters('exchange', ['getToken']),
       ...mapActions('exchange/swapper/buttons', ['setBtnState']),
      ...mapActions('exchange/swapper', [
        'setBalanceToken', 
        'setInputAmount', 
        'setPriceImpact', 
        'setThePath', 
        'setWarning', 
        'deleteWarning'
      ]),

      async setMax() {
        this.setInputAmount({
          0: await this.getTokenBalance(this.getToken()['token1'], this.metaMaskWallet, this.metaMaskAccount)
        })

        await this.setInputForToken1()
      },
      async setInputForToken1() {
        let token0 = this.getToken()['token1']
        let token1 = this.getToken()['token2']
        this.setBtnState({swap: 'loading'})
        let units = this.getUnits(this.getInputAmount(0), token0)
        let bestRoute = await this.getBestRoute(units, token0, token1)
        
        this.setPriceImpact(bestRoute.priceImpact.toFixed(2))
        
        if (this.getPriceImpact > 3) {
          this.setWarning({
            'impact': 'Price impact high. Check reserves. If impact 100% DO NOT SWAP. You can try to reduce impact by doing multiple smaller trades.'
          })
        } else {
          this.deleteWarning('impact')
        }

        this.setInputAmount({
          1: await this.getAmountOutWithSlippage(this.getInputAmount(0), bestRoute, this.getSlippageRate, token0, token1)
        })
        this.setBtnState({swap: 'swap'})
      }
    }
  }
</script>