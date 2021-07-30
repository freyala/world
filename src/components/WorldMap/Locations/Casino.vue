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
        <!--        <router-link :to="{ name: 'casino' }" class="m-auto">-->
        <!--          Enter-->
        <!--        </router-link>-->
        <p @click="$store.dispatch('setOpenWindow', 'casino-large')" class="m-auto cursor-pointer">
          {{ openWindow === 'casino-large' ? 'Leave' : 'Enter' }}
        </p>
      </div>
      <br>

      <div class="flex flex-wrap" v-if="openWindow === 'casino-large'">
        <div class="w-1/4 mt-20 mb-6">
          <h3 class="text-4xl mb-8">
            Menu
          </h3>

          <!--      lobby-->
          <button type="button"
                  :class="defaultView === 'default' ? 'bg-yellow text-brown' : 'bg-transparent text-yellow'"
                  class="w-full rounded-none border border-yellow bg-transparent hover:bg-yellow hover:text-brown px-4 py-2 h-12 mb-4"
                  @click="defaultView = 'default'">
            Lobby
          </button>

          <!--      yourGames-->
          <button type="button"
                  :class="defaultView === 'yourGames' ? 'bg-yellow text-brown' : 'bg-transparent text-yellow'"
                  class="w-full rounded-none border border-yellow bg-transparent hover:bg-yellow hover:text-brown px-4 py-2 h-12 mb-4"
                  @click="recentGamesByUser(metaMaskAccount, 25)">
            Your games
          </button>

          <br>
          <br>
          <br>

          <!--      createGame-->
          <button type="button"
                  :class="selectedButton === 'createGame' ? 'bg-yellow text-brown' : 'bg-transparent text-yellow'"
                  class="w-full rounded-none border border-yellow bg-transparent hover:bg-yellow hover:text-brown px-4 py-2 h-12 mb-4"
                  @click="selectedButton = 'createGame'">
            Create new game
          </button>

          <!--      gameById-->
          <button type="button"
                  :class="selectedButton === 'gameById' ? 'bg-yellow text-brown' : 'bg-transparent text-yellow'"
                  class="w-full rounded-none border border-yellow bg-transparent hover:bg-yellow hover:text-brown px-4 py-2 h-12 mb-4"
                  @click="selectedButton = 'gameById'">
            Look up game by ID
          </button>

          <!--      gameByName-->
          <button type="button"
                  :class="selectedButton === 'gameByName' ? 'bg-yellow text-brown' : 'bg-transparent text-yellow'"
                  class="w-full rounded-none border border-yellow bg-transparent hover:bg-yellow hover:text-brown px-4 py-2 h-12 mb-4"
                  @click="selectedButton = 'gameByName'">
            Look up game by name
          </button>

          <!--      recentGames-->
          <button type="button"
                  :class="selectedButton === 'recentGames' ? 'bg-yellow text-brown' : 'bg-transparent text-yellow'"
                  class="w-full rounded-none border border-yellow bg-transparent hover:bg-yellow hover:text-brown px-4 py-2 h-12 mb-4"
                  @click="selectedButton = 'recentGames'">
            Look up recent games
          </button>

          <!--      recentGamesByUser-->
          <button type="button"
                  :class="selectedButton === 'recentGamesByUser' ? 'bg-yellow text-brown' : 'bg-transparent text-yellow'"
                  class="w-full rounded-none border border-yellow bg-transparent hover:bg-yellow hover:text-brown px-4 py-2 h-12 mb-4"
                  @click="selectedButton = 'recentGamesByUser'">
            Look up recent games by user
          </button>

          <!--      playerByPlayerIdAndGameId-->
          <button type="button"
                  :class="selectedButton === 'playerByPlayerIdAndGameId' ? 'bg-yellow text-brown' : 'bg-transparent text-yellow'"
                  class="w-full rounded-none border border-yellow bg-transparent hover:bg-yellow hover:text-brown px-4 py-2 h-12 mb-4"
                  @click="selectedButton = 'playerByPlayerIdAndGameId'">
            Look up player by game
          </button>

          <!--      betsByGameId-->
          <button type="button"
                  :class="selectedButton === 'betsByGameId' ? 'bg-yellow text-brown' : 'bg-transparent text-yellow'"
                  class="w-full rounded-none border border-yellow bg-transparent hover:bg-yellow hover:text-brown px-4 py-2 h-12 mb-4"
                  @click="selectedButton = 'betsByGameId'">
            Look up bet by game ID
          </button>

          <!--      coinFlipperByGameId-->
          <button type="button"
                  :class="selectedButton === 'coinFlipperByGameId' ? 'bg-yellow text-brown' : 'bg-transparent text-yellow'"
                  class="w-full rounded-none border border-yellow bg-transparent hover:bg-yellow hover:text-brown px-4 py-2 h-12 mb-4"
                  @click="selectedButton = 'coinFlipperByGameId'">
            Look up coin flipper by game ID
          </button>

        </div>
        <div class="w-1/2 px-8">
          <!--      setAllowance-->
          <div class="flex flex-wrap">
            <small class="w-full text-center">
              Current allowance: {{ allowance.coinflip }} XYA
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

          <!--      Game lobby-->
          <div class="mt-8">
            <h3 class="text-4xl text-center">
              {{ defaultView === 'default' ? 'Lobby' : defaultView === 'yourGames' ? 'Your games' : 'Custom search' }}
            </h3>

            <div class="mt-4">
              <div class="pb-8" v-for="game in shownGames">
                <!--              <div class="pb-8" v-if="game.betAmount > 0" v-for="game in shownGames">-->
                <!--              <div class="pb-8" v-if="!game.ended && game.betAmount > 0" v-for="game in shownGames">-->
                <div style="border: 1px solid #b8a984" class="flex p-4 relative">
                  <div class="w-3/5">
                    <p>
                      Game ID: {{ game.id }}
                    </p>
                    <p>
                      Name: {{ game.name }}
                    </p>
                    <p>
                      Player 1: {{ game.p1 }}
                    </p>
                    <p>
                      Player 2: {{ game.p2 }}
                    </p>
                    <p>
                      Amount: {{ game.betAmount }} XYA
                    </p>
                  </div>
                  <div class="w-2/5 pl-6">
                    <div v-if="game.ended">
                      Status: <br>
                      Ended
                      <br><br>
                      Winner: <br>
                      <span style="line-break: anywhere">{{ game.winner }}</span>
                    </div>
                    <div v-else>
                      Status: <br>
                      {{
                        (game.p2 === '0x0000000000000000000000000000000000000000' && game.p1 === metaMaskAccount) ? 'Searching for opponent' : 'In progress'
                      }} <span v-if="game.passwordProtected && game.p1 !== metaMaskAccount">(Locked game <i
                        class="fas fa-lock"></i>)</span>
                      <br><br>

                      <div v-if="game.passwordProtected && game.p1 !== metaMaskAccount" class="mb-2">
                        <input
                            class="w-full border border-yellow bg-transparent px-4 h-12" v-model="passwords[game.id]"
                            placeholder="password"
                            type="password"
                        >
                      </div>

                      <div
                          v-if="game.p2 === '0x0000000000000000000000000000000000000000' && game.p1 !== metaMaskAccount">
                        <button type="button"
                                @click="joinGame(game.id, passwords[game.id], game.betAmount, 2)"
                                class="w-full rounded-none border border-yellow bg-transparent hover:bg-yellow hover:text-brown px-4 py-2 h-12 mb-4">
                          Challenge <i v-if="loading.joiningGame === game.id" class="fas fa-cog fa-spin"></i>
                        </button>
                      </div>
                      <div v-else>
                        <div
                            v-if="game.p2 === '0x0000000000000000000000000000000000000000' && game.p1 === metaMaskAccount">
                          <button type="button"
                                  class="w-full rounded-none border border-yellow bg-transparent px-4 py-2 h-12 mb-4">
                            Waiting for challenger
                          </button>
                        </div>
                        <div
                            v-if="game.p2 !== '0x0000000000000000000000000000000000000000' && game.flipper === metaMaskAccount">
                          <button type="button"
                                  @click="startGame(game.id, passwords[game.id], 2)"
                                  class="w-full rounded-none border border-yellow bg-transparent hover:bg-yellow hover:text-brown px-4 py-2 h-12 mb-4">
                            Flip the coin! <i v-if="loading.flipping === game.id" class="fas fa-cog fa-spin"></i>
                          </button>
                        </div>
                        <div
                            v-if="game.p2 !== '0x0000000000000000000000000000000000000000' && ((game.p1 === metaMaskAccount || game.p2 === metaMaskAccount) && game.flipper !== metaMaskAccount)">
                          <button type="button"
                                  disabled
                                  class="w-full rounded-none border border-yellow bg-transparent px-4 py-2 h-12 mb-4">
                            Waiting for flipper
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div v-if="game.p1 === metaMaskAccount || game.p2 === metaMaskAccount" class="w-auto absolute top-0 right-0 p-4">
                    <i @click="cancelGame(game.id)" class="fas fa-times cursor-pointer"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
        <div class="w-1/4 mt-20">
          <h3 class="text-4xl mb-2">
            {{ selectedButton === 'createGame' ? 'Create' : 'Look up' }}
          </h3>

          <!--      createGame-->
          <div v-if="selectedButton === 'createGame'">
            <div class="flex flex-wrap">
              <div class="w-full">
                <small>Name of room</small>
                <input class="w-full border border-yellow bg-transparent px-4 h-12" v-model="createGame.name"
                       type="text">
              </div>
              <div class="w-full">
                <small>Room password</small>
                <input class="w-full border border-yellow bg-transparent px-4 h-12" v-model="createGame.password"
                       type="password">
              </div>
              <div class="w-full">
                <small>Confirm room password</small>
                <input class="w-full border border-yellow bg-transparent px-4 h-12" v-model="createGame.confirmPassword"
                       type="password">
              </div>
              <div class="w-full">
                <small>Amount to bet with</small>
                <input class="w-full border border-yellow bg-transparent px-4 h-12" v-model="createGame.amount"
                       type="number">
              </div>
              <div class="w-full mt-4">
                <button type="button"
                        class="w-full rounded-none border border-yellow bg-transparent hover:bg-yellow hover:text-brown px-4 py-2 h-12"
                        @click="createGameRoom(createGame.name, createGame.password, createGame.amount)">
                  Create game! <i v-if="loading.creatingGame" class="fas fa-cog fa-spin"></i>
                </button>
              </div>

              <div v-if="fetchedData.playerByPlayerIdAndGameId && fetchedData.playerByPlayerIdAndGameId !== ''"
                   class="mt-8">
                <p>
                  Player address: <br>
                  {{ fetchedData.playerByPlayerIdAndGameId }}
                </p>
              </div>
            </div>
          </div>

          <!--      playerByPlayerIdAndGameId-->
          <div v-if="selectedButton === 'playerByPlayerIdAndGameId'">
            <div class="flex flex-wrap">
              <div class="w-1/2 pr-2">
                <small>Player 1 or 2</small>
                <input class="w-full border border-yellow bg-transparent px-4 h-12" v-model="input.playerId"
                       type="number">
              </div>
              <div class="w-1/2 pl-2">
                <small>Game ID</small>
                <input class="w-full border border-yellow bg-transparent px-4 h-12" v-model="input.gameId"
                       type="number">
              </div>
              <div class="w-full mt-4">
                <button type="button"
                        class="w-full rounded-none border border-yellow bg-transparent hover:bg-yellow hover:text-brown px-4 py-2 h-12"
                        @click="playerByPlayerIdAndGameId(input.playerId, input.gameId)">
                  Fetch player <i v-if="loading.playerByPlayerIdAndGameId" class="fas fa-cog fa-spin"></i>
                </button>
              </div>

              <div v-if="fetchedData.playerByPlayerIdAndGameId && fetchedData.playerByPlayerIdAndGameId !== ''"
                   class="mt-8">
                <p>
                  Player address: <br>
                  {{ fetchedData.playerByPlayerIdAndGameId }}
                </p>
              </div>
            </div>
          </div>

          <!--      betsByGameId-->
          <div v-if="selectedButton === 'betsByGameId'">
            <small>Game ID</small>
            <div class="flex flex-wrap">
              <div class="w-1/2 pr-2">
                <input class="w-full border border-yellow bg-transparent px-4 h-12" v-model="input.gameId"
                       type="number">
              </div>
              <div class="w-1/2 pl-2">
                <button type="button"
                        class="w-full rounded-none border border-yellow bg-transparent hover:bg-yellow hover:text-brown px-4 py-2 h-12"
                        @click="betsByGameId(input.gameId)">
                  Fetch bets <i v-if="loading.betsByGameId" class="fas fa-cog fa-spin"></i>
                </button>
              </div>
            </div>

            <div v-if="fetchedData.betsByGameId && fetchedData.betsByGameId !== ''" class="mt-8">
              <p>
                Bet amount: <br>
                {{ fetchedData.betsByGameId }} XYA
              </p>
            </div>
          </div>

          <!--      recentGames-->
          <div v-if="selectedButton === 'recentGames'">
            <small>Number of games</small>
            <div class="flex flex-wrap">
              <div class="w-1/2 pr-2">
                <input class="w-full border border-yellow bg-transparent px-4 h-12" v-model="input.numberOfGames"
                       type="number">
              </div>
              <div class="w-1/2 pl-2">
                <button type="button"
                        class="w-full rounded-none border border-yellow bg-transparent hover:bg-yellow hover:text-brown px-4 py-2 h-12"
                        @click="recentGames(input.numberOfGames)">
                  Fetch games <i v-if="loading.recentGames" class="fas fa-cog fa-spin"></i>
                </button>
              </div>
            </div>
            <br>
            <br>
          </div>

          <!--      recentGamesByUser-->
          <div v-if="selectedButton === 'recentGamesByUser'">
            <div class="flex flex-wrap">
              <div class="w-1/2 pr-2">
                <small>User address</small>
                <input class="w-full border border-yellow bg-transparent px-4 h-12" v-model="input.userAddress"
                       type="text">
              </div>
              <div class="w-1/2 pl-2">
                <small>Number of games</small>
                <input class="w-full border border-yellow bg-transparent px-4 h-12" v-model="input.numberOfGames"
                       type="number">
              </div>
              <div class="w-full mt-4">
                <button type="button"
                        class="w-full rounded-none border border-yellow bg-transparent hover:bg-yellow hover:text-brown px-4 py-2 h-12"
                        @click="recentGamesByUser(input.userAddress, input.numberOfGames)">
                  Fetch games <i v-if="loading.recentGamesByUser" class="fas fa-cog fa-spin"></i>
                </button>
              </div>
            </div>
            <br>
            <br>
          </div>

          <!--      coinFlipperByGameId-->
          <div v-if="selectedButton === 'coinFlipperByGameId'">
            <small>Game ID</small>
            <div class="flex flex-wrap">
              <div class="w-1/2 pr-2">
                <input class="w-full border border-yellow bg-transparent px-4 h-12" v-model="input.gameId"
                       type="number">
              </div>
              <div class="w-1/2 pl-2">
                <button type="button"
                        class="w-full rounded-none border border-yellow bg-transparent hover:bg-yellow hover:text-brown px-4 py-2 h-12"
                        @click="coinFlipperByGameId(input.gameId)">
                  Fetch flipper <i v-if="loading.coinFlipperByGameId" class="fas fa-cog fa-spin"></i>
                </button>
              </div>
            </div>

            <div v-if="fetchedData.coinFlipperByGameId && fetchedData.coinFlipperByGameId !== ''" class="mt-8">
              <p>
                Flipper of coin: <br>
                {{ fetchedData.coinFlipperByGameId }}
              </p>
            </div>
          </div>

          <!--      gameById-->
          <div v-if="selectedButton === 'gameById'">
            <small>Game ID</small>
            <div class="flex flex-wrap">
              <div class="w-1/2 pr-2">
                <input class="w-full border border-yellow bg-transparent px-4 h-12" v-model="input.gameId"
                       type="number">
              </div>
              <div class="w-1/2 pl-2">
                <button type="button"
                        class="w-full rounded-none border border-yellow bg-transparent hover:bg-yellow hover:text-brown px-4 py-2 h-12"
                        @click="gameById(input.gameId)">
                  Fetch game <i v-if="loading.gameById" class="fas fa-cog fa-spin"></i>
                </button>
              </div>
            </div>
            <br>
            <br>
          </div>

          <!--      gameByName-->
          <div v-if="selectedButton === 'gameByName'">
            <small>Game name</small>
            <div class="flex flex-wrap">
              <div class="w-1/2 pr-2">
                <input class="w-full border border-yellow bg-transparent px-4 h-12" v-model="input.gameName"
                       type="text">
              </div>
              <div class="w-1/2 pl-2">
                <button type="button"
                        class="w-full rounded-none border border-yellow bg-transparent hover:bg-yellow hover:text-brown px-4 py-2 h-12"
                        @click="gameByName(input.gameName)">
                  Fetch game <i v-if="loading.gameName" class="fas fa-cog fa-spin"></i>
                </button>
              </div>
            </div>
            <br>
            <br>
          </div>

        </div>
      </div>

      <div v-if="openWindow === 'casino-large'">
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
import CoinFlip from "../../../plugins/artifacts/coinflip.json";

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
      defaultView: 'default',
      shownGames: [],
      passwords: [],
      preApprove: false,
      mainContract: {},
      coinFlipContract: {},
      amountToApprove: 0,
      fetchedData: {},
      manuallyFetchedRecentGames: [],
      selectedButton: 'createGame',
      error: '',
      createGame: {
        name: '',
        password: '',
        confirmPassword: '',
        amount: 0
      },
      input: {
        playerId: 0,
        gameId: 0,
        gameName: '',
        userAddress: '',
        numberOfGames: 0
      },
      loading: {
        playerByPlayerIdAndGameId: false,
        betsByGameId: false,
        recentGames: false,
        recentGamesByUser: false,
        coinFlipperByGameId: false,
        gameById: false,
        gameByName: false,
        lastGameId: false,
        joiningGame: false,
        flipping: false,
        creatingGame: false
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
      this.coinFlipContract = new ethers.Contract(CoinFlip.address, CoinFlip.abi, this.metaMaskWallet.signer)
    }
  },
  methods: {
    ...mapActions([
      'setFavourite'
    ]),
    async fetchData() {
      const fetchedData = await Promise.all([
        this.coinFlipContract.lastGameId(),
        this.coinFlipContract.recentGames(100)
      ])

      let lastGameId = fetchedData[0]._isBigNumber ? ethers.BigNumber.from(fetchedData[0]).toString() : fetchedData[0]
      let recentGames = []

      for (const game of fetchedData[1]) {
        let gameWithInfo = {}

        gameWithInfo.id = game[6]._isBigNumber ? ethers.BigNumber.from(game[6]).toString() : game[6]
        gameWithInfo.name = game[0]
        gameWithInfo.p1 = game[1]
        gameWithInfo.p2 = game[2]
        gameWithInfo.flipper = game[3]
        gameWithInfo.winner = game[4]
        gameWithInfo.betAmount = ethers.utils.formatEther(game[5]._isBigNumber ? ethers.BigNumber.from(game[5]).toString() : game[5])
        gameWithInfo.ended = game[8]
        gameWithInfo.passwordProtected = game[7] !== '0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470'

        recentGames.push(gameWithInfo)
      }

      this.fetchedData.lastGameId = lastGameId
      this.fetchedData.recentGames = recentGames

      if (this.defaultView === 'default') {
        this.shownGames = recentGames
      }
    },

    // CALL DATA
    async playerByPlayerIdAndGameId(player, id) {
      this.loading.playerByPlayerIdAndGameId = true
      this.fetchedData.playerByPlayerIdAndGameId = await this.coinFlipContract.playerByPlayerIdAndGameId(player, id)
      this.loading.playerByPlayerIdAndGameId = false
    },
    async betsByGameId(id) {
      this.loading.betsByGameId = true
      const betAmount = await this.coinFlipContract.betsByGameId(id)
      this.fetchedData.betsByGameId = ethers.utils.formatEther(betAmount._isBigNumber ? ethers.BigNumber.from(betAmount).toString() : betAmount)
      this.loading.betsByGameId = false
    },
    async recentGames(amount) {
      this.defaultView = 'custom'
      this.loading.recentGames = true
      const fetchedData = await this.coinFlipContract.recentGames(amount)

      this.manuallyFetchedRecentGames = []
      this.shownGames = []

      for (const game of fetchedData) {
        let gameWithInfo = {}

        gameWithInfo.id = game[6]._isBigNumber ? ethers.BigNumber.from(game[6]).toString() : game[6]
        gameWithInfo.name = game[0]
        gameWithInfo.p1 = game[1]
        gameWithInfo.p2 = game[2]
        gameWithInfo.flipper = game[3]
        gameWithInfo.winner = game[4]
        gameWithInfo.betAmount = ethers.utils.formatEther(game[5]._isBigNumber ? ethers.BigNumber.from(game[5]).toString() : game[5])
        gameWithInfo.ended = game[8]
        gameWithInfo.passwordProtected = game[7] !== '0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470'

        this.manuallyFetchedRecentGames.push(gameWithInfo)
      }

      this.shownGames = this.manuallyFetchedRecentGames
      this.loading.recentGames = false
    },
    async recentGamesByUser(address, amount) {
      this.defaultView = 'custom'
      this.loading.recentGamesByUser = true
      const fetchedData = await this.coinFlipContract.recentGamesByUser(address, amount)

      this.manuallyFetchedRecentGames = []
      this.shownGames = []

      for (const game of fetchedData) {
        let gameWithInfo = {}

        gameWithInfo.id = game[6]._isBigNumber ? ethers.BigNumber.from(game[6]).toString() : game[6]
        gameWithInfo.name = game[0]
        gameWithInfo.p1 = game[1]
        gameWithInfo.p2 = game[2]
        gameWithInfo.flipper = game[3]
        gameWithInfo.winner = game[4]
        gameWithInfo.betAmount = ethers.utils.formatEther(game[5]._isBigNumber ? ethers.BigNumber.from(game[5]).toString() : game[5])
        gameWithInfo.ended = game[8]
        gameWithInfo.passwordProtected = game[7] !== '0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470'

        this.manuallyFetchedRecentGames.push(gameWithInfo)
      }
      this.shownGames = this.manuallyFetchedRecentGames

      if (address === this.metaMaskAccount) {
        this.defaultView = 'yourGames'
      }

      this.loading.recentGamesByUser = false
    },
    async coinFlipperByGameId(id) {
      this.loading.coinFlipperByGameId = true
      this.fetchedData.coinFlipperByGameId = await this.coinFlipContract.coinFlipperByGameId(id)
      this.loading.coinFlipperByGameId = false
    },
    async gameById(id) {
      this.defaultView = 'custom'
      this.loading.gameById = true
      const game = await this.coinFlipContract.gamesById(id)

      let gameWithInfo = {}
      this.shownGames = []

      gameWithInfo.id = game[6]._isBigNumber ? ethers.BigNumber.from(game[6]).toString() : game[6]
      gameWithInfo.name = game[0]
      gameWithInfo.p1 = game[1]
      gameWithInfo.p2 = game[2]
      gameWithInfo.flipper = game[3]
      gameWithInfo.winner = game[4]
      gameWithInfo.betAmount = ethers.utils.formatEther(game[5]._isBigNumber ? ethers.BigNumber.from(game[5]).toString() : game[5])
      gameWithInfo.ended = game[8]
      gameWithInfo.passwordProtected = game[7] !== '0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470'

      this.fetchedData.gameById = gameWithInfo
      this.shownGames.push(gameWithInfo)

      this.loading.gameById = false
    },
    async gameByName(name) {
      this.defaultView = 'custom'
      this.loading.gameByName = true
      const game = await this.coinFlipContract.gamesByName(name)

      let gameWithInfo = {}
      this.shownGames = []

      gameWithInfo.id = game[6]._isBigNumber ? ethers.BigNumber.from(game[6]).toString() : game[6]
      gameWithInfo.name = game[0]
      gameWithInfo.p1 = game[1]
      gameWithInfo.p2 = game[2]
      gameWithInfo.flipper = game[3]
      gameWithInfo.winner = game[4]
      gameWithInfo.betAmount = ethers.utils.formatEther(game[5]._isBigNumber ? ethers.BigNumber.from(game[5]).toString() : game[5])
      gameWithInfo.ended = game[8]
      gameWithInfo.passwordProtected = game[7] !== '0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470'

      this.fetchedData.gameByName = gameWithInfo
      this.shownGames.push(gameWithInfo)

      this.loading.gameByName = false
    },

    // SEND DATA
    async cancelGame(id) {
      this.loading.cancellingGame = true

      try {
        const tx = await this.coinFlipContract.cancelGame(id)
        tx.wait(1)

        this.loading.cancellingGame = false
      } catch (err) {
        if (err.code !== 4001) {
          this.error = err
        }

        this.loading.cancellingGame = false
        console.error(err)
      }
    },
    async createGameRoom(name, password, amount) {
      this.loading.creatingGame = true

      if (this.createGame.confirmPassword === password) {
        try {
          const tx = await this.coinFlipContract.createGameRoom(name, password ? password : '', ethers.utils.parseEther(amount))
          tx.wait(1)

          this.loading.creatingGame = false
          this.createGame = {
            name: '',
            password: '',
            confirmPassword: '',
            amount: 0
          }

        } catch (err) {
          if (err.code !== 4001) {
            this.error = err
          }

          this.loading.creatingGame = false
          console.error(err)
        }
      } else {
        this.error = 'Passwords are not the same'
      }
    },
    async joinGame(id, password, amount, flipper) {
      this.loading.joiningGame = id

      console.log(id, password, ethers.utils.parseEther(amount), flipper)

      try {
        const tx = await this.coinFlipContract.joinGame(id, password ? password : '', ethers.utils.parseEther(amount), flipper)

        tx.wait(1)

        this.loading.joiningGame = false
      } catch (err) {
        if (err.code !== 4001) {
          this.error = err
        }

        this.loading.joiningGame = false
        console.error(err)
      }
    },
    async startGame(id, password, side) {
      this.loading.flipping = id

      console.log(id, password, side)

      try {
        const tx = await this.coinFlipContract.startGame(id, password ? password : '', side)

        tx.wait(1)

        this.loading.flipping = false
      } catch (err) {
        if (err.code !== 4001) {
          this.error = err
        }

        this.loading.joiningGame = false
        console.error(err)
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
        const tx = await this.mainContract.approve(CoinFlip.address, arg)

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