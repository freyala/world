<template>
  <transition name="slide" v-if="walletConnected && chainStatus === 'correct'">
    <div class="slide-in shadow-xl" v-if="openWindow === 'casino' || openWindow.startsWith('casino-large')"
         :style="openWindow.startsWith('casino-large') ? 'width: 100%;' : 'width: 30vw;'"
         style="background: url('/images/ui/screen-bg.png') repeat-y; top: 64px; min-width: 500px; background-size: contain; overflow-y: scroll;">
      <div class="flex relative cursor-pointer" @click="setFavourite('casino')">
        <img v-if="favourites.includes('casino')" class="mx-auto" src="/images/ui/window-banner-favourite.png"
             alt="Banner">
        <img v-else class="mx-auto" src="/images/ui/window-banner-unfavourite.png" alt="Banner">
        <div class="absolute text-center w-full" style="top: 80px; line-height: 0.25">
          <small>Click to favourite</small>
          <p class="text-2xl">The Luderion Alleyway</p>
        </div>
      </div>

      <div class="flex text-center mt-4">
        <div class="ml-auto w-60 pr-2">
          <button type="button"
                  class="w-full rounded-none border border-yellow bg-transparent hover:bg-yellow hover:text-brown px-4 py-2 min-h-12"
                  @click="openWindow === 'casino-large-roulette' ? $store.dispatch('setOpenWindow', 'casino') : $store.dispatch('setOpenWindow', 'casino-large-roulette')">
            {{ openWindow === 'casino-large-roulette' ? 'Leave' : 'roulette lobby' }}
          </button>
        </div>
        <div class="mr-auto w-60 pl-2">
          <button type="button"
                  class="w-full rounded-none border border-yellow bg-transparent hover:bg-yellow hover:text-brown px-4 py-2 min-h-12"
                  @click="openWindow === 'casino-large-coinflip' ? $store.dispatch('setOpenWindow', 'casino') : $store.dispatch('setOpenWindow', 'casino-large-coinflip')">
            {{ openWindow === 'casino-large-coinflip' ? 'Leave' : 'coin flip lobby' }}
          </button>
        </div>
      </div>
      <br>

      <coin-flip v-if="openWindow === 'casino-large-coinflip'"></coin-flip>
      <roulette v-if="openWindow === 'casino-large-roulette'"></roulette>

      <div v-if="openWindow === 'casino-large'">
        <br>
        <br>
        <hr>
        <br>
        <br>
        <br>
        <br>
      </div>
      <div v-else>
        <br>
        <hr>
        <br>
      </div>

      <p class="text-xl pb-24">
        After the monarch’s defenses grew stronger, thieves and outcasts retreated to the outskirts of the Freyala
        kingdom. Roaming in a secluded alleyway, deadly games of chance were hosted for those that were adventures. To
        give these risky wagers more recognition, a covert organization called ‘Luderion’ was established, of which no
        one knew the founder. Word of this underground activity quickly spread amongst the Freyfolk.
        <br>
        <br>
        The most popular tale is that of an infamous hoodlum named Tariel. He was once the undefeated champion of these
        games, and eventually challenged the founder of Luderion himself to a duel, hoping to seize the position. But he
        was defeated after what seemed like mere minutes. Unable to pay his crippling debt, Tariel fell into madness and
        was found dead in the alleyway the following day. Despite Regent Carroway’s best attempts, Luderion was never
        successfully shut down.
      </p>
    </div>
  </transition>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import wallet from "../../../../plugins/wallet";

import CoinFlip from "./Coinflip"
import Roulette from "./Roulette"

export default {
  name: 'Casino',
  mixins: [wallet],
  components: {
    CoinFlip,
    Roulette
  },
  computed: {
    ...mapGetters([
      'chainID',
      'chainStatus',
      'loggedIn',
      'walletConnected',
      'metaMaskAccount',
      'metaMaskWallet',
      'openWindow',
      'favourites'
    ])
  },
  methods: {
    ...mapActions([
      'setFavourite'
    ])
  }
}
</script>