<template>
  <section style="background: url('/images/map/worldmap_small.png') no-repeat; background-size: cover; min-height: 100vh"
           class="flex p-4 md:p-16 lg:px-32">
    <div style="background: #1c1c1c; z-index: 9999; overflow-y: auto;" class="screen rounded-2xl w-full">
      <section id="section-i-1" class="border-b-4 border-bbrown"
               style="background: url('/images/SVG/homepage-bg-top.svg') no-repeat top right">
        <div class="container mx-auto text-center py-16">
          <h1 class="text-2xl md:text-5xl text-primary-alt font-semibold">
            Plots of Land
          </h1>
        </div>
      </section>

      <div class="flex flex-wrap p-4 md:p-8">
        <div class="w-full md:w-1/4 mb-12">
          <div class="flex flex-wrap w-full mx-auto">
            <div class="w-full text-center">
              <p class="text-xl mb-2">
                Select neighbourhood:
              </p>
              <select
                  class="p-1 bg-dark border border-bbrown rounded-xl cursor-pointer xya-btn mx-auto mb-4"
                  name="neighbourhood"
                  id="neighbourhood-select"
                  v-model="neighbourhood">
                <option v-for="(n, index) in allNeighbourhoods" :value="index">{{ n }}</option>
              </select>
            </div>

            <br>

            <router-link class="w-full mx-auto mb-2" :to="{ name: 'world-map' }">
              <button class="mx-auto xya-btn">
                <i class="fas fa-long-arrow-alt-left"></i> Back to world
              </button>
            </router-link>
            <button v-if="neighbourhoodSales === false"
                    class="mx-auto xya-btn"
                    @click="myPlots = !myPlots">{{ myPlots ? 'Back to neighbourhood' : 'Show my plots' }}
            </button>

            <br>

            <div class="w-full text-center">
              F: Fertility - L: Level - C: Crime rate
            </div>
          </div>
        </div>

        <div class="w-full md:w-3/4 md:pl-12">
          <div v-if="plotData.length > 0 && plotsMounted" class="w-full flex flex-wrap">
            <div class="flex flex-wrap plot-container">
              <div v-for="plot in plotData" class="w-1/2 md:w-1/4 lg:w-1/5 xl:w-1/6 2xl:w-1/7 relative"
                   :style="(plot.ownerOf && !myPlots) ? 'border: 2px solid white' : ''">
                <img class="w-full h-full" src="/images/plots/base/0.png" alt="Base land">
                <img class="absolute top-0 left-0 w-full h-full" :src="`/images/plots/soil_type/${plot.soil_type}.png`"
                     alt="Soil Type">
                <img class="absolute top-0 left-0 w-full h-full"
                     :src="`/images/plots/level/${plot.level + plot.level_buff}.png`" alt="Level">
                <img class="absolute top-0 left-0 w-full h-full"
                     :src="`/images/plots/fertility/${plot.fertility + plot.fertility_buff}.png`" alt="Fertility">
                <img class="absolute top-0 left-0 w-full h-full"
                     :src="`/images/plots/crime/${plot.crime_rate + plot.crime_rate_buff}.png`" alt="Crime">

                <div class="opacity-50 absolute top-0 left-0 text-white p-2 cursor-pointer w-full h-full"
                     style="line-height: 0.75;pointer-events: none;">

                  <div class="absolute top-0 pt-2">
                    <small>
                      {{ allNeighbourhoods[plot.neighbourhood] }}
                    </small>
                  </div>

                  <div class="absolute bottom-0 pb-2">
                    <small>
                      Soil: {{ soilTypes[plot.soil_type] }}
                    </small>
                    <br>
                    <small>
                      F: {{ plot.fertility + plot.fertility_buff }}
                    </small>

                    <small>
                      L: {{ plot.level + plot.level_buff }}
                    </small>

                    <small>
                      C: {{ plot.crime_rate + plot.crime_rate_buff }}
                    </small>
                  </div>
                </div>

                <div class="absolute top-0 left-0 text-white p-2 cursor-pointer w-full h-full flex">
                  <div @click="visitPlot(plot)" class="text-center m-auto" v-if="plot.ownerOf">
                    VISIT
                    <br>
                    <div v-if="plot.sales && plot.sales.forSale">
                      {{
                        parseFloat(plot.sales.price / Math.pow(10, 18)).toFixed(2)
                      }}
                      {{
                        (plot.neighbourhood === 18 || plot.neighbourhood === 19 ? 'YIN' : plot.neighbourhood === 16 || plot.neighbourhood === 17 ? 'YANG' : 'XYA')
                      }}
                    </div>
                  </div>
                  <div @click="buyPlot(plot)" class="m-auto text-center" v-else-if="plot.sales && plot.sales.forSale && (plot.sales.seller === plot.plotOwner)">
                    FOR SALE
                    <br>
                    {{
                      parseFloat(plot.sales.price / Math.pow(10, 18)).toFixed(2)
                    }}
                    {{
                      plot.neighbourhood === 18 || plot.neighbourhood === 19 ? 'YIN' : plot.neighbourhood === 16 || plot.neighbourhood === 17 ? 'YANG' : 'XYA'
                    }}
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
                        selectedPlotData.neighbourhood === 18 || selectedPlotData.neighbourhood === 19 ? 'YIN' : selectedPlotData.neighbourhood === 16 || selectedPlotData.neighbourhood === 17 ? 'YANG' : 'XYA'
                      }}</p>
                    <p>Soil type: {{ soilTypes[selectedPlotData.soil_type] }}</p>
                    <p>Fertility: {{ selectedPlotData.fertility + selectedPlotData.fertility_buff }}</p>
                    <p>Level: {{ selectedPlotData.level + selectedPlotData.level_buff }}</p>
                    <p>Crime rate: {{ selectedPlotData.crime_rate + selectedPlotData.crime_rate_buff }}</p>
                    <br>

                    <!-- modal state toggle -->
