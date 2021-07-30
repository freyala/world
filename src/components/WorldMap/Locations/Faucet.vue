<template>
  <transition name="slide">
      <div class="slide-in shadow-xl" v-if="openWindow === 'faucet' || openWindow === 'faucet-large'"
           :style="openWindow === 'casino-large' ? 'width: 100%;' : 'width: 30vw;'"
           style="background: url('/images/ui/screen-bg.png') repeat-y; top: 64px; min-width: 500px; background-size: contain; overflow-y: scroll;">
        <div class="flex relative">
          <img class="mx-auto" src="/images/ui/window-banner.png" alt="Banner">
          <div class="absolute text-center w-full" style="top: 75px">
            <p class="text-2xl">Enter the casino</p>
          </div>
        </div>
        <br>
        <p class="text-xl pb-24">
          After the monarch’s defenses grew stronger, thieves and outcasts retreated to the outskirts of the
          Freyala
          kingdom. Roaming in a secluded alleyway, deadly games of chance were hosted for those that were
          adventures.
          To give these risky wagers more recognition, a covert organization called ‘Luderion’ was established,
          of
          which no one knew the founder. Word of this underground activity quickly spread amongst the Freyfolk.
          <br>
          <br>
          The most popular tale is that of an infamous hoodlum named Tariel. He was once the undefeated champion
          of
          these games, and eventually challenged the founder of Luderion himself to a duel, hoping to seize the
          position. But he was defeated after what seemed like mere minutes. Unable to pay his crippling debt,
          Tariel
          fell into madness and was found dead in the alleyway the following day. Despite Regent Carroway’s best
          attempts, Luderion was never successfully shut down.
        </p>
      </div>
    </transition>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: 'Faucet',
  computed: {
    ...mapGetters(['loggedIn', 'openWindow'])
  }
}
</script>