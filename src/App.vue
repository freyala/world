<template>
  <div id="app">
    <div class="hidden lg:block">
      <transition name="fade" mode="out-in">
        <router-view/>
      </transition>
    </div>
    <div class="block lg:hidden">
      <div class="flex w-screen h-screen">
        <p class="m-auto text-center">
          MOBILE NOT SUPPORTED YET <br>
          ETA LATE AUGUST
        </p>
      </div>
    </div>
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
      'metaMaskWallet'
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
      'setFavourites'
    ]),
    async fetchData() {
      if (document.hasFocus()) {
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
          stakingContract.calculateEarnings(this.metaMaskAccount)
        ])

        await this.setAllowances(allowances)
        await this.setBalances(balances)
      }
    }
  }
}
</script>