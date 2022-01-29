<template>
    <div class='h-full 2xl:w-4/5 xl:w-9/12 w-full bg-dark overflow-x-hidden overflow-y-auto pb-28'
        style='background-color: #222222; right: 0'>
        <!--PLOT HEADER-->
        <div
            class='2xl:w-9/12 lg:w-11/12 w-full flex sm:flex-row flex-col 2xl:px-12 h-auto sm:px-14 px-6 mx-auto sm:mt-16 mt-12 panel-limiter'>

            <!--PLOT-->
            <div class='relative sm:w-6/12 w-full lg:mr-6 mr-4'>
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
                    <p class='text-white sm:w-8/10 w-6/10 xl:text-lg text-small text-sm opacity-80'>
                        Soil
                    </p>
                    <p class='xl:text-lg lg:text-base text-sm sm:w-2/10 w-4/10 text-right'>
                        {{ plotData.soilType }}
                    </p>
                </div>

                <div class='w-full flex flex-row xl:mb-4 lg:mb-3 sm:mb-2 mb-2'>
                    <p class='text-white sm:w-8/10 w-6/10 xl:text-lg lg:text-base text-sm opacity-80'>
                        Fertility
                    </p>
                    <p class='xl:text-lg text-sm sm:w-2/10 w-4/10 text-right'>
                        {{ plotData.fertility }} <span
                            class='ml-4 opacity-75'>(+{{ plotData.fertility - plotData.fertilityBase }})</span>
                    </p>
                </div>

                <div class='w-full flex flex-row xl:mb-4 lg:mb-3 mb-2'>
                    <p class='text-white sm:w-8/10 w-6/10 xl:text-lg lg:text-base text-sm opacity-80'>
                        Defense
                    </p>
                    <p class='xl:text-lg lg:text-base text-sm sm:w-2/10 w-4/10 text-right'>
                        {{ plotData.defence }} <span class='ml-4 opacity-75'>(+{{ (plotData.defence - 1) }})</span>
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

                <hr v-if='plot.ownerOf' class='my-2 xl:mb-4 mb-2 w-full' style='color: #00000055' />
                <hr v-else class='my-auto xl:mb-4 mb-4 w-full' style='color: #00000055' />

                <div v-if='plot.ownerOf'
                    class='w-full flex flex-row justify-center items-center xl:py-0 py-2 lg:h-16 h-16'>
                    <p v-if='plotData.level < 9'
                        class='xl:text-lg lg:text-base text-xs sm:w-7/10 w-5/10 text-left sm:block hidden'>
                        Level Up {{ plotData.levelUpCost }} XYA
                    </p>
                    <p v-else class='xl:text-lg lg:text-base text-sm w-full text-left'>
                        Maximum Level Reached
                    </p>
                    <p v-if='plotData.level < 9' v-on:click='$modal.show("upgradeplot")'
                        class='w-5/10 xya-btn2 text-center xl:text-lg sm:text-lg text-xs'>
                        <span>Level Up</span>
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
                        class='sm:w-2/10 w-4/10 sm:ml-0 ml-10 xya-btn2 text-center xl:text-xl sm:text-lg text-xs'>
                        Stop
                    </p>
                </div>

                <hr class='lg:my-6 my-4' style='color: #00000055' />

                <div class='w-full h-auto flex flex-row justify-start items-center sm:mb-2 mb-0'>
                    <p class='text-white xl:text-xl lg:text-lg text-sm opacity-80 sm:w-3/10 w-5/10'>
                        Emission Rate
                    </p>
                    <p :key='emissionsPerDay'
                        class='xl:text-xl lg:text-lg text-sm sm:text-left text-right sm:w-3/10 w-5/10'>
                        {{emissionsPerDay}} (+{{ emissionsBonus }}) / day
                    </p>
                    <div class='w-2/10 mx-4 sm:block hidden'></div>
                </div>
                <p class='text-white sm:text-sm text-xs opacity-40 mb-2'>
                    ~ {{ (emissionsPerDay / 24).toFixed(2) }} XYA / hour
                </p>

                <div class='w-full h-auto flex flex-row justify-start items-center sm:mb-2 mb-0'>
                    <p class='text-white xl:text-xl lg:text-lg text-sm opacity-80 sm:w-3/10 w-5/10'>
                        Treasury
                    </p>
                    <p class='xl:text-xl lg:text-lg sm:text-sm text-xs sm:text-left text-right sm:w-3/10 w-5/10'>
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
                    ~ {{ ((emissionsPerDay * (1 - emissionUnlockRate))).toFixed(2) }} XYA / day
                </p>

                <div class='w-full h-auto flex flex-row justify-start items-center sm:mb-2 mb-0'>
                    <p class='text-white xl:text-xl lg:text-lg sm:text-sm text-xs opacity-80 sm:w-3/10 w-3/10'>
                        Emissions
                    </p>
                    <p class='xl:text-xl lg:text-lg sm:text-sm text-xs sm:text-left text-right sm:w-5/10 w-3/10'>
                        {{ emissions.toFixed(2) }} / {{ emissionMaxAllowed.toFixed(2) }} XYA
                    </p>
                    <p v-if='plot.ownerOf' v-on:click='collectPlotEmissions(plot)'
                        class='sm:w-2/10 w-3/10 ml-auto xya-btn2 text-center xl:text-xl sm:text-lg text-xs'>
                        Collect
                    </p>
                </div>
                <p class='text-white sm:text-sm text-xs opacity-40 sm:mb-2 mb-0'>
                    ~ {{ ((emissionsPerDay * emissionUnlockRate)).toFixed(2) }} XYA / Day
                </p>
                <p v-if='emissions >= emissionMaxAllowed && emitterStarted' style='color: rgba(200,150,0,1)'
                    class='sm:text-sm text-xs opacity-90 mt-4'>
                    <i class='fas fa-exclamation-triangle text-xl mr-2'></i>The Emitter is clogged and doesn't work
                    anymore! Please collect the current emissions in order to
                    start emitting again!
                </p>

            </div>
        </div>

        <!--PLOT SLOTS-->
        <div :key='keys.inventorySlots'
            class='2xl:w-9/12 lg:w-11/12 w-full flex flex-col 2xl:px-12 sm:px-14 px-6 mx-auto h-auto mt-12'>
            <h2 class='w-full text-white xl:text-3xl sm:text-2xl text-xl opacity-80 mb-2'>
                Plot Slots
            </h2>
            <div v-for='(slot, index) in simpleInventorySlots' :key='index'
                class='w-full h-full rounded-xl my-2 py-4 dark-panel sm:px-8 px-4 relative'>
                <div class='w-full h-auto flex flex-row justify-start items-center'>
                    <template v-if='slot.token'>
                        <div v-on:click='prepareSlotPickerModal(index)'
                            v-bind:class='{"dfk": slot.tokenId === "0x5F753dcDf9b1AD9AabC1346614D1f4746fd6Ce5C"}'
                            class='plot-slot w-1/10 empty rounded-xl mr-6 bg-contain'>
                            <img v-if='slot.token * 1 !== 0' class='w-full h-full rounded-xl' v-lazy='slot.image' />
                        </div>
                        <div class='sm:w-7/10 w-5/10 h-full flex-col'>
                            <h2 v-if='slot.token * 1 === 0' class='text-white h-full sm:text-xl text-sm opacity-80'>
                                Slot
                                {{index + 1}}</h2>
                            <h2 v-else class='text-white h-full sm:text-xl text-xs opacity-80'>
                                {{ getTokenName(slot) }}
                                #{{ slot.tokenId }}</h2>
                            <p v-if='slot.token * 1 === 0' class='text-white h-full opacity-30 sm:text-sm text-xs'>Empty
                            </p>
                            <p v-else class='h-full sm:text-sm text-xs'> {{slot.attributeBonusString}}
                            </p>
                        </div>
                        <div v-if='slot.token * 1 === 0 && plot.ownerOf' v-on:click='prepareSlotPickerModal(index)'
                            class='sm:w-2/10 w-4/10 ml-auto xya-btn2 text-center xl:text-xl sm:text-lg sm:text-sm text-xs'>
                            Add NFT
                        </div>
                        <div v-on:click='withdrawNFTFromSlot(plot, index)' v-else-if='plot.ownerOf'
                            class='sm:w-2/10 w-4/10 ml-auto text-center xl:text-xl sm:text-lg sm:text-sm text-xs cursor-pointer text-red hover:text-white'>
                            Remove NFT
                        </div>
                    </template>
                    <template v-else>
                        <div
                            class='plot-slot w-1/10 empty rounded-xl mr-6 bg-contain flex items-center justify-center text-2xl'>
                            <i class='fa fa-gear fa-spin'></i>
                        </div>
                        <div class='w-9/10 text-center h-full empty rounded-xl mr-6 bg-contain'>
                            Loading...
                        </div>
                    </template>
                </div>
            </div>

        </div>

        <div class='2xl:w-9/12 lg:w-11/12 w-full flex flex-col 2xl:px-12 sm:px-14 px-6 mx-auto h-auto mt-12'>
            <h2 class='w-full text-white xl:text-3xl sm:text-2xl text-xl opacity-80 mb-2'>
                Special Slot
            </h2>
            <div v-for='(slot, index) in specialInventorySlots' :key='index'
                class='w-full h-full rounded-xl my-2 py-4 dark-panel sm:px-8 px-4 relative'>
                <div v-on:click='prepareSlotPickerModal(index + 3)'
                    class='w-full h-auto flex flex-row justify-start items-center relative'>
                    <template v-if='slot.token'>
                        <div class='absolute plot-slot dfk z-50' style='left: -3px;'></div>
                        <div class='plot-slot w-1/10 empty rounded-xl mr-6 bg-contain'>
                            <img v-if='slot.token * 1 !== 0' class='w-full h-full rounded-xl' v-bind:src='slot.image' />
                        </div>
                        <div class='sm:w-7/10 w-5/10 h-full flex-col'>
                            <h2 v-if='slot.token * 1 === 0' class='text-white h-full sm:text-xl text-sm opacity-80'>
                                Slot
                                {{index + 4}}</h2>
                            <h2 v-else class='text-white h-full sm:text-xl text-xs opacity-80'>
                                {{ getTokenName(slot) }}
                                #{{ slot.tokenId }}</h2>
                            <p v-if='slot.token * 1 === 0' class='text-white h-full opacity-30 sm:text-sm text-xs'>Empty
                            </p>
                            <p v-else class='h-full sm:text-sm text-xs'> {{slot.attributeBonusString}}
                            </p>
                        </div>
                        <div v-if='slot.token * 1 === 0 && plot.ownerOf' v-on:click='prepareSlotPickerModal(index + 3)'
                            class='sm:w-2/10 w-4/10 ml-auto xya-btn2 text-center xl:text-xl sm:text-lg sm:text-sm text-xs'>
                            Add NFT
                        </div>
                        <div v-on:click='withdrawNFTFromSlot(plot, index + 3)' v-else-if='plot.ownerOf'
                            class='sm:w-2/10 w-4/10 ml-auto text-center xl:text-xl sm:text-lg sm:text-sm text-xs cursor-pointer text-red hover:text-white'>
                            Remove NFT
                        </div>
                    </template>
                    <template v-else>
                        <div
                            class='plot-slot w-1/10 empty rounded-xl mr-6 bg-contain flex items-center justify-center text-2xl'>
                            <i class='fa fa-gear fa-spin'></i>
                        </div>
                        <div class='w-9/10 text-center h-full empty rounded-xl mr-6 bg-contain'>
                            Loading...
                        </div>
                    </template>
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
                            0xs...124s
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

        <NFTPickerModal :collections='collections' :operator='plotInventoryContract.address'
            v-on:confirm='addNFTToSlot($event)' v-if='showSlotPickerModal' v-on:close='showSlotPickerModal = false'
            :slotNumber='slotIndex'>

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
                <a class='mt-2'
                    href="https://game.defikingdoms.com/#/add/ONE/0x9b68BF4bF89c115c721105eaf6BD5164aFcc51E4">Buy
                    XYA-ONE LP here</a>
            </div>
        </window>
    </div>
