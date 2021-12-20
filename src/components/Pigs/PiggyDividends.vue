<template>
    <div ref='container' class='piggie-menu-container top-0 bottom-0 w-full' style=''>

        <div :key='dividendsKey' class='w-full flex flex-col justify-center mt-4'>
            <div class='w-full flex flex-row justify-center items-center'>
                <h2 class='h-auto w-full ml-12 text-center mt-2 sm:text-2xl text-xl text-white mb-4 z-10'>Piggy Bank
                </h2>

                <div class='cursor-pointer '>
                    <i v-on:click='$emit("close")'
                        class='sm:text-2xl text-xl scale-anim opacity-50 hover:opacity-100 text-white ml-auto mr-6 fa fa-close'></i>
                </div>
            </div>

            <div
                class="w-8/10 h-12 mb-2 py-4 mx-auto rounded-xl bg-white flex flex-col justify-center text-center items-center pink sm:text-lg text-sm cursor-pointer hover:opacity-100">
                <p class='opacity-75'>Current Epoch {{currentEpoch}}</p>
            </div>
            <div
                class="w-8/10 h-12 mb-2 py-4 mb-4 mx-auto rounded-xl flex flex-row text-center justify-center pink sm:text-lg text-sm cursor-pointer hover:opacity-100">
                <div v-on:click='claimAllPiggys(piggyList)'
                    class='w-full rounded-xl pink-border-bottom press-anim text-white mr-2 h-12 bg-white pink'>
                    <p class='opacity-75 pink mt-1'>Claim All</p>
                </div>
                <div v-on:click='registerAllPiggys(piggyList)'
                    class='w-full rounded-xl pink-border-bottom press-anim text-white ml-2 h-12 bg-white pink'>
                    <p class='opacity-75 pink mt-1'>Register All</p>
                </div>
            </div>
            <div v-if='!lastEpochEnded'
                class='w-8/10 h-12 mb-2 py-4 mb-4 mx-auto rounded-xl flex flex-row text-center cursor-pointer'>
                <div v-on:click='endEpoch()'
                    class='w-full rounded-xl pink-border-bottom press-anim text-white h-12 bg-white pink'>
                    <p class='opacity-75 pink mt-2'>End Last Epoch</p>
                </div>
            </div>
            <h2 class='h-auto w-full text-center mt-2 sm:text-2xl text-xl text-white mb-4 pt-2 z-10'>Your Piggies
            </h2>
            <div v-show='!loading' v-for='piggy in piggyList' :key='piggy.id'
                class='sm:w-8/10 w-9/10 h-36 my-6 py-6 pink-border-bottom mx-auto rounded-xl relative bg-white flex flex-col justify-center text-center items-center pink sm:text-lg text-sm cursor-pointer hover:opacity-100'>
                <p
                    class='text-pink sm:text-xl text-sm bg-white sm:-top-8 -top-6 absolute w-5/10 rounded-xl rounded-b-none my-1'>
                    Piggy
                    #{{ piggy.id }}</p>
                <div class='w-full h-full relative flex flex-row'>
                    <div class='flex flex-col items-center mt-auto justify-center h-full w-5/10'>
                        <p class='text-pink text-xs sm:text-sm opacity-75 my-1'>Last Epoch</p>
                        <p class='text-pink text-xs opacity-75'>{{(piggy.claimedLastEpoch / 10 ** 18).toFixed(2)}}</p>
                        <p v-on:click='claimDividendsForPiggy(piggy)'
                            class='sm:text-sm text-xs sm:w-7/10 w-full rounded-2xl text-center press-anim cursor-pointer text-white py-1 bg-pink pink-border-bottom border mt-2'>
                            Claim</p>
                    </div>
                    <div class='w-4/10 h-1/5 relative'>
                        <img v-for='(attribute, index) in piggy.attributes' :key='index'
                            class="absolute sm:-top-6 top-0" v-bind:src='getPiggieAttributeImage(attribute)' alt="Pig">
                    </div>
                    <div class='flex flex-col justify-center mt-auto items-center h-full w-5/10'>
                        <p class='text-pink text-xs sm:text-sm opacity-75 my-1'>Current Epoch</p>
                        <p class='text-pink text-xs opacity-75'>{{(piggy.claimedNextEpoch / 10 ** 18).toFixed(2)}}</p>
                        <p v-on:click='registerPiggy(piggy)' v-if='!piggy.isRegistered'
                            class='sm:text-sm text-xs sm:w-7/10 w-full rounded-2xl text-center press-anim cursor-pointer text-white py-1 bg-pink pink-border-bottom border mt-2'>
                            Register</p>
                        <p v-on:click='claimDividendsForPiggy(piggy)' v-else
                            class='sm:text-sm text-xs sm:w-7/10 w-full rounded-2xl text-center opacity-50 text-white py-1 bg-pink border mt-2'>
                            Register</p>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>


