<template>
  <section style="background: url('/images/map/worldmap.png') no-repeat; background-size: cover; min-height: 100vh"
           class="flex p-4 md:p-16 lg:px-32">
    <div style="z-index: 9999; overflow-y: auto;" class="screen bg-white rounded-2xl w-full">
      <section id="section-i-1" class="border-b-4 border-primary-alt"
               style="background: url('/images/SVG/homepage-bg-top.svg') no-repeat top right">
        <div class="container mx-auto text-center pt-12 pb-8">
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
          <div class="w-full flex flex-wrap mx-auto">
            <div v-if="xyaAllowance < 500 || yinAllowance < 500 || yangAllowance < 500" class="w-full text-center mb-2">
              <p>
                Before buying a plot, you will have to approve the contract to move the tokens in your name. Approve the
                appropriate token:
              </p>
            </div>
            <div v-if="xyaAllowance < 500" class="w-full lg:w-auto mx-auto text-center lg:ml-auto mb-2">
              <button
                  @click="addAllowance('freyala')"
                  class="m-auto tracking-widest uppercase bg-gradient-to-r from-primary to-secondary py-2 px-4 rounded-md text-white text-sm md:text-xl font-semibold"
              >{{ loadingxyaapprove ? 'loading...' : 'Approve XYA' }}
              </button>
            </div>
            <div v-if="yinAllowance < 500" class="w-full lg:w-auto mx-auto text-center mb-2">
              <button
                  @click="addAllowance('yin')"
                  class="m-auto tracking-widest uppercase bg-gradient-to-r from-primary to-secondary py-2 px-4 rounded-md text-white text-sm md:text-xl font-semibold"
              >{{ loadingyinapprove ? 'loading...' : 'Approve YIN' }}
              </button>
            </div>
            <div v-if="yangAllowance < 500" class="w-full lg:w-auto mx-auto text-center lg:mr-auto mb-2">
              <button
                  @click="addAllowance('yang')"
                  class="m-auto tracking-widest uppercase bg-gradient-to-r from-primary to-secondary py-2 px-4 rounded-md text-white text-sm md:text-xl font-semibold"
              >{{ loadingyangapprove ? 'loading...' : 'Approve YANG' }}
              </button>
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
                      @click="myPlots = !myPlots">{{ myPlots ? 'Show all plots' : 'Show my plots in region' }}
              </button>
              <button v-if="myPlots === false"
                      class="mb-2 border border-yellow hover:text-white hover:bg-yellow rounded-none p-1 md:ml-4"
                      @click="neighbourhoodSales = !neighbourhoodSales">
                {{ neighbourhoodSales ? 'Show all plots' : 'Show only neighbourhood sales' }}
              </button>
            </div>
          </div>
          <div v-show="myPlots === true" class="w-full flex">
            <div class="w-full mt-4 flex flex-wrap">
              <div class="w-1/2 md:w-1/4 lg:w-1/6 2xl:w-1/12 relative" v-for="plot in ownedPlotsData">
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
                    <div @click="visitPlot(plot)" class="m-auto" v-if="ownedPlots.includes(plot.token_id)">VISIT</div>
                    <div @click="buyPlot(plot)" class="m-auto" v-else-if="plot.sales && plot.sales.forSale">FOR SALE
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-show="neighbourhoodSales === true" class="w-full flex">
            <div class="w-full mt-4 flex flex-wrap">
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
                    <div @click="visitPlot(plot)" class="m-auto" v-if="ownedPlots.includes(plot.token_id)">VISIT</div>
                    <div @click="buyPlot(plot)" class="m-auto" v-else-if="plot.sales && plot.sales.forSale">FOR SALE
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-show="neighbourhoodSales === false && myPlots === false" class="w-full flex">
            <div v-show="loading === false" style="max-height: 750px;"
                 class="plots mt-4 mb-12 w-full cursor-pointer flex flex-wrap">
              <div id="plots" class="flex flex-wrap">
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

                      <!--                  <div class="absolute top-0 left-0 w-full h-full flex">-->
                      <!--                    <button-->
                      <!--                        @click="$modal.show('coming-soon')"-->
                      <!--                        class="opacity-75 hover:opacity-100 m-auto tracking-widest uppercase bg-gradient-to-r from-primary to-secondary py-1 px-2 rounded-md text-white text-sm font-semibold">-->
                      <!--                      Enter plot!-->
                      <!--                    </button>-->
                      <!--                  </div>-->


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
                      <div @click="visitPlot(plot)" class="m-auto" v-if="ownedPlots.includes(plot.token_id)">VISIT</div>
                      <div @click="buyPlot(plot)" class="m-auto" v-else-if="plot.sales && plot.sales.forSale">FOR SALE
                      </div>
                    </div>
                  </div>
                  <div v-else class="absolute top-0 left-0 w-full h-full flex">
                    <!--                    <button-->
                    <!--                        @click="mintPlot(plot.plot_number)"-->
                    <!--                        class="opacity-25 hover:opacity-75 m-auto tracking-widest uppercase bg-gradient-to-r from-primary to-secondary py-1 px-2 rounded-md text-white text-sm font-semibold">-->
                    <!--                      Buy!-->
                    <!--                    </button>-->
                  </div>
                </div>
              </div>
            </div>
            <div v-show="loading === true" class="my-12 flex w-full h-full">
              <p class="m-auto text-xl text-center">
                Loading plots...
              </p>
            </div>
          </div>
        </div>


        <window @before-close="modalClose" name="plot" width="80%">
          <div v-if="plotModalReason === 'visit' || plotModalReason === 'buy'"
               class="flex flex-wrap py-2 px-3 bg-gradient-to-r from-primary to-secondary text-white h-full">
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
import PlotsMarket from "../plugins/artifacts/plotsmarket.json";
import PlotsYinMarket from "../plugins/artifacts/plotsyinmarket.json";
import PlotsYangMarket from "../plugins/artifacts/plotsyangmarket.json";
import {ethers} from "ethers";
import fromExponential from "from-exponential";

