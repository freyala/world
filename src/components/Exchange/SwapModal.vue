<template>
  <div
      class="flex ss:h-ss xs:h-sm bg-slightGray dark:bg-slightDark center-component flex-col z-60 text-gray-500 dark:text-gray-300 ss:w-80 xs:w-96 rounded-3xl border border-black border-opacity-10">
    <div id="modalTokenList" class="flex z-30 w-full overflow-x-hidden" style="margin-top: 98px">
      <div class="flex text-gray-500 dark:text-gray-300"
           v-for="(network, index) in this.retrieveTokens(search)" :key="index">
        <div class="w-full grid grid-cols-5 gap-2 p-2">

          <div class="flex h-4 col-span-5 px-2 py-4  items-center space-x-2">
            <img :src="network.icon" class="h-4" alt="">
            <p class="flex text-sm items-center dark:text-gray-300">{{ network.name }}</p>
          </div>

          <div @click="selectToken(token)" v-for="(token, idx) in network.tokens" :key="idx"
               class="flex flex-col space-y-2 h-16 items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer">
            <img :src="token.imgSrc" alt="" class="h-8 w-8 rounded-full flex items-center justify-center">
            <p class="text-xs dark:text-gray-300">
              {{ token.Symbol }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'

export default {
  name: 'swapModal',
  data() {
    return {
      search: ''
    }
  },
  props: {
    whichToken: String
  },
  computed: {
    ...mapGetters('exchange', ['retrieveTokens']),
  },
  methods: {
    ...mapActions('exchange', ['setToken', 'goTo']),
    ...mapGetters('exchange', ['getToken']),

    selectToken(token) {
      if (this.whichToken === 'token1') {
        if (this.getToken()['token2'] && this.getToken()['token2'].Symbol === token.Symbol) {
        } else {
          this.setToken({tokenRef: this.whichToken, token: token})
          this.search = ''
          this.goTo('swap')
        }
      }
      if (this.whichToken === 'token2') {
        if (this.getToken()['token1'] && this.getToken()['token1'].Symbol === token.Symbol) {
        } else {
          this.setToken({tokenRef: this.whichToken, token: token})
          this.search = ''
          this.goTo('swap')
        }
      }
    },
  },
}
</script>
