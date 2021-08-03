<template>
  <div v-if="chainStatus === 'correct'">
    <div v-if="rouletteMounted" class="flex flex-wrap">
      <div class="w-full flex">
        <div class="w-2/3 px-8 mx-auto">
          <!--      setAllowance-->
          <div class="flex flex-wrap">
            <small class="w-full text-center">
              Current allowance: {{ allowance.roulette }} XYA
            </small>
            <div class="w-1/3 px-2">
              <input class="w-full border border-yellow bg-transparent px-4 min-h-12" v-model="rouletteAmountToApprove"
                     type="number">
            </div>

            <div class="w-1/3 px-2">
              <button type="button"
                      class="w-full rounded-none border border-yellow bg-transparent hover:bg-yellow hover:text-brown px-4 py-2 min-h-12"
                      @click="addRouletteAllowance()">
                <span v-if="rouletteLoading.allowance">Approving... </span>
                <span v-else>Approve amount </span>
                <i v-if="rouletteLoading.allowance" class="fas fa-cog fa-spin"></i>
              </button>
            </div>

            <div class="w-1/3 px-2">
              <button type="button"
                      class="w-full rounded-none border border-yellow bg-transparent hover:bg-yellow hover:text-brown px-4 py-2 min-h-12"
                      @click="addRouletteAllowance(999999999999.9999)">
                <span v-if="rouletteLoading.maxAllowance">Approving... </span>
                <span v-else>Approve max amount </span>
                <i v-if="rouletteLoading.maxAllowance" class="fas fa-cog fa-spin"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="w-1/4 mt-8 mb-6">
        <h3 class="text-4xl mb-8">
          Menu
        </h3>

        <!--      lowTable-->
        <button type="button"
                :class="rouletteDefaultView === 'low' ? 'bg-yellow text-brown' : 'bg-transparent text-yellow'"
                class="w-full rounded-none border border-yellow bg-transparent hover:bg-yellow hover:text-brown px-4 py-2 min-h-12 mb-4">
          New kids table ( Disabled )
        </button>

        <!--      mediumTable-->
        <button type="button"
                :class="rouletteDefaultView === 'medium' ? 'bg-yellow text-brown' : 'bg-transparent text-yellow'"
                class="w-full rounded-none border border-yellow bg-transparent hover:bg-yellow hover:text-brown px-4 py-2 min-h-12 mb-4"
                @click="rouletteDefaultView = 'medium'">
          Regular table ( 100 - 1000 )
        </button>

        <!--      highTable-->
        <button type="button"
                :class="rouletteDefaultView === 'high' ? 'bg-yellow text-brown' : 'bg-transparent text-yellow'"
                class="w-full rounded-none border border-yellow bg-transparent hover:bg-yellow hover:text-brown px-4 py-2 min-h-12 mb-4">
          High stakes table ( Disabled )
        </button>

        <br>
        <br>
        <div class="flex flex-wrap">
          <img class="w-5/6 mx-auto" src="/images/ui/roulette.png" alt="Roulette table">

          <div class="w-full">
            <p>Feel powerful! Be the one to stop the wheel!</p>
            <button type="button"
                    class="w-full rounded-none border border-yellow bg-transparent hover:bg-yellow hover:text-brown px-4 py-2 min-h-12 mb-4 mt-4 mx-1"
                    @click="spinWheel()">
              <span v-if="rouletteLoading.spinWheel">Stopping wheel... </span>
              <span v-else>Stop wheel! </span>
              <i v-if="rouletteLoading.spinWheel" class="fas fa-cog fa-spin"></i>
            </button>
          </div>
        </div>
      </div>

      <div class="w-3/4 mt-8 px-8">
        <div class="flex flex-wrap">
          <div class="w-full">
            <h3 class="text-4xl">
              Spin the wheel!
            </h3>
          </div>

          <div class="w-full 2xl:w-3/4 flex mt-8">
            <div class="w-1/5">
              <button type="button"
                      :class="rouletteBetAmount === 100 ? 'bg-yellow text-brown' : 'bg-transparent text-yellow'"
                      class="rounded-none border border-yellow hover:bg-yellow hover:text-brown px-4 py-2 min-h-12"
                      @click="rouletteBetAmount = 100">
                100 XYA
              </button>
            </div>
            <div class="w-1/5">
              <button type="button"
                      :class="rouletteBetAmount === 200 ? 'bg-yellow text-brown' : 'bg-transparent text-yellow'"
                      class="rounded-none border border-yellow bg-transparent hover:bg-yellow hover:text-brown px-4 py-2 min-h-12"
                      @click="rouletteBetAmount = 200">
                200 XYA
              </button>
            </div>
            <div class="w-1/5">
              <button type="button"
                      :class="rouletteBetAmount === 500 ? 'bg-yellow text-brown' : 'bg-transparent text-yellow'"
                      class="rounded-none border border-yellow bg-transparent hover:bg-yellow hover:text-brown px-4 py-2 min-h-12"
                      @click="rouletteBetAmount = 500">
                500 XYA
              </button>
            </div>
            <div class="w-1/5">
              <button type="button"
                      :class="rouletteBetAmount === 750 ? 'bg-yellow text-brown' : 'bg-transparent text-yellow'"
                      class="rounded-none border border-yellow bg-transparent hover:bg-yellow hover:text-brown px-4 py-2 min-h-12"
                      @click="rouletteBetAmount = 750">
                750 XYA
              </button>
            </div>
            <div class="w-1/5">
              <button type="button"
                      :class="rouletteBetAmount === 1000 ? 'bg-yellow text-brown' : 'bg-transparent text-yellow'"
                      class="rounded-none border border-yellow bg-transparent hover:bg-yellow hover:text-brown px-4 py-2 min-h-12"
                      @click="rouletteBetAmount = 1000">
                1000 XYA
              </button>
            </div>
          </div>
        </div>

        <div class="flex flex-wrap">
          <div class="w-full flex text-xl mt-7 mb-4">
            <div class="w-1/3">
              Round number: {{ rouletteFetchedData.roundNumber }}
            </div>
            <div class="w-1/3">
              Last colour: {{ rouletteFetchedData.lastSpace.colour }}
            </div>
            <div class="w-1/3">
              Last number: {{ rouletteFetchedData.lastSpace.number }}
            </div>
          </div>
          <div class="w-1/12 flex flex-wrap">
            <div @click="rouletteSelectedItem = space.number"
                 v-for="space in rouletteFetchedData.returnWheel.slice(0, 1)"
                 class="w-full p-1">
              <div class="h-full flex cursor-pointer"
                   :class="`text-${rouletteSelectedItem === space.number ? 'brown' : 'yellow'} bg-${rouletteSelectedItem === space.number ? 'white' : space.colour}`">
                <p class="m-auto">
                  {{ space.number }}
                </p>
              </div>
            </div>
          </div>

          <div class="w-8/12 pr-4 flex flex-wrap">
            <div @click="rouletteSelectedItem = space.number"
                 v-for="space in rouletteFetchedData.returnWheel.slice(1, 15)"
                 class="w-1/5 p-1">
              <div class="h-24 flex cursor-pointer"
                   :class="`text-${rouletteSelectedItem === space.number ? 'brown' : 'yellow'} bg-${rouletteSelectedItem === space.number ? 'white' : space.colour}`">
                <p class="m-auto">
                  {{ space.number }}
                </p>
              </div>
            </div>
            <div @click="rouletteSelectedItem = (Math.floor(Math.random() * 15)).toString()" class="w-1/5 p-1">
              <div class="h-24 flex cursor-pointer"
                   :class="`text-${rouletteSelectedItem === 'random' ? 'brown' : 'yellow'} bg-${rouletteSelectedItem === 'random' ? 'white' : 'yellow'}`">
                <p class="m-auto text-black px-4 text-center">
                  Choose for me!
                </p>
              </div>
            </div>
          </div>
          <div class="w-3/12 flex flex-wrap">
            <div class="w-1/2 flex flex-wrap">
              <div @click="rouletteSelectedItem = 'black'" class="w-full p-1">
                <div class="h-full flex cursor-pointer"
                     :class="`text-${rouletteSelectedItem === 'black' ? 'black' : 'yellow'} bg-${rouletteSelectedItem === 'black' ? 'white' : 'black'}`">
                  <p class="m-auto">
                    Black
                  </p>
                </div>
              </div>
              <div @click="rouletteSelectedItem = 'red'" class="w-full p-1">
                <div class="h-full flex cursor-pointer"
                     :class="`text-${rouletteSelectedItem === 'red' ? 'red' : 'yellow'} bg-${rouletteSelectedItem === 'red' ? 'white' : 'red'}`">
                  <p class="m-auto">
                    Red
                  </p>
                </div>
              </div>
            </div>
            <div class="w-1/2 flex flex-wrap">
              <div @click="rouletteSelectedItem = 'odds'" class="w-full p-1">
                <div class="h-full flex cursor-pointer"
                     :class="`text-${rouletteSelectedItem === 'odds' ? 'black' : 'yellow'} bg-${rouletteSelectedItem === 'odds' ? 'white' : 'dark-gray'}`">
                  <p class="m-auto">
                    Odds
                  </p>
                </div>
              </div>
              <div @click="rouletteSelectedItem = 'evens'" class="w-full p-1">
                <div class="h-full flex cursor-pointer"
                     :class="`text-${rouletteSelectedItem === 'evens' ? 'black' : 'yellow'} bg-${rouletteSelectedItem === 'evens' ? 'white' : 'dark-gray'}`">
                  <p class="m-auto">
                    Evens
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="flex">
          <button
              v-if="rouletteSelectedItem === 'odds' || rouletteSelectedItem === 'evens' || rouletteSelectedItem === 'black' || rouletteSelectedItem === 'red'"
              type="button"
              class="w-full rounded-none border border-yellow bg-transparent hover:bg-yellow hover:text-brown px-4 py-2 min-h-12 mb-4 mt-4 mx-1"
              @click="makeOutsideBet(rouletteSelectedItem, rouletteBetAmount)">
            <span v-if="rouletteLoading.makeOutsideBet">Placing bet... </span>
            <span v-else>Place your bet! </span>
            <i v-if="rouletteLoading.makeOutsideBet" class="fas fa-cog fa-spin"></i>
          </button>
          <button v-else type="button"
                  class="w-full rounded-none border border-yellow bg-transparent hover:bg-yellow hover:text-brown px-4 py-2 min-h-12 mb-4 mt-4 mx-1"
                  @click="makeStraightBet(rouletteSelectedItem, rouletteBetAmount)">
            <span v-if="rouletteLoading.makeStraightBet">Placing bet... </span>
            <span v-else>Place your bet! </span>
            <i v-if="rouletteLoading.makeStraightBet" class="fas fa-cog fa-spin"></i>
          </button>
        </div>
      </div>
    </div>

    <div v-else class="flex w-full h-full py-24">
      <p class="m-auto text-center">
        Loading...
      </p>
    </div>

    <window name="error">
      <div class="flex flex-wrap py-2 px-3">
        <div class="w-4/5">
          <div class="text-2xl">Error</div>
        </div>
        <div class="w-1/5 text-right">
          <i @click="$modal.hide('error')" class="fas fa-times cursor-pointer text-xl"></i>
        </div>
        <p class="w-full mt-4">
          {{ error }}
        </p>
      </div>
    </window>
    <window name="success">
      <div class="flex flex-wrap py-2 px-3">
        <div class="w-4/5">
          <div class="text-2xl">Success</div>
        </div>
        <div class="w-1/5 text-right">
          <i @click="$modal.hide('success')" class="fas fa-times cursor-pointer text-xl"></i>
        </div>
        <p class="w-full mt-4">
          {{ success }}
        </p>
      </div>
    </window>
  </div>
