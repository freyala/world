<template>
  <section id="frey-container" style="background: url('/images/map/worldmap_small.png') no-repeat; background-size: cover; min-height: 100vh"
           class="flex p-4 md:p-16 lg:px-32">
    <div style="background: #1c1c1c; z-index: 9999; overflow-y: auto;" class="screen rounded-2xl w-full">
      <section id="section-i-1" class="border-b-4 border-bbrown"
               style="background: url('/images/SVG/homepage-bg-top.svg') no-repeat top right">
        <div class="container mx-auto text-center py-16">
          <h1 class="text-2xl md:text-5xl text-primary-alt font-semibold">
            All citizens
          </h1>
          <div class="w-full text-center mx-auto">
            <div class="inline" v-if="currentPage > 5">
              <router-link class="px-1" :to="{ name: 'frey-gallery', query: { page: 1 } }">
                <i class="fas fa-angle-double-left"></i>
              </router-link>
            </div>

            <router-link class="px-1" :to="{ name: 'frey-gallery', query: { page: currentPage - 1 } }"
                         v-if="currentPage > 1">
              <i class="fas fa-angle-left"></i>
            </router-link>

            <div class="inline" v-if="currentPage > 5">
              ...
            </div>

            <div class="inline" :key="`page-top-${page}`" v-for="page in pages">
              <router-link class="text-lg px-1" :to="{ name: 'frey-gallery', query: { page: page } }"
                           v-if="page > (currentPage - 5) && page < (currentPage + 5)">
                {{ page }}
              </router-link>
            </div>

            <div class="inline" v-if="currentPage < pages && pages > 5">
              ...
            </div>

            <router-link class="px-1" :to="{ name: 'frey-gallery', query: { page: currentPage + 1 } }"
                         v-if="currentPage < pages">
              <i class="fas fa-angle-right"></i>
            </router-link>

            <div class="inline" v-if="currentPage < pages && pages > 5">
              <router-link class="px-1" :to="{ name: 'frey-gallery', query: { page: pages } }">
                <i class="fas fa-angle-double-right"></i>
              </router-link>
            </div>
          </div>

        </div>
      </section>
      <div v-if="!loading" id="gallery" class="flex flex-wrap p-4 md:p-8">
        <div class="w-full md:w-1/4 mb-12">
          <div class="flex flex-wrap w-full mx-auto">
            <router-link class="w-full mx-auto mb-2" :to="{ name: 'world-map' }">
              <button class="mx-auto xya-btn">
                <i class="fas fa-long-arrow-alt-left"></i> Back to world
              </button>
            </router-link>
            <router-link class="w-full mx-auto mb-2" :to="{ name: 'frey-nft' }">
              <button class="mx-auto xya-btn">
                Get Frey
              </button>
            </router-link>
            <router-link class="w-full mx-auto mb-2" :to="{ name: 'frey-collection' }">
              <button class="mx-auto xya-btn">
                Your Frey
              </button>
            </router-link>
            <router-link class="w-full mx-auto mb-2" :to="{ name: 'frey-gallery' }">
              <button class="mx-auto xya-btn">
                All Frey
              </button>
            </router-link>
            <router-link class="w-full mx-auto mb-2" :to="{ name: 'frey-attributes' }">
              <button class="mx-auto xya-btn">
                All Attributes
              </button>
            </router-link>
          </div>
        </div>

        <div class="w-full md:w-3/4 md:pl-12">
          <div class="minted-frey flex flex-wrap" v-if="frey.length < (showMax - (showMin - 1))">
            <div class="text-center">
              <h1 class="text-xl">
                Fetching citizens...
              </h1>
            </div>
          </div>
          <div class="minted-frey flex flex-wrap" v-else>
            <div class="w-full lg:w-1/2 xl:w-1/3 2xl:w-1/4" :key="mint.tokenId" v-for="(mint, index) in frey">
              <div class="p-2 relative">
                <div class="absolute cursor-pointer bg-dark top-0 left-0 h-full w-full opacity-0 hover:opacity-90" @click="showAttributes(index)">
                  <div class="flex w-full h-full">
                    <p class="m-auto text-2xl">
                      Show attributes
                    </p>
                  </div>
                </div>
                <img v-lazy="mint.image" alt="Frey image">
                <div style="top: 15px; left: 15px"
                     class="absolute bg-white py-2 px-4 rounded-full text-sm uppercase text-dark"
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
                <router-link class="px-1" :to="{ name: 'frey-gallery', query: { page: 1 } }">
                  <i class="fas fa-angle-double-left"></i>
                </router-link>
              </div>

              <router-link class="px-1" :to="{ name: 'frey-gallery', query: { page: currentPage - 1 } }"
                           v-if="currentPage > 1">
                <i class="fas fa-angle-left"></i>
              </router-link>

              <div class="inline" v-if="currentPage > 5">
                ...
              </div>

              <div class="inline" :key="`page-bot-${page}`" v-for="page in pages">
                <router-link class="text-lg px-1" :to="{ name: 'frey-gallery', query: { page: page } }"
                             v-if="page > (currentPage - 5) && page < (currentPage + 5)">
                  {{ page }}
                </router-link>
              </div>

              <div class="inline" v-if="currentPage < pages && pages > 5">
                ...
              </div>

              <router-link class="px-1" :to="{ name: 'frey-gallery', query: { page: currentPage + 1 } }"
                           v-if="currentPage < pages">
                <i class="fas fa-angle-right"></i>
              </router-link>

              <div class="inline" v-if="currentPage < pages && pages > 5">
                <router-link class="px-1" :to="{ name: 'frey-gallery', query: { page: pages } }">
                  <i class="fas fa-angle-double-right"></i>
                </router-link>
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
      <window window class='w-10/12' height="auto" width="80%" name="attributes">
        <div class="flex flex-wrap p-6 bg-dark h-full">
          <div class="w-4/5">
            <div class="text-2xl">Attributes</div>
          </div>
          <div class="w-1/5 text-right">
            <i @click="$modal.hide('attributes')" class="fas fa-times cursor-pointer text-xl"></i>
          </div>
          <div class="mt-4 flex flex-wrap w-full items-start justify-start">
            <div
                v-if="frey[selectedIndex].attributes.some((a) => { return (a.trait_type === 'Gender' && a.value === 'Female') })"
                class="w-full flex flex-wrap" :key="frey[selectedIndex].tokenId + attribute.trait_type" v-for="attribute in frey[selectedIndex].attributes">
              <strong class="w-5/12">{{ attribute.trait_type }}: </strong>
              <span class="w-7/12">{{
                  attribute.value === '-' ? 'None' : (attribute.value === 'Yin' ? 'Yang' : (attribute.value === 'Yang' ? 'Yin' : attribute.value === 'Female Yin' ? 'Female Yang' : (attribute.value === 'Female Yang' ? 'Female Yin' : attribute.value)))
                }}</span>
            </div>
            <div
                v-if="!frey[selectedIndex].attributes.some((a) => { return (a.trait_type === 'Gender' && a.value === 'Female') })"
                class="w-full flex flex-wrap" :key="frey[selectedIndex].tokenId + attribute.trait_type" v-for="attribute in frey[selectedIndex].attributes">
              <strong class="w-5/12">{{ attribute.trait_type }}: </strong>
              <span class="w-7/12">{{ attribute.value === '-' ? 'None' : attribute.value }}</span>
            </div>
          </div>
        </div>
      </window>

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

