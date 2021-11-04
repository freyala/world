<template>
  <div class="flex pt-3">
    <div v-if="token('token1', 'token2')" class="flex w-full">
      <div @click="goTo('swapper')" class="ml-auto cursor-pointer">
        <p>next</p>
      </div>
    </div>

    <div v-else class="flex w-full">
      <p class="ml-auto">next</p>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'

export default {
  name: 'SwapTokenButtons',
  methods: {
    ...mapGetters('exchange', ['getToken']),
    ...mapActions('exchange', ['resetTokens', 'goTo']),

    token(tokenA, tokenB) {
      if (tokenA && tokenB) {
        return !!(this.getToken()[tokenA] && this.getToken()[tokenB])
      } else {
        return !!this.getToken()[tokenA]
      }
    }
  }
}
</script>