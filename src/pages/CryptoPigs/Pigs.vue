<template>
  <section style=" min-height: 100vh" class="flex p-4 md:p-16 lg:px-32">
    <div style="overflow-y: auto;" class="screen rounded-2xl w-full bg-pigs relative">
      <div class="p-8 flex absolute top-0 w-full">
        <div class="w-1/4 z-50">
          <router-link :to="{path: 'marketplace', query: { market: '0xe5fd335819edb8da8395f8ec48beca747a0790ab' }}">
            <img class="h-20 mb-4 mx-4" src="/pigs/Marketplace.svg" alt="Marketplace">
          </router-link>
        </div>
        <div class="w-1/2 mx-auto text-center z-50">
          <div class="relative flex">
            <img class="h-20 inline m-auto" src="/pigs/NameBar.svg" alt="Name bar">
            <input class="absolute pink top-0 left-0 pt-6 w-full text-center" type="text" v-model="titleText">
          </div>
          <div class="relative flex">
            <img class="h-20 inline m-auto" src="/pigs/WelcomeButton.svg" alt="Welcome bar">
            <input class="absolute top-0 left-0 text-xl text-white pt-6 text-xl w-full text-center" type="text" value="George">
<!--            <input class="absolute top-0 left-0 text-xl text-white pt-5 text-xl w-full text-center" type="text" v-model="yourPigs[selectedPig].name">-->
          </div>
        </div>
        <div class="w-1/4 ml-auto z-50">
<!--          <img class="h-20 mb-4 mx-4" src="/pigs/GameSettings.svg" alt="GameSettings">-->
<!--          <img class="h-20 mb-4 mx-4" src="/pigs/WalletSettings.svg" alt="WalletSettings">-->
        </div>
      </div>

      <div class="flex flex-wrap p-4 md:p-8 relative h-full">
        <div class="w-full flex mt-auto">
          <img class="m-auto w-1/5 pt-60" src="/pigs/Pig.png" alt="Pig">
<!--          <img class="m-auto w-1/4 pt-48" :src="yourPigs[selectedPig].image" alt="Pig">-->
        </div>

        <div class="w-full flex">
          <div class="w-1/4 mt-auto">
            <h6 class="pl-2 mb-2 text-2xl text-white">
              Active pigs (3)
            </h6>
            <div class="pr-4 pink" style="height: 200px; overflow-y: auto">
              <div class="flex flex-wrap">
                <div class="w-full cursor-pointer bg-white rounded-xl px-4 py-2 mb-2" v-for="pig in yourPigs.slice(0,3)">
                  {{ pig.name }} (age: 23)
                </div>
              </div>
            </div>
          </div>
          <div class="w-1/3 flex mx-auto mt-auto pink">
            <div class="cursor-pointer w-28 h-28 inline mx-auto relative">
              <div class="z-20 absolute top-0 left-0 w-full h-full">
                <img class="h-28 inline" src="/pigs/Eat Button.svg" alt="Eat Button">
              </div>
              <div class="z-10 absolute top-0 left-0 w-full h-full progress-container">
                <div class="progress">
                  <strong class="bar" :style="`height: ${eatBar}%`"></strong>
                </div>
              </div>
            </div>
            <div class="cursor-pointer w-28 h-28 inline mx-auto relative">
              <div class="z-20 absolute top-0 left-0 w-full h-full">
                <img class="h-28 inline" src="/pigs/Play Button.svg" alt="Play Button">
              </div>
              <div class="z-10 absolute top-0 left-0 w-full h-full progress-container">
                <div class="progress">
                  <strong class="bar" :style="`height: ${playBar}%`"></strong>
                </div>
              </div>
            </div>
            <div class="cursor-pointer w-28 h-28 inline mx-auto relative">
              <div class="z-20 absolute top-0 left-0 w-full h-full">
                <img class="h-28 inline" src="/pigs/Wash Button.svg" alt="Wash Button">
              </div>
              <div class="z-10 absolute top-0 left-0 w-full h-full progress-container">
                <div class="progress">
                  <strong class="bar" :style="`height: ${washBar}%`"></strong>
                </div>
              </div>
            </div>
            <div class="cursor-pointer w-28 h-28 inline mx-auto relative">
              <div class="z-20 absolute top-0 left-0 w-full h-full">
                <img class="h-28 inline" src="/pigs/Nap Button.svg" alt="Nap Button">
              </div>
              <div class="z-10 absolute top-0 left-0 w-full h-full progress-container">
                <div class="progress">
                  <strong class="bar" :style="`height: ${napBar}%`"></strong>
                </div>
              </div>
            </div>
          </div>
          <div class="w-1/4 mt-auto">
            <h6 class="pl-2 mb-2 text-2xl text-white">
              Inactive pigs ({{ yourPigs.length }})
            </h6>
            <div class="pr-4 pink" style="height: 200px; overflow-y: auto">
              <div class="flex flex-wrap">
                <div @click="activatePig(pig.id)" class="w-full cursor-pointer bg-white rounded-xl px-4 py-2 mb-2" v-for="pig in yourPigs.slice(3,999)">
                  {{ pig.name }} (activate)
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import wallet from "../../plugins/wallet"
import {ethers} from "ethers";
import frey from "../../plugins/artifacts/frey.json";
import axios from "axios";
import {mapGetters} from "vuex";

export default {
  name: 'CryptoPigs',
  mixins: [wallet],
  computed: {
    ...mapGetters([
      'metaMaskAccount',
      'metaMaskWallet'
    ])
  },
  data() {
    return {
      eatBar: 15,
      playBar: 45,
      washBar: 67,
      napBar: 5,
      titleText: 'George be feeling tired ser',
      pigAge: 0,
      yourPigs: [],
      selectedPig: 0,
    }
  },
  mounted() {
    this.getYourPigs()
  },
  methods: {
    activatePig(id) {
      console.log(id)
    },
    async getYourPigs() {
      const contract = new ethers.Contract('0xe5fd335819edb8da8395f8ec48beca747a0790ab', frey.abi, this.metaMaskWallet.signer)
      const pigIds = await contract.tokensOfOwner(this.metaMaskAccount)

      let ids = await pigIds.map(async (frey) => {
        return frey._isBigNumber ? ethers.BigNumber.from(frey._hex).toString() : frey._hex
      })

      await Promise.all(ids)
          .then(async (listOfIds) => {

            const yourPigs = await axios.get(`https://api.cryptopigs.one/meta/list?items=${listOfIds}`)
            this.yourPigs = yourPigs.data
            this.loading = false

          })
    }
  }
}
</script>

<style scoped>
div, input {
  font-family: 'Chango', serif !important;
}

.pink {
  color: #dc5689 !important;
}

.progress-container {
  padding: 12px 15px 20px 15px;
}

.progress {
  width: 100%;
  height: 100%;
  background-color: #fff;
  border: 1px solid #ccc;
  position: relative;
}

.bar {
  width: 100%;
  display: block;
  font-size: 12px;
  background-color: #bb9319;
  color: #fff;
  position: absolute;
  bottom: 0;
}

::-webkit-scrollbar-thumb {
  background: #FFFFFF !important;
  border-radius: 12px;
}

input {
  background: none;
  outline: none;
}
</style>