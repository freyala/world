<template>
  <transition name="slide">
    <div class="slide-in shadow-xl" v-if="openWindow === 'dexaggregator' || openWindow === 'dexaggregator-large'"
         :style="openWindow === 'dexaggregator-large' ? 'width: 100%;' : 'width: 30vw;'"
         style="background: url('/images/ui/screen-bg.png') repeat-y; top: 64px; min-width: 500px; background-size: contain; overflow-y: scroll;">

      <div class="absolute top-0 left-0 py-4 px-6">
        <i @click="$store.dispatch('setOpenWindow', '')" class="fas fa-times cursor-pointer text-xl"></i>
      </div>

      <div class="flex relative cursor-pointer" @click="setFavourite('dexaggregator')">
        <img v-if="favourites.includes('dexaggregator')" class="mx-auto" src="/images/ui/window-banner-favourite.png"
             alt="Banner">
        <img v-else class="mx-auto" src="/images/ui/window-banner-unfavourite.png" alt="Banner">
        <div class="absolute text-center w-full" style="top: 80px; line-height: 0.25">
          <small>Click to favourite</small>
          <p class="text-2xl">Market of Trade</p>
        </div>
      </div>

      <br>

      <div class="flex flex-wrap">
        <small class="w-full">Currently approved: {{ allowance.dexAggregator }} XYA</small>

        <div class="w-1/2 pr-2">
          <input class="w-full border border-yellow bg-transparent px-4 h-12" v-model="amountToApprove" type="number">
        </div>
        <div class="w-1/2 pl-2">
          <button class="w-full rounded-none border border-yellow bg-transparent px-4 py-2 h-12"
                  @click="addAllowance()">
            Approve amount <i v-if="dexAggregatorLoading.allowance" class="fas fa-cog fa-spin"></i>
          </button>
        </div>

        <button class="w-full rounded-none border border-yellow bg-transparent px-4 py-2 h-12 mt-4"
                @click="addAllowance(999999999999.9999)">
          Approve max amount <i v-if="dexAggregatorLoading.maxAllowance" class="fas fa-cog fa-spin"></i>
        </button>
      </div>

      <br>
      <br>

      <div class="flex flex-wrap">
        <div class="w-1/2 pr-2">
          <input class="w-full border border-yellow bg-transparent px-4 h-12" v-model="amountToPrice" type="number">
        </div>
        <div class="w-1/2 pl-2">
          <button class="w-full rounded-none border border-yellow bg-transparent px-4 py-2 h-12"
                  @click="getPrices(amountToPrice, 'buy')">
            Get buy prices!
          </button>
        </div>

        <div v-if="lookedUpBuyPrices" class="w-full mt-6">
          Buy {{ dexAggregatorRates.buy.loot.xya }} XYA for {{ parseFloat(dexAggregatorRates.buy.loot.one).toFixed(4) }} ONE over at LOOTSWAP!
          <br>
          <br>
          Buy {{ dexAggregatorRates.buy.mochi.xya }} XYA for {{ parseFloat(dexAggregatorRates.buy.mochi.one).toFixed(4) }} ONE over at MOCHISWAP!
          <br>
          <br>
          Buy {{ dexAggregatorRates.buy.open.xya }} XYA for {{ parseFloat(dexAggregatorRates.buy.open.one).toFixed(4) }} ONE over at OPENSWAP!
          <br>
          <br>
          Buy {{ dexAggregatorRates.buy.viper.xya }} XYA for {{ parseFloat(dexAggregatorRates.buy.viper.one).toFixed(4) }} ONE over at VIPERSWAP!
        </div>
      </div>

      <br>
      <hr class="w-full">
      <br>

      <div class="flex flex-wrap">
        <div class="w-1/2 pr-2">
          <input class="w-full border border-yellow bg-transparent px-4 h-12" v-model="amountToPrice" type="number">
        </div>
        <div class="w-1/2 pl-2">
          <button class="w-full rounded-none border border-yellow bg-transparent px-4 py-2 h-12"
                  @click="getPrices(amountToPrice, 'sell')">
            Get sell prices!
          </button>
        </div>

        <div v-if="lookedUpSellPrices" class="w-full mt-6">
          Sell {{ dexAggregatorRates.sell.loot.xya }} XYA for {{ parseFloat(dexAggregatorRates.sell.loot.one).toFixed(4) }} ONE over at LOOTSWAP!
          <br>
          <br>
          Sell {{ dexAggregatorRates.sell.mochi.xya }} XYA for {{ parseFloat(dexAggregatorRates.sell.mochi.one).toFixed(4) }} ONE over at MOCHISWAP!
          <br>
          <br>
          Sell {{ dexAggregatorRates.sell.open.xya }} XYA for {{ parseFloat(dexAggregatorRates.sell.open.one).toFixed(4) }} ONE over at OPENSWAP!
          <br>
          <br>
          Sell {{ dexAggregatorRates.sell.viper.xya }} XYA for {{ parseFloat(dexAggregatorRates.sell.viper.one).toFixed(4) }} ONE over at VIPERSWAP!
        </div>
      </div>

      <div class="pb-24"></div>

    </div>
  </transition>
