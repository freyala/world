<template>
  <transition name="slide" v-if="chainStatus === 'correct' && walletConnected && faucetMounted">
    <div class="slide-in shadow-xl" v-if="openWindow === 'faucet' || openWindow === 'faucet-large'"
         :style="openWindow === 'casino-large' ? 'width: 100%;' : 'width: 30vw;'"
         style="background: url('/images/ui/screen-bg.png') repeat-y; top: 64px; min-width: 500px; background-size: contain; overflow-y: scroll;">

      <div class="absolute top-0 left-0 py-4 px-6">
        <i @click="$store.dispatch('setOpenWindow', '')" class="fas fa-times cursor-pointer text-xl"></i>
      </div>

      <div class="flex relative cursor-pointer" @click="setFavourite('faucet')">
        <img v-if="favourites.includes('faucet')" class="mx-auto" src="/images/ui/window-banner-favourite.png" alt="Banner">
        <img v-else class="mx-auto" src="/images/ui/window-banner-unfavourite.png" alt="Banner">
        <div class="absolute text-center w-full" style="top: 80px; line-height: 0.25">
          <small>Click to favourite</small>
          <p class="text-2xl">Soup kitchen</p>
        </div>
      </div>
      <br>
      <div class="flex flex-wrap">
        <div class="w-full text-center">
          <p class="text-xl">Faucet balance:</p>
          <p>{{ faucetFetchedData.balanceOf }} XYA</p>
        </div>
        <br>
        <br>
        <br>
        <br>
        <div class="w-full flex flex-wrap" v-if="faucetFetchedData.allowedToWithdraw">
          <div class="w-full">
            <button type="button"
                    class="w-full rounded-none border border-yellow bg-transparent hover:bg-yellow hover:text-brown px-4 py-2 min-h-12"
                    @click="requestTokens()">
              Request a portion! <i v-if="faucetLoading.dripping" class="fas fa-cog fa-spin"></i>
            </button>
          </div>
          <div class="w-full text-center">
            <small>
              <em>The soup kitchen will send you 0.75 XYA on request.</em>
            </small>
          </div>
        </div>
        <div class="w-full text-center" v-else>
          <p>The kitchen has already given you your portion of soup in the past 24 hours. Come back later.</p>
        </div>
      </div>
      <br>
      <br>
      <hr>
      <br>
      <p class="text-xl pb-24">
        As his obsession to understand XYA grew with every passing day, Regent Carroway decided that it was time to
        conduct human trials. He knew that this would be no easy task. At first, the regent had his royal guards find
        members of the Freyfolk with no family, relations and importance, before condemning them to excruciating deaths
        by subjecting their bodies to copious amounts of XYA. Despite these discrete fatal experiments, rumors about
        these sudden horrifying deaths quickly spread amongst the Freyfolk.
        <br>
        <br>
        Eager to continue exploring the effects of XYA, the regent had his best chefs concoct a recipe for rations that
        would be infused with miniscule amounts of the ore. He then ordered for a soup kitchen to be built and made
        available to all members of the Freyfolk, painting him in a golden light as the Freyfolk were well fed.
      </p>
    </div>
  </transition>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import {ethers} from "ethers";
import Faucet from "../../../plugins/artifacts/faucet.json";
import Freyala from "../../../plugins/artifacts/freyala.json";
import Roulette from "../../../plugins/artifacts/roulette.json";

export default {
  name: 'Faucet',
  computed: {
    ...mapGetters([
      'chainID',
      'chainStatus',
      'loggedIn',
      'walletConnected',
      'metaMaskAccount',
      'metaMaskWallet',
      'openWindow',
      'favourites'
    ])
  },
  data() {
    return {
      wrongChain: false,
      faucetContract: {},
      faucetMounted: false,
      faucetInterval: undefined,
      faucetFetchedData: {
        balanceOf: 0,
        allowedToWithdraw: true
      },
      input: {
        address: ''
      },
      faucetLoading: {
        dripping: false
      }
    }
  },
  created() {
    if (this.metaMaskWallet) {
      this.faucetContract = new ethers.Contract(Faucet.address, Faucet.abi, this.metaMaskWallet.signer)
      this.fetchFaucetData()
    }
  },
  watch: {
    async metaMaskWallet() {
      this.faucetContract = new ethers.Contract(Faucet.address, Faucet.abi, this.metaMaskWallet.signer)
    }
  },
  mounted() {
    setTimeout(() => {
      this.faucetMounted = true
    }, 1000)

    this.faucetInterval = setInterval(() => {
      this.fetchFaucetData()
    }, 1000)
  },
  beforeDestroy() {
    clearInterval(this.faucetInterval)
  },
  methods: {
    ...mapActions([
      'setFavourite'
    ]),

    // CALL DATA
    async fetchFaucetData() {
      if (document.hasFocus()) {
        const data = await Promise.all([
          this.faucetContract.balanceOf(),
          this.faucetContract.allowedToWithdraw(this.metaMaskAccount)
        ])

        this.faucetFetchedData.balanceOf = ethers.utils.formatEther(data[0]._isBigNumber ? ethers.BigNumber.from(data[0]).toString() : data[0])
        this.faucetFetchedData.allowedToWithdraw = data[1]
      }
    },

    // SEND DATA
    async requestTokens() {
      this.error = ''
      this.faucetLoading.dripping = true

      try {
        const tx = await this.faucetContract.requestTokens()
        await tx.wait(1)

        this.faucetLoading.dripping = false

      } catch (err) {
        if (err.code !== 4001) {
          this.error = err
        }

        this.faucetLoading.dripping = false
        console.error(err);
      }
    },
  }
}
</script>