<template>
  <transition name="slide">
    <div class="slide-in shadow-xl" v-if="openWindow === 'casino' || openWindow.startsWith('casino-large')"
         :style="openWindow.startsWith('casino-large') ? 'max-width: 100%;' : 'max-width: 30vw;'"
         style="background: url('/images/ui/screen-bg.png') repeat-y; top: 64px; background-size: contain; overflow-y: scroll;">
      <div class="flex relative cursor-pointer" @click="setFavourite('casino')">
        <img class="mx-auto" src="/images/ui/window-banner.png" alt="Banner">
        <div class="absolute text-center w-full" style="top: 75px">
          <p class="text-2xl">The Luderion Alleyway</p>
        </div>
      </div>

      <div class="text-center mt-4">
        <p @click="openWindow === 'casino-large-roulette' ? $store.dispatch('setOpenWindow', 'casino') : $store.dispatch('setOpenWindow', 'casino-large-roulette')" class="m-auto cursor-pointer">
          {{ openWindow === 'casino-large-roulette' ? 'Leave' : 'Enter roulette lobby' }}
        </p>
        <p @click="openWindow === 'casino-large-coinflip' ? $store.dispatch('setOpenWindow', 'casino') : $store.dispatch('setOpenWindow', 'casino-large-coinflip')" class="m-auto cursor-pointer">
          {{ openWindow === 'casino-large-coinflip' ? 'Leave' : 'Enter coin flip lobby' }}
        </p>
      </div>
      <br>

      <div class="flex flex-wrap" v-if="openWindow === 'casino-large-roulette'">
        <div class="w-full flex">
          <div class="w-1/2 px-8 mx-auto">
            <!--      setAllowance-->
            <div class="flex flex-wrap">
              <small class="w-full text-center">
                Current allowance: {{ allowance.roulette }} XYA
              </small>
              <div class="w-1/3 px-2">
                <input class="w-full border border-yellow bg-transparent px-4 h-12" v-model="rouletteAmountToApprove"
                       type="number">
              </div>

              <div class="w-1/3 px-2">
                <button type="button"
                        class="w-full rounded-none border border-yellow bg-transparent hover:bg-yellow hover:text-brown px-4 py-2 h-12"
                        @click="addRouletteAllowance()">
                  Set allowance <i v-if="rouletteLoading.allowance" class="fas fa-cog fa-spin"></i>
                </button>
              </div>

              <div class="w-1/3 px-2">
                <button type="button"
                        class="rounded-none border border-yellow bg-transparent hover:bg-yellow hover:text-brown px-4 py-2 h-12"
                        @click="addRouletteAllowance(999999999999.9999)">
                  Set max allowance <i v-if="rouletteLoading.maxAllowance" class="fas fa-cog fa-spin"></i>
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
                  class="w-full rounded-none border border-yellow bg-transparent hover:bg-yellow hover:text-brown px-4 py-2 h-12 mb-4">
            New kids table ( Disabled )
          </button>

          <!--      mediumTable-->
          <button type="button"
                  :class="rouletteDefaultView === 'medium' ? 'bg-yellow text-brown' : 'bg-transparent text-yellow'"
                  class="w-full rounded-none border border-yellow bg-transparent hover:bg-yellow hover:text-brown px-4 py-2 h-12 mb-4"
                  @click="rouletteDefaultView = 'medium'">
            Regular table ( 100 - 1000 )
          </button>

          <!--      highTable-->
          <button type="button"
                  :class="rouletteDefaultView === 'high' ? 'bg-yellow text-brown' : 'bg-transparent text-yellow'"
                  class="w-full rounded-none border border-yellow bg-transparent hover:bg-yellow hover:text-brown px-4 py-2 h-12 mb-4">
            High stakes table ( Disabled )
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
                        :class="rouletteBetAmount === 100 ? 'bg-yellow text-brown' : 'bg-transparent text-yellow'"
                        class="rounded-none border border-yellow hover:bg-yellow hover:text-brown px-4 py-2 h-12"
                        @click="rouletteBetAmount = 100">
                  100 XYA
                </button>
              </div>
              <div class="w-1/5">
                <button type="button"
                        :class="rouletteBetAmount === 200 ? 'bg-yellow text-brown' : 'bg-transparent text-yellow'"
                        class="rounded-none border border-yellow bg-transparent hover:bg-yellow hover:text-brown px-4 py-2 h-12"
                        @click="rouletteBetAmount = 200">
                  200 XYA
                </button>
              </div>
              <div class="w-1/5">
                <button type="button"
                        :class="rouletteBetAmount === 500 ? 'bg-yellow text-brown' : 'bg-transparent text-yellow'"
                        class="rounded-none border border-yellow bg-transparent hover:bg-yellow hover:text-brown px-4 py-2 h-12"
                        @click="rouletteBetAmount = 500">
                  500 XYA
                </button>
              </div>
              <div class="w-1/5">
                <button type="button"
                        :class="rouletteBetAmount === 750 ? 'bg-yellow text-brown' : 'bg-transparent text-yellow'"
                        class="rounded-none border border-yellow bg-transparent hover:bg-yellow hover:text-brown px-4 py-2 h-12"
                        @click="rouletteBetAmount = 750">
                  750 XYA
                </button>
              </div>
              <div class="w-1/5">
                <button type="button"
                        :class="rouletteBetAmount === 1000 ? 'bg-yellow text-brown' : 'bg-transparent text-yellow'"
                        class="rounded-none border border-yellow bg-transparent hover:bg-yellow hover:text-brown px-4 py-2 h-12"
                        @click="rouletteBetAmount = 1000">
                  1000 XYA
                </button>
              </div>
            </div>
          </div>

          <div class="flex flex-wrap">
            <div class="w-full flex text-xl mt-7 mb-4">
              <div class="w-1/4">
                Round number: {{ rouletteFetchedData.roundNumber }}
              </div>
              <div class="w-1/4">
                Time left: {{ rouletteFetchedData.timeLeft < '0' ? '0' : rouletteFetchedData.timeLeft }}
              </div>
              <div class="w-1/4">
                Last colour: {{ rouletteFetchedData.lastSpace.colour }}
              </div>
              <div class="w-1/4">
                Last number: {{ rouletteFetchedData.lastSpace.number }}
              </div>
            </div>
            <div class="w-1/12 flex flex-wrap">
              <div @click="rouletteSelectedItem = space.number" v-for="space in rouletteFetchedData.returnWheel.slice(0, 1)"
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
              <div @click="rouletteSelectedItem = space.number" v-for="space in rouletteFetchedData.returnWheel.slice(1, 15)"
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
                  <p class="m-auto text-black">
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
                       :class="`text-${rouletteSelectedItem === 'odds' ? 'black' : 'yellow'} bg-${rouletteSelectedItem === 'odds' ? 'white' : 'black'}`">
                    <p class="m-auto">
                      Odds
                    </p>
                  </div>
                </div>
                <div @click="rouletteSelectedItem = 'evens'" class="w-full p-1">
                  <div class="h-full flex cursor-pointer"
                       :class="`text-${rouletteSelectedItem === 'evens' ? 'black' : 'yellow'} bg-${rouletteSelectedItem === 'evens' ? 'white' : 'black'}`">
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
                class="w-full rounded-none border border-yellow bg-transparent hover:bg-yellow hover:text-brown px-4 py-2 h-12 mb-4 mt-4 mx-1"
                @click="makeOutsideBet(rouletteSelectedItem, rouletteBetAmount)">
              Place your bet!
            </button>
            <button v-else type="button"
                    class="w-full rounded-none border border-yellow bg-transparent hover:bg-yellow hover:text-brown px-4 py-2 h-12 mb-4 mt-4 mx-1"
                    @click="makeStraightBet(rouletteSelectedItem, rouletteBetAmount)">
              Place your bet!
            </button>
          </div>
        </div>
      </div>
      <div class="flex flex-wrap" v-if="openWindow === 'casino-large-coinflip'">
        <div class="w-1/4 mt-20 mb-6">
          <h3 class="text-4xl mb-8">
            Menu
          </h3>

          <!--      lobby-->
          <button type="button"
                  :class="coinFlipDefaultView === 'default' ? 'bg-yellow text-brown' : 'bg-transparent text-yellow'"
                  class="w-full rounded-none border border-yellow bg-transparent hover:bg-yellow hover:text-brown px-4 py-2 h-12 mb-4"
                  @click="coinFlipDefaultView = 'default'">
            Lobby
          </button>

          <!--      yourGames-->
          <button type="button"
                  :class="coinFlipDefaultView === 'yourGames' ? 'bg-yellow text-brown' : 'bg-transparent text-yellow'"
                  class="w-full rounded-none border border-yellow bg-transparent hover:bg-yellow hover:text-brown px-4 py-2 h-12 mb-4"
                  @click="recentGamesByUser(metaMaskAccount, 25)">
            Your games
          </button>

          <br>
          <br>
          <br>

          <!--      coinFlipCreateGame-->
          <button type="button"
                  :class="coinFlipSelectedButton === 'createGame' ? 'bg-yellow text-brown' : 'bg-transparent text-yellow'"
                  class="w-full rounded-none border border-yellow bg-transparent hover:bg-yellow hover:text-brown px-4 py-2 h-12 mb-4"
                  @click="coinFlipSelectedButton = 'createGame'">
            Create new game
          </button>

          <!--      gameById-->
          <button type="button"
                  :class="coinFlipSelectedButton === 'gameById' ? 'bg-yellow text-brown' : 'bg-transparent text-yellow'"
                  class="w-full rounded-none border border-yellow bg-transparent hover:bg-yellow hover:text-brown px-4 py-2 h-12 mb-4"
                  @click="coinFlipSelectedButton = 'gameById'">
            Look up game by ID
          </button>

          <!--      gameByName-->
          <button type="button"
                  :class="coinFlipSelectedButton === 'gameByName' ? 'bg-yellow text-brown' : 'bg-transparent text-yellow'"
                  class="w-full rounded-none border border-yellow bg-transparent hover:bg-yellow hover:text-brown px-4 py-2 h-12 mb-4"
                  @click="coinFlipSelectedButton = 'gameByName'">
            Look up game by name
          </button>

          <!--      recentGames-->
          <button type="button"
                  :class="coinFlipSelectedButton === 'recentGames' ? 'bg-yellow text-brown' : 'bg-transparent text-yellow'"
                  class="w-full rounded-none border border-yellow bg-transparent hover:bg-yellow hover:text-brown px-4 py-2 h-12 mb-4"
                  @click="coinFlipSelectedButton = 'recentGames'">
            Look up recent games
          </button>

          <!--      recentGamesByUser-->
          <button type="button"
                  :class="coinFlipSelectedButton === 'recentGamesByUser' ? 'bg-yellow text-brown' : 'bg-transparent text-yellow'"
                  class="w-full rounded-none border border-yellow bg-transparent hover:bg-yellow hover:text-brown px-4 py-2 h-12 mb-4"
                  @click="coinFlipSelectedButton = 'recentGamesByUser'">
            Look up recent games by user
          </button>

          <!--      playerByPlayerIdAndGameId-->
          <button type="button"
                  :class="coinFlipSelectedButton === 'playerByPlayerIdAndGameId' ? 'bg-yellow text-brown' : 'bg-transparent text-yellow'"
                  class="w-full rounded-none border border-yellow bg-transparent hover:bg-yellow hover:text-brown px-4 py-2 h-12 mb-4"
                  @click="coinFlipSelectedButton = 'playerByPlayerIdAndGameId'">
            Look up player by game
          </button>

          <!--      betsByGameId-->
          <button type="button"
                  :class="coinFlipSelectedButton === 'betsByGameId' ? 'bg-yellow text-brown' : 'bg-transparent text-yellow'"
                  class="w-full rounded-none border border-yellow bg-transparent hover:bg-yellow hover:text-brown px-4 py-2 h-12 mb-4"
                  @click="coinFlipSelectedButton = 'betsByGameId'">
            Look up bet by game ID
          </button>

          <!--      coinFlipperByGameId-->
          <button type="button"
                  :class="coinFlipSelectedButton === 'coinFlipperByGameId' ? 'bg-yellow text-brown' : 'bg-transparent text-yellow'"
                  class="w-full rounded-none border border-yellow bg-transparent hover:bg-yellow hover:text-brown px-4 py-2 h-12 mb-4"
                  @click="coinFlipSelectedButton = 'coinFlipperByGameId'">
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
              <input class="w-full border border-yellow bg-transparent px-4 h-12" v-model="coinFlipAmountToApprove"
                     type="number">
            </div>

            <div class="w-1/3 px-2">
              <button type="button"
                      class="w-full rounded-none border border-yellow bg-transparent hover:bg-yellow hover:text-brown px-4 py-2 h-12"
                      @click="addCoinFlipAllowance()">
                Set allowance <i v-if="coinFlipLoading.allowance" class="fas fa-cog fa-spin"></i>
              </button>
            </div>

            <div class="w-1/3 px-2">
              <button type="button"
                      class="rounded-none border border-yellow bg-transparent hover:bg-yellow hover:text-brown px-4 py-2 h-12"
                      @click="addCoinFlipAllowance(999999999999.9999)">
                Set max allowance <i v-if="coinFlipLoading.maxAllowance" class="fas fa-cog fa-spin"></i>
              </button>
            </div>
          </div>

          <!--      Game lobby-->
          <div class="mt-8">
            <div class="flex">
              <div class="w-1/3"></div>
              <div class="w-1/3">
                <h3 class="text-4xl text-center">
                  {{
                    coinFlipDefaultView === 'default' ? 'Lobby' : coinFlipDefaultView === 'yourGames' ? 'Your games' : 'Custom search'
                  }}
                </h3>
              </div>
              <div class="w-1/3 text-right my-auto">
                <span @click="coinFlipShowEndedGames = !coinFlipShowEndedGames" class="cursor-pointer">
                  {{ coinFlipShowEndedGames ? 'Hide' : 'Show' }} finished games
                </span>
              </div>
            </div>

            <div class="mt-4">
              <div class="pb-8" v-if="!game.ended && game.betAmount > 0" v-for="game in coinFlipShownGames">
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
                    <div>
                      Status: <br>
                      {{
                        (game.p2 === '0x0000000000000000000000000000000000000000' && game.p1 === metaMaskAccount) ? 'Searching for opponent' : 'In progress'
                      }} <span v-if="game.passwordProtected && game.p1 !== metaMaskAccount">(Locked game <i
                        class="fas fa-lock"></i>)</span>
                      <br><br>

                      <div v-if="game.passwordProtected && game.p1 !== metaMaskAccount" class="mb-2">
                        <input
                            class="w-full border border-yellow bg-transparent px-4 h-12" v-model="coinFlipPasswords[game.id]"
                            placeholder="password"
                            type="password"
                        >
                      </div>

                      <div
                          v-if="game.p2 === '0x0000000000000000000000000000000000000000' && game.p1 !== metaMaskAccount">
                        <button type="button"
                                @click="joinGame(game.id, coinFlipPasswords[game.id], game.betAmount, 2)"
                                class="w-full rounded-none border border-yellow bg-transparent hover:bg-yellow hover:text-brown px-4 py-2 h-12 mb-4">
                          Challenge <i v-if="coinFlipLoading.joiningGame === game.id" class="fas fa-cog fa-spin"></i>
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
                            class="flex"
                            v-if="game.p2 !== '0x0000000000000000000000000000000000000000' && game.flipper === metaMaskAccount">
                          <button type="button"
                                  @click="startGame(game.id, coinFlipPasswords[game.id], 1)"
                                  class="w-2/5 rounded-none border border-yellow bg-transparent hover:bg-yellow hover:text-brown px-4 py-2 h-12">
                            Heads!
                          </button>
                          <div class="w-1/5 my-auto text-center">
                            <i v-if="coinFlipLoading.flipping === game.id" class="fas fa-cog fa-spin"></i>
                          </div>
                          <button type="button"
                                  @click="startGame(game.id, coinFlipPasswords[game.id], 2)"
                                  class="w-2/5 ml-auto rounded-none border border-yellow bg-transparent hover:bg-yellow hover:text-brown px-4 py-2 h-12">
                            Tails!
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

                  <div v-if="game.p1 === metaMaskAccount || game.p2 === metaMaskAccount"
                       class="w-auto absolute top-0 right-0 p-4">
                    <i @click="cancelGame(game.id)" class="fas fa-times cursor-pointer"></i>
                  </div>
                </div>
              </div>
              <div class="pb-8" v-if="coinFlipShowEndedGames && game.ended && game.betAmount > 0" v-for="game in coinFlipShownGames">
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
                    <div>
                      Status: <br>
                      Ended
                      <br><br>
                      Winner: <br>
                      <span style="line-break: anywhere">{{ game.winner }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
        <div class="w-1/4 mt-20">
          <h3 class="text-4xl mb-2">
            {{ coinFlipSelectedButton === 'createGame' ? 'Create' : 'Look up' }}
          </h3>

          <!--      coinFlipCreateGame-->
          <div v-if="coinFlipSelectedButton === 'createGame'">
            <div class="flex flex-wrap">
              <div class="w-full">
                <small>Name of room</small>
                <input class="w-full border border-yellow bg-transparent px-4 h-12" v-model="coinFlipCreateGame.name"
                       type="text">
              </div>
              <div class="w-full">
                <small>Room password</small>
                <input class="w-full border border-yellow bg-transparent px-4 h-12" v-model="coinFlipCreateGame.password"
                       type="password">
              </div>
              <div class="w-full">
                <small>Confirm room password</small>
                <input class="w-full border border-yellow bg-transparent px-4 h-12" v-model="coinFlipCreateGame.confirmPassword"
                       type="password">
              </div>
              <div class="w-full">
                <small>Amount to bet with</small>
                <input class="w-full border border-yellow bg-transparent px-4 h-12" v-model="coinFlipCreateGame.amount"
                       type="number">
              </div>
              <div class="w-full mt-4">
                <button type="button"
                        class="w-full rounded-none border border-yellow bg-transparent hover:bg-yellow hover:text-brown px-4 py-2 h-12"
                        @click="createGameRoom(coinFlipCreateGame.name, coinFlipCreateGame.password, coinFlipCreateGame.amount)">
                  Create game! <i v-if="coinFlipLoading.creatingGame" class="fas fa-cog fa-spin"></i>
                </button>
              </div>

              <div
                  v-if="coinFlipFetchedData.playerByPlayerIdAndGameId && coinFlipFetchedData.playerByPlayerIdAndGameId !== ''"
                  class="mt-8">
                <p>
                  Player address: <br>
                  {{ coinFlipFetchedData.playerByPlayerIdAndGameId }}
                </p>
              </div>
            </div>
          </div>

          <!--      playerByPlayerIdAndGameId-->
          <div v-if="coinFlipSelectedButton === 'playerByPlayerIdAndGameId'">
            <div class="flex flex-wrap">
              <div class="w-1/2 pr-2">
                <small>Player 1 or 2</small>
                <input class="w-full border border-yellow bg-transparent px-4 h-12" v-model="coinFlipInput.playerId"
                       type="number">
              </div>
              <div class="w-1/2 pl-2">
                <small>Game ID</small>
                <input class="w-full border border-yellow bg-transparent px-4 h-12" v-model="coinFlipInput.gameId"
                       type="number">
              </div>
              <div class="w-full mt-4">
                <button type="button"
                        class="w-full rounded-none border border-yellow bg-transparent hover:bg-yellow hover:text-brown px-4 py-2 h-12"
                        @click="playerByPlayerIdAndGameId(coinFlipInput.playerId, coinFlipInput.gameId)">
                  Fetch player <i v-if="coinFlipLoading.playerByPlayerIdAndGameId" class="fas fa-cog fa-spin"></i>
                </button>
              </div>

              <div
                  v-if="coinFlipFetchedData.playerByPlayerIdAndGameId && coinFlipFetchedData.playerByPlayerIdAndGameId !== ''"
                  class="mt-8">
                <p>
                  Player address: <br>
                  {{ coinFlipFetchedData.playerByPlayerIdAndGameId }}
                </p>
              </div>
            </div>
          </div>

          <!--      betsByGameId-->
          <div v-if="coinFlipSelectedButton === 'betsByGameId'">
            <small>Game ID</small>
            <div class="flex flex-wrap">
              <div class="w-1/2 pr-2">
                <input class="w-full border border-yellow bg-transparent px-4 h-12" v-model="coinFlipInput.gameId"
                       type="number">
              </div>
              <div class="w-1/2 pl-2">
                <button type="button"
                        class="w-full rounded-none border border-yellow bg-transparent hover:bg-yellow hover:text-brown px-4 py-2 h-12"
                        @click="betsByGameId(coinFlipInput.gameId)">
                  Fetch bets <i v-if="coinFlipLoading.betsByGameId" class="fas fa-cog fa-spin"></i>
                </button>
              </div>
            </div>

            <div v-if="coinFlipFetchedData.betsByGameId && coinFlipFetchedData.betsByGameId !== ''" class="mt-8">
              <p>
                Bet amount: <br>
                {{ coinFlipFetchedData.betsByGameId }} XYA
              </p>
            </div>
          </div>

          <!--      recentGames-->
          <div v-if="coinFlipSelectedButton === 'recentGames'">
            <small>Number of games</small>
            <div class="flex flex-wrap">
              <div class="w-1/2 pr-2">
                <input class="w-full border border-yellow bg-transparent px-4 h-12" v-model="coinFlipInput.numberOfGames"
                       type="number">
              </div>
              <div class="w-1/2 pl-2">
                <button type="button"
                        class="w-full rounded-none border border-yellow bg-transparent hover:bg-yellow hover:text-brown px-4 py-2 h-12"
                        @click="recentGames(coinFlipInput.numberOfGames)">
                  Fetch games <i v-if="coinFlipLoading.recentGames" class="fas fa-cog fa-spin"></i>
                </button>
              </div>
            </div>
            <br>
            <br>
          </div>

          <!--      recentGamesByUser-->
          <div v-if="coinFlipSelectedButton === 'recentGamesByUser'">
            <div class="flex flex-wrap">
              <div class="w-1/2 pr-2">
                <small>User address</small>
                <input class="w-full border border-yellow bg-transparent px-4 h-12" v-model="coinFlipInput.userAddress"
                       type="text">
              </div>
              <div class="w-1/2 pl-2">
                <small>Number of games</small>
                <input class="w-full border border-yellow bg-transparent px-4 h-12" v-model="coinFlipInput.numberOfGames"
                       type="number">
              </div>
              <div class="w-full mt-4">
                <button type="button"
                        class="w-full rounded-none border border-yellow bg-transparent hover:bg-yellow hover:text-brown px-4 py-2 h-12"
                        @click="recentGamesByUser(coinFlipInput.userAddress, coinFlipInput.numberOfGames)">
                  Fetch games <i v-if="coinFlipLoading.recentGamesByUser" class="fas fa-cog fa-spin"></i>
                </button>
              </div>
            </div>
            <br>
            <br>
          </div>

          <!--      coinFlipperByGameId-->
          <div v-if="coinFlipSelectedButton === 'coinFlipperByGameId'">
            <small>Game ID</small>
            <div class="flex flex-wrap">
              <div class="w-1/2 pr-2">
                <input class="w-full border border-yellow bg-transparent px-4 h-12" v-model="coinFlipInput.gameId"
                       type="number">
              </div>
              <div class="w-1/2 pl-2">
                <button type="button"
                        class="w-full rounded-none border border-yellow bg-transparent hover:bg-yellow hover:text-brown px-4 py-2 h-12"
                        @click="coinFlipperByGameId(coinFlipInput.gameId)">
                  Fetch flipper <i v-if="coinFlipLoading.coinFlipperByGameId" class="fas fa-cog fa-spin"></i>
                </button>
              </div>
            </div>

            <div v-if="coinFlipFetchedData.coinFlipperByGameId && coinFlipFetchedData.coinFlipperByGameId !== ''"
                 class="mt-8">
              <p>
                Flipper of coin: <br>
                {{ coinFlipFetchedData.coinFlipperByGameId }}
              </p>
            </div>
          </div>

          <!--      gameById-->
          <div v-if="coinFlipSelectedButton === 'gameById'">
            <small>Game ID</small>
            <div class="flex flex-wrap">
              <div class="w-1/2 pr-2">
                <input class="w-full border border-yellow bg-transparent px-4 h-12" v-model="coinFlipInput.gameId"
                       type="number">
              </div>
              <div class="w-1/2 pl-2">
                <button type="button"
                        class="w-full rounded-none border border-yellow bg-transparent hover:bg-yellow hover:text-brown px-4 py-2 h-12"
                        @click="gameById(coinFlipInput.gameId)">
                  Fetch game <i v-if="coinFlipLoading.gameById" class="fas fa-cog fa-spin"></i>
                </button>
              </div>
            </div>
            <br>
            <br>
          </div>

          <!--      gameByName-->
          <div v-if="coinFlipSelectedButton === 'gameByName'">
            <small>Game name</small>
            <div class="flex flex-wrap">
              <div class="w-1/2 pr-2">
                <input class="w-full border border-yellow bg-transparent px-4 h-12" v-model="coinFlipInput.gameName"
                       type="text">
              </div>
              <div class="w-1/2 pl-2">
                <button type="button"
                        class="w-full rounded-none border border-yellow bg-transparent hover:bg-yellow hover:text-brown px-4 py-2 h-12"
                        @click="gameByName(coinFlipInput.gameName)">
                  Fetch game <i v-if="coinFlipLoading.gameName" class="fas fa-cog fa-spin"></i>
                </button>
              </div>
            </div>
            <br>
            <br>
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
      mainContract: {},
      rouletteContract: {},
      coinFlipContract: {},

      rouletteBetAmount: 100,
      rouletteSelectedItem: 0,
      rouletteDefaultView: 'medium',
      rouletteAmountToApprove: 0,
      rouletteFetchedData: {},
      rouletteLoading: {
        betting: false
      },

      coinFlipShowEndedGames: false,
      coinFlipDefaultView: 'default',
      coinFlipShownGames: [],
      coinFlipPasswords: [],
      coinFlipAmountToApprove: 0,
      coinFlipFetchedData: {},
      coinFlipManuallyFetchedRecentGames: [],
      coinFlipSelectedButton: 'createGame',
      coinFlipError: '',
      coinFlipCreateGame: {
        name: '',
        password: '',
        confirmPassword: '',
        amount: 0
      },
      coinFlipInput: {
        playerId: 0,
        gameId: 0,
        gameName: '',
        userAddress: '',
        numberOfGames: 0
      },
      coinFlipLoading: {
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
      this.fetchCoinFlipData()
      this.fetchRouletteData()
    }, 1000)
  },
  watch: {
    async metaMaskWallet() {
      this.mainContract = new ethers.Contract(Freyala.address, Freyala.abi, this.metaMaskWallet.signer)
      this.rouletteContract = new ethers.Contract(Roulette.address, Roulette.abi, this.metaMaskWallet.signer)
      this.coinFlipContract = new ethers.Contract(CoinFlip.address, CoinFlip.abi, this.metaMaskWallet.signer)
    }
  },
  methods: {
    ...mapActions([
      'setFavourite'
    ]),
    async fetchCoinFlipData() {
      const coinFlipFetchedData = await Promise.all([
        this.coinFlipContract.lastGameId(),
        this.coinFlipContract.recentGames(100)
      ])

      let lastGameId = coinFlipFetchedData[0]._isBigNumber ? ethers.BigNumber.from(coinFlipFetchedData[0]).toString() : coinFlipFetchedData[0]
      let recentGames = []

      for (const game of coinFlipFetchedData[1]) {
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

      this.coinFlipFetchedData.lastGameId = lastGameId
      this.coinFlipFetchedData.recentGames = recentGames

      if (this.coinFlipDefaultView === 'default') {
        this.coinFlipShownGames = recentGames
      }
    },
    async fetchRouletteData() {
      const data = await Promise.all([
        this.rouletteContract.currentBets(),
        this.rouletteContract.lastSpace(),
        this.rouletteContract.returnWheel(),
        this.rouletteContract.rN(),
        this.rouletteContract.timeLeft(),
        this.rouletteContract.startedAt(),
        this.rouletteContract.timeLimit()
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
      const timeLeftFromContract = data[4]._isBigNumber ? ethers.BigNumber.from(data[4]).toString() : data[4]
      const startedAt = data[5]._isBigNumber ? ethers.BigNumber.from(data[5]).toString() : data[5]

      this.rouletteFetchedData = {
        currentBets: data[0],
        lastSpace: lastSpace,
        returnWheel: wheel,
        roundNumber: roundNumber,
        timeLeftFromContract: timeLeftFromContract,
        startedAt: startedAt,
        timeLeft: (parseInt(startedAt) + parseInt(data[6])) - Math.floor(Date.now() / 1000)
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
    async timeLeft() {
      this.rouletteLoading.timeLeft = true
      this.rouletteFetchedData.timeLeft = await this.rouletteContract.timeLeft()
      this.rouletteLoading.timeLeft = false
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

        this.rouletteLoading.makeOutsideBet = false
        this.amountToBet = 100
        this.rouletteSelectedItem = false

      } catch (err) {
        if (err.code !== 4001) {
          this.error = err
        }

        this.rouletteLoading.makeOutsideBet = false
        console.error(err);
      }
    },
    async makeStraightBet(number, amount) {
      this.error = ''
      this.rouletteLoading.makeStraightBet = true

      try {
        const tx = await this.rouletteContract.makeStraightBet(number, amount.toString())
        await tx.wait(1)

        this.rouletteLoading.makeStraightBet = false
        this.amountToBet = 100
        this.rouletteSelectedItem = false

      } catch (err) {
        if (err.code !== 4001) {
          this.error = err
        }

        this.rouletteLoading.makeStraightBet = false
        console.error(err);
      }
    },
    async spinWheel() {
      this.error = ''
      this.rouletteLoading.spinWheel = true

      try {
        const tx = await this.rouletteContract.spinWheel()
        await tx.wait(1)

        this.rouletteLoading.spinWheel = false

      } catch (err) {
        if (err.code !== 4001) {
          this.error = err
        }

        this.rouletteLoading.spinWheel = false
        console.error(err);
      }
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

        this.rouletteLoading.maxAllowance = false
        this.rouletteLoading.allowance = false
      } catch (err) {
        if (err.code !== 4001) {
          this.error = err
        }

        this.rouletteLoading.maxAllowance = false
        this.rouletteLoading.allowance = false
        console.error(err);
      }

      this.rouletteAmountToApprove = 0;
    },


    // COINFLIP
    // CALL DATA
    async playerByPlayerIdAndGameId(player, id) {
      this.coinFlipLoading.playerByPlayerIdAndGameId = true
      this.coinFlipFetchedData.playerByPlayerIdAndGameId = await this.coinFlipContract.playerByPlayerIdAndGameId(player, id)
      this.coinFlipLoading.playerByPlayerIdAndGameId = false
    },
    async betsByGameId(id) {
      this.coinFlipLoading.betsByGameId = true
      const betAmount = await this.coinFlipContract.betsByGameId(id)
      this.coinFlipFetchedData.betsByGameId = ethers.utils.formatEther(betAmount._isBigNumber ? ethers.BigNumber.from(betAmount).toString() : betAmount)
      this.coinFlipLoading.betsByGameId = false
    },
    async recentGames(amount) {
      this.coinFlipDefaultView = 'custom'
      this.coinFlipLoading.recentGames = true
      const coinFlipFetchedData = await this.coinFlipContract.recentGames(amount)

      this.coinFlipManuallyFetchedRecentGames = []
      this.coinFlipShownGames = []

      for (const game of coinFlipFetchedData) {
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

        this.coinFlipManuallyFetchedRecentGames.push(gameWithInfo)
      }

      this.coinFlipShownGames = this.coinFlipManuallyFetchedRecentGames
      this.coinFlipLoading.recentGames = false
    },
    async recentGamesByUser(address, amount) {
      this.coinFlipDefaultView = 'custom'
      this.coinFlipLoading.recentGamesByUser = true
      const coinFlipFetchedData = await this.coinFlipContract.recentGamesByUser(address, amount)

      this.coinFlipManuallyFetchedRecentGames = []
      this.coinFlipShownGames = []

      for (const game of coinFlipFetchedData) {
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

        this.coinFlipManuallyFetchedRecentGames.push(gameWithInfo)
      }
      this.coinFlipShownGames = this.coinFlipManuallyFetchedRecentGames

      if (address === this.metaMaskAccount) {
        this.coinFlipDefaultView = 'yourGames'
      }

      this.coinFlipLoading.recentGamesByUser = false
    },
    async coinFlipperByGameId(id) {
      this.coinFlipLoading.coinFlipperByGameId = true
      this.coinFlipFetchedData.coinFlipperByGameId = await this.coinFlipContract.coinFlipperByGameId(id)
      this.coinFlipLoading.coinFlipperByGameId = false
    },
    async gameById(id) {
      this.coinFlipDefaultView = 'custom'
      this.coinFlipLoading.gameById = true
      const game = await this.coinFlipContract.gamesById(id)

      let gameWithInfo = {}
      this.coinFlipShownGames = []

      gameWithInfo.id = game[6]._isBigNumber ? ethers.BigNumber.from(game[6]).toString() : game[6]
      gameWithInfo.name = game[0]
      gameWithInfo.p1 = game[1]
      gameWithInfo.p2 = game[2]
      gameWithInfo.flipper = game[3]
      gameWithInfo.winner = game[4]
      gameWithInfo.betAmount = ethers.utils.formatEther(game[5]._isBigNumber ? ethers.BigNumber.from(game[5]).toString() : game[5])
      gameWithInfo.ended = game[8]
      gameWithInfo.passwordProtected = game[7] !== '0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470'

      this.coinFlipFetchedData.gameById = gameWithInfo
      this.coinFlipShownGames.push(gameWithInfo)

      this.coinFlipLoading.gameById = false
    },
    async gameByName(name) {
      this.coinFlipDefaultView = 'custom'
      this.coinFlipLoading.gameByName = true
      const game = await this.coinFlipContract.gamesByName(name)

      let gameWithInfo = {}
      this.coinFlipShownGames = []

      gameWithInfo.id = game[6]._isBigNumber ? ethers.BigNumber.from(game[6]).toString() : game[6]
      gameWithInfo.name = game[0]
      gameWithInfo.p1 = game[1]
      gameWithInfo.p2 = game[2]
      gameWithInfo.flipper = game[3]
      gameWithInfo.winner = game[4]
      gameWithInfo.betAmount = ethers.utils.formatEther(game[5]._isBigNumber ? ethers.BigNumber.from(game[5]).toString() : game[5])
      gameWithInfo.ended = game[8]
      gameWithInfo.passwordProtected = game[7] !== '0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470'

      this.coinFlipFetchedData.gameByName = gameWithInfo
      this.coinFlipShownGames.push(gameWithInfo)

      this.coinFlipLoading.gameByName = false
    },

    // SEND DATA
    async cancelGame(id) {
      this.coinFlipLoading.cancellingGame = true

      try {
        const tx = await this.coinFlipContract.cancelGame(id)
        tx.wait(1)

        this.coinFlipLoading.cancellingGame = false
      } catch (err) {
        if (err.code !== 4001) {
          this.coinFlipError = err
        }

        this.coinFlipLoading.cancellingGame = false
        console.error(err)
      }
    },
    async createGameRoom(name, password, amount) {
      this.coinFlipLoading.creatingGame = true

      if (this.coinFlipCreateGame.confirmPassword === password) {
        try {
          const tx = await this.coinFlipContract.createGameRoom(name, password ? password : '', ethers.utils.parseEther(amount))
          tx.wait(1)

          this.coinFlipLoading.creatingGame = false
          this.coinFlipCreateGame = {
            name: '',
            password: '',
            confirmPassword: '',
            amount: 0
          }

        } catch (err) {
          if (err.code !== 4001) {
            this.coinFlipError = err
          }

          this.coinFlipLoading.creatingGame = false
          console.error(err)
        }
      } else {
        this.coinFlipError = 'Passwords are not the same'
      }
    },
    async joinGame(id, password, amount, flipper) {
      this.coinFlipLoading.joiningGame = id

      try {
        const tx = await this.coinFlipContract.joinGame(id, password ? password : '', ethers.utils.parseEther(amount), flipper)

        tx.wait(1)

        this.coinFlipLoading.joiningGame = false
      } catch (err) {
        if (err.code !== 4001) {
          this.coinFlipError = err
        }

        this.coinFlipLoading.joiningGame = false
        console.error(err)
      }
    },
    async startGame(id, password, side) {
      this.coinFlipLoading.flipping = id

      try {
        const tx = await this.coinFlipContract.startGame(id, password ? password : '', side)

        tx.wait(1)

        this.coinFlipLoading.flipping = false
      } catch (err) {
        if (err.code !== 4001) {
          this.coinFlipError = err
        }

        this.coinFlipLoading.joiningGame = false
        console.error(err)
      }
    },
    async addCoinFlipAllowance(amount) {
      this.coinFlipError = ''

      let actual = 0

      if (amount) {
        actual = amount * (10 ** 18);
        this.coinFlipLoading.maxAllowance = true
      } else {
        actual = this.coinFlipAmountToApprove * (10 ** 18);
        this.coinFlipLoading.allowance = true
      }

      const arg = fromExponential(actual);

      try {
        const tx = await this.mainContract.approve(CoinFlip.address, arg)

        await tx.wait(1)

        this.coinFlipLoading.maxAllowance = false
        this.coinFlipLoading.allowance = false
      } catch (err) {
        if (err.code !== 4001) {
          this.coinFlipError = err
        }

        this.coinFlipLoading.maxAllowance = false
        this.coinFlipLoading.allowance = false
        console.error(err);
      }

      this.coinFlipAmountToApprove = 0;
    }
  }
}
</script>