import freyalaSnapshot from '../plugins/snapshots/freyalaPlots.json'
import yangSnapshot from '../plugins/snapshots/yangPlots.json'
import yinSnapshot from '../plugins/snapshots/yinPlots.json'
import Panzoom from "@panzoom/panzoom";

export default {
  name: 'Plots',
  mixins: [wallet],
  data() {
    return {
      plotPrice: 0,
      plotModalId: 0,
      selectedPlotData: {},
      plotModalReason: '',
      plotMarketContract: undefined,
      plotYinMarketContract: undefined,
      plotYangMarketContract: undefined,
      myPlots: false,
      neighbourhoodSales: false,
      snapshot: [],
      xyaAllowance: 0,
      yinAllowance: 0,
      yangAllowance: 0,
      error: '',
      loadingApproveSellPlot: false,
      loadingApproveBuyPlot: false,
      loadingBuyPlot: false,
      loadingSellPlot: false,
      loadingCancelPlotListing: false,
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
      ownedPlotsData: [],
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

    window.addEventListener("resize", this.editPanZoom);
  },
  async mounted() {
    const xya = new ethers.Contract(Freyala.address, Freyala.abi, this.metaMaskWallet.signer)
    const yin = new ethers.Contract(Yin.address, Yin.abi, this.metaMaskWallet.signer)
    const yang = new ethers.Contract(Yang.address, Yang.abi, this.metaMaskWallet.signer)

    this.plotFreyalaContract = new ethers.Contract(PlotsFreyala.address, PlotsFreyala.abi, this.metaMaskWallet.signer)
    this.plotYinContract = new ethers.Contract(PlotsYin.address, PlotsYin.abi, this.metaMaskWallet.signer)
    this.plotYangContract = new ethers.Contract(PlotsYang.address, PlotsYang.abi, this.metaMaskWallet.signer)

    const [xyaAllowance, yinAllowance, yangAllowance] = await Promise.all([
      xya.allowance(this.metaMaskAccount, PlotsFreyala.address),
      yin.allowance(this.metaMaskAccount, PlotsYin.address),
      yang.allowance(this.metaMaskAccount, PlotsYang.address),
    ])

    this.xyaAllowance = (xyaAllowance / Math.pow(10, 18))
    this.yinAllowance = (yinAllowance / Math.pow(10, 18))
    this.yangAllowance = (yangAllowance / Math.pow(10, 18))

    if (this.neighbourhood === 18 || this.neighbourhood === 19) {
      await this.reGrabPlots('yin')
    } else if (this.neighbourhood === 16 || this.neighbourhood === 17) {
      await this.reGrabPlots('yang')
    } else {
      await this.reGrabPlots('freyala')
    }

    const element = document.getElementById('plots')

    const panzoom = Panzoom(element, {
      maxScale: 10,
      minScale: 1,
      contain: 'outside'
    })

    element.parentElement.addEventListener('wheel', panzoom.zoomWithWheel)

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
  destroyed() {
    window.removeEventListener("resize", this.editPanZoom);
  },
  methods: {
    ...mapActions([
      'setFavourite'
    ]),
    modalClose() {
      this.plotModalReason = ''
    },
    async cancelListing(id) {
      if (this.neighbourhood === 18 || this.neighbourhood === 19) {
        this.loadingCancelPlotListing = true
        const cancel = await this.plotYinMarketContract.cancelListing(id)
        await cancel.wait(1)

        this.loadingCancelPlotListing = false
        window.location.reload(1)
      } else if (this.neighbourhood === 16 || this.neighbourhood === 17) {
        this.loadingCancelPlotListing = true
        const cancel = await this.plotYangMarketContract.cancelListing(id)
        await cancel.wait(1)

        this.loadingCancelPlotListing = false
        window.location.reload(1)
      } else {
        this.loadingCancelPlotListing = true
        const cancel = await this.plotMarketContract.cancelListing(id)
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
        this.plotFreyalaContract = new ethers.Contract(PlotsFreyala.address, PlotsFreyala.abi, this.metaMaskWallet.signer)
        const approve = await this.plotFreyalaContract.approve(PlotsMarket.address, id)
        await approve.wait(1)

        this.loadingApproveSellPlot = false
      }
    },
    async sellPlotNow(amount, id) {
      if (this.neighbourhood === 18 || this.neighbourhood === 19) {
        this.loadingSellPlot = true
        const actual = amount * (10 ** 18)
        const arg = fromExponential(actual)
        const sales = await this.plotYinMarketContract.createListing(id, arg)
        await sales.wait(1)

        this.loadingSellPlot = false
        window.location.reload(1)
      } else if (this.neighbourhood === 16 || this.neighbourhood === 17) {
        this.loadingSellPlot = true
        const actual = amount * (10 ** 18)
        const arg = fromExponential(actual)
        const sales = await this.plotYangMarketContract.createListing(id, arg)
        await sales.wait(1)

        this.loadingSellPlot = false
        window.location.reload(1)
      } else {
        this.loadingSellPlot = true
        const actual = amount * (10 ** 18)
        const arg = fromExponential(actual)
        const sales = await this.plotMarketContract.createListing(id, arg)
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
        const sales = await this.plotYinMarketContract.buy(amount, id)
        await sales.wait(1)

        this.loadingBuyPlot = false
        window.location.reload(1)
      } else if (this.neighbourhood === 16 || this.neighbourhood === 17) {
        this.loadingBuyPlot = true
        const sales = await this.plotYangMarketContract.buy(amount, id)
        await sales.wait(1)

        this.loadingBuyPlot = false
        window.location.reload(1)
      } else {
        this.loadingBuyPlot = true
        const sales = await this.plotMarketContract.buy(amount, id)
        await sales.wait(1)

        this.loadingBuyPlot = false
        window.location.reload(1)
      }
    },
    async visitPlot(data) {
      let plot = {}

      if (this.neighbourhood === 18 || this.neighbourhood === 19) {
        plot = await this.plotYinContract.plots(data.token_id)
      } else if (this.neighbourhood === 16 || this.neighbourhood === 17) {
        plot = await this.plotYangContract.plots(data.token_id)
      } else {
        plot = await this.plotFreyalaContract.plots(data.token_id)
      }

      data.amountOwnedByPlot = ethers.utils.formatEther(plot._amountOwnedByPlot._isBigNumber ? ethers.BigNumber.from(plot._amountOwnedByPlot).toString() : plot._amountOwnedByPlot)
      this.selectedPlotData = data

      this.plotModalReason = 'visit'

      this.$modal.show('plot')
    },
    async buyPlot(data) {
      let plot = {}

      if (this.neighbourhood === 18 || this.neighbourhood === 19) {
        plot = await this.plotYinContract.plots(data.token_id)
      } else if (this.neighbourhood === 16 || this.neighbourhood === 17) {
        plot = await this.plotYangContract.plots(data.token_id)
      } else {
        plot = await this.plotFreyalaContract.plots(data.token_id)
      }

      data.amountOwnedByPlot = ethers.utils.formatEther(plot._amountOwnedByPlot._isBigNumber ? ethers.BigNumber.from(plot._amountOwnedByPlot).toString() : plot._amountOwnedByPlot)
      this.selectedPlotData = data

      this.plotModalReason = 'buy'

      this.$modal.show('plot')
    },
    editPanZoom() {
      const element = document.getElementById('plots')

      const panzoom = Panzoom(element, {
        maxScale: 10,
        minScale: 1,
        contain: 'outside'
      })

      element.parentElement.addEventListener('wheel', panzoom.zoomWithWheel)
    },
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

        this.mainContact = new ethers.Contract(Freyala.address, Freyala.abi, this.metaMaskWallet.signer)
        this.plotFreyalaContract = new ethers.Contract(PlotsFreyala.address, PlotsFreyala.abi, this.metaMaskWallet.signer)

        const [totalSupply, ownedPlots] = await Promise.all([
          this.plotFreyalaContract.totalSupply(),
          this.plotFreyalaContract.tokensOfOwner(this.metaMaskAccount)
        ])

        ownedPlots.map(async (plot) => {
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

        this.ownedPlotsData = []

        const xyaPlots = await this.plotFreyalaContract.tokensOfOwner(this.metaMaskAccount)

        xyaPlots.map(async (plot) => {
          const ownedPlot = await this.plotFreyalaContract.plots(plot.toNumber())

          this.ownedPlotsData.push({
            neighbourhood: ownedPlot._neighbourhood.toNumber(),
            token_id: ownedPlot._tokenId.toNumber(),
            plot_number: ownedPlot._plotNumber.toNumber(),
            soil_type: ownedPlot._soilType.toNumber(),
            fertility: ownedPlot._fertility.toNumber(),
            level: ownedPlot._level.toNumber(),
            crime_rate: ownedPlot._crimeRate.toNumber(),
            amountOwnedByPlot: ethers.utils.formatEther(ownedPlot._amountOwnedByPlot._isBigNumber ? ethers.BigNumber.from(ownedPlot._amountOwnedByPlot).toString() : ownedPlot._amountOwnedByPlot),
          })
        })

        freyalaSnapshot.plots.map((plot) => {
          if (plot[0] !== '0x0000000000000000000000000000000000000000') {
            this.plots.map((p, index) => {
              if (p.plot_number === plot.plot_number && this.neighbourhood === plot.neighbourhood) {
                this.plots[index] = {
                  neighbourhood: plot.neighbourhood,
                  token_id: plot.token_id,
                  plot_number: plot.plot_number,
                  soil_type: plot.soil_type,
                  fertility: plot.fertility,
                  level: plot.level,
                  crime_rate: plot.crime_rate,
                  bought: true
                }
              }
            })
          }
        })

        const freyalaArray = Array.from(Array(totalSupply.toNumber()).keys())
        const slicedArray = freyalaArray.slice(1669, totalSupply.toNumber())

        const promises = slicedArray.map(async (i) => {
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
                  amountOwnedByPlot: ethers.utils.formatEther(plot._amountOwnedByPlot._isBigNumber ? ethers.BigNumber.from(plot._amountOwnedByPlot).toString() : plot._amountOwnedByPlot),
                  bought: true
                }
              }
            })
          }
        })

        await Promise.all(promises).then(async () => {
          this.plots = this.plots.sort((a, b) => {
            return a.plot_number - b.plot_number;
          })

          const plots = await this.plots.map(async (plot) => {
            if (plot.token_id) {
              this.plotMarketContract = new ethers.Contract(PlotsMarket.address, PlotsMarket.abi, this.metaMaskWallet.signer)
              const sales = await this.plotMarketContract.getListing(plot.token_id)

              if (sales[4]) {
                plot.sales = {
                  seller: sales[0],
                  buyer: sales[1],
                  tokenId: sales[2].toNumber(),
                  price: ethers.BigNumber.from(sales[3]).toString(),
                  forSale: sales[4],
                }
              } else {
                plot.sales = {
                  seller: 0,
                  buyer: 0,
                  tokenId: plot.token_id,
                  price: 0,
                  forSale: false,
                }
              }
            } else {
              plot.sales = {
                seller: 0,
                buyer: 0,
                tokenId: undefined,
                price: 0,
                forSale: false,
              }
            }

          })

          const ownPlots = await this.ownedPlotsData.map(async (plot) => {
            if (plot.token_id) {
              this.plotMarketContract = new ethers.Contract(PlotsMarket.address, PlotsMarket.abi, this.metaMaskWallet.signer)
              const sales = await this.plotMarketContract.getListing(plot.token_id)

              if (sales[4]) {
                plot.sales = {
                  seller: sales[0],
                  buyer: sales[1],
                  tokenId: sales[2].toNumber(),
                  price: ethers.BigNumber.from(sales[3]).toString(),
                  forSale: sales[4],
                }
              } else {
                plot.sales = {
                  seller: 0,
                  buyer: 0,
                  tokenId: plot.token_id,
                  price: 0,
                  forSale: false,
                }
              }
            } else {
              plot.sales = {
                seller: 0,
                buyer: 0,
                tokenId: undefined,
                price: 0,
                forSale: false,
              }
            }

          })

          await Promise.all(plots).then(async () => {
            await Promise.all(ownPlots).then(() => {
              this.ownedPlots = this.ownedPlots.sort()
              this.ownedPlotsData = this.ownedPlotsData.sort((a,b) => a.token_id - b.token_id)

              this.loading = false
            })
          })
        })
      } else if (type === 'yang') {
        this.plotMin = (250 / 2) * ((this.neighbourhood - 16) + 1) - (250 / 2)
        this.plotMax = (250 / 2) * ((this.neighbourhood - 16) + 1)

        this.mainContact = new ethers.Contract(Yang.address, Yang.abi, this.metaMaskWallet.signer)
        this.plotYangContract = new ethers.Contract(PlotsYang.address, PlotsYang.abi, this.metaMaskWallet.signer)

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

        this.ownedPlotsData = []
        const yangPlots = await this.plotYangContract.tokensOfOwner(this.metaMaskAccount)

        yangPlots.map(async (plot) => {

          const ownedPlot = await this.plotYangContract.plots(plot.toNumber())
          this.ownedPlotsData.push({
            neighbourhood: ownedPlot._neighbourhood.toNumber(),
            token_id: ownedPlot._tokenId.toNumber(),
            plot_number: ownedPlot._plotNumber.toNumber(),
            soil_type: ownedPlot._soilType.toNumber(),
            fertility: ownedPlot._fertility.toNumber(),
            level: ownedPlot._level.toNumber(),
            crime_rate: ownedPlot._crimeRate.toNumber(),
            amountOwnedByPlot: ethers.utils.formatEther(ownedPlot._amountOwnedByPlot._isBigNumber ? ethers.BigNumber.from(ownedPlot._amountOwnedByPlot).toString() : ownedPlot._amountOwnedByPlot),
          })
        })

        yangSnapshot.plots.map((plot) => {
          if (plot[0] !== '0x0000000000000000000000000000000000000000') {
            this.plots.map((p, index) => {
              if (p.plot_number === plot.plot_number && this.neighbourhood === plot.neighbourhood) {
                this.plots[index] = {
                  neighbourhood: plot.neighbourhood,
                  token_id: plot.token_id,
                  plot_number: plot.plot_number,
                  soil_type: plot.soil_type,
                  fertility: plot.fertility,
                  level: plot.level,
                  crime_rate: plot.crime_rate,
                  bought: true
                }
              }
            })
          }
        })

        this.plots = this.plots.sort((a, b) => {
          return a.plot_number - b.plot_number;
        })

        const plots = await this.plots.map(async (plot) => {
          if (plot.token_id) {
            this.plotYangMarketContract = new ethers.Contract(PlotsYangMarket.address, PlotsYangMarket.abi, this.metaMaskWallet.signer)
            const sales = await this.plotYangMarketContract.getListing(plot.token_id)

            if (sales[4]) {
              plot.sales = {
                seller: sales[0],
                buyer: sales[1],
                tokenId: sales[2].toNumber(),
                price: ethers.BigNumber.from(sales[3]).toString(),
                forSale: sales[4],
              }
            } else {
              plot.sales = {
                seller: 0,
                buyer: 0,
                tokenId: plot.token_id,
                price: 0,
                forSale: false,
              }
            }
          } else {
            plot.sales = {
              seller: 0,
              buyer: 0,
              tokenId: undefined,
              price: 0,
              forSale: false,
            }
          }

        })

        const ownPlots = await this.ownedPlotsData.map(async (plot) => {
          if (plot.token_id) {
            this.plotYangMarketContract = new ethers.Contract(PlotsYangMarket.address, PlotsYangMarket.abi, this.metaMaskWallet.signer)
            const sales = await this.plotYangMarketContract.getListing(plot.token_id)

            if (sales[4]) {
              plot.sales = {
                seller: sales[0],
                buyer: sales[1],
                tokenId: sales[2].toNumber(),
                price: ethers.BigNumber.from(sales[3]).toString(),
                forSale: sales[4],
              }
            } else {
              plot.sales = {
                seller: 0,
                buyer: 0,
                tokenId: plot.token_id,
                price: 0,
                forSale: false,
              }
            }
          } else {
            plot.sales = {
              seller: 0,
              buyer: 0,
              tokenId: undefined,
              price: 0,
              forSale: false,
            }
          }

        })

        await Promise.all(plots).then(async () => {
          await Promise.all(ownPlots).then(() => {
            this.loading = false
          })
        })
      } else if (type === 'yin') {
        this.plotMin = (250 / 2) * ((this.neighbourhood - 18) + 1) - (250 / 2)
        this.plotMax = (250 / 2) * ((this.neighbourhood - 18) + 1)

        this.mainContact = new ethers.Contract(Yin.address, Yin.abi, this.metaMaskWallet.signer)
        this.plotYinContract = new ethers.Contract(PlotsYin.address, PlotsYin.abi, this.metaMaskWallet.signer)

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

        this.ownedPlotsData = []
        const yinPlots = await this.plotYinContract.tokensOfOwner(this.metaMaskAccount)
        yinPlots.map(async (plot) => {

          const ownedPlot = await this.plotYinContract.plots(plot.toNumber())
          this.ownedPlotsData.push({
            neighbourhood: ownedPlot._neighbourhood.toNumber(),
            token_id: ownedPlot._tokenId.toNumber(),
            plot_number: ownedPlot._plotNumber.toNumber(),
            soil_type: ownedPlot._soilType.toNumber(),
            fertility: ownedPlot._fertility.toNumber(),
            level: ownedPlot._level.toNumber(),
            crime_rate: ownedPlot._crimeRate.toNumber(),
            amountOwnedByPlot: ethers.utils.formatEther(ownedPlot._amountOwnedByPlot._isBigNumber ? ethers.BigNumber.from(ownedPlot._amountOwnedByPlot).toString() : ownedPlot._amountOwnedByPlot),
          })
        })

        yinSnapshot.plots.map((plot) => {
          if (plot[0] !== '0x0000000000000000000000000000000000000000') {
            this.plots.map((p, index) => {
              if (p.plot_number === plot.plot_number && this.neighbourhood === plot.neighbourhood) {
                this.plots[index] = {
                  neighbourhood: plot.neighbourhood,
                  token_id: plot.token_id,
                  plot_number: plot.plot_number,
                  soil_type: plot.soil_type,
                  fertility: plot.fertility,
                  level: plot.level,
                  crime_rate: plot.crime_rate,
                  bought: true
                }
              }
            })
          }
        })

        this.plots = this.plots.sort((a, b) => {
          return a.plot_number - b.plot_number;
        })

        const plots = await this.plots.map(async (plot) => {
          if (plot.token_id) {
            this.plotYinMarketContract = new ethers.Contract(PlotsYinMarket.address, PlotsYinMarket.abi, this.metaMaskWallet.signer)
            const sales = await this.plotYinMarketContract.getListing(plot.token_id)

            if (sales[4]) {
              plot.sales = {
                seller: sales[0],
                buyer: sales[1],
                tokenId: sales[2].toNumber(),
                price: ethers.BigNumber.from(sales[3]).toString(),
                forSale: sales[4],
              }
            } else {
              plot.sales = {
                seller: 0,
                buyer: 0,
                tokenId: plot.token_id,
                price: 0,
                forSale: false,
              }
            }
          } else {
            plot.sales = {
              seller: 0,
              buyer: 0,
              tokenId: undefined,
              price: 0,
              forSale: false,
            }
          }

        })

        const ownPlots = await this.ownedPlotsData.map(async (plot) => {
          if (plot.token_id) {
            this.plotYinMarketContract = new ethers.Contract(PlotsYinMarket.address, PlotsYinMarket.abi, this.metaMaskWallet.signer)
            const sales = await this.plotYinMarketContract.getListing(plot.token_id)

            if (sales[4]) {
              plot.sales = {
                seller: sales[0],
                buyer: sales[1],
                tokenId: sales[2].toNumber(),
                price: ethers.BigNumber.from(sales[3]).toString(),
                forSale: sales[4],
              }
            } else {
              plot.sales = {
                seller: 0,
                buyer: 0,
                tokenId: plot.token_id,
                price: 0,
                forSale: false,
              }
            }
          } else {
            plot.sales = {
              seller: 0,
              buyer: 0,
              tokenId: undefined,
              price: 0,
              forSale: false,
            }
          }

        })

        await Promise.all(plots).then(async () => {
          await Promise.all(ownPlots).then(() => {
            this.loading = false
          })
        })
      }
    }
  }
}
</script>