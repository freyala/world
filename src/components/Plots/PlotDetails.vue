<template>
    <div class='w-8/10 h-full bg-dark overflow-x-hidden overflow-y-auto pb-28' style='background-color: #222222; right: -0.75rem'>
        <!--PLOT HEADER-->
        <div class='flex px-12 xl:w-8/10 w-full mx-auto mt-12' style='height: 375px'>
            <!--PLOT-->
            <div class='relative w-4/10 h-full mr-6'>
                <img class="w-full h-full rounded-xl" src="/images/plots/base/0.png" alt="Base land">
                <img class="absolute top-0 left-0 w-full h-full rounded-xl"
                    :src="`/images/plots/soil_type/${plot.soil_type}.png`" alt="Soil Type">
                <img class="absolute top-0 left-0 w-full h-full rounded-xl"
                    :src="`/images/plots/level/${plot.level + plot.level_buff}.png`" alt="Level">
                <img class="absolute top-0 left-0 w-full h-full rounded-xl"
                    :src="`/images/plots/fertility/${plot.fertility + plot.fertility_buff}.png`" alt="Fertility">
                <img class="absolute top-0 left-0 w-full h-full rounded-xl"
                    :src="`/images/plots/crime/${plot.crime_rate + plot.crime_rate_buff}.png`" alt="Crime">
            </div>

            <!--PLOT ATTRIBUTES-->
            <div class='w-6/10 ml-6 h-full rounded-xl p-6 mb-12 dark-panel'>
                <h2 class='text-3xl mb-2'>Plot #{{ plot.token_id }}</h2>
                <p class='text-white text-sm opacity-30 mb-6'>
                    Owned by 0x..1234
                </p>
                <p class='text-white text-xl opacity-80 mb-2'>
                    Fertility
                </p>
                <p class='text-xl mb-2'>
                    {{ plot.fertility }} (+0)
                </p>
                <p class='text-white text-xl opacity-80 mb-2'>
                    CRIME
                </p>
                <p class='text-xl mb-4'>
                    {{ plot.crime_rate }} (+0)
                </p>
                <hr class='my-6' style='color: #00000077' />
                <div class='w-full h-auto flex flex-row justify-start items-center'>
                    <p class='text-white opacity-80 text-xl w-3/10'>
                        Level
                    </p>
                    <p class='text-xl w-1/10'>
                        {{ plot.level }}
                    </p>
                    <p class='w-3/10 xya-btn text-center mx-4'>
                        Upgrade
                    </p>
                    <p class='w-3/10 xya-btn text-center mx-4'>
                        Downgrade
                    </p>
                </div>
            </div>
        </div>
        <!--PLOT EMITTER-->
        <div class='flex flex-col px-12 xl:w-8/10 w-full mx-auto h-auto mt-12'>
            <h2 class='w-full text-white text-3xl opacity-80 mb-4'>
                Emitter
            </h2>
            <div class='w-full h-full rounded-xl px-8 py-6 dark-panel'>
                <div class='w-full h-auto flex flex-row justify-start items-center mb-2'>
                    <p class='text-white text-xl opacity-80  w-3/10'>
                        Emission Rate
                    </p>
                    <p class='text-xl w-5/10'>
                        6 (+3) XYA / Hour
                    </p>
                    <div class='w-2/10 mx-4'></div>
                </div>
                <p class='text-white text-sm opacity-40'>
                    120 XYA / Day
                </p>
                <hr class='my-6' style='color: #00000055' />
                <div class='w-full h-auto flex flex-row justify-start items-center mb-2'>
                    <p class='text-white text-xl opacity-80 w-3/10'>
                        Treasury
                    </p>
                    <p class='text-xl w-5/10'>
                        1250 XYA
                    </p>
                    <div class='w-2/10 mx-4'></div>
                </div>
                <p class='text-white text-sm opacity-40 mb-4'>
                    Some Info
                </p>
                <div class='w-full h-auto flex flex-row justify-start items-center'>
                    <p class='text-white text-xl opacity-80 w-3/10'>
                        Emitted
                    </p>
                    <p class='text-xl w-5/10'>
                        24 XYA
                    </p>
                    <p class='w-2/10 xya-btn text-center mx-4'>
                        Collect
                    </p>
                </div>
            </div>
        </div>

        <!--PLOT SLOTS-->
        <div class='flex flex-col px-12 xl:w-8/10 w-full  mx-auto h-auto mt-12'>
            <h2 class='w-full text-white text-3xl opacity-80 mb-4'>
                Plot Slots
            </h2>
            <div v-for='i in 3' :key='i' class='w-full h-full rounded-xl my-2 pr-12 pl-8 py-4 dark-panel'>
                <div class='w-full h-auto flex flex-row justify-start items-center'>
                    <div class='plot-slot w-2/10 empty rounded-xl mr-12'>

                    </div>
                    <div class='w-7/10 h-full flex-col'>
                        <h2 class='text-white h-full text-xl opacity-80'>Slot {{i}}</h2>
                        <p class='text-white h-full opacity-30 text-sm'>Empty</p>
                    </div>
                    <div class='w-2/10 text-center text-xl xya-btn h-full'>
                        Add NFT
                    </div>
                </div>
            </div>

        </div>

        <!--PLOT RAIDS-->
        <div class='flex flex-col px-12 xl:w-8/10 w-full  mx-auto h-auto mt-12'>
            <h2 class='w-full text-white text-3xl opacity-80 mb-4'>
                Plot Raids
            </h2>
            <div class='w-full h-full rounded-xl my-2 py-4 dark-panel'>
                <div class='w-full h-auto flex flex-col justify-start items-center'>
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
    </div>
</template>

<script>
    export default {
        name: 'Casino',
        props: {
            plot: {
                type: Object,
                default: ""
            }
        },
        mounted() {
            console.log(this.plot);
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
        border: 2px solid #43ac6b;
        opacity: 0.6;
        cursor: pointer;
    }

    .plot-slot:hover{
        opacity: 1;
    }

    .plot-slot.empty{
        background-color: #43ac6b11;
    }
</style>