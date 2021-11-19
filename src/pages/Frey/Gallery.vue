<template>
  <section style="background: url('/images/map/worldmap.png') no-repeat; background-size: cover; min-height: 100vh"
           class="flex p-4 md:p-16 lg:px-32">
    <div style="background: #1c1c1c; z-index: 9999; overflow-y: auto;" class="screen rounded-2xl w-full">
      <section id="section-i-1" class="border-b-4 border-primary-alt"
               style="background: url('/images/SVG/homepage-bg-top.svg') no-repeat top right">
        <div class="container mx-auto text-center pt-16 md:pt-24 pb-16 md:pb-20">
          <h1 class="text-2xl md:text-5xl text-primary-alt font-semibold">
            All citizens
          </h1>

          <div class="flex">
            <div class="flex flex-wrap w-full 2xl:w-2/3 mx-auto mt-4">
              <router-link class="w-full md:w-1/5 mx-auto" :to="{ name: 'frey-nft' }">
                <button
                    class="w-full rounded-none border border-primary-alt hover:bg-primary-alt hover:text-brown px-4 py-2 min-h-12">
                  Get Frey
                </button>
              </router-link>
              <router-link class="w-full md:w-1/5 mx-auto" :to="{ name: 'frey-collection' }">
                <button
                    class="w-full mb-2 rounded-none border border-primary-alt hover:bg-primary-alt hover:text-brown px-4 py-2 min-h-12">
                  Your Frey
                </button>
              </router-link>
              <router-link class="w-full md:w-1/5 mx-auto" :to="{ name: 'frey-gallery' }">
                <button
                    class="w-full mb-2 rounded-none border border-primary-alt hover:bg-primary-alt hover:text-brown px-4 py-2 min-h-12">
                  All Frey
                </button>
              </router-link>
              <router-link class="w-full md:w-1/5 mx-auto" :to="{ name: 'frey-attributes' }">
                <button
                    class="w-full mb-2o rounded-none border border-primary-alt hover:bg-primary-alt hover:text-brown px-4 py-2 min-h-12">
                  All Attributes
                </button>
              </router-link>
            </div>
          </div>
        </div>
      </section>
      <div v-if="!loading" id="gallery" class="p-4 md:p-8">

        <!-- eslint-disable vue/no-use-v-if-with-v-for,vue/no-confusing-v-for-v-if -->
        <div class="content text-center">
          <h1 class="text-3xl md:text-5xl mb-6">
            {{ search === '' ? 'All entered Frey' : 'Look up Frey' }}
          </h1>
        </div>

        <div class="mb-4 w-full md:w-3/5 lg:w-1/3 mx-auto">
          <input class="py-2 dark:bg-white text-center bg-dark text-white dark:text-dark w-full" type="number"
                 placeholder="Search Frey" v-model="search">
        </div>

        <div v-if="search === ''">
          <div class="minted-frey py-16 flex flex-wrap" v-if="frey.length < (showMax - (showMin - 1))">
            <div class="text-center">
              <h1 class="text-xl">
                Fetching citizens...
              </h1>
            </div>
          </div>
          <div class="minted-frey py-16 flex flex-wrap" v-else>
            <div class="w-full text-center mx-auto">
              <div class="inline" v-if="currentPage > 5">
                <router-link class="px-1" :to="{ name: 'all-frey', query: { page: 1 } }">
                  <i class="fas fa-angle-double-left"></i>
                </router-link>
              </div>

              <router-link class="px-1" :to="{ name: 'all-frey', query: { page: currentPage - 1 } }"
                           v-if="currentPage > 1">
                <i class="fas fa-angle-left"></i>
              </router-link>

              <div class="inline" v-if="currentPage > 5">
                ...
              </div>

              <div class="inline" :key="`page-top-${page}`" v-for="page in pages">
                <router-link class="text-lg px-1" :to="{ name: 'all-frey', query: { page: page } }"
                             v-if="page > (currentPage - 5) && page < (currentPage + 5)">
                  {{ page }}
                </router-link>
              </div>

              <div class="inline" v-if="currentPage < pages && pages > 5">
                ...
              </div>

              <router-link class="px-1" :to="{ name: 'all-frey', query: { page: currentPage + 1 } }"
                           v-if="currentPage < pages">
                <i class="fas fa-angle-right"></i>
              </router-link>

              <div class="inline" v-if="currentPage < pages && pages > 5">
                <router-link class="px-1" :to="{ name: 'all-frey', query: { page: pages } }">
                  <i class="fas fa-angle-double-right"></i>
                </router-link>
              </div>
            </div>

            <div class="w-full lg:w-1/2 xl:w-1/3 2xl:w-1/4" :key="mint.tokenId" v-for="mint in frey">
              <div class="p-2 relative">
                <img v-lazy="mint.image" alt="Frey image">
                <div style="top: 15px; left: 15px"
                     class="absolute bg-white py-2 px-4 rounded-full text-sm uppercase text-dark"
                     v-if="mint.tokenId <= 542">
                  <strong>Pre sale Frey!</strong>
                </div>

                <p class="py-3 text-xl">
                  {{ mint.name }} <br>
                </p>
                <div class="py-2">
                  <div
                      v-if="mint.attributes.some((a) => { return (a.trait_type === 'Gender' && a.value === 'Female') })"
                      class="flex" :key="mint.tokenId + attribute.trait_type" v-for="attribute in mint.attributes">
                    <strong class="w-5/12">{{ attribute.trait_type }}: </strong>
                    <span class="w-7/12">{{
                        attribute.value === '-' ? 'None' : (attribute.value === 'Yin' ? 'Yang' : (attribute.value === 'Yang' ? 'Yin' : attribute.value === 'Female Yin' ? 'Female Yang' : (attribute.value === 'Female Yang' ? 'Female Yin' : attribute.value)))
                      }}</span>
                  </div>
                  <div
                      v-if="!mint.attributes.some((a) => { return (a.trait_type === 'Gender' && a.value === 'Female') })"
                      class="flex" :key="mint.tokenId + attribute.trait_type" v-for="attribute in mint.attributes">
                    <strong class="w-5/12">{{ attribute.trait_type }}: </strong>
                    <span class="w-7/12">{{ attribute.value === '-' ? 'None' : attribute.value }}</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="w-full text-center mx-auto">
              <div class="inline" v-if="currentPage > 5">
                <router-link class="px-1" :to="{ name: 'all-frey', query: { page: 1 } }">
                  <i class="fas fa-angle-double-left"></i>
                </router-link>
              </div>

              <router-link class="px-1" :to="{ name: 'all-frey', query: { page: currentPage - 1 } }"
                           v-if="currentPage > 1">
                <i class="fas fa-angle-left"></i>
              </router-link>

              <div class="inline" v-if="currentPage > 5">
                ...
              </div>

              <div class="inline" :key="`page-bot-${page}`" v-for="page in pages">
                <router-link class="text-lg px-1" :to="{ name: 'all-frey', query: { page: page } }"
                             v-if="page > (currentPage - 5) && page < (currentPage + 5)">
                  {{ page }}
                </router-link>
              </div>

              <div class="inline" v-if="currentPage < pages && pages > 5">
                ...
              </div>

              <router-link class="px-1" :to="{ name: 'all-frey', query: { page: currentPage + 1 } }"
                           v-if="currentPage < pages">
                <i class="fas fa-angle-right"></i>
              </router-link>

              <div class="inline" v-if="currentPage < pages && pages > 5">
                <router-link class="px-1" :to="{ name: 'all-frey', query: { page: pages } }">
                  <i class="fas fa-angle-double-right"></i>
                </router-link>
              </div>
            </div>
          </div>
        </div>

        <div v-else>
          <div class="w-full xl:w-2/3 mx-auto" :key="mint.tokenId" v-for="mint in foundFrey">
            <div class="p-2 relative flex flex-wrap">
              <img class="w-full lg:w-1/2" v-lazy="mint.image" alt="Frey image">
              <div style="top: 15px; left: 15px"
                   class="absolute bg-white py-2 px-4 rounded-full text-sm uppercase text-dark"
                   v-if="mint.tokenId <= 542">
                <strong>Pre sale Frey!</strong>
              </div>
              <div class="w-full lg:w-1/2 lg:pl-8 my-auto">
                <p class="py-3 text-xl">
                  {{ mint.name }} <br>
                </p>
                <div class="py-2">
                  <div class="flex" :key="mint.tokenId + attribute.trait_type" v-for="attribute in mint.attributes">
                    <strong class="w-5/12">{{ attribute.trait_type }}: </strong>
                    <span class="w-7/12">{{ attribute.value === '-' ? 'None' : attribute.value }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      <div v-else class="p-4 md:p-8 relative mt-12">
        <div class="m-auto text-center">
          <div class="w-full flex">
            <img class="w-24 h-24 m-auto" src="/images/XYA.png" alt="XYA logo"
                 style="animation: rotation 2s infinite linear;">
          </div>
          <br>
          <p class="text-2xl">Loading...</p>
        </div>
      </div>
    </div>
  </section>
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
      loading: true,
      frey: [],
      foundFrey: [],
      currentPage: 1,
      allPages: 100,
      pages: 1,
      showMin: 0,
      showMax: 0,
      search: ''
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