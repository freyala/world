<template>
  <transition name="slide">
    <div class="slide-in shadow-xl" v-if="openWindow === 'delegate' || openWindow === 'delegate-large'"
         :style="openWindow === 'delegate-large' ? 'width: 100%;' : 'width: 30vw;'"
         style="background: url('/images/ui/screen-bg.png') repeat-y; top: 64px; min-width: 500px; background-size: contain; overflow-y: scroll;">

      <div class="absolute top-0 left-0 py-4 px-6">
        <i @click="$store.dispatch('setOpenWindow', '')" class="fas fa-times cursor-pointer text-xl"></i>
      </div>

      <div class="flex relative cursor-pointer" @click="setFavourite('delegate')">
        <img v-if="favourites.includes('delegate')" class="mx-auto" src="/images/ui/window-banner-favourite.png" alt="Banner">
        <img v-else class="mx-auto" src="/images/ui/window-banner-unfavourite.png" alt="Banner">
        <div class="absolute text-center w-full" style="top: 80px; line-height: 0.25">
          <small>Click to favourite</small>
          <p class="text-2xl">Beacon of Light</p>
        </div>
      </div>


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
import {ethers} from "ethers";
import jennyMineContract from "../../../plugins/artifacts/jennymines.json";


export default {
  name: 'Delegating',
  mixins: [wallet],
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
      error: '',

      jennyMineContract: {},
      jennyMineInterval: undefined,
      jennyMineFetchedData: {},
      jennyMineloading: {
        claiming: false
      }
    }
  },
  created() {
    if (this.metaMaskWallet) {
      this.jennyMineContract = new ethers.Contract(jennyMineContract.address, jennyMineContract.abi, this.metaMaskWallet.signer)
      this.fetchJennyMineData()
    }
  },
  watch: {
    async metaMaskWallet() {
      this.jennyMineContract = new ethers.Contract(jennyMineContract.address, jennyMineContract.abi, this.metaMaskWallet.signer)
    }
  },
  mounted() {
    setTimeout(() => {
      this.jennyMineMounted = true
    }, 1000)

    this.jennyMineInterval = setInterval(() => {
      this.fetchJennyMineData()
    }, 1000)
  },
  methods: {
    ...mapActions([
      'setFavourite'
    ]),
    // CALL
    async fetchJennyMineData() {
      if (document.hasFocus()) {
        const [valuesOfGem] = await Promise.all([
          this.jennyMineContract.returnValuesOfGem(),
        ])

        this.jennyMineFetchedData.mineInfo = {
          address: valuesOfGem[0],
          decimals: valuesOfGem[1]._isBigNumber ? ethers.BigNumber.from(valuesOfGem[1]).toString() : valuesOfGem[1],
          name: valuesOfGem[2],
          ticker: valuesOfGem[3],
          logoUrl: valuesOfGem[4],
          pairAddress: valuesOfGem[5],
          pairTicker: valuesOfGem[6]
        }
      }
    },

    // SEND
    async claim() {
      this.error = ''

      this.jennyMineloading.claiming = true
      try {
        const tx = await this.jennyMineContract.claim(this.metaMaskAccount)

        await tx.wait(1)

        this.jennyMineloading.claiming = false
      } catch (err) {
        if (err.code !== 4001) {
          this.error = err
        }
        this.jennyMineloading.claiming = false
        console.error(err)
      }
    }
  }
}
</script>