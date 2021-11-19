<template>
  <section style="background: url('/images/map/worldmap.png') no-repeat; background-size: cover; min-height: 100vh"
           class="flex p-4 md:p-16 lg:px-32">
    <div style="background: #1c1c1c; z-index: 9999; overflow-y: auto;" class="screen rounded-2xl w-full">
      <section id="section-i-1" class="border-b-4 border-primary-alt"
               style="background: url('/images/SVG/homepage-bg-top.svg') no-repeat top right">
        <div class="container mx-auto text-center pt-16 md:pt-24 pb-16 md:pb-20">
          <h1 class="text-2xl md:text-5xl text-primary-alt font-semibold">
            Your Family
          </h1>

          <div class="flex">
            <div class="flex flex-wrap w-full 2xl:w-2/3 mx-auto mt-4 px-4 md:px-0">
              <router-link class="w-full md:w-1/5 mx-auto" :to="{ name: 'frey-nft' }">
                <button
                    class="w-full mb-2 rounded-none border border-primary-alt hover:bg-primary-alt hover:text-brown px-4 py-2 min-h-12">
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
      <div v-if="!loading" class="minted-frey py-8 px-4 flex flex-wrap">
        <div class="w-full p-4 md:p-8">
          <router-link :to="{ name: 'world-map' }">
            <i class="fas fa-long-arrow-alt-left"></i> Back
          </router-link>
        </div>
        <div class="w-full lg:w-1/2 xl:w-1/3 2xl:w-1/4" :key="mint.tokenId" v-for="mint in yourFrey">
          <div class="p-2 relative">
            <img class="w-full" v-lazy="mint.image" alt="Frey image">
            <div style="top: 15px; left: 15px"
                 class="absolute bg-white py-2 px-4 rounded-full text-sm uppercase text-dark" v-if="mint.tokenId <= 542">
              <strong>Pre sale Frey!</strong>
            </div>

            <div class="w-full py-2 text-center rounded-b-xl dark:bg-white bg-dark text-white dark:text-dark">
              <input class="py-2 dark:bg-white text-center bg-dark text-white dark:text-dark w-full border border-yellow"
                     v-model="mint.sendToAddress" type="text" placeholder="Type address here...">
              <hr>
              <button v-if="mint.tokenId === sendingLoading" disabled class="w-full mb-2 mx-auto rounded-none border border-primary-alt px-4 py-2 min-h-12">Sending....</button>
              <button v-else @click="sendFrey(mint.tokenId, mint.sendToAddress)" class="w-full mb-2 mx-auto rounded-none border border-primary-alt hover:bg-primary-alt hover:text-brown px-4 py-2 min-h-12">Send Frey Away!
              </button>
            </div>
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
      loading: true,
      sendingLoading: undefined,
      yourFrey: [],
      allFrey: []
    }
  },
  async mounted() {
    await this.getYourFrey()
  },
  methods: {
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