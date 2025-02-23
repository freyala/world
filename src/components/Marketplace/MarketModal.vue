<template>
    <div>
        <div v-on:click='closeModal()' class='fixed top-0 bottom-0 right-0 left-0'
            style='background-color: rgba(0,0,0,0.5); z-index: 50;'></div>
        <div class='fixed bg-primary-bg absolute bottom-0 left-4 text-primary-head pb-2h-auto shadow-xl details-modal flex flex-col overflow-y-auto'
            style='border: 1px solid rgba(84, 182, 122, 1); z-index: 100'>
            <div class='w-full h-auto md:h-3/6 flex md:flex-row flex-col z-5'>
                <div class='relative md:w-5/12 w-full p-4 flex h-full' style="min-height: 150px">
                    <img v-bind:src='image' class='w-full h-full absolute bottom-0 left-0 text-primary-head opacity-80' style="object-fit: cover" />
                    <div v-if='false'
                        class="absolute top-9 right-4 hover:text-primary-head cursor-pointer hover:bg-detail-bg bg-white py-2 px-4 rounded-l-xl text-sm uppercase text-dark">
                        <strong>Share</strong>
                    </div>
                </div>
                <div class='md:w-8/12 w-full p-4 md:h-full h-full'>
                    <slot name='header-content'>

                    </slot>
                </div>
            </div>
            <div class='w-full p-4 h-full'>
                <div style='background-color: #e4e3bb' v-bind:class='{"rounded-b-none": expandAttributes}'
                    class='w-full p-4 flex items-center transition-colors h-10 border border-detail-bg bg-transparent hover:bg-detail-bg hover:text-primary-head'>
                    <div v-on:click='expandAttributes = !expandAttributes' class='w-full flex cursor-pointer'>
                        <h2 class='md:text-xl text-base'>Attributes</h2>
                        <span class='ml-auto md:text-base text-sm mt-1 md:mt-0'>Expand</span>
                    </div>
                </div>
                <div v-if='expandAttributes' style='background-color: #e4e3bb'
                    class='flex flex-wrap flex-col md:flex-row -none px-4 py-4 h-auto w-full'>
                    <div class='md:w-6/12 w-full h-9 md:h-12 flex md:text-base text-sm md:justify-start justify-evenly md:text-left text-center'
                        v-for='(attribute, index) in item.attributes' :key='index'>
                        <div class='w-9/12'>
                            {{ attribute.trait_type }}:
                        </div>
                        <div class='w-full text-primary-head md:mt-1 mt-0 text-sm'>
                            {{ attribute.value }}
                        </div>
                    </div>
                </div>
                <div style='background-color: #e4e3bb' v-bind:class='{"rounded-b-none": expandSales}'
                    class='w-full mt-4 p-4 flex items-center transition-colors h-10 border border-detail-bg bg-transparent hover:bg-detail-bg hover:text-primary-head'>
                    <div v-on:click='expandSales = !expandSales' class='w-full flex cursor-pointer'>
                        <h2 class='md:text-xl text-base'>Sale History</h2>
                        <span class='ml-auto md:text-base text-sm mt-1 md:mt-0'>Expand</span>
                    </div>
                </div>
                <div v-if='expandSales' style='background-color: #e4e3bb'
                    class='flex flex-wrap px-4 py-2 h-auto w-full -none'>
                    <div v-if='item.saleHistory.length === 0' class='w-full'>
                        No sales have been registered for this item.
                    </div>
                    <div v-if='item.saleHistory.length > 0'
                        class='flex w-full px-2 py-1 md:text-left text-center items-center md:text-xl sm:text-base text-xs justify-evenly'>
                        <div class='w-full'>
                            Seller
                        </div>
                        <div class='w-full'>
                            Buyer
                        </div>
                        <div class='w-full'>
                            Price
                        </div>
                        <div class='w-full'>
                            Date
                        </div>
                    </div>
                    <div
                        class='flex w-full md:text-left text-center sm:text-sm text-xs md:text-base items-center flex-col'>
                        <div v-for='sale in item.saleHistory' :key='sale.timestamp'
                            class='flex w-full py-2 px-4 items-center justify-evenly'>
                            <div class='w-full text-primary-head opacity-75'>
                                {{ getUserId(sale.seller.id) }}
                            </div>
                            <div class='w-full text-primary-head opacity-75'>
                                {{ getUserId(sale.buyer.id) }}
                            </div>
                            <div class='w-full text-primary-head'>
                                {{ (sale.price / 10 ** 18).toFixed(2) }} {{ getTokenSymbol(sale.currency.id) }}
                            </div>
                            <div class='w-full ml-2 text-primary-head opacity-75'>
                                {{ getDate(sale.timestamp) }}
                            </div>
                        </div>
                    </div>
                </div>
                <div style='background-color: #e4e3bb' v-bind:class='{"rounded-b-none": expandDetails}'
                    class='w-full p-4 flex items-center mt-4 transition-colors h-10 border border-detail-bg bg-transparent hover:bg-detail-bg hover:text-primary-head'>
                    <div v-on:click='expandDetails = !expandDetails' class='w-full flex cursor-pointer'>
                        <h2 class='md:text-xl text-base'>Auctions</h2>
                        <span class='ml-auto md:text-base text-sm mt-1 md:mt-0'>Expand</span>
                    </div>
                </div>
                <div v-if='expandDetails' style='background-color: #e4e3bb'
                    class='flex flex-wrap px-4 py-4 h-auto w-full -none'>
                    <div class='w-full'>
                        <template v-if='item.bidHistory.length === 0'>No auctions have been registered for this
                            item.</template>
                    </div>
                    <div v-if='item.bidHistory.length > 0'
                        class='flex w-full px-2 py-1 md:text-left sm:text-base text-xs text-center items-center md:text-xl justify-evenly'>
                        <div class='w-full'>
                            Seller
                        </div>
                        <div class='w-full'>
                            Bidder
                        </div>
                        <div class='w-full'>
                            Bid
                        </div>
                        <div class='w-full'>
                            Date
                        </div>
                    </div>
                    <div
                        class='flex w-full md:text-left text-center sm:text-sm text-xs md:text-base items-center flex-col'>
                        <div v-for='sale in item.bidHistory' :key='sale.timestamp'
                            class='flex w-full py-2 px-4 items-center justify-evenly'>
                            <div class='w-full text-primary-head opacity-75'>
                                {{ getUserId(sale.seller.id) }}
                            </div>
                            <div class='w-full text-primary-head opacity-75'>
                                {{ getUserId(sale.highestBidder.id) }}
                            </div>
                            <div class='w-full text-primary-head'>
                                {{ (sale.highestBid / 10 ** 18).toFixed(2) }} {{ getTokenSymbol(sale.currency.id) }}
                            </div>
                            <div class='w-full ml-2 text-primary-head opacity-75'>
                                {{ getDate(sale.timestamp) }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
    import {
        mapGetters
    } from "vuex";

    export default {
        name: 'MarketModal',
        props: {
            item: {
                type: Object,
                default: undefined
            },
            image: {
                type: String,
                default: ''
            },
            tokens: {
                type: Array,
                default: []
            }
        },
        data() {
            return {
                expandAttributes: false,
                expandSales: false,
                expandDetails: false,
            };
        },
        methods: {
            onClick() {
                this.$emit('cardClick');
            },

            closeModal() {
                this.$emit('closeModal');
            },

            getUserId(id) {
                if (!id) return '';
                return '...' + id.slice(id.length - 5);
            },

            getTokenSymbol(id) {
                const token = this.tokens.filter(c => c.value === id)[0];
                if (!token) return '';
                return token.key;
            },

            getDate(timestamp) {
                const date = new Date(timestamp * 1000);
                var year = date.getFullYear();
                var month = ("0" + (date.getMonth() + 1)).slice(-2);
                var day = ("0" + date.getDate()).slice(-2);
                return month + '/' + day + '/' + year;
            },
        },

        computed: {
            ...mapGetters(["metaMaskAccount", "metaMaskWallet"]),
        },
    }
</script>

<style>
    .details-modal {
        position: fixed;
        top: 15%;
        bottom: 15%;
        left: 27.5%;
        right: 27.5%;
    }

    @media only screen and (max-width: 1024px) {
        .details-modal {
            position: fixed;
            top: 15%;
            bottom: 15%;
            left: 15%;
            right: 15%;
        }
    }

    @media only screen and (max-width: 768px) {
        .details-modal {
            position: fixed;
            top: 15%;
            bottom: 15%;
            left: 5%;
            right: 5%;
        }
    }

    @media only screen and (max-width: 512px) {
        .details-modal {
            position: fixed;
            top: 10%;
            bottom: 10%;
            left: 5%;
            right: 5%;
        }
    }
</style>