<template>
    <div class='h-full 2xl:w-4/5 xl:w-9/12 w-full bg-dark overflow-x-hidden overflow-y-auto pb-28'
        style='background-color: #222222; right: 0'>
        <!--PLOT HEADER-->
        <div
            class='2xl:w-9/12 lg:w-11/12 w-full flex sm:flex-row flex-col 2xl:px-12 h-auto sm:px-14 px-6 mx-auto sm:mt-16 mt-12 panel-limiter'>

            <!--PLOT-->
            <div class='relative sm:w-5/12 w-full lg:mr-6 mr-4'>
                <img class="w-full h-full rounded-xl" src="/images/plots/base/0.png" alt="Base land">
                <img class="absolute top-0 left-0 w-full h-full rounded-xl"
                    :src="`/images/plots/soil_type/${plot.soilType}.png`" alt="Soil Type">
                <img class="absolute top-0 left-0 w-full h-full rounded-xl"
                    :src="getPlotAttributeImage('Level', plot.neighbourhood, plot.level)" alt="Level">
                <img class="absolute top-0 left-0 w-full h-full rounded-xl"
                    :src="getPlotAttributeImage('Fertility', plot.neighbourhood, plot.fertility)" alt="Fertility">
                <img class="absolute top-0 left-0 w-full h-full rounded-xl"
                    :src="getPlotAttributeImage('Crime', plot.neighbourhood, plot.crimeRate)" alt="Crime">
            </div>

            <!--PLOT ATTRIBUTES-->
            <div
                class='sm:w-7/12 w-full lg:ml-6 sm:ml-4 ml-0 sm:mt-0 mt-12 rounded-xl xl:py-6 py-3 xl:px-10 px-5 dark-panel flex flex-col items-center'>
                <h2 class='xl:text-3xl sm:text-2xl text-xl w-full mb-2'>Plot #{{ plot.token_id }}</h2>
                <p class='text-white w-full xl:text-sm text-xs opacity-30'>
                    Owned by {{ getPlotOwner(plot.plotOwner)}}
                </p>
                <div class='w-full flex flex-row xl:mb-4 lg:mb-3 mb-2'
                    v-bind:class='{"mt-auto": !plot.ownerOf, "mt-2": plot.ownerOf}'>
                    <p class='text-white sm:w-8/10 w-6/10 xl:text-lg lg:text-base text-sm opacity-80'>
                        Soil
                    </p>
                    <p class='xl:text-lg lg:text-base text-sm sm:w-2/10 w-4/10 text-right'>
                        Loam
                    </p>
                </div>

                <div class='w-full flex flex-row xl:mb-4 lg:mb-3 sm:mb-2 mb-2'>
                    <p class='text-white sm:w-8/10 w-6/10 xl:text-lg lg:text-base text-sm opacity-80'>
                        Fertility
                    </p>
                    <p class='xl:text-lg lg:text-base text-sm sm:w-2/10 w-4/10 text-right'>
                        {{ plotData.fertility }} <span
                            class='ml-4 opacity-75'>(+{{ plotData.fertility - plotData.fertilityBase }})</span>
                    </p>
                </div>

                <div class='w-full flex flex-row xl:mb-4 lg:mb-3 mb-2'>
                    <p class='text-white sm:w-8/10 w-6/10 xl:text-lg lg:text-base text-sm opacity-80'>
                        Defense
                    </p>
                    <p class='xl:text-lg lg:text-base text-sm sm:w-2/10 w-4/10 text-right'>
                        {{ 1 }} <span class='ml-4 opacity-75'>(+{{ (plotData.defence) }})</span>
                    </p>
                </div>

                <div class='w-full flex flex-row xl:mb-4 lg:mb-3 mb-2'>
                    <p class='text-white sm:w-8/10 w-6/10 xl:text-lg lg:text-base text-sm opacity-80'>
                        CRIME
                    </p>
                    <p class='xl:text-lg lg:text-base text-sm text-sm sm:w-2/10 w-4/10 text-right'>
                        {{ plotData.crimeRate }} <span
                            class='ml-4 opacity-75'>(+{{ plotData.crimeRate - plotData.crimeRateBase }})</span>
                    </p>
                </div>

                <div class='w-full flex flex-row xl:mb-4 lg:mb-3 mb-2'>
                    <p class='text-white sm:w-9/10 w-5/10 xl:text-lg lg:text-base text-sm opacity-80'>
                        LEVEL
                    </p>
                    <p class='xl:text-lg lg:text-base text-sm sm:w-1/10 w-5/10 text-left text-right'>
                        {{ plotData.level }}
                    </p>
                </div>

                <hr v-if='plot.ownerOf' class='my-2 xl:mb-6 mb-0 w-full' style='color: #00000055' />
                <hr v-else class='my-auto xl:mb-6 mb-0 w-full' style='color: #00000055' />

                <div v-if='plot.ownerOf' class='w-full flex flex-row items-center my-auto sm:h-auto h-16'>
                    <p v-if='plotData.level < 9' class='xl:text-lg lg:text-base text-xs sm:w-7/10 w-7/10 text-left'>
                        Level Up {{ plotData.levelUpCost }} XYA
                    </p>
                    <p v-else class='xl:text-lg lg:text-base text-sm w-7/10 text-left'>
                        Maximum Level Reached
                    </p>
                    <p v-if='plotData.level < 9' v-on:click='$modal.show("upgradeplot")'
                        class='w-3/10 xya-btn2 text-center xl:text-lg text-sm'>
                        <span class='sm:block hidden'>Level Up</span>
                        <span class='sm:hidden block'>Up</span>
                    </p>
                </div>
            </div>
        </div>

        <!--LISTING-->

        <!--PLOT EMITTER-->
        <div :key='keys.emitter' v-if='plot.ownerOf'
            class='2xl:w-9/12 lg:w-11/12 w-full 2xl:px-12 sm:px-14 px-6 flex flex-col mx-auto h-auto mt-12'>
            <h2 class='w-full text-white xl:text-3xl sm:text-2xl text-xl opacity-80 mb-4'>
                XYA Emitter
            </h2>
            <div class='w-full h-full rounded-xl sm:px-8 px-4 sm:py-6 py-6 dark-panel'>
                <div v-if='!emitterStarted' class='w-full h-auto flex flex-row justify-start items-center mb-2'>
                    <p class='text-white lg:text-2xl sm:text-lg text-base opacity-80 sm:w-5/10 w-8/10'>
                        Inactive
                    </p>
                    <p class='text-xl sm:w-3/10 w-1/10'>

                    </p>
                    <p v-if='plot.ownerOf' v-on:click='togglePlotEmitter(plot)'
                        class='sm:w-2/10 w-3/10 xya-btn2 text-center xl:text-xl sm:text-lg text-sm'>
                        Start
                    </p>
                </div>
                <div v-else class='w-full h-auto flex flex-row justify-start items-center mb-2'>
                    <p class='text-white lg:text-2xl text-lg opacity-80  w-5/10'>
                        Active
                    </p>
                    <p class='text-xl w-3/10'>

                    </p>
                    <p v-if='plot.ownerOf' v-on:click='togglePlotEmitter(plot)'
                        class='w-2/10 xya-btn2 text-center xl:text-xl text-lg'>
                        Stop
                    </p>
                </div>

                <hr class='lg:my-6 my-4' style='color: #00000055' />

                <div :key='keys.emitter' class='w-full h-auto flex flex-row justify-start items-center mb-2'>
                    <p class='text-white xl:text-xl sm:text-lg text-sm opacity-80 sm:w-3/10 w-5/10'>
                        Emission Rate
                    </p>
                    <p class='xl:text-xl sm:text-lg text-xs sm:text-left text-right sm:w-3/10 w-5/10'>
                        {{calculatePlotEmissionRate(plot)}} (+{{ calculatePlotEmissionBonus(plot) }}) / day
                    </p>
                    <div class='w-2/10 mx-4 sm:block hidden'></div>
                </div>
                <p class='text-white sm:text-sm text-xs opacity-40 mb-2'>
                    ~ {{ (calculatePlotEmissionRate(plot) / 24).toFixed(2) }} XYA / hour
                </p>

                <div class='w-full h-auto flex flex-row justify-start items-center mb-2'>
                    <p class='text-white xl:text-xl sm:text-lg text-sm opacity-80 sm:w-3/10 w-5/10'>
                        Treasury
                    </p>
                    <p class='xl:text-xl sm:text-lg sm:text-sm text-xs sm:text-left text-right sm:w-3/10 w-5/10'>
                        <template v-if='plotData.treasury'>
                            {{ plotData.treasury.toFixed(2) }} XYA
                        </template>
                        <template v-else>
                            0 XYA
                        </template>
                    </p>
                    <div class='w-2/10 mx-4 sm:block hidden'></div>
                </div>
                <p class='text-white sm:text-sm text-xs opacity-40 mb-2'>
                    ~ {{ ((calculatePlotEmissionRate(plot) * (1 - emissionUnlockRate))).toFixed(2) }} XYA / day
                </p>

                <div class='w-full h-auto flex flex-row justify-start items-center mb-2'>
                    <p class='text-white xl:text-xl sm:text-lg sm:text-sm text-xs opacity-80 sm:w-3/10 w-5/10'>
                        Emissions
                    </p>
                    <p class='xl:text-xl sm:text-lg sm:text-sm text-xs sm:text-left text-right sm:w-5/10 w-3/10'>
                        {{ emissions.toFixed(2) }} / {{ emissionMaxAllowed.toFixed(2) }} XYA
                    </p>
                    <p v-if='plot.ownerOf' v-on:click='collectPlotEmissions(plot)'
                        class='sm:w-2/10 w-3/10 ml-auto xya-btn2 text-center xl:text-xl sm:text-lg text-xs'>
                        Collect
                    </p>
                </div>
                <p class='text-white sm:text-sm text-xs opacity-40 mb-2'>
                    ~ {{ ((calculatePlotEmissionRate(plot) * emissionUnlockRate)).toFixed(2) }} XYA / Day
                </p>
                <p v-if='emissions >= emissionMaxAllowed && emitterStarted' style='color: rgba(200,150,0,1)' class='sm:text-sm text-xs opacity-90 mt-4'>
                    <i class='fas fa-exclamation-triangle text-xl mr-2'></i>The Emitter is clogged and doesn't work anymore! Please collect the current emissions in order to
                    start emitting again!
                </p>

            </div>
        </div>


        <div v-if='plot.ownerOf' class='2xl:w-9/12 lg:w-11/12 w-full flex flex-col 2xl:px-12 sm:px-14 px-6 mx-auto h-auto mt-12'>
            <h2 class='w-full text-white xl:text-3xl sm:text-2xl text-xl opacity-80 mb-2'>
                Unlocked Treasury
            </h2>
            <div class='w-full h-full rounded-xl my-2 py-4 dark-panel sm:px-8 px-4 relative'>
                <div class='w-full h-auto flex flex-row justify-start items-center mb-2'>
                    <p class='text-white xl:text-xl sm:text-lg sm:text-sm text-xs opacity-80 sm:w-3/10 w-5/10'>
                        Unlocked Xya
                    </p>
                    <p class='xl:text-xl sm:text-lg sm:text-sm text-xs sm:text-left text-right sm:w-5/10 w-3/10'>
                        {{ unlockedEmissions.toFixed(2) }} XYA
                    </p>
                    <p v-if='plot.ownerOf' v-on:click='withdrawUnlockedEmissions(plot)'
                        class='sm:w-2/10 w-3/10 ml-auto xya-btn2 text-center xl:text-xl sm:text-lg text-xs'>
                        Collect
                    </p>
                </div>
            </div>
        </div>

        <!--PLOT SLOTS-->
        <div class='2xl:w-9/12 lg:w-11/12 w-full flex flex-col 2xl:px-12 sm:px-14 px-6 mx-auto h-auto mt-12'>
            <h2 class='w-full text-white xl:text-3xl sm:text-2xl text-xl opacity-80 mb-2'>
                Plot Slots
            </h2>
            <div v-for='i in 3' :key='i' class='w-full h-full rounded-xl my-2 py-4 dark-panel sm:px-8 px-4 relative'>
                <div class='absolute flex items-center justify-center top-0 bottom-0 left-0 right-0 bg-dark rounded-xl'>
                    <i class='fas fa-lock mr-4 sm:text-xl text-base text-white opacity-80'></i>
                    <p class='sm:text-xl text-base text-white opacity-80'>Slot is locked</p>
                </div>
                <div class='w-full h-auto flex flex-row justify-start items-center opacity-20'>
                    <div class='plot-slot w-1/10 empty rounded-xl mr-6'>

                    </div>
                    <div class='sm:w-7/10 w-5/10 h-full flex-col'>
                        <h2 class='text-white h-full sm:text-xl text-base opacity-80'>Slot {{i}}</h2>
                        <p class='text-white h-full opacity-30 sm:text-sm text-xs'>Empty</p>
                    </div>
                    <div v-if='plot.ownerOf'
                        class='sm:w-2/10 w-4/10 ml-auto xya-btn2 text-center xl:text-xl sm:text-lg sm:text-sm text-xs'>
                        Add NFT
                    </div>
                </div>
            </div>

        </div>

        <!--PLOT RAIDS-->
        <div v-show='false'
            class='2xl:w-9/12 lg:w-11/12 w-full flex flex-col 2xl:px-12 sm:px-14 px-6 mx-auto h-auto mt-12'>
            <h2 class='w-full text-white xl:text-3xl sm:text-2xl text-xl opacity-80 mb-2'>
                Plot Raids
            </h2>
            <div class='w-full h-full rounded-xl my-2 py-4 dark-panel'>
                <p class='text-white opacity-80 w-full text-center sm:text-xl text-sm'>Coming soon...</p>
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

        <NFTPickerModal v-on:confirm='addNftToSlot($event)' v-if='showSlotPickerModal'
            v-on:close='showSlotPickerModal = false' :slotNumber='slotIndex'>

        </NFTPickerModal>


        <window height='10%' width='80%' name='upgradeplot'>
            <div class="flex flex-wrap p-6 bg-dark h-full">
                <div class="w-full text-center">
                    <div class="sm:text-3xl text-2xl">Upgrade Plot - Level</div>
                </div>
                <div class="absolute right-6">
                    <i @click="$modal.hide('upgradeplot')" class="fas fa-times cursor-pointer text-xl"></i>
                </div>
                <hr class='w-full my-4' />
                <div class="mt-4 flex flex-row w-full items-start justify-start items-center">
                    <span class='text-white opacity-80 mr-1'>Pay -</span> {{plotData.levelUpCost}} XYA

                    <p v-if='plotData.level < 9' v-on:click='levelUpPlot(plot, false)'
                        class='w-2/10 xya-btn2 text-center xl:text-lg text-sm ml-auto'>
                        <span class='sm:block hidden'>Level Up</span>
                        <span class='sm:hidden block'>Up</span>
                    </p>
                </div>
                <p class='mt-4 opacity-80 text-sm'>
                    or
                </p>
                <div class='mt-4 flex flex-row w-full items-start justify-start'>
                    <span class='text-white opacity-80 mr-1 sm:text-lg text-sm'>Pay -</span>
                    <span class=' sm:text-lg text-sm'>
                        {{plotData.levelUpCost * 3}} XYA from Treasury
                    </span>
                    <p v-if='plotData.level < 9' v-on:click='levelUpPlot(plot, true)'
                        class='w-2/10 xya-btn2 text-center xl:text-lg text-sm ml-auto'>
                        <span class='sm:block hidden'>Level Up</span>
                        <span class='sm:hidden block'>Up</span>
                    </p>
                </div>
                <p class='opacity-80 text-sm mt-2'>
                    Paying using treasury funds is 3 times more expensive.
                </p>
            </div>
        </window>

        <window height='10%' width='80%' name='upgradeplot'>
            <div class="flex flex-wrap p-6 bg-dark h-full">
                <div class="w-full text-center">
                    <div class="sm:text-3xl text-2xl">Upgrade Plot - Level</div>
                </div>
                <div class="absolute right-6">
                    <i @click="$modal.hide('upgradeplot')" class="fas fa-times cursor-pointer text-xl"></i>
                </div>
                <hr class='w-full my-4' />
                <div class="mt-4 flex flex-row w-full items-start justify-start items-center">
                    <span class='text-white opacity-80 mr-1'>Pay -</span> {{plotData.levelUpCost}} XYA

                    <p v-if='plotData.level < 9' v-on:click='levelUpPlot(plot, false)'
                        class='w-2/10 xya-btn2 text-center xl:text-lg text-sm ml-auto'>
                        <span class='sm:block hidden'>Level Up</span>
                        <span class='sm:hidden block'>Up</span>
                    </p>
                </div>
                <p class='mt-4 opacity-80 text-sm'>
                    or
                </p>
                <div class='mt-4 flex flex-row w-full items-start justify-start'>
                    <span class='text-white opacity-80 mr-1 sm:text-lg text-sm'>Pay -</span>
                    <span class=' sm:text-lg text-sm'>
                        {{plotData.levelUpCost * 3}} XYA from Treasury
                    </span>
                    <p v-if='plotData.level < 9' v-on:click='levelUpPlot(plot, true)'
                        class='w-2/10 xya-btn2 text-center xl:text-lg text-sm ml-auto'>
                        <span class='sm:block hidden'>Level Up</span>
                        <span class='sm:hidden block'>Up</span>
                    </p>
                </div>
                <p class='opacity-80 text-sm mt-2'>
                    Paying using treasury funds is 3 times more expensive.
                </p>
            </div>
        </window>

        <window height='10%' width='80%' name='startemitter'>
            <div class="flex flex-wrap p-6 bg-dark h-full">
                <div class="w-full text-center">
                    <div class="sm:text-3xl text-2xl">Start Emitter</div>
                </div>
                <div class="absolute right-6">
                    <i @click="$modal.hide('startemitter')" class="fas fa-times cursor-pointer text-xl"></i>
                </div>
                <hr class='w-full my-4' />
                <div class="mt-4 flex flex-row w-full items-start justify-start items-center text-white opacity-60">
                    ’’Starting the emitter for the first time requires an 100 XYA-ONE LP Token fee. <br /> Once paid,
                    you can start/stop the emitter whenever you want.’’
                </div>
                <div class="mt-4 flex flex-row w-full items-start justify-start items-center">
                    <span class='text-white opacity-80 mr-1'>Pay -</span> {{ emitterStartFee }} XYA-ONE LP

                    <p v-on:click='togglePlotEmitter(plot, true)'
                        class='w-3/10 xya-btn2 text-center xl:text-lg text-sm ml-auto'>Start Emitter
                    </p>
                </div>
            </div>
        </window>
    </div>
