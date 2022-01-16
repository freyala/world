<template>
    <div style="width: 100vw; min-height:100vh; height: 100vh; background-color: #222222; z-index: 999"
        class="flex flex-row w-full h-full relative">
        <div class='absolute flex flex-row h-16 w-full top-0'
            style="z-index: 1000; border-bottom: 1px solid #363636; background-color: #282828; box-shadow: 0px 8px 8px rgba(0,0,0,0.15);">
            <div class='ml-6 mt-5 mb-4 text-xl cursor-pointer absolute'>
                <i class='fa fa-arrow-left'>

                </i>
                <span v-if='!showPlotDetails'>
                    Back
                </span>
                <span v-on:click='showPlotDetails = false' v-else>
                    Back to plots
                </span>
            </div>
            <div class='mt-3 w-full text-center text-3xl font-bold'>
                <p v-if='!showPlotDetails' class='ml-36'>Plots of Land</p>
                <p v-else class='ml-36'>Plot #{{currentPlot.token_id}}</p>
            </div>
        </div>
        <div class='lg:relative absolute 2xl:w-1/5 xl:w-3/12 lg:w-4/12 w-6/12 xl:h-2/10 h-full flex flex-row py-4 px-4 pt-16 overflow-y-auto overflow-x-hidden'
            style="border-right: 1px solid #363636; z-index: 0; background-color: #282828; box-shadow: 8px 0px 8px rgba(0,0,0,0.15); transition: all 0.15s linear">
        

            <div class='w-full h-full flex flex-col relative'>

                <p v-if='!showPlotDetails' class="p-1 xl:text-xl text-lg mt-4 mb-1 text-white opacity-80">
                    Neighbourhood
                </p>
                <div v-if='!showPlotDetails' class="w-full rounded-xl p-4 mb-4 dark-panel">
                    <select class="p-1 rounded-xl cursor-pointer xya-input text-white xl:text-lg text-sm"
                        style='width: 100%' name="neighbourhood" id="neighbourhood-select" v-model="neighbourhood">
                        <option v-for="(n, index) in allNeighbourhoods" :value="index" :key='index'>{{ n }}</option>
                    </select>
                </div>
                <p v-if='!showPlotDetails' class="p-1 xl:text-xl text-lg mb-1 text-white opacity-80">
                    Filter
                </p>
                <div v-if='!showPlotDetails' class="w-full rounded-xl px-6 py-6 mb-4 text-white dark-panel">
                    <div class='flex flex-row mb-4 w-full'>
                        <div v-bind:class='{"checked": filters.onlySales}' v-on:click='applySaleFilters()'
                            class='checkbox mr-3 cursor-pointer'></div>
                        <p class='mb-2 xl:text-lg text-sm'>
                            On Sale
                        </p>
                    </div>
                    <hr class='my-4' style='color: rgba(0,0,0,0.5);' />
                    <div class='flex flex-row w-full mb-2'>
                        <p class='xl:text-lg text-sm'>
                            Fertility
                        </p>
                    </div>
                    <div class='flex flex-row w-full mb-4'>
                        <div class='w-5/10 flex flex-row items-center'>
                            <span class='opacity-60 xl:text-base text-xs'>Min.</span> <input
                                v-model='filters.minFertility' class='w-5/10 ml-4 px-2 xya-input' type='number' />
                        </div>
                        <div class='w-5/10 flex flex-row items-center'>
                            <span class='opacity-60 xl:text-base text-xs'>Max.</span> <input
                                v-model='filters.maxFertility' class='w-5/10 ml-auto px-2 xya-input' type='number' />
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
                                v-model='filters.minCrimeRate' class='w-5/10 ml-4 px-2 xya-input' type='number' />
                        </div>
                        <div class='w-5/10 flex flex-row items-center'>
                            <span class='opacity-60 xl:text-base text-xs'>Max.</span> <input
                                v-model='filters.maxCrimeRate' class='w-5/10 ml-auto px-2 xya-input' type='number' />
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
                                class='w-5/10 ml-4 px-2 xya-input' type='number' />
                        </div>
                        <div class='w-5/10 flex flex-row items-center'>
                            <span class='opacity-60 xl:text-base text-xs'>Max.</span> <input v-model='filters.maxLevel'
                                class='w-5/10 ml-auto px-2 xya-input' type='number' />
                        </div>
                    </div>
                    <div class='flex flex-row w-full text-center justify-center xl:mb-4 mb-0'>
                        <p v-on:click='resetPlotFilters()'
                            class='w-5/10 flex items-center xl:text-base text-sm text-yellow hover:text-white cursor-pointer justify-center mr-4'>
                            Reset Filters</p>
                        <p v-on:click='applyPlotFilters()' class='xya-btn2 w-5/10 xl:text-base text-sm'>Apply Filter</p>
                    </div>
                </div>
                <p class="p-1 xl:text-xl text-lg mb-1 text-white opacity-80" v-bind:class='{"mt-4": showPlotDetails}'>
                    Your Plots
                </p>
                <div class="w-full rounded-xl p-4 mb-4 dark-panel">
                    <p v-if='userPlots.length === 0' class="p-1 xl:text-lg text-sm opacity-80">
                        You don't own any plots.
                    </p>
                    <div v-for='(neighbourhood, index) in myNeighbourhoods' :key='index'>
                        <p class="p-1 xl:text-lg text-sm mb-1 text-white opacity-80">
                            {{neighbourhood}}
                        </p>
                        <p v-on:click='openPlot(plot)' v-for='plot in getUserPlotsByNeighbourhood(neighbourhood)'
                            :key='plot.token_id * 1' class='ml-2 xl:text-lg text-sm mb-1 cursor-pointer'>
                            <i class='fa fa-map mr-4'></i>Plot #{{plot.token_id}}
                        </p>
                    </div>
                </div>
            </div>

        </div>
        <div class='2xl:w-4/5 xl:w-9/12 lg:w-8/12 h-full relative overflow-hidden mt-16'>
            <div id='plots' class='relative' :style='"height:" + parseInt(plotData.length / 10 + 1) * 225 + "px"'
                style='width: 2200px;'>
                <div v-on:click='openPlot(plot)' v-for="(plot, index) in plotData" :key='plot.plotId' class="absolute"
                    style='width: 220px; height: 220px'
                    :style="'top: ' + (parseInt(index / 10) * 220) + 'px; left: ' + ((index % 10) * 220) + 'px'">
                    <div v-if='!plot.isFiltered' class='z-50 absolute top-0 right-0 bottom-0 left-0 bg-dark opacity-50'>

                    </div>
                    <img class="w-full h-full" src="/images/plots/base/0.png" alt="Base land">
                    <img class="absolute top-0 left-0 w-full h-full"
                        :src="`/images/plots/soil_type/${plot.soilType}.png`" alt="Soil Type">
                    <img class="absolute top-0 left-0 w-full h-full" :src="`/images/plots/level/${plot.level}.png`"
                        alt="Level">
                    <img class="absolute top-0 left-0 w-full h-full"
                        :src="`/images/plots/fertility/${plot.fertility}.png`" alt="Fertility">
                    <img class="absolute top-0 left-0 w-full h-full" :src="`/images/plots/crime/${plot.crimeRate}.png`"
                        alt="Crime">

                    <div class="opacity-50 absolute top-0 left-0 text-white p-2 cursor-pointer w-full h-full"
                        style="line-height: 0.75;pointer-events: none;">

                        <div class="absolute top-0 pt-2">
                            <small>
                                {{ allNeighbourhoods[plot.neighbourhood] }}
                            </small>
                        </div>

                        <div class="absolute bottom-0 pb-2">
                            <small>
                                Soil: {{ soilTypes[plot.soilType] }}
                            </small>
                            <br>
                            <small>
                                F: {{ plot.fertility }}
                            </small>

                            <small>
                                L: {{ plot.level}}
                            </small>

                            <small>
                                C: {{ plot.crimeRate }}
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
                        <div @click="buyPlot(plot)" class="m-auto text-center"
                            v-else-if="plot.sales && plot.sales.forSale && (plot.sales.seller === plot.plotOwner)">
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
            </div>
        </div>

        <transition name='slide-in'>
            <PlotDetails v-if='showPlotDetails' :contract='plotContract' :plotEmitterContract='plotEmitterContract'
                v-on:close="showPlotDetails = false" class='fixed top-16' style='z-index: 500; transition: all 0.25s;'
                :plot='currentPlot'>

            </PlotDetails>
        </transition>
    </div>
