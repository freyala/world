<template>
    <div style="width: 100vw; min-height:100vh; height: 100vh; background-color: #222222; z-index: 999"
        class="flex flex-row w-full h-full relative">
        <div class='absolute flex flex-row h-16 w-full top-0'
            style="z-index: 1000;background-color: #222222; box-shadow: 0px 8px 8px rgba(0,0,0,0.2);">
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
            <div class='mt-3 w-full text-center text-4xl font-bold'>
                <p v-if='!showPlotDetails' class='ml-36'>Plots of Land</p>
                <p v-else class='ml-36'>Plot #{{currentPlot.token_id}}</p>
            </div>
        </div>
        <div class='h-2/10 flex flex-col py-4 px-4 relative mt-16'
            style="border-right: 1px solid #363636; width: 400px; z-index: 9000">
            <p v-if='!showPlotDetails' class="p-1 text-xl mb-1 text-white opacity-80">
                Neighbourhood
            </p>
            <div v-if='!showPlotDetails' class="w-full rounded-xl p-4 mb-4 dark-panel">
                <select class="p-1 bg-dark border border-bbrown rounded-xl cursor-pointer xya-input text-lg"
                    style='width: 100%' name="neighbourhood" id="neighbourhood-select" v-model="neighbourhood">
                    <option v-for="(n, index) in allNeighbourhoods" :value="index" :key='index'>{{ n }}</option>
                </select>
            </div>
            <p v-if='!showPlotDetails' class="p-1 text-xl mb-1 text-white opacity-80">
                Filter
            </p>
            <div v-if='!showPlotDetails' class="w-full rounded-xl p-4 mb-4 text-white dark-panel">
                <div class='flex flex-row mb-4 w-full'>
                    <div class='checkbox checked mr-3'></div>
                    <p class='mb-2'>
                        On Sale
                    </p>
                </div>
                <hr class='my-4' style='color: rgba(0,0,0,0.5);' />
                <div class='flex flex-row w-full mb-2'>
                    <p class='text-xl'>
                        Fertility
                    </p>
                </div>
                <div class='flex flex-row w-full mb-4'>
                    <div class='w-5/10 flex flex-row'>
                        <span class='opacity-60'>Min.</span> <input class='w-5/10 ml-4 xya-input' type='number' />
                    </div>
                    <div class='w-5/10 flex flex-row'>
                        <span class='opacity-60'>Max.</span> <input class='w-5/10 ml-4 xya-input' type='number' />
                    </div>
                </div>
                <div class='flex flex-row w-full mb-2'>
                    <p class='text-xl'>
                        Crime Rate
                    </p>
                </div>
                <div class='flex flex-row w-full mb-4'>
                    <div class='w-5/10 flex flex-row'>
                        <span class='opacity-60'>Min.</span> <input class='w-5/10 ml-4 xya-input' type='number' />
                    </div>
                    <div class='w-5/10 flex flex-row'>
                        <span class='opacity-60'>Max.</span> <input class='w-5/10 ml-4 xya-input' type='number' />
                    </div>
                </div>
                <div class='flex flex-row w-full mb-2'>
                    <p class='text-xl'>
                        Level
                    </p>
                </div>
                <div class='flex flex-row w-full mb-4'>
                    <div class='w-5/10 flex flex-row'>
                        <span class='opacity-60'>Min.</span> <input class='w-5/10 ml-4 xya-input' type='number' />
                    </div>
                    <div class='w-5/10 flex flex-row'>
                        <span class='opacity-60'>Max.</span> <input class='w-5/10 ml-4 xya-input' type='number' />
                    </div>
                </div>
            </div>
            <p class="p-1 text-xl mb-1 text-white opacity-80">
                Your Plots
            </p>
            <div class="w-full rounded-xl p-4 mb-4 dark-panel">
                <div v-for='(neighbourhood, index) in myNeighbourhoods' :key='index'>
                    <p class="p-1 text-lg mb-1 text-white opacity-80">
                        {{neighbourhood}}
                    </p>
                    <p v-on:click='openPlot(plot)' v-for='plot in getUserPlotsByNeighbourhood(neighbourhood)'
                        :key='plot.token_id' class='ml-2 text-lg mb-1 cursor-pointer'>
                        <i class='fa fa-map mr-4'></i>Plot #{{plot.token_id}}
                    </p>
                </div>
            </div>
        </div>
        <div class='w-8/10 h-full relative overflow-hidden z-5 mt-16'>
            <div id='plots' class='relative' :style='"height:" + parseInt(plotData.length / 10) * 220 + "px"'
                style='width: 2200px;'>
                <div v-on:click='openPlot(plot)' v-for="(plot, index) in plotData" :key='index' class="absolute"
                    style='width: 220px; height: 220px'
                    :style="'top: ' + (parseInt(index / 10) * 220) + 'px; left: ' + ((index % 10) * 220) + 'px'">
                    <img class="w-full h-full" src="/images/plots/base/0.png" alt="Base land">
                    <img class="absolute top-0 left-0 w-full h-full"
                        :src="`/images/plots/soil_type/${plot.soilType}.png`" alt="Soil Type">
                    <img class="absolute top-0 left-0 w-full h-full"
                        :src="`/images/plots/level/${plot.level}.png`" alt="Level">
                    <img class="absolute top-0 left-0 w-full h-full"
                        :src="`/images/plots/fertility/${plot.fertility}.png`" alt="Fertility">
                    <img class="absolute top-0 left-0 w-full h-full"
                        :src="`/images/plots/crime/${plot.crimeRate}.png`" alt="Crime">

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
                                F: {{ plot.fertility }}
                            </small>

                            <small>
                                L: {{ plot.level}}
                            </small>

                            <small>
                                C: {{ plot.crime_rate }}
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
            <PlotDetails v-if='showPlotDetails' v-on:close="showPlotDetails = false" class='fixed top-16'
                style='z-index: 500; transition: all 0.25s;' :plot='currentPlot'>

            </PlotDetails>
        </transition>
    </div>