</template>

<script>
import wallet from "../../../plugins/wallet"
import {mapActions, mapGetters} from "vuex";
import {ethers} from "ethers";
import DexAggregator from "../../../plugins/artifacts/dexaggregator.json";
import Freyala from "../../../plugins/artifacts/freyala.json";
import fromExponential from "from-exponential";

export default {
  name: 'DexAggregator',
  mixins: [wallet],
  computed: {
    ...mapGetters([
      'chainID',
      'chainStatus',
      'loggedIn',
      'walletConnected',
      'metaMaskAccount',
      'metaMaskWallet',
      'openWindow',
      'favourites',
      'allowance'
    ])
  },
  data() {
    return {
      error: '',

      dexAggregatorContract: {},
      mainContract: {},
      pairContract: {},
      amountToApprove: 0,
      amountToPrice: 0,

      dexAggregatorRates: {
        buy: {},
        sell: {}
      },

      lookedUpBuyPrices: false,
      lookedUpSellPrices: false,

      dexAggregatorInterval: undefined,
      dexAggregatorFetchedData: {},
      dexAggregatorAmountToApprove: '',
      dexAggregatorLoading: {
        entering: false,
        claiming: false,
        allowance: false,
        maxAllowance: false
      }
    }
  },
  created() {
    if (this.metaMaskWallet) {
      this.mainContract = new ethers.Contract(Freyala.address, Freyala.abi, this.metaMaskWallet.signer)
      this.dexAggregatorContract = new ethers.Contract(DexAggregator.address, DexAggregator.abi, this.metaMaskWallet.signer)
      // this.fetchJennyMineData()
    }
  },
  watch: {
    async metaMaskWallet() {
      this.mainContract = new ethers.Contract(Freyala.address, Freyala.abi, this.metaMaskWallet.signer)
      this.dexAggregatorContract = new ethers.Contract(DexAggregator.address, DexAggregator.abi, this.metaMaskWallet.signer)
    }
  },
  mounted() {
    // setTimeout(() => {
    //   this.dexAggregatorMounted = true
    // }, 1000)
    //
    // this.dexAggregatorInterval = setInterval(() => {
    //   this.fetchJennyMineData()
    // }, 1000)
  },
  methods: {
    ...mapActions([
      'setFavourite'
    ]),
    // CALL
    async getPrices(amount, type) {
      if (type === 'buy') {
        const [loot, viper, mochi, open] = await Promise.all([
          this.dexAggregatorContract.getEstimatedXyaForOneLootSwap(ethers.utils.parseEther(amount)),
          this.dexAggregatorContract.getEstimatedXyaForOneViperSwap(ethers.utils.parseEther(amount)),
          this.dexAggregatorContract.getEstimatedXyaForOneMochiSwap(ethers.utils.parseEther(amount)),
          this.dexAggregatorContract.getEstimatedXyaForOneOpenSwap(ethers.utils.parseEther(amount))
        ])

        this.dexAggregatorRates.buy = {
          loot: {
            one: ethers.utils.formatEther(loot[0]._isBigNumber ? ethers.BigNumber.from(loot[0]).toString() : loot[0]),
            xya: ethers.utils.formatEther(loot[1]._isBigNumber ? ethers.BigNumber.from(loot[1]).toString() : loot[1])
          },
          viper: {
            one: ethers.utils.formatEther(viper[0]._isBigNumber ? ethers.BigNumber.from(viper[0]).toString() : viper[0]),
            xya: ethers.utils.formatEther(viper[1]._isBigNumber ? ethers.BigNumber.from(viper[1]).toString() : viper[1])
          },
          mochi: {
            one: ethers.utils.formatEther(mochi[0]._isBigNumber ? ethers.BigNumber.from(mochi[0]).toString() : mochi[0]),
            xya: ethers.utils.formatEther(mochi[1]._isBigNumber ? ethers.BigNumber.from(mochi[1]).toString() : mochi[1])
          },
          open: {
            one: ethers.utils.formatEther(open[0]._isBigNumber ? ethers.BigNumber.from(open[0]).toString() : open[0]),
            xya: ethers.utils.formatEther(open[1]._isBigNumber ? ethers.BigNumber.from(open[1]).toString() : open[1])
          },
        }

        this.lookedUpBuyPrices = true
      }

      if (type === 'sell') {
        const [loot, viper, mochi, open] = await Promise.all([
          this.dexAggregatorContract.getEstimatedOneForXyaLootSwap(ethers.utils.parseEther(amount)),
          this.dexAggregatorContract.getEstimatedOneForXyaViperSwap(ethers.utils.parseEther(amount)),
          this.dexAggregatorContract.getEstimatedOneForXyaMochiSwap(ethers.utils.parseEther(amount)),
          this.dexAggregatorContract.getEstimatedOneForXyaOpenSwap(ethers.utils.parseEther(amount))
        ])

        this.dexAggregatorRates.sell = {
          loot: {
            one: ethers.utils.formatEther(loot[0]._isBigNumber ? ethers.BigNumber.from(loot[0]).toString() : loot[0]),
            xya: ethers.utils.formatEther(loot[1]._isBigNumber ? ethers.BigNumber.from(loot[1]).toString() : loot[1])
          },
          viper: {
            one: ethers.utils.formatEther(viper[0]._isBigNumber ? ethers.BigNumber.from(viper[0]).toString() : viper[0]),
            xya: ethers.utils.formatEther(viper[1]._isBigNumber ? ethers.BigNumber.from(viper[1]).toString() : viper[1])
          },
          mochi: {
            one: ethers.utils.formatEther(mochi[0]._isBigNumber ? ethers.BigNumber.from(mochi[0]).toString() : mochi[0]),
            xya: ethers.utils.formatEther(mochi[1]._isBigNumber ? ethers.BigNumber.from(mochi[1]).toString() : mochi[1])
          },
          open: {
            one: ethers.utils.formatEther(open[0]._isBigNumber ? ethers.BigNumber.from(open[0]).toString() : open[0]),
            xya: ethers.utils.formatEther(open[1]._isBigNumber ? ethers.BigNumber.from(open[1]).toString() : open[1])
          },
        }

        this.lookedUpSellPrices = true
      }

    },

    // SEND
    async addAllowance(amount) {
      this.error = ''

      let actual = 0

      if (amount) {
        actual = amount * (10 ** 18)
        this.dexAggregatorLoading.maxAllowance = true
      } else {
        actual = this.amountToApprove * (10 ** 18)
        this.dexAggregatorLoading.allowance = true
      }

      const arg = fromExponential(actual)

      try {
        const tx = await this.mainContract.approve(DexAggregator.address, arg)

        await tx.wait(1)

        this.dexAggregatorLoading.maxAllowance = false
        this.dexAggregatorLoading.allowance = false
      } catch (err) {
        if (err.code !== 4001) {
          this.error = err
        }

        this.dexAggregatorLoading.maxAllowance = false
        this.dexAggregatorLoading.allowance = false
        console.error(err)
      }

      this.amountToApprove = 0
    }
  }
}
</script>