</template>

<script>
import fromExponential from "from-exponential";

import {mapGetters, mapActions} from "vuex";
import {ethers} from "ethers";

import wallet from "../../../../plugins/wallet";
import Freyala from "../../../../plugins/artifacts/freyala.json";
import Roulette from "../../../../plugins/artifacts/roulette.json";
import {initWeb3} from "../../../../plugins/initWeb3"

export default {
  name: 'Roulette',
  mixins: [wallet],
  computed: {
    ...mapGetters([
      'chainID',
      'chainStatus',
      'loadingBalances',
      'userBalance',
      'loggedIn',
      'walletConnected',
      'metaMaskAccount',
      'metaMaskWallet',
      'openWindow',
      'allowance'
    ])
  },
  data() {
    return {
      error: '',
      success: '',
      currentBlockNumber: 0,
      mainContract: {},
      rouletteContract: {},
      rouletteMounted: false,
      rouletteInterval: undefined,

      rouletteBetAmount: 100,
      rouletteSelectedItem: 0,
      rouletteDefaultView: 'medium',
      rouletteAmountToApprove: 0,
      rouletteFetchedData: {
        currentBets: undefined,
        lastSpace: undefined,
        returnWheel: undefined,
        roundNumber: undefined
      },
      rouletteLoading: {
        spinWheel: false,
        makeOutsideBet: false,
        makeStraightBet: false
      }
    }
  },
  created() {
    this.mainContract = new ethers.Contract(Freyala.address, Freyala.abi, this.metaMaskWallet.signer)
    this.rouletteContract = new ethers.Contract(Roulette.address, Roulette.abi, this.metaMaskWallet.signer)
    this.fetchRouletteData()
  },
  mounted() {
    setTimeout(() => {
      this.rouletteMounted = true
    }, 1000)

    this.rouletteInterval = setInterval(() => {
      this.fetchRouletteData()
    }, 1000)
  },
  beforeDestroy() {
    clearInterval(this.rouletteInterval)
  },
  watch: {
    async metaMaskWallet() {
      this.mainContract = new ethers.Contract(Freyala.address, Freyala.abi, this.metaMaskWallet.signer)
      this.rouletteContract = new ethers.Contract(Roulette.address, Roulette.abi, this.metaMaskWallet.signer)
    }
  },
  methods: {
    ...mapActions([
      'setFavourite'
    ]),
    async fetchRouletteData() {
      if (document.hasFocus()) {
        const data = await Promise.all([
          this.rouletteContract.currentBets(),
          this.rouletteContract.lastSpace(),
          this.rouletteContract.returnWheel(),
          this.rouletteContract.rN()
        ])

        const wheel = []

        for (const space of data[2]) {
          wheel.push({
            number: space[0]._isBigNumber ? ethers.BigNumber.from(space[0]).toString() : space[0],
            colour: space[1] === 0 ? 'green' : space[1] === 1 ? 'red' : 'black'
          })
        }

        const lastSpace = {
          number: data[1][0]._isBigNumber ? ethers.BigNumber.from(data[1][0]).toString() : data[1][0],
          colour: data[1][1] === 0 ? 'green' : data[1][1] === 1 ? 'red' : 'black'
        }

        const roundNumber = data[3]._isBigNumber ? ethers.BigNumber.from(data[3]).toString() : data[3]

        this.rouletteFetchedData = {
          currentBets: data[0],
          lastSpace: lastSpace,
          returnWheel: wheel,
          roundNumber: roundNumber
        }
      }
    },

    // ROULETTE
    // CALL DATA
    async currentBets() {
      this.rouletteLoading.currentBets = true
      this.rouletteFetchedData.currentBets = await this.rouletteContract.currentBets()
      this.rouletteLoading.currentBets = false
    },
    async currentBetsByAddress(address) {
      this.rouletteLoading.currentBetsByAddress = true
      this.rouletteFetchedData.currentBetsByAddress = await this.rouletteContract.currentBetsByAddress(address)
      this.rouletteLoading.currentBetsByAddress = false
    },
    async lastSpace() {
      this.rouletteLoading.lastSpace = true
      this.rouletteFetchedData.lastSpace = await this.rouletteContract.lastSpace()
      this.rouletteLoading.lastSpace = false
    },
    async returnWheel() {
      this.rouletteLoading.returnWheel = true
      this.rouletteFetchedData.returnWheel = await this.rouletteContract.returnWheel()
      this.rouletteLoading.returnWheel = false
    },
    async roundNumber() {
      this.rouletteLoading.roundNumber = true
      this.rouletteFetchedData.roundNumber = await this.rouletteContract.rN()
      this.rouletteLoading.roundNumber = false
    },

    // SEND DATA
    async makeOutsideBet(value, amount) {
      this.error = ''
      this.rouletteLoading.makeOutsideBet = true

      let number = 0
      if (value === 'odd') number = '1'
      if (value === 'even') number = '2'
      if (value === 'red') number = '3'
      if (value === 'black') number = '4'

      try {
        const tx = await this.rouletteContract.makeOutsideBet(number, amount.toString())
        await tx.wait(1)

        this.amountToBet = 100
        this.rouletteSelectedItem = false

      } catch (err) {
        if (err.code !== 4001) {
          this.error = err.data.message
          this.$modal.show('error')
        }

        console.error(err);
        this.error = err.data.message
        this.$modal.show('error')
      }

      this.rouletteLoading.makeOutsideBet = false
    },
    async makeStraightBet(number, amount) {
      this.error = ''
      this.rouletteLoading.makeStraightBet = true

      try {
        const tx = await this.rouletteContract.makeStraightBet(number, amount.toString())
        await tx.wait(1)

        this.amountToBet = 100
        this.rouletteSelectedItem = false
      } catch (err) {
        if (err.code !== 4001) {
          this.error = err.data.message
          this.$modal.show('error')
        }
        console.error(err);
        this.error = err.data.message
        this.$modal.show('error')
      }

      this.rouletteLoading.makeStraightBet = false
    },
    async spinWheel() {
      this.error = ''
      this.rouletteLoading.spinWheel = true

      try {
        let web3 = await initWeb3()
        const gasPrice = await web3.eth.getGasPrice();

        const rouletteContract = await new web3.eth.Contract(Roulette.abi, Roulette.address);
        await rouletteContract.methods.spinWheel().send({
          from: this.metaMaskAccount,
          gasPrice: gasPrice,
          gasLimit: 250000,
          gas: parseFloat((gasPrice * 250000) / Math.pow(10, 9))
        })

      } catch (err) {
        if (err.code !== 4001) {
          this.error = err
          this.$modal.show('error')
        }

        console.error(err);
        this.error = err
        this.$modal.show('error')
      }

      this.rouletteLoading.spinWheel = false
    },
    async addRouletteAllowance(amount) {
      this.error = ''

      let actual = 0

      if (amount) {
        actual = amount * (10 ** 18);
        this.rouletteLoading.maxAllowance = true
      } else {
        actual = this.rouletteAmountToApprove * (10 ** 18);
        this.rouletteLoading.allowance = true
      }

      const arg = fromExponential(actual);

      try {
        const tx = await this.mainContract.approve(Roulette.address, arg)

        await tx.wait(1)

      } catch (err) {
        if (err.code !== 4001) {
          this.error = err.data.message
          this.$modal.show('error')
        }

        console.error(err);
        this.error = err.data.message
        this.$modal.show('error')
      }

      this.rouletteLoading.maxAllowance = false
      this.rouletteLoading.allowance = false
      this.rouletteAmountToApprove = 0;
    }
  }
}
</script>