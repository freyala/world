<template>
  <section
    style="background: url('/images/map/worldmap.png') no-repeat; background-size: cover; overflow-y:auto; height: 100vh; max-height: 100vh;"
    class="flex p-4 lg:px-32" v-bind:class='{"md:p-16": !isMarketOpen}'>
    <div style="background: #1c1c1c; z-index: 9999; overflow-y: hidden;" v-bind:class='{"screen": !isMarketOpen}'
      class="rounded-2xl w-full flex flex-col">
      <section id="section-i-1" v-bind:class='{"h-1/4": isMarketOpen}' class="border-b items-center border-primary-alt"
        style="background: url('/images/SVG/homepage-bg-top.svg') no-repeat top right">
        <div class="container mx-auto text-center md:py-6 py-6 flex flex-col items-center">
          <h1 class="text-3xl md:text-5xl text-primary-alt font-semibold">
            <span v-if='isMarketOpen'><i v-on:click='destroyMarketPlaza()'
                class="fas fa-long-arrow-alt-left cursor-pointer md:text-4xl text-2xl hover:text-white"></i></span>
            Marketplace
          </h1>
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
            <div title='User Panel' v-on:click='showUserMarketProfile()' class='w-auto flex mx-3 xl:mt-2 mt-0 items-center cursor-pointer'>
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

      <div class="xl:pr-4 pr-0 pl-0 h-5/6 relative overflow-y-auto">
        <div v-if='!isMarketOpen' class="lg:absolute block top-0 left-0 p-4 md:p-8">
          <router-link :to="{ name: 'world-map' }">
            <i class="fas fa-long-arrow-alt-left"></i> Back
          </router-link>
        </div>

        <div v-if='!isMarketOpen'
          class='lg:px-8 lg:py-16 md:px-8 md:py-0 px-4 py-4 w-full h-full flex items-start justify-center'>
          <div class='xl:w-6/12 lg:w-full w-11/12 flex justify-center flex-wrap'>
            <!-- Open Markets -->
            <div class='relative w-full flex justify-center'>
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
              <h2 style='background-color: #1c1c1c;height:48px' class='text-2xl px-4 font-bold z-50'>Coming Soon</h2>
            </div>
            <div class='w-full flex flex-row flex-wrap justify-center'>
              <div v-if='upcomingMarkets.length === 0'>To be announced</div>
              <MarketCard v-on:cardClick='openMarket(market)' v-for='(market, index) in upcomingMarkets' :key='index'
                :caption='market.collectionName' class='my-4 lg:my-4 md:mx-4 mx-0' :image='market.image'></MarketCard>
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
        }
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