<template>
  <section style="background: url('/images/map/worldmap.png') no-repeat; background-size: cover; min-height: 100vh"
           class="flex p-4 md:p-16 lg:px-32">
    <div style="z-index: 9999; overflow-y: auto;" class="screen bg-white rounded-2xl w-full">
      <section id="section-i-1" class="border-b-4 border-primary-alt"
               style="background: url('/images/SVG/homepage-bg-top.svg') no-repeat top right">
        <div class="container mx-auto text-center pt-16 md:pt-24 pb-16 md:pb-20">
          <h1 class="text-2xl md:text-5xl text-primary-alt font-semibold">
            Plots of Land
          </h1>
<!--          <p class="text-xl text-primary-alt cursor-pointer" @click="setFavourite('plots')">-->
<!--            <i v-if="favourites.includes('plots')" class="fas fa-star"></i>-->
<!--            <i v-else class="far fa-star"></i>-->

<!--            <span v-if="favourites.includes('plots')">Favourite</span>-->
<!--            <span v-else>Favourite</span>-->
<!--          </p>-->
        </div>
      </section>

      <div class="p-4 md:p-8 relative">
        <div class="absolute top-0 left-0 p-4 md:p-8">
          <router-link :to="{ name: 'world-map' }">
            <i class="fas fa-long-arrow-alt-left"></i> Back
          </router-link>
        </div>

        <div class="mt-8 neighbourhoods flex flex-wrap">
          <div class="w-full text-center">
            <p class="text-xl mb-2">
              Select neighbourhood:
            </p>
          </div>
          <div class="w-full mx-auto flex flex-wrap">
            <select class="mx-auto my-2 cursor-pointer" name="neighbourhood" id="neighbourhood-select"
                    v-model="neighbourhood">
              <option v-for="(n, index) in allNeighbourhoods" :value="index">{{ n }}</option>
            </select>
          </div>
          <div class="w-full flex flex-wrap mx-auto">
            <div v-if="xyaAllowance < 500 || yinAllowance < 500 || yangAllowance < 500" class="w-full text-center mb-2">
              <p>
                Before buying a plot, you will have to approve the contract to move the tokens in your name. Approve the appropriate token:
              </p>
            </div>
            <div v-if="xyaAllowance < 500" class="w-full lg:w-auto mx-auto text-center lg:ml-auto mb-2">
              <button
                  @click="addAllowance('freyala')"
                  class="m-auto tracking-widest uppercase bg-gradient-to-r from-primary to-secondary py-2 px-4 rounded-md text-white text-sm md:text-xl font-semibold"
                  >{{ loadingxyaapprove ? 'loading...' : 'Approve XYA'}}
              </button>
            </div>
            <div v-if="yinAllowance < 500" class="w-full lg:w-auto mx-auto text-center mb-2">
              <button
                  @click="addAllowance('yin')"
                  class="m-auto tracking-widest uppercase bg-gradient-to-r from-primary to-secondary py-2 px-4 rounded-md text-white text-sm md:text-xl font-semibold"
                  >{{ loadingyinapprove ? 'loading...' : 'Approve YIN'}}
              </button></div>
            <div v-if="yangAllowance < 500" class="w-full lg:w-auto mx-auto text-center lg:mr-auto mb-2">
              <button
                  @click="addAllowance('yang')"
                  class="m-auto tracking-widest uppercase bg-gradient-to-r from-primary to-secondary py-2 px-4 rounded-md text-white text-sm md:text-xl font-semibold"
                  >{{ loadingyangapprove ? 'loading...' : 'Approve YANG'}}
              </button></div>
          </div>
        </div>

        <div v-if="loading === false" class="plots my-12 w-full cursor-pointer">
          <div class="flex flex-wrap">
            <div v-for="(plot, index) in plots" class="w-1/2 md:w-1/4 lg:w-1/6 2xl:w-1/12 relative">
              <img :class="ownedPlots.includes(plot.token_id) ? 'border-2 border-white' : ''" class="w-full h-full"
                   src="/images/plots/base/0.png" alt="Base land">
              <div v-if="plot.bought === true"
                   class="absolute top-0 left-0 w-full h-full">
                <img :class="ownedPlots.includes(plot.token_id) ? 'border-2 border-white' : ''"
                     class="absolute top-0 left-0 w-full h-full"
                     :src="`/images/plots/soil_type/${plot.soil_type}.png`" alt="Soil Type">
                <img :class="ownedPlots.includes(plot.token_id) ? 'border-2 border-white' : ''"
                     class="absolute top-0 left-0 w-full h-full" :src="`/images/plots/level/${plot.level}.png`"
                     alt="Level">
                <img :class="ownedPlots.includes(plot.token_id) ? 'border-2 border-white' : ''"
                     class="absolute top-0 left-0 w-full h-full"
                     :src="`/images/plots/fertility/${plot.fertility}.png`" alt="Fertility">
                <img :class="ownedPlots.includes(plot.token_id) ? 'border-2 border-white' : ''"
                     class="absolute top-0 left-0 w-full h-full" :src="`/images/plots/crime/${plot.crime_rate}.png`"
                     alt="Crime">

                <div
                    class="opacity-0 hover:opacity-75 absolute top-0 left-0 text-white p-3 cursor-pointer w-full h-full"
                    style="line-height: 0.75">

                  <!--                  <div class="absolute top-0 left-0 w-full h-full flex">-->
                  <!--                    <button-->
                  <!--                        @click="$modal.show('coming-soon')"-->
                  <!--                        class="opacity-75 hover:opacity-100 m-auto tracking-widest uppercase bg-gradient-to-r from-primary to-secondary py-1 px-2 rounded-md text-white text-sm font-semibold">-->
                  <!--                      Enter plot!-->
                  <!--                    </button>-->
                  <!--                  </div>-->

                  <small v-if="ownedPlots.includes(plot.token_id)">
                    This is yours!
                    <br>
                  </small>
                  <small>
                    Soil type: {{ soilTypes[plot.soil_type] }}
                  </small>
                  <br>
                  <small>
                    Fertility: {{ plot.level }}
                  </small>
                  <br>
                  <small>
                    Level: {{ plot.fertility }}
                  </small>
                  <br>
                  <small>
                    Crime: {{ plot.crime_rate }}
                  </small>
                </div>
              </div>
              <div v-else class="absolute top-0 left-0 w-full h-full flex">
                <button
                    @click="mintPlot(plot.plot_number)"
                    class="opacity-25 hover:opacity-75 m-auto tracking-widest uppercase bg-gradient-to-r from-primary to-secondary py-1 px-2 rounded-md text-white text-sm font-semibold">
                  Buy!
                </button>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="my-12 flex w-full h-full">
          <p class="m-auto text-xl text-center">
            Loading plots...
          </p>
        </div>

        <window name="coming-soon" width="80%">
          <div class="flex flex-wrap py-2 px-3 bg-gradient-to-r from-primary to-secondary text-white h-full">
            <div class="w-4/5">
              <div class="text-2xl">Plot!</div>
            </div>
            <div class="w-1/5 text-right">
              <i @click="$modal.hide('coming-soon')" class="fas fa-times cursor-pointer text-xl"></i>
            </div>
            <p class="w-full text-center mt-4">
              Coming soon..
            </p>
          </div>
        </window>

        <window name="error" width="80%">
          <div class="flex flex-wrap py-2 px-3 bg-gradient-to-r from-primary to-secondary text-white h-full">
            <div class="w-4/5">
              <div class="text-2xl">ERROR!</div>
            </div>
            <div class="w-1/5 text-right">
              <i @click="$modal.hide('error')" class="fas fa-times cursor-pointer text-xl"></i>
            </div>
            <p class="w-full text-center mt-4">
              {{ error }}
            </p>
          </div>
        </window>

        <!--        <p class="text-lg md:text-xl pb-24">-->
        <!--          Seeing the limitless possibilities XYA had to offer, Regent Carroway sought out to harness all the magical-->
        <!--          power-->
        <!--          from the world’s core. He ordered a beacon to be constructed, which siphoned the world’s magic and shot up a-->
        <!--          blinding light to the sky, forever making the Freyala kingdom’s presence known. The regent proudly showed this-->
        <!--          beacon to Zarius, the village elder and his dear friend. Zarius was shocked to see these elaborate schemes-->
        <!--          that-->
        <!--          Carroway had been planning. The village elder turned his back away, determined to inform the public of his-->
        <!--          findings, and how Carroway was attempting to seize ultimate power.-->

        <!--          The regent shot Zarius a cold stare, then grasped tightly onto the village elder and propelled him towards the-->
        <!--          unstable beacon core before ultimately letting go. Carroway had parted ways with his dear friend. Yet, in-->
        <!--          front-->
        <!--          of him was the future. And this was all that mattered.-->
        <!--        </p>-->
      </div>
    </div>
  </section>
