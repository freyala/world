<template>
  <section style="background: url('/images/map/worldmap.png') no-repeat; background-size: cover; min-height: 100vh"
           class="flex p-4 md:p-16 lg:px-32">
    <div style="background: #1c1c1c; z-index: 9999; overflow-y: auto;" class="screen rounded-2xl w-full">
      <section id="section-i-1" class="border-b-4 border-primary-alt"
               style="background: url('/images/SVG/homepage-bg-top.svg') no-repeat top right">
        <div class="container mx-auto text-center pt-16 md:pt-24 pb-16 md:pb-20">
          <h1 class="text-2xl md:text-5xl text-primary-alt font-semibold">
            Soup Kitchen
          </h1>
          <p class="text-xl text-primary-alt cursor-pointer" @click="setFavourite('faucet')">
            <i v-if="favourites.includes('faucet')" class="fas fa-star"></i>
            <i v-else class="far fa-star"></i>

            <span v-if="favourites.includes('faucet')">Favourite</span>
            <span v-else>Favourite</span>
          </p>
        </div>
      </section>
      <div class="p-4 md:p-8 relative">
        <div class="absolute top-0 left-0 p-4 md:p-8">
          <router-link :to="{ name: 'world-map' }">
            <i class="fas fa-long-arrow-alt-left"></i> Back
          </router-link>
        </div>
        <br>

        <div v-if="faucetLoaded" class="flex">
          <div class="w-full md:w-4/5 lg:w-3/5 mx-auto">
<!--            <div class="flex flex-wrap">-->
<!--              <div class="w-full text-center">-->
<!--                <p class="text-xl">Faucet balance:</p>-->
<!--                <p>{{ faucetFetchedData.balanceOf }} XYA</p>-->
<!--              </div>-->
<!--              <br>-->
<!--              <br>-->
<!--              <br>-->
<!--              <br>-->
<!--              <div class="w-full flex flex-wrap" v-if="faucetFetchedData.allowedToWithdraw">-->
<!--                <div class="w-full">-->
<!--                  <button type="button"-->
<!--                          class="w-full rounded-none border border-primary-alt bg-transparent hover:bg-primary-alt hover:text-brown px-4 py-2 min-h-12"-->
<!--                          @click="requestTokens()">-->
<!--                    Request a portion! <i v-if="faucetLoading.dripping" class="fas fa-cog fa-spin"></i>-->
<!--                  </button>-->
<!--                </div>-->
<!--                <div class="w-full text-center">-->
<!--                  <small>-->
<!--                    <em>The soup kitchen will send you 0.75 XYA on request.</em>-->
<!--                  </small>-->
<!--                </div>-->
<!--              </div>-->
<!--              <div class="w-full text-center" v-else>-->
<!--                <p>The kitchen has already given you your portion of soup in the past 24 hours. Come back later.</p>-->
<!--              </div>-->
<!--            </div>-->
            <div class="flex flex-wrap mt-4">
              <div class="w-full text-center">
                <p class="md:text-4xl">The soup kitchen is temporarily closed</p>
              </div>
            </div>
            <br>
            <br>
            <hr>
            <br>
            <p class="md:text-lg pb-24">
              As his obsession to understand XYA grew with every passing day, Regent Carroway decided that it was time
              to
              conduct human trials. He knew that this would be no easy task. At first, the regent had his royal guards
              find
              members of the Freyfolk with no family, relations and importance, before condemning them to excruciating
              deaths
              by subjecting their bodies to copious amounts of XYA. Despite these discrete fatal experiments, rumors
              about
              these sudden horrifying deaths quickly spread amongst the Freyfolk.
              <br>
              <br>
              Eager to continue exploring the effects of XYA, the regent had his best chefs concoct a recipe for rations
              that
              would be infused with miniscule amounts of the ore. He then ordered for a soup kitchen to be built and
              made
              available to all members of the Freyfolk, painting him in a golden light as the Freyfolk were well fed.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import {ethers} from "ethers";
import Faucet from "../plugins/artifacts/faucet.json";

export default {
  name: 'Faucet',
  computed: {
    ...mapGetters([
      'metaMaskAccount',
      'metaMaskWallet',
      'favourites'
    ])
  },
  data() {
    return {
      wrongChain: false,
      faucetContract: {},
      faucetMounted: false,
      faucetInterval: undefined,
      faucetLoaded: false,
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
  async mounted() {
    this.faucetContract = new ethers.Contract(Faucet.address, Faucet.abi, this.metaMaskWallet.signer)

    await this.fetchData()
    this.faucetLoaded = true

    this.faucetInterval = setInterval(() => {
      this.fetchData()
    }, 4000)
  },
  beforeDestroy() {
    clearInterval(this.faucetInterval)
  },
  methods: {
    ...mapActions([
      'setFavourite'
    ]),

    // CALL DATA
    async fetchData() {
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