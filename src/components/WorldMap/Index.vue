<template>
  <div id="wrapper">
    <main style="height: 100vh; position: relative">
      <world @init="onInit" :options="{minZoom: 1, maxZoom: 5}">
        <div style="position: relative; cursor: grab;">
          <img src="/images/map/worldmap.jpg" alt="Freyala worldmap" style="width: 100vw">

          <div v-if="walletConnected" @click="$store.dispatch('setOpenWindow', 'casino')"
               style="position: absolute; top: 50%; left: 30%; width: 50px; height: 50px; background-color: black; cursor: pointer"></div>
          <div v-if="walletConnected" @click="$store.dispatch('setOpenWindow', 'staking')"
               style="position: absolute; top: 10%; left: 50%; width: 50px; height: 50px; background-color: black; cursor: pointer"></div>
          <div v-if="walletConnected" @click="$store.dispatch('setOpenWindow', 'faucet')"
               style="position: absolute; top: 80%; left: 80%; width: 50px; height: 50px; background-color: black; cursor: pointer"></div>
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
      panzoomInstance.setTransformOrigin(null);
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
