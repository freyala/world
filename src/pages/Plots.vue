<template>
  <section style="background: url('/images/map/worldmap.png') no-repeat; background-size: cover; min-height: 100vh"
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
              <div v-for="plot in plotData" class="w-1/2 md:w-1/4 lg:w-1/7 relative"
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
                  <div @click="buyPlot(plot)" class="m-auto text-center" v-else-if="plot.sales && plot.sales.forSale">
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
                    <div
                        v-if="!selectedPlotData.sales || (selectedPlotData.sales && selectedPlotData.sales.forSale === false)">
                      <input class="w-full mb-1 bg-dark border border-bbrown rounded-xl p-2" type="number"
                             v-model="plotPrice">
                      <br>
                      <button @click="approvePlotToSellNow(selectedPlotData.token_id)" class="mx-auto xya-btn w-full mb-2">
                        {{ loadingApproveSellPlot ? 'APPROVING' : 'APPROVE' }}
                      </button>
                      <button @click="sellPlotNow(plotPrice, selectedPlotData.token_id)" class="mx-auto xya-btn w-full mb-2">
                        {{ loadingSellPlot ? 'SELLING' : 'SELL' }}
                      </button>

                      <br>
                      <br>

                      <input class="w-full mb-1 bg-dark border border-bbrown rounded-xl p-2" type="text"
                             placeholder="Address to send plot to..."
                             v-model="selectedPlotData.sendToAddress">
                      <br>
                      <button @click="sendPlotNow(selectedPlotData.sendToAddress, selectedPlotData.token_id)"
                              class="mx-auto xya-btn w-full mb-2">
                        {{ loadingSendPlot ? 'SENDING' : 'SEND' }}
                      </button>
                    </div>
                    <div v-else>
                      <button @click="cancelListing(selectedPlotData.token_id)" class="mx-auto xya-btn w-full mb-2">
                        {{ loadingCancelPlotListing ? 'CANCELLING' : 'CANCEL LISTING' }}
                      </button>
                    </div>
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

                    <button @click="approvePlotNow(selectedPlotData.sales.price)" class="mx-auto xya-btn w-full mb-2">
                      {{ loadingApproveBuyPlot ? 'APPROVING' : 'APPROVE' }}
                    </button>
                    <button @click="buyPlotNow(selectedPlotData.sales.price, selectedPlotData.token_id)"
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
                     style="animation: rotation 2s infinite linear" />
              </div>
              <br />
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
          singlePlotData.plot_type = 2
        } else if (plot.neighbourhood === 16 || plot.neighbourhood === 17) {
          singlePlotData.plot_type = 1
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
          ownerOf: false
        }

        if (plot.neighbourhood === 18 || plot.neighbourhood === 19) {
          singlePlotData.plot_type = 2
        } else if (plot.neighbourhood === 16 || plot.neighbourhood === 17) {
          singlePlotData.plot_type = 1
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
      if (plot.neighbourhood === 18 || plot.neighbourhood === 19) {
        plot = await this.plotContracts.yin.plots(data.token_id)
      } else if (plot.neighbourhood === 16 || plot.neighbourhood === 17) {
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
    }
  }
}
</script>