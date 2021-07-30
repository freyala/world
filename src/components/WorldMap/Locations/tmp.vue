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
        <router-link :to="{ name: 'casino' }" class="m-auto">
          Enter
        </router-link>
      </div>
      <br>
      <div class="flex flex-wrap">
        <small class="w-full">{{ allowance.roulette }} XYA</small>

        <div class="w-1/2 pr-2">
          <input class="w-full border border-yellow bg-transparent px-4 h-12" v-model="amountToApprove" type="number">
        </div>
        <div class="w-1/2 pl-2">
          <button class="w-full rounded-none border border-yellow bg-transparent px-4 py-2 h-12"
                  @click="addAllowance()">
            Set allowance <i v-if="loading.allowance" class="fas fa-cog fa-spin"></i>
          </button>
        </div>

        <button class="w-full rounded-none border border-yellow bg-transparent px-4 py-2 h-12 mt-4"
                @click="addAllowance(999999999999.9999)">
          Set max allowance <i v-if="loading.maxAllowance" class="fas fa-cog fa-spin"></i>
        </button>
      </div>
      <br>
      <div class="flex flex-wrap">
        <div class="w-1/2 pr-2">
          <small>Bet number</small>
          <input class="w-full border border-yellow bg-transparent px-4 h-12" v-model="numberToBet" type="number">
        </div>

        <div class="w-1/2 pl-2">
          <small>Bet amount</small>
          <input class="w-full border border-yellow bg-transparent px-4 h-12" v-model="amountToBet" type="number">
        </div>
        <div class="w-full mt-4">
          <button class="w-full rounded-none border border-yellow bg-transparent px-4 py-2 h-12"
                  @click="enterRoulette()">
            Bet <i v-if="loading.betting" class="fas fa-cog fa-spin"></i>
          </button>
        </div>
        <div class="w-full mt-4">
          <button class="w-full rounded-none border border-yellow bg-transparent px-4 py-2 h-12"
                  @click="fetchData()">
            Fetch data
          </button>
        </div>

        <div class="w-full mt-8">
          Round number: {{ rN }} <br>
          Time left: {{ timeLeft }} <br> <br>

          <strong>Last round results:</strong> <br>
          Round number: {{ recentRoundResult.roundNumber }} <br>
          Colour: {{ lastColour }} <br>
          Winners: <br>
          <span v-for="winner in recentRoundResult.winners">{{ winner }} <br></span>
          <br>
          <strong>Recent bets:</strong> <br>
          Colours: <span v-for="colour in myRecentBets.colours">{{ colour }} </span> <br>
          Amount: <span v-for="amount in myRecentBets.amounts">{{ amount }} </span> <br>
        </div>
      </div>

      <br>
      <hr>
      <br>

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
      preApprove: false,
      mainContract: {},
      rouletteContract: {},
      lastColour: undefined,
      myRecentBets: {
        colours: [],
        amounts: []
      },
      recentRoundResult: [],
      rN: undefined,
      timeLeft: undefined,
      numberToBet: 0,
      amountToBet: 0,
      amountToApprove: 0,
      error: '',
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
        this.rouletteContract.lastColour(),
        this.rouletteContract.myRecentBets(),
        this.rouletteContract.recentRoundResult(),
        this.rouletteContract.rN(),
        this.rouletteContract.timeLeft()
      ])

      this.lastColour = undefined
      this.myRecentBets = {
        colours: [],
        amounts: []
      }
      this.recentRoundResult = []
      this.rN = undefined
      this.timeLeft = undefined


      this.lastColour = data[0]

      for (const colour of data[1][0]) {
        let pushableColour = colour

        if (colour._isBigNumber) {
          pushableColour = ethers.BigNumber.from(colour._hex)
        }

        this.myRecentBets.colours.push(pushableColour.toString())
      }
      for (const amount of data[1][1]) {
        let pushableAmount = amount

        if (amount._isBigNumber) {
          pushableAmount = ethers.BigNumber.from(amount._hex)
        }

        this.myRecentBets.amounts.push(pushableAmount.toString())
      }

      this.recentRoundResult = {
        roundNumber: data[2][0],
        colour: data[2][1],
        winners: data[2][2],
        winnings: []
      }

      for (const number of data[2][3]) {
          let pushableNumber = number

          if (number._isBigNumber) {
            pushableNumber = ethers.BigNumber.from(number._hex)
          }

          this.recentRoundResult.winnings.push(pushableNumber.toString())
      }

      let roundNumber = data[3]
      if (data[3]._isBigNumber) { roundNumber = ethers.BigNumber.from(data[3]._hex) }
      this.rN = roundNumber

      this.timeLeft = data[4]

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
    },
    async enterRoulette() {
      this.error = ''
      this.loading.betting = true

      try {
        const tx = await this.rouletteContract.play(this.numberToBet, this.amountToBet)
        await tx.wait(1)

        this.loading.betting = false
        this.amountToBet = 0
        this.numberToBet = 0

      } catch (err) {
        if (err.code !== 4001) {
          this.error = err
        }

        this.loading.betting = false
        console.error(err);
      }
    }
  }
}
</script>