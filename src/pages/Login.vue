<template>
  <section style="background: url('/images/map/worldmap.png') no-repeat; background-size: cover; min-height: 100vh;"
           class="flex w-full px-4 md:px-16 lg:px-32 xl:px-64">
    <div style="background: #1c1c1c; z-index: 9999; overflow-y: auto;max-width: 650px;"
         class="m-auto screen rounded-2xl w-full">
      <section id="section-i-1" class="border-b-4 border-primary-alt"
               style="background: url('/images/SVG/homepage-bg-top.svg') no-repeat top right">
        <div class="container mx-auto text-center pt-8 md:pt-16 pb-8 md:pb-16">
          <h1 class="text-2xl md:text-5xl text-primary-alt font-semibold">
            Login
          </h1>
        </div>
      </section>

      <div class="py-8 px-4 md:p-16 relative">
        <div class="cursor-pointer flex h-full" @click="connectToWallet()">
          <button
              class="m-auto tracking-widest uppercase bg-dark py-4 px-8 border border-yellow rounded-md text-sm md:text-lg font-semibold"
              v-if="chainStatus !== true" v-html="chainStatus">
          </button>
          <button
              class="m-auto tracking-widest uppercase bg-dark py-4 px-8 border border-yellow rounded-md text-sm md:text-lg font-semibold"
              v-else>Connect Wallet
          </button>
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