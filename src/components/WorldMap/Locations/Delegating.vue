<template>
  <transition name="slide">
    <div class="slide-in shadow-xl" v-if="openWindow === 'delegate' || openWindow === 'delegate-large'"
         :style="openWindow === 'delegate-large' ? 'width: 100%;' : 'width: 30vw;'"
         style="background: url('/images/ui/screen-bg.png') repeat-y; top: 64px; min-width: 500px; background-size: contain; overflow-y: scroll;">
      <div class="flex relative cursor-pointer" @click="setFavourite('delegate')">
        <img v-if="favourites.includes('delegate')" class="mx-auto" src="/images/ui/window-banner-favourite.png" alt="Banner">
        <img v-else class="mx-auto" src="/images/ui/window-banner-unfavourite.png" alt="Banner">
        <div class="absolute text-center w-full" style="top: 75px">
          <p class="text-2xl">Beacon of Light</p>
        </div>
      </div>

      <br>

      <p class="text-center text-xl">
        Coming soon...
      </p>


      <br>
      <hr>
      <br>
      <p class="text-xl pb-24">
        Seeing the limitless possibilities XYA had to offer, Regent Carroway sought out to harness all the magical power
        from the world’s core. He ordered a beacon to be constructed, which siphoned the world’s magic and shot up a
        blinding light to the sky, forever making the Freyala kingdom’s presence known. The regent proudly showed this
        beacon to Zarius, the village elder and his dear friend. Zarius was shocked to see these elaborate schemes that
        Carroway had been planning. The village elder turned his back away, determined to inform the public of his
        findings, and how Carroway was attempting to seize ultimate power.

        The regent shot Zarius a cold stare, then grasped tightly onto the village elder and propelled him towards the
        unstable beacon core before ultimately letting go. Carroway had parted ways with his dear friend. Yet, in front
        of him was the future. And this was all that mattered.
      </p>
    </div>
  </transition>
</template>

<script>
import wallet from "../../../plugins/wallet"
import {mapActions, mapGetters} from "vuex";


export default {
  name: 'Delegating',
  mixins: [wallet],
  computed: {
    ...mapGetters([
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