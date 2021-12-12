<template>
  <section id="login-container"
           style="background: url('/images/map/worldmap_small.png') no-repeat; background-size: cover; min-height: 100vh;"
           class="flex w-full px-4 md:px-16 lg:px-32 xl:px-64">
    <div style="background: #1c1c1c; z-index: 9999; overflow-y: auto;max-width: 650px;"
         class="m-auto screen rounded-2xl w-full">
      <section id="section-i-1" class="border-b-4 border-bbrown"
               style="background: url('/images/SVG/homepage-bg-top.svg') no-repeat top right">
        <div class="container mx-auto text-center py-10">
          <h1 class="text-2xl text-primary-alt font-semibold">
            Login
          </h1>
        </div>
      </section>

      <div class="py-8 px-4 relative">
        <div class="cursor-pointer flex h-full" @click="connectToWallet()">
          <div class="w-full flex" v-if="chainStatus === 'Install metamask to continue.'">
            <a class="w-full flex" href="https://metamask.io/download.html" target="_blank">
              <button class="m-auto xya-btn" v-if="chainStatus !== true" v-html="chainStatus"></button>
            </a>
          </div>
          <div class="w-full flex" v-else-if="chainStatus === 'Wrong network. <br> Click to connect to Harmony.'">
            <button @click="changeNetwork()" class="m-auto xya-btn" v-if="chainStatus !== true"
                    v-html="chainStatus"></button>
          </div>
          <div class="w-full flex" v-else>
            <button class="m-auto xya-btn" v-if="chainStatus !== true" v-html="chainStatus"></button>

            <button class="m-auto xya-btn" v-else>Connect Wallet</button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import wallet from "../plugins/wallet"
import {mapGetters} from "vuex"
import {ethers} from "ethers";

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

<style scoped>
#login-container {
  --var-slots-bg: #1e2b22;
  --var-slots-dark-bg: #181f1f;
  --var-hilight-color: #43ac6b;
  --var-hilight-strong: #8cd1a6;
  --var-soft-shadow-color: #263c2f;
  --var-shadow-color: #0e1111;
  --var-border-radius: 12px;
  border-radius: 12px;
}

#tutorial p > span {
  font-weight: bold;
  color: #8cd1a6 !important;
}

#tutorial a:hover {
  color: #8cd1a6;
}

.inner-shadow {
  -moz-box-shadow: inset 0 0 12px var(--var-shadow-color);
  -webkit-box-shadow: inset 0 0 12px var(--var-shadow-color);
  box-shadow: inset 0 0 12px var(--var-shadow-color);
}

.txt-hilight {
  font-weight: bold;
  color: #8cd1a6 !important;
}

.txt-tutorial {
  color: rgba(255, 255, 255, 0.75);
}

.highlight-border {
  border-width: 1px;
  border-style: solid;
  border-image: linear-gradient(225deg,
  var(--var-hilight-color),
  var(--var-soft-shadow-color),
  var(--var-soft-shadow-color)) 1 25%;
}

.xya-btn {
  background-color: var(--var-slots-bg);
  border-radius: var(--var-border-radius);
  box-sizing: border-box;
  color: #8cd1a7c7;
  display: block;
  font-size: max(calc(1vw - 1px), 14px);
  padding: 10px;
  position: relative;
  text-decoration: none;
  z-index: 2;
  transition: all 1s ease-out;
  width: 85%;
}

.xya-btn:hover {
  background-image: linear-gradient(190deg,
  var(--var-hilight-strong) 5%,
  var(--var-hilight-color) 10%,
  var(--var-soft-shadow-color),
  var(--var-slots-bg));
  color: #fff;
}


.xya-btn:hover span {
  background: transparent;
}
</style>