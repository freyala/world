<template>
    <div style="width: 100vw; min-height:100vh; height: 100vh; z-index: 999"
        class="flex flex-row w-full h-full relative bg-dark">

        <div v-show='loadingPlots' class='absolute top-0 right-0 left-0 bottom-0'
            style='background-image: url(/images/plots_loading.png); background-size: cover'>
            <div class='absolute top-0 right-0 left-0 bottom-0 bg-dark opacity-30 flex items-center justify-center'>
            </div>

            <div class='h-full w-full flex items-center justify-center'>
                <div class="m-auto text-center">
                    <div class="w-full flex">
                        <img class="w-24 h-24 m-auto" src="/images/XYA.png" alt="XYA logo"
                            style="animation: rotation 2s infinite linear;">
                    </div>
                    <br>
                    <p class="text-2xl text-white">Loading...</p>
                </div>
            </div>
        </div>

        <div v-show='!showSideBar' v-on:click='showSideBar = true'
            class='h-16 w-8 dark-panel absolute flex items-center justify-center block xl:hidden rounded-r-xl'
            style='top: 50%; left: 0%; z-index: 1'>
            <i class='fa fa-arrow-right'></i>
        </div>

        <div class='absolute flex flex-row h-16 w-full top-0 dark-panel items-center' style="z-index: 1000">
            <div class='ml-6 mt-5 mb-4 w-auto text-xl cursor-pointer absolute z-50 w-2/5 flex flex-row items-center'>
                <span v-if='!showPlotDetails'>
                    <router-link class='flex items-center' :to="{ name: 'world-map' }">
                        <i class='fa fa-arrow-left mr-2' v-on:click='showPlotDetails = false'>

                        </i>
                        <span class='sm:block hidden'>Back</span>
                    </router-link>
                </span>
                <span class="flex items-center" v-on:click='showPlotDetails = false' v-else>
                    <i class='fa fa-arrow-left mr-2' v-on:click='showPlotDetails = false'>
                    </i>
                    <span class='sm:block hidden'>Back</span>
                </span>
            </div>
            <div class='w-full text-center lg:text-3xl sm:text-xl text-xl font-bold absolute'>
                <p v-if='!showPlotDetails'>Plots of Land</p>
                <p v-else>Plot #{{currentPlot.token_id}}</p>
            </div>
            <div class='absolute sm:right-12 right-4'>
                <i v-if='showPlotDetails && currentPlot.ownerOf' v-on:click='$modal.show("sendplot")'
                    class='fas fa-paper-plane sm:text-xl text-base hover:text-white cursor-pointer mx-6'></i>
                <i v-on:click='$modal.show("allowances")'
                    class='fas fa-cog sm:text-xl text-base hover:text-white cursor-pointer'></i>
            </div>
        </div>
        <div class='xl:relative absolute 2xl:w-1/5 xl:w-3/12 lg:w-5/12 sm:w-6/12 w-full h-full flex flex-row py-4 px-4 pt-16 overflow-y-auto overflow-x-hidden'
            v-bind:style='{"left": (showSideBar ? 0 : -600) + "px"}'
            style="border-right: 1px solid #363636; z-index: 1; background-color: #282828; box-shadow: 8px 0px 8px rgba(0,0,0,0.15); transition: all 0.15s linear">

            <div class='w-full h-full flex flex-col relative'>
                <p v-if='!showPlotDetails' class="p-1 lg:text-xl text-lg mt-4 mb-1 text-white opacity-80">
                    Neighbourhood
                </p>
                <div v-if='!showPlotDetails' class="w-full rounded-xl p-4 mb-4 dark-panel">
                    <select class="p-1 rounded-xl cursor-pointer xya-input text-white xl:text-lg text-sm"
                        style='width: 100%' name="neighbourhood" id="neighbourhood-select" v-model="neighbourhood">
                        <option v-for="(n, index) in allNeighbourhoods" :value="index" :key='index'>{{ n }}</option>
                    </select>
                </div>

                <p v-if='!showPlotDetails' class="p-1 lg:text-xl text-lg mb-1 text-white opacity-80">
                    Filter
                </p>
                <div v-if='!showPlotDetails' class="w-full rounded-xl px-6 py-6 mb-4 text-white dark-panel">
                    <!-- <div class='flex flex-row mb-4 w-full'>
                        <div v-bind:class='{"checked": filters.onlySales}' v-on:click='applySaleFilters()'
                            class='checkbox mr-3 cursor-pointer'></div>
                        <p class='mb-2 xl:text-lg text-sm'>
                            On Sale
                        </p>
                    <hr class='my-4' style='color: rgba(0,0,0,0.5);' />
                    </div> -->
                    <div class='flex flex-row w-full mb-2'>
                        <p class='xl:text-lg text-sm'>
                            Fertility
                        </p>
                    </div>
                    <div class='flex flex-row w-full mb-4'>
                        <div class='w-5/10 flex flex-row items-center'>
                            <span class='opacity-60 xl:text-base text-xs'>Min.</span> <input
                                v-model='filters.minFertility' class='w-5/10 mx-3 px-2 xya-input' type='number' />
                        </div>
                        <div class='w-5/10 flex flex-row items-center'>
                            <span class='opacity-60 xl:text-base text-xs'>Max.</span> <input
                                v-model='filters.maxFertility' class='w-5/10 mx-3 px-2 xya-input' type='number' />
                        </div>
                    </div>
                    <div class='flex flex-row w-full mb-2 items-center'>
                        <p class='xl:text-lg text-sm'>
                            Crime Rate
                        </p>
                    </div>
                    <div class='flex flex-row w-full mb-4'>
                        <div class='w-5/10 flex flex-row items-center'>
                            <span class='opacity-60 xl:text-base text-xs'>Min.</span> <input
                                v-model='filters.minCrimeRate' class='w-5/10 mx-3 px-2 xya-input' type='number' />
                        </div>
                        <div class='w-5/10 flex flex-row items-center'>
                            <span class='opacity-60 xl:text-base text-xs'>Max.</span> <input
                                v-model='filters.maxCrimeRate' class='w-5/10 mx-3 px-2 xya-input' type='number' />
                        </div>
                    </div>
                    <div class='flex flex-row w-full mb-2'>
                        <p class='xl:text-lg text-sm'>
                            Level
                        </p>
                    </div>
                    <div class='flex flex-row w-full mb-8'>
                        <div class='w-5/10 flex flex-row items-center'>
                            <span class='opacity-60 xl:text-base text-xs'>Min.</span> <input v-model='filters.minLevel'
                                class='w-5/10 mx-3 px-2 xya-input' type='number' />
                        </div>
                        <div class='w-5/10 flex flex-row items-center'>
                            <span class='opacity-60 xl:text-base text-xs'>Max.</span> <input v-model='filters.maxLevel'
                                class='w-5/10 mx-3 px-2 xya-input' type='number' />
                        </div>
                    </div>
                    <div class='flex flex-row w-full text-center justify-center xl:mb-4 mb-0'>
                        <p v-on:click='resetPlotFilters()'
                            class='w-5/10 flex items-center xl:text-base text-sm text-yellow hover:text-white cursor-pointer justify-start'>
                            Reset Filters</p>
                        <p v-on:click='applyPlotFilters()' class='xya-btn2 w-5/10 xl:text-base text-sm'>Apply Filters
                        </p>
                    </div>
                </div>

                <p class="p-1 lg:text-xl text-lg mb-1 text-white opacity-80" v-bind:class='{"mt-4": showPlotDetails}'>
                    Unlocked Treasury
                </p>
                <div class="w-full rounded-xl p-4 mb-4 dark-panel">
                    <p v-if='loadingMyPlots' class="p-1 xl:text-lg text-sm opacity-80">
                        <i class='fa fa-gear fa-spin'></i> Loading...
                    </p>
                    <div v-else class='w-full h-full flex items-center xl:text-lg text-sm flex flex-col'>
                        <template v-if='unlockedOldEmissions > 0'>
                            <p class="w-full text-white opacity-20 text-sm">
                                Old Emissions
                            </p>
                            <hr class="w-full text-white opacity-20 my-2" />
                            <div class="w-full flex flex-row mb-4">
                                <p class='text-white opacity-80 sm:w-3/10 w-5/10'>
                                    XYA
                                </p>
                                <p class='sm:text-left text-center sm:w-3/10 w-5/10'>
                                    {{unlockedOldEmissions}}
                                </p>
                                <p v-on:click='withdrawUnlockedEmissions(true)'
                                    class='sm:w-5/10 w-3/10 ml-auto xya-btn2 text-center'>
                                    Collect
                                </p>
                            </div>
                        </template>

                        <div class="w-full flex flex-row items-center">
                            <p class='text-white opacity-80 sm:w-3/10 w-5/10'>
                                XYA
                            </p>
                            <p class='sm:text-left text-center sm:w-3/10 w-5/10'>
                                {{unlockedEmissions}}
                            </p>
                            <p v-on:click='withdrawUnlockedEmissions()'
                                class='sm:w-5/10 w-3/10 ml-auto xya-btn2 text-center'>
                                Collect
                            </p>
                        </div>
                    </div>
                </div>

                <p v-if='getLimboAssetTotalCount() > 0' class="p-1 lg:text-xl text-lg mb-1 text-white opacity-80">
                    Stuck NFTS
                </p>
                <div :key='keys.limboAssets' v-if='getLimboAssetTotalCount() > 0'
                    class="w-full rounded-xl p-4 mb-4 dark-panel">
                    <div class='my-4' v-for='(asset, index) in limboAssets' :key='index'>
                        <p v-if='loadingMyPlots' class="p-1 xl:text-lg text-sm opacity-80">
                            <i class='fa fa-gear fa-spin'></i> Loading...
                        </p>
                        <div v-else class='w-full h-full flex items-center xl:text-lg text-sm'>
                            <p class='text-white opacity-80 sm:w-6/10 w-10/10'>
                                {{asset.count}} {{asset.name}}
                            </p>

                            <p v-on:click='withdrawLimboNFTs(asset.address, asset.userNFTs)'
                                class='sm:w-5/10 w-3/10 ml-auto xya-btn2 text-center'>
                                Withdraw
                            </p>
                        </div>
                    </div>
                </div>

                <div class='flex w-full items-center h-auto'>
                    <p class="p-1 lg:text-xl text-lg mb-1 text-white opacity-80">
                        Your Plots
                    </p>
                    <p v-show='userPlots.length > 0' v-on:click='claimAllPlotsEmissions()'
                        class='sm:w-5/10 w-3/10 ml-auto text-base text-right text-center cursor-pointer'>
                        Claim All
                    </p>
                </div>
                <div class="w-full rounded-xl p-4 mb-4 dark-panel">
                    <p v-if='loadingMyPlots' class="p-1 xl:text-lg text-sm opacity-80">
                        <i class='fa fa-gear fa-spin mt-2'></i> Loading...
                    </p>
                    <p v-if='!loadingMyPlots && userPlots.length === 0' class="p-1 xl:text-lg text-sm opacity-80">
                        You have no plots.
                    </p>
                    <div v-for='(neighbourhood, index) in myNeighbourhoods' :key='index'>
                        <p class="p-1 lg:text-lg text-sm mb-1 text-white opacity-80">
                            {{neighbourhood}}
                        </p>
                        <p v-on:click='openPlot(plot)' v-for='plot in getUserPlotsByNeighbourhood(neighbourhood)'
                            :key='plot.token_id * 1' class='ml-4 lg:text-lg text-sm mb-1 cursor-pointer relative'>
                            <i class='fa fa-map mr-4'></i>#{{plot.token_id}} - {{ plot.emissions}} XYA

                            <i v-if='plot.token_id === currentPlot.token_id && showPlotDetails'
                                class='fas fa-map-marker-alt lg:text-lg text-sm absolute right-4 flex top-0 items-center text-white opacity-80'></i>
                            <i v-if='plot.isEmitting'
                                class='fa fa-bolt absolute lg:text-lg text-sm absoluteflex top-0 items-center'
                                v-bind:class='{"right-12": showPlotDetails, "right-4": !showPlotDetails}'></i>
                            <i v-if='plot.isClogged'
                                class='fas fa-exclamation-triangle absolute lg:text-lg text-sm absoluteflex top-0 items-center'
                                v-bind:class='{"right-20": showPlotDetails, "right-12": !showPlotDetails}'></i>
                        </p>
                    </div>
                </div>
            </div>


            <div v-on:click='showSideBar = !showSideBar'
                class='h-16 w-8 dark-panel absolute flex items-center justify-center block xl:hidden rounded-l-xl'
                style='top: 50%; right: 0px'>
                <i v-if='showSideBar' class='fa fa-arrow-left'></i>
                <i v-else class='fa fa-arrow-right'></i>
            </div>

        </div>
        <div class='2xl:w-4/5 xl:w-9/12 w-full h-full relative overflow-hidden mt-16'>
            <div id='plots' class='relative' :style='"height:" + parseInt(plotData.length / 10 + 1) * 225 + "px"'
                style='width: 2200px;'>
                <div v-bind:class='{"plot-owner": plot.ownerOf}' v-on:click='openPlot(plot)'
                    v-for="(plot, index) in plotData" :key='plot.plotId' class="absolute"
                    style='width: 220px; height: 220px'
                    :style="'top: ' + (parseInt(index / 10) * 220) + 'px; left: ' + ((index % 10) * 220) + 'px'">
                    <div v-if='!plot.isFiltered' class='z-50 absolute top-0 right-0 bottom-0 left-0 bg-dark opacity-50'>

                    </div>

                    <img class="w-full h-full" src="/images/plots/base/0.png" alt="Base land">
                    <img class="absolute top-0 left-0 w-full h-full"
                        :src="`/images/plots/soil_type/${plot.soilType}.png`" alt="Soil Type">

                    <img class="absolute top-0 left-0 w-full h-full"
                        :src="getPlotAttributeImage('Level', plot.neighbourhood, plot.level)" alt="Level">

                    <img class="absolute top-0 left-0 w-full h-full"
                        :src="getPlotAttributeImage('Fertility', plot.neighbourhood, plot.fertility)" alt="Fertility">

                    <img class="absolute top-0 left-0 w-full h-full"
                        :src="getPlotAttributeImage('Crime', plot.neighbourhood, plot.crimeRate)" alt="Crime">

                    <div class="opacity-50 absolute top-0 left-0 text-white p-2 cursor-pointer w-full h-full"
                        style="line-height: 0.75;pointer-events: none;">
                    </div>

                    <div class="absolute bottom-0 left-4 text-white opacity-80 pb-2">
                        <small>
                            Soil: {{ soilTypes[plot.soilType] }}
                        </small>
                        <br>
                        <small>
                            F: {{ plot.fertility }}
                        </small>

                        <small>
                            L: {{ plot.level }}
                        </small>

                        <small>
                            C: {{ plot.crimeRate }}
                        </small>
                    </div>
                </div>
            </div>
        </div>

        <div v-show='showPlotDetails' class='absolute bottom-0 top-0 left-0 right-0 bg-dark'>

        </div>

        <div v-show='!showPlotDetails' class='absolute mb-8 bottom-2 md:right-6 right-0 md:ml-12 ml-0 w-auto md:mt-4'
            style='transform: rotateY(180deg)'>
            <AudioManagerInterface></AudioManagerInterface>
        </div>

        <transition name='slide-in'>
            <PlotDetails :key='currentPlot.token_id' v-if='showPlotDetails' :contract='plotContract'
                :plotEmitterContract='plotEmitterContract' :plotInventoryContract='plotInventoryContract'
                :allowances='allowances' v-on:close="showPlotDetails = false"
                v-on:allowanceError='manageAllowanceError($event)' class='fixed top-16'
                style='z-index: 500; transition: all 0.25s;' :plot='currentPlot'>

            </PlotDetails>
        </transition>

        <window height='10%' width='80%' name='allowances'>
            <div class="flex flex-wrap justify-center p-6 px-12 bg-dark h-full">
                <div class="w-full text-center">
                    <div class="sm:text-3xl text-xl">Contract Manager</div>
                </div>
                <div class="absolute right-6">
                    <i @click="$modal.hide('allowances')"
                        class="fas fa-times cursor-pointer sm:text-xl text-base sm:mt-0 mt-1"></i>
                </div>
                <hr class='w-full my-4' />

                <div class="mt-4 flex flex-row w-full items-start justify-start items-center">
                    <span class='text-white opacity-80 mr-1 sm:text-base text-xs'>'Plot Handler' Contract</span>

                    <p v-on:click='setTokenAllowance(plotContract.address, allowances.plotHandler ? 0 : 999999999999);'
                        class='sm:w-2/10 w-5/10 xya-btn2 text-center xl:text-lg text-sm ml-auto'>
                        <template v-if='!allowances.plotHandler'>Enable</template>
                        <template v-else>Disable</template>
                    </p>
                </div>

                <div class="mt-4 flex flex-row w-full items-start justify-start items-center">
                    <span class='text-white opacity-80 mr-1 sm:text-base text-xs'>'Plot Emitter' Contract</span>

                    <p v-on:click='setTokenAllowance(plotEmitterContract.address, allowances.plotEmitter ? 0 : 999999999999,  CONSTANTS.XYA_ONE)'
                        class='sm:w-2/10 w-5/10 xya-btn2 text-center xl:text-lg text-sm ml-auto'>
                        <template v-if='!allowances.plotEmitter'>Enable</template>
                        <template v-else>Disable</template>
                    </p>
                </div>
            </div>
        </window>

        <window height='10%' width='80%' name='sendplot'>
            <div class="flex flex-wrap justify-center p-6 px-12 bg-dark h-full">
                <div class="w-full text-center">
                    <div class="sm:text-3xl text-2xl">Send Plot</div>
                </div>
                <div class="absolute right-6">
                    <i @click="$modal.hide('sendplot')" class="fas fa-times cursor-pointer text-xl"></i>
                </div>
                <hr class='w-full my-4 opacity-30' />
                <div class='w-full mx-auto flex flex-row mt-2'>
                    <p class='text-xl text-start w-4/10'>Receiver Address: </p>
                    <input class='w-6/10 text-black px-2 rounded-lg' type="text" v-model='plotsSendTo' />
                </div>
                <div class="w-full flex flex-row items-center mt-6">
                    <p @click="$modal.hide('sendplot')"
                        class='ml-auto w-3/12 text-base cursor-pointer hover:text-white'>Cancel</p>
                    <button v-on:click="sendPlotNow(plotsSendTo, currentPlot.token_id, currentPlot.neighbourhood)"
                        type="button" class="w-3/12 xya-btn2 text-base">
                        <span>Confirm</span>
                    </button>
                </div>
            </div>
        </window>

    </div>
