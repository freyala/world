<template>
  <transition name="slide">
    <div class="slide-in shadow-xl" v-if="openWindow === 'jennymines' || openWindow === 'jennymines-large'"
         :style="openWindow === 'jennymines-large' ? 'width: 100%;' : 'width: 30vw;'"
         style="background: url('/images/ui/screen-bg.png') repeat-y; top: 64px; min-width: 500px; background-size: contain; overflow-y: scroll;">

      <div class="absolute top-0 left-0 py-4 px-6">
        <i @click="$store.dispatch('setOpenWindow', '')" class="fas fa-times cursor-pointer text-xl"></i>
      </div>

      <div class="flex relative cursor-pointer" @click="setFavourite('jennymines')">
        <img v-if="favourites.includes('jennymines')" class="mx-auto" src="/images/ui/window-banner-favourite.png"
             alt="Banner">
        <img v-else class="mx-auto" src="/images/ui/window-banner-unfavourite.png" alt="Banner">
        <div class="absolute text-center w-full" style="top: 80px; line-height: 0.25">
          <small>Click to favourite</small>
          <p class="text-2xl">Jenny's mine</p>
        </div>
      </div>

      <br>

      <div class="flex flex-wrap">
        <div class="w-full flex flex-wrap" v-if="!jennyMineFetchedData.minerInfo.registered">
          <div class="w-full text-center mb-2">
            <p>Your balance: {{ parseInt(jennyMineFetchedData.lpBalance) }} {{
                jennyMineFetchedData.feeInfo.feeTicker
              }}</p>
          </div>
          <div class="w-1/2 text-center">
            <p class="text-2xl">In the mines: </p>
            <p>
              {{ jennyMineFetchedData.mineInfo.totalMiners }} / {{ jennyMineFetchedData.mineInfo.maxMiners }}
            </p>
          </div>
          <div class="w-1/2 text-center">
            <p class="text-2xl">Mine entry fee:</p>
            <p>
              {{ jennyMineFetchedData.feeInfo.feeAmount }} {{ jennyMineFetchedData.feeInfo.feeTicker }}
            </p>
          </div>
        </div>
        <div class="w-full text-center" v-else>
          <p class="text-2xl">There are currently <br> {{ jennyMineFetchedData.mineInfo.totalMiners }} miners in the
            mines. </p>
        </div>

        <hr class="w-full my-8">

        <div class="w-full text-center text-xl">
          <p>
            XYA per mining block:
            {{ jennyMineFetchedData.emissionInfo.emissionPerBlock }}
            <br>
            <br>
            Blocks left to mine:
            {{
              parseFloat(jennyMineFetchedData.mineInfo.blockEnds) - parseFloat(jennyMineFetchedData.mineInfo.currentBlock)
            }}
            <br>
            <br>
            XYA left in mine: <br>
            {{ parseFloat(jennyMineFetchedData.mineInfo.remainingDeposited).toFixed(1) }} /
            {{ jennyMineFetchedData.mineInfo.totalDeposited }}
            <br>
            <br>
          </p>
        </div>
      </div>

      <div v-if="!jennyMineFetchedData.minerInfo.registered" class="w-full text-center">
        <button type="button"
                class="w-full rounded-none border border-yellow hover:bg-yellow hover:text-brown px-4 py-2 min-h-12"
                @click="enterMines()">
          <span>Enter the mines </span>
          <i v-if="jennyMineLoading.entering" class="fas fa-cog fa-spin"></i>
        </button>
      </div>
      <div v-else class="w-full text-center">
        <button type="button"
                class="w-full rounded-none border border-yellow hover:bg-yellow hover:text-brown px-4 py-2 min-h-12"
                @click="claim()">
          <span>Claim {{ parseFloat(jennyMineFetchedData.minerInfo.unclaimedRewards).toFixed(1) }} XYA </span>
          <i v-if="jennyMineLoading.claiming" class="fas fa-cog fa-spin"></i>
        </button>
        You have mined a total of {{
          (parseFloat(jennyMineFetchedData.minerInfo.totalClaimed) + parseFloat(jennyMineFetchedData.minerInfo.unclaimedRewards)).toFixed(1)
        }} XYA
      </div>

      <br>
      <hr>
      <br>

      <div class="pb-24">
        <p class="text-xl">
          Intrepid groups of miners ventured deeper into the expansive cave system. They would eventually come across
          covert extraction operations from other land embassies, all monitored by the monarch, unbeknownst to most of
          the Freyfolk.
        </p>

        <br>

        <p class="text-center">
          <em>
            <small>
              A variety of mines can be found in these tunnels.
            </small>
          </em>
        </p>

        <a href="https://tokenjenny.one/gemmines" target="_blank">
          <button type="button"
                  class="w-full rounded-none border border-yellow hover:bg-yellow hover:text-brown px-4 py-2 min-h-12">
            <span>Enter the tunnels</span>
          </button>
        </a>
      </div>
    </div>
  </transition>
