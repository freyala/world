<template>
  <div ref='container' class='piggie-menu-container top-0 bottom-0 w-full' style=''>

    <div class='w-full flex flex-col justify-center mt-4'>
      <div class='w-full flex flex-row justify-center items-center'>
        <h2 class='h-auto w-full ml-12 text-center mt-2 sm:text-2xl text-xl text-white mb-4 z-10'>Piggy Bank
        </h2>

        <div class='cursor-pointer '>
          <i v-on:click='$emit("close")'
             class='sm:text-2xl text-xl scale-anim opacity-50 hover:opacity-100 text-white ml-auto mr-6 fa fa-close'></i>
        </div>
      </div>

      <div
          class="w-8/10 h-8 mb-2 py-4 mx-auto rounded-xl pink-border-bottom bg-white flex flex-col justify-center text-center items-center pink sm:text-lg text-sm cursor-pointer hover:opacity-100">
        <p class='opacity-75'>Current Epoch {{currentEpoch}}</p>
      </div>
      <div
          class="w-8/10 h-8 mb-4 py-4 mx-auto rounded-xl pink-border-bottom bg-white flex flex-col justify-center text-center items-center pink sm:text-lg text-sm cursor-pointer hover:opacity-100">
        <p class='opacity-75'>Registered Piggies {{currentEpochPiggyCount}}</p>
      </div>
      <h2 class='h-auto w-full text-center mt-2 sm:text-2xl text-xl text-white mb-4 z-10'>Your Piggies
      </h2>
      <div v-for='piggy in piggyList' :key='piggy.id'
           class='sm:w-8/10 w-9/10 h-36 my-6 py-6 pink-border-bottom mx-auto rounded-xl relative bg-white flex flex-col justify-center text-center items-center pink sm:text-lg text-sm cursor-pointer hover:opacity-100'>
        <p
            class='text-pink sm:text-xl text-sm bg-white sm:-top-8 -top-6 absolute w-5/10 rounded-xl rounded-b-none my-1'>
          Piggy
          #{{ piggy.id }}</p>
        <div class='w-full h-full relative flex flex-row'>
          <div class='flex flex-col items-center mt-auto justify-center h-full w-5/10'>
            <p class='text-pink text-xs sm:text-sm opacity-75 my-1'>Last Epoch</p>
            <p v-on:click='claimDividendsForPiggy(piggy)' v-if='!piggy.claimedPrevious'
               class='sm:text-sm text-xs sm:w-7/10 w-full rounded-2xl text-center press-anim cursor-pointer text-white py-1 bg-pink pink-border-bottom border mt-2'>
              Claim {{piggy.lastEpoch}}</p>
            <p v-else
               class='sm:text-sm text-xs sm:w-7/10 w-full rounded-2xl text-center press-anim cursor-pointer text-white py-1 bg-pink pink-border-bottom border mt-2'>
              Nothing</p>
          </div>
          <div class='w-4/10 h-1/5 relative'>
            <img v-for='(attribute, index) in piggy.attributes' :key='index'
                 class="absolute sm:-top-6 top-0" v-bind:src='getPiggieAttributeImage(attribute)' alt="Pig">
          </div>
          <div class='flex flex-col justify-center mt-auto items-center h-full w-5/10'>
            <p class='text-pink text-xs sm:text-sm opacity-75 my-1'>Current Epoch</p>
            <p v-on:click='registerPiggy(piggy)' v-if='!piggy.registered'
               class='sm:text-sm text-xs sm:w-7/10 w-full rounded-2xl text-center press-anim cursor-pointer text-white py-1 bg-pink pink-border-bottom border mt-2'>
              Register</p>
            <p v-on:click='claimDividendsForPiggy(piggy)' v-else
               class='sm:text-sm text-xs sm:w-7/10 w-full rounded-2xl text-center press-anim cursor-pointer text-white py-1 bg-pink pink-border-bottom border mt-2'>
              Claim {{piggy.nextEpoch}}</p>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>


<script>
import PiggyDividends from "../../plugins/artifacts/piggyDividends.json";
import {
  ethers
} from "ethers";
import {
  mapGetters
} from "vuex";

export default {
  name: 'PiggyDividends',
  props: {
    bgColor
  },
  computed: {
    ...mapGetters([
      'metaMaskAccount',
      'metaMaskWallet'
    ]),
  },
  data() {
    return {
    };
  },
  async mounted() {

  },
  methods: {

  }
}
</script>

<style scoped>
.menu-enter-active,
.menu-leave-active {
  transform: translateX(0);
  opacity: 1;
  transition: all .35s;
}

.menu-enter,
.menu-leave-to {
  transforM: translateX(-200px);
  opacity: 0.25;
}
</style>