<!--                    <div class="w-full flex mb-4">-->
<!--                      <button @click="changePlotModalViewState('trade')"-->
<!--                              :class="plotModalState === 'trade' ? 'bg-primary-alt text-brown' : ''"-->
<!--                              class="w-1/4 mx-auto xya-btn">-->
<!--                        Trade-->
<!--                      </button>-->
<!--                      <button @click="changePlotModalViewState('manage')"-->
<!--                              :class="plotModalState === 'manage' ? 'bg-primary-alt text-brown' : ''"-->
<!--                              class="w-1/4 mx-auto xya-btn">-->
<!--                        Manage-->
<!--                      </button>-->
<!--                      <button @click="changePlotModalViewState('utility')"-->
<!--                              :class="plotModalState === 'utility' ? 'bg-primary-alt text-brown' : ''"-->
<!--                              class="w-1/4 mx-auto xya-btn">-->
<!--                        Utility-->
<!--                      </button>-->
<!--                    </div>-->

                    <div class="pt-4" v-if="plotModalState === 'trade'">
                      <div
                          v-if="!selectedPlotData.sales || (selectedPlotData.sales && selectedPlotData.sales.forSale === false)">
                        <input class="w-full mb-1 bg-dark border border-bbrown rounded-xl p-2" type="number"
                               v-model="plotPrice">
                        <br>
                        <button @click="approvePlotToSellNow(selectedPlotData.token_id, selectedPlotData.neighbourhood)"
                                class="mx-auto xya-btn w-full mb-2">
                          {{ loadingApproveSellPlot ? 'APPROVING' : 'APPROVE' }}
                        </button>
                        <button @click="sellPlotNow(plotPrice, selectedPlotData.token_id, selectedPlotData.neighbourhood)"
                                class="mx-auto xya-btn w-full mb-2">
                          {{ loadingSellPlot ? 'SELLING' : 'SELL' }}
                        </button>

                        <br>
                        <br>

                        <input class="w-full mb-1 bg-dark border border-bbrown rounded-xl p-2" type="text"
                               placeholder="Address to send plot to..."
                               v-model="selectedPlotData.sendToAddress">
                        <br>
                        <button @click="sendPlotNow(selectedPlotData.sendToAddress, selectedPlotData.token_id, selectedPlotData.neighbourhood)"
                                class="mx-auto xya-btn w-full mb-2">
                          {{ loadingSendPlot ? 'SENDING' : 'SEND' }}
                        </button>
                      </div>
                      <div v-else>
                        <p class="text-center" v-if="selectedPlotData.sales.seller !== selectedPlotData.plotOwner">
                          This plot was already listed when you received it. Please unlist before continueing.
                        </p>
                        <button @click="cancelListing(selectedPlotData.token_id, selectedPlotData.neighbourhood)" class="mx-auto xya-btn w-full mb-2">
                          {{ loadingCancelPlotListing ? 'CANCELLING' : 'CANCEL LISTING' }}
                        </button>
                      </div>
                    </div>
<!--                    <div class="pt-4" v-if="plotModalState === 'manage'">-->
<!--                      <div>-->
<!--                        <div v-if="selectedPlotData.utilityCount === 0">-->
<!--                          <p>Current upgrade cost: {{ selectedPlotData.currentUpgradeCost.toFixed(1) }} XYA</p>-->
<!--                          <p>Next upgrade cost: {{ (selectedPlotData.currentUpgradeCost * 1.1).toFixed(1) }} XYA (* 10%)</p>-->
<!--                          <p v-if="isPlotResetable(selectedPlotData)">Current reset cost: {{ selectedPlotData.currentResetCost }} </p>-->
<!--                          <button v-if="isPlotResetable(selectedPlotData)" @click="resetPlotAttributes(selectedPlotData)"-->
<!--                                  class="mx-auto xya-btn">-->
<!--                            Reset-->
<!--                          </button>-->

