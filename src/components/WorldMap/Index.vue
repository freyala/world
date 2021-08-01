<template>
  <div id="wrapper">
    <main style="height: 100vh; position: relative">
      <world @init="onInit" :options="{zoomSpeed: 0.75, minZoom: 1, maxZoom: 5}">
        <div class="relative cursor-grab">
          <img src="/images/map/worldmap.png" alt="Freyala worldmap" style="width: 2560px">

          <!--          ICONS-->
          <div class="absolute w-full h-full" style="top: -1.5vw; left: -1.75vw;">
            <div class="relative w-full h-full">
              <img class="opacity-60 hover:opacity-100 absolute" style="left: 76.5547%; top: 42.84722222222222%; width: 2.5vw;" src="/images/map/Generic_Camp.png" alt="Generic_Camp">
              <img class="opacity-60 hover:opacity-100 absolute" style="left: 65.546875%; top: 23.0806%; width: 2.5vw;" src="/images/map/Generic_Camp.png" alt="Generic_Camp">
              <img class="opacity-60 hover:opacity-100 absolute" style="left: 49.3406%; top: 66.75%; width: 2.5vw;" src="/images/map/Generic_Camp.png" alt="Generic_Camp">
              <img class="opacity-60 hover:opacity-100 absolute" style="left: 35.047%; top: 18.5556%; width: 2.5vw;" src="/images/map/Generic_Camp.png" alt="Generic_Camp">

              <img class="opacity-60 hover:opacity-100 absolute" style="left: 45.15%; top: 60.0278%; width: 2.75vw;" src="/images/map/Generic_Poi_Large.png" alt="Generic_Poi_Large">

              <img class="opacity-60 hover:opacity-100 absolute" style="left: 78.4688%; top: 32%; width: 2vw;" src="/images/map/Generic_Poi_Small.png" alt="Generic_Poi_Small">
              <img class="opacity-60 hover:opacity-100 absolute" style="left: 74.2625%; top: 41.458333333333336%; width: 2vw;" src="/images/map/Generic_Poi_Small.png" alt="Generic_Poi_Small">
              <img class="opacity-60 hover:opacity-100 absolute" style="left: 61.45%; top: 42%; width: 2vw;" src="/images/map/Generic_Poi_Small.png" alt="Generic_Poi_Small">
              <img class="opacity-60 hover:opacity-100 absolute" style="left: 54.2891%; top: 28.7222%; width: 2vw;" src="/images/map/Generic_Poi_Small.png" alt="Generic_Poi_Small">
              <img class="opacity-60 hover:opacity-100 absolute" style="left: 52.46562500000001%; top: 82.84722222222223%; width: 2vw;" src="/images/map/Generic_Poi_Small.png" alt="Generic_Poi_Small">
              <img class="opacity-60 hover:opacity-100 absolute" style="left: 17.1921875%; top: 26.2778%; width: 2vw;" src="/images/map/Generic_Poi_Small.png" alt="Generic_Poi_Small">

              <img class="opacity-60 hover:opacity-100 absolute" style="left: 61.99687499999999%; top: 82.63888888888889%; width: 3.5vw;" src="/images/map/Generic_Chapel.png" alt="Generic_Chapel">
              <img class="opacity-60 hover:opacity-100 absolute" style="left: 48.7453125%; top: 34.86111111111111%; width: 3.5vw;" src="/images/map/Generic_Chapel.png" alt="Generic_Chapel">

              <img class="opacity-60 hover:opacity-100 absolute" style="left: 67.565625%; top: 29.0139%; width: 2.5vw;" src="/images/map/Generic_Tower.png" alt="Generic_Tower">
              <img class="opacity-60 hover:opacity-100 absolute" style="left: 44.05%; top: 84.26388888888889%; width: 2.5vw;" src="/images/map/Generic_Tower.png" alt="Generic_Tower">
              <img class="opacity-60 hover:opacity-100 absolute" style="left: 28.6203125%; top: 30.444444444444446%; width: 2.5vw;" src="/images/map/Generic_Tower.png" alt="Generic_Tower">

              <img class="opacity-60 hover:opacity-100 absolute" style="left: 59.0234%; top: 43.5472%;; width: 3vw;" src="/images/map/Generic_Town_Large.png" alt="Generic_Town_Large">
              <img class="opacity-60 hover:opacity-100 absolute" style="left: 44.075%; top: 16.9194%;; width: 3vw;" src="/images/map/Generic_Town_Large.png" alt="Generic_Town_Large">

              <img class="opacity-60 hover:opacity-100 absolute" style="left: 67.6171875%; top: 49.0556%; width: 3.5vw;" src="/images/map/Generic_Town_Small.png" alt="Generic_Town_Small">
              <img class="opacity-60 hover:opacity-100 absolute" style="left: 45.0344%; top: 33.22%; width: 3.5vw;" src="/images/map/Generic_Town_Small.png" alt="Generic_Town_Small">
              <img class="opacity-60 hover:opacity-100 absolute" style="left: 42.0609%; top: 65.1667%; width: 3.5vw;" src="/images/map/Generic_Town_Small.png" alt="Generic_Town_Small">
              <img class="opacity-60 hover:opacity-100 absolute" style="left: 33.5016%; top: 37.3889%;; width: 3.5vw;" src="/images/map/Generic_Town_Small.png" alt="Generic_Town_Small">
              <img class="opacity-60 hover:opacity-100 absolute" style="left: 23.9453125%; top: 83.47222222222223%; width: 3.5vw;" src="/images/map/Generic_Town_Small.png" alt="Generic_Town_Small">

              <img class="absolute" style="left: 58.1063%; top: 8.9681%; width: 17vw" src="/images/map/WallTop.png" alt="WallTop">
              <img class="absolute" style="left: 49.8312%; top: 62.0653%; width: 8vw;" src="/images/map/WallBottom.png" alt="WallBottom">

              <img class="opacity-100 hover:opacity-0 absolute" style="left: 41.2226%; top: 56.9306%; width: 10.6vw;" src="/images/map/WallMid.png" alt="WallMid">
              <div @click="$store.dispatch('setOpenWindow', 'casino')" class="opacity-0 hover:opacity-100 absolute" style="left: 41.2226%; top: 56.9306%; width: 10.6vw;">
                <img src="/images/map/WallMid_MO.png" alt="WallMid">
                <p class="text-center font-bold text-xl text-yellow outline-brown">
                  Luderion
                </p>
              </div>

              <img class="opacity-100 hover:opacity-0 absolute" style="left: 30.6719%;top: 36.139%; width: 4vw;" src="/images/map/Beacon.png" alt="Beacon">
              <div @click="$store.dispatch('setOpenWindow', 'delegate')" class="opacity-0 hover:opacity-100 absolute" style="left: 30.6719%;top: 36.139%; width: 4vw;">
                <img src="/images/map/Beacon_MO.png" alt="Beacon">
                <p class="text-center font-bold text-xl text-yellow outline-brown">
                  Beacon
                </p>
              </div>

              <img class="opacity-100 hover:opacity-0 absolute" style="left: 80.6172%; top: 37.6319%; width: 7vw;" src="/images/map/FreyalaTree.png" alt="FreyalaTree">
              <div @click="$store.dispatch('setOpenWindow', 'staking')" class="opacity-0 hover:opacity-100 absolute" style="left: 80.6172%; top: 37.6319%; width: 7vw;">
                <img src="/images/map/FreyalaTree_MO.png" alt="FreyalaTree">
                <p class="text-center font-bold text-xl text-yellow outline-brown">
                  Staking
                </p>
              </div>

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

.outline-brown {
  text-shadow: -1px -1px 0 #211c17, 1px -1px 0 #211c17, -1px 1px 0 #211c17, 1px 1px 0 #211c17;
}
</style>
