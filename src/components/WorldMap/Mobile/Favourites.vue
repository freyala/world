<template>
  <div v-if="walletConnected && chainStatus === 'correct'" class="absolute" style="left: 10px; bottom: 15px">
    <div :key="favourite" v-for="favourite in favourites" @click="$store.dispatch('setOpenWindow', favourite)" class="w-20 lg:w-28 h-20 lg:h-28 cursor-pointer flex"
         style="background: url('/images/ui/icon-bg.png') no-repeat; background-size: contain">
      <img class="m-auto max-h-12 lg:max-h-20 max-w-12 lg:max-w-20 pl-1" v-if="favourite === 'staking'" src="/images/map/Drill.png" alt="Drill">
      <img class="m-auto max-h-12 lg:max-h-20 max-w-12 lg:max-w-20" v-if="favourite === 'faucet'" src="/images/map/Soup.png" alt="Soup">
      <img class="m-auto max-h-12 lg:max-h-20 max-w-12 lg:max-w-20" v-if="favourite === 'delegate'" src="/images/map/Beacon.png" alt="Beacon">
      <img class="m-auto max-h-12 lg:max-h-20 max-w-12 lg:max-w-20" v-if="favourite === 'casino'" src="/images/map/Casino.png" alt="Casino">
      <img class="m-auto max-h-12 lg:max-h-20 max-w-12 lg:max-w-20 px-2" v-if="favourite === 'jennymines'" src="/images/map/Mine.png" alt="Mine">
      <img class="m-auto max-h-12 lg:max-h-20 max-w-12 lg:max-w-20 pl-3" v-if="favourite === 'governance'" src="/images/map/Palace.png" alt="Palace">
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import wallet from "../../../plugins/wallet";

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
