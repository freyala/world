<template>
  <div class="flex flex-col mt-3">
    <div class="flex items-center space-x-3">
      <InputWithValidation :input="amount" :errors="errors" @catchInput="inputAmount" :rounded="'absolute bottom-0 left-4 text-white opacity-80 pb-2'"
                           :placeholder="'Amount...'" :errorTop="'pt-10'">
        <p class="flex items-center justify-center text-xs z-30 right-0 absolute bg-gray-100 dark:bg-Dark-gray px-3 h-10">
          {{ this.getToken()['token1'].Symbol }}</p>
      </InputWithValidation>

      <div class="flex flex-1 items-center justify-end group-scope">
        <div @click="setMax()"
             class="flex h-10 items-center group-scope-hover:bg-primary-head text-primary-head-dark dark:text-primary-head border border-yellow-dark dark:border-yellow cursor-pointer px-3 ss:space-x-0 xs:space-x-2">
          <i class="las la-wallet ss:hidden xs:block text-xl dark:group-scope-hover:text-Dark-gray group-scope-hover:text-gray-100"></i>
          <p class="dark:group-scope-hover:text-Dark-gray group-scope-hover:text-gray-100">MAX</p>
        </div>
      </div>
    </div>
    <div class="flex space-x-2 items-center pt-2">
      <div class="flex items-center space-x-1 px-1">
        <p class="text-xs dark:text-gray-300">1</p>
        <p class="text-xs text-primary-head">{{ this.getToken()['token1'].Symbol }}</p>
        <p class="text-xs dark:text-gray-300">=</p>
        <p class="text-xs dark:text-gray-300">{{ rate }}</p>
        <p class="text-xs text-primary-head">{{ this.getToken()['token2'].Symbol }}</p>
      </div>
    </div>
  </div>
</template>

<script>

import swap from "../../../shared/swap.js"
import InputWithValidation from '../InputWithValidation'
import {mapGetters} from 'vuex'
import wallet from "../../../plugins/wallet"

export default {
  name: 'SwapperAmount',
  mixins: [swap, wallet],
  components: {
    InputWithValidation
  },
  props: {
    balance: String
  },
  computed: {
    ...mapGetters([
      'metaMaskAccount',
      'metaMaskWallet',
    ])
  },
  data() {
    return {
      amount: "1",
      rate: "0",
      errors: {}
    }
  },
  async mounted() {
    let pair = await this.getPair(this.getToken()['token1'], this.getToken()['token2'])
    this.rate = this.getRate(pair, this.getToken()['token1'])
  },
  methods: {
    ...mapGetters('exchange', ['getToken']),

    inputAmount(value) {
      // Checking if the input is in the right format.
      // parseFloat seems to behave like this regex rule.
      if (!value.match(/^\d*\.?\d*$/)) {
        this.errors['format'] = 'Invalid format! e.g: 12345.678'
      } else {
        delete this.errors['format']
        this.$emit("amount", value)
      }
      if (value === '') {
        this.errors['blank'] = 'Amount can\'t be blank'
      } else {
        delete this.errors['blank']
        this.$emit("amount", value)
      }
      if (parseFloat(value) > parseFloat(this.balance)) {
        this.errors['exceed'] = 'Your input exceeds the amount available in your balance!'
      } else {
        delete this.errors['exceed']
        this.$emit("amount", value)
      }
    },

    async setMax() {
      this.amount = await this.getTokenBalance(this.getToken()['token1'], this.metaMaskWallet, this.metaMaskAccount)
      this.$emit("amount", this.amount)
    }
  }
}
</script>