</template>

<script>
    import fromExponential from "from-exponential";

    import wallet from "../../plugins/wallet"
    import plot from "../../plugins/artifacts/plothandler.json"
    import plotEmitter from "../../plugins/artifacts/plotEmitter.json"
    import plotInventory from "../../plugins/artifacts/plotInventory.json"

    import {
        ethers
    } from "ethers"
    import {
        mapGetters
    } from "vuex"
    import plotSnapshot from "../../plugins/snapshots/plots.json";
    import plotRenderData from '../../plugins/snapshots/plotsRenderData.json';

    import HRC721 from '../../plugins/artifacts/HRC721.json';

    import PlotsYang from "../../plugins/artifacts/plotsyang.json";
    import PlotsYin from "../../plugins/artifacts/plotsyin.json";
    import PlotsFreyala from "../../plugins/artifacts/plotsfreyala.json";
    import Freyala from "../../plugins/artifacts/freyala.json";
    import Yin from "../../plugins/artifacts/yin.json";
    import Yang from "../../plugins/artifacts/yang.json";
    import PlotsMarket from "../../plugins/artifacts/plotsmarket.json";
    import PlotsYinMarket from "../../plugins/artifacts/plotsyinmarket.json";
    import PlotsYangMarket from "../../plugins/artifacts/plotsyangmarket.json";

    import Panzoom from '@panzoom/panzoom'
    import PlotDetails from '../../components/Plots/PlotDetails.vue';
    import AudioManagerInterface from '../../components/Plugins/AudioManagerInterface.vue';

    export default {
        name: 'Plots',
        computed: {
            ...mapGetters([
                'metaMaskAccount',
                'metaMaskWallet'
            ]),

            myNeighbourhoods() {
                const neighbourhoods = [];
                for (let i = 0; i < this.allNeighbourhoods.length; i++) {
                    if (this.userPlots.filter(c => c.neighbourhood === i).length > 0) {
                        neighbourhoods.push(this.allNeighbourhoods[i]);
                    }
                }
                return neighbourhoods;
            },

            isFiltered() {
                return this.filteredPlotData.length > 0;
            }
        },

        components: {
            PlotDetails,
            AudioManagerInterface
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
                plotEmitterContract: undefined,
                plotInventoryContract: undefined,
                plotsMounted: false,
                neighbourhood: 0,
                plotData: [],
                filteredPlotData: [],
                userPlots: [],
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

                emissionsRate: 0,
                unlockedEmissions: 0,
                unlockedEmissionsInterval: undefined,

                showPlotDetails: false,
                plotsInitialX: 0,
                plotsInitialY: 0,
                plotsInitialZoom: 1.75,
                plotsSendTo: "",

                currentPlot: {
                    id: -1
                },

                filters: {
                    minFertility: 0,
                    maxFertility: 99,
                    minCrimeRate: 0,
                    maxCrimeRate: 99,
                    minLevel: 0,
                    maxLevel: 99,
                    onlySales: false
                },

                CONSTANTS: {
                    MAX_PLOTS_QUERY: 45
                },

                showSideBar: true,

                allowances: {
                    xyaOne: false,
                    xya: false,
                    plotHandler: false,
                    plotEmitter: false,
                    xyaPlots: false,
                    yinPlots: false,
                    yangPlots: false,
                    marketXyaPlots: false,
                    marketYinPlots: false,
                    marketYangPlots: false
                },
                allowanceFocus: '',

                CONSTANTS: {
                    XYA_ONE: "0xc74eaf04777f784a7854e8950daeb27559111b85",
                    XYA: "0x9b68bf4bf89c115c721105eaf6bd5164afcc51e4"
                },

                isPanzoom: false,
                lastTimeStamp: 0,

                loadingPlots: true,
                loadingMyPlots: true,

                limboAssets: [{
                        name: "Crypto Pigs",
                        address: "0xE5Fd335819EDb8DA8395F8Ec48beCA747a0790aB",
                        count: 0,
                        userNFTs: [],
                    },
                    {
                        name: "The Frey",
                        address: "0xd9d6b8c7f63cc2f5d5df5f3a77b2f596a66230d2",
                        count: 0,
                        userNFTs: [],
                    },
                    {
                        name: "Orcs",
                        address: "",
                        count: 0,
                        userNFTs: [],
                    },
                    {
                        name: "DFK Heroes",
                        address: "0x5F753dcDf9b1AD9AabC1346614D1f4746fd6Ce5C",
                        count: 0,
                        userNFTs: [],
                    },

                ],

                keys: {
                    limboAssets: 0
                },


                //temporary

                plotEmitterOldContract: undefined,
                unlockedOldEmissions: 0,
            }
        },

        async created() {
            if (!this.$route.params.neighbourhood) {
                await this.$router.push({
                    name: 'plots',
                    params: {
                        neighbourhood: '0'
                    }
                })
            } else {
                this.neighbourhood = parseInt(this.$route.params.neighbourhood)
            }

            if (this.$route.query.coordX && this.$route.query.coordY) {
                const initialX = parseInt(this.$route.query.coordX);
                const initialY = parseInt(this.$route.query.coordY);
                this.plotsInitialX = initialX;
                this.plotsInitialY = initialY;

                if (this.$route.query.scale) {
                    this.plotsInitialZoom = parseFloat(this.$route.query.scale);
                }
            }
        },

        watch: {
            async neighbourhood() {
                if (this.plotsMounted) {
                    window.history.pushState({},
                        null,
                        '#' + this.$route.path.replace(this.$route.params.neighbourhood, '') + this
                        .neighbourhood
                    )

                    this.myPlots = false
                    await this.getPlots()
                }
            },

            'metaMaskAccount': async function (newVal) {
                if (newVal !== this.metamaskAccount) {
                    location.reload();
                }
            },
        },

        async mounted() {
            [this.plotContracts.xya, this.plotContracts.yin, this.plotContracts.yang, this.tokenContracts.xya, this
                .tokenContracts.yin, this.tokenContracts.yang, this.marketContracts.xya, this.marketContracts.yin,
                this.marketContracts.yang
            ] = await Promise.all([
                new ethers.Contract(PlotsFreyala.address, PlotsFreyala.abi, this.metaMaskWallet.signer),
                new ethers.Contract(PlotsYin.address, PlotsYin.abi, this.metaMaskWallet.signer),
                new ethers.Contract(PlotsYang.address, PlotsYang.abi, this.metaMaskWallet.signer),
                new ethers.Contract(Freyala.address, Freyala.abi, this.metaMaskWallet.signer),
                new ethers.Contract(Yin.address, Yin.abi, this.metaMaskWallet.signer),
                new ethers.Contract(Yang.address, Yang.abi, this.metaMaskWallet.signer),
                new ethers.Contract(PlotsMarket.address, PlotsMarket.abi, this.metaMaskWallet.signer),
                new ethers.Contract(PlotsYinMarket.address, PlotsYinMarket.abi, this.metaMaskWallet.signer),
                new ethers.Contract(PlotsYangMarket.address, PlotsYangMarket.abi, this.metaMaskWallet
                    .signer)
            ]);

            this.plotEmitterOldContract = await new ethers.Contract(plotEmitter.oldAddress, plotEmitter.abi, this
                .metaMaskWallet.signer);
            this.plotEmitterContract = await new ethers.Contract(plotEmitter.address, plotEmitter.abi, this
                .metaMaskWallet.signer);
            this.plotContract = await new ethers.Contract(plot.address, plot.abi, this.metaMaskWallet.signer);
            this.plotInventoryContract = await new ethers.Contract(plotInventory.address, plotInventory.abi, this
                .metaMaskWallet.signer);

            this.unlockedEmissions = (await this.plotEmitterContract.getUnlockedBalance() / 10 ** 18).toFixed(2);
            this.unlockedOldEmissions = (await this.plotEmitterOldContract.getUnlockedBalance() / 10 ** 18).toFixed(
                2);

            this.unlockedEmissionsInterval = setInterval(async () => {
                this.getMyPlots();
            }, 60000);

            await this.getPlots();
            this.initializePanZoom();
            this.plotsMounted = true;

            await this.getMyPlots();
            await this.getAllowances();
            await this.getLimboAssets();

            setTimeout(() => {
                this.loadingPlots = false;
            }, 250);

            //window.addEventListener("resize", this.initializePanZoom);

        },

        methods: {
            initializePanZoom() {
                const elem = document.getElementById("plots");

                let panzoom = Panzoom(elem, {
                    maxScale: 3,
                    minScale: 1,
                    contain: 'outside',
                });

                elem.parentElement.addEventListener('wheel', (e) => {
                    const el = e.target.closest('#plots');
                    if (el && !el.length) {
                        panzoom.zoomWithWheel(e)
                    }
                })

                elem.addEventListener('panzoomchange', (e) => {
                    const position = e.detail;
                    this.$router.push({
                        query: {
                            coordX: position.x,
                            coordY: position.y,
                            scale: position.scale
                        }
                    })
                });

                elem.addEventListener('panzoomstart', (e) => {
                    this.isPanzoom = true;
                    this.lastTimeStamp = e.timeStamp;
                });

                elem.addEventListener('panzoomend', (e) => {
                    if (Math.abs(this.lastTimeStamp - e.timeStamp) < 150) {
                        this.isPanzoom = false;
                        //this.showPlotDetails = true;
                    }
                    setTimeout(() => {
                        this.isPanzoom = false;
                    }, 250);
                });

                setTimeout(() => {
                    panzoom.pan(this.plotsInitialX, this.plotsInitialY);
                });

                setTimeout(() => {
                    panzoom.zoom(this.plotsInitialZoom);
                }, 5);
            },

            createLoaderToast(message) {
                let toastId = Date.now();
                let toast = this.$toast(message, {
                    timeout: 0,
                    closeButton: "button",
                    icon: "fa fa-gear fa-spin",
                    id: toastId
                });
                return toast;
            },

            getPlotAttributeImage(attribute, neighbourhood, value) {
                if (attribute !== 'Level' && value == 0) return '/plots/neutral/0.png';
                value = Math.min(9, value);
                const renderData = plotRenderData.filter(c => c.n.indexOf(neighbourhood * 1) > -1)[0];
                if (!renderData) return '';

                const folder = renderData['folder'];
                if (attribute === 'Level') {
                    return `/plots/${folder}/${attribute}_${value}.png`;
                }

                if (renderData[attribute].indexOf(value) > -1) {
                    return `/plots/${folder}/${attribute}_${value}.png`;
                } else {
                    return `/plots/neutral/${attribute}_${value}.png`;
                }
            },

            getLimboAssetTotalCount() {
                return this.limboAssets.filter(c => c.count > 0).length > 0;
            },

            applyPlotFilters() {
                for (let i = 0; i < this.plotData.length; i++) {
                    this.plotData[i].isFiltered = false;
                }

                if ((this.filters.fertilityMin + this.filters.minCrimeRate + this.filters.minLevel) === 0 &&
                    this.filters.fertilityMax + this.filters.maxCrimeRate + this.filters.maxLevel >= this.contants
                    .MAX_PLOTS_QUERY) {
                    this.filteredPlotData = [];
                }

                const fertilityFilter = (value) => {
                    return value >= this.filters.minFertility * 1 && value <= this.filters.maxFertility * 1
                };
                const crimeRateFilter = (value) => {
                    return value >= this.filters.minCrimeRate * 1 && value <= this.filters.maxCrimeRate * 1
                };
                const levelFilter = (value) => {
                    return value >= this.filters.minLevel * 1 && value <= this.filters.maxLevel * 1
                };

                let filteredPlotData = this.plotData.filter(c => (fertilityFilter(c.fertility) && crimeRateFilter(c
                    .crimeRate) && levelFilter(c.level)));

                for (let i = 0; i < filteredPlotData.length; i++) {
                    filteredPlotData[i].isFiltered = true;
                }

                this.plotData.splice(0, 0);
            },

            applySaleFilters() {
                this.filters.onlySales = !this.filters.onlySales;
                this.applyPlotFilters();
            },

            getUserPlotsByNeighbourhood(neighbourhood) {
                for (let i = 0; i < this.allNeighbourhoods.length; i++) {
                    if (this.allNeighbourhoods[i] === neighbourhood) {
                        return this.userPlots.filter(c => c.neighbourhood === i);
                    }
                }
                return [];
            },

            resetPlotFilters() {
                this.filters = {
                    minFertility: 0,
                    maxFertility: 99,
                    minCrimeRate: 0,
                    maxCrimeRate: 99,
                    minLevel: 0,
                    maxLevel: 99,
                    onlySales: false
                };

                this.applyPlotFilters();
            },

            async getAllowances() {
                const xyaOneContract = await new ethers.Contract(this.CONSTANTS.XYA_ONE, Freyala
                    .abi, this
                    .metaMaskWallet.signer);
                const xyaContract = await new ethers.Contract(this.CONSTANTS.XYA, Freyala
                    .abi, this
                    .metaMaskWallet.signer);

                this.allowances.plotHandler = await xyaContract.allowance(this
                    .metaMaskAccount, plot.address) > 0;

                this.allowances.xyaOne = await xyaOneContract.allowance(this.metaMaskAccount, plotEmitter.address) >
                    0;
                this.allowances.plotEmitter = await xyaOneContract.allowance(this
                    .metaMaskAccount, plotEmitter.address) > 0;

            },

            async setTokenAllowance(address, amount, token = this.CONSTANTS.XYA) {
                let actual = 0;
                if (amount > 0) {
                    actual = amount * 10 ** 18;
                } else {
                    actual = 0;
                }
                let toast = undefined;

                try {
                    const arg = fromExponential(actual);
                    let tempContract = new ethers.Contract(token, Freyala.abi, this.metaMaskWallet.signer);
                    const tx = await tempContract.approve(address, arg);
                    toast = this.createLoaderToast("Pending Transaction - Allowance");
                    await tx.wait(1);
                    this.$toast.success(amount > 0 ? "Contract enabled" : "Contract disabled");
                    await this.getAllowances();
                } catch (err) {
                    this.handleError(err);
                }
                this.$toast.dismiss(toast);
            },

            async withdrawUnlockedEmissions(isOldContract = false) {
                let toast = undefined;
                try {
                    if ((!isOldContract && this.unlockedEmissions <= 0) || (isOldContract && this
                            .unlockedOldEmissions <= 0)) {
                        this.handleError("Your treasury is empty");
                        return;
                    }
                    const tx = !isOldContract ? await this.plotEmitterContract.withdrawUnlockedEmitted() :
                        await this.plotEmitterOldContract.withdrawUnlockedEmitted();
                    await tx.wait(1);
                    toast = this.createLoaderToast("Pending - Withdraw Emissions");
                    
                    if(isOldContract) this.unlockedOldEmissions = 0;
                    this.unlockedEmissions = 0;
                } catch (err) {
                    this.handleError(err);
                }
                this.$toast.dismiss(toast);
            },

            async withdrawLimboNFTs(tokenAddress, tokenIds) {
                let toast = undefined;
                try {
                    let tokenAddresses = [];
                    for (let i = 0; i < tokenIds.length; i++) {
                        tokenAddresses.push(tokenAddress);
                    }
                    const tx = await this.plotInventoryContract.withdrawLimboAssetsForUser(this.metaMaskAccount,
                        tokenAddresses, tokenIds, {
                            gasPrice: 30000000000,
                            gasLimit: 3000000,
                        });
                    await tx.wait(1);
                    toast = this.createLoaderToast("Pending - Withdraw NFT's");
                    this.unlockedEmissions = 0;
                    await this.getLimboAssets();
                } catch (err) {
                    this.handleError(err);
                }
                this.$toast.dismiss(toast);
            },

            async getLimboAssets() {
                const limboAssets = await this.plotInventoryContract.checkAssetsInLimbo(this.metaMaskAccount);

                this.limboAssets.forEach((limbo) => {
                    limbo.userNFTs = [];
                    limbo.count = 0;
                });

                for (let i = 0; i < limboAssets.length; i++) {
                    const asset = this.limboAssets.filter(c => c.address.toLowerCase() === limboAssets[i]
                        .tokenAddress
                        .toLowerCase())[0];
                    if (!asset) continue;

                    asset.count++;
                    asset.userNFTs.push(limboAssets[i].tokenId * 1);
                }

                this.limboAssets = this.limboAssets.filter(c => c.count > 0);
                this.keys.limboAssets++;
            },

            async getMyPlots() {
                const type0Ids = [];
                const type1Ids = [];
                const type2Ids = [];
                const clogThreshold = await this.plotEmitterContract.maxAllowedToEmitUntilClog() / 10 ** 18;

                let [type0, type1, type2] = await Promise.all([
                    this.plotContract.getTokensOwnedByOwner(0, this.metaMaskAccount),
                    this.plotContract.getTokensOwnedByOwner(1, this.metaMaskAccount),
                    this.plotContract.getTokensOwnedByOwner(2, this.metaMaskAccount)
                ]);

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

                let plotData = [...plot0Data, ...plot1Data, ...plot2Data];
                let tempPlotData = [];
                let plotPromises = [];

                plotData.forEach(async (plot) => {
                    plotPromises.push(new Promise(async (resolve, reject) => {
                        let singlePlotData = {
                            resetCost: plot.resetCost,
                            crimeRateBase: plot.crimeRateBase,
                            fertilityBase: plot.fertilityBase,
                            levelBase: plot.levelBase,

                            level: plot.level,
                            fertility: plot.fertility,
                            crimeRate: plot.crimeRate,
                            soilType: plot.soilTypeBase,

                            neighbourhood: plot.neighbourhood * 1,
                            token_id: plot.plotId * 1,
                            plot_number: plot.plotNumber,
                            plot_type: plot.neighbourhood >= 18 ? 1 : plot
                                .neighbourhood >= 16 ? 2 : 0,
                            ownerOf: true,
                            plotOwner: this.metaMaskAccount,
                            isFiltered: true,
                            isEmitting: false,
                            emissions: 0,
                            isClogged: false
                        }

                        singlePlotData.isEmitting = await this.plotEmitterContract
                            .isEmitting(singlePlotData.plot_type, singlePlotData
                                .token_id * 1);
                        singlePlotData.emissions = (await this.plotEmitterContract
                            .calculateClaimableEmissions(singlePlotData.plot_type,
                                singlePlotData.token_id * 1) / 10 ** 18).toFixed(2);
                        singlePlotData.isClogged = singlePlotData.emissions >=
                            clogThreshold;
                        tempPlotData.push(singlePlotData);
                        resolve();
                    }));
                });

                await Promise.all(plotPromises).then(() => {
                    this.userPlots = tempPlotData.sort((a, b) => {
                        return a.neighbourhood - b.neighbourhood
                    });
                })

                this.loadingMyPlots = false;
            },

            async getPlots() {
                this.plotIds = [];
                this.plotData = [];

                plotSnapshot.plots.forEach((plot) => {
                    if (this.neighbourhood === plot.neighbourhood) {
                        this.plotIds.push(plot.token_id)
                    }
                });

                this.plotType = this.neighbourhood < 16 ? 0 : this.neighbourhood < 18 ? 2 : 1;

                let [plotData] = await Promise.all([
                    this.plotContract.getPlotDataMultiple(this.plotType, this.plotIds),
                ]);

                let tempPlotData = []
                const plotPromises = [];

                plotData.forEach(async (plot) => {
                    plotPromises.push(new Promise(async (resolve, reject) => {
                        let singlePlotData = {
                            resetCost: plot.resetCost,
                            crimeRateBase: plot.crimeRateBase,
                            fertilityBase: plot.fertilityBase,
                            levelBase: plot.levelBase,

                            level: plot.level,
                            fertility: plot.fertility,
                            crimeRate: plot.crimeRate,
                            soilType: plot.soilTypeBase,

                            neighbourhood: plot.neighbourhood,
                            token_id: plot.plotId,
                            plot_number: plot.plotNumber,
                            plot_type: plot.neighbourhood >= 18 ? 1 : plot
                                .neighbourhood >= 16 ? 2 : 0,
                            plotOwner: plot.plotOwner,
                            ownerOf: false,
                            isFiltered: true
                        }

                        singlePlotData.plotOwner = await this.plotContracts[
                            singlePlotData.plot_type ===
                            0 ? 'xya' : singlePlotData.plot_type === 1 ? 'yin' :
                            'yang'].ownerOf(plot.plotId);

                        if (singlePlotData.plotOwner.toLowerCase() === this
                            .metaMaskAccount.toLowerCase()) {
                            singlePlotData.ownerOf = true;
                        }

                        tempPlotData.push(singlePlotData);
                        resolve();
                    }));
                });

                await Promise.all(plotPromises).then(() => {
                    this.plotData = tempPlotData.sort((a, b) => {
                        return a.plot_number - b.plot_number
                    })
                })
            },

            async sendPlotNow(address, id, neighbourhood) {
                let toast = undefined;
                try {
                    const contract = neighbourhood >= 18 ? 'yin' : neighbourhood >= 16 ? 'yang' : 'xya';
                    const tx = await this.plotContracts[contract].transferFrom(this.metaMaskAccount, address, id);
                    toast = this.createLoaderToast("Pending - Sending Plot");
                    this.$modal.hide("sendplot");
                    this.currentPlot = {
                        tokenId: -1
                    };
                    this.showPlotDetails = false;
                    await tx.wait(1);
                    await this.getMyPlots();
                    await this.getLimboAssets();
                } catch (err) {
                    this.handleError(err);
                }
                this.$toast.dismiss(toast);
            },

            async claimAllPlotsEmissions() {
                let toast = undefined;
                try {
                    let plotTypes = [],
                        plotIds = [];

                    toast = this.createLoaderToast("Pending - Collect All Emissions");
                    for (let i = 0; i < this.userPlots.length; i++) {
                        plotTypes.push(this.userPlots[i].plot_type);
                        plotIds.push(this.userPlots[i].token_id);
                    }

                    const tx = await this.plotEmitterContract.claimAll(plotTypes, plotIds, {
                        gasPrice: 30000000000,
                        gasLimit: 3000000,
                    });

                    await tx.wait(1);

                } catch (err) {
                    this.handleError(err);
                }
                this.$toast.dismiss(toast);
            },

            openPlot(plot) {
                this.currentPlot = plot;

                if (this.isPanzoom) return;
                this.showPlotDetails = true;
            },

            manageAllowanceError(error) {
                this.$modal.show('allowances');
                this.handleError(error);
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
    .plot-owner {
        border: 6px solid rgba(255, 255, 255, 90%);
        border-radius: 3px;
    }

    .slide-in-enter-active,
    .slide-in-leave-active {
        right: -0.5rem;
        opacity: 1;
    }

    .slide-in-enter,
    .slide-in-leave-to {
        opacity: 0.0;
        right: 1000px;
    }
</style>