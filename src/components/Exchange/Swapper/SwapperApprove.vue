<template>
  <div>
    <transition tag="div" name="approve-btn" class="inline-block absolute">
      <div v-if="this.getBtnState({approve: 'disabled'})"
           class="flex w-28 st5 st5-all justify-between items-center border dark:border-gray-600 border-gray-300 space-x-1 p-2 pl-3 rounded-full group select-none">
        <div class="flex flex-1 items-center justify-center">
          <p class="text-sm text-gray-300 dark:text-gray-600">Approve</p>
        </div>
        <i class="las la-times-circle text-xl text-gray-300 dark:text-gray-600"></i>
      </div>
    </transition>

    <transition tag="div" name="approve-btn" class="inline-block absolute">
      <div @click="approve()" v-if="this.getBtnState({approve: 'approve'})" class="flex w-28 group">
        <div class="grab-attention-glowing"></div>
        <div class="grab-attention cursor-pointer st5">
          <div class="flex flex-1 items-center justify-center">
            <p class="text-sm text-yellow-dark dark:text-yellow group-hover:text-gray-50 dark:group-hover:text-Dark-gray">
              Approve</p>
          </div>
          <i class="las la-pen-alt text-xl text-yellow-dark dark:text-yellow group-hover:text-gray-50 dark:group-hover:text-Dark-gray"></i>
        </div>
      </div>
    </transition>

    <transition tag="div" name="approve-btn" class="inline-block absolute">
      <div v-if="this.getBtnState({approve: 'approving'})" class="flex w-28 group">
        <div class="grab-attention-glowing"></div>
        <div class="grab-attention cursor-wait st5">
          <div class="flex flex-1 items-center justify-center">
            <p class="text-sm text-yellow-dark dark:text-yellow group-hover:text-gray-50 dark:group-hover:text-Dark-gray">
              Approving</p>
          </div>
          <i class="las la-sync text-xl animate-spin text-yellow-dark dark:text-yellow group-hover:text-gray-50 dark:group-hover:text-Dark-gray"></i>
        </div>
      </div>
    </transition>

    <transition tag="div" name="approve-btn" class="inline-block absolute">
      <div v-if="this.getBtnState({approve: 'approved'})"
           class="flex w-28 st5 justify-between items-center border border-yellow glow-yellow-light-md space-x-1 p-2 pl-3 rounded-full dark:bg-Dark-gray bg-gray-100 cursor-default">
        <div class="flex flex-1 items-center justify-center">
          <p class="text-sm text-yellow">Approved</p>
        </div>
        <i class="las la-check-circle text-xl text-yellow"></i>
      </div>
    </transition>
  </div>
</template>

<script>
import swap from "../../../shared/swap.js"
import wallet from "../../../plugins/wallet"
import {mapGetters, mapActions} from 'vuex'
import {ethers} from "ethers"

export default {
  name: 'SwapperApprove',
  mixins: [swap, wallet],
  computed: {
    ...mapGetters('exchange/swapper/buttons', ['getBtnState']),
    ...mapGetters('exchange/swapper', ['getInputAmount'])
  },
  async mounted() {
    this.token1 = this.getToken()['token1']

    if (this.token1.oneZeroXAddress === '0xcF664087a5bB0237a0BAd6742852ec6c8d69A27a') {
      this.setBtnState({approve: 'approved'})
      this.setBtnState({swap: 'swap'})
    } else {
      this.setBtnState({approve: 'approving'})
      let routerAddr = '0x24ad62502d1C652Cc7684081169D04896aC20f30'
      let parsedInput = this.getUnits(this.getInputAmount(0), this.token1)
      let allowance = await this.checkAllowance(this.token1, routerAddr, this.metaMaskWallet, this.metaMaskAccount)
      let isAllowanceSufficient = allowance > parsedInput

      if (isAllowanceSufficient) {
        this.setBtnState({approve: 'approved'})
        this.setBtnState({swap: 'swap'})
      } else {
        this.setBtnState({approve: 'approve'})
        this.setBtnState({swap: 'disabled'})
      }
    }
  },
  methods: {
    ...mapGetters('exchange', ['getToken']),
    ...mapActions('exchange/swapper/buttons', ['setBtnState']),

    async approve() {
      this.token1 = this.getToken()['token1']
      let routerAddr = '0x24ad62502d1C652Cc7684081169D04896aC20f30'
      this.setBtnState({approve: 'approving'})

      await this.approveSpending(this.token1, routerAddr, this.metaMaskWallet, this.metaMaskAccount)

      this.setBtnState({approve: 'approved'})
      if (this.token0Approved || this.getBtnState({approve: 'approved'})) {
        this.setBtnState({swap: 'swap'})
        this.setBtnState({remove: 'remove'})
      }
    }

  }
}
</script>