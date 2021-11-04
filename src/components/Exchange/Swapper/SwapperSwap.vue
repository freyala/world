<template>
  <div>
    <transition tag="div" name="swap-btn" class="inline-block absolute">
      <div v-if="this.getBtnState({swap: 'disabled'})"
           class="flex w-28 st5 st5-all justify-between items-center border dark:border-gray-600 border-gray-300 space-x-1 p-2 pl-3 rounded-full group select-none">
        <div class="flex flex-1 items-center justify-center">
          <p class="text-sm text-gray-300 dark:text-gray-600">Swap</p>
        </div>
        <i class="las la-times-circle text-xl text-gray-300 dark:text-gray-600"></i>
      </div>
    </transition>

    <transition tag="div" name="approve-btn" class="inline-block absolute">
      <div @click="parseAndExecuteSwap" v-if="this.getBtnState({swap: 'swap'})" class="flex w-28 group">
        <div class="grab-attention-glowing"></div>
        <div class="grab-attention cursor-pointer st5">
          <div class="flex flex-1 items-center justify-center">
            <p class="text-sm text-yellow-dark dark:text-yellow group-hover:text-gray-50 dark:group-hover:text-Dark-gray">
              Swap</p>
          </div>
          <i class="las la-random text-xl text-yellow-dark dark:text-yellow group-hover:text-gray-50 dark:group-hover:text-Dark-gray"></i>
        </div>
      </div>
    </transition>

    <transition tag="div" name="swap-btn" class="inline-block absolute">
      <div v-if="this.getBtnState({swap: 'swapping'})" class="flex w-28 group">
        <div class="grab-attention-glowing"></div>
        <div class="grab-attention cursor-wait st5">
          <div class="flex flex-1 items-center justify-center">
            <p class="text-sm text-yellow-dark dark:text-yellow group-hover:text-gray-50 dark:group-hover:text-Dark-gray">
              Swapping</p>
          </div>
          <i class="las la-sync text-xl animate-spin text-yellow-dark dark:text-yellow group-hover:text-gray-50 dark:group-hover:text-Dark-gray"></i>
        </div>
      </div>
    </transition>

    <transition tag="div" name="swap-btn" class="inline-block absolute">
      <div v-if="this.getBtnState({swap: 'loading'})" class="flex w-28 group">
        <div class="grab-attention-glowing"></div>
        <div class="grab-attention cursor-wait st5">
          <div class="flex flex-1 items-center justify-center">
            <p class="text-sm text-yellow-dark dark:text-yellow group-hover:text-gray-50 dark:group-hover:text-Dark-gray">
              Fetching</p>
          </div>
          <i class="las la-sync text-xl animate-spin text-yellow-dark dark:text-yellow group-hover:text-gray-50 dark:group-hover:text-Dark-gray"></i>
        </div>
      </div>
    </transition>

    <transition tag="div" name="approve-btn" class="inline-block absolute">
      <div v-if="this.getBtnState({swap: 'swapped'})"
           class="flex w-28 st5 justify-between items-center border border-yellow glow-yellow-light-md space-x-1 p-2 pl-3 rounded-full dark:bg-Dark-gray bg-gray-100 cursor-default">
        <div class="flex flex-1 items-center justify-center">
          <p class="text-sm text-yellow">Swapped</p>
        </div>
        <i class="las la-check-circle text-xl text-yellow"></i>
      </div>
    </transition>
  </div>
</template>

<script>
import swap from "../../../shared/swap.js"
import {mapGetters, mapActions} from 'vuex'
import wallet from "../../../plugins/wallet"

export default {
  name: 'SwapperApprove',
  mixins: [swap, wallet],
  computed: {
    ...mapGetters('exchange/swapper/buttons', ['getBtnState']),
    ...mapGetters('exchange/swapper', ['getInputAmount', 'getThePath']),
    ...mapGetters([
      'metaMaskAccount',
      'metaMaskWallet',
    ])
  },
  methods: {
    ...mapGetters('wallet', ['getChainID']),
    ...mapGetters('exchange', ['getToken']),
    ...mapActions('exchange/swapper/buttons', ['setBtnState']),

    async parseAndExecuteSwap() {
      let token0 = await this.getToken()['token1']
      let token1 = await this.getToken()['token2']
      this.setBtnState({swap: 'swapping'})

      if (token0.oneZeroXAddress !== '0xcF664087a5bB0237a0BAd6742852ec6c8d69A27a' && token1.oneZeroXAddress !== '0xcF664087a5bB0237a0BAd6742852ec6c8d69A27a') {
        console.log(this.getInputAmount(0))
        console.log(this.getInputAmount(1))
        console.log(this.getThePath)
        await this.swapExactTokensForTokens(
            this.getInputAmount(0), this.getInputAmount(1), this.getThePath, token0, token1, this.metaMaskWallet, this.metaMaskAccount
        )
        this.setBtnState({swap: 'swapped'})
      }
      if (token0.oneZeroXAddress === '0xcF664087a5bB0237a0BAd6742852ec6c8d69A27a') {
        await this.swapETHForExactTokens(
            this.getInputAmount(0), this.getInputAmount(1), this.getThePath, token1, this.metaMaskWallet, this.metaMaskAccount
        )
        this.setBtnState({swap: 'swapped'})
      }
      if (token1.oneZeroXAddress === '0xcF664087a5bB0237a0BAd6742852ec6c8d69A27a') {
        await this.swapTokensForExactETH(
            this.getInputAmount(0), this.getInputAmount(1), this.getThePath, token0, this.metaMaskWallet, this.metaMaskAccount
        )
        this.setBtnState({swap: 'swapped'})
      }

      this.$emit('reload', true)
    }

  }
}
</script>