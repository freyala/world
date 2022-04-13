<template>
  <div style="width: 100vw; min-height:100vh; height: 100vh; z-index: 999"
       class="flex flex-row w-full h-full relative bg-detail-bg">

    <div v-show='loading' class='absolute top-0 right-0 left-0 bottom-0'
         style='background-image: url(/img/map/plots_loading.png); background-size: cover'>
      <div class='absolute top-0 right-0 left-0 bottom-0 bg-detail-bg opacity-30 flex items-center justify-center'>
      </div>

      <div class='h-full w-full flex items-center justify-center'>
        <div class="m-auto text-center">
          <div class="w-full flex">
            <img class="w-24 h-24 m-auto" src="/images/XYA.png" alt="XYA logo"
                 style="animation: rotation 2s infinite linear;">
          </div>
          <br>
          <p class="text-2xl text-primary-head">Loading...</p>
        </div>
      </div>
    </div>

    <div v-show='!showSideBar' v-on:click='showSideBar = true'
         class='h-16 w-8 dark-panel absolute flex items-center justify-center block xl:hidden rounded-r-xl'
         style='top: 50%; left: 0%; z-index: 1'>
      <i class='fa fa-arrow-right'></i>
    </div>

    <div class='absolute flex flex-row h-16 w-full top-0 dark-panel items-center' style="z-index: 1000">
      <div class='ml-6 mt-5 mb-4 w-auto text-xl cursor-pointer absolute z-50 w-2/5 flex flex-row items-center'>
        <router-link class='flex items-center' :to="{ name: 'world-map' }">
          <i class='fa fa-arrow-left mr-2'></i>
          <span class='sm:block hidden'>Back</span>
        </router-link>
      </div>
      <div class='w-full text-center lg:text-3xl sm:text-xl text-xl font-bold absolute'>
        <p>The Frey Barracks</p>
      </div>
    </div>

    <div
        class='xl:relative absolute 2xl:w-1/5 xl:w-3/12 lg:w-5/12 sm:w-6/12 w-full h-full flex flex-row py-4 px-4 pt-16 overflow-y-auto overflow-x-hidden'
        v-bind:style='{"left": (showSideBar ? 0 : -600) + "px"}'
        style="border-right: 1px solid #363636; z-index: 1; background-color: #ebecc5; box-shadow: 8px 0 8px rgba(0,0,0,0.15); transition: all 0.15s linear">

      <div class="w-full px-12 mt-10">
        <router-link :to="{ name: 'barracks' }">
          <button class="w-full mt-6 xya-btn relative">
            Get Frey
          </button>
        </router-link>
        <router-link :to="{ name: 'barracks-collection' }">
          <button class="w-full mt-6 xya-btn relative">
            Your Frey
          </button>
        </router-link>
        <router-link :to="{ name: 'barracks-gallery' }">
          <button class="w-full mt-6 xya-btn relative">
            All Frey
          </button>
        </router-link>
        <router-link :to="{ name: 'barracks-attributes' }">
          <button class="w-full mt-6 xya-btn relative">
            All Attributes
          </button>
        </router-link>
      </div>


      <div v-on:click='showSideBar = !showSideBar'
           class='h-16 w-8 dark-panel absolute flex items-center justify-center block xl:hidden rounded-l-xl'
           style='top: 50%; right: 0'>
        <i v-if='showSideBar' class='fa fa-arrow-left'></i>
        <i v-else class='fa fa-arrow-right'></i>
      </div>

    </div>
    <div
        :class="`${showSideBar ? 'xl:w-4/5 w-full py-32 px-8' : 'w-full'} flex flex-wrap h-full relative overflow-y-scroll`">
      <div class="minted-frey flex flex-wrap">
        <div class="w-full lg:w-1/2 xl:w-1/3" :key="mint.tokenId" v-for="(mint, index) in frey">
          <div class="p-2 relative">
            <div class="absolute cursor-pointer bg-detail-bg top-0 left-0 h-full w-full opacity-0 hover:opacity-90"
                 @click="showAttributes(index)">
              <div class="flex w-full h-full">
                <p class="m-auto text-2xl">
                  Show attributes
                </p>
              </div>
            </div>
            <img v-lazy="mint.image" alt="Frey image">
            <div style="top: 15px; left: 15px"
                 class="absolute bg-white py-2 px-4 text-sm uppercase text-dark"
                 v-if="mint.tokenId <= 542">
              <strong>Presale Frey!</strong>
            </div>

            <p class="py-3 text-xl">
              {{ mint.name }} <br>
            </p>
          </div>
        </div>

        <div class="w-full text-center mx-auto">
          <div class="inline" v-if="currentPage > 5">
            <router-link class="px-1" :to="{ name: 'barracks-gallery', query: { page: 1 } }">
              <i class="fas fa-angle-double-left"></i>
            </router-link>
          </div>

          <router-link class="px-1" :to="{ name: 'barracks-gallery', query: { page: currentPage - 1 } }"
                       v-if="currentPage > 1">
            <i class="fas fa-angle-left"></i>
          </router-link>

          <div class="inline" v-if="currentPage > 5">
            ...
          </div>

          <div class="inline" :key="`page-bot-${page}`" v-for="page in pages">
            <router-link class="text-lg px-1" :to="{ name: 'barracks-gallery', query: { page: page } }"
                         v-if="page > (currentPage - 5) && page < (currentPage + 5)">
              {{ page }}
            </router-link>
          </div>

          <div class="inline" v-if="currentPage < pages && pages > 5">
            ...
          </div>

          <router-link class="px-1" :to="{ name: 'barracks-gallery', query: { page: currentPage + 1 } }"
                       v-if="currentPage < pages">
            <i class="fas fa-angle-right"></i>
          </router-link>

          <div class="inline" v-if="currentPage < pages && pages > 5">
            <router-link class="px-1" :to="{ name: 'barracks-gallery', query: { page: pages } }">
              <i class="fas fa-angle-double-right"></i>
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <window window class='w-10/12' height="auto" width="80%" name="attributes">
      <div class="flex flex-wrap p-6 bg-detail-bg h-full">
        <div class="w-4/5">
          <div class="text-2xl">Attributes</div>
        </div>
        <div class="w-1/5 text-right">
          <i @click="$modal.hide('attributes')" class="fas fa-times cursor-pointer text-xl"></i>
        </div>
        <div v-if='frey.length > 0' class="mt-4 flex flex-wrap w-full items-start justify-start">
          <div
              v-if="frey[selectedIndex].attributes.some((a) => { return (a.trait_type === 'Gender' && a.value === 'Female') })"
              class="w-full flex flex-wrap" :key="frey[selectedIndex].tokenId + attribute.trait_type"
              v-for="attribute in frey[selectedIndex].attributes">
            <strong class="w-5/12">{{ attribute.trait_type }}: </strong>
            <span class="w-7/12">{{
                attribute.value === '-' ? 'None' : (attribute.value === 'Yin' ? 'Yang' : (attribute.value === 'Yang' ? 'Yin' : attribute.value === 'Female Yin' ? 'Female Yang' : (attribute.value === 'Female Yang' ? 'Female Yin' : attribute.value)))
              }}</span>
          </div>
          <div
              v-if="!frey[selectedIndex].attributes.some((a) => { return (a.trait_type === 'Gender' && a.value === 'Female') })"
              class="w-full flex flex-wrap" :key="frey[selectedIndex].tokenId + attribute.trait_type"
              v-for="attribute in frey[selectedIndex].attributes">
            <strong class="w-5/12">{{ attribute.trait_type }}: </strong>
            <span class="w-7/12">{{ attribute.value === '-' ? 'None' : attribute.value }}</span>
          </div>
        </div>
      </div>
    </window>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import frey from '../../plugins/artifacts/frey.json'