<!--                          <br>-->

<!--                          &lt;!&ndash; fertility &ndash;&gt;-->
<!--                          <div class="flex">-->
<!--                            <p class="w-1/3 my-auto">Fertility: {{ selectedPlotData.fertility + selectedPlotData.fertility_buff }}</p>-->
<!--                            <button @click="downgradePlotAttribute('fertility', selectedPlotData, false)"-->
<!--                                    class="mx-auto xya-btn w-1/3 mb-1 ml-2">-->
<!--                              {{ attributeCanBeAltered("fertility", selectedPlotData, false) ? 'Downgrade' : 'Already Min.' }}-->
<!--                            </button>-->
<!--                            <button @click="upgradePlotAttribute('fertility', selectedPlotData, true)"-->
<!--                                    class="mx-auto xya-btn w-1/3 mb-1 ml-2">-->
<!--                              {{ attributeCanBeAltered("fertility", selectedPlotData, true) ? 'Upgrade' : 'Already Max.' }}-->
<!--                            </button>-->
<!--                          </div>-->

<!--                          &lt;!&ndash; level &ndash;&gt;-->
<!--                          <div class="flex">-->
<!--                            <p class="w-1/3 my-auto">Level: {{ selectedPlotData.level + selectedPlotData.level_buff }}</p>-->
<!--                            <button @click="downgradePlotAttribute('level', selectedPlotData, false)"-->
<!--                                    class="mx-auto xya-btn w-1/3 mb-1 ml-2">-->
<!--                              {{ attributeCanBeAltered("level", selectedPlotData, false) ? 'Downgrade' : 'Already Min.' }}-->
<!--                            </button>-->
<!--                            <button @click="upgradePlotAttribute('level', selectedPlotData, true)"-->
<!--                                    class="mx-auto xya-btn w-1/3 mb-1 ml-2">-->
<!--                              {{ attributeCanBeAltered("level", selectedPlotData, true) ? 'Upgrade' : 'Already Max.' }}-->
<!--                            </button>-->
<!--                          </div>-->

<!--                          &lt;!&ndash; crime rate &ndash;&gt;-->
<!--                          <div class="flex">-->
<!--                            <p class="w-1/3 my-auto">Crime Rate: {{ selectedPlotData.crime_rate + selectedPlotData.crime_rate_buff }}</p>-->
<!--                            <button @click="downgradePlotAttribute('crime', selectedPlotData, false)"-->
<!--                                    class="mx-auto xya-btn w-1/3 mb-1 ml-2">-->
<!--                              {{ attributeCanBeAltered("crime", selectedPlotData, false) ? 'Downgrade' : 'Already Min.' }}-->
<!--                            </button>-->
<!--                            <button @click="upgradePlotAttribute('crime', selectedPlotData, true)"-->
<!--                                    class="mx-auto xya-btn w-1/3 mb-1 ml-2">-->
<!--                              {{ attributeCanBeAltered("crime", selectedPlotData, true) ? 'Upgrade' : 'Already Max.' }}-->
<!--                            </button>-->
<!--                          </div>-->
<!--                        </div>-->
<!--                        <div v-else>-->
<!--                          <p>The plot is currently being utilised. Please stop all utilisation before altering the attributes.</p>-->
<!--                        </div>-->
<!--                      </div>-->
<!--                    </div>-->
<!--                    <div class="pt-4" v-if="plotModalState === 'utility'">-->
<!--                      <div>-->
<!--                        &lt;!&ndash; emitter utility option &ndash;&gt;-->
<!--                        <div>-->
<!--                          <p>Personal extractor</p>-->
<!--                          <hr>-->
<!--                          <br>-->
<!--                          <small v-if="!selectedPlotData.hasPaidEmittingFee">There is a one time fee to start extracting</small>-->
<!--                          <br>-->
<!--                          <small v-if="!selectedPlotData.hasPaidEmittingFee">-->
<!--                            Cost to extract: {{ costToEmit }} XYA-ONE-->
<!--                            <a class="underline" href="https://game.defikingdoms.com/#/add/ONE/0x9b68BF4bF89c115c721105eaf6BD5164aFcc51E4" target="_blank">(Get XYA-ONE LP)</a>-->
<!--                          </small>-->
<!--                          <br>-->
<!--                          <br>-->
<!--                          <div v-if="!selectedPlotData.isAllowedToEmit">-->
<!--                            <div>-->
<!--                              <button @click="startStopEmitting(selectedPlotData, !selectedPlotData.isEmitting)"-->
<!--                                      class="mx-auto xya-btn">-->
<!--                                {{ !selectedPlotData.isEmitting ? "Start Extracting" : "Stop Extracting" }} &lt;!&ndash; DOESNT FLIP WTF???? &ndash;&gt;-->
<!--                              </button>-->
<!--                            </div>-->
<!--                          </div>-->
<!--                          <div v-else>-->
<!--                            <p>Required attributes to start extracting:</p>-->
<!--                            <p>Fertility >= 6</p>-->
<!--                            <p>Level >= 5</p>-->
<!--                            <p>Crime Rate <= 4</p>-->
<!--                          </div>-->
<!--                        </div>-->
<!--                      </div>-->
<!--                    </div>-->
                  </div>

                  <div v-if="plotModalReason === 'buy'" class="w-full">
                    <p v-if="selectedPlotData.amountOwnedByPlot">Plot chest: {{
                        selectedPlotData.amountOwnedByPlot.split('.')[0]
                      }}.{{ selectedPlotData.amountOwnedByPlot.split('.')[1].slice(0, 2) }} {{
                        selectedPlotData.neighbourhood === 18 || selectedPlotData.neighbourhood === 19 ? 'YIN' : selectedPlotData.neighbourhood === 16 || selectedPlotData.neighbourhood === 17 ? 'YANG' : 'XYA'
                      }}</p>
                    <p>Soil type: {{ soilTypes[selectedPlotData.soil_type] }}</p>
                    <p>Fertility: {{ selectedPlotData.fertility + selectedPlotData.fertility_buff }}</p>
                    <p>Level: {{ selectedPlotData.level + selectedPlotData.level_buff }}</p>
                    <p>Crime rate: {{ selectedPlotData.crime_rate + selectedPlotData.crime_rate_buff }}</p>
                    <br>
                    <p>Plot price: {{ selectedPlotData.sales.price / Math.pow(10, 18) }}
                      {{
                        selectedPlotData.neighbourhood === 18 || selectedPlotData.neighbourhood === 19 ? 'YIN' : selectedPlotData.neighbourhood === 16 || selectedPlotData.neighbourhood === 17 ? 'YANG' : 'XYA'
                      }}
                    </p>

                    <br>

                    <button @click="approvePlotNow(selectedPlotData.sales.price, selectedPlotData.neighbourhood)" class="mx-auto xya-btn w-full mb-2">
                      {{ loadingApproveBuyPlot ? 'APPROVING' : 'APPROVE' }}
                    </button>
                    <button @click="buyPlotNow(selectedPlotData.sales.price, selectedPlotData.token_id, selectedPlotData.neighbourhood)"
                            class="mx-auto xya-btn w-full mb-2">
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

          <div v-else class="p-4 md:p-8 relative mt-12">
            <div class="m-auto text-center">
              <div class="w-full flex">
                <img class="w-24 h-24 m-auto" src="/images/XYA.png" alt="XYA logo"
                     style="animation: rotation 2s infinite linear"/>
              </div>
              <br/>
              <p class="text-2xl">Loading...</p>
            </div>
          </div>
        </div>
      </div>
    </div>

  </section>
