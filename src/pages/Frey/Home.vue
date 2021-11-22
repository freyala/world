<template>
  <section id="frey-container"
           style="background: url('/images/map/worldmap.png') no-repeat; background-size: cover; min-height: 100vh"
           class="flex p-4 md:p-16 lg:px-32">
    <div style="background: #1c1c1c; z-index: 9999; overflow-y: auto;" class="screen rounded-2xl w-full">
      <section id="section-i-1" class="border-b-4 border-bbrown"
               style="background: url('/images/SVG/homepage-bg-top.svg') no-repeat top right">
        <div class="container mx-auto text-center pt-16 md:pt-24 pb-16 md:pb-20">
          <h1 class="text-2xl md:text-5xl text-primary-alt font-semibold">
            Become a citizen!
          </h1>

          <div class="flex">
            <div class="flex flex-wrap w-full 2xl:w-2/3 mx-auto mt-4 px-4 md:px-0">
              <router-link class="flex w-full md:w-1/5 mx-auto mb-1" :to="{ name: 'frey-nft' }">
                <button class="xya-btn mx-auto">
                  Get Frey
                </button>
              </router-link>
              <router-link class="flex w-full md:w-1/5 mx-auto mb-1" :to="{ name: 'frey-collection' }">
                <button class="xya-btn mx-auto">
                  Your Frey
                </button>
              </router-link>
              <router-link class="flex w-full md:w-1/5 mx-auto mb-1" :to="{ name: 'frey-gallery' }">
                <button class="xya-btn mx-auto">
                  All Frey
                </button>
              </router-link>
              <router-link class="flex w-full md:w-1/5 mx-auto mb-1" :to="{ name: 'frey-attributes' }">
                <button class="xya-btn mx-auto">
                  All Attributes
                </button>
              </router-link>
            </div>
          </div>
        </div>
      </section>
      <div v-if="freyMounted" id="home" class="flex flex-wrap p-4 md:p-8">
        <div class="w-full p-4 md:p-8">
          <router-link :to="{ name: 'world-map' }">
            <i class="fas fa-long-arrow-alt-left"></i> Back
          </router-link>
        </div>
        <div class="w-full mx-auto 2xl:my-0 text-center">
          <img class="mx-auto w-64 md:w-96 mb-12" src="/images/LOADING.png" alt="Mint a Frey">

          <div v-if="minting">
            <p class="mt-6 text-center text-2xl md:text-4xl">
              <strong>
                Minting...
              </strong>
            </p>
          </div>
          <div v-else class="flex">
            <div class="flex flex-wrap w-full 2xl:w-2/3 mx-auto py-4 mb-8">
              <button @click="mint(1)" class="w-full mb-2 md:w-1/4 mx-auto xya-btn">
                Mint 1
              </button>
              <button @click="mint(3)" class="w-full mb-2 md:w-1/4 mx-auto xya-btn">
                Mint 3
              </button>
              <button @click="mint(5)" class="w-full mb-2 md:w-1/4 mx-auto xya-btn">
                Mint 5
              </button>
            </div>
          </div>

          <div class="text-center mt-4">
            <p style="color: red">{{ error }}</p>
          </div>
        </div>

        <div class="w-full md:w-4/5 mx-auto flex flex-wrap mt-8 xl:mt-0">
          <h2 class="w-full text-3xl md:text-5xl mb-6 text-center">
            Last Frey entered
          </h2>
          <div class="w-full flex flex-wrap md:w-1/3" :key="mint.tokenId" v-for="mint in last">
            <div class="w-1/3 md:w-full">
              <img v-lazy="mint.image" alt="Frey image" class="pr-4 pb-4">
            </div>
            <div class="w-2/3 w-1/3 md:w-full my-auto pl-2">
              <p class="py-3 text-xl">
                <strong>{{ mint.name }}</strong> <br>
              </p>
            </div>
          </div>
        </div>

        <window class="hidden md:block" name="minted" width="50%" height="50%">
          <div class="flex flex-wrap p-8 bg-white dark:bg-gray-800 border dark:border-gray-500 h-full"
               style="overflow-y: auto">
            <div class="w-4/5 mb-4">
              <p class="text-2xl">
                Received Frey:
              </p>
            </div>
            <div class="w-1/5 text-right">
              <i @click="$modal.hide('minted')" class="text-xl cursor-pointer">x</i>
            </div>

            <div class="w-full">
              <hr class="my-3">

              <div class="flex flex-wrap mt-2" :key="`minted-${mint.tokenId}`"
                   v-for="mint in minted">
                <div class="w-1/4 pb-2">
                  <img class="w-24" v-lazy="mint.image" alt="Frey">
                </div>
                <div class="pl-4 w-3/4 my-auto">
                  <p class="pb-3 text-xl">
                    {{ mint.name }} <br>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </window>
        <window class="md:hidden" name="minted" width="90%" height="90%">
          <div class="flex flex-wrap p-8 bg-white dark:bg-gray-800 border dark:border-gray-500 h-full"
               style="overflow-y: auto">
            <div class="w-4/5 mb-4">
              <p class="text-2xl">
                Received Frey:
              </p>
            </div>
            <div class="w-1/5 text-right">
              <i @click="$modal.hide('minted')" class="text-xl cursor-pointer">x</i>
            </div>
            <div class="w-full">

              <hr class="my-3">

              <div class="flex flex-wrap mt-2" :key="`minted-${mint.tokenId}`"
                   v-for="mint in minted">
                <div class="w-1/4 pb-2">
                  <img class="w-24" v-lazy="mint.image" alt="Frey">
                </div>
                <div class="pl-4 w-3/4 my-auto">
                  <p class="pb-3 text-lg">
                    {{ mint.name }} <br>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </window>
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
import {ethers} from 'ethers'
import frey from '../../plugins/artifacts/frey.json'
import {initWeb3} from "../../plugins/initWeb3"
import wallet from "../../plugins/wallet";
import axios from "axios";

