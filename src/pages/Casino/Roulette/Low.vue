<template>
  <section style="background: url('/images/map/worldmap.png') no-repeat; background-size: cover; min-height: 100vh"
           class="flex p-4 xl:p-16 xl:px-32">
    <div style="background: #1c1c1c; z-index: 9999; overflow-y: auto;" class="screen rounded-2xl w-full">
      <section id="section-i-1" class="border-b-4 border-primary-alt"
               style="background: url('/images/SVG/homepage-bg-top.svg') no-repeat top right">
        <div class="container mx-auto text-center pt-16 xl:pt-24 pb-16 xl:pb-20">
          <h1 class="text-2xl xl:text-5xl text-primary-alt font-semibold">
            Roulette
          </h1>
        </div>
      </section>

      <div class="relative">
        <div class="absolute top-0 left-0 p-4 xl:p-8">
          <router-link :to="{ name: 'casino' }">
            <i class="fas fa-long-arrow-alt-left"></i> Back
          </router-link>
        </div>
      </div>

      <div v-if="rouletteMounted" class="flex flex-wrap mt-8 p-8">
        <div class="w-full flex flex-wrap">
          <div class="w-full" v-if="parseInt(allowance) > 0">
            <button
                class="w-full rounded-none border border-primary-alt bg-transparent hover:bg-yellow hover:text-white px-4 py-2 h-12"
                @click="addAllowance(0)">
              Disable <span class="hidden xl:inline">low</span> roulette <small class="hidden xl:inline">(contract
              will no longer have rights to use your XYA)</small> <i
                v-if="loading.allowance" class="fas fa-cog fa-spin"></i>
            </button>
          </div>

          <div class="w-full" v-else>
            <button
                class="w-full rounded-none border border-primary-alt bg-transparent hover:bg-yellow hover:text-white px-4 py-2 h-12 mt-4"
                @click="addAllowance(999999999999.9999)">
              Enable <span class="hidden xl:inline">low</span> roulette <i v-if="loading.maxAllowance"
                                                                              class="fas fa-cog fa-spin"></i>
            </button>
          </div>
        </div>

        <div class="w-full flex flex-wrap">
          <div class="w-full xl:w-1/4 mt-8 mb-6">
            <h3 class="hidden xl:inline text-4xl mb-8">
              Menu
            </h3>

            <!--      lowTable-->
            <button type="button"
                    class="text-sm xl:text-base bg-primary-alt text-brown w-full rounded-none border border-primary-alt bg-transparent hover:bg-primary-alt hover:text-brown px-4 py-2 min-h-12 mb-4"
                    @click="$router.push({ name: 'roulette-low' })">
              New kids <span class="hidden xl:inline">table</span> ( 1 - 50 )
            </button>

            <!--      lowTable-->
            <button type="button"
                    class="text-sm xl:text-base w-full rounded-none border border-primary-alt bg-transparent hover:bg-primary-alt hover:text-brown px-4 py-2 min-h-12 mb-4"
                    @click="$router.push({ name: 'roulette-medium' })">
              Regular <span class="hidden xl:inline">table</span> ( 50 - 1000 )
            </button>

            <!--      highTable-->
            <button type="button"
                    class="text-sm xl:text-base w-full rounded-none border border-primary-alt bg-transparent hover:bg-primary-alt hover:text-brown px-4 py-2 min-h-12 mb-4"
                    @click="$router.push({ name: 'roulette-high' })">
              High stakes <span class="hidden xl:inline">table</span> ( 1000 - 15000 )
            </button>

            <br>
            <br>
            <div class="flex flex-wrap">
              <img class="w-5/6 mx-auto" src="/images/ui/roulette.png" alt="Roulette table">

              <div class="w-full" v-if="rouletteFetchedData.timeLeft !== 'Finished'">
                <p>Feel powerful! Be the one to stop the wheel!</p>
                <button v-if="rouletteFetchedData.timeLeft > 0" type="button"
                        class="w-full rounded-none border border-primary-alt bg-transparent hover:bg-yellow hover:text-white px-4 py-2 min-h-12 mb-4 mt-4 mx-1">
                <span>Wait for the timer to end... {{
                    rouletteFetchedData.timeLeft === 'Finished' ? 'Round finished' : `${rouletteFetchedData.timeLeft < 0 ? '0' : rouletteFetchedData.timeLeft}`
                  }}</span>
                </button>
                <button v-else type="button"
                        class="w-full rounded-none border border-primary-alt bg-transparent hover:bg-primary-alt hover:text-brown px-4 py-2 min-h-12 mb-4 mt-4 mx-1"
                        @click="spinWheel()">
                  <span v-if="rouletteLoading.spinWheel">Stopping wheel... </span>
                  <span v-else>Stop wheel after placing bet! </span>
                  <i v-if="rouletteLoading.spinWheel" class="fas fa-cog fa-spin"></i>
                </button>
              </div>
            </div>


            <div v-if="rouletteMounted && rouletteFetchedData.currentRound.length > 0" class="flex flex-wrap mt-4">
              <div class="w-full">
                <span class="xl:text-xl"
                      v-if="rouletteFetchedData.currentRound.length > 0">Current round bets: </span><br>
                <div v-if="bet.type === 'straight'" v-for="bet in rouletteFetchedData.currentRound">
                  <span style="word-break: break-all">{{ bet.player }}</span> <br> has bet {{ bet.betSize }} XYA on
                  number {{ bet.spaceNumber }}
                </div>
                <div v-if="bet.type === 'outside'" v-for="bet in rouletteFetchedData.currentRound">
                  <span style="word-break: break-all">{{ bet.player }}</span> <br> has bet {{ bet.betSize }} XYA on
                  {{ bet.betType }}
                </div>
              </div>
            </div>
            <br>
            <hr v-if="rouletteMounted">
            <br>
            <div v-if="rouletteMounted && rouletteFetchedData.lastWinners.length > 0" class="flex flex-wrap">
              <div class="w-full mt-2 xl:mt-4">
              <span class="xl:text-xl">
                Last rounds winners: <br>
              </span>
                <div v-for="bet in rouletteFetchedData.lastWinners">
                  <span style="word-break: break-all">{{ bet.player }}</span> has won {{ bet.winnings }} XYA
                </div>
              </div>
            </div>
            <div v-if="rouletteMounted && rouletteFetchedData.lastWinners.length === 0" class="flex flex-wrap">
              <div class="w-full mt-2 xl:mt-4">
              <span class="xl:text-xl">
                Last rounds winners: <br>
              </span>
                No winners last round.
              </div>
            </div>
            <br>
            <hr v-if="rouletteMounted && rouletteFetchedData.lastWinners.length > 0">
            <br>
            <div v-if="rouletteMounted && rouletteFetchedData.previousRound.length > 0" class="flex flex-wrap">
              <div class="w-full mt-2 xl:mt-4">
                <span class="xl:text-xl"
                      v-if="rouletteFetchedData.previousRound.length > 0">Last round winners bets: </span><br>
                <div v-if="bet.type === 'straight'" v-for="bet in rouletteFetchedData.previousRound">
                  <span style="word-break: break-all">{{ bet.player }}</span> <br> had bet {{ bet.betSize }} XYA on number {{ bet.spaceNumber }}
                </div>
                <div v-if="bet.type === 'outside'" v-for="bet in rouletteFetchedData.previousRound">
                  <span style="word-break: break-all">{{ bet.player }}</span> <br> had bet {{ bet.betSize }} XYA on {{ bet.betType }}
                </div>
              </div>
            </div>
          </div>

          <div v-if="parseInt(allowance) > 0" class="w-full xl:w-3/4 mt-8 xl:px-8">
            <div class="flex flex-wrap">
              <div class="w-full">
                <h3 class="text-4xl">
                  Spin the wheel!
                </h3>
              </div>

              <div class="w-full 2xl:w-3/4 flex flex-wrap mt-8 p-1">
                <div class="w-1/3 xl:w-1/6">
                  <button type="button"
                          :class="rouletteBetAmount === '1000000000000000000' ? 'bg-primary-alt text-brown' : 'bg-transparent text-primary-alt'"
                          class="w-full xl:w-auto rounded-none border border-primary-alt hover:bg-primary-alt hover:text-brown px-4 py-2 min-h-12"
                          @click="rouletteBetAmount = '1000000000000000000'">
                    1 <span class="hidden xl:inline">XYA</span>
                  </button>
                </div>
                <div class="w-1/3 xl:w-1/6">
                  <button type="button"
                          :class="rouletteBetAmount === '2000000000000000000' ? 'bg-primary-alt text-brown' : 'bg-transparent text-primary-alt'"
                          class="w-full xl:w-auto rounded-none border border-primary-alt hover:bg-primary-alt hover:text-brown px-4 py-2 min-h-12"
                          @click="rouletteBetAmount = '2000000000000000000'">
                    2 <span class="hidden xl:inline">XYA</span>
                  </button>
                </div>
                <div class="w-1/3 xl:w-1/6">
                  <button type="button"
                          :class="rouletteBetAmount === '5000000000000000000' ? 'bg-primary-alt text-brown' : 'bg-transparent text-primary-alt'"
                          class="w-full xl:w-auto rounded-none border border-primary-alt bg-transparent hover:bg-primary-alt hover:text-brown px-4 py-2 min-h-12"
                          @click="rouletteBetAmount = '5000000000000000000'">
                    5 <span class="hidden xl:inline">XYA</span>
                  </button>
                </div>
                <div class="w-1/3 xl:w-1/6">
                  <button type="button"
                          :class="rouletteBetAmount === '10000000000000000000' ? 'bg-primary-alt text-brown' : 'bg-transparent text-primary-alt'"
                          class="w-full xl:w-auto rounded-none border border-primary-alt bg-transparent hover:bg-primary-alt hover:text-brown px-4 py-2 min-h-12"
                          @click="rouletteBetAmount = '10000000000000000000'">
                    10 <span class="hidden xl:inline">XYA</span>
                  </button>
                </div>
                <div class="w-1/3 xl:w-1/6">
                  <button type="button"
                          :class="rouletteBetAmount === '20000000000000000000' ? 'bg-primary-alt text-brown' : 'bg-transparent text-primary-alt'"
                          class="w-full xl:w-auto rounded-none border border-primary-alt bg-transparent hover:bg-primary-alt hover:text-brown px-4 py-2 min-h-12"
                          @click="rouletteBetAmount = '20000000000000000000'">
                    20 <span class="hidden xl:inline">XYA</span>
                  </button>
                </div>
                <div class="w-1/3 xl:w-1/6">
                  <button type="button"
                          :class="rouletteBetAmount === '50000000000000000000' ? 'bg-primary-alt text-brown' : 'bg-transparent text-primary-alt'"
                          class="w-full xl:w-auto rounded-none border border-primary-alt bg-transparent hover:bg-primary-alt hover:text-brown px-4 py-2 min-h-12"
                          @click="rouletteBetAmount = '50000000000000000000'">
                    50 <span class="hidden xl:inline">XYA</span>
                  </button>
                </div>
              </div>
            </div>

            <div class="flex flex-wrap">
              <div class="w-full flex flex-wrap xl:text-xl mt-7 mb-4">
                <div class="w-full xl:w-1/4">
                  XYA Balance: {{ walletBalance }}
                </div>
                <div class="w-full xl:w-1/4">
                  Round number: {{ rouletteFetchedData.currentRoundNumber }}
                </div>
                <div class="w-full xl:w-1/4">
                  {{
                    rouletteFetchedData.timeLeft === 'Finished' ? 'Round finished' : `Wheel stoppable in: ${rouletteFetchedData.timeLeft < 0 ? '0' : rouletteFetchedData.timeLeft}`
                  }}
                </div>
                <div class="w-full xl:w-1/4">
                  Last game: {{ rouletteFetchedData.lastSpace.colour }} {{ rouletteFetchedData.lastSpace.number }}
                </div>
              </div>
              <div class="w-full xl:w-1/12 flex flex-wrap">
                <div @click="rouletteSelectedItem = space.number"
                     v-for="space in rouletteFetchedData.wheel.slice(0, 1)"
                     class="w-full p-1 h-24 xl:h-auto">
                  <div class="h-full flex cursor-pointer"
                       :class="`text-${rouletteSelectedItem === space.number ? 'brown' : 'primary-alt'} bg-${rouletteSelectedItem === space.number ? 'white' : space.colour}`">
                    <p class="m-auto">
                      {{ space.number }}
                    </p>
                  </div>
                </div>
              </div>

              <div class="w-full xl:w-8/12 xl:pr-4 flex flex-wrap">
                <div @click="rouletteSelectedItem = space.number"
                     v-for="space in rouletteFetchedData.wheel.slice(1, 37)"
                     class="w-1/6 p-1">
                  <div class="h-24 flex cursor-pointer"
                       :class="`text-${rouletteSelectedItem === space.number ? 'brown' : 'primary-alt'} bg-${rouletteSelectedItem === space.number ? 'white' : space.colour}`">
                    <p class="m-auto">
                      {{ space.number }}
                    </p>
                  </div>
                </div>
              </div>
              <div class="w-full xl:w-3/12 flex flex-wrap">
                <div class="w-1/2 flex flex-wrap">
                  <div @click="rouletteSelectedItem = 'black'" class="h-24 xl:h-auto w-full p-1">
                    <div class="h-full flex cursor-pointer"
                         :class="`text-${rouletteSelectedItem === 'black' ? 'black' : 'primary-alt'} bg-${rouletteSelectedItem === 'black' ? 'white' : 'black'}`">
                      <p class="m-auto">
                        Black
                      </p>
                    </div>
                  </div>
                  <div @click="rouletteSelectedItem = 'red'" class="h-24 xl:h-auto w-full p-1">
                    <div class="h-full flex cursor-pointer"
                         :class="`text-${rouletteSelectedItem === 'red' ? 'red' : 'primary-alt'} bg-${rouletteSelectedItem === 'red' ? 'white' : 'red'}`">
                      <p class="m-auto">
                        Red
                      </p>
                    </div>
                  </div>
                </div>
                <div class="w-1/2 flex flex-wrap">
                  <div @click="rouletteSelectedItem = 'odds'" class="h-24 xl:h-auto w-full p-1">
                    <div class="h-full flex cursor-pointer"
                         :class="`text-${rouletteSelectedItem === 'odds' ? 'black' : 'primary-alt'} bg-${rouletteSelectedItem === 'odds' ? 'white' : 'dark-gray'}`">
                      <p class="m-auto">
                        Odds
                      </p>
                    </div>
                  </div>
                  <div @click="rouletteSelectedItem = 'evens'" class="h-24 xl:h-auto w-full p-1">
                    <div class="h-full flex cursor-pointer"
                         :class="`text-${rouletteSelectedItem === 'evens' ? 'black' : 'primary-alt'} bg-${rouletteSelectedItem === 'evens' ? 'white' : 'dark-gray'}`">
                      <p class="m-auto">
                        Evens
                      </p>
                    </div>
                  </div>
                </div>
                <div @click="rouletteSelectedItem = (Math.floor(Math.random() * 37)).toString()" class="h-24 xl:h-auto w-full p-1">
                  <div class="h-full flex cursor-pointer"
                       :class="`text-${rouletteSelectedItem === 'random' ? 'brown' : 'primary-alt'} bg-${rouletteSelectedItem === 'random' ? 'white' : 'primary-alt'}`">
                    <p class="m-auto text-black px-4 text-center">
                      Choose for me!
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div class="flex">
              <button
                  v-if="rouletteSelectedItem === 'odds' || rouletteSelectedItem === 'evens' || rouletteSelectedItem === 'black' || rouletteSelectedItem === 'red'"
                  type="button"
                  class="w-full rounded-none border border-primary-alt bg-transparent hover:bg-primary-alt hover:text-brown px-4 py-2 min-h-12 mb-4 mt-4 mx-1"
                  @click="makeOutsideBet(rouletteSelectedItem, rouletteBetAmount)">
                <span v-if="rouletteLoading.makeOutsideBet">Placing bet... </span>
                <span v-else>Place your bet! </span>
                <i v-if="rouletteLoading.makeOutsideBet" class="fas fa-cog fa-spin"></i>
              </button>
              <button v-else type="button"
                      class="w-full rounded-none border border-primary-alt bg-transparent hover:bg-primary-alt hover:text-brown px-4 py-2 min-h-12 mb-4 mt-4 mx-1"
                      @click="makeStraightBet(rouletteSelectedItem, rouletteBetAmount)">
                <span v-if="rouletteLoading.makeStraightBet">Placing bet... </span>
                <span v-else>Place your bet! </span>
                <i v-if="rouletteLoading.makeStraightBet" class="fas fa-cog fa-spin"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div v-if="!rouletteMounted" class="p-4 xl:p-8 relative mt-12">
        <div class="m-auto text-center">
          <div class="w-full flex">
            <img class="w-24 h-24 m-auto" src="/images/XYA.png" alt="XYA logo"
                 style="animation: rotation 2s infinite linear;">
          </div>
          <br>
          <p class="text-2xl">Loading...</p>
        </div>
      </div>

      <window name="error">
        <div class="flex flex-wrap p-6 bg-dark h-full">
          <div class="w-4/5">
            <div class="text-2xl">Error</div>
          </div>
          <div class="w-1/5 text-right">
            <i @click="$modal.hide('error')" class="fas fa-times cursor-pointer text-xl"></i>
          </div>
          <p class="w-full mt-4">
            {{
              error === 'execution reverted: ERC20: transfer amount exceeds allowance' ? 'Transfer amount exceeds allowance, please approve an appropriate amount.' : error
            }}

          </p>
        </div>
      </window>
      <window name="success">
        <div class="flex flex-wrap p-6 bg-dark h-full">
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
  </section>
