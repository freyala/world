<template>
  <div class="flex flex-wrap h-16 absolute z-50 top-0 left-0 p-4 md:p-8 opacity-90">
    <div class="hidden md:block w-auto rounded-full bg-white p-2 z-20">
      <div class="w-16 md:w-24 h-16 md:h-24">
        <img src="/images/XYA.png" alt="XYA logo">
      </div>
    </div>
    <div class="w-auto -ml-14 z-10 md:h-12 pt-3">
      <div class="my-auto w-full flex" v-if="walletConnected && chainStatus === 'correct'">
        <p class="text-lg bg-white pl-16">
          Balance
        </p>
        <p class="w-auto md:text-lg bg-white rounded-r-lg px-4">
          {{ loadingBalances ? 'fetching...' : `${userBalance}` }} XYA
        </p>
      </div>
      <div class="w-full my-auto py-1 flex rounded-r-lg" v-if="walletConnected && chainStatus === 'correct'">
        <p class="text-lg bg-white pl-16">
          Staked
        </p>
        <p class="w-auto md:text-lg bg-white rounded-r-lg px-4">
          {{ loadingBalances ? 'fetching...' : `${rewardBalance}` }} XYA
        </p>
      </div>
      <div class="w-full my-auto flex rounded-r-lg" v-if="walletConnected && chainStatus === 'correct'">
        <p class="text-lg bg-white pl-16">
          Rewards
        </p>
        <p class="w-auto md:text-lg bg-white rounded-r-lg px-4">
          {{ loadingBalances ? 'fetching...' : `${rewardBalance}` }} | {{ loadingBalances ? 'fetching...' : `${miningBalance}` }}  XYA
        </p>
      </div>
    </div>
    <div class="w-full mt-2 md:mt-0">
      <div class="flex md:ml-20" v-if="walletConnected && chainStatus === 'correct'">
        <div :key="favourite" v-for="favourite in favourites" @click="$store.dispatch('setOpenWindow', favourite)" class="md:opacity-75 hover:opacity-100 w-12 h-12 cursor-pointer flex fav-bg mr-2 bgshadow">
          <router-link class="m-auto max-h-9 max-w-9" :to="{ name: favourite === 'delegate' ? 'delegating' : favourite }">
            <img style="max-height: 50px;" class="pl-1 -mt-1" v-if="favourite === 'staking'" src="/images/map/Drill.png" alt="Drill">
            <img style="max-height: 50px;" class="p-1 -mt-1" v-if="favourite === 'faucet'" src="/images/map/Soup.png" alt="Soup">
            <img style="max-height: 50px;" class="p-1 -mt-1" v-if="favourite === 'delegate'" src="/images/map/Beacon.png" alt="Beacon">
            <img style="max-height: 50px;" class="p-1 -mt-1" v-if="favourite === 'casino'" src="/images/map/Casino.png" alt="Casino">
            <img style="max-height: 50px;" class="px-2 -mt-1" v-if="favourite === 'jennymines'" src="/images/map/Mine.png" alt="Mine">
            <img style="max-height: 50px;" class="pl-2 -mt-1" v-if="favourite === 'governance'" src="/images/map/Palace.png" alt="Palace">
          </router-link>
        </div>
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
      'favourites',
      'chainID',
      'chainStatus',
      'loadingBalances',
      'userBalance',
      'stakingBalance',
      'rewardBalance',
      'miningBalance',
      'loggedIn',
      'walletConnected',
      'metaMaskAccount',
      'metaMaskWallet'
    ])
  }
}
</script>