export default {
  name: 'Home',
  mixins: [wallet],
  computed: {
    ...mapGetters([
      'metaMaskAccount',
      'metaMaskWallet'
    ])
  },
  data() {
    return {
      freyMounted: false,
      presaleStarted: false,
      saleStarted: false,
      total: 0,
      loading: true,
      error: '',
      minting: false,
      totalMinted: 0,
      minted: [],
      last: []
    }
  },
  async mounted() {
    const contractInstance = new ethers.Contract(frey.address, frey.abi, this.metaMaskWallet.signer);
    this.totalMinted = parseInt(await contractInstance.totalSupply());

    await this.getLastMinted()
    this.freyMounted = true
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
    async getLastMinted() {
      this.showMin = parseInt(this.totalMinted) > 3 ? parseInt(this.totalMinted) - 3 : 0
      this.showMax = parseInt(this.totalMinted) > 1 ? parseInt(this.totalMinted) - 1 : 0

      const ids = this.range(this.showMin, this.showMax)

      let dataArray = await ids.map(async (id) => {
        const tag = await axios.get(`https://frey.freyala.com/meta?meta=${id}`)
        return tag.data
      })

      await Promise.all(dataArray)
          .then(async (res) => {
            this.last = res
          })

      this.loading = false
    },
    async mint(amount) {
      this.minting = true
      this.error = ''

      try {
        let web3 = await initWeb3()

        const contract = await new web3.eth.Contract(frey.abi, frey.address)
        const event = await contract.methods.mintNFT(amount).send({
          from: this.metaMaskAccount,
          value: ethers.utils.parseEther((750 * amount).toString())
        })

        this.minted = []

        if (event.events.Transfer.length > 0) {
          event.events.Transfer.map(async (t) => {
            const tag = await axios.get(`https://frey.freyala.com/meta?meta=${t.returnValues.tokenId}`)
            this.minted.push(tag.data)
          })
        } else {
          const tag = await axios.get(`https://frey.freyala.com/meta?meta=${event.events.Transfer.returnValues.tokenId}`)
          this.minted.push(tag.data)
        }

        this.$modal.show('minted')
        await this.getLastMinted()

      } catch (err) {
        if (err.code !== 4001) {
          this.error = err.data ? err.data.message : err
        }

        this.error = err.data ? err.data.message : err.message
      }

      this.minting = false
    },
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