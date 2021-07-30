<template>
  <div id="wrapper">
    <main style="height: 100vh; position: relative">
      <world @init="onInit" :options="{zoomSpeed: 0.75, minZoom: 1, maxZoom: 5, boundsPadding: 0.25}">
        <div style="position: relative; cursor: grab;">
          <img src="/images/map/worldmap.png" alt="Freyala worldmap" style="width: 100vw">

          <div class="z-30" v-if="walletConnected" @click="$store.dispatch('setOpenWindow', 'casino')"
               style="position: absolute; top: 50%; left: 30%; padding: 5px; background-color: black; color: white; cursor: pointer">
            Casino
          </div>
          <div class="z-30" v-if="walletConnected" @click="$store.dispatch('setOpenWindow', 'staking')"
               style="position: absolute; top: 10%; left: 50%; padding: 5px; background-color: black; color: white; cursor: pointer">
            Staking
          </div>
          <div class="z-30" v-if="walletConnected" @click="$store.dispatch('setOpenWindow', 'faucet')"
               style="position: absolute; top: 80%; left: 80%; padding: 5px; background-color: black; color: white; cursor: pointer">
            Faucet
          </div>

          <!--          ICONS-->
          <div class="absolute w-full h-full" style="top: -35px; left: -30px;">
            <div class="relative w-full h-full">
              <img class="opacity-60 hover:opacity-100 absolute" style="left: 76.0546875%; top: 42.84722222222222%" src="/images/map/Generic_Camp.png" alt="Generic_Camp">
              <img class="opacity-60 hover:opacity-100 absolute" style="left: 65.546875%; top: 21.180555555555554%" src="/images/map/Generic_Camp.png" alt="Generic_Camp">
              <img class="opacity-60 hover:opacity-100 absolute" style="left: 49.140625%; top: 66.25%" src="/images/map/Generic_Camp.png" alt="Generic_Camp">
              <img class="opacity-60 hover:opacity-100 absolute" style="left: 34.8046875%; top: 18.055555555555554%" src="/images/map/Generic_Camp.png" alt="Generic_Camp">

              <img class="opacity-60 hover:opacity-100 absolute" style="left: 45%; top: 59.02777777777778%" src="/images/map/Generic_Poi_Large.png" alt="Generic_Poi_Large">

              <img class="opacity-60 hover:opacity-100 absolute" style="left: 77.96875%; top: 32%" src="/images/map/Generic_Poi_Small.png" alt="Generic_Poi_Small">
              <img class="opacity-60 hover:opacity-100 absolute" style="left: 74.0625%; top: 41.458333333333336%" src="/images/map/Generic_Poi_Small.png" alt="Generic_Poi_Small">
              <img class="opacity-60 hover:opacity-100 absolute" style="left: 61.25%; top: 42%" src="/images/map/Generic_Poi_Small.png" alt="Generic_Poi_Small">
              <img class="opacity-60 hover:opacity-100 absolute" style="left: 54.0891%; top: 28.7222%" src="/images/map/Generic_Poi_Small.png" alt="Generic_Poi_Small">
              <img class="opacity-60 hover:opacity-100 absolute" style="left: 52.26562500000001%; top: 82.84722222222223%" src="/images/map/Generic_Poi_Small.png" alt="Generic_Poi_Small">
              <img class="opacity-60 hover:opacity-100 absolute" style="left: 16.9921875%; top: 25.27777777777778%" src="/images/map/Generic_Poi_Small.png" alt="Generic_Poi_Small">

              <img class="opacity-60 hover:opacity-100 absolute" style="left: 61.79687499999999%; top: 82.63888888888889%" src="/images/map/Generic_Chapel.png" alt="Generic_Chapel">
              <img class="opacity-60 hover:opacity-100 absolute" style="left: 48.5453125%; top: 34.86111111111111%" src="/images/map/Generic_Chapel.png" alt="Generic_Chapel">

              <img class="opacity-60 hover:opacity-100 absolute" style="left: 67.265625%; top: 28.0139%" src="/images/map/Generic_Tower.png" alt="Generic_Tower">
              <img class="opacity-60 hover:opacity-100 absolute" style="left: 43.75%; top: 83.26388888888889%" src="/images/map/Generic_Tower.png" alt="Generic_Tower">
              <img class="opacity-60 hover:opacity-100 absolute" style="left: 28.3203125%; top: 29.444444444444446%" src="/images/map/Generic_Tower.png" alt="Generic_Tower">

              <img class="opacity-60 hover:opacity-100 absolute" style="left: 59.0234375%; top: 42.84722222222222%" src="/images/map/Generic_Town_Large.png" alt="Generic_Town_Large">
              <img class="opacity-60 hover:opacity-100 absolute" style="left: 44.375%; top: 16.319444444444446%" src="/images/map/Generic_Town_Large.png" alt="Generic_Town_Large">

              <img class="opacity-60 hover:opacity-100 absolute" style="left: 67.6171875%; top: 49.0556%" src="/images/map/Generic_Town_Small.png" alt="Generic_Town_Small">
              <img class="opacity-60 hover:opacity-100 absolute" style="left: 45.0344%; top: 33.22%" src="/images/map/Generic_Town_Small.png" alt="Generic_Town_Small">
              <img class="opacity-60 hover:opacity-100 absolute" style="left: 42.0609%; top: 65.1667%" src="/images/map/Generic_Town_Small.png" alt="Generic_Town_Small">
              <img class="opacity-60 hover:opacity-100 absolute" style="left: 33.1015625%; top: 36.388888888888886%" src="/images/map/Generic_Town_Small.png" alt="Generic_Town_Small">
              <img class="opacity-60 hover:opacity-100 absolute" style="left: 23.9453125%; top: 83.47222222222223%" src="/images/map/Generic_Town_Small.png" alt="Generic_Town_Small">
            </div>
          </div>
        </div>
      </world>

      <top-bar></top-bar>
      <favourites></favourites>

      <casino></casino>
      <faucet></faucet>
      <staking></staking>
    </main>
  </div>