</template>

<script>
import wallet from "../plugins/wallet"
import {mapActions, mapGetters} from "vuex";
import PlotsYang from "../plugins/artifacts/plotsyang.json";
import PlotsYin from "../plugins/artifacts/plotsyin.json";
import PlotsFreyala from "../plugins/artifacts/plotsfreyala.json";
import Freyala from "../plugins/artifacts/freyala.json";
import Yin from "../plugins/artifacts/yin.json";
import Yang from "../plugins/artifacts/yang.json";
import {ethers} from "ethers";
import fromExponential from "from-exponential";

export default {
  name: 'Plots',
  mixins: [wallet],
  data() {
    return {
      xyaAllowance: 0,
      yinAllowance: 0,
      yangAllowance: 0,
      error: '',
      loadingxyaapprove: false,
      loadingyinapprove: false,
      loadingyangapprove: false,
      neighbourhoodData: [],
      allNeighbourhoods: [
        'Mercafell',
        'Ardenia Fields',
        'Ardenia Valleys',
        'Sora Plains',
        'Lightside Estate',
        'Litha Sanctuary',
        'Jara Isles',
        'Whitepines Quarry',
        'Irae Haven',
        'Machir City',
        'Zaro Plains',
        'Cyran City',
        'Carroway District',
        'Arixa Estate',
        'Josiro Retreat',
        'Frey Oasis',
        'Xera Settlement (YANG)',
        'Sora Gardens (YANG)',
        'Halis Ruins (YIN)',
        'Yira Citadel (YIN)'
      ],
      neighbourhood: 0,
      ownedPlots: [],
      soilTypes: [
        'Clay',
        'Loam',
        'Sand',
        'Silt'
      ],
      plotMin: 0,
      plotMax: 0,
      plots: [],
      loading: true,
      mainContact: undefined,
      plotFreyalaContract: undefined,
      plotYinContract: undefined,
      plotYangContract: undefined,
      mounted: false
    }
  },
  watch: {
    async neighbourhood() {
      if (this.mounted) {
        window.history.pushState(
            {},
            null,
            '#' + this.$route.path.replace(this.$route.params.neighbourhood, '') + this.neighbourhood
        )

        if (this.neighbourhood === 18 || this.neighbourhood === 19) {
          await this.reGrabPlots('yin')
        } else if (this.neighbourhood === 16 || this.neighbourhood === 17) {
          await this.reGrabPlots('yang')
        } else {
          await this.reGrabPlots('freyala')
        }
      }
    }
  },
  async created() {
    if (!this.$route.params.neighbourhood) {
      await this.$router.push({name: 'plots', params: {neighbourhood: '0'}})
    } else {
      this.neighbourhood = parseInt(this.$route.params.neighbourhood)
    }
  },
  async mounted() {
    const xya = new ethers.Contract(Freyala.address, Freyala.abi, this.metaMaskWallet.signer)
    const xyaAllowance = await xya.allowance(this.metaMaskAccount, PlotsFreyala.address)
    this.xyaAllowance = (xyaAllowance / Math.pow(10, 18))

    const yin = new ethers.Contract(Yin.address, Yin.abi, this.metaMaskWallet.signer)
    const yinAllowance = await yin.allowance(this.metaMaskAccount, PlotsYin.address)
    this.yinAllowance = (yinAllowance / Math.pow(10, 18))

    const yang = new ethers.Contract(Yang.address, Yang.abi, this.metaMaskWallet.signer)
    const yangAllowance = await yang.allowance(this.metaMaskAccount, PlotsYang.address)
    this.yangAllowance = (yangAllowance / Math.pow(10, 18))

    if (this.neighbourhood === 18 || this.neighbourhood === 19) {
      await this.reGrabPlots('yin')
    } else if (this.neighbourhood === 16 || this.neighbourhood === 17) {
      await this.reGrabPlots('yang')
    } else {
      await this.reGrabPlots('freyala')
    }

    this.mounted = true
  },
  computed: {
    ...mapGetters([
      'chainID',
      'chainStatus',
      'loadingBalances',
      'userBalance',
      'loggedIn',
      'walletConnected',
      'metaMaskAccount',
      'metaMaskWallet',
      'openWindow',
      'allowance',
      'favourites'
    ])
  },
  methods: {
    ...mapActions([
      'setFavourite'
    ]),
    async addAllowance(type) {
      let actual = 0

      actual = 9999999 * (10 ** 18);

      const arg = fromExponential(actual);

      if (type === 'freyala') {
        this.loadingxyaapprove = true
        const mainContact = new ethers.Contract(Freyala.address, Freyala.abi, this.metaMaskWallet.signer)
        const txXYA = await mainContact.approve(PlotsFreyala.address, arg)

        await txXYA.wait(1)
        this.loadingxyaapprove = false

        const xya = new ethers.Contract(Freyala.address, Freyala.abi, this.metaMaskWallet.signer)
        const xyaAllowance = await xya.allowance(this.metaMaskAccount, PlotsFreyala.address)
        this.xyaAllowance = (xyaAllowance / Math.pow(10, 18))
      }

      if (type === 'yin') {
        this.loadingyinapprove = true
        const mainContact = new ethers.Contract(Yin.address, Yin.abi, this.metaMaskWallet.signer)
        const txYIN = await mainContact.approve(PlotsYin.address, arg)

        await txYIN.wait(1)
        this.loadingyinapprove = false

        const yin = new ethers.Contract(Yin.address, Yin.abi, this.metaMaskWallet.signer)
        const yinAllowance = await yin.allowance(this.metaMaskAccount, PlotsYin.address)
        this.yinAllowance = (yinAllowance / Math.pow(10, 18))
      }

      if (type === 'yang') {
        this.loadingyangapprove = true
        const mainContact = new ethers.Contract(Yang.address, Yang.abi, this.metaMaskWallet.signer)
        const txYANG = await mainContact.approve(PlotsYang.address, arg)

        await txYANG.wait(1)
        this.loadingyangapprove = false

        const yang = new ethers.Contract(Yang.address, Yang.abi, this.metaMaskWallet.signer)
        const yangAllowance = await yang.allowance(this.metaMaskAccount, PlotsYang.address)
        this.yangAllowance = (yangAllowance / Math.pow(10, 18))
      }
    },
    async mintPlot(plotNumber) {
      if (this.neighbourhood === 18 || this.neighbourhood === 19) {

        try {
          const tx = await this.plotYinContract.mintPlot(this.neighbourhood, plotNumber, 1)
          await tx.wait(1)
        } catch (err) {
          if (err.code !== 4001) {
            this.error = err.data ? err.data.message : err
            this.$modal.show('error')
          }
          console.error(err);
          this.error = err.data ? err.data.message : err
          this.$modal.show('error')
        }

        await this.reGrabPlots('yin')
      } else if (this.neighbourhood === 16 || this.neighbourhood === 17) {
        try {
          const tx = await this.plotYangContract.mintPlot(this.neighbourhood, plotNumber, 1)
          await tx.wait(1)
        } catch (err) {
          if (err.code !== 4001) {
            this.error = err.data ? err.data.message : err
            this.$modal.show('error')
          }
          console.error(err);
          this.error = err.data ? err.data.message : err
          this.$modal.show('error')
        }

        await this.reGrabPlots('yang')
      } else {
        try {
          const tx = await this.plotFreyalaContract.mintPlot(this.neighbourhood, plotNumber, 1)
          await tx.wait(1)
        } catch (err) {
          if (err.code !== 4001) {
            this.error = err.data ? err.data.message : err
            this.$modal.show('error')
          }
          console.error(err);
          this.error = err.data ? err.data.message : err
          this.$modal.show('error')
        }

        await this.reGrabPlots('freyala')
      }
    },
    async reGrabPlots(type) {
      this.plots = []
      this.ownedPlots = []

      if (type === 'freyala') {
        this.plotMin = (2000 / 16) * (this.neighbourhood + 1) - (2000 / 16)
        this.plotMax = (2000 / 16) * (this.neighbourhood + 1)

        this.loading = false

        this.mainContact = new ethers.Contract(Freyala.address, Freyala.abi, this.metaMaskWallet.signer)
        this.plotFreyalaContract = new ethers.Contract(PlotsFreyala.address, PlotsFreyala.abi, this.metaMaskWallet.signer)

        const totalSupply = await this.plotFreyalaContract.totalSupply()

        const ownedPlots = await this.plotFreyalaContract.tokensOfOwner(this.metaMaskAccount)
        ownedPlots.map((plot) => {
          this.ownedPlots.push(plot.toNumber())
        })

        this.loading = true

        for (let i = 0; i < 125; i++) {
          this.plots.push({
            neighbourhood: this.neighbourhood,
            plot_number: i,
            soil_type: 0,
            fertility: 0,
            level: 0,
            crime_rate: 0,
            bought: false
          })
        }

        for (let i = 0; i < totalSupply.toNumber(); i++) {
          const plot = await this.plotFreyalaContract.plots(i)

          if (plot[0] !== '0x0000000000000000000000000000000000000000') {
            this.plots.map((p, index) => {
              if (p.plot_number === plot._plotNumber.toNumber() && this.neighbourhood === plot._neighbourhood.toNumber()) {
                this.plots[index] = {
                  neighbourhood: plot._neighbourhood.toNumber(),
                  token_id: plot._tokenId.toNumber(),
                  plot_number: plot._plotNumber.toNumber(),
                  soil_type: plot._soilType.toNumber(),
                  fertility: plot._fertility.toNumber(),
                  level: plot._level.toNumber(),
                  crime_rate: plot._crimeRate.toNumber(),
                  bought: true
                }
              }
            })
          }
        }

        this.plots = this.plots.sort((a, b) => {
          return a.plot_number - b.plot_number;
        })

        this.loading = false
      } else if (type === 'yang') {
        this.plotMin = (250 / 2) * ((this.neighbourhood - 16) + 1) - (250 / 2)
        this.plotMax = (250 / 2) * ((this.neighbourhood - 16) + 1)

        this.loading = false

        this.mainContact = new ethers.Contract(Yang.address, Yang.abi, this.metaMaskWallet.signer)
        this.plotYangContract = new ethers.Contract(PlotsYang.address, PlotsYang.abi, this.metaMaskWallet.signer)

        const totalSupply = await this.plotYangContract.totalSupply()

        const ownedPlots = await this.plotYangContract.tokensOfOwner(this.metaMaskAccount)
        ownedPlots.map((plot) => {
          this.ownedPlots.push(plot.toNumber())
        })

        this.loading = true

        for (let i = 0; i < 125; i++) {
          this.plots.push({
            neighbourhood: this.neighbourhood,
            plot_number: i,
            soil_type: 0,
            fertility: 0,
            level: 0,
            crime_rate: 0,
            bought: false
          })
        }

        for (let i = 0; i < totalSupply.toNumber(); i++) {
          const plot = await this.plotYangContract.plots(i)

          if (plot[0] !== '0x0000000000000000000000000000000000000000') {
            this.plots.map((p, index) => {
              if (p.plot_number === plot._plotNumber.toNumber() && this.neighbourhood === plot._neighbourhood.toNumber()) {
                this.plots[index] = {
                  neighbourhood: plot._neighbourhood.toNumber(),
                  token_id: plot._tokenId.toNumber(),
                  plot_number: plot._plotNumber.toNumber(),
                  soil_type: plot._soilType.toNumber(),
                  fertility: plot._fertility.toNumber(),
                  level: plot._level.toNumber(),
                  crime_rate: plot._crimeRate.toNumber(),
                  bought: true
                }
              }
            })
          }
        }

        this.plots = this.plots.sort((a, b) => {
          return a.plot_number - b.plot_number;
        })

        this.loading = false
      } else if (type === 'yin') {
        this.plotMin = (250 / 2) * ((this.neighbourhood - 18) + 1) - (250 / 2)
        this.plotMax = (250 / 2) * ((this.neighbourhood - 18) + 1)

        this.loading = false

        this.mainContact = new ethers.Contract(Yin.address, Yin.abi, this.metaMaskWallet.signer)
        this.plotYinContract = new ethers.Contract(PlotsYin.address, PlotsYin.abi, this.metaMaskWallet.signer)

        const totalSupply = await this.plotYinContract.totalSupply()

        const ownedPlots = await this.plotYinContract.tokensOfOwner(this.metaMaskAccount)
        ownedPlots.map((plot) => {
          this.ownedPlots.push(plot.toNumber())
        })

        this.loading = true

        for (let i = 0; i < 125; i++) {
          this.plots.push({
            neighbourhood: this.neighbourhood,
            plot_number: i,
            soil_type: 0,
            fertility: 0,
            level: 0,
            crime_rate: 0,
            bought: false
          })
        }

        for (let i = 0; i < totalSupply.toNumber(); i++) {
          const plot = await this.plotYinContract.plots(i)

          if (plot[0] !== '0x0000000000000000000000000000000000000000') {
            this.plots.map((p, index) => {
              if (p.plot_number === plot._plotNumber.toNumber() && this.neighbourhood === plot._neighbourhood.toNumber()) {
                this.plots[index] = {
                  neighbourhood: plot._neighbourhood.toNumber(),
                  token_id: plot._tokenId.toNumber(),
                  plot_number: plot._plotNumber.toNumber(),
                  soil_type: plot._soilType.toNumber(),
                  fertility: plot._fertility.toNumber(),
                  level: plot._level.toNumber(),
                  crime_rate: plot._crimeRate.toNumber(),
                  bought: true
                }
              }
            })
          }
        }

        this.plots = this.plots.sort((a, b) => {
          return a.plot_number - b.plot_number;
        })

        this.loading = false
      }
    }
  }
}
</script>