</template>

<script>
import fromExponential from "from-exponential";

import {mapGetters, mapActions} from "vuex";
import {ethers} from "ethers";

import wallet from "../../../plugins/wallet";
import Freyala from "../../../plugins/artifacts/freyala.json";
import RouletteLow from "../../../plugins/artifacts/roulettelow.json";
import {initWeb3} from "../../../plugins/initWeb3"

export default {
  name: 'Roulette',
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
      success: '',
      currentBlockNumber: 0,
      walletBalance: 0,
      mainContract: {},
      allowance: 0,
      loading: {
        allowance: false,
        maxAllowance: false
      },
      rouletteLowContract: {},
      rouletteMounted: false,
      rouletteInterval: undefined,

      rouletteBetAmount: '',
      rouletteSelectedItem: undefined,
      rouletteDefaultView: 'low',
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
  async mounted() {
    this.mainContract = new ethers.Contract(Freyala.address, Freyala.abi, this.metaMaskWallet.signer)
    this.rouletteLowContract = new ethers.Contract(RouletteLow.address, RouletteLow.abi, this.metaMaskWallet.signer)

    await this.fetchData()
    this.rouletteMounted = true

    this.rouletteInterval = setInterval(async () => {
      await this.fetchData()
    }, 2000)
  },
  beforeDestroy() {
    clearInterval(this.rouletteInterval)
  },
  methods: {
    ...mapActions([
      'setFavourite'
    ]),
    async fetchData() {
      const [allowance, balanceData, currentRoundData, previousResultData, lastSpaceData, returnWheelData, roundStartedAtData] = await Promise.all([
        this.mainContract.allowance(this.metaMaskAccount, RouletteLow.address),
        this.mainContract.balanceOf(this.metaMaskAccount),
        this.rouletteLowContract.getCurrentRound(),
        this.rouletteLowContract.getPreviousRoundResult(),
        this.rouletteLowContract.lastSpace(),
        this.rouletteLowContract.returnWheel(),
        this.rouletteLowContract.roundStartedAt()
      ])

      this.walletBalance = (balanceData / Math.pow(10, 18)).toFixed(2)
      this.allowance = ethers.utils.formatEther(allowance._isBigNumber ? ethers.BigNumber.from(allowance).toString() : allowance)

      let currentRound = []
      if (currentRoundData.straightBets.length > 0) {
        currentRoundData.straightBets.map((straightBet) => {
          for (const bet of straightBet) {
            let straightBetInfo = {
              type: 'straight'
            }

            straightBetInfo.betSize = ethers.utils.formatEther(ethers.BigNumber.from(bet.betSize).toString())
            straightBetInfo.spaceNumber = ethers.BigNumber.from(bet.spaceNumber).toString()
            straightBetInfo.player = bet.player

            currentRound.push(straightBetInfo)
          }
        })
      }
      if (currentRoundData.outsideBets.length > 0) {
        currentRoundData.outsideBets.map((outsideBet) => {
          for (const bet of outsideBet) {
            let outsideBetInfo = {
              type: 'outside'
            }

            outsideBetInfo.betSize = ethers.utils.formatEther(ethers.BigNumber.from(bet.betSize).toString())
            outsideBetInfo.player = bet.player

            if (bet.betType === 1) outsideBetInfo.betType = 'odds'
            if (bet.betType === 2) outsideBetInfo.betType = 'evens'
            if (bet.betType === 3) outsideBetInfo.betType = 'red'
            if (bet.betType === 4) outsideBetInfo.betType = 'black'

            currentRound.push(outsideBetInfo)
          }
        })
      }

      let lastWinners = []
      let previousRound = []
      if (previousResultData.winners.length > 0) {
        previousResultData.winners.map((winner) => {
          const winnerInfo = {}

          winnerInfo.winnings = ethers.utils.formatEther(winner.winnings._isBigNumber ? ethers.BigNumber.from(winner.winnings).toString() : winner.winnings)
          winnerInfo.player = winner.player

          lastWinners.push(winnerInfo)
        })
      }
      if (previousResultData.winningStraightBets.length > 0) {
        previousResultData.winningStraightBets.map((straightBet) => {
          let straightBetInfo = {
            type: 'straight'
          }

          straightBetInfo.betSize = ethers.utils.formatEther(straightBet.betSize._isBigNumber ? ethers.BigNumber.from(straightBet.betSize).toString() : straightBet.betSize)
          straightBetInfo.spaceNumber = ethers.BigNumber.from(straightBet.spaceNumber).toString()
          straightBetInfo.player = straightBet.player

          previousRound.push(straightBetInfo)
        })
      }
      if (previousResultData.winningOutsideBets.length > 0) {
        previousResultData.winningOutsideBets.map((outsideBet) => {
          let outsideBetInfo = {
            type: 'outside'
          }

          outsideBetInfo.betSize = ethers.utils.formatEther(outsideBet.betSize._isBigNumber ? ethers.BigNumber.from(outsideBet.betSize).toString() : outsideBet.betSize)
          outsideBetInfo.player = outsideBet.player

          if (outsideBet.betType === 1) outsideBetInfo.betType = 'odds'
          if (outsideBet.betType === 2) outsideBetInfo.betType = 'evens'
          if (outsideBet.betType === 3) outsideBetInfo.betType = 'red'
          if (outsideBet.betType === 4) outsideBetInfo.betType = 'black'

          previousRound.push(outsideBetInfo)
        })
      }

      const lastSpace = {
        number: lastSpaceData[0]._isBigNumber ? ethers.BigNumber.from(lastSpaceData[0]).toString() : lastSpaceData[0],
        colour: parseInt(lastSpaceData[1]) === 0 ? 'green' : parseInt(lastSpaceData[1]) === 1 ? 'red' : 'black'
      }

      const wheel = []
      for (const space of returnWheelData) {
        wheel.push({
          number: space[0]._isBigNumber ? ethers.BigNumber.from(space[0]).toString() : space[0],
          colour: parseInt(space[1]) === 0 ? 'green' : parseInt(space[1]) === 1 ? 'red' : 'black'
        })
      }

      const startedAt = roundStartedAtData._isBigNumber ? ethers.BigNumber.from(roundStartedAtData).toString() : roundStartedAtData


      this.rouletteFetchedData = {
        currentRoundNumber: ethers.BigNumber.from(currentRoundData.currentRound).toString(),
        currentRound,
        lastWinners,
        previousRound,
        lastSpace,
        wheel,
        startedAt,
        timeLeft: startedAt === '0' ? 'Finished' : (parseInt(startedAt) + 35) - Math.floor(Date.now() / 1000)
      }
    },

    // ROULETTE
    // CALL DATA
    async currentBets() {
      this.rouletteLoading.currentBets = true

      this.rouletteFetchedData.currentBets = await this.rouletteLowContract.currentBets()

      this.rouletteLoading.currentBets = false
    },
    async currentBetsByAddress(address) {
      this.rouletteLoading.currentBetsByAddress = true

      this.rouletteFetchedData.currentBetsByAddress = await this.rouletteLowContract.currentBetsByAddress(address)

      this.rouletteLoading.currentBetsByAddress = false
    },
    async lastSpace() {
      this.rouletteLoading.lastSpace = true

      this.rouletteFetchedData.lastSpace = await this.rouletteLowContract.lastSpace()

      this.rouletteLoading.lastSpace = false
    },
    async returnWheel() {
      this.rouletteLoading.returnWheel = true

      this.rouletteFetchedData.returnWheel = await this.rouletteLowContract.returnWheel()

      this.rouletteLoading.returnWheel = false
    },
    async roundNumber() {
      this.rouletteLoading.roundNumber = true

      this.rouletteFetchedData.roundNumber = await this.rouletteLowContract.rN()

      this.rouletteLoading.roundNumber = false
    },

    // SEND DATA
    async makeOutsideBet(value, amount) {
      if (value === undefined) {
        this.error = 'Please select a bet first.'
        this.$modal.show('error')
        return
      }

      if (amount === '') {
        this.error = 'Please select a quantity first.'
        this.$modal.show('error')
        return
      }

      this.error = ''
      this.rouletteLoading.makeOutsideBet = true

      let number = 0
      if (value === 'odds') number = '1'
      if (value === 'evens') number = '2'
      if (value === 'red') number = '3'
      if (value === 'black') number = '4'

      try {
        let tx = {}

        tx = await this.rouletteLowContract.makeOutsideBet(number, amount)

        await tx.wait(1)

        this.rouletteSelectedItem = false

      } catch (err) {
        if (err.code !== 4001) {
          this.error = err.data ? err.data.message : err
          this.$modal.show('error')
        }
        console.error(err);
        this.error = err.data ? err.data.message : err
        this.$modal.show('error')
      }

      this.rouletteLoading.makeOutsideBet = false
    },
    async makeStraightBet(number, amount) {
      if (number === undefined) {
        this.error = 'Please select a bet first.'
        this.$modal.show('error')
        return
      }

      if (amount === '') {
        this.error = 'Please select a quantity first.'
        this.$modal.show('error')
        return
      }

      this.error = ''
      this.rouletteLoading.makeStraightBet = true

      try {
        let tx = {}

        tx = await this.rouletteLowContract.makeStraightBet(number, amount)

        await tx.wait(1)

        this.rouletteSelectedItem = false
      } catch (err) {
        if (err.code !== 4001) {
          this.error = err.data ? err.data.message : err
          this.$modal.show('error')
        }
        console.error(err);
        this.error = err.data ? err.data.message : err
        this.$modal.show('error')
      }

      this.rouletteLoading.makeStraightBet = false
    },
    async spinWheel() {
      this.error = ''
      this.rouletteLoading.spinWheel = true

      try {
        let web3 = await initWeb3()

        const rouletteLowContract = await new web3.eth.Contract(RouletteLow.abi, RouletteLow.address);
        await rouletteLowContract.methods.spinWheel().send({
          from: this.metaMaskAccount
        })

      } catch (err) {
        if (err.code !== 4001) {
          this.error = 'Transaction reverted. There have been no bets placed for this round, someone has either already stopped the wheel or you have not placed a bet yet.'
          this.$modal.show('error')
        }

        console.error(err);
        this.error = 'Transaction reverted. There have been no bets placed for this round, someone has either already stopped the wheel or you have not placed a bet yet.'
        this.$modal.show('error')
      }

      this.rouletteLoading.spinWheel = false
    },
    async addAllowance(amount) {
      this.error = ''

      let actual = 0

      if (amount > 0) {
        actual = amount * (10 ** 18)
        this.loading.maxAllowance = true
      } else {
        actual = 0
        this.loading.allowance = true
      }

      const arg = fromExponential(actual)

      try {
        const tx = await this.mainContract.approve(RouletteLow.address, arg)

        await tx.wait(1)

        this.loading.maxAllowance = false
        this.loading.allowance = false
      } catch (err) {
        if (err.code !== 4001) {
          this.error = err
        }

        this.loading.maxAllowance = false
        this.loading.allowance = false
        console.error(err)
      }

      const data = await this.mainContract.allowance(this.metaMaskAccount, RouletteLow.address)
      this.allowance = ethers.utils.formatEther(data._isBigNumber ? ethers.BigNumber.from(data).toString() : data)
    },
  }
}
</script>