</template>

<script>
    import HRC721 from '../../plugins/artifacts/HRC721.json';
    import {
        ethers
    } from "ethers";
    import NFTPickerModal from './NFTPickerModal';
    import plotRenderData from '../../plugins/snapshots/plotsRenderData.json';

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
                    treasury: 0,
                    plotType: "Loam"
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
            },

            simpleInventorySlots() {
                return this.inventorySlots.filter(c => c.index < 3);
            },

            specialInventorySlots() {
                return this.inventorySlots.filter(c => c.index === 3);
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
                emissionsPerDay: 0,
                emissionsBonus: 0,
                emissionMaxAllowed: 0,
                emitterStarted: false,
                emitterStartFee: 0,

                plotTreasury: 0,
                plotTreasuryBonusPerDay: 0,

                plotData: {
                    level: 0,
                    crimeRate: 0,
                    crimeRateBase: 0,
                    fertility: 0,
                    fertilityBase: 0,
                    defence: 0,
                    treasury: 0,
                    plotType: "Loading..."
                },

                inventorySlots: [],
                loadingInventorySlots: true,
                plotReceiverAddress: "",
                plotListPrice: 0,

                raidHistory: [],

                showSlotPickerModal: false,
                slotIndex: 0,

                updateInterval: undefined,

                keys: {
                    emitter: 0,
                    currentPlot: 0,
                    inventorySlots: 1000
                },

                attributes: [
                    "Fertility",
                    "Level",
                    "Crime",
                    "Defense",
                ],

                collections: [{
                        name: "Crypto Pigs",
                        alias: "Crypto Pig",
                        address: "0xE5Fd335819EDb8DA8395F8Ec48beCA747a0790aB",
                        count: 0,
                        image: "https://ipfs.io/ipfs/QmaacTD6EMZvJVkcVjNrzob58srQ88dxoSGNANDNeY6SY6",
                        active: true,
                        metadata: "https://api.cryptopigs.one/meta/list?items=",
                        userNFTs: [],
                        special: false
                    },
                    {
                        name: "The Frey",
                        alias: "Frey",
                        address: "0xd9d6b8c7f63cc2f5d5df5f3a77b2f596a66230d2",
                        count: 0,
                        image: "https://frey.freyala.com/images/3820.png",
                        active: true,
                        metadata: "https://frey.freyala.com/meta/list?items=",
                        userNFTs: [],
                        special: false
                    },
                    {
                        name: "Orcs",
                        alias: "Orc",
                        address: "",
                        count: 0,
                        image: "https://pbs.twimg.com/media/FC2dnRUWEAMKbId?format=jpg&name=small",
                        active: false,
                        metadata: "",
                        userNFTs: [],
                        special: false
                    },
                    {
                        name: "DFK Heroes",
                        alias: "Hero",
                        address: "0x5F753dcDf9b1AD9AabC1346614D1f4746fd6Ce5C",
                        count: 0,
                        image: "/images/dfkhero.png",
                        active: true,
                        metadata: "",
                        userNFTs: [],
                        special: true
                    },
                ]
            }
        },

        async mounted() {
            new Promise(async (resolve, reject) => {
                try {
                    await this.getPlotInventory();
                } catch (err) {
                    this.loadingInventorySlots = false;
                }
                this.loadingInventorySlots = false;
                resolve();
            });

            this.emitterStartFee = await this.plotEmitterContract.feeToEmit() / 10 ** 18;
            this.emissionBaseRate = await this.plotEmitterContract.baseEmissionRatePerDay() / 10 ** 18;
            this.emissionMaxAllowed = await this.plotEmitterContract.maxAllowedToEmitUntilClog() / 10 ** 18;
            this.updateInterval = setInterval(async () => {
                await this.refreshPlot(this.plot);
            }, 15000);

            await this.refreshPlot(this.plot);

            await this.getUserNFTCollections();
            this.keys.inventorySlots++;
        },

        methods: {
            generateSpecialAsset(collection, token) {
                return {
                    image: collection.image,
                    tokenId: token,
                    name: collection.alias + " #" + token
                };
            },

            async fetchUserNFTs(metadataApi, ids) {
                try {
                    const userNFTs = await this.$http.get(`${metadataApi}${ids}`);
                    return userNFTs.data;
                } catch (err) {
                    return [];
                }
            },

            getTokenImage(slot) {
                if (slot.token * 1 === 0 || !slot.token) // slot is empty
                    return "";
                const collection = this.collections.filter(c => c.address.toLowerCase() === slot.token.toLowerCase())[
                    0];
                return slot.image;
            },

            getTokenName(slot) {
                if (!slot.token) return "";
                const collection = this.collections.filter(c => c.address.toLowerCase() === slot.token.toLowerCase())[
                    0];
                return collection.alias;
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

            async getUserNFTCollections() {
                for (let i = 0; i < this.collections.length; i++) {
                    if (!this.collections[i].active) continue;

                    const contract = await new ethers.Contract(this.collections[i].address, HRC721.abi, this
                        .metaMaskWallet.signer);

                    let tokens = [];
                    const balance = await contract.balanceOf(this.metaMaskAccount);
                    if (this.collections[i].name === "DFK Heroes") {
                        const tokens = await contract.getUserHeroes(this.metaMaskAccount);
                        tokens.forEach((token) => {
                            this.collections[i].userNFTs.push(this.generateSpecialAsset(this.collections[i],
                                token));
                        });
                    } else {
                        tokens = await contract.tokensOfOwner(this.metaMaskAccount);
                        let ids = tokens.map((token) => token * 1);
                        this.collections[i].userNFTs = await this.fetchUserNFTs(this.collections[i].metadata, ids);
                    }
                    this.collections[i].count = balance * 1;
                }
            },

            async addNFTToSlot(slotData) {
                let toast = undefined;
                let collection = this.collections.filter(c => c.address.toLowerCase() === slotData.address
                    .toLowerCase())[0];

                try {
                    const isEmitting = await this.plotEmitterContract.isEmitting(this.plot.plot_type, this.plot
                        .token_id * 1);
                    if (isEmitting) throw 'Emitter is running!';
                    const tx = await this.plotInventoryContract.addAssetToPlotInventory(this.plot.plot_type, this
                        .plot.token_id * 1, slotData.address,
                        slotData.tokenId, slotData.slotNumber, {
                            gasPrice: 30000000000,
                            gasLimit: 3000000,
                        });
                    toast = this.createLoaderToast("Pending - Add NFT");
                    this.showSlotPickerModal = false;
                    collection.userNFTs = collection.userNFTs.filter(c => c.id !== slotData.tokenId * 1 && c
                        .tokenId !== slotData.tokenId);
                    collection.count--;
                    await tx.wait(1);
                    await this.getPlotInventory();
                    await this.getUserNFTCollections();
                    await this.refreshPlot(this.plot);
                } catch (err) {
                    await this.getUserNFTCollections();
                    this.handleError(err);
                }
                this.$toast.dismiss(toast);
            },

            async withdrawNFTFromSlot(plot, slot) {
                let toast = undefined;
                try {
                    const isEmitting = await this.plotEmitterContract.isEmitting(plot.plot_type, plot.token_id * 1);
                    if (isEmitting) throw 'Emitter is running!';
                    const tx = await this.plotInventoryContract.withdrawAsset(plot.plot_type, plot.token_id, slot);
                    toast = this.createLoaderToast("Pending - Withdraw NFT");
                    await tx.wait(1);
                    await this.refreshPlot(plot);
                    await this.getPlotInventory();
                    await this.getUserNFTCollections();
                } catch (err) {
                    this.handleError(err);
                }
                this.$toast.dismiss(toast);
            },

            async getPlotInventory() {
                const plotInventory = await this.plotInventoryContract.getPlotInventory(this.plot.plot_type, this
                    .plot.token_id * 1);

                this.inventorySlots = [];

                plotInventory.forEach(async (slot, index) => {
                    let image = "";

                    let newSlot = {
                        token: slot.tokenAddress,
                        tokenId: slot.tokenId * 1,
                        attributeBonusString: "",
                        image: "/images/LOADING.png",
                        loading: true,
                        index: index
                    };

                    //create a string containing all the bonuses provided by the nft
                    let bonusString = "",
                        values = 0;
                    for (let i = 0; i < 4; i++) {
                        if (!slot.modifierValue[i] || slot.modifierValue[i] * 1 === 0) continue;
                        if (window.innerWidth > 512) {
                            bonusString +=
                                `${values > 0 ? '; ' : ''} +${slot.modifierValue[i] * 1} ${this.attributes[slot.modifiedAttribute[i]]}`;
                        } else {
                            bonusString +=
                                `${values > 0 ? '; ' : ''} +${slot.modifierValue[i] * 1} ${this.attributes[slot.modifiedAttribute[i]][0]}`;
                        }
                        values++;
                    }
                    newSlot.attributeBonusString = bonusString;
                    this.inventorySlots.push(newSlot);
                    this.inventorySlots.sort((a, b) => a.index > b.index ? 1 : a.index < b.index ? -1 :
                        0);

                    if (slot.tokenAddress * 1 !== 0) {
                        const collection = this.collections.filter(c => c.address.toLowerCase() === slot
                            .tokenAddress.toLowerCase())[0];

                        if (collection.name === "DFK Heroes") {
                            newSlot.image = collection.image;
                        } else {
                            new Promise(async (resolve, reject) => {
                                const nft = await this.fetchUserNFTs(collection.metadata, [
                                    slot
                                    .tokenId *
                                    1
                                ]);
                                newSlot.image = nft[0].image;
                                resolve();
                            });
                        }
                    }
                });
            },

            async getPlotData() {
                const soilTypes = ['Clay', 'Loam', 'Sand', 'Silt'];
                const plotData = await this.contract.getPlotData(this.plot.plot_type, this.plot.token_id * 1);
                this.plotData = {
                    crimeRate: plotData.crimeRate * 1,
                    crimeRateBase: plotData.crimeRateBase * 1,
                    defence: plotData.defence * 1,
                    fertility: plotData.fertility * 1,
                    fertilityBase: plotData.fertilityBase * 1,
                    level: plotData.level * 1,
                    levelBase: this.plot.levelBase * 1,
                    plotId: plotData.plotId * 1,
                    soilType: soilTypes[plotData.soilTypeBase * 1],
                    levelUpCost: plotData.levelUpCost / 10 ** 18,
                    treasury: plotData.amountOwnedByPlot / 10 ** 18
                };

                this.emitterStarted = await this.plotEmitterContract.isEmitting(this.plot.plot_type, this.plot
                    .token_id * 1);
                this.emissions = !this.emitterStarted ? 0 : await this.plotEmitterContract
                    .calculateClaimableEmissions(this.plot.plot_type,
                        this.plot.token_id * 1) / 10 ** 18;
                this.unlockedEmissions = await this.plotEmitterContract.getUnlockedBalance() / 10 ** 18;
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
                    await this.refreshPlot(plot);
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
                    plot.isEmitting = !isEmitting;
                    await this.getPlotData();
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
                    await this.getPlotData();
                } catch (err) {
                    this.handleError(err);
                }
                this.$toast.dismiss(toast);
            },

            async refreshPlot(plot) {
                await this.getPlotData();
                this.calculatePlotEmissionRate(this.plotData);
                this.calculatePlotEmissionBonus(this.plotData);
                this.keys.emitter++;
            },

            getPlotOwner(owner) {
                if (!owner || owner.length < 10) return "Couldn't load owner.";
                return owner.substring(0, 5) + "..." + owner.substring(owner.length - 5, owner.length);
            },

            async prepareSlotPickerModal(slot) {
                try {
                    if (this.inventorySlots[slot].token * 1 !== 0) return;
                    const isEmitting = await this.plotEmitterContract.isEmitting(this.plot.plot_type, this.plot
                        .token_id * 1);
                    if (isEmitting)
                        if (isEmitting) throw 'Emitter is running!';;

                    this.slotIndex = slot;
                    this.showSlotPickerModal = true;
                } catch (err) {
                    this.handleError(err);
                }
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
                const baseLevel = plot.levelBase,
                    level = plot.level;
                let emissionBonus = fertility * this.emissionBaseRate + (level - baseLevel) * this
                    .emissionBaseRate;
                this.emissionsBonus = Math.max(0, emissionBonus);
                return this.emissionBonus;
            },

            calculatePlotEmissionRate(plot) {
                const fertility = Math.floor(plot.fertility / 3);
                const level = plot.level * 1;
                const crime = plot.crimeRate <= plot.defence ? 0 : Math.max(0, Math.floor((plot.crimeRate - plot
                    .defence) / 2));
                let emissionRate = (1 + level + fertility - crime) * this.emissionBaseRate;

                this.emissionsPerDay = Math.max(1, emissionRate);
                return this.emissionsPerDay;
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

    .plot-slot.dfk {
        width: 80px;
        height: 80px;
        background-image: url("/images/dfkHeroFrame.png");
        background-repeat: no-repeat;
        background-size: cover;
        border: 2px solid #36363600;
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

        .plot-slot.dfk {
            display: none;
        }
    }

    .plot-slot:hover {
        opacity: 1;
    }

    .plot-slot.empty::not(.dfk) {
        background-color: #b8b8b811;
    }
</style>