</template>

<script>
import wallet from "../../../plugins/wallet"
import {mapActions, mapGetters} from "vuex";
import {ethers} from "ethers";
import jennyMineContract from "../../../plugins/artifacts/jennymines.json";
import fromExponential from "from-exponential";
import Freyala from "../../../plugins/artifacts/freyala.json";


export default {
  name: 'Delegating',
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

      mainContract: {},
      pairContract: {},
      jennyMineContract: {},

      jennyMineInterval: undefined,
      jennyMineFetchedData: {},
      jennyMineAmountToApprove: '',
      jennyMineLoading: {
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
      this.pairContract = new ethers.Contract('0xdc607e3cfb286eb8176fbc2e3f86f0c5ce6f8523', Freyala.abi, this.metaMaskWallet.signer)
      this.jennyMineContract = new ethers.Contract(jennyMineContract.address, jennyMineContract.abi, this.metaMaskWallet.signer)
      this.fetchJennyMineData()
    }
  },
  watch: {
    async metaMaskWallet() {
      this.mainContract = new ethers.Contract(Freyala.address, Freyala.abi, this.metaMaskWallet.signer)
      this.pairContract = new ethers.Contract('0xdc607e3cfb286eb8176fbc2e3f86f0c5ce6f8523', Freyala.abi, this.metaMaskWallet.signer)
      this.jennyMineContract = new ethers.Contract(jennyMineContract.address, jennyMineContract.abi, this.metaMaskWallet.signer)
    }
  },
  mounted() {
    setTimeout(() => {
      this.jennyMineMounted = true
    }, 1000)

    this.jennyMineInterval = setInterval(() => {
      this.fetchJennyMineData()
    }, 1000)
  },
  methods: {
    ...mapActions([
      'setFavourite'
    ]),
    // CALL
    async fetchJennyMineData() {
      if (document.hasFocus()) {
        const [valuesOfGem, valuesOfFees, valuesOfEmissions, valuesOfMine, valuesOfMiner, lpBalance] = await Promise.all([
          this.jennyMineContract.returnValuesOfGem(),
          this.jennyMineContract.returnValuesOfFees(),
          this.jennyMineContract.returnValuesOfEmissions(),
          this.jennyMineContract.returnValuesOfMine(),
          this.jennyMineContract.returnValuesOfMiner(),
          this.pairContract.balanceOf(this.metaMaskAccount)
        ])

        this.jennyMineFetchedData.lpBalance = ethers.utils.formatEther(lpBalance._isBigNumber ? ethers.BigNumber.from(lpBalance).toString() : lpBalance)
        this.jennyMineFetchedData.gemInfo = {
          address: valuesOfGem[0],
          decimals: valuesOfGem[1]._isBigNumber ? ethers.BigNumber.from(valuesOfGem[1]).toString() : valuesOfGem[1],
          name: valuesOfGem[2],
          ticker: valuesOfGem[3],
          logoUrl: valuesOfGem[4],
          pairAddress: valuesOfGem[5],
          pairTicker: valuesOfGem[6]
        }
        this.jennyMineFetchedData.feeInfo = {
          addressFeesGoTo: valuesOfFees[0],
          feeAmount: valuesOfFees[1]._isBigNumber ? ethers.BigNumber.from(valuesOfFees[1]).toString() : valuesOfFees[1],
          addressFeePaidWith: valuesOfFees[2],
          feeTicker: valuesOfFees[4]
        }
        this.jennyMineFetchedData.emissionInfo = {
          emissionPerBlock: ethers.utils.formatEther(valuesOfEmissions[0]._isBigNumber ? ethers.BigNumber.from(valuesOfEmissions[0]).toString() : valuesOfEmissions[0]),
          rewardsPerBlockPerWallet: ethers.utils.formatEther(valuesOfEmissions[1]._isBigNumber ? ethers.BigNumber.from(valuesOfEmissions[1]).toString() : valuesOfEmissions[1]),
          totalBlocks: valuesOfEmissions[2]._isBigNumber ? ethers.BigNumber.from(valuesOfEmissions[2]).toString() : valuesOfEmissions[2]
        }
        this.jennyMineFetchedData.mineInfo = {
          registrationOpened: valuesOfMine[1]._isBigNumber ? ethers.BigNumber.from(valuesOfMine[1]).toString() : valuesOfMine[1],
          blockStart: valuesOfMine[2]._isBigNumber ? ethers.BigNumber.from(valuesOfMine[2]).toString() : valuesOfMine[2],
          blockEnds: valuesOfMine[3]._isBigNumber ? ethers.BigNumber.from(valuesOfMine[3]).toString() : valuesOfMine[3],
          remainingDeposited: ethers.utils.formatEther(valuesOfMine[4]._isBigNumber ? ethers.BigNumber.from(valuesOfMine[4]).toString() : valuesOfMine[4]),
          totalDeposited: ethers.utils.formatEther(valuesOfMine[5]._isBigNumber ? ethers.BigNumber.from(valuesOfMine[5]).toString() : valuesOfMine[5]),
          beenMined: ethers.utils.formatEther(valuesOfMine[6]._isBigNumber ? ethers.BigNumber.from(valuesOfMine[6]).toString() : valuesOfMine[6]),
          totalMiners: valuesOfMine[7]._isBigNumber ? ethers.BigNumber.from(valuesOfMine[7]).toString() : valuesOfMine[7],
          maxMiners: valuesOfMine[8]._isBigNumber ? ethers.BigNumber.from(valuesOfMine[8]).toString() : valuesOfMine[8],
          mineAddress: valuesOfMine[9],
          currentBlock: valuesOfMine[10]._isBigNumber ? ethers.BigNumber.from(valuesOfMine[10]).toString() : valuesOfMine[10]
        }
        this.jennyMineFetchedData.minerInfo = {
          totalClaimed: ethers.utils.formatEther(valuesOfMiner[0]._isBigNumber ? ethers.BigNumber.from(valuesOfMiner[0]).toString() : valuesOfMiner[0]),
          registered: valuesOfMiner[1],
          unclaimedRewards: ethers.utils.formatEther(valuesOfMiner[2]._isBigNumber ? ethers.BigNumber.from(valuesOfMiner[2]).toString() : valuesOfMiner[2]),
          lastBlockClaimed: valuesOfMiner[4]._isBigNumber ? ethers.BigNumber.from(valuesOfMiner[4]).toString() : valuesOfMiner[4],
        }
      }
    },

    // SEND
    async enterMines() {
      this.jennyMineLoading.entering = true
      this.error = ''

      // APPROVE
      const actual = 300 * (10 ** 18);
      const arg = fromExponential(actual);

      try {
        const tx = await this.pairContract.approve(jennyMineContract.address, arg)
        await tx.wait(1)
      } catch (err) {
        if (err.code !== 4001) {
          this.error = err.data.message
          this.$modal.show('error')
        }
        this.error = err.data.message
        this.$modal.show('error')
      }

      // ENTER MINES
      try {
        const tx = await this.jennyMineContract.registerWalletForMining()
        await tx.wait(1)

      } catch (err) {
        if (err.code !== 4001) {
          this.error = err
        }
      }

      this.jennyMineLoading.entering = false
    },
    async claim() {
      this.error = ''

      this.jennyMineLoading.claiming = true
      try {
        const tx = await this.jennyMineContract.claim(this.metaMaskAccount)

        await tx.wait(1)

        this.jennyMineLoading.claiming = false
      } catch (err) {
        if (err.code !== 4001) {
          this.error = err
        }
        this.jennyMineLoading.claiming = false
        console.error(err)
      }

      this.fetchJennyMineData()
    }
  }
}
</script>