</template>

<script>
import topBar from './TopBar';
import favourites from './Favourites';
import casino from './Locations/Casino';
import faucet from './Locations/Faucet';
import staking from './Locations/Staking';

import wallet from '../../plugins/wallet';
import {mapGetters} from "vuex";

export default {
  name: 'WorldMap',
  mixins: [wallet],
  components: {
    topBar,
    favourites,
    casino,
    faucet,
    staking,
  },
  computed: {
    ...mapGetters(['loggedIn', 'walletConnected'])
  },
  mounted() {
    this.connectWallet();
  },
  methods: {
    onInit: function (panzoomInstance, id) {
      panzoomInstance.setTransformOrigin(null)
    }
  }
}
</script>

<style>
body {
  overflow: hidden;
  margin: 0;
}

div {
  padding: 0;
  border: 0;
  outline: 0;
}

.slide-in {
  padding: 2em 3em;
  position: fixed;
  z-index: 100;
  top: 0;
  right: 0;
  background: #ddd;
  height: 100%;
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.5);
  transition: all 0.5s ease-in-out;
}

/* before the element is shown, start off the screen to the right */
.slide-enter, .slide-leave-active {
  right: -100%;
}

.close-btn {
  border: none;
  font-weight: bold;
  font-size: 2em;
  background: transparent;
  position: absolute;
  top: 0;
  left: 0;
  padding: 0.5em;
}

/* General styles unrelated to slide in */
body {
  font-family: 'Mulish', sans-serif;
}

.toggle {
  margin: 1em;
}

button {
  padding: .5em 1em;
  border-radius: 3em;
  font-size: 1.1em;
}

h1 {
  font-weight: 200;
}
</style>
