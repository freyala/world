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
    <div :class="`${showSideBar ? 'xl:w-4/5 w-full py-32 px-8' : 'w-full'} flex flex-wrap h-full relative overflow-y-scroll`">
      <div class="w-full lg:w-1/2 xl:w-1/3" :key="mint.tokenId" v-for="(mint, index) in yourFrey">
        <div class="pr-2 pb-2 relative">
          <div class="absolute cursor-pointer bg-detail-bg top-0 left-0 h-full w-full opacity-0 hover:opacity-90"
               @click="showAttributes(index)">
            <div class="flex w-full h-full">
              <p class="m-auto text-2xl">
                Show attributes
              </p>
            </div>
          </div>
          <img class="w-full" v-lazy="mint.image" alt="Frey image">

          <div style="top: 15px; left: 15px"
               class="absolute bg-white py-2 px-4 rounded-full text-sm uppercase text-dark" v-if="mint.tokenId <= 542">
            <strong>Presale Frey!</strong>
          </div>
        </div>

        <div class="w-full pb-6 text-center dark:bg-white bg-detail-bg text-primary-head dark:text-dark px-16">
          <input
              class="py-2 dark:bg-white text-center bg-detail-bg text-primary-head dark:text-dark w-full border-b border-primary-head"
              v-model="mint.sendToAddress" type="text" placeholder="Type address here...">
          <button v-if="mint.tokenId === sendingLoading" disabled class="w-full my-2 mx-auto xya-btn relative">
            Sending....
          </button>
          <button v-else @click="sendFrey(mint.tokenId, mint.sendToAddress)"
                  class="w-full my-2 mx-auto xya-btn relative">Send {{ mint.name }} Away!
          </button>
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
        <div v-if='yourFrey.length > 0' class="mt-4 flex flex-wrap w-full items-start justify-start">
          <div
              v-if="yourFrey[selectedIndex].attributes.some((a) => { return (a.trait_type === 'Gender' && a.value === 'Female') })"
              class="w-full flex flex-wrap" :key="yourFrey[selectedIndex].tokenId + attribute.trait_type" v-for="attribute in yourFrey[selectedIndex].attributes">
            <strong class="w-5/12">{{ attribute.trait_type }}: </strong>
            <span class="w-7/12">{{
                attribute.value === '-' ? 'None' : (attribute.value === 'Yin' ? 'Yang' : (attribute.value === 'Yang' ? 'Yin' : attribute.value === 'Female Yin' ? 'Female Yang' : (attribute.value === 'Female Yang' ? 'Female Yin' : attribute.value)))
              }}</span>
          </div>
          <div
              v-if="!yourFrey[selectedIndex].attributes.some((a) => { return (a.trait_type === 'Gender' && a.value === 'Female') })"
              class="w-full flex flex-wrap" :key="yourFrey[selectedIndex].tokenId + attribute.trait_type" v-for="attribute in yourFrey[selectedIndex].attributes">
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
import {ethers} from 'ethers'
import frey from '../../plugins/artifacts/frey.json'
import axios from "axios";
import {initWeb3} from "../../plugins/initWeb3";
import wallet from "../../plugins/wallet";

export default {
  name: 'YourFamily',
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
      sendingLoading: undefined,
      yourFrey: [],
      allFrey: [],
      selectedIndex: 0
    }
  },
  async mounted() {
    await this.getYourFrey()
  },
  methods: {
    showAttributes(index) {
      this.selectedIndex = index
      this.$modal.show('attributes')
    },
    async sendFrey(id, address) {
      try {
        this.sendingLoading = id

        let web3 = await initWeb3()

        const contract = await new web3.eth.Contract(frey.abi, frey.address)
        await contract.methods.transferFrom(this.metaMaskAccount, address, id).send({
          from: this.metaMaskAccount
        })

        this.sendingLoading = undefined
        window.location.reload(1)
      } catch {
        this.sendingLoading = undefined
      }
    },
    async getYourFrey() {
      const contract = new ethers.Contract(frey.address, frey.abi, this.metaMaskWallet.signer)
      this.allFrey = await contract.tokensOfOwner(this.metaMaskAccount)

      let ids = await this.allFrey.map(async (frey) => {
        return frey._isBigNumber ? ethers.BigNumber.from(frey._hex).toString() : frey._hex
      })


      await Promise.all(ids)
          .then(async (listOfIds) => {

            const yourFrey = await axios.get(`https://frey.freyala.com/meta/list?items=${listOfIds}`)
            this.yourFrey = yourFrey.data
            this.loading = false

          })
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