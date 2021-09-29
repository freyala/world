<template>
  <div id="app">
    <div v-if="$router.name !== 'login'" class="absolute w-full top-0 left-0 opacity-25"
         style="background: url('/images/map/worldmap.png') no-repeat; background-size: cover; min-height: 100vh"></div>

    <div style="width: 0; height: 0">
      <div class="load-in-bg1"></div>
      <div class="load-in-bg2"></div>
      <div class="load-in-bg3"></div>
    </div>
    <transition name="fade" mode="out-in">
      <div v-if="loading" class="flex flex-wrap h-screen w-full">

        <div class="m-auto text-center">
          <div class="w-full flex">
            <img class="w-24 h-24 m-auto" src="/images/XYA.png" alt="XYA logo"
                 style="animation: rotation 2s infinite linear;">
          </div>
          <br>
          <p class="text-2xl">Loading...</p>
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
import Slots from "./plugins/artifacts/slots.json";
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
  async mounted() {
    this.setFirstTime()

    if (window.ethereum === undefined && this.$route.name !== 'login') {
      await this.$router.push({name: 'login'})
      this.loading = false
      return
    } else if (window.ethereum === undefined) {
      this.loading = false
      return
    } else {
      const succeeded = await this.connectWallet()

      if (succeeded === false && this.$route.name !== 'login') {
        await this.$router.push({name: 'login'})
        this.loading = false
      }
    }

    setTimeout(() => {
      this.loading = false
    }, 3000)

    setInterval(() => {
      this.loading = false
      this.fetchData()
    }, 1500)

    this.setFavourites()

    window.ethereum.on('accountsChanged', (accounts) => {
      if (this.$route.name !== 'login') {
        window.location.href = '#/login'

        this.connectWallet()
        this.setMetaMaskAccount(accounts[0])
      } else {
        this.connectWallet()
        this.setMetaMaskAccount(accounts[0])
      }
    })

    window.ethereum.on('chainChanged', (chainId) => {
      if (this.$route.name !== 'login') {
        window.location.href = '#/login'

        if (chainId === '0x63564c40') {
          this.setChainStatus('correct')
          this.setChainId(1666600000)
        } else {
          this.setChainStatus('wrong')
          this.setChainId(chainId)
        }
      } else {
        if (chainId === '0x63564c40') {
          this.setChainStatus('correct')
          this.setChainId(1666600000)
        } else {
          this.setChainStatus('wrong')
          this.setChainId(chainId)
        }
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
          mainContract.allowance(this.metaMaskAccount, RouletteLow.address),
          mainContract.allowance(this.metaMaskAccount, Slots.address)
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