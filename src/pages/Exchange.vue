<template>
  <section style="background: url('/images/map/worldmap_small.png') no-repeat; background-size: cover; min-height: 100vh"
           class="flex p-4 md:p-16 lg:px-32">
    <div style="background: #1c1c1c; z-index: 9999; overflow-y: auto" class="screen rounded-2xl w-full">
      <div id="exchange" class="relative max-w-screen-xl mx-auto items-center flex flex-1 justify-center xl:px-0 px-3 text-gray-500">

        <div v-if="this.getStepState('swap')">
          <Swap @triggerModal="triggerModal"/>
        </div>

        <div v-if="this.getStepState('swapModal')">
          <swapModal :whichToken="whichToken"/>
        </div>

        <div v-if="this.getStepState('swapper')">
          <Swapper :key="forceR" @reload="reload"/>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Swap from '../components/Exchange/Swap'
import SwapModal from '../components/Exchange/SwapModal'
import Swapper from '../components/Exchange/Swapper'

import {mapActions, mapGetters} from 'vuex'
import wallet from "../plugins/wallet"

export default {
  name: 'Exchange',
  mixins: [wallet],
  components: {
    Swap,
    SwapModal,
    Swapper,
  },
  data() {
    return {
      whichToken: '',
      forceR: 0
    }
  },
  async created() {
    await this.connectWallet()
  },
  computed: {
    ...mapGetters('exchange', ['getStepState'])
  },
  methods: {
    ...mapActions('exchange', ['goTo']),
    reload() {
      this.forceR++
    },
    triggerModal(token) {
      this.whichToken = token
      this.goTo('swapModal')
    }
  }
}
</script>