<style scoped>
#frey-container {
  --var-slots-bg: #1e2b22;
  --var-slots-dark-bg: #181f1f;
  --var-hilight-color: #43ac6b;
  --var-hilight-strong: #8cd1a6;
  --var-soft-shadow-color: #263c2f;
  --var-shadow-color: #0e1111;
  --var-border-radius: 12px;
}

#tutorial p > span {
  font-weight: bold;
  color: #8cd1a6 !important;
}

#tutorial a:hover {
  color: #8cd1a6;
}

.inner-shadow {
  -moz-box-shadow: inset 0 0 12px var(--var-shadow-color);
  -webkit-box-shadow: inset 0 0 12px var(--var-shadow-color);
  box-shadow: inset 0 0 12px var(--var-shadow-color);
}

.txt-hilight {
  font-weight: bold;
  color: #8cd1a6 !important;
}

.txt-tutorial {
  color: rgba(255, 255, 255, 0.75);
}

.highlight-border {
  border-width: 1px;
  border-style: solid;
  border-image: linear-gradient(225deg,
  var(--var-hilight-color),
  var(--var-soft-shadow-color),
  var(--var-soft-shadow-color)) 1 25%;
}

.xya-btn {
  background-color: var(--var-slots-bg);
  border-radius: var(--var-border-radius);
  box-sizing: border-box;
  color: #8cd1a7c7;
  display: block;
  font-size: max(calc(1vw - 1px), 14px);
  padding: 10px;
  position: relative;
  text-decoration: none;
  z-index: 2;
  transition: all 1s ease-out;
  width: 85%;
}

.xya-btn:hover {
  background-image: linear-gradient(190deg,
  var(--var-hilight-strong) 5%,
  var(--var-hilight-color) 10%,
  var(--var-soft-shadow-color),
  var(--var-slots-bg));
  color: #fff;
}


.xya-btn:hover span {
  background: transparent;
}
</style>