</template>

<script>
import fromExponential from "from-exponential";

import wallet from "../plugins/wallet"
import plot from "../plugins/artifacts/plothandler.json"
import {ethers} from "ethers"
import {mapGetters} from "vuex"
import plotSnapshot from "../plugins/snapshots/plots.json"

import PlotsYang from "../plugins/artifacts/plotsyang.json";
import PlotsYin from "../plugins/artifacts/plotsyin.json";
import PlotsFreyala from "../plugins/artifacts/plotsfreyala.json";
import Freyala from "../plugins/artifacts/freyala.json";
import Yin from "../plugins/artifacts/yin.json";
import Yang from "../plugins/artifacts/yang.json";
import PlotsMarket from "../plugins/artifacts/plotsmarket.json";
import PlotsYinMarket from "../plugins/artifacts/plotsyinmarket.json";
import PlotsYangMarket from "../plugins/artifacts/plotsyangmarket.json";

export default {
  name: 'Plots',
  mixins: [wallet],
  computed: {
    ...mapGetters([
      'metaMaskAccount',
      'metaMaskWallet'
    ])
  },
  watch: {
    async neighbourhood() {
      if (this.plotsMounted) {
        window.history.pushState(
            {},
            null,
            '#' + this.$route.path.replace(this.$route.params.neighbourhood, '') + this.neighbourhood
        )

        this.myPlots = false
        await this.getPlots()
      }
    },
    async myPlots() {
      if (this.myPlots) {
        await this.getMyPlots()
      } else {
        await this.getPlots()
      }
    }
  },
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
      availablePlotsFromSnapshot: [],
      plotContract: undefined,
      plotsMounted: false,
      neighbourhood: 0,
      plotData: [],
      plotIds: [],
      plotType: 0,
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
      neighbourhoodSales: false,
      myPlots: false,
      plotMin: 0,
      plotMax: 0,
      plotPrice: 0,
      plotModalId: 0,
      selectedPlotData: {},
      plotModalState: 'trade',
      plotModalReason: '',
      error: '',
      loadingBuyPlot: false,
      loadingSellPlot: false,
      loadingApproveBuyPlot: false,
      loadingApproveSellPlot: false,
      loadingSendPlot: false,
      loadingCancelPlotListing: false,

      // emission data
      fertilityReq: 0,
      levelReq: 0,
      crimeRateReq: 0,

      emissionsLeft: 0,
      emissionsRate: 0,
      currentTotalEmittingPlots: 0,
      costToEmit: 0
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

    this.plotContract = new ethers.Contract(plot.address, plot.abi, this.metaMaskWallet.signer);

    await this.getPlots()
    this.plotsMounted = true
  },
  methods: {
    async getMyPlots() {
      const type0Ids = []
      const type1Ids = []
      const type2Ids = []

      this.plotData = []

      let [type0, type1, type2] = await Promise.all([
        this.plotContract.getTokensOwnedByOwner(0, this.metaMaskAccount),
        this.plotContract.getTokensOwnedByOwner(1, this.metaMaskAccount),
        this.plotContract.getTokensOwnedByOwner(2, this.metaMaskAccount)
      ])

      for (let i = 0; i < type0.length; i++) {
        type0Ids.push(ethers.BigNumber.from(type0[i]._hex).toString())
      }

      for (let i = 0; i < type1.length; i++) {
        type1Ids.push(ethers.BigNumber.from(type1[i]._hex).toString())
      }

      for (let i = 0; i < type2.length; i++) {
        type2Ids.push(ethers.BigNumber.from(type2[i]._hex).toString())
      }

      let [plot0Data, plot1Data, plot2Data] = await Promise.all([
        this.plotContract.getPlotDataMultiple(0, type0Ids),
        this.plotContract.getPlotDataMultiple(1, type1Ids),
        this.plotContract.getPlotDataMultiple(2, type2Ids)
      ])

      let plotData = JSON.parse(plot0Data).plots.concat(JSON.parse(plot1Data).plots, JSON.parse(plot2Data).plots)

      let tempPlotData = []

      const plotPromise = plotData.map(async (plot) => {
        let singlePlotData = {
          neighbourhood: plot.neighbourhood,
          token_id: plot.ID,
          plot_number: plot.plotNumber,
          soil_type: plot.soilTypeBase,
          fertility: plot.fertilityBase,
          level: plot.levelBase,
          crime_rate: plot.crimeRateBase,
          fertility_buff: plot.fertility,
          level_buff: plot.level,
          crime_rate_buff: plot.crimeRate,
          plot_type: 0,
          ownerOf: true
        }

        if (plot.neighbourhood === 18 || plot.neighbourhood === 19) {
          singlePlotData.plot_type = 1
        } else if (plot.neighbourhood === 16 || plot.neighbourhood === 17) {
          singlePlotData.plot_type = 2
        } else {
          singlePlotData.plot_type = 0
        }

        const sales = await this.marketContracts[singlePlotData.plot_type === 0 ? 'xya' : singlePlotData.plot_type === 1 ? 'yin' : 'yang'].getListing(plot.ID)

        singlePlotData.sales = {
          seller: 0,
          buyer: 0,
          tokenId: plot.ID,
          price: 0,
          forSale: false,
        }

        if (sales[4]) {
          singlePlotData.sales.seller = sales[0]
          singlePlotData.sales.buyer = sales[1]
          singlePlotData.sales.price = ethers.BigNumber.from(sales[3]).toString()
          singlePlotData.sales.forSale = sales[4]

          singlePlotData.plotOwner = await this.plotContracts[singlePlotData.plot_type === 0 ? 'xya' : singlePlotData.plot_type === 1 ? 'yin' : 'yang'].ownerOf(plot.ID)
        }

        tempPlotData.push(singlePlotData)
      })

      await Promise.all(plotPromise).then(() => {
        this.plotData = tempPlotData.sort((a, b) => {
          return a.neighbourhood - b.neighbourhood
        })
      })
    },
    async getPlots() {
      this.plotIds = []
      this.plotData = []

      plotSnapshot.plots.map((plot) => {
        if (this.neighbourhood === plot.neighbourhood) {
          this.plotIds.push(plot.token_id)
        }
      })

      if (this.neighbourhood === 18 || this.neighbourhood === 19) {
        this.plotType = 1
      } else if (this.neighbourhood === 16 || this.neighbourhood === 17) {
        this.plotType = 2
      } else {
        this.plotType = 0
      }

      let [plotData, plotOwner] = await Promise.all([
        this.plotContract.getPlotDataMultiple(this.plotType, this.plotIds),
        this.plotContract.getTokensOwnedByOwner(this.plotType, this.metaMaskAccount)
      ])

      plotData = JSON.parse(plotData)
      let tempPlotData = []

      const plotPromise = plotData.plots.map(async (plot) => {
        let singlePlotData = {
          neighbourhood: plot.neighbourhood,
          token_id: plot.ID,
          plot_number: plot.plotNumber,
          soil_type: plot.soilTypeBase,
          fertility: plot.fertilityBase,
          level: plot.levelBase,
          crime_rate: plot.crimeRateBase,
          fertility_buff: plot.fertility,
          level_buff: plot.level,
          plot_type: 0,
          crime_rate_buff: plot.crimeRate,
          plotOwner: '',
          ownerOf: false
        }

        if (plot.neighbourhood === 18 || plot.neighbourhood === 19) {
          singlePlotData.plot_type = 1
        } else if (plot.neighbourhood === 16 || plot.neighbourhood === 17) {
          singlePlotData.plot_type = 2
        } else {
          singlePlotData.plot_type = 0
        }

        const sales = await this.marketContracts[singlePlotData.plot_type === 0 ? 'xya' : singlePlotData.plot_type === 1 ? 'yin' : 'yang'].getListing(plot.ID)

        singlePlotData.sales = {
          seller: 0,
          buyer: 0,
          tokenId: plot.ID,
          price: 0,
          forSale: false,
        }

        if (sales[4]) {
          singlePlotData.sales.seller = sales[0]
          singlePlotData.sales.buyer = sales[1]
          singlePlotData.sales.price = ethers.BigNumber.from(sales[3]).toString()
          singlePlotData.sales.forSale = sales[4]

          singlePlotData.plotOwner = await this.plotContracts[singlePlotData.plot_type === 0 ? 'xya' : singlePlotData.plot_type === 1 ? 'yin' : 'yang'].ownerOf(plot.ID)
        }

        for (let i = 0; i < plotOwner.length; i++) {
          if (ethers.BigNumber.from(plotOwner[i]._hex).toString() === plot.ID.toString()) {
            singlePlotData.ownerOf = true
          }
        }

        tempPlotData.push(singlePlotData)
      })

      await Promise.all(plotPromise).then(() => {
        this.plotData = tempPlotData.sort((a, b) => {
          return a.plot_number - b.plot_number
        })
      })
    },
    async getEmissionsData() {
      const emissionsLeft = await this.plotContracts.xyaEmitter.emissionsLeft();
      const emissionsRate = await this.plotContracts.xyaEmitter.emissionRate();
      const emittingPlotCount = await this.plotContracts.xyaEmitter.currentPlotsEmitting();

      this.emissionsLeft = emissionsLeft;
      this.emissionsRate = emissionsRate;
      this.currentTotalEmittingPlots = emittingPlotCount;

      const emitterAttributeRequirements = await this.plotContracts.xyaEmitter.getEmissionRequirements();
      this.fertilityReq = emitterAttributeRequirements[0];
      this.levelReq = emitterAttributeRequirements[1];
      this.crimeRateReq = emitterAttributeRequirements[2];
    },
    changePlotModalViewState(state) {
      if (state !== 'trade' && state !== 'manage' && state !== 'utility') {
        this.plotModalState = "trade"
        return
      }

      this.plotModalState = state
    },
    modalClose() {
      this.plotModalReason = ''
    },
    async sendPlotNow(address, id, neighbourhood) {
      if (neighbourhood === 18 || neighbourhood === 19) {
        this.loadingSendPlot = true
        const send = await this.plotContracts.yin.transferFrom(this.metaMaskAccount, address, id)
        await send.wait(1)
        this.loadingSendPlot = false

        window.location.reload(1)
      } else if (neighbourhood === 16 || neighbourhood === 17) {
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
    async cancelListing(id, neighbourhood) {
      if (neighbourhood === 18 || neighbourhood === 19) {
        this.loadingCancelPlotListing = true
        const cancel = await this.marketContracts.yin.cancelListing(id)
        await cancel.wait(1)
        this.loadingCancelPlotListing = false

        window.location.reload(1)
      } else if (neighbourhood === 16 || neighbourhood === 17) {
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
    async approvePlotToSellNow(id, neighbourhood) {
      if (neighbourhood === 18 || neighbourhood === 19) {
        this.loadingApproveSellPlot = true
        this.plotYinFreyalaContract = new ethers.Contract(PlotsYin.address, PlotsYin.abi, this.metaMaskWallet.signer)
        const approve = await this.plotYinFreyalaContract.approve(PlotsYinMarket.address, id)
        await approve.wait(1)
        this.loadingApproveSellPlot = false
      } else if (neighbourhood === 16 || neighbourhood === 17) {
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
    async sellPlotNow(amount, id, neighbourhood) {
      if (neighbourhood === 18 || neighbourhood === 19) {
        this.loadingSellPlot = true
        const actual = amount * (10 ** 18)
        const arg = fromExponential(actual)
        const sales = await this.marketContracts.yin.createListing(id, arg)
        await sales.wait(1)
        this.loadingSellPlot = false

        window.location.reload(1)
      } else if (neighbourhood === 16 || neighbourhood === 17) {
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
    async approvePlotNow(amount, neighbourhood) {
      if (neighbourhood === 18 || neighbourhood === 19) {
        this.loadingApproveBuyPlot = true
        const mainYinContract = new ethers.Contract(Yin.address, Yin.abi, this.metaMaskWallet.signer)
        const approve = await mainYinContract.approve(PlotsYinMarket.address, amount)
        await approve.wait(1)
        this.loadingApproveBuyPlot = false
      } else if (neighbourhood === 16 || neighbourhood === 17) {
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
    async buyPlotNow(amount, id, neighbourhood) {
      if (neighbourhood === 18 || neighbourhood === 19) {
        this.loadingBuyPlot = true
        const sales = await this.marketContracts.yin.buy(amount, id)
        await sales.wait(1)
        this.loadingBuyPlot = false

        window.location.reload(1)
      } else if (neighbourhood === 16 || neighbourhood === 17) {
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
      let plotType = 0

      if (data.neighbourhood === 18 || data.neighbourhood === 19) {
        plotType = 1
      } else if (data.neighbourhood === 16 || data.neighbourhood === 17) {
        plotType = 2
      }

      const plot = await this.plotContract.getPlotData(plotType, data.token_id)

      data.amountOwnedByPlot = ethers.utils.formatEther(plot[6]._isBigNumber ? ethers.BigNumber.from(plot[6]).toString() : plot[6])

      this.selectedPlotData = data

      this.selectedPlotData.currentUpgradeCost = ethers.utils.formatEther(await this.plotContract.getCurrentUpgradeCost(plotType, data.token_id))
      this.selectedPlotData.currentResetCost = ethers.utils.formatEther(await this.plotContract.getCurrentResetCost(plotType, data.token_id))

      const utilityCount = await this.plotContract.getPlotAttribute(plotType, data.token_id, "utility")
      this.selectedPlotData.utilityCount = parseInt(utilityCount._isBigNumber ? ethers.BigNumber.from(utilityCount).toString() : utilityCount)

      this.selectedPlotData.isEmitting = false
      if (!this.selectedPlotData.isEmitting) {
        let isAllowedToEmit = true // await this.plotContracts.xyaEmitter.isAllowedToEmit(this.plotType, data.token_id)
        const hasPaidFee = false // await this.plotContracts.xyaEmitter.hasPlotPaidOneTimeFee(this.plotType, data.token_id)

        if (!hasPaidFee) {
          const emittingCost = 0 // await this.plotContracts.xyaEmitter.feeToEmit()
          this.costToEmit = ethers.utils.formatEther(emittingCost.toString())
        }

        this.selectedPlotData.hasPaidEmittingFee = hasPaidFee
        this.selectedPlotData.isAllowedToEmit = isAllowedToEmit
      } else {
        this.selectedPlotData.hasPaidEmittingFee = true
        this.selectedPlotData.isAllowedToEmit = true
      }

      this.plotModalReason = 'visit'
      this.plotModalState = 'trade'
      this.$modal.show('plot')
    },
    async buyPlot(data) {
      let plot = {}
      if (plot.neighbourhood === 18 || plot.neighbourhood === 19) {
        plot = await this.plotContracts.yin.plots(data.token_id)
      } else if (plot.neighbourhood === 16 || plot.neighbourhood === 17) {
        plot = await this.plotContracts.yang.plots(data.token_id)
      } else {
        plot = await this.plotContracts.xya.plots(data.token_id)
      }
      data.amountOwnedByPlot = ethers.utils.formatEther(plot._amountOwnedByPlot._isBigNumber ? ethers.BigNumber.from(plot._amountOwnedByPlot).toString() : plot._amountOwnedByPlot)
      this.selectedPlotData = data
      this.plotModalReason = 'buy'
      this.$modal.show('plot')
    },
    attributeCanBeAltered(attributeId, plotData, isUpgrading) {
      let currentTotal = (attributeId === 'fertility' ?
          plotData.fertility + plotData.fertility_buff : attributeId === 'level' ?
              plotData.level + plotData.level_buff : plotData.crime_rate + plotData.crime_rate_buff)

      if (isUpgrading) {
        return (currentTotal < 9)
      } else {
        return (currentTotal > 0)
      }
    },
    async downgradePlotAttribute(attributeId, plotData, isUpgrading) {
      // sanity check we can downgrade before creating the tx
      if (!this.attributeCanBeAltered(attributeId, plotData, isUpgrading)) {
        return
      }

      let currentTotal = (attributeId === 'fertility' ?
          plotData.fertility + plotData.fertility_buff : attributeId === 'level' ?
              plotData.level + plotData.level_buff : plotData.crime_rate + plotData.crime_rate_buff)

      let attribVal = (attributeId === 'fertility' ? 0 : attributeId === 'level' ? 1 : 2)

      // downgradePlot(uint8 _plotType, uint256 _plotId, uint8 _attribute, uint256 _currentLevel)
      //const downgrade = await this.plotContracts.handler.downgradePlot(this.plotType, plotData.token_id, attribVal, currentTotal)
      //await downgrade.wait(1)

      // todo: refresh the data on screen showing the new stats
      // await this.plotContracts.handler.getPlotData(this.plotType, plotData.token_id)
      if (attributeId === 'fertility')
        plotData.fertility_buff -= 1;
      else if (attributeId === 'level')
        plotData.level_buff -= 1;
      else if (attributeId === 'crime')
        plotData.crime_rate_buff -= 1;

      plotData.currentUpgradeCost = ethers.utils.formatEther("30000000000000000000") // await this.plotContracts.handler.getCurrentUpgradeCost(this.plotType, this.plots[index].token_id);
      const isAllowedToEmit = true // await this.plotContracts.xyaEmitter.isAllowedToEmit(this.plotType, data.token_id)
      plotData.isAllowedToEmit = isAllowedToEmit
    },
    async upgradePlotAttribute(attributeId, plotData, isUpgrading) {
      // sanity check we can downgrade before creating the tx
      if (!this.attributeCanBeAltered(attributeId, plotData, isUpgrading)) {
        return
      }

      let plotType = -1
      if (neighbourhood === 18 || neighbourhood === 19) {
        plotType = 1
      } else if (neighbourhood === 16 || neighbourhood === 17) {
        plotType = 2
      } else {
        plotType = 0
      }

      let currentTotal = (attributeId === 'fertility' ?
          plotData.fertility + plotData.fertility_buff : attributeId === 'level' ?
              plotData.level + plotData.level_buff : plotData.crime_rate + plotData.crime_rate_buff)

      let attribVal = (attributeId === 'fertility' ? 0 : attributeId === 'level' ? 1 : 2)

      // upgradePlot(uint8 _plotType, uint256 _plotId, uint8 _attribute, uint256 _currentLevel)
      //const upgrade = await this.plotContracts.handler.upgradePlot(this.plotType, plotData.token_id, attribVal, currentTotal)
      //await upgrade.wait(1)

      // todo: refresh the data on screen showing the new stats
      // await this.plotContracts.handler.getPlotData(this.plotType, plotData.token_id)

      if (attributeId === 'fertility')
        plotData.fertility_buff += 1;
      else if (attributeId === 'level')
        plotData.level_buff += 1;
      else if (attributeId === 'crime')
        plotData.crime_rate_buff += 1;

      plotData.currentUpgradeCost = ethers.utils.formatEther("20000000000000000000") // await this.plotContracts.handler.getCurrentUpgradeCost(this.plotType, this.plots[index].token_id);
      const isAllowedToEmit = true // await this.plotContracts.xyaEmitter.isAllowedToEmit(this.plotType, data.token_id)
      plotData.isAllowedToEmit = isAllowedToEmit
    },
    isPlotResetable(plotData) {
      return (
          (plotData.fertility_buff + plotData.fertility) !== plotData.fertility ||
          (plotData.level_buff + plotData.level) !== plotData.level ||
          (plotData.crime_rate_buff + plotData.crime_rate) !== plotData.crime_rate
      );
    },
    async resetPlotAttributes(plotData) {
      // resetPlotToBase(uint8 _plotType, uint256 _plotId)
      //const resetPlot = await this.plotContracts.handler.resetPlotToBase(this.plotType, plotData.token_id)
      //await resetPlot.wait(1)

      // todo: refresh the data on screen showing the new stats
      // await this.plotContracts.handler.getPlotData(this.plotType, plotData.token_id)

      plotData.fertility_buff = 0;
      plotData.level_buff = 0;
      plotData.crime_rate_buff = 0;
      plotData.currentUpgradeCost = ethers.utils.formatEther("40000000000000000000") // await this.plotContracts.handler.getCurrentUpgradeCost(this.plotType, this.plots[index].token_id);

      const isAllowedToEmit = false // await this.plotContracts.xyaEmitter.isAllowedToEmit(this.plotType, data.token_id)
      plotData.isAllowedToEmit = isAllowedToEmit
    },
    getUtilityUiElements(utility) {
      /*(utility.length > 0 ? " | " : "");

      for (let u = 0; u < utility.length; u++) {
        if (u === "emittingXya") {
          toReturn += "E "
        }
      }
*/
      return "";
    },
    startStopEmitting(plotData, isStarting) {
      console.log(isStarting ? "Starting emissions" : "Stopping emissions")

      // let isEmitting = await this.plotContracts.xyaEmitter.isEmitting(this.plotType, this.plots[index].token_id);
      if (isStarting) {
        plotData.isEmitting = true;
        plotData.utilityCount = 1;
      } else {
        plotData.isEmitting = false;
        plotData.utilityCount = 0;
      }

      //console.log(this.selectedPlotData)
      //console.log(plotData)
    }
  }
}
</script>