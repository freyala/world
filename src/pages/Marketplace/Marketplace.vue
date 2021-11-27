<template>
  <section
    style="background: url('/images/map/worldmap.png') no-repeat; background-size: cover; overflow-y:auto; height: 100vh; max-height: 100vh;"
    class="flex p-4 lg:px-32" v-bind:class='{"md:p-16": !isMarketOpen}'>
    <div style="background: #1c1c1c; z-index: 9999; overflow-y: hidden;" v-bind:class='{"screen": !isMarketOpen}'
      class="rounded-2xl w-full flex flex-col">
      <section id="section-i-1" v-bind:class='{"h-1/4": isMarketOpen}'
        class="border-b flex items-center border-primary-alt"
        style="background: url('/images/SVG/homepage-bg-top.svg') no-repeat top right">
        <div class="container mx-auto text-center pt-16 md:pt-24 pb-16 md:pb-20">
          <h1 class="text-3xl md:text-5xl text-primary-alt font-semibold">
            <span v-if='isMarketOpen'><i v-on:click='isMarketOpen = false'
                class="fas fa-long-arrow-alt-left cursor-pointer md:text-4xl text-2xl hover:text-white"></i></span>
            Marketplace
          </h1>
          <div title='User Panel' class='flex flex-row items-center justify-center mt-3' v-if='isMarketOpen'>
            <div v-on:click='showUserMarketProfile()' class='w-auto flex ml-5 xl:mt-2 mt-0 items-center cursor-pointer'>
              <span><i class="fas fa-user text-xl hover:text-white"></i></span>
            </div>
            <div title='Control Panel' v-on:click='showMarketAllowances()'
              class='w-auto flex ml-5 xl:mt-2 mt-0 items-center cursor-pointer'>
              <span><i class="fas fa-cog text-xl hover:text-white"></i></span>
            </div>
            <div title='Tutorial' v-on:click='showMarketTutorial()'
              class='w-auto flex ml-5 xl:mt-2 mt-0 items-center cursor-pointer'>
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
        <MarketPlaza class='h-6/6' ref='marketPlaza' v-else :contract='marketContract'
          v-on:goBack='isMarketOpen = false' :market='selectedMarket'>

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
        console.log(market);
        this.isMarketOpen = true;
        this.selectedMarket = market;
      },

      showUserMarketProfile() {
        this.$refs.marketPlaza.showUserProfileModal();
      },

      showMarketAllowances() {
        this.$refs.marketPlaza.showMarketAllowances();
      },

      showMarketTutorial() {
        this.$refs.marketPlaza.showTutorial();
      }
    }
  }
</script>
<div class='absolute top-4 left-0 w-full z-0' style='height: 1px; border: 1px solid white;'></div>
<style>
  .market-underline {
    position: absolute;
    height: 1px;
    width: 100%;
    border: 1px solid rgba(84, 182, 122, 0.75);
  }
</style>