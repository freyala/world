<template>
  <transition name="slide">
    <div class="slide-in shadow-xl" v-if="openWindow === 'casino' || openWindow === 'casino-large'"
         :style="openWindow === 'casino-large' ? 'max-width: 100%;' : 'max-width: 30vw;'"
         style="background: url('/images/ui/screen-bg.png') repeat-y; top: 64px; background-size: contain; overflow-y: scroll;">
      <div class="flex relative">
        <img class="mx-auto" src="/images/ui/window-banner.png" alt="Banner">
        <div class="absolute text-center w-full" style="top: 75px">
          <p class="text-2xl">The Luderion Alleyway</p>
        </div>
      </div>

      <div class="flex">
        <p @click="$store.dispatch('setOpenWindow', 'casino-large')" class="m-auto cursor-pointer">
          {{ openWindow === 'casino-large' ? 'Leave' : 'Enter' }}
        </p>
      </div>
      <br>

      <div class="flex flex-wrap" v-if="openWindow === 'casino-large'">
        <div class="w-full flex">
          <div class="w-1/2 px-8 mx-auto">
            <!--      setAllowance-->
            <div class="flex flex-wrap">
              <small class="w-full text-center">
                Current allowance: {{ allowance.roulette }} XYA
              </small>
              <div class="w-1/3 px-2">
                <input class="w-full border border-yellow bg-transparent px-4 h-12" v-model="amountToApprove"
                       type="number">
              </div>

              <div class="w-1/3 px-2">
                <button type="button"
                        class="w-full rounded-none border border-yellow bg-transparent hover:bg-yellow hover:text-brown px-4 py-2 h-12"
                        @click="addAllowance()">
                  Set allowance <i v-if="loading.allowance" class="fas fa-cog fa-spin"></i>
                </button>
              </div>

              <div class="w-1/3 px-2">
                <button type="button"
                        class="rounded-none border border-yellow bg-transparent hover:bg-yellow hover:text-brown px-4 py-2 h-12"
                        @click="addAllowance(999999999999.9999)">
                  Set max allowance <i v-if="loading.maxAllowance" class="fas fa-cog fa-spin"></i>
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
                  :class="defaultView === 'low' ? 'bg-yellow text-brown' : 'bg-transparent text-yellow'"
                  class="w-full rounded-none border border-yellow bg-transparent hover:bg-yellow hover:text-brown px-4 py-2 h-12 mb-4"
                  @click="defaultView = 'low'">
            New kids table ( 10 - 100 )
          </button>

          <!--      mediumTable-->
          <button type="button"
                  :class="defaultView === 'medium' ? 'bg-yellow text-brown' : 'bg-transparent text-yellow'"
                  class="w-full rounded-none border border-yellow bg-transparent hover:bg-yellow hover:text-brown px-4 py-2 h-12 mb-4"
                  @click="defaultView = 'medium'">
            Regular table ( 100 - 1000 )
          </button>

          <!--      highTable-->
          <button type="button"
                  :class="defaultView === 'high' ? 'bg-yellow text-brown' : 'bg-transparent text-yellow'"
                  class="w-full rounded-none border border-yellow bg-transparent hover:bg-yellow hover:text-brown px-4 py-2 h-12 mb-4"
                  @click="defaultView = 'high'">
            High stakes table ( 1000 - 10000 )
          </button>

          <br>
          <br>
          <div class="flex flex-wrap">
            <img class="w-5/6 mx-auto" src="/images/ui/roulette.png" alt="Roulette table">

            <div class="w-full">
              <p>Time's up? Feel powerful! Be the one to stop the wheel!</p>
              <button type="button"
                      class="w-full rounded-none border border-yellow bg-transparent hover:bg-yellow hover:text-brown px-4 py-2 h-12 mb-4 mt-4 mx-1"
                      @click="spinWheel()">
                Stop wheel!
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

            <div class="w-3/4 flex mt-8">
              <div class="w-1/5">
                <button type="button"
                        :class="betAmount === 100 ? 'bg-yellow text-brown' : 'bg-transparent text-yellow'"
                        class="rounded-none border border-yellow hover:bg-yellow hover:text-brown px-4 py-2 h-12"
                        @click="betAmount = 100">
                  100 XYA
                </button>
              </div>
              <div class="w-1/5">
                <button type="button"
                        :class="betAmount === 200 ? 'bg-yellow text-brown' : 'bg-transparent text-yellow'"
                        class="rounded-none border border-yellow bg-transparent hover:bg-yellow hover:text-brown px-4 py-2 h-12"
                        @click="betAmount = 200">
                  200 XYA
                </button>
              </div>
              <div class="w-1/5">
                <button type="button"
                        :class="betAmount === 500 ? 'bg-yellow text-brown' : 'bg-transparent text-yellow'"
                        class="rounded-none border border-yellow bg-transparent hover:bg-yellow hover:text-brown px-4 py-2 h-12"
                        @click="betAmount = 500">
                  500 XYA
                </button>
              </div>
              <div class="w-1/5">
                <button type="button"
                        :class="betAmount === 750 ? 'bg-yellow text-brown' : 'bg-transparent text-yellow'"
                        class="rounded-none border border-yellow bg-transparent hover:bg-yellow hover:text-brown px-4 py-2 h-12"
                        @click="betAmount = 750">
                  750 XYA
                </button>
              </div>
              <div class="w-1/5">
                <button type="button"
                        :class="betAmount === 1000 ? 'bg-yellow text-brown' : 'bg-transparent text-yellow'"
                        class="rounded-none border border-yellow bg-transparent hover:bg-yellow hover:text-brown px-4 py-2 h-12"
                        @click="betAmount = 1000">
                  1000 XYA
                </button>
              </div>
            </div>
          </div>

          <div class="flex flex-wrap">
            <div class="w-full flex text-xl mt-7 mb-4">
              <div class="w-1/4">
                Round number: {{ fetchedData.roundNumber }}
              </div>
              <div class="w-1/4">
                Time left: {{ fetchedData.timeLeft }}
              </div>
              <div class="w-1/4">
                Last colour: {{ fetchedData.lastSpace.colour }}
              </div>
              <div class="w-1/4">
                Last number: {{ fetchedData.lastSpace.number }}
              </div>
            </div>
            <div class="w-1/12 flex flex-wrap">
              <div @click="selectedItem = space.number" v-for="space in fetchedData.returnWheel.slice(0, 1)"
                   class="w-full p-1">
                <div class="h-full flex cursor-pointer"
                     :class="`text-${selectedItem === space.number ? 'brown' : 'yellow'} bg-${selectedItem === space.number ? 'white' : space.colour}`">
                  <p class="m-auto">
                    {{ space.number }}
                  </p>
                </div>
              </div>
            </div>

            <div class="w-8/12 pr-4 flex flex-wrap">
              <div @click="selectedItem = space.number" v-for="space in fetchedData.returnWheel.slice(1, 15)"
                   class="w-1/5 p-1">
                <div class="h-24 flex cursor-pointer"
                     :class="`text-${selectedItem === space.number ? 'brown' : 'yellow'} bg-${selectedItem === space.number ? 'white' : space.colour}`">
                  <p class="m-auto">
                    {{ space.number }}
                  </p>
                </div>
              </div>
              <div @click="selectedItem = (Math.floor(Math.random() * 15)).toString()" class="w-1/5 p-1">
                <div class="h-24 flex cursor-pointer"
                     :class="`text-${selectedItem === 'random' ? 'brown' : 'yellow'} bg-${selectedItem === 'random' ? 'white' : 'yellow'}`">
                  <p class="m-auto text-black">
                    Choose for me!
                  </p>
                </div>
              </div>
            </div>
            <div class="w-3/12 flex flex-wrap">
              <div class="w-1/2 flex flex-wrap">
                <div @click="selectedItem = 'black'" class="w-full p-1">
                  <div class="h-full flex cursor-pointer"
                       :class="`text-${selectedItem === 'black' ? 'black' : 'yellow'} bg-${selectedItem === 'black' ? 'white' : 'black'}`">
                    <p class="m-auto">
                      Black
                    </p>
                  </div>
                </div>
                <div @click="selectedItem = 'red'" class="w-full p-1">
                  <div class="h-full flex cursor-pointer"
                       :class="`text-${selectedItem === 'red' ? 'red' : 'yellow'} bg-${selectedItem === 'red' ? 'white' : 'red'}`">
                    <p class="m-auto">
                      Red
                    </p>
                  </div>
                </div>
              </div>
              <div class="w-1/2 flex flex-wrap">
                <div @click="selectedItem = 'odds'" class="w-full p-1">
                  <div class="h-full flex cursor-pointer"
                       :class="`text-${selectedItem === 'odds' ? 'black' : 'yellow'} bg-${selectedItem === 'odds' ? 'white' : 'black'}`">
                    <p class="m-auto">
                      Odds
                    </p>
                  </div>
                </div>
                <div @click="selectedItem = 'evens'" class="w-full p-1">
                  <div class="h-full flex cursor-pointer"
                       :class="`text-${selectedItem === 'evens' ? 'black' : 'yellow'} bg-${selectedItem === 'evens' ? 'white' : 'black'}`">
                    <p class="m-auto">
                      Evens
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="flex">
            <button v-if="selectedItem === 'odds' || selectedItem === 'evens' || selectedItem === 'black' || selectedItem === 'red'" type="button"
                    class="w-full rounded-none border border-yellow bg-transparent hover:bg-yellow hover:text-brown px-4 py-2 h-12 mb-4 mt-4 mx-1"
                    @click="makeOutsideBet(selectedItem, betAmount)">
              Place your bet!
            </button>
            <button v-else type="button"
                    class="w-full rounded-none border border-yellow bg-transparent hover:bg-yellow hover:text-brown px-4 py-2 h-12 mb-4 mt-4 mx-1"
                    @click="makeStraightBet(selectedItem, betAmount)">
              Place your bet!
            </button>
          </div>
        </div>
      </div>

      <div v-if="openWindow === 'casino-large'">
        <br>
        <br>
        <hr>
        <br>
        <br>
        <br>
        <br>
      </div>

      <p class="text-xl pb-24">
        After the monarch’s defenses grew stronger, thieves and outcasts retreated to the outskirts of the
        Freyala
        kingdom. Roaming in a secluded alleyway, deadly games of chance were hosted for those that were
        adventures.
        To give these risky wagers more recognition, a covert organization called ‘Luderion’ was established, of
        which no one knew the founder. Word of this underground activity quickly spread amongst the Freyfolk.
        <br>
        <br>
        The most popular tale is that of an infamous hoodlum named Tariel. He was once the undefeated champion
        of
        these games, and eventually challenged the founder of Luderion himself to a duel, hoping to seize the
        position. But he was defeated after what seemed like mere minutes. Unable to pay his crippling debt,
        Tariel
        fell into madness and was found dead in the alleyway the following day. Despite Regent Carroway’s best
        attempts, Luderion was never successfully shut down.
      </p>
    </div>
  </transition>
