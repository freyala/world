<template>
  <div class="flex h-16 absolute z-50 top-0 left-0 w-full"
       style="background: url('/images/ui/top-bar.png') repeat-x; background-size: contain">
    <div class="my-auto text-center w-1/4" v-if="walletConnected && chainStatus === 'correct'">
      <p class="text-xl">
        In wallet: {{ loadingBalances ? 'fetching...' : `${userBalance} XYA` }}
      </p>
    </div>
    <div class="my-auto text-center w-1/4" v-if="walletConnected && chainStatus === 'correct'">
      <p class="text-xl">
        In staking: {{ loadingBalances ? 'fetching...' : `${stakingBalance} XYA` }}
      </p>
    </div>
    <div class="my-auto text-center w-1/4" v-if="walletConnected && chainStatus === 'correct'">
      <p class="text-xl">
        Staking rewards: {{ loadingBalances ? 'fetching...' : `${rewardBalance} XYA` }}
      </p>
    </div>
    <div class="my-auto ml-auto text-center flex" :class="chainStatus === 'wrong' ? 'w-1/2' : 'w-1/4'">
      <div class="cursor-pointer mx-auto" @click="connectWallet()">
        <p class="text-xl" v-if="chainStatus === 'wrong'">Connect to the Harmony Shard 0 network</p>
        <p class="text-xl" v-else-if="walletConnected">Disconnect wallet</p>
        <p class="text-xl" v-else-if="!walletConnected">Connect Wallet</p>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import wallet from '../../plugins/wallet'

export default {
  name: 'TopBar',
  mixins: [wallet],
  computed: {
    ...mapGetters([
      'chainID',
      'chainStatus',
      'loadingBalances',
      'userBalance',
      'stakingBalance',
      'rewardBalance',
      'loggedIn',
      'walletConnected',
      'metaMaskAccount',
      'metaMaskWallet'
    ])
  }
}
</script>