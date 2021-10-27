<template>
  <div class="flex flex-wrap h-16 absolute z-50 top-0 w-full left-0 p-4 md:p-8 opacity-90">
    <div class="w-auto md:w-full flex flex-wrap">
      <div class="hidden md:block w-auto rounded-full bg-white p-2 z-20">
        <div class="w-16 md:w-24 h-16 md:h-24">
          <img src="/images/XYA.png" alt="XYA logo">
        </div>
      </div>
      <div class="w-auto -ml-14 z-10 md:h-12 pt-3">
        <div class="my-auto w-full flex">
          <p class="text-lg bg-white pl-16">
            Balance
          </p>
          <p class="w-auto md:text-lg bg-white rounded-r-lg px-4">
            {{ loadingBalances ? 'fetching...' : `${walletBalance}` }} XYA
          </p>
        </div>
        <div class="w-full my-auto py-1 flex rounded-r-lg">
          <p class="text-lg bg-white pl-16">
            Staked
          </p>
          <p class="w-auto md:text-lg bg-white rounded-r-lg px-4">
            {{ loadingBalances ? 'fetching...' : `${stakingBalance}` }} XYA
          </p>
        </div>
        <div class="w-full my-auto flex rounded-r-lg">
          <p class="text-lg bg-white pl-16">
            Rewards
          </p>
          <p class="w-auto md:text-lg bg-white rounded-r-lg px-4">
            {{ loadingBalances ? 'fetching...' : `${rewardBalance}` }} XYA
          </p>
        </div>
      </div>
      <div class="w-full mt-2 md:mt-0">
        <div class="flex md:ml-20">
          <div :key="favourite" v-for="favourite in favourites"
               class="md:opacity-75 hover:opacity-100 w-12 h-12 cursor-pointer flex fav-bg mr-2 bgshadow">
            <router-link class="m-auto max-h-9 max-w-9"
                         :to="{ name: favourite === 'delegate' ? 'delegating' : favourite }">
              <img style="max-height: 50px;" class="pl-1 -mt-1" v-if="favourite === 'staking'"
                   src="/images/map/Drill.png" alt="Drill">
              <img style="max-height: 50px;" class="p-1 -mt-1" v-if="favourite === 'faucet'" src="/images/map/Soup.png"
                   alt="Soup">
              <img style="max-height: 50px;" class="p-1 -mt-1" v-if="favourite === 'delegate'"
                   src="/images/map/Beacon.png" alt="Beacon">
              <img style="max-height: 50px;" class="p-1 -mt-1" v-if="favourite === 'casino'"
                   src="/images/map/Casino.png" alt="Casino">
              <img style="max-height: 50px;" class="px-2 -mt-1" v-if="favourite === 'jennymines'"
                   src="/images/map/Mine.png" alt="Mine">
              <img style="max-height: 50px;" class="pl-2 -mt-1" v-if="favourite === 'governance'"
                   src="/images/map/Palace.png" alt="Palace">
              <img style="max-height: 50px;" class="p-1 -mt-1" v-if="favourite === 'plots'"
                   src="/images/map/FreyalaPlots.png" alt="Plots">
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="w-1/5 md:hidden flex flex-wrap">
      <drop-down-menu></drop-down-menu>
    </div>
  </div>
</template>

<script>
import Freyala from "../../plugins/artifacts/freyala.json";
import Staking from "../../plugins/artifacts/staking.json";
import {mapGetters, mapActions} from 'vuex'
import wallet from '../../plugins/wallet'
import dropDownMenu from './DropDownMenu'
import {ethers} from 'ethers'

export default {
  name: 'TopBar',
  mixins: [wallet],
  data() {
    return {
      mainContract: {},
      stakingContract: {},
      dataInterval: undefined,
      balances: [],
      loadingBalances: true,
      topBarLoaded: false,
      walletBalance: 0,
      stakingBalance: 0,
      rewardBalance: 0,
    }
  },
  components: {
    dropDownMenu
  },
  computed: {
    ...mapGetters([
      'favourites',
      'metaMaskAccount',
      'metaMaskWallet'
    ])
  },
  async mounted() {
    this.mainContract = await new ethers.Contract(Freyala.address, Freyala.abi, this.metaMaskWallet.signer)
    this.stakingContract = await new ethers.Contract(Staking.address, Staking.abi, this.metaMaskWallet.signer)

    await this.fetchData()
    this.topBarLoaded = true

    this.dataInterval = setInterval(() => {
      this.fetchData()
    }, 4000)
  },
  beforeDestroy() {
    clearInterval(this.dataInterval)
  },
  methods: {
    async fetchData() {
      const balances = await Promise.all([
        this.mainContract.balanceOf(this.metaMaskAccount),
        this.stakingContract.stakes(this.metaMaskAccount),
        this.stakingContract.calculateEarnings(this.metaMaskAccount),
      ])

      this.walletBalance = (balances[0] / Math.pow(10, 18)).toFixed(2)
      this.stakingBalance = (balances[1] / Math.pow(10, 18)).toFixed(2)
      this.rewardBalance = (balances[2] / Math.pow(10, 18)).toFixed(2)

      this.loadingBalances = false
    }
  }
}
</script>