</template>

<script>
import fromExponential from "from-exponential";

import {mapGetters, mapActions} from "vuex";
import {ethers} from "ethers";

import wallet from "../../../plugins/wallet";
import Freyala from "../../../plugins/artifacts/freyala.json";
import Roulette from "../../../plugins/artifacts/roulette.json";

export default {
  name: 'Casino',
  mixins: [wallet],
  computed: {
    ...mapGetters([
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
      betAmount: 100,
      selectedItem: 0,
      defaultView: 'medium',
      preApprove: false,
      amountToApprove: 0,
      mainContract: {},
      rouletteContract: {},
      fetchedData: {},
      loading: {
        betting: false
      }
    }
  },
  mounted() {
    setInterval(() => {
      this.fetchData()
    }, 1000)
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
    async fetchData() {
      const data = await Promise.all([
        this.rouletteContract.currentBets(),
        this.rouletteContract.lastSpace(),
        this.rouletteContract.returnWheel(),
        this.rouletteContract.rN(),
        this.rouletteContract.timeLeft()
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
      const timeLeft = data[4]._isBigNumber ? ethers.BigNumber.from(data[4]).toString() : data[4]

      this.fetchedData = {
        currentBets: data[0],
        lastSpace: lastSpace,
        returnWheel: wheel,
        roundNumber: roundNumber,
        timeLeft: timeLeft
      }
    },

    // CALL DATA
    async currentBets() {
      this.loading.currentBets = true
      this.fetchedData.currentBets = await this.rouletteContract.currentBets()
      this.loading.currentBets = false
    },
    async currentBetsByAddress(address) {
      this.loading.currentBetsByAddress = true
      this.fetchedData.currentBetsByAddress = await this.rouletteContract.currentBetsByAddress(address)
      this.loading.currentBetsByAddress = false
    },
    async lastSpace() {
      this.loading.lastSpace = true
      this.fetchedData.lastSpace = await this.rouletteContract.lastSpace()
      this.loading.lastSpace = false
    },
    async returnWheel() {
      this.loading.returnWheel = true
      this.fetchedData.returnWheel = await this.rouletteContract.returnWheel()
      this.loading.returnWheel = false
    },
    async roundNumber() {
      this.loading.roundNumber = true
      this.fetchedData.roundNumber = await this.rouletteContract.rN()
      this.loading.roundNumber = false
    },
    async timeLeft() {
      this.loading.timeLeft = true
      this.fetchedData.timeLeft = await this.rouletteContract.timeLeft()
      this.loading.timeLeft = false
    },

    // SEND DATA
    async makeOutsideBet(value, amount) {
      this.error = ''
      this.loading.makeOutsideBet = true

      let number = 0
      if (value === 'odd') number = '1'
      if (value === 'even') number = '2'
      if (value === 'red') number = '3'
      if (value === 'black') number = '4'

      try {
        const tx = await this.rouletteContract.makeOutsideBet(number, amount.toString())
        await tx.wait(1)

        this.loading.makeOutsideBet = false
        this.amountToBet = 100
        this.selectedItem = false

      } catch (err) {
        if (err.code !== 4001) {
          this.error = err
        }

        this.loading.makeOutsideBet = false
        console.error(err);
      }
    },
    async makeStraightBet(number, amount) {
      this.error = ''
      this.loading.makeStraightBet = true

      try {
        const tx = await this.rouletteContract.makeStraightBet(number, amount.toString())
        await tx.wait(1)

        this.loading.makeStraightBet = false
        this.amountToBet = 100
        this.selectedItem = false

      } catch (err) {
        if (err.code !== 4001) {
          this.error = err
        }

        this.loading.makeStraightBet = false
        console.error(err);
      }
    },
    async spinWheel() {
      this.error = ''
      this.loading.spinWheel = true

      try {
        const tx = await this.rouletteContract.spinWheel()
        await tx.wait(1)

        this.loading.spinWheel = false

      } catch (err) {
        if (err.code !== 4001) {
          this.error = err
        }

        this.loading.spinWheel = false
        console.error(err);
      }
    },
    async addAllowance(amount) {
      this.error = ''

      let actual = 0

      if (amount) {
        actual = amount * (10 ** 18);
        this.loading.maxAllowance = true
      } else {
        actual = this.amountToApprove * (10 ** 18);
        this.loading.allowance = true
      }

      const arg = fromExponential(actual);

      try {
        const tx = await this.mainContract.approve(Roulette.address, arg)

        await tx.wait(1)

        this.loading.maxAllowance = false
        this.loading.allowance = false
      } catch (err) {
        if (err.code !== 4001) {
          this.error = err
        }

        this.loading.maxAllowance = false
        this.loading.allowance = false
        console.error(err);
      }

      this.amountToApprove = 0;
    }
  }
}
</script>