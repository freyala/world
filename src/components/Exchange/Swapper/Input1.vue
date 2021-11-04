<template>
  <div
      class="relative flex w-full items-center st5 focus-within:text-yellow-dark dark:focus-within:text-yellow dark:text-yellow text-gray-500">
    <input type="text" :value="getInputAmount(1)" @input="setInput"
           :class="this.invalidInput ? 'ring-red-400 focus:ring-red-400 ring-1 focus:ring-1 focus:outline-none ' + this.rounded : 'ring-black ring-opacity-10 focus:ring-yellow ring-1 focus:outline-none ' + this.rounded"
           class="flex w-full z-20 st5 bg-gray-100 py-2 items-center pl-3 dark:bg-Dark-gray dark:placeholder-gray-600 placeholder-gray-300"
           :placeholder="placeholder">
    <slot/>

    <transition name="invalid-input-body">
      <div v-if="this.invalidInput"
           class="flex z-10 w-full absolute py-2 my-2 top-0 left-0 bg-red-400 rounded-xl shadow-lg" :class="errorTop">
        <div class="relative flex flex-col space-y-2">
          <div v-for="(error, index) in this.errors" :key="index" class="text-xs text-gray-50 mx-3 flex">
            {{ error }}
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import swap from "../../../shared/swap.js"
import {mapActions, mapGetters} from 'vuex'

export default {
  mixins: [swap],

  name: 'Input1',
  props: {
    errors: Object,
    rounded: String,
    placeholder: String,
    errorTop: String
  },
  computed: {
    ...mapGetters('exchange/swapper', ['getInputAmount', 'getSlippageRate', 'getPriceImpact']),

    invalidInput() {
      return Object.keys(this.errors).length > 0
    }
  },
  methods: {
    ...mapGetters('exchange', ['getToken']),
    ...mapActions('exchange/swapper/buttons', ['setBtnState']),
    ...mapActions('exchange/swapper', [
      'setInputAmount',
      'setPriceImpact',
      'setThePath',
      'setWarning',
      'deleteWarning',
      'setLastSelected'
    ]),

    setInput(event) {
      this.setInputAmount({1: event.target.value})

      this.setInputForToken0()
    },

    async setInputForToken0() {
      let token0 = this.getToken()['token1']
      let token1 = this.getToken()['token2']
      this.setBtnState({swap: 'loading'})
      let units = this.getUnits(this.getInputAmount(1), token1)
      let bestRoute = await this.getBestRoute(units, token0, token1)
      console.log(bestRoute)
      this.setPriceImpact(bestRoute.priceImpact.toFixed(2))

      if (this.getPriceImpact > 3) {
        this.setWarning({
          'impact': 'Price impact high. Check reserves. Continue only if you know what you are doing.'
        })
      } else {
        this.deleteWarning('impact')
      }
      console.log(bestRoute.route.path)
      this.setLastSelected(1)
      this.setInputAmount({
        0: await this.getAmountInWithSlippage(this.getInputAmount(1), bestRoute, token0, token1, this.getSlippageRate)
      })
      this.setBtnState({swap: 'swap'})
    }
  }
}
</script>