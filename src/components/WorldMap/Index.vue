<template>
  <div id="wrapper">
    <main v-show="mounted" style="height: 100vh; position: relative">
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
                     style="left: 51%; top: 51%; width: 2.5vw;" src="/img/icons/GFXIconMarketplace.png"
                     alt="Marketplace">
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

              <router-link :to="{ name: 'tree' }">
                <img class="cursor-pointer opacity-80 hover:opacity-100 absolute"
                     style="left: 85%; top: 45%; width: 2.5vw;" src="/img/icons/GFXIconTreeOfPeak.png"
                     alt="Tree of Peak">
              </router-link>
            </div>
          </div>
        </div>
      </div>

      <top-bar></top-bar>

      <div class='absolute mb-8 md:top-36 top-32 left-0 md:ml-12 ml-0 w-auto md:mt-4'>
        <AudioManagerInterface></AudioManagerInterface>
      </div>
      <div v-if="claimableDrop > 0 || claimableUsdc > 0">
        <button class="absolute bottom-0 left-0 mb-4 ml-4 md:mb-8 md:ml-12 w-auto xya-btn text-xl">
          <div class="text-primary-bt" @click="$modal.show('drop')">
            CLAIM DROP
          </div>
        </button>
      </div>

      <div id="tutorial">
        <window name="tutorial" height="auto" width="80%">
          <div v-if="tutorialWindow === 1" class="flex flex-wrap p-6 bg-detail-bg h-full">
            <div class="w-4/5">
              <div class="text-2xl">WELCOME TO XANGAEA!</div>
            </div>
            <div class="w-1/5 text-right">
              <i @click="hideWindow('tutorial')" class="fas fa-times cursor-pointer text-xl"></i>
            </div>
            <p class="w-full mt-4">
              This app showcases the world of Xangaea, allowing easy access to different decentralized applications and
              features in our ecosystem. Explore what Xangaea has to offer with ease and uncover hidden lore.
            </p>
            <div class="flex w-full mt-8 mb-2">
              <div class="w-1/2 pr-2">
                <button type="button"
                        class="w-full rounded-none border border-detail-bg bg-transparent hover:bg-detail-bg hover:text-brown px-4 py-2 min-h-12"
                        @click="skipOrEnd()">
                  Skip
                </button>
              </div>
              <div class="w-1/2 pl-2">
                <button type="button"
                        class="w-full rounded-none border border-detail-bg bg-transparent hover:bg-detail-bg hover:text-brown px-4 py-2 min-h-12"
                        @click="tutorialWindow = 2">
                  Next
                </button>
              </div>
            </div>
          </div>
          <div v-if="tutorialWindow === 2" class="flex flex-wrap p-6 bg-detail-bg h-full">
            <div class="w-4/5">
              <div class="text-2xl">WALLET BALANCE</div>
            </div>
            <div class="w-1/5 text-right">
              <i @click="hideWindow('tutorial')" class="fas fa-times cursor-pointer text-xl"></i>
            </div>
            <p class="w-full mt-4">
              On the top bar of the screen is information about your wallet. You can view your XYA balance, your amount
              of XYA tokens staked and your unclaimed staking rewards. This is based on the wallet connected to the app,
              not the device you are using.
            </p>
            <div class="flex w-full mt-8 mb-2">
              <div class="w-1/2 pr-2">
                <button type="button"
                        class="w-full rounded-none border border-detail-bg bg-transparent hover:bg-detail-bg hover:text-brown px-4 py-2 min-h-12"
                        @click="tutorialWindow = 1">
                  Previous
                </button>
              </div>
              <div class="w-1/2 pl-2">
                <button type="button"
                        class="w-full rounded-none border border-detail-bg bg-transparent hover:bg-detail-bg hover:text-brown px-4 py-2 min-h-12"
                        @click="tutorialWindow = 3">
                  Next
                </button>
              </div>
            </div>
          </div>
          <div v-if="tutorialWindow === 3" class="flex flex-wrap p-6 bg-detail-bg h-full">
            <div class="w-4/5">
              <div class="text-2xl">MAIN LOCATIONS</div>
            </div>
            <div class="w-1/5 text-right">
              <i @click="hideWindow('tutorial')" class="fas fa-times cursor-pointer text-xl"></i>
            </div>
            <p class="w-full mt-4">
              Hovering over any main location will automatically highlight it. Each location has lore and a function,
              like staking in the Extraction Site or using our faucet in the Soup Kitchen. You can also favorite up to
              four different locations, which will be located in the bottom left of your screen for easy access.
            </p>
            <div class="flex w-full mt-8 mb-2">
              <div class="w-1/2 pr-2">
                <button type="button"
                        class="w-full rounded-none border border-detail-bg bg-transparent hover:bg-detail-bg hover:text-brown px-4 py-2 min-h-12"
                        @click="tutorialWindow = 2">
                  Previous
                </button>
              </div>
              <div class="w-1/2 pl-2">
                <button type="button"
                        class="w-full rounded-none border border-detail-bg bg-transparent hover:bg-detail-bg hover:text-brown px-4 py-2 min-h-12"
                        @click="tutorialWindow = 4">
                  Next
                </button>
              </div>
            </div>
          </div>
          <div v-if="tutorialWindow === 4" class="flex flex-wrap p-6 bg-detail-bg h-full">
            <div class="w-4/5">
              <div class="text-2xl">MINOR LOCATIONS</div>
            </div>
            <div class="w-1/5 text-right">
              <i @click="hideWindow('tutorial')" class="fas fa-times cursor-pointer text-xl"></i>
            </div>
            <p class="w-full mt-4">
              Small building icons, also known as minor locations, can be found all over the map. While these minor
              locations are not decentralized apps, they each provide small pieces of lore when clicked that help bring
              together the story of Xangaea.
            </p>
            <div class="flex w-full mt-8 mb-2">
              <div class="w-1/2 pr-2">
                <button type="button"
                        class="w-full rounded-none border border-detail-bg bg-transparent hover:bg-detail-bg hover:text-brown px-4 py-2 min-h-12"
                        @click="tutorialWindow = 3">
                  Previous
                </button>
              </div>
              <div class="w-1/2 pl-2">
                <button type="button"
                        class="w-full rounded-none border border-detail-bg bg-transparent hover:bg-detail-bg hover:text-brown px-4 py-2 min-h-12"
                        @click="skipOrEnd()">
                  Finish
                </button>
              </div>
            </div>
          </div>
        </window>

        <window height='10%' width='80%' name='drop'>
          <div class="flex flex-wrap justify-center p-6 px-12 bg-detail-bg h-full">
            <div class="w-full text-center">
              <div class="sm:text-3xl text-xl">Claimable drop</div>
            </div>
            <div class="absolute right-6">
              <i @click="$modal.hide('drop')"
                 class="fas fa-times cursor-pointer sm:text-xl text-base sm:mt-0 mt-1"></i>
            </div>
            <hr class='w-full my-4'/>

            <div class="mt-4 flex md:flex-row flex-row w-full items-start justify-start">

              Claimable xya: {{ claimableDrop }} XYA

            </div>

            <div class="mt-4 flex md:flex-row flex-row w-full items-start justify-start">
              <input class='w-full text-black px-2 h-full' type="number" v-model='tokensToClaim'/>
              <div class="text-right md:text-center md:w-9/12 w-5/12 -ml-2">
                <button v-if="!claimingDrop" v-on:click="claimDrop()" type="button"
                        class="w-full md:w-10/12 xya-btn relative">
                  <span>Claim</span>
                </button>

                <button v-else type="button" class="w-full md:w-10/12 xya-btn relative">
                  <span>Claiming</span>
                </button>
              </div>
            </div>

            <hr class='w-full my-4'/>

            <div class="mt-4 flex md:flex-row flex-row w-full items-start justify-start">

              Claimable usdc: {{ claimableUsdc }} USDC

            </div>

            <div class="mt-4 flex md:flex-row flex-row w-full items-start justify-start">
              <input class='w-full text-black px-2 h-full' type="number" v-model='usdcToClaim'/>
              <div class="text-right md:text-center md:w-9/12 w-5/12 -ml-2">
                <button v-if="!claimingUsdc" v-on:click="claimUsdc()" type="button" class="w-full md:w-10/12 xya-btn relative">
                  <span>Claim</span>
                </button>

                <button v-else type="button" class="w-full md:w-10/12 xya-btn relative">
                  <span>Claiming</span>
                </button>
              </div>
            </div>

          </div>
        </window>
      </div>
    </main>
  </div>