<script>
    import PiggyDividends from "../../plugins/artifacts/piggyDividends.json";
    import {
        ethers
    } from "ethers";
    import {
        mapGetters
    } from "vuex";

    export default {
        name: 'PiggyDividends',
        props: {
            show: {
                type: Boolean,
                default: false
            },
            tamagotchiContract: {
                type: Object,
                default: undefined
            },
            piggyList: {
                type: Array,
                default: []
            }
        },
        computed: {
            ...mapGetters([
                'metaMaskAccount',
                'metaMaskWallet'
            ]),
        },
        data() {
            return {
                loading: false,
                contract: undefined,
                currentEpoch: 0,
                currentEpochPiggyCount: 0,
                dividendsKey: 0,
                lastEpochEnded: false
            };
        },
        async mounted() {
            this.contract = await new ethers.Contract(PiggyDividends.address, PiggyDividends.abi, this
                .metaMaskWallet
                .signer);

            await this.getEpochInfo();
            await this.fetchPiggyData(0);

        },
        methods: {

            async getEpochInfo() {
                try {
                    this.currentEpoch = await this.contract.currentEpochNumber();
                    this.currentEpochPiggyCount =
                        1; // await this.contract.pigCountAtEpochNumber(this.currentEpoch);
                } catch (err) {
                    this.$emit('error', err);
                }
            },

            getPiggieAttributeImage(attribute) {
                if (attribute.trait_type === 'Background') return '/pigs/attributes/none.png';
                return `/pigs/attributes/${attribute.trait_type}/${attribute.value}.png`;
            },

            async claimDividendsForPiggy(piggy) {
                try {
                    const tx = await this.contract.claim(piggy.id);
                    await tx.wait(1);
                    this.fetchPiggyData();
                } catch (err) {
                    this.$emit('error', err);
                }
            },

            async registerPiggy(piggy) {
                try {
                    const piggyStatus = await this.tamagotchiContract.isImported(piggy.id);
                    if (!piggyStatus) throw `Piggy #${piggy.id} is not imported!`;
                    const piggyDead = await this.tamagotchiContract.isDead(piggy.id);
                    if (piggyDead) throw `Piggy #${piggy.id} is dead`;

                    const tx = await this.contract.registerPig(piggy.id, {
                        gasPrice: 100000000000,
                        gasLimit: 1000000
                    });
                    await tx.wait(1);
                    piggy.registered = true;
                    this.fetchPiggyData();
                } catch (err) {
                    this.$emit('error', err);
                }
            },

            async claimAllPiggys(piggyList) {
                const piggyIds = [];
                piggyList.forEach(c => piggyIds.push(c.id));

                try {
                    const tx = await this.contract.bulkClaimPig(piggyIds, {
                        gasPrice: 100000000000,
                        gasLimit: 1000000
                    });
                    await tx.wait(1);
                    await this.fetchPiggyData();
                } catch (err) {
                    console.error(err);
                }
            },

            async registerAllPiggys(piggyList) {
                const piggyIds = [];
                piggyList.forEach(piggy => {
                    if(!piggy.isDead && !piggy.isRegistered) piggyIds.push(piggy.id);
                });

                try {
                    const tx = await this.contract.bulkRegisterPig(piggyIds, {
                        gasPrice: 100000000000,
                        gasLimit: 1000000
                    });
                    await tx.wait(1);
                    await this.fetchPiggyData();
                } catch (err) {
                    this.$emit('error', "Couldn't register one or more piggies.");
                }
            },

            async endEpoch() {
                try {
                    const tx = await this.contract.endLastEpoch();
                    await tx.wait(1);
                    await this.fetchPiggyData();
                } catch (err) {
                    this.$emit('error', "The epoch was ended by another player.");
                }
            },

            async fetchPiggyData() {
                this.loading = true;
                this.lastEpochEnded = await this.contract.lastEpochEnded();
                for (let i = 0; i < this.piggyList.length; i++) {
                    try {
                        const isRegistered = await this.contract.registered(this.piggyList[i].id);
                        const claimedLastEpoch = await this.contract.claimable(this.piggyList[i].id);
                        const claimedNextEpoch = await this.contract.claimableNextEpoch(this.piggyList[i].id);

                        this.piggyList[i].isRegistered = isRegistered;
                        this.piggyList[i].claimedLastEpoch = claimedLastEpoch;
                        this.piggyList[i].claimedNextEpoch = claimedNextEpoch;
                    } catch (err) {
                        this.piggyList[i].isRegistered = false;
                        this.piggyList[i].claimedLastEpoch = 0;
                        this.piggyList[i].claimedNextEpoch = 0;
                    }
                }
                this.dividendsKey++;
                this.loading = false;
            }
        }
    }
</script>

<style scoped>
    .menu-enter-active,
    .menu-leave-active {
        transform: translateX(0);
        opacity: 1;
        transition: all .35s;
    }

    .menu-enter,
    .menu-leave-to {
        transforM: translateX(-200px);
        opacity: 0.25;
    }
</style>