<template>
    <div class='h-full 2xl:w-4/5 xl:w-9/12 lg:w-8/12 w-full bg-dark overflow-x-hidden overflow-y-auto pb-28'
        style='background-color: #222222; right: 0'>
        <!--PLOT HEADER-->
        <div class='2xl:w-8/10 w-full flex 2xl:px-12 2xl:h-3/6 h-2/6 px-14 mx-auto mt-16'>
            <!--PLOT-->
            <div class='relative w-5/10 h-full mr-6'>
                <img class="w-full h-full rounded-xl" src="/images/plots/base/0.png" alt="Base land">
                <img class="absolute top-0 left-0 w-full h-full rounded-xl"
                    :src="`/images/plots/soil_type/${plot.soilType}.png`" alt="Soil Type">
                <img class="absolute top-0 left-0 w-full h-full rounded-xl"
                    :src="`/images/plots/level/${plot.level}.png`" alt="Level">
                <img class="absolute top-0 left-0 w-full h-full rounded-xl"
                    :src="`/images/plots/fertility/${plot.fertility}.png`" alt="Fertility">
                <img class="absolute top-0 left-0 w-full h-full rounded-xl"
                    :src="`/images/plots/crime/${plot.crimeRate}.png`" alt="Crime">
            </div>

            <!--PLOT ATTRIBUTES-->
            <div class='w-6/10 ml-6 h-full rounded-xl xl:py-6 py-3 xl:px-10 px-5 mb-12 dark-panel flex flex-col items-center'>
                <h2 class='xl:text-3xl text-xl w-full mb-2'>Plot #{{ plot.token_id }}</h2>
                <p class='text-white w-full xl:text-sm text-xs opacity-30 mb-2'>
                    Owned by {{ getPlotOwner(plot.plotOwner)}}
                </p>
                <div class='w-full flex flex-row mt-2'>
                    <p class='text-white w-8/10 text-lg opacity-80 mb-2'>
                        Soil
                    </p>
                    <p class='text-lg w-2/10 text-right mb-2'>
                        Loam
                    </p>
                </div>

                <div class='w-full flex flex-row mb-1'>
                    <p class='text-white w-8/10 text-lg opacity-80 mb-2'>
                        Fertility
                    </p>
                    <p class='text-lg w-2/10 text-right mb-2'>
                        {{ plotData.fertility }} <span class='ml-4 opacity-75'>(+
                            {{ plotData.fertility - plotData.fertilityBase }})</span>
                    </p>
                </div>

                <div class='w-full flex flex-row mb-1'>
                    <p class='text-white w-8/10 text-lg opacity-80 mb-2'>
                        Defense
                    </p>
                    <p class='text-lg w-2/10 text-right mb-2'>
                        {{ 1 }} <span class='ml-4 opacity-75'>(+{{ plotData.defence - 1 }})</span>
                    </p>
                </div>

                <div class='w-full flex flex-row mb-1'>
                    <p class='text-white w-8/10 text-lg opacity-80 mb-2'>
                        CRIME
                    </p>
                    <p class='text-lg w-2/10 text-right mb-6'>
                        {{ plotData.crimeRate }} <span
                            class='ml-4 opacity-75'>(+{{ plotData.crimeRate - plotData.crimeRateBase }})</span>
                    </p>
                </div>

                <hr class='my-2 w-full' style='color: #00000055' />

                <div class='w-full h-auto flex flex-row justify-start items-center mt-auto'>
                    <p class='text-white opacity-80 text-xl w-3/10'>
                        Level
                    </p>
                    <p class='text-3xl w-2/10'>
                        {{ plot.level }}
                    </p>
                    <p v-on:click='levelUpPlot(plot)' class='w-6/10 xya-btn2 ml-20 text-center'>
                        Level Up - {{ plotData.levelUpCost }} XYA
                    </p>
                </div>
            </div>
        </div>

        <!--PLOT EMITTER-->
        <div class='2xl:w-8/10 w-full 2xl:px-12 px-14 flex flex-col mx-auto h-auto mt-12'>
            <h2 class='w-full text-white text-3xl opacity-80 mb-4'>
                Excavator
            </h2>
            <div class='w-full h-full rounded-xl px-8 py-6 dark-panel'>
                <div v-if='!emitterStarted' class='w-full h-auto flex flex-row justify-start items-center mb-4'>
                    <p class='text-white text-2xl opacity-80  w-5/10'>
                        Excavator is deactivated
                    </p>
                    <p class='text-xl w-3/10'>

                    </p>
                    <p v-on:click='togglePlotEmitter(plot)' class='w-2/10 xya-btn2 text-center mx-10'>
                        Start
                    </p>
                </div>
                <div v-else class='w-full h-auto flex flex-row justify-start items-center mb-4'>
                    <p class='text-white text-2xl opacity-80  w-5/10'>
                        Excavator is running
                    </p>
                    <p class='text-xl w-3/10'>

                    </p>
                    <p v-on:click='togglePlotEmitter(plot)' class='w-2/10 xya-btn2 text-center mx-10'>
                        Stop
                    </p>
                </div>

                <hr class='mt-6 mb-8' style='color: #00000055' />

                <div class='w-full h-auto flex flex-row justify-start items-center mb-2'>
                    <p class='text-white text-xl opacity-80  w-3/10'>
                        Emission Rate
                    </p>
                    <p class='text-xl text-left w-3/10'>
                        {{emissionRate}} (+{{ emissionBonus }}) XYA / Hour
                    </p>
                    <div class='w-2/10 mx-4'></div>
                </div>
                <p class='text-white text-sm opacity-40 mb-2'>
                    ~ {{emissionPerDay}} XYA / Day
                </p>

                <div class='w-full h-auto flex flex-row justify-start items-center mb-2'>
                    <p class='text-white text-xl opacity-80 w-3/10'>
                        Treasury
                    </p>
                    <p class='text-xl text-left w-3/10'>
                        {{ plotData.treasury }} XYA
                    </p>
                    <div class='w-2/10'></div>
                </div>
                <p class='text-white text-sm opacity-40 mb-2'>
                    ~ {{plotTreasuryBonusPerDay}} XYA / Day
                </p>

                <div class='w-full h-auto flex flex-row justify-start items-center mb-2'>
                    <p class='text-white text-xl opacity-80 w-3/10'>
                        Emission Rate
                    </p>
                    <p class='text-xl text-left w-5/10'>
                        <span class='ml-3'>{{ emissions }} XYA</span>
                    </p>
                    <p class='w-2/10 ml-auto xya-btn2 text-center mr-8'>
                        Collect
                    </p>
                </div>

            </div>
        </div>

        <!--PLOT SLOTS-->
        <div class='2xl:w-8/10 w-full flex flex-col px-12 mx-auto h-auto mt-12'>
            <h2 class='w-full text-white text-3xl opacity-80 mb-4'>
                Plot Slots
            </h2>
            <div v-for='i in 3' :key='i' class='w-full h-full rounded-xl my-2 pr-12 pl-8 py-4 dark-panel'>
                <div class='w-full h-auto flex flex-row justify-start items-center'>
                    <div v-on:click='prepareSlotPickerModal(i)' class='plot-slot w-2/10 empty rounded-xl mr-12'>

                    </div>
                    <div class='w-7/10 h-full flex-col'>
                        <h2 class='text-white h-full text-xl opacity-80'>Slot {{i}}</h2>
                        <p class='text-white h-full opacity-30 text-sm'>Empty</p>
                    </div>
                    <div v-on:click='prepareSlotPickerModal(i)' class='w-2/10 text-center text-xl xya-btn2 h-full'>
                        Add NFT
                    </div>
                </div>
            </div>

        </div>

        <!--PLOT RAIDS-->
        <div class='2xl:w-8/10 w-full flex flex-col px-12 mx-auto h-auto mt-12'>
            <h2 class='w-full text-white text-3xl opacity-80 mb-4'>
                Plot Raids
            </h2>
            <div class='w-full h-full rounded-xl my-2 py-4 dark-panel'>
                <p class='text-white opacity-80 w-full text-center text-xl'>Coming soon...</p>
                <div v-if='false' class='w-full h-auto flex flex-col justify-start items-center'>
                    <div class='w-full h-1/10 flex flex-row justify-center text-center items-center'>
                        <p class='text-2xl text-white opacity-80 w-2/10'>
                            Attacker
                        </p>
                        <p class='text-2xl text-white opacity-80 w-6/10'>
                            Result
                        </p>
                        <p class='text-2xl text-white opacity-80 w-2/10'>
                            Profit
                        </p>
                    </div>
                    <hr class='my-6 w-9/10' style='color: #00000077' />
                    <div class='w-full h-1/10 flex flex-row justify-center text-center items-center'>
                        <p class='text-xl text-white opacity-80 w-2/10'>
                            0xs...124
                        </p>
                        <p class='text-xl w-6/10'>
                            DEFENDED
                        </p>
                        <p class='text-xl text-white opacity-80 w-2/10'>
                            No Xya Lost
                        </p>
                    </div>
                </div>
            </div>

        </div>

        <NFTPickerModal v-if='showSlotPickerModal' v-on:close='showSlotPickerModal = false' :slotNumber='slotIndex'>

        </NFTPickerModal>
    </div>
