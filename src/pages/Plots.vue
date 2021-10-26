<template>
  <section style="background: url('/images/map/worldmap.png') no-repeat; background-size: cover; min-height: 100vh"
           class="flex p-4 md:p-16 lg:px-32">
    <div style="background: #1c1c1c; z-index: 9999; overflow-y: auto;" class="screen rounded-2xl w-full">
      <section id="section-i-1" class="border-b-4 border-primary-alt"
               style="background: url('/images/SVG/homepage-bg-top.svg') no-repeat top right">
        <div class="container mx-auto text-center pt-12 pb-8">
          <h1 class="text-2xl md:text-5xl text-primary-alt font-semibold">
            Plots of Land
          </h1>
          <p class="text-xl text-primary-alt cursor-pointer" @click="setFavourite('plots')">
            <i v-if="favourites.includes('plots')" class="fas fa-star"></i>
            <i v-else class="far fa-star"></i>

            <span v-if="favourites.includes('plots')">Favourite</span>
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

        <div class="mt-8 neighbourhoods flex flex-wrap">
          <div class="w-full md:w-3/5 mx-auto flex flex-wrap">
            <div class="w-full text-center md:text-right my-auto md:w-1/2 text-center">
              <p class="text-xl mb-2">
                Select neighbourhood:
              </p>
            </div>
            <div class="w-full text-left md:w-1/2 pb-1 flex flex-wrap">
              <select class="md:ml-4 my-auto border border-yellow mx-auto cursor-pointer" name="neighbourhood"
                      id="neighbourhood-select"
                      v-model="neighbourhood">
                <option v-for="(n, index) in allNeighbourhoods" :value="index">{{ n }}</option>
              </select>
            </div>
          </div>
        </div>

        <div class="flex flex-wrap w-full mt-4">

          <div class="w-full md:w-3/5 mx-auto text-center flex flex-wrap">
            <div class="w-full">
              F: Fertility - L: Level - C: Crime rate
            </div>
            <div class="w-full">
              <button v-if="neighbourhoodSales === false"
                      class="mb-2 border border-yellow hover:text-white hover:bg-yellow rounded-none p-1 md:ml-4"
                      @click="myPlots = !myPlots">{{ myPlots ? 'Show all plots' : 'Show my plots in neighbourhood' }}
              </button>
              <button v-if="myPlots === false"
                      class="mb-2 border border-yellow hover:text-white hover:bg-yellow rounded-none p-1 md:ml-4"
                      @click="neighbourhoodSales = !neighbourhoodSales">
                {{ neighbourhoodSales ? 'Show all plots' : 'Show only neighbourhood sales' }}
              </button>
            </div>
          </div>
          <div v-if="myPlots === true" class="w-full mt-4 flex flex-wrap">
            <div v-if="ownedPlots.includes(plot.token_id)" v-for="plot in plots"
                 class="w-1/2 md:w-1/4 lg:w-1/6 2xl:w-1/12 relative">
              <img class="w-full h-full" src="/images/plots/base/0.png" alt="Base land">
              <div v-if="plot.bought === true" class="absolute top-0 left-0 w-full h-full">
                <img class="absolute top-0 left-0 w-full h-full"
                     :src="`/images/plots/soil_type/${plot.soil_type}.png`" alt="Soil Type">
                <img class="absolute top-0 left-0 w-full h-full" :src="`/images/plots/level/${plot.level}.png`"
                     alt="Level">
                <img class="absolute top-0 left-0 w-full h-full"
                     :src="`/images/plots/fertility/${plot.fertility}.png`" alt="Fertility">
                <img class="absolute top-0 left-0 w-full h-full" :src="`/images/plots/crime/${plot.crime_rate}.png`"
                     alt="Crime">

                <div class="opacity-50 absolute top-0 left-0 text-white p-2 cursor-pointer w-full h-full"
                     style="line-height: 0.75;pointer-events: none;">

                  <small>
                    ID: {{ plot.token_id }}
                  </small>
                  <br>
                  <br>
                  <div class="absolute bottom-0 pb-2">
                    <small>
                      Soil: {{ soilTypes[plot.soil_type] }}
                    </small>
                    <br>
                    <small>
                      F: {{ plot.fertility }}
                    </small>

                    <small>
                      L: {{ plot.level }}
                    </small>

                    <small>
                      C: {{ plot.crime_rate }}
                    </small>
                  </div>
                </div>

                <div class="absolute top-0 left-0 text-white p-2 cursor-pointer w-full h-full flex">
                  <div @click="visitPlot(plot)" class="text-center m-auto">
                    VISIT
                    <br>
                    {{
                      plot.sales === undefined || (plot.sales && parseInt(plot.sales.price) === 0) ? '' : parseFloat(plot.sales.price / Math.pow(10, 18)).toFixed(2) + (neighbourhood === 18 || neighbourhood === 19 ? 'YIN' : neighbourhood === 16 || neighbourhood === 17 ? 'YANG' : 'XYA')
                    }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-else-if="neighbourhoodSales === true" class="w-full mt-4 flex flex-wrap">
            <div class="w-1/2 md:w-1/4 lg:w-1/6 2xl:w-1/12 relative" v-if="plot.sales && plot.sales.forSale === true"
                 v-for="plot in plots">
              <img class="w-full h-full"
                   src="/images/plots/base/0.png" alt="Base land">
              <div class="absolute top-0 left-0 w-full h-full">
                <img class="absolute top-0 left-0 w-full h-full"
                     :src="`/images/plots/soil_type/${plot.soil_type}.png`"
                     alt="Soil Type">
                <img class="absolute top-0 left-0 w-full h-full" :src="`/images/plots/level/${plot.level}.png`"
                     alt="Level">
                <img class="absolute top-0 left-0 w-full h-full"
                     :src="`/images/plots/fertility/${plot.fertility}.png`"
                     alt="Fertility">
                <img class="absolute top-0 left-0 w-full h-full" :src="`/images/plots/crime/${plot.crime_rate}.png`"
                     alt="Crime">
                <div class="absolute top-0 left-0 text-white p-2 cursor-pointer w-full h-full"
                     style="line-height: 0.75">

                  <small>
                    {{ allNeighbourhoods[plot.neighbourhood] }}
                  </small>
                  <br>
                  <br>
                  <div class="absolute bottom-0 pb-2">
                    <small>
                      Soil: {{ soilTypes[plot.soil_type] }}
                    </small>
                    <br>
                    <small>
                      F: {{ plot.fertility }}
                    </small>
                    |
                    <small>
                      L: {{ plot.level }}
                    </small>
                    |
                    <small>
                      C: {{ plot.crime_rate }}
                    </small>
                  </div>
                </div>


                <div class="absolute top-0 left-0 text-white p-2 cursor-pointer w-full h-full flex">
                  <div @click="visitPlot(plot)" class="m-auto text-center" v-if="ownedPlots.includes(plot.token_id)">
                    VISIT
                    <br>
                    {{
                      plot.sales === undefined || (plot.sales && parseInt(plot.sales.price) === 0) ? '' : parseFloat(plot.sales.price / Math.pow(10, 18)).toFixed(2) + (neighbourhood === 18 || neighbourhood === 19 ? 'YIN' : neighbourhood === 16 || neighbourhood === 17 ? 'YANG' : 'XYA')
                    }}
                  </div>
                  <div @click="buyPlot(plot)" class="m-auto text-center" v-else-if="plot.sales && plot.sales.forSale">
                    FOR SALE
                    <br>
                    {{ parseFloat(plot.sales.price / Math.pow(10, 18)).toFixed(2) }} {{
                      neighbourhood === 18 || neighbourhood === 19 ? 'YIN' : neighbourhood === 16 || neighbourhood === 17 ? 'YANG' : 'XYA'
                    }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-else class="w-full flex">
            <div v-show="loading === false" class="plots mt-4 mb-12 w-full cursor-pointer flex flex-wrap">
              <div v-for="plot in plots" class="w-1/2 md:w-1/4 lg:w-1/6 2xl:w-1/12 relative">
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
                      class="opacity-50 absolute top-0 left-0 text-white p-2 cursor-pointer w-full h-full"
                      style="line-height: 0.75;pointer-events: none;">


                    <small>
                      ID: {{ plot.token_id }}
                    </small>
                    <br>
                    <br>
                    <div class="absolute bottom-0 pb-2">
                      <small>
                        Soil: {{ soilTypes[plot.soil_type] }}
                      </small>
                      <br>
                      <small>
                        F: {{ plot.fertility }}
                      </small>

                      <small>
                        L: {{ plot.level }}
                      </small>

                      <small>
                        C: {{ plot.crime_rate }}
                      </small>
                    </div>
                  </div>

                  <div class="absolute top-0 left-0 text-white p-2 cursor-pointer w-full h-full flex">
                    <div @click="visitPlot(plot)" class="text-center m-auto"
                         v-if="ownedPlots.includes(plot.token_id)">
                      VISIT
                      <br>
                      {{
                        plot.sales === undefined || (plot.sales && parseInt(plot.sales.price) === 0) ? '' : parseFloat(plot.sales.price / Math.pow(10, 18)).toFixed(2) + (neighbourhood === 18 || neighbourhood === 19 ? 'YIN' : neighbourhood === 16 || neighbourhood === 17 ? 'YANG' : 'XYA')
                      }}
                    </div>
                    <div @click="buyPlot(plot)" class="text-center m-auto"
                         v-else-if="plot.sales && plot.sales.forSale">
                      FOR SALE
                      <br>
                      {{ parseFloat(plot.sales.price / Math.pow(10, 18)).toFixed(2) }} {{
                        neighbourhood === 18 || neighbourhood === 19 ? 'YIN' : neighbourhood === 16 || neighbourhood === 17 ? 'YANG' : 'XYA'
                      }}
                    </div>
                  </div>
                </div>
                <div v-else class="absolute top-0 left-0 w-full h-full flex">
                </div>
              </div>
            </div>
            <div v-if="loading === true" class="my-12 flex w-full h-full">
              <div class="m-auto text-center">
                <div class="w-full flex">
                  <img class="w-24 h-24 m-auto" src="/images/XYA.png" alt="XYA logo"
                       style="animation: rotation 2s infinite linear;">
                </div>
                <br>
                <p class="text-2xl">Loading...</p>
              </div>
            </div>
          </div>
        </div>


        <window @before-close="modalClose" name="plot" width="80%">
          <div v-if="plotModalReason === 'visit' || plotModalReason === 'buy'"
               class="flex flex-wrap p-6 bg-dark h-full">
            <div class="w-4/5">
              <div class="text-2xl">{{ allNeighbourhoods[selectedPlotData.neighbourhood] }}</div>
            </div>
            <div class="w-1/5 text-right">
              <i @click="$modal.hide('plot')" class="fas fa-times cursor-pointer text-xl"></i>
            </div>
            <div v-if="plotModalReason === 'visit'" class="w-full">
              <p v-if="selectedPlotData.amountOwnedByPlot">Plot chest: {{
                  selectedPlotData.amountOwnedByPlot.split('.')[0]
                }}.{{ selectedPlotData.amountOwnedByPlot.split('.')[1].slice(0, 2) }} {{
                  neighbourhood === 18 || neighbourhood === 19 ? 'YIN' : neighbourhood === 16 || neighbourhood === 17 ? 'YANG' : 'XYA'
                }}</p>
              <p>Soil type: {{ soilTypes[selectedPlotData.soil_type] }}</p>
              <p>Fertility: {{ selectedPlotData.fertility }}</p>
              <p>Level: {{ selectedPlotData.level }}</p>
              <p>Crime rate: {{ selectedPlotData.crime_rate }}</p>
              <br>
              <div
                  v-if="!selectedPlotData.sales || (selectedPlotData.sales && selectedPlotData.sales.forSale === false)">
                <input class="text-black py-1 px-2" type="number" v-model="plotPrice">
                <br>
                <button @click="approvePlotToSellNow(selectedPlotData.token_id)"
                        class="border border-yellow hover:text-white hover:bg-yellow rounded-none px-4 py-2">
                  {{ loadingApproveSellPlot ? 'APPROVING' : 'APPROVE' }}
                </button>
                <button @click="sellPlotNow(plotPrice, selectedPlotData.token_id)"
                        class="border border-yellow hover:text-white hover:bg-yellow rounded-none px-4 py-2">
                  {{ loadingSellPlot ? 'SELLING' : 'SELL' }}
                </button>

                <br>
                <br>

                <input class="text-black py-1 px-2" type="text" placeholder="Address to send plot to..."
                       v-model="selectedPlotData.sendToAddress">
                <br>
                <button @click="sendPlotNow(selectedPlotData.sendToAddress, selectedPlotData.token_id)"
                        class="border border-yellow hover:text-white hover:bg-yellow rounded-none px-4 py-2">
                  {{ loadingSendPlot ? 'SENDING' : 'SEND' }}
                </button>
              </div>
              <div v-else>
                <button @click="cancelListing(selectedPlotData.token_id)"
                        class="border border-yellow hover:text-white hover:bg-yellow rounded-none px-4 py-2">
                  {{ loadingCancelPlotListing ? 'CANCELLING' : 'CANCEL LISTING' }}
                </button>
              </div>
            </div>
            <div v-if="plotModalReason === 'buy'" class="w-full">
              <p v-if="selectedPlotData.amountOwnedByPlot">Plot chest: {{
                  selectedPlotData.amountOwnedByPlot.split('.')[0]
                }}.{{ selectedPlotData.amountOwnedByPlot.split('.')[1].slice(0, 2) }} {{
                  neighbourhood === 18 || neighbourhood === 19 ? 'YIN' : neighbourhood === 16 || neighbourhood === 17 ? 'YANG' : 'XYA'
                }}</p>
              <p>Soil type: {{ soilTypes[selectedPlotData.soil_type] }}</p>
              <p>Fertility: {{ selectedPlotData.fertility }}</p>
              <p>Level: {{ selectedPlotData.level }}</p>
              <p>Crime rate: {{ selectedPlotData.crime_rate }}</p>
              <br>
              <p>Plot price: {{ selectedPlotData.sales.price / Math.pow(10, 18) }} {{
                  neighbourhood === 18 || neighbourhood === 19 ? 'YIN' : neighbourhood === 16 || neighbourhood === 17 ? 'YANG' : 'XYA'
                }}</p>
              <button @click="approvePlotNow(selectedPlotData.sales.price)"
                      class="border border-yellow hover:text-white hover:bg-yellow rounded-none px-4 py-2">
                {{ loadingApproveBuyPlot ? 'APPROVING' : 'APPROVE' }}
              </button>
              <button @click="buyPlotNow(selectedPlotData.sales.price, selectedPlotData.token_id)"
                      class="border border-yellow hover:text-white hover:bg-yellow rounded-none ml-1 px-4 py-2">
                {{ loadingBuyPlot ? 'BUYING' : 'BUY' }}
              </button>
            </div>
          </div>
        </window>

        <window name="error" width="80%">
          <div class="flex flex-wrap p-6 bg-dark h-full">
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
import PlotsMarket from "../plugins/artifacts/plotsmarket.json";
import PlotsYinMarket from "../plugins/artifacts/plotsyinmarket.json";
import PlotsYangMarket from "../plugins/artifacts/plotsyangmarket.json";
import {ethers} from "ethers";
import fromExponential from "from-exponential";

import freyalaSnapshot from '../plugins/snapshots/freyalaPlots.json'
import yinSnapshot from '../plugins/snapshots/yinPlots.json'
import yangSnapshot from '../plugins/snapshots/yangPlots.json'

export default {
  name: 'Plots',
  mixins: [wallet],
  data() {
    return {
      plotContracts: {
        xya: undefined,
        yin: undefined,
        yang: undefined,
      },
      tokenContracts: {
        xya: undefined,
        yin: undefined,
        yang: undefined,
      },
      marketContracts: {
        xya: undefined,
        yin: undefined,
        yang: undefined,
      },
      mounted: false,
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
      soilTypes: [
        'Clay',
        'Loam',
        'Sand',
        'Silt'
      ],
      neighbourhood: 0,
      ownedPlots: [],
      plots: [],
      loading: true,
      neighbourhoodSales: false,
      myPlots: false,
      plotMin: 0,
      plotMax: 0,
      plotPrice: 0,
      plotModalId: 0,
      selectedPlotData: {},
      plotModalReason: '',
      error: '',
      loadingBuyPlot: false,
      loadingSellPlot: false,
      loadingApproveBuyPlot: false,
      loadingApproveSellPlot: false,
      loadingSendPlot: false,
      loadingCancelPlotListing: false
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
    [this.plotContracts.xya, this.plotContracts.yin, this.plotContracts.yang, this.tokenContracts.xya, this.tokenContracts.yin, this.tokenContracts.yang, this.marketContracts.xya, this.marketContracts.yin, this.marketContracts.yang] = await Promise.all([
      new ethers.Contract(PlotsFreyala.address, PlotsFreyala.abi, this.metaMaskWallet.signer),
      new ethers.Contract(PlotsYin.address, PlotsYin.abi, this.metaMaskWallet.signer),
      new ethers.Contract(PlotsYang.address, PlotsYang.abi, this.metaMaskWallet.signer),
      new ethers.Contract(Freyala.address, Freyala.abi, this.metaMaskWallet.signer),
      new ethers.Contract(Yin.address, Yin.abi, this.metaMaskWallet.signer),
      new ethers.Contract(Yang.address, Yang.abi, this.metaMaskWallet.signer),
      new ethers.Contract(PlotsMarket.address, PlotsMarket.abi, this.metaMaskWallet.signer),
      new ethers.Contract(PlotsYinMarket.address, PlotsYinMarket.abi, this.metaMaskWallet.signer),
      new ethers.Contract(PlotsYangMarket.address, PlotsYangMarket.abi, this.metaMaskWallet.signer)
    ])

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
      'metaMaskAccount',
      'metaMaskWallet',
      'favourites'
    ])
  },
  methods: {
    ...mapActions([
      'setFavourite'
    ]),
    async reGrabPlots(type) {
      this.loading = true

      this.plots = []
      this.ownedPlots = []

      this.plotMin = ((type === 'freyala' ? 2000 : 500) / (type === 'freyala' ? 16 : 2)) * (this.neighbourhood + 1) - ((type === 'freyala' ? 2000 : 500) / (type === 'freyala' ? 16 : 2))
      this.plotMax = ((type === 'freyala' ? 2000 : 500) / (type === 'freyala' ? 16 : 2)) * (this.neighbourhood + 1)

      const ownedPlots = await this.plotContracts[type === 'freyala' ? 'xya' : type === 'yin' ? 'yin' : 'yang'].tokensOfOwner(this.metaMaskAccount)

      ownedPlots.map((plot) => {
        this.ownedPlots.push(plot.toNumber())
      })

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

      const plots = await this.plots.map(async (p, index) => {
        try {
          let filteredPlot = []

          if (type === 'freyala') {
            filteredPlot = freyalaSnapshot.plots.filter((plot) => {
              return p.plot_number === plot.plot_number && this.neighbourhood === plot.neighbourhood
            })
          } else if (type === 'yin') {
            filteredPlot = yinSnapshot.plots.filter((plot) => {
              return p.plot_number === plot.plot_number && this.neighbourhood === plot.neighbourhood
            })
          } else {
            filteredPlot = yangSnapshot.plots.filter((plot) => {
              return p.plot_number === plot.plot_number && this.neighbourhood === plot.neighbourhood
            })
          }

          if (filteredPlot) {
            this.plots[index] = {
              neighbourhood: filteredPlot[0].neighbourhood,
              token_id: filteredPlot[0].token_id,
              plot_number: filteredPlot[0].plot_number,
              soil_type: filteredPlot[0].soil_type,
              fertility: filteredPlot[0].fertility,
              level: filteredPlot[0].level,
              crime_rate: filteredPlot[0].crime_rate,
              bought: true
            }
          }

          const sales = await this.marketContracts[type === 'freyala' ? 'xya' : type === 'yin' ? 'yin' : 'yang'].getListing(filteredPlot[0].token_id)

          this.plots[index].sales = {
            seller: 0,
            buyer: 0,
            tokenId: p.token_id,
            price: 0,
            forSale: false,
          }

          if (sales[4]) {
            this.plots[index].sales.seller = sales[0]
            this.plots[index].sales.buyer = sales[1]
            this.plots[index].sales.price = ethers.BigNumber.from(sales[3]).toString()
            this.plots[index].sales.forSale = sales[4]
          }
        } catch {
        }
      })

      await Promise.all(plots).then(async () => {
        this.plots = this.plots.sort((a, b) => {
          return a.plot_number - b.plot_number;
        })

        this.loading = false
      })
    },
    modalClose() {
      this.plotModalReason = ''
    },
    async sendPlotNow(address, id) {
      if (this.neighbourhood === 18 || this.neighbourhood === 19) {
        this.loadingSendPlot = true
        const send = await this.plotContracts.yin.transferFrom(this.metaMaskAccount, address, id)
        await send.wait(1)

        this.loadingSendPlot = false
        window.location.reload(1)
      } else if (this.neighbourhood === 16 || this.neighbourhood === 17) {
        this.loadingSendPlot = true
        const send = await this.plotContracts.yang.transferFrom(this.metaMaskAccount, address, id)
        await send.wait(1)

        this.loadingSendPlot = false
        window.location.reload(1)
      } else {
        this.loadingSendPlot = true
        const send = await this.plotContracts.xya.transferFrom(this.metaMaskAccount, address, id)
        await send.wait(1)

        this.loadingSendPlot = false
        window.location.reload(1)
      }
    },
    async cancelListing(id) {
      if (this.neighbourhood === 18 || this.neighbourhood === 19) {
        this.loadingCancelPlotListing = true
        const cancel = await this.marketContracts.yin.cancelListing(id)
        await cancel.wait(1)

        this.loadingCancelPlotListing = false
        window.location.reload(1)
      } else if (this.neighbourhood === 16 || this.neighbourhood === 17) {
        this.loadingCancelPlotListing = true
        const cancel = await this.marketContracts.yang.cancelListing(id)
        await cancel.wait(1)

        this.loadingCancelPlotListing = false
        window.location.reload(1)
      } else {
        this.loadingCancelPlotListing = true
        const cancel = await this.marketContracts.xya.cancelListing(id)
        await cancel.wait(1)

        this.loadingCancelPlotListing = false
        window.location.reload(1)
      }
    },
    async approvePlotToSellNow(id) {
      if (this.neighbourhood === 18 || this.neighbourhood === 19) {
        this.loadingApproveSellPlot = true
        this.plotYinFreyalaContract = new ethers.Contract(PlotsYin.address, PlotsYin.abi, this.metaMaskWallet.signer)
        const approve = await this.plotYinFreyalaContract.approve(PlotsYinMarket.address, id)
        await approve.wait(1)

        this.loadingApproveSellPlot = false
      } else if (this.neighbourhood === 16 || this.neighbourhood === 17) {
        this.loadingApproveSellPlot = true
        this.plotYangFreyalaContract = new ethers.Contract(PlotsYang.address, PlotsYang.abi, this.metaMaskWallet.signer)
        const approve = await this.plotYangFreyalaContract.approve(PlotsYangMarket.address, id)
        await approve.wait(1)

        this.loadingApproveSellPlot = false
      } else {
        this.loadingApproveSellPlot = true
        this.plotContracts.xya = new ethers.Contract(PlotsFreyala.address, PlotsFreyala.abi, this.metaMaskWallet.signer)
        const approve = await this.plotContracts.xya.approve(PlotsMarket.address, id)
        await approve.wait(1)

        this.loadingApproveSellPlot = false
      }
    },
    async sellPlotNow(amount, id) {
      if (this.neighbourhood === 18 || this.neighbourhood === 19) {
        this.loadingSellPlot = true
        const actual = amount * (10 ** 18)
        const arg = fromExponential(actual)
        const sales = await this.marketContracts.yin.createListing(id, arg)
        await sales.wait(1)

        this.loadingSellPlot = false
        window.location.reload(1)
      } else if (this.neighbourhood === 16 || this.neighbourhood === 17) {
        this.loadingSellPlot = true
        const actual = amount * (10 ** 18)
        const arg = fromExponential(actual)
        const sales = await this.marketContracts.yang.createListing(id, arg)
        await sales.wait(1)

        this.loadingSellPlot = false
        window.location.reload(1)
      } else {
        this.loadingSellPlot = true
        const actual = amount * (10 ** 18)
        const arg = fromExponential(actual)
        const sales = await this.marketContracts.xya.createListing(id, arg)
        await sales.wait(1)

        this.loadingSellPlot = false
        window.location.reload(1)
      }
    },
    async approvePlotNow(amount) {
      if (this.neighbourhood === 18 || this.neighbourhood === 19) {
        this.loadingApproveBuyPlot = true
        const mainYinContract = new ethers.Contract(Yin.address, Yin.abi, this.metaMaskWallet.signer)
        const approve = await mainYinContract.approve(PlotsYinMarket.address, amount)
        await approve.wait(1)

        this.loadingApproveBuyPlot = false
      } else if (this.neighbourhood === 16 || this.neighbourhood === 17) {
        this.loadingApproveBuyPlot = true
        const mainYangContract = new ethers.Contract(Yang.address, Yang.abi, this.metaMaskWallet.signer)
        const approve = await mainYangContract.approve(PlotsYangMarket.address, amount)
        await approve.wait(1)

        this.loadingApproveBuyPlot = false
      } else {
        this.loadingApproveBuyPlot = true
        this.mainContract = new ethers.Contract(Freyala.address, Freyala.abi, this.metaMaskWallet.signer)
        const approve = await this.mainContract.approve(PlotsMarket.address, amount)
        await approve.wait(1)

        this.loadingApproveBuyPlot = false
      }
    },
    async buyPlotNow(amount, id) {
      if (this.neighbourhood === 18 || this.neighbourhood === 19) {
        this.loadingBuyPlot = true
        const sales = await this.marketContracts.yin.buy(amount, id)
        await sales.wait(1)

        this.loadingBuyPlot = false
        window.location.reload(1)
      } else if (this.neighbourhood === 16 || this.neighbourhood === 17) {
        this.loadingBuyPlot = true
        const sales = await this.marketContracts.yang.buy(amount, id)
        await sales.wait(1)

        this.loadingBuyPlot = false
        window.location.reload(1)
      } else {
        this.loadingBuyPlot = true
        const sales = await this.marketContracts.xya.buy(amount, id)
        await sales.wait(1)

        this.loadingBuyPlot = false
        window.location.reload(1)
      }
    },
    async visitPlot(data) {
      let plot = {}

      if (this.neighbourhood === 18 || this.neighbourhood === 19) {
        plot = await this.plotContracts.yin.plots(data.token_id)
      } else if (this.neighbourhood === 16 || this.neighbourhood === 17) {
        plot = await this.plotContracts.yang.plots(data.token_id)
      } else {
        plot = await this.plotContracts.xya.plots(data.token_id)
      }

      data.amountOwnedByPlot = ethers.utils.formatEther(plot._amountOwnedByPlot._isBigNumber ? ethers.BigNumber.from(plot._amountOwnedByPlot).toString() : plot._amountOwnedByPlot)
      this.selectedPlotData = data

      this.plotModalReason = 'visit'

      this.$modal.show('plot')
    },
    async buyPlot(data) {
      let plot = {}

      if (this.neighbourhood === 18 || this.neighbourhood === 19) {
        plot = await this.plotContracts.yin.plots(data.token_id)
      } else if (this.neighbourhood === 16 || this.neighbourhood === 17) {
        plot = await this.plotContracts.yang.plots(data.token_id)
      } else {
        plot = await this.plotContracts.xya.plots(data.token_id)
      }

      data.amountOwnedByPlot = ethers.utils.formatEther(plot._amountOwnedByPlot._isBigNumber ? ethers.BigNumber.from(plot._amountOwnedByPlot).toString() : plot._amountOwnedByPlot)
      this.selectedPlotData = data

      this.plotModalReason = 'buy'

      this.$modal.show('plot')
    },
  }
}
</script>