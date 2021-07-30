<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>

<script>
import {ethers} from "ethers";
import {mapGetters, mapActions} from "vuex";
import Freyala from "./plugins/artifacts/freyala.json";
import Staking from "./plugins/artifacts/staking.json";
import Roulette from "./plugins/artifacts/roulette.json";
import Topple from "./plugins/artifacts/topple.json";
import CoinFlip from "./plugins/artifacts/coinflip.json";
import wallet from "./plugins/wallet";

export default {
  name: 'Freyala',
  mixins: [wallet],
  mounted() {
    setInterval(() => {
      this.fetchData()
    }, 1500)

    this.setFavourites()

    window.ethereum.on('accountsChanged', (accounts) => {
      this.setMetaMaskAccount(accounts[0])
    })
  },
  computed: {
    ...mapGetters([
      'loggedIn',
      'walletConnected',
      'metaMaskAccount',
      'metaMaskWallet'
    ])
  },
  methods: {
    ...mapActions([
      'setWalletConnectionStatus',
      'setMetaMaskAccount',
      'setAllowances',
      'setBalances',
      'setFavourites'
    ]),
    async fetchData() {
      const mainContract = new ethers.Contract(Freyala.address, Freyala.abi, this.metaMaskWallet.signer)
      const stakingContract = new ethers.Contract(Staking.address, Staking.abi, this.metaMaskWallet.signer)

      const allowances = await Promise.all([
        mainContract.allowance(this.metaMaskAccount, Staking.address),
        mainContract.allowance(this.metaMaskAccount, Roulette.address),
        mainContract.allowance(this.metaMaskAccount, Topple.address),
        mainContract.allowance(this.metaMaskAccount, CoinFlip.address)
      ])

      const balances = await Promise.all([
        mainContract.balanceOf(this.metaMaskAccount),
        stakingContract.stakes(this.metaMaskAccount),
        stakingContract.stakeRewards(this.metaMaskAccount),
      ])

      await this.setAllowances(allowances)
      await this.setBalances(balances)
    }
  }
}
</script>