</template>

<script>
    import fromExponential from "from-exponential";

    import wallet from "../../plugins/wallet"
    import plot from "../../plugins/artifacts/plothandler.json"
    import plotEmitter from "../../plugins/artifacts/plotEmitter.json"

    import {
        ethers
    } from "ethers"
    import {
        mapGetters
    } from "vuex"
    import plotSnapshot from "../../plugins/snapshots/plots.json"

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
            PlotDetails
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

                showPlotDetails: false,
                plotsInitialX: 0,
                plotsInitialY: 0,
                plotsInitialZoom: 1.75,

                currentPlot: undefined,

                filters: {
                    minFertility: 0,
                    maxFertility: 99,
                    minCrimeRate: 0,
                    maxCrimeRate: 99,
                    minLevel: 0,
                    maxLevel: 99,
                    onlySales: false
                },

                constants: {
                    MAX_PLOTS_QUERY: 45
                },

                showSideBar: false
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

            this.plotEmitterContract = await new ethers.Contract(plotEmitter.address, plotEmitter.abi, this
                .metaMaskWallet.signer);
            this.plotContract = await new ethers.Contract(plot.address, plot.abi, this.metaMaskWallet.signer);

            await this.getPlots();
            this.plotsMounted = true;


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

            setTimeout(() => {
                panzoom.pan(this.plotsInitialX, this.plotsInitialY);
            });

            setTimeout(() => {
                panzoom.zoom(this.plotsInitialZoom);
            }, 5);

            await this.getMyPlots();


            //window.addEventListener("resize", this.editPanZoom);
        },

        methods: {
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

                let filteredPlotData = this.plotData.filter(c => fertilityFilter(c.fertility) && crimeRateFilter(c
                    .crimeRate) && levelFilter(c.level) && (c.price > 0 || !this.filters.onlySales));

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

            async setTokenAllowance(amount) {
                let actual = 0;
                if (amount > 0) {
                    actual = amount * 10 ** 18;
                } else {
                    actual = 0;
                }
                try {
                    const arg = fromExponential(actual);
                    let tempContract = new ethers.Contract("0xc963cb270b96d8d34f5d31aab36bc1a33b3caba2", Freyala
                        .abi, this
                        .metaMaskWallet.signer);
                    const tx = await tempContract.approve(
                        this.contract.address,
                        arg
                    );

                    await tx.wait(1);
                    this.$toast.success(`${token.key} ${amount > 0 ? 'approved' : 'disabled'}`);
                } catch (err) {
                    console.error(err);
                    // this.handleError(err);
                }
            },

            async getMyPlots() {
                const type0Ids = []
                const type1Ids = []
                const type2Ids = []

                let [type0, type1, type2] = await Promise.all([
                    this.plotContract.getTokensOwnedByOwner(0, this.metaMaskAccount),
                    //this.plotContract.getTokensOwnedByOwner(1, this.metaMaskAccount),
                    //this.plotContract.getTokensOwnedByOwner(2, this.metaMaskAccount)
                ]);

                for (let i = 0; i < type0.length; i++) {
                    type0Ids.push(ethers.BigNumber.from(type0[i]._hex).toString())
                }

                /*
                for (let i = 0; i < type1.length; i++) {
                    //type1Ids.push(ethers.BigNumber.from(type1[i]._hex).toString())
                }

                for (let i = 0; i < type2.length; i++) {
                    //type2Ids.push(ethers.BigNumber.from(type2[i]._hex).toString())
                }
                */

                let [plot0Data, plot1Data, plot2Data] = await Promise.all([
                    this.plotContract.getPlotDataMultiple(0, type0Ids),
                    // this.plotContract.getPlotDataMultiple(1, type1Ids),
                    // this.plotContract.getPlotDataMultiple(2, type2Ids)
                ])

                let plotData = [...plot0Data];
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
                            token_id: plot.plotId,
                            plot_number: plot.plotNumber,
                            plot_type: 0,
                            plotOwner: plot.plotOwner,
                            ownerOf: false,
                            isFiltered: true
                        }

                        if (plot.neighbourhood === 18 || plot.neighbourhood === 19) {
                            singlePlotData.plot_type = 1
                        } else if (plot.neighbourhood === 16 || plot.neighbourhood ===
                            17) {
                            singlePlotData.plot_type = 2
                        } else {
                            singlePlotData.plot_type = 0
                        }

                        /*const sales = await this.marketContracts[singlePlotData
                                .plot_type === 0 ? 'xya' :
                                singlePlotData.plot_type === 1 ? 'yin' : 'yang']
                            .getListing(plot.plotId);

                        singlePlotData.sales = {
                            seller: 0,
                            buyer: 0,
                            tokenId: plot.plotId,
                            price: 0,
                            forSale: false,
                        }

                        if (sales[4]) {
                            singlePlotData.sales.seller = sales[0];
                            singlePlotData.sales.buyer = sales[1];
                            singlePlotData.sales.price = ethers.BigNumber.from(sales[3])
                                .toString();
                            singlePlotData.sales.forSale = sales[4]

                            singlePlotData.plotOwner = await this.plotContracts[
                                singlePlotData.plot_type ===
                                0 ? 'xya' : singlePlotData.plot_type === 1 ? 'yin' :
                                'yang'].ownerOf(
                                plot.plotId)
                        }*/

                        tempPlotData.push(singlePlotData);
                        resolve();
                    }));
                });

                await Promise.all(plotPromises).then(() => {
                    console.log(plotPromises);
                    this.userPlots = tempPlotData.sort((a, b) => {
                        return a.neighbourhood - b.neighbourhood
                    });
                })
            },

            async getPlots() {
                this.plotIds = [];
                this.plotData = [];

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
                            plot_type: 0,
                            plotOwner: plot.plotOwner,
                            ownerOf: false,
                            isFiltered: true
                        }

                        if (plot.neighbourhood === 18 || plot.neighbourhood === 19) {
                            singlePlotData.plot_type = 1
                        } else if (plot.neighbourhood === 16 || plot.neighbourhood ===
                            17) {
                            singlePlotData.plot_type = 2
                        } else {
                            singlePlotData.plot_type = 0
                        }

                        /* const sales = await this.marketContracts[singlePlotData
                                 .plot_type === 0 ? 'xya' :
                                 singlePlotData.plot_type === 1 ? 'yin' : 'yang']
                             .getListing(plot.plotId);

                         singlePlotData.sales = {
                             seller: 0,
                             buyer: 0,
                             tokenId: plot.plotId,
                             price: 0,
                             forSale: false,
                         }

                         if (sales[4]) {
                             singlePlotData.sales.seller = sales[0]
                             singlePlotData.sales.buyer = sales[1]
                             singlePlotData.sales.price = ethers.BigNumber.from(sales[3])
                                 .toString()
                             singlePlotData.sales.forSale = sales[4]
                         }

                         singlePlotData.plotOwner = await this.plotContracts[
                             singlePlotData.plot_type ===
                             0 ? 'xya' : singlePlotData.plot_type === 1 ? 'yin' :
                             'yang'].ownerOf(plot.plotId);*/

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

            async getEmissionsData() {
                const emissionsRate = await this.plotContracts.xyaEmitter.emissionRate();
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
                    this.plotYinFreyalaContract = new ethers.Contract(PlotsYin.address, PlotsYin.abi, this
                        .metaMaskWallet.signer)
                    const approve = await this.plotYinFreyalaContract.approve(PlotsYinMarket.address, id)
                    await approve.wait(1)
                    this.loadingApproveSellPlot = false
                } else if (neighbourhood === 16 || neighbourhood === 17) {
                    this.loadingApproveSellPlot = true
                    this.plotYangFreyalaContract = new ethers.Contract(PlotsYang.address, PlotsYang.abi, this
                        .metaMaskWallet.signer)
                    const approve = await this.plotYangFreyalaContract.approve(PlotsYangMarket.address, id)
                    await approve.wait(1)
                    this.loadingApproveSellPlot = false
                } else {
                    this.loadingApproveSellPlot = true
                    this.plotContracts.xya = new ethers.Contract(PlotsFreyala.address, PlotsFreyala.abi, this
                        .metaMaskWallet.signer)
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
                    this.mainContract = new ethers.Contract(Freyala.address, Freyala.abi, this.metaMaskWallet
                        .signer)
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

            openPlot(plot) {
                this.showPlotDetails = true;
                this.currentPlot = plot;
            }
        }
    }
</script>


<style>
    .checkbox {
        height: 24px;
        width: 24px;
        border-radius: 4px;
        border: 1px solid #54B67A;
        position: relative;
    }

    .checkbox.checked::before {
        position: absolute;
        content: "";
        width: 16px;
        height: 16px;
        top: 3px;
        left: 3px;
        border-radius: 2px;
        background-color: #54B67A;
    }

    .xya-input {
        background-color: #222222;
        border-radius: 4px;
        border: 1px solid #191919;
    }

    .xya-input:focus {
        outline: 0 !important;
        border-radius: 4px;
        border: 1px solid #54b67a7c;
    }

    .dark-panel {
        background-color: #262626;
        border: 1px solid #363636;
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