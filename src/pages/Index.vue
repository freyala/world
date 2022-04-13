<template>
  <main v-show="mounted" id="wrapper" style="height: 100vh; position: relative">
    <div id="world-map">
      <div class="relative" style="cursor: grab">
        <img src="/img/map/XYAMapV2_6.png" alt="Xangaea worldmap">

        <!--          ICONS-->
        <div class="absolute w-full h-full" style="top: -1.5vw; left: -1.75vw;">
          <div class="relative w-full h-full">

            <router-link :to="{ name: 'barracks' }">
              <img class="cursor-pointer opacity-80 hover:opacity-100 absolute"
                   style="left: 69%; top: 26%; width: 2.5vw;" src="/img/icons/GFXIconBarracks.png" alt="Barracks">
            </router-link>

            <router-link :to="{ name: 'beacon' }">
              <img class="cursor-pointer opacity-80 hover:opacity-100 absolute"
                   style="left: 32.5%; top: 44%; width: 2.5vw;" src="/img/icons/GFXIconBeacon.png" alt="Beacon">
            </router-link>

            <router-link :to="{ name: 'wiki' }">
              <img class="cursor-pointer opacity-80 hover:opacity-100 absolute"
                   style="left: 42%; top: 48%; width: 2.5vw;" src="/img/icons/GFXIconLore.png" alt="Wiki">
            </router-link>

            <router-link :to="{ name: 'marketplace' }">
              <img class="cursor-pointer opacity-80 hover:opacity-100 absolute"
                   style="left: 51%; top: 51%; width: 2.5vw;" src="/img/icons/GFXIconMarketplace.png" alt="Marketplace">
            </router-link>

            <router-link :to="{ name: 'pigs' }">
              <img class="cursor-pointer opacity-80 hover:opacity-100 absolute"
                   style="left: 67%; top: 44%; width: 2.5vw;" src="/img/icons/GFXIconPiggy.png" alt="Pigsty">
            </router-link>

            <router-link :to="{ name: 'plots' }">
              <img class="cursor-pointer opacity-80 hover:opacity-100 absolute"
                   style="left: 42%; top: 40%; width: 2.5vw;" src="/img/icons/GFXIconPlots.png" alt="Plots">
            </router-link>

            <router-link :to="{ name: 'staking' }">
              <img class="cursor-pointer opacity-80 hover:opacity-100 absolute"
                   style="left: 60%; top: 53%; width: 2.5vw;" src="/img/icons/GFXIconStaking.png" alt="Staking">
            </router-link>

            <router-link :to="{ name: 'tree-of-peak' }">
              <img class="cursor-pointer opacity-80 hover:opacity-100 absolute"
                   style="left: 85%; top: 45%; width: 2.5vw;" src="/img/icons/GFXIconTreeOfPeak.png" alt="Tree of Peak">
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import wallet from '../plugins/wallet'
import Panzoom from '@panzoom/panzoom'
import {mapGetters} from "vuex"

export default {
  name: 'WorldMap',
  mixins: [wallet],
  filters: {
    compressAddress(address) {
      if (address !== undefined) {
        return (
            address.substr(0, 10) +
            "..." +
            address.substr(address.length - 5, address.length)
        )
      }
    },
  },
  data() {
    return {
      mounted: false,
      event: {},
      window: undefined
    }
  },
  computed: {
    ...mapGetters([
      'metaMaskAccount',
      'metaMaskWallet'
    ])
  },
  mounted() {
    window.addEventListener("resize", this.editPanZoom);

    setTimeout(() => {
      this.mounted = true
      this.editPanZoom()
    }, 2000)
  },
  destroyed() {
    window.removeEventListener("resize", this.editPanZoom);
  },
  methods: {
    editPanZoom() {
      const elem = document.getElementById('world-map')
      let panzoom = undefined

      if (window.innerWidth < 1024) {
        panzoom = Panzoom(elem, {
          maxScale: 10,
          minScale: 1,
          steps: 1,
          contain: 'outside'
        })
      } else {
        panzoom = Panzoom(elem, {
          maxScale: 10,
          minScale: 1,
          contain: 'outside'
        })
      }

      elem.parentElement.addEventListener('wheel', (e) => {
        if (!e.target.closest('#world-map').length) {
          panzoom.zoomWithWheel(e)
        }
      })

      setTimeout(() => {
        panzoom.zoom(1, {animate: false})
      })
    },
    onInit(panzoomInstance, id) {
      panzoomInstance.setTransformOrigin(null)
    },
    createLoaderToast(message) {
      let toastId = Date.now();
      return this.$toast(message, {
        timeout: 0,
        closeButton: "button",
        icon: "fa fa-gear fa-spin",
        id: toastId
      });
    },
    handleError(error) {
      const errorMessage =
          typeof error == "object" ? error.message : error.toLowerCase();
      const lcMessage = errorMessage.toLowerCase();
      if (lcMessage.indexOf("user denied") > -1) return;
      if (lcMessage.indexOf("transaction failed") > -1) {
        this.$toast.error("Transaction Failed");
      } else if (errorMessage.length < 100) {
        this.$toast.error(errorMessage);
      } else {
        this.$toast.error('Transaction Failed');
      }
    }
  }
}
</script>
