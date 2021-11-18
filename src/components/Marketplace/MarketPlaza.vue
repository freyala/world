<template>
    <div class='w-full h-full p-4 flex flex-row mt-2'>
        <div class='w-3/12 h-full'>
            <div class="w-full flex mt-4">
                <div v-on:click='goBack()' class="absolute top-0 left-0 p-3 md:p-8 cursor-pointer">
                    <i class="fas fa-long-arrow-alt-left"></i> Back to markets
                </div>
                <div class="w-full flex mx-auto">
                    <select class="w-9/12 border border-yellow py-2 px-4 bg-dark" name="Marketplace" id="marketplace">
                        <option>Filter</option>
                    </select>
                </div>
            </div>
        </div>
        <div class='p-4 w-9/12 h-full'>
            <div class='w-full flex mb-10'>
                <h2 class='text-2xl mt-1 mr-8'>Sales</h2>
                <h2 class='text-2xl mt-1 mr-8 opacity-25'>My Collection (0)</h2>
                <h2 class='text-2xl mt-1 ml-auto'>New Listing</h2>
            </div>
            <div class='w-full h-full grid market-plaza'>
                <MarketPlazaItem class='m-2' v-for='(item, index) in 13' :key='index'></MarketPlazaItem>
            </div>
        </div>
    </div>
</template>

<script>
    import MarketPlazaItem from './MarketPlazaItem';

    import { mapGetters, mapActions } from "vuex";
    import { ethers } from "ethers";

    export default {
        name: 'MarketPlaza',

        components: {
            MarketPlazaItem
        },

        props: {
            tokenAddress: {
                type: String,
                default: ''
            },
        },

        data() {
            return {

            };
        },

        methods: {
            goBack() {
                this.$emit('goBack');
            }
        },

        computed: {
            ...mapGetters(["metaMaskAccount", "metaMaskWallet"]),
        }
    }
</script>

<style>
    .market-plaza{
        display: grid;
        grid-column-gap: 0px;
        grid-row-gap: 20px;
        grid-template-columns: auto auto auto auto;
    }
</style>