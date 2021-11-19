<template>
  <section style="background: url('/images/map/worldmap.png') no-repeat; background-size: cover; min-height: 100vh"
    class="flex p-4 md:p-16 lg:px-32">
    <div style="background: #1c1c1c; z-index: 9999; overflow-y: auto;" class="screen rounded-2xl w-full">
      <section id="section-i-1" class="border-b-4 border-primary-alt"
        style="background: url('/images/SVG/homepage-bg-top.svg') no-repeat top right">
        <div class="container mx-auto text-center pt-16 md:pt-24 pb-16 md:pb-20">
          <h1 class="text-2xl md:text-5xl text-primary-alt font-semibold">
            Marketplace
          </h1>
        </div>
      </section>

      <div class="p-4 md:p-8 relative">
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
        <div v-else>
            <MarketPlaza :contract='marketContract' v-on:goBack='isMarketOpen = false' :market='selectedMarket'>

            </MarketPlaza>
        </div>

      </div>
    </div>
  </section>
</template>


<script>
  import MarketCard from '../../components/Marketplace/MarketCard.vue';
  import MarketPlaza from '../../components/Marketplace/MarketPlaza.vue';
  import Markets from '../../plugins/markets/markets.json';

  import { mapGetters, mapActions } from "vuex";

  import { ethers } from "ethers";
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
      }
    },
    
    methods:{
      openMarket(market){
        this.isMarketOpen = true;
        this.selectedMarket = market;
      }
    }
  }
</script>