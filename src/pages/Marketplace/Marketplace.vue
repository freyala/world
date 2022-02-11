<template>
  <section
    style="background: url('/images/map/worldmap_small.png') no-repeat; background-size: cover; overflow-y:auto; height: 100vh; max-height: 100vh;"
    class="flex p-4 lg:px-32" v-bind:class='{"md:p-16": !isMarketOpen}'>
    <div style="background: #1c1c1c; z-index: 9999; overflow-y: hidden;" v-bind:class='{"screen": !isMarketOpen}'
      class="rounded-2xl w-full flex flex-col">
      <section id="section-i-1" v-bind:class='{"h-auto": isMarketOpen, "h-auto py-4": !isMarketOpen}'
        class="border-b flex items-center border-primary-alt"
        style="background: url('/images/SVG/homepage-bg-top.svg') no-repeat top right">

        <div v-on:click='showActivityBar = false' v-show='showActivityBar' style='background-color: rgba(0,0,0,0.5)'
          class='opacity-50 absolute z-50 top-0 right-0 left-0 bottom-0'>

        </div>

        <transition name='slide-in-right'>
          <div v-show='showActivityBar'
            class='xl:w-5/12 sm:w-full w-full top-0 bottom-0 z-50 absolute right-0 bg-dark flex flex-col'
            style='border-left: 1px solid rgba(255,255,255,0.2); box-shadow: -12px 0px 12px rgba(0,0,0,0.25)'>
            <div class='w-full h-20 dark-panel flex items-center'>
              <p class='px-4 ml-4 xl:text-3xl lg:text-2xl text-xl'>
                Market Activity
              </p>
              <p v-on:click='showActivityBar = false'
                class='ml-auto mr-8 xl:text-2xl lg:text-xl text-lg cursor-pointer hover:text-white fa fa-close'>
              </p>
            </div>
            <div class='w-11/12 mt-4 mx-auto px-4 flex flex-col dark-panel rounded-xl'>
              <div class='w-full flex flex-row justify-evenly items-center h-12 rounded-t-xl sm:text-xl text-sm'>
                <div class='w-2/12 mx-2 mr-8 sm:mr-0 sh-auto text-start'>
                  <p>Event</p>
                </div>
                <div class='w-3/12 sm:block hidden mx-2 h-auto text-start'>
                  <p>Collection</p>
                </div>
                <div class='w-3/12 mx-2 h-auto text-start'>
                  <p>Item</p>
                </div>
                <div class='w-3/12 mx-2 h-auto text-start'>
                  <p>Price</p>
                </div>
              </div>
            </div>
            <div class='w-11/12 mt-4 mx-auto px-4 my-4 flex overflow-y-scroll flex-col dark-panel rounded-xl'
              style='min-height: 80vh; max-height: 80vh'>
              <div class='sm:text-lg text-sm' v-for='(sale, index) in activityList' :key='index'>
                <div class='w-full flex flex-row justify-evenly items-center h-12 rounded-xl'>
                  <div class='w-2/12 sm:mx-2 mr-8 sm:mr-0 h-auto text-start'>
                    <p>{{ sale.type }}</p>
                  </div>
                  <div class='w-3/12 sm:block hidden sm:mx-2 mx-4 h-auto text-start'
                    style='color: rgba(255,255,255,0.8)'>
                    <p>{{ getMarketName(sale.nft.token)}}</p>
                  </div>
                  <div class='w-3/12 flex items-center  sm:mx-2 mx-4 h-auto text-start'
                    style='color: rgba(255,255,255,0.8)'>
                    <img width='40px' class='rounded-xl' v-lazy='sale.nft.image' />
                    <p class='ml-2'>#{{ sale.nft.tokenId }}</p>
                  </div>
                  <div class='w-3/12 sm:mx-2 ml-6 h-auto text-start'>
                    <p>{{ (sale.price / 10 ** 18).toFixed(2)}} ONE</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </transition>

        <div class="container mx-auto text-center p-4 relative">
          <h1 class="text-3xl md:text-5xl text-primary-alt font-semibold">
            <span v-if='isMarketOpen'><i v-on:click='destroyMarketPlaza()'
                class="fas fa-long-arrow-alt-left cursor-pointer md:text-4xl text-2xl hover:text-white"></i></span>
            Marketplace
          </h1>

          <div v-show='!isMarketOpen' class='w-full h-auto flex flex-row justify-center items-center'>
            <p title='Recent Sales' v-on:click='showLastSales()'
              class='sm:text-xl text-smffffffffffffffffffffffffffffffffffffffffffffffffffffffffff cursor-pointer mt-4 hover:text-white mx-2'>Recent Sales</p>
            <span class='text-2xl mt-4'>|</span>
            <p title='Recent Auctions' v-on:click='showLastAuctions()'
              class='sm:text-xl text-sm cursor-pointer mt-4 hover:text-white mx-2'>Recent Auctions</p>
          </div>
          <div v-if='!isMarketOpen' class="absolute sm:top-0 -top-7 sm:left-0 left-1 p-4 md:p-8">
            <router-link :to="{ name: 'world-map' }">
              <i class="fas fa-long-arrow-alt-left"></i> Back
            </router-link>
          </div>
          <div :key='isMarketOpen' class='flex flex-row text-2xl items-center relative justify-center mt-2'
            v-if='isMarketOpen'>
            <hr class='w-4/10 opacity-25 absolute z-0'>
            <div style='background-color: #1c1c1c;' class='w-auto mx-4 p-2 z-10 cursor-pointer'>
              <h2 class='text-white bold'>{{getFancyNumber(marketStats.items)}}</h2>
              <h2 class='text-sm'>Items</h2>
            </div>
            <div style='background-color: #1c1c1c;' class='w-auto mx-4 p-2 z-10 cursor-pointer'>
              <h2 class='text-white bold'>{{getFancyNumber(marketStats.volume)}}</h2>
              <h2 class='text-sm'>Volume</h2>

            </div>
            <div style='background-color: #1c1c1c;' class='w-auto mx-4 p-2 z-10 cursor-pointer'>
              <h2 class='text-white bold'>{{getFancyNumber(marketStats.floor)}}</h2>
              <h2 class='text-sm'>Floor</h2>
            </div>
          </div>
          <div class='flex flex-row items-center justify-center mt-4 md:mt-1' v-if='isMarketOpen'>
            <div title='User Panel' v-on:click='showUserMarketProfile()'
              class='w-auto flex mx-3 xl:mt-2 mt-0 items-center cursor-pointer'>
              <span><i class="fas fa-user text-xl hover:text-white"></i></span>
            </div>
            <div title='Control Panel' v-on:click='showMarketAllowances()'
              class='w-auto flex mx-3 xl:mt-2 mt-0 items-center cursor-pointer'>
              <span><i class="fas fa-cog text-xl hover:text-white"></i></span>
            </div>
            <div title='Market Stats' v-on:click='showMarketStats()'
              class='w-auto flex mx-3 xl:mt-2 mt-0 items-center cursor-pointer'>
              <span><i class="fas fa-book text-xl hover:text-white"></i></span>
            </div>
            <div title='Withdraw NFT by Id' v-on:click='showForceWithdraw()'
              class='w-auto flex mx-3 xl:mt-2 mt-0 items-center cursor-pointer'>
              <span><i class="fas fa-id-card text-xl hover:text-white"></i></span>
            </div>
            <div title='Tutorial' v-on:click='showMarketTutorial()'
              class='w-auto flex mx-3 xl:mt-2 mt-0 items-center cursor-pointer'>
              <span><i class="fas fa-question-circle text-xl hover:text-white"></i></span>
            </div>
          </div>
        </div>
      </section>

      <div class="xl:pr-4 pr-0 pl-0 py-8 h-5/6 relative overflow-y-auto">
        <div v-if='!isMarketOpen'
          class='lg:px-8 lg:py-4 md:px-8 md:py-0 px-4 py-4 w-full h-full flex items-start justify-center'>
          <div class='xl:w-6/12 lg:w-full w-11/12 flex justify-center flex-wrap'>
            <!-- Open Markets -->
            <div class='relative w-full flex justify-center z-0'>
              <div class='top-4 market-underline z-0 opacity-75'></div>
              <h2 style='background-color: #1c1c1c;height:48px' class='text-2xl px-4 font-bold z-50'>Open
                Markets</h2>
            </div>
            <div class='w-full flex flex-row flex-wrap justify-center'>
              <MarketCard v-for='(market, index) in openMarkets' :key='index' v-on:cardClick='openMarket(market)'
                :caption='market.collectionName' class='my-4 lg:my-4 md:mx-4 mx-0' :image='market.image'></MarketCard>
            </div>
            <div class='my-6 w-full'></div>
            <!-- Upcoming Markets -->
            <div class='relative w-full flex justify-center'>
              <div class='top-4 market-underline z-0 opacity-75'></div>
              <h2 style='background-color: #1c1c1c;height:48px' class='text-2xl px-4 font-bold z-0'>Coming Soon</h2>
            </div>
            <div class='w-full flex flex-row flex-wrap justify-center'>
              <div v-if='upcomingMarkets.length === 0'>To be announced</div>
              <MarketCard v-for='(market, index) in upcomingMarkets' :key='index' :caption='market.collectionName'
                class='my-4 lg:my-4 md:mx-4 mx-0' :image='market.image'></MarketCard>
            </div>
          </div>
        </div>
        <MarketPlaza v-on:updateStats='updateMarketStats($event)' class='h-6/6' ref='marketPlaza' v-else
          :contract='marketContract' v-on:goBack='destroyMarketPlaza()' :market='selectedMarket'>

        </MarketPlaza>
      </div>
    </div>
  </section>
