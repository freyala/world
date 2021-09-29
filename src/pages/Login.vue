<template>
  <section style="background: url('/images/map/worldmap.png') no-repeat; background-size: cover; min-height: 100vh;"
           class="flex w-full px-4 md:px-16 lg:px-32 xl:px-64">
    <div style="z-index: 9999; overflow-y: auto; max-width: 650px;"
         class="m-auto screen bg-white rounded-2xl w-full">
      <section id="section-i-1" class="border-b-4 border-primary-alt"
               style="background: url('/images/SVG/homepage-bg-top.svg') no-repeat top right">
        <div class="container mx-auto text-center pt-8 md:pt-16 pb-8 md:pb-16">
          <h1 class="text-2xl md:text-5xl text-primary-alt font-semibold">
            Login
          </h1>
        </div>
      </section>

      <div class="py-8 px-4 md:p-16 relative">

        <div class="cursor-pointer flex h-full" @click="$router.push({ name: 'world-map' })">
          <button
              class="m-auto tracking-widest uppercase bg-gradient-to-r from-primary to-secondary py-4 px-8 rounded-md text-white text-sm md:text-xl font-semibold"
              v-if="walletConnected">Continue
          </button>
        </div>

        <br>

        <div class="cursor-pointer flex h-full" @click="connectWallet()">
          <button
              class="m-auto tracking-widest uppercase bg-gradient-to-r from-primary to-secondary py-4 px-8 rounded-md text-white text-sm md:text-xl font-semibold"
              v-if="chainStatus === 'wrong'">Connect to the Harmony Shard 0 network
          </button>
          <button
              class="m-auto tracking-widest uppercase bg-gradient-to-r from-primary to-secondary py-4 px-8 rounded-md text-white text-sm md:text-xl font-semibold"
              v-else-if="walletConnected">Disconnect wallet
          </button>
          <button
              class="m-auto tracking-widest uppercase bg-gradient-to-r from-primary to-secondary py-4 px-8 rounded-md text-white text-sm md:text-xl font-semibold"
              v-else-if="!walletConnected">Connect Wallet
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import wallet from "../plugins/wallet"
import {mapActions, mapGetters} from "vuex";

export default {
  name: 'Slots',
  mixins: [wallet],
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
    ...mapActions([
      ''
    ])
  }
}
</script>