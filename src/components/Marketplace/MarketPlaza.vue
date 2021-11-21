<template>
    <div class='w-full h-full py-4 flex flex-row mt-2'>
        <div v-on:click='goBack()' class="absolute top-0 left-0 p-4 cursor-pointer">
            <i class="fas fa-long-arrow-alt-left"></i> Back to markets
        </div>
        <div class='w-3/12 h-full rounded-lg relative bg-light' style='height: calc(60vh - 80px);'>
            <div class='text-center flex flex-col justify-center items-center mt-4 pb-4 shadow-xl'
                style='height: 80px;'>
                <div class='w-full text-center text-xl mb-4'>Filter</div>
                <div class='w-9/12 mx-auto flex h-full'>
                    <button v-on:click='resetMarketFilters()' type="button"
                        class="w-9/12 mx-2 rounded-lg hover:text-white px-0 py-0 min-h-9">
                        Reset
                    </button>
                    <button v-on:click='initiateMarketSearch()' type="button"
                        class="w-9/12 mr-2 rounded-lg border border-primary-alt bg-transparent hover:bg-primary-alt hover:text-white px-0 py-0 min-h-9">
                        Apply
                    </button>
                </div>
            </div>
            <div :key='keys.filters' class="text-center overflow-y-auto h-full flex flex-col mt-4 bg-light">
                <div v-for='(attribute, index) in marketAttributes' :key='index' class="w-full mb-2">
                    <div class='mb-1'>
                        {{ attribute.key }}
                    </div>
                    <select v-model='marketSelectedFilters[index]'
                        class="w-9/12 border rounded-lg border-yellow py-2 px-4 bg-dark"
                        v-bind:class='{"text-white": marketSelectedFilters[index] !== ""}'>
                        <option v-bind:value='""'>None</option>
                        <option v-bind:value='item' v-for='(item, itemIndex) in attribute.values' :key='itemIndex'>
                            {{ item }}</option>
                    </select>
                </div>

            </div>
        </div>
        <div class='p-4 w-9/12' style='height: 60vh; overflow-y: auto; overflow-x:hidden'>
            <div class='w-11/12 flex mx-10 flex select-none'>
                <h2 v-on:click='marketTab = "SALES"' v-bind:class='{"opacity-50": marketTab !== "SALES"}'
                    class='text-2xl mt-1 mr-8 cursor-pointer'>Sales</h2>
                <h2 v-on:click='marketTab = "AUCTIONS"' v-bind:class='{"opacity-50": marketTab !== "AUCTIONS"}'
                    class='text-2xl mt-1 mr-8 cursor-pointer'>Auctions</h2>
                <h2 v-on:click='marketTab = "COLLECTION"' v-bind:class='{"opacity-50": marketTab !== "COLLECTION"}'
                    class='text-2xl mt-1 mr-8 cursor-pointer'>My Collection
                    ({{ userTokens.length }})</h2>
                <div class='ml-auto w-3/12 flex'>
                    <select v-on:change='marketSort()' v-model='marketSortBy'
                        class="w-full border rounded-lg border-yellow py-2 px-4 bg-dark">
                        <option v-bind:value='""'>Sort By</option>
                        <option value="price-ASC">Price ascending</option>
                        <option value="price-DESC">Price descending</option>
                        <option value="id-ASC">ID ascending</option>
                        <option value="id-DESC">ID descending</option>
                    </select>
                </div>
            </div>
            <hr class='m-5' />
            <!-- SALES / AUCTION -->
            <div v-show='marketTab === "SALES"' class='w-full h-full mx-6 market-plaza'>
                <div class='text-xl p-4 opacity-75' v-if='marketSales.length === 0'>There are no sales.</div>
                <MarketPlazaItem class='mt-2 mx-4 mb-6 flex flex-col' v-for='(item, index) in marketSales' :key='index'>
                    <div v-on:click='showMarketCardModal(item)' class='market-item-header' slot='header'>
                        <img v-bind:src='getListingImage(item.tokenId)' />
                    </div>
                    <div class='px-1 market-item-body' slot='body'>
                        <div class='mt-2 w-full ml-2 mr-2 flex opacity-50'>
                            <div class='w-8/12'> {{market.collectionName}} </div>
                            <div class='w-4/12'>Price</div>
                        </div>
                        <div class='ml-2 w-full ml-2 mr-2 flex'>
                            <div class='w-8/12'>#{{ item.tokenId }}</div>
                            <div class='w-4/12 text-white'>{{ item.order.price / (10 ** 18)}} XYA</div>
                        </div>
                        <div v-if='false' class='w-full mt-2 ml-2 mr-2 flex text-white opacity-50'>
                            <div class='w-8/12 text-right mr-2 my-auto mt-1 text-xs'>Last </div>
                            <div class='w-4/12'>10 XYA</div>
                        </div>
                    </div>
                    <div slot='footer' class='market-item-footer p-2 mt-auto flex justify-evenly'>
                        <button disabled type="button"
                            class="w-full mx-2 rounded-lg bg-transparent hover:text-white hover:border hover:border-primary-alt px-0 py-0 min-h-12">

                        </button>
                        <button v-on:click='buyMarketToken(item)' type="button"
                            class="w-full mx-2 rounded-lg border border-primary-alt bg-transparent hover:bg-primary-alt hover:text-white px-0 py-0 min-h-9">
                            <span>Buy</span>
                        </button>
                    </div>
                </MarketPlazaItem>
            </div>

            <div v-show='marketTab === "AUCTIONS"' class='w-full h-full mx-6 market-plaza'>
                <div class='text-xl p-4 opacity-75' v-if='marketAuctions.length === 0'>There are no auctions.</div>
                <MarketPlazaItem class='mt-2 mx-4 mb-6 flex flex-col' v-for='(item, index) in marketAuctions'
                    :key='index'>
                    <div v-on:click='showMarketCardModal(item)' class='market-item-header' slot='header'>
                        <img v-bind:src='getListingImage(item.tokenId)' />
                    </div>
                    <div class='px-1 market-item-body' slot='body'>
                        <div class='mt-2 w-full ml-2 mr-2 flex opacity-50'>
                            <div class='w-8/12'> {{market.collectionName}} </div>
                            <div class='w-4/12'>Price</div>
                        </div>
                        <div class='ml-2 w-full ml-2 mr-2 flex'>
                            <div class='w-8/12'>#{{ item.tokenId }}</div>
                            <div class='w-4/12 text-white'>{{item.order.price / (10 ** 18)}} XYA</div>
                        </div>
                        <div v-if='false' class='w-full mt-2 ml-2 mr-2 flex text-white opacity-50'>
                            <div class='w-8/12 text-right mr-2 my-auto mt-1 text-xs'>Last </div>
                            <div class='w-4/12'>10 XYA</div>
                        </div>
                    </div>
                    <div slot='footer' class='market-item-footer p-2 mt-auto flex justify-evenly'>
                        <button disabled type="button"
                            class="w-full mx-2 rounded-lg bg-transparent hover:text-white hover:border hover:border-primary-alt px-0 py-0 min-h-12">

                        </button>
                        <button v-on:click='buyMarketToken(item)' type="button"
                            class="w-full mx-2 rounded-lg border border-primary-alt bg-transparent hover:bg-primary-alt hover:text-white px-0 py-0 min-h-9">
                            <span>BID</span>
                        </button>
                    </div>
                </MarketPlazaItem>
            </div>


            <!-- USER COLLECTION -->
            <div :key='keys.nftCollection' class='w-full h-full mx-6 market-plaza' v-show='marketTab === "COLLECTION"'>
                <div v-if='userTokens.length === 0'>Your collection is empty.</div>
                <MarketPlazaItem class='m-2 mx-4 mb-6 flex flex-col' v-for='(item, index) in userTokens' :key='index'>
                    <div v-on:click='showCollectionCardModal(item)' class='market-item-header' slot='header'>
                        <img v-bind:src='getListingImage(item.tokenId)' />
                    </div>
                    <div class='px-1 market-item-body' slot='body'>
                        <div class='mt-2 w-full ml-2 mr-2 flex opacity-50'>
                            <div class='w-8/12'> {{market.collectionName}} </div>
                            <div class='w-4/12'>Price</div>
                        </div>
                        <div class='ml-2 w-full ml-2 mr-2 flex'>
                            <div class='w-8/12'>#{{ item.tokenId }}</div>
                        </div>
                        <div v-if='false' class='w-full mt-2 ml-2 mr-2 flex text-white opacity-50'>
                            <div class='w-8/12 text-right mr-2 my-auto mt-1 text-xs'>Last </div>
                            <div class='w-4/12'>10 XYA</div>
                        </div>
                    </div>
                    <div slot='footer' class='relative market-item-footer p-2 mt-auto flex justify-evenly'>
                        <button id='collectionMenuButton' v-bind:data-token-id='item.tokenId'
                            v-on:click='showCollectionDropwdown' type="button"
                            class="w-3/12 z-20 mx-2 rounded-lg border bg-transparent hover:text-white hover:border hover:border-primary-alt px-0 py-0 min-h-12">
                            ...
                        </button>
                        <button v-on:click='listNft(item)' type="button"
                            class="w-6/12 mx-2 rounded-lg border border-primary-alt bg-transparent hover:bg-primary-alt hover:text-white px-0 py-0 min-h-9">
                            Sell
                        </button>
                    </div>
                </MarketPlazaItem>
            </div>
        </div>

        <div id='collectionMenu' v-show='modals.collectionMenu' ref='collectionMenu'
            class='fixed border shadow-xl px-6 py-2 text-center bg-light rounded-lg cursor-pointer'>
            <div class='my-4 hover:text-white'>Collect</div>
            <div class='my-4 hover:text-white'>
                Register
            </div>
            <div v-on:click='showSendNftModal()' class='my-4 hover:text-white'>
                Send
            </div>
        </div>

        <!--Collection Card Modal-->
        <div v-if='modals.collectionCard' v-on:click='modals.collectionCard = false'
            class='fixed top-0 bottom-0 right-0 left-0' style='background-color: rgba(0,0,0,0.5); z-index: z-50;'></div>
        <transition name="details">
            <div v-if='modals.collectionCard'
                class='fixed bg-light rounded-2xl h-auto shadow-xl details-modal overflow-y-auto'
                style='border: 1px solid rgba(84, 182, 122, 1); z-index: 100'>
                <div class='w-full h-3/6 flex z-5'>
                    <div class='w-4/12 p-4 flex h-full'>
                        <img v-bind:src='getListingImage(collectionSelectedToken.tokenId)'
                            class='w-full h-full rounded-xl' />
                    </div>
                    <div class='w-8/12 p-4 h-full'>
                        <div class='w-full h-3/6'>
                            <div class='w-full flex h-8'>
                                <h2 class='text-xl opacity-75'>{{ market.collectionName }}</h2>
                                <i v-on:click='modals.collectionCard = false'
                                    class="fas ml-auto fa-times cursor-pointer text-xl"></i>
                            </div>
                            <h2 v-if='collectionSelectedToken' class='text-4xl mb-1'>{{ market.tokenName }}
                                #{{ collectionSelectedToken.tokenId }}</h2>
                            <h2 class='text-xl text-white opacity-50'>Owned by: You</h2>
                        </div>
                        <div class='w-full flex flex-col rounded-xl h-3/6'>
                            <h2 class='text-xl'>List item for sale</h2>
                            <button v-on:click='showCreateMarketSaleModal()' type="button"
                                class="w-4/12 mt-auto rounded-lg border border-primary-alt bg-transparent hover:bg-primary-alt hover:text-white">
                                Fixed Price
                            </button>
                            <button v-on:click='showCreateMarketAuctionModal()' type="button"
                                class="w-4/12 mt-auto rounded-lg border border-primary-alt bg-transparent hover:bg-primary-alt hover:text-white">
                                Auction
                            </button>
                        </div>
                    </div>
                </div>
                <div class='w-full p-4 h-3/6 flex flex-col'>
                    <div style='background-color: #151515'
                        class='w-full p-4 flex items-center transition-colors h-10 rounded-b-none rounded-xl border border-primary-alt bg-transparent hover:bg-primary-alt hover:text-white'>
                        <div class='w-full flex cursor-pointer'>
                            <h2 class='text-xl'>Attributes</h2>
                            <span class='ml-auto'>Expand</span>
                        </div>
                    </div>
                    <div style='background-color: #151515' class='flex flex-wrap px-4 py-4 h-auto w-full'>
                        <div class='w-4/12 h-12 flex' v-for='(attribute, index) in collectionSelectedToken.attributes'
                            :key='index'>
                            <div class='w-9/12'>
                                {{ attribute.trait_type }}:
                            </div>
                            <div class='w-full text-white mt-1 text-sm'>
                                {{ attribute.value }}
                            </div>
                        </div>
                    </div>
                    <div style='background-color: #151515'
                        class='w-full mb-2 mt-4 p-4 flex items-center transition-colors h-10 rounded-lg border border-primary-alt bg-transparent hover:bg-primary-alt hover:text-white'>
                        <div class='w-full flex cursor-pointer'>
                            <h2 class='text-xl'>Sale History</h2>
                            <span class='ml-auto'>Expand</span>
                        </div>
                    </div>
                    <div style='background-color: #151515'
                        class='w-full mb-2 p-4 flex items-center transition-colors h-10 rounded-lg border border-primary-alt bg-transparent hover:bg-primary-alt hover:text-white'>
                        <div class='w-full flex cursor-pointer'>
                            <h2 class='text-xl'>Details</h2>
                            <span class='ml-auto'>Expand</span>
                        </div>
                    </div>
                </div>
            </div>
        </transition>


        <!--Market Card Details-->
        <div v-if='modals.marketCard' v-on:click='modals.marketCard = false' class='fixed top-0 bottom-0 right-0 left-0'
            style='background-color: rgba(0,0,0,0.5); z-index: z-50;'></div>
        <transition name="details">
            <div v-if='modals.marketCard'
                class='fixed bg-light rounded-2xl h-auto shadow-xl details-modal overflow-y-auto'
                style='border: 1px solid rgba(84, 182, 122, 1); z-index: 100'>
                <div class='w-full h-3/6 flex z-5'>
                    <div class='w-4/12 p-4 flex h-full'>
                        <img v-bind:src='getListingImage(marketSelectedToken.tokenId)'
                            class='w-full h-full rounded-xl' />
                    </div>
                    <div class='w-8/12 p-4 h-full'>
                        <div class='w-full h-3/6'>
                            <div class='w-full flex h-8'>
                                <h2 class='text-xl opacity-75'>{{ market.collectionName }}</h2>
                                <i v-on:click='modals.marketCard = false'
                                    class="fas ml-auto fa-times cursor-pointer text-xl"></i>
                            </div>
                            <h2 v-if='marketSelectedToken' class='text-4xl mb-1'>{{ market.tokenName }}
                                #{{ marketSelectedToken.tokenId }}</h2>
                            <h2 class='text-xl text-white opacity-50'>Owned by: 0x71275712515711</h2>
                        </div>
                        <div class='w-full flex flex-col rounded-xl h-3/6'>
                            <h2 class='text-xl'>Current Price</h2>
                            <h2 class='text-2xl mb-4 text-white'>{{ marketSelectedToken.order.price / (10 ** 18)}} XYA
                            </h2>
                            <button v-on:click='listNft(item)' type="button"
                                class="w-4/12 mt-auto rounded-lg border border-primary-alt bg-transparent hover:bg-primary-alt hover:text-white">
                                Buy
                            </button>
                        </div>
                    </div>
                </div>
                <div class='w-full p-4 h-3/6 flex flex-col'>
                    <div style='background-color: #151515'
                        class='w-full mb-2 p-4 flex items-center transition-colors h-10 rounded-lg border border-primary-alt bg-transparent hover:bg-primary-alt hover:text-white'>
                        <div class='w-full flex cursor-pointer'>
                            <h2 class='text-xl'>Attributes</h2>
                            <span class='ml-auto'>Expand</span>
                        </div>
                    </div>
                    <div style='background-color: #151515'
                        class='w-full mb-2 p-4 flex items-center transition-colors h-10 rounded-lg border border-primary-alt bg-transparent hover:bg-primary-alt hover:text-white'>
                        <div class='w-full flex cursor-pointer'>
                            <h2 class='text-xl'>Sale History</h2>
                            <span class='ml-auto'>Expand</span>
                        </div>
                    </div>
                    <div style='background-color: #151515'
                        class='w-full mb-2 p-4 flex items-center transition-colors h-10 rounded-lg border border-primary-alt bg-transparent hover:bg-primary-alt hover:text-white'>
                        <div class='w-full flex cursor-pointer'>
                            <h2 class='text-xl'>Details</h2>
                            <span class='ml-auto'>Expand</span>
                        </div>
                    </div>
                </div>
            </div>
        </transition>



        <window class='w-10/12' height="auto" width="80%" name="send-nft">
            <div class="flex flex-wrap p-6 bg-dark h-full">
                <div class="w-4/5">
                    <div class="text-2xl">Send Nft</div>
                </div>
                <div class="w-1/5 text-right">
                    <i @click="$modal.hide('send-nft')" class="fas fa-times cursor-pointer text-xl"></i>
                </div>
                <div class='mt-4 md:text-base text-sm opacity-75'>
                    <p v-if='collectionSelectedToken' class='mt-1'>Send #{{collectionSelectedToken.tokenId}} to: </p>
                </div>
                <div class="mt-4 flex md:flex-row flex-row w-full items-start justify-start">
                    <input class='w-full text-black px-2' type="text" v-model='nftTransactionTo' />
                    <div class="text-right md:text-center md:w-9/12 w-5/12 mx-2 md:mx-0">
                        <button v-on:click="sendNft()" type="button"
                            class="w-full md:w-10/12 md:text-base text-sm rounded-none border border-primary-alt bg-transparent hover:bg-primary-alt hover:text-white px-2 mx-2 py-0">
                            <span v-if='!loaders.nftSend'>Confirm</span>
                            <span v-else><i class="fas fa-cog fa-spin"></i></span>
                        </button>
                    </div>
                </div>
            </div>
        </window>
    </div>