</template>

<script>
    import fromExponential from "from-exponential";

    import wallet from "../../plugins/wallet"
    import plot from "../../plugins/artifacts/plothandler.json"
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
                plotsMounted: false,
                neighbourhood: 0,
                plotData: [],
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

                // emission data
                fertilityReq: 0,
                levelReq: 0,
                crimeRateReq: 0,

                emissionsLeft: 0,
                emissionsRate: 0,
                currentTotalEmittingPlots: 0,
                costToEmit: 0,

                showPlotDetails: false,
                plotsInitialX: 0,
                plotsInitialY: 0,
                plotsInitialZoom: 1.75,

                currentPlot: undefined,
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
            ])

            this.plotContract = new ethers.Contract(plot.address, plot.abi, this.metaMaskWallet.signer);

            await this.getPlots()
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

           // await this.getMyPlots();


            //window.addEventListener("resize", this.editPanZoom);
        },
        methods: {
            getUserPlotsByNeighbourhood(neighbourhood) {
                for (let i = 0; i < this.allNeighbourhoods.length; i++) {
                    if (this.allNeighbourhoods[i] === neighbourhood) {
                        return this.userPlots.filter(c => c.neighbourhood === i);
                    }
                }
                return [];
            },
            async getMyPlots() {
                const type0Ids = []
                const type1Ids = []
                const type2Ids = []

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

                let plotData = [...plot0Data, ...plot1Data, ...plot2Data];
                let tempPlotData = []

                const plotPromise = plotData.map(async (plot) => {
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

                    const sales = await this.marketContracts[singlePlotData.plot_type === 0 ? 'xya' :
                        singlePlotData.plot_type === 1 ? 'yin' : 'yang'].getListing(plot.ID)

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

                        singlePlotData.plotOwner = await this.plotContracts[singlePlotData.plot_type ===
                            0 ? 'xya' : singlePlotData.plot_type === 1 ? 'yin' : 'yang'].ownerOf(
                            plot.ID)
                    }

                    tempPlotData.push(singlePlotData)
                })

                await Promise.all(plotPromise).then(() => {
                    this.userPlots = tempPlotData.sort((a, b) => {
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
                            plotOwner: '',
                            ownerOf: false
                        }

                        if (plot.neighbourhood === 18 || plot.neighbourhood === 19) {
                            singlePlotData.plot_type = 1
                        } else if (plot.neighbourhood === 16 || plot.neighbourhood ===
                            17) {
                            singlePlotData.plot_type = 2
                        } else {
                            singlePlotData.plot_type = 0
                        }

                        const sales = await this.marketContracts[singlePlotData
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

                            singlePlotData.plotOwner = await this.plotContracts[
                                singlePlotData.plot_type ===
                                0 ? 'xya' : singlePlotData.plot_type === 1 ? 'yin' :
                                'yang'].ownerOf(
                                plot.plotId)
                        }

                        for (let i = 0; i < plotOwner.length; i++) {
                            if (ethers.BigNumber.from(plotOwner[i]._hex).toString() ===
                                plot.plotId
                                .toString()) {
                                singlePlotData.ownerOf = true
                            }
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
        background-color: rgba(255, 255, 255, 0.1);
        border-radius: 4px;
        border: 1px solid #000000aa;
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