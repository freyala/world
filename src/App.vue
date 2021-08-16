<template>
  <div id="app">
    <div style="width: 0; height: 0">
      <div class="load-in-bg1"></div>
      <div class="load-in-bg2"></div>
      <div class="load-in-bg3"></div>
    </div>
    <transition name="fade" mode="out-in">
      <div v-if="loading" class="flex h-screen w-full">
        <div class="loading m-auto">
          Loading...
        </div>
      </div>
      <router-view v-else/>
    </transition>
  </div>
</template>

<script>
import {ethers} from "ethers";
import {mapGetters, mapActions} from "vuex";
import Freyala from "./plugins/artifacts/freyala.json";
import Staking from "./plugins/artifacts/staking.json";
import RouletteLow from "./plugins/artifacts/roulettelow.json";
import RouletteMedium from "./plugins/artifacts/roulettemedium.json";
import RouletteHigh from "./plugins/artifacts/roulettehigh.json";
import Topple from "./plugins/artifacts/topple.json";
import CoinFlip from "./plugins/artifacts/coinflip.json";
import JennyMine from "./plugins/artifacts/jennymines.json";
import wallet from "./plugins/wallet";

export default {
  name: 'Freyala',
  mixins: [wallet],
  data() {
    return {
      loading: true
    }
  },
  mounted() {
    this.setFirstTime()

    setTimeout(() => {
      this.loading = false
    }, 3000)

    setInterval(() => {
      this.fetchData()
    }, 1500)

    this.setFavourites()

    window.ethereum.on('accountsChanged', (accounts) => {
      this.connectWallet()
      this.setMetaMaskAccount(accounts[0])
    })

    window.ethereum.on('chainChanged', (chainId) => {
      if (chainId === '0x63564c40') {
        this.setChainStatus('correct')
        this.setChainId(1666600000)
      } else {
        this.setChainStatus('wrong')
        this.setChainId(chainId)
      }
    })
  },
  computed: {
    ...mapGetters([
      'loggedIn',
      'walletConnected',
      'metaMaskAccount',
      'metaMaskWallet',
      'firstTime'
    ])
  },
  methods: {
    ...mapActions([
      'setChainStatus',
      'setChainId',
      'setWalletConnectionStatus',
      'setMetaMaskAccount',
      'setAllowances',
      'setBalances',
      'setFavourites',
      'setFirstTime'
    ]),
    async fetchData() {
      if (document.hasFocus()) {
        const mainContract = new ethers.Contract(Freyala.address, Freyala.abi, this.metaMaskWallet.signer)
        const stakingContract = new ethers.Contract(Staking.address, Staking.abi, this.metaMaskWallet.signer)
        const jennyMineContract = new ethers.Contract(JennyMine.address, JennyMine.abi, this.metaMaskWallet.signer)

        const allowances = await Promise.all([
          mainContract.allowance(this.metaMaskAccount, Staking.address),
          mainContract.allowance(this.metaMaskAccount, RouletteMedium.address),
          mainContract.allowance(this.metaMaskAccount, Topple.address),
          mainContract.allowance(this.metaMaskAccount, CoinFlip.address),
          mainContract.allowance(this.metaMaskAccount, RouletteHigh.address),
          mainContract.allowance(this.metaMaskAccount, RouletteLow.address)
        ])

        const balances = await Promise.all([
          mainContract.balanceOf(this.metaMaskAccount),
          stakingContract.stakes(this.metaMaskAccount),
          stakingContract.calculateEarnings(this.metaMaskAccount),
          jennyMineContract.returnValuesOfMiner()
        ])

        await this.setAllowances(allowances)
        await this.setBalances(balances)
      }
    }
  }
}
</script>