import wallet from "../../plugins/wallet";
import axios from 'axios'

export default {
  name: 'AllFrey',
  mixins: [wallet],
  computed: {
    ...mapGetters([
      'metaMaskAccount',
      'metaMaskWallet'
    ])
  },
  data() {
    return {
      showSideBar: true,
      loading: true,
      frey: [],
      foundFrey: [],
      currentPage: 1,
      allPages: 100,
      pages: 1,
      showMin: 0,
      showMax: 0,
      search: '',
      selectedIndex: 0
    }
  },
  watch: {
    $route() {
      this.loading = true
      this.frey = []

      if (this.$route.query.page) {
        this.currentPage = this.$route.query.page
      }

      this.getAllFrey()
    },
    search() {
      this.findFrey()
    }
  },
  async mounted() {
    this.loading = true
    this.frey = []

    if (this.$route.query.page) {
      this.currentPage = parseInt(this.$route.query.page)
    }

    const Web3 = require('web3');
    const web3 = new Web3(new Web3.providers.HttpProvider('https://api.s0.t.hmny.io/'));

    const contractInstance = new web3.eth.Contract(frey.abi, frey.address);
    this.items = parseInt(await contractInstance.methods.totalSupply().call());

    await this.getAllFrey()
  },
  methods: {
    showAttributes(index) {
      this.selectedIndex = index
      this.$modal.show('attributes')
    },
    difference(n, m) {
      return Math.abs(n - m)
    },
    range(start, end, step = 1) {
      let range = [];
      let typeofStart = typeof start;
      let typeofEnd = typeof end;

      if (step === 0) {
        throw TypeError("Step cannot be zero.");
      }

      if (typeofStart === "undefined" || typeofEnd === "undefined") {
        throw TypeError("Must pass start and end arguments.");
      } else if (typeofStart !== typeofEnd) {
        throw TypeError("Start and end arguments must be of same type.");
      }

      typeof step == "undefined" && (step = 1);

      if (end < start) {
        step = -step;
      }

      if (typeofStart === "number") {

        while (step > 0 ? end >= start : end <= start) {
          range.push(start);
          start += step;
        }

      } else if (typeofStart === "string") {

        if (start.length !== 1 || end.length !== 1) {
          throw TypeError("Only strings with one character are supported.");
        }

        start = start.charCodeAt(0);
        end = end.charCodeAt(0);

        while (step > 0 ? end >= start : end <= start) {
          range.push(String.fromCharCode(start));
          start += step;
        }

      } else {
        throw TypeError("Only string and number types are supported");
      }

      return range
    },
    async getAllFrey() {
      const Web3 = require('web3');
      const web3 = new Web3(new Web3.providers.HttpProvider('https://api.s0.t.hmny.io/'));

      const contract = new web3.eth.Contract(frey.abi, frey.address);
      const minted = await contract.methods.totalSupply().call();

      this.pages = Math.ceil(minted / 50)

      if (this.currentPage > this.pages) {
        window.location.href = '/'
      } else {
        const tags = await axios.get(`https://frey.freyala.com/meta/fromto?page=${this.currentPage}`)
        this.frey = tags.data

        this.loading = false
      }
    },
    async findFrey() {
      this.loading = true

      const foundFrey = await axios.get(`https://frey.freyala.com/meta/list?items=${this.search}`)
      this.foundFrey = foundFrey.data
      this.loading = false

    }
  },
  filters: {
    compressAddress(address) {
      if (address !== undefined) {
        return (
            address.substr(0, 10) +
            "..." +
            address.substr(address.length - 5, address.length)
        )
      }
    },
    formatNumber(nStr) {
      nStr += ''
      let x = nStr.split('.')
      let x1 = x[0]
      let x2 = x.length > 1 ? '.' + x[1] : ''
      let rgx = /(\d+)(\d{3})/
      while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2')
      }
      return x1 + x2
    }
  }
}
</script>