</template>

<script>
import topBar from './TopBar';
import AudioManagerInterface from '../../components/Plugins/AudioManagerInterface.vue'
import wallet from '../../plugins/wallet';
import Panzoom from '@panzoom/panzoom'
import {mapGetters} from "vuex";
import {ethers} from "ethers";
import Xangaea from "../../plugins/artifacts/xangaea.json";
import Drop from "../../plugins/artifacts/slry.json";
import fromExponential from "from-exponential";

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
      claimingDrop: false,
      claimingUsdc: false,
      mainContract: undefined,
      dropContract: undefined,
      claimableDrop: 0,
      claimableUsdc: 0,
      tokensToClaim: 0,
      usdcToClaim: 0,
      event: {},
      window: undefined,
      hovering: '',
      tutorialWindow: 1,
      transactionHistory: []
    }
  },
  components: {
    topBar,
    AudioManagerInterface
  },
  computed: {
    ...mapGetters([
      'firstTime',
      'metaMaskAccount',
      'metaMaskWallet'
    ])
  },
  destroyed() {
    window.removeEventListener("resize", this.editPanZoom);
  },
  async mounted() {
    window.addEventListener("resize", this.editPanZoom);

    this.mainContract = await new ethers.Contract(Xangaea.address, Xangaea.abi, this.metaMaskWallet.signer)
    this.dropContract = await new ethers.Contract(Drop.address, Drop.abi, this.metaMaskWallet.signer)

    const drop = (await this.dropContract.tokenAllowance(this.metaMaskAccount)) * 1
    const usdc = (await this.dropContract.usdcAllowance(this.metaMaskAccount)) * 1

    this.claimableDrop = drop / 1e18
    this.claimableUsdc = usdc / 1e6

    setTimeout(() => {
      this.editPanZoom()
    }, 500)
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
        try {
          if (!e.target.closest('#world-map').length) {
            panzoom.zoomWithWheel(e)
          }
        }
        catch {
          return
        }
      })

      this.mounted = true

      setTimeout(() => {
        panzoom.zoom(1, {animate: false})
      })
    },
    skipOrEnd() {
      this.$modal.hide('tutorial')
      localStorage.firstTime = false;
    },
    hideWindow(window) {
      this.window = undefined
      this.$modal.hide(window)
    },
    showWindow(window) {
      this.window = window
      this.$modal.show(window)
    },
    onInit: function (panzoomInstance, id) {
      panzoomInstance.setTransformOrigin(null)
    },
    async claimDrop() {
      let actual = 0;

      if (this.tokensToClaim > 0) {
        actual = this.tokensToClaim * 10 ** 18;
      } else {
        actual = 0;
      }

      let toast = undefined;

      try {
        const arg = fromExponential(actual);
        const tx = await this.dropContract.withdrawToken(this.metaMaskAccount, arg)
        toast = this.createLoaderToast("Pending Transaction - Drop");

        this.claimingDrop = true
        await tx.wait(1);
        this.claimingDrop = false

        this.$toast.success("Drop successfully claimed")

        const drop = (await this.dropContract.tokenAllowance(this.metaMaskAccount)) * 1
        this.claimableDrop = drop / 1e18
      } catch (err) {
        this.handleError(err);
      }

      this.$toast.dismiss(toast)
    },
    async claimUsdc() {
      let actual = 0;

      if (this.usdcToClaim > 0) {
        actual = this.usdcToClaim * 10 ** 6;
      } else {
        actual = 0;
      }

      let toast = undefined;

      try {
        const arg = fromExponential(actual);
        const tx = await this.dropContract.withdrawUsdc(this.metaMaskAccount, arg)
        toast = this.createLoaderToast("Pending Transaction - Usdc");

        this.claimingUsdc = true
        await tx.wait(1);
        this.claimingUsdc = false

        this.$toast.success("Usdc successfully claimed")

        const usdc = (await this.dropContract.usdcAllowance(this.metaMaskAccount)) * 1
        this.claimableUsdc = usdc / 1e6
      } catch (err) {
        this.handleError(err);
      }

      this.$toast.dismiss(toast)
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
    },
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

h1 {
  font-weight: 200;
}

.outline-brown {
  text-shadow: -1px -1px 0 #211c17, 1px -1px 0 #211c17, -1px 1px 0 #211c17, 1px 1px 0 #211c17;
}

.vm--modal {
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
  background-color: #222222 !important;

  width: auto !important;
  max-width: 750px;
  margin-left: auto;
  margin-right: auto;
  transform: translate(-10vw, 0%);
  height: auto !important;

  border: 2px #173544c7 solid;
}
</style>
