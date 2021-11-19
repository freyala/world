<template>
    <div class='w-full h-full p-4 flex flex-row mt-2'>
        <div class='w-3/12 h-full'>
            <div class="w-full flex flex-col mt-4">
                <div v-on:click='goBack()' class="absolute top-0 left-0 p-3 md:p-8 cursor-pointer">
                    <i class="fas fa-long-arrow-alt-left"></i> Back to markets
                </div>
                <div class='mb-8'>
                    <h2 class='text-2xl'>Filter by attribute</h2>
                </div>
                <div v-for='(attribute, index) in marketAttributes' :key='index' class="w-full mx-auto mb-2">
                    <div class='mb-1'>
                        {{ attribute.key }}
                    </div>
                    <select v-on:change='applyMarketFilters()' v-model='marketSelectedFilters[index]'
                        class="w-9/12 border border-yellow py-2 px-4 bg-dark">
                        <option v-bind:value='"None"'>None</option>
                        <option v-bind:value='item' v-for='(item, itemIndex) in attribute.values' :key='itemIndex'>
                            {{ item }}</option>
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
                <MarketPlazaItem class='m-2 flex flex-col' v-for='(item, index) in marketTokens' :key='index'>
                    <div class='card-header' slot='header'>
                        <img v-bind:src='getListingImage(item.nft.tokenId)' />
                    </div>
                    <div class='px-1 card-body' slot='body'>
                        <div class='mt-2 w-full ml-2 mr-2 flex opacity-50'>
                            <div class='w-8/12'> {{market.collectionName}} </div>
                            <div class='w-4/12'>Price</div>
                        </div>
                        <div class='ml-2 w-full ml-2 mr-2 flex'>
                            <div class='w-8/12'>#{{ item.nft.tokenId }}</div>
                            <div class='w-4/12 text-white'>{{ item.price / (10 ** 18)}} XYA</div>
                        </div>
                        <div v-if='false' class='w-full mt-2 ml-2 mr-2 flex text-white opacity-50'>
                            <div class='w-8/12 text-right mr-2 my-auto mt-1 text-xs'>Last </div>
                            <div class='w-4/12'>10 XYA</div>
                        </div>
                    </div>
                    <div slot='footer' class='card-footer mx-2 p-2 mt-auto flex justify-center'>
                        <button v-on:click='buyMarketToken(item)' type="button"
                            class="w-9/12 rounded-lg border border-primary-alt bg-transparent hover:bg-primary-alt hover:text-white px-0 py-0 min-h-12">
                            Buy
                        </button>
                    </div>
                </MarketPlazaItem>
            </div>
        </div>
    </div>
</template>

<script>
    const GRAPH_API = "http://marketplace-api.freyala.com:8080/graphql";
    const ONE_TOKEN = "0x0000000000000000000000000000000000000000";
    const FREYS = "https://frey.freyala.com/images/";

    import MarketPlazaItem from './MarketPlazaItem';

    import {
        mapGetters,
        mapActions
    } from "vuex";
    import {
        ethers
    } from "ethers";

    import * as FilterQuery from "../../plugins/graphql/marketplace/filter";
    import * as AttributeQuery from "../../plugins/graphql/marketplace/attributes";

    export default {
        name: 'MarketPlaza',

        components: {
            MarketPlazaItem
        },

        props: {
            contract: {
                type: Object,
                default: undefined
            },
            market: {
                type: Object,
                default: undefined
            },
        },

        data() {
            return {
                marketAttributes: [],
                marketSelectedFilters: [],
                marketTokens: [],
            };
        },

        async mounted() {
            await this.fetchMarketAttributes();
            await this.fetchMarketSales();
        },

        methods: {
            goBack() {
                this.$emit('goBack');
            },

            generateMarketFilterQuery() {
                let query = [];

                for (let i = 0; i < this.marketAttributes.length; i++) {
                    if (this.marketSelectedFilters[i] === 'None') continue;

                    query.push({
                        key: this.marketAttributes[i].key,
                        value: this.marketSelectedFilters[i]
                    });
                }

                let strQuery = JSON.stringify(query);
                strQuery = strQuery.replaceAll('"key"', 'key').replaceAll('"value"', 'value');

                return strQuery;
            },

            getListingImage(id) {
                return FREYS + id + ".png";
            },

            async buyMarketToken(token) {
                console.log([token.nft.token, token.nft.tokenId, token.currency.id, token.price]);
                try {
                    const tx = await this.contract.buy(token.nft.token, token.nft.tokenId, token.currency.id, token
                        .price, {
                            gasPrice: 100000000000,
                            gasLimit: 1000000
                        });
                } catch (err) {
                    console.error(err);
                }
            },

            async applyMarketFilters() {
                const query = this.generateMarketFilterQuery();

                const result = await this.$http.post(GRAPH_API, {
                    query: FilterQuery.ApplyMarketFilters(query)
                });
            },

            async fetchMarketAttributes() {
                const result = await this.$http.post(GRAPH_API, {
                    query: AttributeQuery.FetchMarketAttributes(this.market.token)
                });

                this.marketAttributes = result.data.data.markets[0].attributes;

                for (let i = 0; i < this.marketAttributes.length; i++) {
                    this.marketSelectedFilters.push("None");
                }
            },

            async fetchMarketSales() {
                const result = await this.$http.post(GRAPH_API, {
                    query: FilterQuery.FetchMarketSales(this.market.token)
                });

                this.marketTokens = result.data.data.sellOrders;
            }
        },

        computed: {
            ...mapGetters(["metaMaskAccount", "metaMaskWallet"]),
        }
    }
</script>

<style>
    .market-plaza {
        display: grid;
        grid-column-gap: 0px;
        grid-row-gap: 20px;
        grid-template-columns: auto auto auto auto;
    }
</style>