</template>

<script>
    import NFTPickerModal from './NFTPickerModal';
    import {
        mapGetters
    } from "vuex"

    export default {
        name: 'PlotDetails',
        props: {
            plot: {
                type: Object,
                default: ""
            },

            emitterContract: {
                type: Object,
                default: undefined
            },

            contract: {
                type: Object,
                default: undefined
            },

            plotEmitterContract: {
                type: Object,
                default: undefined
            }

        },

        computed: {
            ...mapGetters([
                'metaMaskAccount',
                'metaMaskWallet'
            ]),

            isPlotOwner(owner){
                return owner.toLowerCase() == this.metaMaskAccount.toLowerCase();
            }
        },

        components: {
            NFTPickerModal
        },

        data() {
            return {
                emissions: 0,
                emissionRate: 0,
                emissionBonus: 0,
                emissionPerDay: 0,
                emitterStarted: false,

                plotTreasury: 0,
                plotTreasuryBonusPerDay: 0,

                plotData: {},
                plotSlot1: undefined,
                plotSlot2: undefined,
                plotSlot3: undefined,

                raidHistory: [],

                showSlotPickerModal: false,
                slotIndex: 0,
            }
        },

        async mounted() {
            await this.getPlotData();
        },

        methods: {
            async getPlotData() {
                const plotData = await this.contract.getPlotData(this.plot.plot_type, this.plot.token_id * 1);
                this.plotData = {
                    crimeRate: plotData.crimeRate * 1,
                    crimeRateBase: plotData.crimeRateBase * 1,
                    defence: plotData.defence * 1,
                    fertility: plotData.fertility * 1,
                    fertilityBase: plotData.fertilityBase * 1,
                    level: plotData.level * 1,
                    plotId: plotData.plotId * 1,
                    soilType: plotData.soilTypeBase * 1,
                    levelUpCost: plotData.levelUpCost / 10 ** 18,
                    treasury: plotData.amountOwnedByPlot / 10 ** 18
                };

                this.emitterStarted = await this.plotEmitterContract.isEmitting(this.plot.plot_type, this.plot
                    .token_id * 1);;
            },

            async levelUpPlot(plot) {
                try {
                    const tx = await this.contract.levelUpPlot(plot.plot_type, plot.token_id * 1, this
                        .plotData.level);
                    await tx.wait(1);
                    await this.getPlotData(plot);
                } catch (err) {

                }
            },

            async togglePlotEmitter(plot) {
                try {
                    const isEmitting = await this.plotEmitterContract.isEmitting(plot.plot_type, plot.token_id * 1);
                    console.log(isEmitting);
                    const tx = !isEmitting ?
                        await this.plotEmitterContract.startEmissions(plot.plot_type, plot.token_id * 1, {
                            gasPrice: 200000000000,
                            gasLimit: 2000000,
                        }) :
                        await this.plotEmitterContract.stopEmissions(plot.plot_type, plot.token_id * 1);
                    await tx.wait(1);
                    await this.getPlotData(plot);
                } catch (err) {
                    console.log(err);
                }
            },

            getPlotOwner(owner) {
                if (!owner || owner.length < 10) return "Couldn't load owner.";
                return owner.substring(0, 5) + "..." + owner.substring(owner.length - 5, owner.length);
            },

            prepareSlotPickerModal(slot) {
                this.slotIndex = slot;
                this.showSlotPickerModal = true;
            }
        }
    }
</script>

<style>
    .new-ribbon {
        position: absolute;
        top: -16px;
        right: 16px;
        transform: rotate(45deg);
        color: #8cd1a6;
        font-size: calc(0.75rem + 0.5vw);
        width: 32px;
        height: 100%;
        transition: 0.3s;
    }

    button:hover>div {
        color: white !important;
        top: 6px;
        right: 24px;
        transform: rotate(0deg);
    }

    .plot-slot {
        width: 80px;
        height: 80px;
        border: 2px solid #1b1b1b;
        opacity: 0.8;
        cursor: pointer;
    }

    .plot-slot:hover {
        opacity: 1;
    }

    .plot-slot.empty {
        background-color: #b8b8b811;
    }
</style>