</template>

<script>
    import NFTPickerModal from './NFTPickerModal';
    import plotRenderData from '../../plugins/snapshots/plotsRenderData.json';
    import plotInventory from '../../plugins/artifacts/plotInventory.json';

    import {
        mapGetters
    } from "vuex"

    export default {
        name: 'PlotDetails',
        props: {
            plot: {
                type: Object,
                default: {
                    level: 0,
                    crimeRate: 0,
                    crimeBase: 0,
                    fertility: 0,
                    fertilityBase: 0,
                    defense: 0,
                    treasury: 0
                }
            },

            contract: {
                type: Object,
                default: undefined
            },

            plotEmitterContract: {
                type: Object,
                default: undefined
            },

            plotInventoryContract: {
                type: Object,
                default: undefined
            },

            allowances: {
                type: Object,
                default: {}
            }

        },

        computed: {
            ...mapGetters([
                'metaMaskAccount',
                'metaMaskWallet'
            ]),

            isPlotOwner(owner) {
                return owner.toLowerCase() == this.metaMaskAccount.toLowerCase();
            }
        },

        components: {
            NFTPickerModal
        },

        data() {
            return {
                emissionBaseRate: 4,
                emissionUnlockRate: 0.25,
                emissions: 0,
                unlockedEmissions: 0,
                emissionRate: 0,
                emissionBonus: 0,
                emissionMaxAllowed: 0,
                emitterStarted: false,
                emitterStartFee: 0,

                plotTreasury: 0,
                plotTreasuryBonusPerDay: 0,

                plotData: {},
                plotSlot1: undefined,
                plotSlot2: undefined,
                plotSlot3: undefined,

                plotReceiverAddress: "",
                plotListPrice: 0,

                raidHistory: [],

                showSlotPickerModal: false,
                slotIndex: 0,

                updateInterval: undefined,

                keys: {
                    emitter: 0
                }
            }
        },

        async mounted() {
            await this.getPlotData();

            this.emitterStartFee = await this.plotEmitterContract.feeToEmit() / 10 ** 18;
            this.emissionBaseRate = await this.plotEmitterContract.baseEmissionRatePerDay() / 10 ** 18;
            this.emissionMaxAllowed = await this.plotEmitterContract.maxAllowedToEmitUntilClog() / 10 ** 18;
            this.updateInterval = setInterval(async () => {
                await this.getPlotData();
            }, 15000);
        },

        methods: {
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

            async addNftToSlot(slotData) {
                try {
                    const tx = await this.plotInventoryContract.addAssetToPlotInventory(0, 1829, slotData.address,
                        slotData.token.id, 1);
                    await tx.wait(1);
                } catch (err) {
                    console.error(err);
                }
            },

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
                    .token_id * 1);
                this.emissions = await this.plotEmitterContract.calculateClaimableEmissions(this.plot.plot_type,
                    this.plot.token_id * 1) / 10 ** 18;
                this.unlockedEmissions = await this.plotEmitterContract.getUnlockedBalance() / 10 ** 18;

                this.keys.emitter += 1;
            },

            async levelUpPlot(plot, fromTreasury) {
                let toast = undefined;
                try {

                    if (!this.allowances.plotHandler) {
                        this.$modal.hide('upgradeplot');
                        this.$emit('allowanceError', {
                            message: "Please enable the 'Plot Handler' contract!"
                        });
                        return;
                    }

                    const isEmitting = await this.plotEmitterContract.isEmitting(plot.plot_type, plot.token_id * 1);
                    if (isEmitting) throw 'Emitter is running!';
                    const tx = await this.contract.levelUpPlot(plot.plot_type, plot.token_id * 1, fromTreasury, {
                        gasPrice: 30000000000,
                        gasLimit: 3000000,
                    });
                    toast = this.createLoaderToast("Pending - Level Up");
                    this.$modal.hide('upgradeplot');
                    await tx.wait(1);
                    await this.getPlotData(plot);
                } catch (err) {
                    this.handleError(err);
                }
                this.$toast.dismiss(toast);
            },

            async togglePlotEmitter(plot, force = false) {
                let toast = undefined;
                try {
                    const paidFee = await this.plotEmitterContract.hasPlotPaidOneTimeFee(plot.plot_type, plot
                        .token_id * 1);

                    if (!paidFee && !force) {
                        this.$modal.show('startemitter');
                        return;
                    } else if (!paidFee && force) {
                        if (!this.allowances.plotEmitter) {
                            this.$modal.hide('startemitter');
                            this.$emit('allowanceError', {
                                message: "Please enable the 'Plot Emitter' contract!"
                            });
                            return;
                        }
                    }

                    const isEmitting = await this.plotEmitterContract.isEmitting(plot.plot_type, plot.token_id * 1);
                    const tx = !isEmitting ?
                        await this.plotEmitterContract.startEmissions(plot.plot_type, plot.token_id * 1, {
                            gasPrice: 30000000000,
                            gasLimit: 3000000,
                        }) :
                        await this.plotEmitterContract.stopEmissions(plot.plot_type, plot.token_id * 1, {
                            gasPrice: 30000000000,
                            gasLimit: 3000000,
                        });
                    toast = this.createLoaderToast("Pending - " + (!isEmitting ? "Start Emitter" : "Stop Emitter"));
                    this.$modal.hide('startemitter');
                    await tx.wait(1);
                    await this.getPlotData(plot);
                } catch (err) {
                    this.handleError(err);
                }
                this.$toast.dismiss(toast);
            },

            async getPlotEmissions(plot) {
                try {
                    const tx =
                        await this.plotEmitterContract.startEmissions(plot.plot_type, plot.token_id * 1, {
                            gasPrice: 30000000000,
                            gasLimit: 3000000,
                        });
                    await tx.wait(1);
                    await this.getPlotData();
                } catch (err) {
                    this.handleError(err);
                }
            },

            async withdrawUnlockedEmissions() {
                let toast = undefined;
                try {
                    const tx =
                        await this.plotEmitterContract.withdrawUnlockedEmitted({
                            gasPrice: 30000000000,
                            gasLimit: 3000000,
                        });
                    toast = this.createLoaderToast("Pending - Collect Unlocked XYA");
                    await tx.wait(1);
                    await this.getPlotData();
                } catch (err) {
                    this.handleError(err);
                }
                this.$toast.dismiss(toast);
            },

            async collectPlotEmissions(plot) {
                let toast = undefined;
                try {
                    const tx =
                        await this.plotEmitterContract.claimEmissions(plot.plot_type, plot.token_id * 1, {
                            gasPrice: 30000000000,
                            gasLimit: 3000000,
                        });
                    toast = this.createLoaderToast("Pending - Collect Emissions");
                    await tx.wait(1);
                    await this.getPlotData(plot);
                } catch (err) {
                    this.handleError(err);
                }
                this.$toast.dismiss(toast);
            },

            getPlotOwner(owner) {
                if (!owner || owner.length < 10) return "Couldn't load owner.";
                return owner.substring(0, 5) + "..." + owner.substring(owner.length - 5, owner.length);
            },

            prepareSlotPickerModal(slot) {
                this.slotIndex = slot;
                this.showSlotPickerModal = true;
            },

            calculatePlotEmissionRate(plot) {
                const fertility = Math.floor(plot.fertility / 3);
                const crime = Math.floor(plot.crimeRate / 3);
                const level = plot.level;

                let emissionRate = this.emissionBaseRate + (fertility - crime) * this.emissionBaseRate + level * this
                    .emissionBaseRate;
                return Math.max(1, emissionRate);
            },

            emitListPlot(plot, price) {
                this.$emit('listplot', {
                    id: plot.token_id * 1,
                    neighbourhood: plot.neighbourhood,
                    amount: price
                });
            },

            emitBuyPlot(plot, price) {
                this.$emit('buyplot', {
                    id: plot.token_id * 1,
                    neighbourhood: plot.neighbourhood,
                    amount: price
                });
            },

            calculatePlotEmissionBonus(plot) {
                const fertility = Math.floor((plot.fertility - plot.fertilityBase) / 3);
                const crime = Math.floor((plot.crimeRate - plot.crimeRateBase) / 2);
                const baseLevel = plot.levelBase,
                    level = plot.level;
                let emissionBonus = (fertility - crime) * this.emissionBaseRate + (level - baseLevel) * this
                    .emissionBaseRate;
                return Math.max(0, emissionBonus);
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
        width: 72px;
        height: 72px;
        border: 2px solid #363636;
        opacity: 0.8;
        cursor: pointer;
    }

    .panel-limiter {
        max-height: 45vh;
    }

    @media only screen and (max-width: 1024px) {
        .panel-limiter {
            max-height: 100vh;
        }

        .plot-slot {
            width: 60px;
            height: 56px;
            border: 2px solid #363636;
            opacity: 0.8;
            cursor: pointer;
        }
    }

    .plot-slot:hover {
        opacity: 1;
    }

    .plot-slot.empty {
        background-color: #b8b8b811;
    }
</style>