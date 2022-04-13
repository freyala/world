<template>
  <section id="login-container"
           style="background: url('/img/map/XYAMapV2_6.png') no-repeat; background-size: cover; min-height: 100vh;"
           class="flex w-full px-4 md:px-16 lg:px-32 xl:px-64">
    <div style="z-index: 9999; overflow-y: auto;max-width: 850px;"
         class="m-auto screen bg-primary-bg w-full py-24">
      <section id="section-i-1">
        <div class="container mx-auto text-center">
          <h1 class="text-3xl text-primary-head font-semibold">
            Login
          </h1>
        </div>
      </section>

      <div class="pt-12 px-4 relative">
        <div class="cursor-pointer flex h-full" @click="connectToWallet()">
          <div class="w-full flex" v-if="chainStatus === 'Install metamask to continue.'">
            <a class="w-full flex" href="https://metamask.io/download.html" target="_blank">
              <button v-if="chainStatus !== true" v-html="chainStatus"></button>
            </a>
          </div>
          <div @click="changeNetwork()" class="w-full flex" v-else-if="chainStatus === 'Connect'">
            <button v-if="chainStatus !== true" class="mx-auto xya-btn relative text-xl">
              {{ chainStatus }}
            </button>
          </div>
          <div class="w-full flex" v-else>

            <button v-if="chainStatus !== true" class="mx-auto xya-btn relative text-xl">
              {{ chainStatus }}
            </button>

            <button v-else class="mx-auto xya-btn relative text-xl">
              Connect Wallet
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import wallet from "../plugins/wallet"
import {mapGetters} from "vuex"

export default {
  name: 'Login',
  mixins: [wallet],
  data() {
    return {
      loading: false
    }
  },
  computed: {
    ...mapGetters([
      'chainID',
      'chainStatus',
      'loggedIn',
      'walletConnected',
      'metaMaskAccount',
      'metaMaskWallet'
    ])
  },
  methods: {
    async changeNetwork() {
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{chainId: '0x63564C40'}],
        })
      } catch {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: "0x63564C40",
              chainName: "Harmony Mainnet Shard 0",
              nativeCurrency: {
                name: "Harmony One",
                symbol: "ONE",
                decimals: 18
              },
              rpcUrls: ["https://api.harmony.one/"],
              blockExplorerUrls: ["https://explorer.harmony.one/"]
            }]
        })
      }
    },
    async connectToWallet() {
      this.loading = true

      await this.connectWallet().then((success) => {
        if (success === true) {
          this.loading = false
          this.$router.push({name: 'world-map'})
        } else {
          this.loading = false
        }
      })
    }
  }
}
</script>