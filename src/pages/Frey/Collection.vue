<template>
  <section id="frey-container" style="background: url('/images/map/worldmap.png') no-repeat; background-size: cover; min-height: 100vh"
           class="flex p-4 md:p-16 lg:px-32">
    <div style="background: #1c1c1c; z-index: 9999; overflow-y: auto;" class="screen rounded-2xl w-full">
      <section id="section-i-1" class="border-b-4 border-bbrown"
               style="background: url('/images/SVG/homepage-bg-top.svg') no-repeat top right">
        <div class="container mx-auto text-center py-16">
          <h1 class="text-2xl md:text-5xl text-primary-alt font-semibold">
            Your Family
          </h1>
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

        <div class="w-full flex flex-wrap md:w-3/4 md:pl-12">
          <div class="w-full lg:w-1/2 xl:w-1/3 2xl:w-1/4" :key="mint.tokenId" v-for="(mint, index) in yourFrey">
          <div class="pr-2 pb-2 relative">
            <div class="absolute cursor-pointer bg-dark top-0 left-0 h-full w-full opacity-0 hover:opacity-90" @click="showAttributes(index)">
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

          <div class="w-full pb-6 text-center rounded-b-xl dark:bg-white bg-dark text-white dark:text-dark">
            <input class="py-2 dark:bg-white text-center bg-dark text-white dark:text-dark w-full border-b border-bbrown"
                   v-model="mint.sendToAddress" type="text" placeholder="Type address here...">
            <button v-if="mint.tokenId === sendingLoading" disabled class="w-full my-2 mx-auto xya-btn">Sending....</button>
            <button v-else @click="sendFrey(mint.tokenId, mint.sendToAddress)" class="w-full my-2 mx-auto xya-btn">Send {{ mint.name }} Away!
            </button>
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