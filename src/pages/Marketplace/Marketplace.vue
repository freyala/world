<template>
  <section
    style="background: url('/images/map/worldmap.png') no-repeat; background-size: cover; overflow-y:hidden; height: 100vh; max-height: 100vh;"
    class="flex p-4 lg:px-32" v-bind:class='{"md:p-16": !isMarketOpen}'>
    <div style="background: #1c1c1c; z-index: 9999; overflow-y: hidden;" v-bind:class='{"screen": !isMarketOpen}'
      class="rounded-2xl w-full">
      <section id="section-i-1" class="border-b h-1/5 flex items-center border-primary-alt"
        style="background: url('/images/SVG/homepage-bg-top.svg') no-repeat top right">
        <div class="container mx-auto text-center pt-16 md:pt-24 pb-16 md:pb-20">
          <h1 class="text-3xl md:text-5xl text-primary-alt font-semibold">
           <span><i class="fas fa-long-arrow-alt-left cursor-pointer md:text-4xl text-2xl hover:text-white"></i></span> Marketplace
          </h1>
          <div class='flex flex-row items-center justify-center mt-3' v-if='selectedMarket'>
            <div v-on:click='showUserMarketProfile()'
              class='w-auto flex ml-5 xl:mt-2 mt-0 items-center cursor-pointer'>
              <span><i class="fas fa-user text-xl hover:text-white"></i></span>
            </div>
            <div v-on:click='showMarketAllowances()'
              class='w-auto flex ml-5 xl:mt-2 mt-0 items-center cursor-pointer'>
              <span><i class="fas fa-cog text-xl hover:text-white"></i></span>
            </div>
          </div>
        </div>
      </section>

      <div class="xl:pr-4 pr-0 pl-0 h-4/5 relative">
        <div v-if='!isMarketOpen' class="absolute top-0 left-0 p-4 md:p-8">
          <router-link :to="{ name: 'world-map' }">
            <i class="fas fa-long-arrow-alt-left"></i> Back
          </router-link>
        </div>

        <div v-if='!isMarketOpen' class='flex justify-center flex-row w-full h-full'>
          <div class='w-6/12'>
            <!-- Open Markets -->
            <h2 class='text-2xl font-bold'>Open Markets</h2>
            <div class='w-full flex flex-row'>
              <div v-on:click='openMarket(market)' v-for='(market, index) in openMarkets' :key='index' class='m-6 ml-0'>
                <MarketCard :caption='market.collectionName' :image='market.image'></MarketCard>
              </div>
            </div>

            <!-- Upcoming Markets -->
            <hr class='mt-6 mb-6' />
            <h2 class='text-2xl font-bold'>Coming Soon</h2>
            <div class='w-full flex flex-row'>
              <div v-for='(market, index) in upcomingMarkets' :key='index' class='m-6 ml-0'>
                <MarketCard :disabled='true' :caption='market.name' :image='market.image'></MarketCard>
              </div>
            </div>
          </div>
        </div>
        <MarketPlaza ref='marketPlaza' v-else :contract='marketContract' v-on:goBack='isMarketOpen = false'
          :market='selectedMarket'>

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
      }
    },

    async mounted() {
      this.marketContract = new ethers.Contract(
        MarketPlaceArtifacts.address,
        MarketPlaceArtifacts.abi,
        this.metaMaskWallet.signer
      );

      this.markets = Markets;
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
      },

      showUserMarketProfile() {
        this.$refs.marketPlaza.showUserProfileModal();
      },

      showMarketAllowances() {
        this.$refs.marketPlaza.showMarketAllowances();
      }
    }
  }
</script>