</template>

<script>
    const GRAPH_API = "http://marketplace-api.freyala.com:8080/graphql";
    const ONE_TOKEN = "0x0000000000000000000000000000000000000000";
    const FREYS = "https://frey.freyala.com/images/";

    import MarketPlazaItem from './MarketPlazaItem';
    import HRC721 from '../../plugins/artifacts/HRC721.json';
    import fromExponential from "from-exponential";

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
                marketNftContract: undefined,
                marketAttributes: [],
                marketSelectedFilters: [],
                marketSales: [],
                marketAuctions: [],
                marketTab: 'SALES',
                marketSortBy: "",
                userTokens: [],
                marketSelectedToken: undefined,
                collectionSelectedToken: undefined,
                keys: {
                    filters: 0,
                    nftCollection: 0
                },
                nftTransactionTo: "",
                nftTransactionFrom: "",
                loaders: {
                    nftSend: false,
                    nftList: false,
                    nftBid: false,
                    fetchUserNft: false,
                    fetchMarketNft: false
                },
                modals: {
                    collectionCard: false,
                    collectionMakeSale: false,
                    collectionMakeAuction: false,
                    collectionMenu: false,
                    marketCard: false,
                }
            };
        },

        async mounted() {
            this.marketNftContract = new ethers.Contract(this.market.token, HRC721.abi, this.metaMaskWallet.signer);

            this.$nextTick(async () => {
                await this.fetchMarketAttributes();
                await this.fetchMarketSales();
                await this.fetchUserNfts();
            });
        },

        methods: {
            goBack() {
                this.$emit('goBack');
            },

            showCollectionCardModal(item) {
                this.collectionSelectedToken = item;
                this.modals.collectionCard = true;
            },

            showMarketCardModal(item) {
                this.marketSelectedToken = item;
                this.modals.marketCard = true;
            },

            showSendNftModal(token) {
                this.$modal.show('send-nft');
            },

            generateMarketFilterQuery() {
                let query = [];

                for (let i = 0; i < this.marketAttributes.length; i++) {
                    if (this.marketSelectedFilters[i] === '') continue;

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

            async fetchUserNfts() {
                const nfts = await this.marketNftContract.tokensOfOwner(this.metaMaskAccount);

                let ids = await nfts.map(async (frey) => {
                    return frey._isBigNumber ? ethers.BigNumber.from(frey._hex).toString() : frey._hex
                });

                await Promise.all(ids)
                    .then(async (listOfIds) => {
                        const userNfts = await this.$http.get(
                            `https://frey.freyala.com/meta/list?items=${listOfIds}`);

                        this.userTokens = userNfts.data;
                        console.log(this.userTokens);
                    });
            },

            async fetchMarketSales() {
                const query = this.generateMarketFilterQuery();

                const result = await this.$http.post(GRAPH_API, {
                    query: FilterQuery.FetchMarketNfts(this.market.token, query)
                });

                this.marketSales = result.data.data.sales;
                this.marketAuctions = result.data.data.auctions;
            },

            async fetchMarketAttributes() {
                const result = await this.$http.post(GRAPH_API, {
                    query: AttributeQuery.FetchMarketAttributes(this.market.token)
                });

                this.marketAttributes = result.data.data.markets[0].attributes;

                for (let i = 0; i < this.marketAttributes.length; i++) {
                    this.marketSelectedFilters.push("");
                }
            },

            async initiateMarketSearch() {
                await this.fetchMarketSales();
                await this.applyCollectionFilters();
            },

            resetMarketFilters() {
                for (let i = 0; i < this.marketSelectedFilters.length; i++) {
                    this.marketSelectedFilters[i] = '';
                }
                this.initiateMarketSearch();
                this.keys.filters++;
            },

            applyCollectionFilters() {},

            hideSendNftModal() {
                this.nftTransactionTo = "";
                this.collectionSelectedToken = undefined;
                this.$modal.hide('send-nft');
                this.keys.nftCollection++;
            },

            async sendNft() {
                const address = this.nftTransactionTo;
                const id = this.collectionSelectedToken.tokenId;

                try {
                    this.loaders.nftSend = true;

                    const tx = await this.marketNftContract.transferFrom(this.metaMaskAccount, address, id);
                    await tx.wait(1);

                    this.loaders.nftSend = false;
                    this.hideSendNftModal();
                    this.userTokens = this.userTokens.filter(c => c.tokenId !== id);
                } catch (err) {
                    this.hideSendNftModal();
                    this.loaders.nftSend = false;
                }
            },

            async buyMarketToken(token) {
                const [tokenAddress, tokenId, price, currency] = [this.market.token, token.tokenId, token.order
                    .price, token.order.currency.id
                ];

                try {
                    const contractSellOrder = await this.contract.getSellOrder(tokenAddress, tokenId);

                    if (!contractSellOrder) throw "Sell order doesn't exist or expierd.";
                    const tx = await this.contract.buy(tokenAddress, tokenId, currency, price, {
                        gasPrice: 100000000000,
                        gasLimit: 1000000,
                        value: price
                    });
                    await tx.wait(1);
                } catch (err) {
                    console.error(err);
                }
            },

            async listNft(item) {
                const amount = "" + 10 * (10 ** 18);
                const currencyType = "0x0000000000000000000000000000000000000000";
                const market = this.market.token;

                try {
                    //const tx1 = await this.marketNftContract.approve(this.market.address, 30);
                    //await tx1.wait(1);
                    //  this.listingLoading = true

                    const tx = await this.contract.sell(market, 30, currencyType, amount)
                    await tx.wait(1)

                    // this.listingLoading = false
                    //  this.$modal.hide('list')
                    // await this.getYourNFT()
                } catch (err) {
                    console.log(err);
                    // this.listingLoading = false
                }
            },

            sortMarketBy(field, order) {
                this.marketSales.sort((a, b) => (a[field] > b[field]) ? order : ((b[field] > a[field] ? -order : 0)));
                this.marketAuctions.sort((a, b) => (a[field] > b[field]) ? order : ((b[field] > a[field] ? -order :
                    0)));
            },

            showCollectionDropwdown(event) {
                this.modals.collectionMenu = true;
                let dropdown = this.$refs.collectionMenu;

                const buttonPosition = event.target.getBoundingClientRect();
                const tokenId = event.target.dataset["tokenId"];
                const selectedCard = this.userTokens.filter(c => c.tokenId == tokenId)[0];
                if (!selectedCard) return;
                this.collectionSelectedToken = selectedCard;

                dropdown.style.top = (buttonPosition.top - 160) + 'px';
                dropdown.style.left = (buttonPosition.left - event.target.clientWidth / 2) + 'px';

                const onClick = (event) => {
                    if (event.target.id === 'collectionMenuButton') return;

                    window.removeEventListener('click', onClick);
                    window.removeEventListener('mousewheel', onScroll);
                    this.modals.collectionMenu = false;
                }

                const onScroll = (event) => {
                    window.removeEventListener('click', onClick);
                    window.removeEventListener('mousewheel', onScroll);
                    this.modals.collectionMenu = false;
                }

                window.addEventListener('click', onClick);
                window.addEventListener('mousewheel', onScroll);
            }
        },

        computed: {
            ...mapGetters(["metaMaskAccount", "metaMaskWallet"]),
        }
    }
</script>

<style>
    .details-modal {
        position: fixed;
        top: 15%;
        bottom: 15%;
        left: 25%;
        right: 25%;
    }

    .bg-light {
        background-color: #212121;
    }

    .bg-hover {
        background-color: #313131;
    }

    ::-webkit-scrollbar {
        width: 10px;
    }

    ::-webkit-scrollbar-track {
        background: #0E0E0E;
        border-radius: 12px;
    }

    ::-webkit-scrollbar-thumb {
        background: #54B67A;
        border-radius: 12px;
    }

    ::-webkit-scrollbar-thumb:hover {
        background: #555;
    }

    .market-plaza {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
    }

    .item-info-enter-active,
    .item-info-leave-active {
        transition: all 0.5s;
        left: 0;
    }

    .item-info-enter,
    .item-info-leave-to {
        left: -2000px;
    }
</style>