</template>


<script>
  import MarketCard from '../../components/Marketplace/MarketCard.vue';
  import MarketPlaza from '../../components/Marketplace/MarketPlaza.vue';
  import Markets from '../../plugins/markets/markets.json';

  import * as NFTQueryBuilder from "../../plugins/graphql/marketplace/nft";

  import {
    mapGetters,
    mapActions
  } from "vuex";

  import {
    ethers
  } from "ethers";
  import wallet from "../../plugins/wallet";
  import MarketPlaceArtifacts from '../../plugins/artifacts/marketplaceR.json';

  export default {
    name: "MarketPlace",
    components: {
      MarketCard,
      MarketPlaza
    },

    mixins: [wallet],

    data() {
      return {
        markets: [],
        marketContract: undefined,
        selectedMarket: undefined,
        isMarketOpen: false,
        marketStats: {
          volume: 0,
          items: 0,
          floor: 0
        },
        showActivityBar: false,
        marketActivity: {
          sales: [],
          auctions: [],
        },
        activityList: [],
        GRAPH_API: "https://marketplace-api.freyala.com/graphql/"
      }
    },

    async mounted() {
      this.marketContract = new ethers.Contract(
        MarketPlaceArtifacts.address,
        MarketPlaceArtifacts.abi,
        this.metaMaskWallet.signer
      );

      this.markets = Markets;

      this.$nextTick(() => {
        if (this.$route.query.market) {
          const market = this.$route.query.market;

          const marketPlaza = this.markets.filter(c => c.token.toLowerCase() === market.toLowerCase())[0];

          if (!marketPlaza) return;
          this.isMarketOpen = true;
          this.selectedMarket = marketPlaza;
        };
      });

      const result = await this.$http.post(this.GRAPH_API, {
        query: NFTQueryBuilder.FetchMarketSalesNFTs()
      });

      this.marketActivity.sales = result.data.data.sales;
      this.marketActivity.sales.forEach((sale) => {
        sale.type = 'Sale';
      });
      this.marketActivity.auctions = result.data.data.auctions;
      this.marketActivity.auctions.forEach((auction) => {
        auction.type = 'Auction';
      });
    },

    computed: {
      ...mapGetters(["metaMaskAccount", "metaMaskWallet"]),

      openMarkets() {
        return this.markets.filter(c => c.status === 'OPEN');
      },

      upcomingMarkets() {
        return this.markets.filter(c => c.status === 'SOON');
      },

      closedMarkets() {
        return this.markets.filter(c => c.status === 'CLOSED');
      },

    },

    methods: {
      getMarketName(token) {
        const marketCollection = this.markets.filter(c => c.token.toLowerCase() === token.toLowerCase())[0];
        if (!marketCollection) return "";
        return marketCollection.tokenName;
      },

      openMarket(market) {
        this.isMarketOpen = true;
        this.selectedMarket = market;
        const query = {
          market: market.token
        }
        this.$router.push({
          query
        });
      },

      showUserMarketProfile() {
        this.$refs.marketPlaza.showUserProfileModal();
      },

      showMarketAllowances() {
        this.$refs.marketPlaza.showMarketAllowances();
      },

      showMarketTutorial() {
        this.$refs.marketPlaza.showTutorial();
      },

      showForceWithdraw() {
        this.$refs.marketPlaza.showForceWithdraw();
      },

      showMarketStats() {
        this.$refs.marketPlaza.showMarketStats();
      },

      showLastSales() {
        this.showActivityBar = true;
        this.activityList = this.marketActivity.sales;
      },

      showLastAuctions() {
        this.showActivityBar = true;
        this.activityList = this.marketActivity.auctions;
      },

      updateMarketStats(marketStats) {
        if (!this.isMarketOpen) return;
        this.marketStats = marketStats;
      },

      destroyMarketPlaza() {
        this.isMarketOpen = false;
        this.marketStats = {
          volume: 0,
          items: 0,
          floor: 0
        };
        this.$router.push({});
      },

      getFancyNumber(input) {
        const lookup = [{
            value: 1,
            symbol: ""
          },
          {
            value: 1e3,
            symbol: "k"
          },
          {
            value: 1e6,
            symbol: "M"
          },
          {
            value: 1e9,
            symbol: "G"
          },
          {
            value: 1e12,
            symbol: "T"
          },
          {
            value: 1e15,
            symbol: "P"
          },
          {
            value: 1e18,
            symbol: "E"
          }
        ];
        const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
        var item = lookup.slice().reverse().find(function (item) {
          return input >= item.value;
        });
        return item ? (input / item.value).toFixed(1).replace(rx, "$1") + item.symbol : "0";
      }
    }
  }
</script>


<style>
  .market-underline {
    position: absolute;
    height: 1px;
    width: 100%;
    border: 1px solid rgba(84, 182, 122, 0.75);
  }
</style>