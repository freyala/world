<template>
  <div style="width: 100vw; min-height:100vh; height: 100vh; z-index: 999"
       class="flex flex-row w-full h-full relative bg-detail-bg">

    <div v-show='!freyMounted' class='absolute top-0 right-0 left-0 bottom-0'
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

    <div v-show='!showSideBar' v-on:click='showSideBar = true'
         class='h-16 w-8 dark-panel absolute flex items-center justify-center block xl:hidden rounded-r-xl'
         style='top: 50%; left: 0%; z-index: 1'>
      <i class='fa fa-arrow-right'></i>
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
           style='top: 50%; right: 0px'>
        <i v-if='showSideBar' class='fa fa-arrow-left'></i>
        <i v-else class='fa fa-arrow-right'></i>
      </div>

    </div>
    <div :class="`${showSideBar ? 'xl:w-4/5 w-full mt-32 px-8' : 'w-full'} h-full relative overflow-y-auto`">
      <div class="flex flex-wrap 2xl:my-0 text-center">
        <div class="w-full xl:w-1/4 xl:mb-12 flex">
          <img class="mx-auto" src="/images/LOADING.png" alt="Mint a Frey">
        </div>
        <div class="w-full xl:w-3/4 xl:pl-24">
          <div v-if="minting">
            <p class="mt-6 text-center text-2xl md:text-4xl">
              <strong>
                Minting...
              </strong>
            </p>
          </div>
          <div v-else class="flex my-auto">
            <div class="flex flex-wrap w-full mx-auto py-4 mb-8 px-12">
              <button @click="mint(1)" class="w-full mb-2 mx-auto xya-btn relative">
                Mint 1
              </button>
              <button @click="mint(3)" class="w-full mb-2 mx-auto xya-btn relative">
                Mint 3
              </button>
              <button @click="mint(5)" class="w-full mb-2 mx-auto xya-btn relative">
                Mint 5
              </button>
            </div>
          </div>
        </div>

        <div class="text-center mt-4">
          <p style="color: red">{{ error }}</p>
        </div>
      </div>

      <div class="w-full mx-auto flex flex-wrap mt-8 xl:mt-0">
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

      <window class='w-10/12' height="auto" width="80%" name="minted">
        <div class="flex flex-wrap p-6 bg-detail-bg h-full">
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
    </div>

  </div>
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
      showSideBar: true,
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