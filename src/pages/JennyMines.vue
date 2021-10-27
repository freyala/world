<template>
  <section style="background: url('/images/map/worldmap.png') no-repeat; background-size: cover; min-height: 100vh"
           class="flex p-4 md:p-16 lg:px-32">
    <div style="background: #1c1c1c; z-index: 9999; overflow-y: auto;" class="screen rounded-2xl w-full">
      <section id="section-i-1" class="border-b-4 border-primary-alt"
               style="background: url('/images/SVG/homepage-bg-top.svg') no-repeat top right">
        <div class="container mx-auto text-center pt-16 md:pt-24 pb-16 md:pb-20">
          <h1 class="text-2xl md:text-5xl text-primary-alt font-semibold">
            Jenny's mines
          </h1>
        </div>
      </section>

      <div v-if="jennyMineMounted" class="p-4 md:p-8 relative">
        <div class="absolute top-0 left-0 p-4 md:p-8">
          <router-link :to="{ name: 'world-map' }">
            <i class="fas fa-long-arrow-alt-left"></i> Back
          </router-link>
        </div>

        <div class="flex">
          <div class="w-full md:w-4/5 lg:w-3/5 mx-auto">
            <div class="flex flex-wrap">
              <div class="w-full flex mt-8 md:mt-0 flex-wrap">
                <div class="w-full text-center">
                  <p class="md:text-4xl">Mining has stopped!</p>
                </div>
              </div>
              <br>
              <br>
              <div class="w-full md:w-1/2 text-center">
                <p class="mt-4 md:mt-0 md:text-2xl">Mine entry fee was:</p>
                <p>
                  {{ jennyMineFetchedData.feeInfo.feeAmount }} {{ jennyMineFetchedData.feeInfo.feeTicker }}
                </p>
              </div>
              <div class="mt-4 md:mt-0 w-full md:w-1/2 text-center">
                <p class="md:text-2xl">There were a total of <br> {{ jennyMineFetchedData.mineInfo.totalMiners }} miners in the
                  mines. </p>
              </div>

              <hr class="w-full my-8">

              <div class="w-full text-center md:text-xl">
                <p>
                  <br>
                  XYA left unclaimed in mine: <br>
                  {{ parseFloat(jennyMineFetchedData.mineInfo.remainingDeposited).toFixed(1) }} /
                  {{ jennyMineFetchedData.mineInfo.totalDeposited }}
                  <br>
                  <br>
                </p>
              </div>
            </div>

            <div class="w-full text-center">
              <button type="button"
                      class="w-full rounded-none border border-primary-alt hover:bg-primary-alt hover:text-brown px-4 py-2 min-h-12"
                      @click="claim()">
                <span>Claim {{ parseFloat(jennyMineFetchedData.minerInfo.unclaimedRewards).toFixed(1) }} XYA </span>
                <i v-if="jennyMineLoading.claiming" class="fas fa-cog fa-spin"></i>
              </button>
             <small>
               You have mined a total of {{
                 (parseFloat(jennyMineFetchedData.minerInfo.totalClaimed) + parseFloat(jennyMineFetchedData.minerInfo.unclaimedRewards)).toFixed(1)
               }} XYA
             </small>
            </div>

            <br>
            <br>
            <br>

            <div class="pb-24">
              <p class="md:text-xl">
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
                        class="w-full rounded-none border border-primary-alt hover:bg-primary-alt hover:text-brown px-4 py-2 min-h-12">
                  <span>Enter the tunnels</span>
                </button>
              </a>
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
import wallet from "../plugins/wallet"
import {mapGetters} from "vuex";
import {ethers} from "ethers";
import jennyMineContract from "../plugins/artifacts/jennymines.json";
import Freyala from "../plugins/artifacts/freyala.json";

export default {
  name: 'JennyMines',
  mixins: [wallet],
  computed: {
    ...mapGetters([
      'metaMaskAccount',
      'metaMaskWallet'
    ])
  },
  data() {
    return {
      error: '',

      mainContract: {},
      pairContract: {},
      jennyMineContract: {},
      jennyMineMounted: false,

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
  async mounted() {
    this.mainContract = new ethers.Contract(Freyala.address, Freyala.abi, this.metaMaskWallet.signer)
    this.jennyMineContract = new ethers.Contract(jennyMineContract.address, jennyMineContract.abi, this.metaMaskWallet.signer)

    await this.fetchData()
    this.jennyMineMounted = true

    this.jennyMineInterval = setInterval(() => {
      this.fetchData()
    }, 4000)
  },
  beforeDestroy() {
    clearInterval(this.jennyMineInterval)
  },
  methods: {
    // CALL
    async fetchData() {
        const [valuesOfGem, valuesOfFees, valuesOfEmissions, valuesOfMine, valuesOfMiner] = await Promise.all([
          this.jennyMineContract.returnValuesOfGem(),
          this.jennyMineContract.returnValuesOfFees(),
          this.jennyMineContract.returnValuesOfEmissions(),
          this.jennyMineContract.returnValuesOfMine(),
          this.jennyMineContract.returnValuesOfMiner(),
        ])

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
          unclaimedRewards: ethers.utils.formatEther(valuesOfMiner[2]._isBigNumber ? ethers.BigNumber.from(valuesOfMiner[2]).toString() : valuesOfMiner[2]),
          lastBlockClaimed: valuesOfMiner[4]._isBigNumber ? ethers.BigNumber.from(valuesOfMiner[4]).toString() : valuesOfMiner[4],
        }

        this.jennyMineMounted = true
    },

    // SEND
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