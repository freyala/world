<template>
  <div v-if="walletConnected && chainStatus === 'correct'" class="absolute" style="left: 10px; bottom: 40px">
    <div :key="favourite" v-for="favourite in favourites" @click="$store.dispatch('setOpenWindow', favourite)" class="w-28 h-28 cursor-pointer"
         style="background: url('/images/ui/icon-bg.png') no-repeat; background-size: contain"></div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import wallet from "../../plugins/wallet";

export default {
  name: 'Favourites',
  mixins: [wallet],
  computed: {
    ...mapGetters([
      'chainID',
      'chainStatus',
      'loggedIn',
      'walletConnected',
      'favourites'
    ])
  }
}
</script>
