<template>
  <div class="flex flex-1 items-center">
    <div class="flex flex-col space-y-1 w-1/3 min-w-0">
      <div class="relative flex space-x-2 items-center h-10">
        <i @click="addTokenToMetamask(this.getToken()['token2'])"
           class="flex las la-plus text-sm p-1 text-primary-head absolute top-0 left-0 items-center justify-center bg-slightGray dark:bg-slightDark rounded-full cursor-pointer shadow hover:bg-primary-head dark:hover:bg-primary-head hover:text-slightGray dark:hover:text-slightDark"></i>
        <img :src="this.getToken()['token2'].imgSrc" class="h-8 w-8 rounded-full flex items-center justify-center"
             alt="">
        <div class="flex flex-1 items-center min-w-0">
          <p class="text-sm text-el text-primary-head-dark">{{ this.getToken()['token2'].Symbol }}</p>
        </div>
      </div>

      <div class="flex pl-1 space-x-2 h-4">
        <p class="text-xs text-el">{{ this.getToken()['token2'].name }}</p>
      </div>
    </div>

    <div class="flex flex-col space-y-1 flex-1 w-2/3 min-w-0">
      <div class="flex h-10">
        <Input1 :errors="errors" :rounded="'absolute bottom-0 left-4 text-white opacity-80 pb-2'" :placeholder="'Amount...'" :errorTop="'pt-10'">
          <div class="flex flex-1 st5-all items-center justify-end group-scope z-30 absolute right-0">
            <div @click="setMax()"
                 class="flex h-10 items-center bg-gray-100 dark:bg-Dark-gray group-scope-hover:bg-primary-head text-primary-head-dark dark:text-primary-head border-l border-black border-opacity-10 cursor-pointer px-3 absolute bottom-0 left-4 text-white opacity-80 pb-2">
              <p class="text-sm dark:group-scope-hover:text-Dark-gray group-scope-hover:text-gray-100">MAX</p>
            </div>
          </div>
        </Input1>
      </div>
      <div class="flex pl-2 space-x-2 h-4">
        <p class="text-xs flex-none dark:text-primary-head-dark">Balance :</p>
        <p class="text-xs text-el text-gray-600 dark:text-gray-300">{{ parseFloat(getBalanceToken(1)).toFixed(8) }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import Input1 from './Input1'
import swap from "../../../shared/swap.js"
import wallet from "../../../plugins/wallet"
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'SwapperToken1',
  components: {
    Input1
  },
  mixins: [swap, wallet],
  async mounted() {
    this.setBalanceToken({
      1: await this.getTokenBalance(this.getToken()['token2'], this.metaMaskWallet, this.metaMaskAccount)
    })
  },
  data() {
    return {
      errors: {},
    }
  },
  computed: {
    ...mapGetters('exchange/swapper', ['getBalanceToken', 'getInputAmount', 'getSlippageRate', 'getPriceImpact']),
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
        1: await this.getTokenBalance(this.getToken()['token2'], this.metaMaskWallet, this.metaMaskAccount)
      })

      await this.setInputForToken0()
    },
    async setInputForToken0() {
      let token0 = this.getToken()['token1']
      let token1 = this.getToken()['token2']
      this.setBtnState({swap: 'loading'})
      let units = this.getUnits(this.getInputAmount(1), token1)
      let bestRoute = await this.getBestRoute(units, token1, token0)

      this.setPriceImpact(bestRoute.priceImpact.toFixed(2))

      if (this.getPriceImpact > 3) {
        this.setWarning({
          'impact': 'Price impact high. Check reserves. Continue only if you know what you are doing.'
        })
      } else {
        this.deleteWarning('impact')
      }

      this.setInputAmount({
        0: await this.getAmountInWithSlippage(this.getInputAmount(1), bestRoute, this.getSlippageRate, token1, token0)
      })
      this.setBtnState({swap: 'swap'})
    }
  }
}
</script>