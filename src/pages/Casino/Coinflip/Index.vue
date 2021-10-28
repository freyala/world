<template>
  <section style="background: url('/images/map/worldmap.png') no-repeat; background-size: cover; min-height: 100vh"
           class="flex p-4 md:p-16 lg:px-32">
    <div style="background: #1c1c1c; z-index: 9999; overflow-y: auto;" class="screen rounded-2xl w-full">
      <section id="section-i-1" class="border-b-4 border-primary-alt"
               style="background: url('/images/SVG/homepage-bg-top.svg') no-repeat top right">
        <div class="container mx-auto text-center pt-16 md:pt-24 pb-16 md:pb-20">
          <h1 class="text-2xl md:text-5xl text-primary-alt font-semibold">
            Coinflip
          </h1>
        </div>
      </section>

      <div class="relative">
        <div class="absolute top-0 left-0 p-4 md:p-8">
          <router-link :to="{ name: 'casino' }">
            <i class="fas fa-long-arrow-alt-left"></i> Back
          </router-link>
        </div>
      </div>

      <div v-if="coinFlipMounted" class="p-8 mt-8 flex flex-wrap">
        <div class="w-full flex flex-wrap">
          <div class="w-full" v-if="parseInt(allowance) > 0">
            <button
                class="w-full rounded-none border border-primary-alt bg-transparent hover:bg-yellow hover:text-white px-4 py-2 h-12"
                @click="addAllowance(0)">
              Disable coinflip <small class="hidden md:inline">(contract will no longer have rights to use your XYA)</small> <i
                v-if="loading.allowance" class="fas fa-cog fa-spin"></i>
            </button>
          </div>

          <div class="w-full" v-else>
            <button
                class="w-full rounded-none border border-primary-alt bg-transparent hover:bg-yellow hover:text-white px-4 py-2 h-12 mt-4"
                @click="addAllowance(999999999999.9999)">
              Enable coinflip <i v-if="loading.maxAllowance" class="fas fa-cog fa-spin"></i>
            </button>
          </div>
        </div>

        <div v-if="parseInt(allowance) > 0" class="w-full flex flex-wrap">
          <div class="w-full md:w-1/4 mt-8 mb-6">
            <h3 class="hidden 2xl:block md:text-4xl mb-8">
              Menu
            </h3>

            <div class="block -mt-12 mb-6 2xl:mb-0 2xl:mt-0 2xl:hidden">
              <br>
              <br>

              <!--      lobby-->
              <button type="button"
                      :class="coinFlipDefaultView === 'default' ? 'bg-primary-alt text-brown' : 'bg-transparent text-primary-alt'"
                      class="md:hidden w-full rounded-none border border-primary-alt bg-transparent hover:bg-primary-alt hover:text-brown px-4 py-2 min-h-12 mb-4"
                      @click="coinFlipDefaultView = 'default'">
                Lobby
              </button>

              <!--      yourGames-->
              <button type="button"
                      :class="coinFlipDefaultView === 'yourGames' ? 'bg-primary-alt text-brown' : 'bg-transparent text-primary-alt'"
                      class="md:hidden w-full rounded-none border border-primary-alt bg-transparent hover:bg-primary-alt hover:text-brown px-4 py-2 min-h-12 mb-4"
                      @click="recentGamesByUser(metaMaskAccount, 25)">
                Your games
              </button>

              <hr class="md:hidden pb-4">

              <h3 class="text-2xl md:text-4xl mb-2">
                {{ coinFlipSelectedButton === 'createGame' ? 'Create game' : 'Look up' }}
              </h3>

              <!--      coinFlipCreateGame-->
              <div v-if="coinFlipSelectedButton === 'createGame'">
                <div class="flex flex-wrap">
                  <div class="w-full">
                    <small>Name of room</small>
                    <input
                        class="w-full border border-primary-alt bg-transparent hover:bg-yellow hover:text-white px-4 min-h-12"
                        v-model="coinFlipCreateGame.name"
                        type="text">
                  </div>
                  <div class="w-full">
                    <small>Room password</small>
                    <input
                        class="w-full border border-primary-alt bg-transparent hover:bg-yellow hover:text-white px-4 min-h-12"
                        v-model="coinFlipCreateGame.password"
                        type="password">
                  </div>
                  <div class="w-full">
                    <small>Confirm room password</small>
                    <input
                        class="w-full border border-primary-alt bg-transparent hover:bg-yellow hover:text-white px-4 min-h-12"
                        v-model="coinFlipCreateGame.confirmPassword"
                        type="password">
                  </div>
                  <div class="w-full">
                    <small>Amount to bet with</small>
                    <input
                        class="w-full border border-primary-alt bg-transparent hover:bg-yellow hover:text-white px-4 min-h-12"
                        v-model="amount"
                        type="number" maxlength="25000">
                  </div>
                  <div class="w-full mt-4">
                    <button type="button"
                            class="w-full rounded-none border border-primary-alt bg-transparent hover:bg-primary-alt hover:text-white px-4 py-2 min-h-12"
                            @click="createGameRoom(coinFlipCreateGame.name, coinFlipCreateGame.password, amount)">
                      <span v-if="coinFlipLoading.creatingGame">Creating game... </span>
                      <span v-else>Create game! </span>
                      <i v-if="coinFlipLoading.creatingGame" class="fas fa-cog fa-spin"></i>
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
              <div class="hidden md:block" v-if="coinFlipSelectedButton === 'playerByPlayerIdAndGameId'">
                <div class="flex flex-wrap">
                  <div class="w-1/2 pr-2">
                    <small>Player 1 or 2</small>
                    <input
                        class="w-full border border-primary-alt bg-transparent hover:bg-yellow hover:text-white px-4 min-h-12"
                        v-model="coinFlipInput.playerId"
                        type="number">
                  </div>
                  <div class="w-1/2 pl-2">
                    <small>Game ID</small>
                    <input
                        class="w-full border border-primary-alt bg-transparent hover:bg-yellow hover:text-white px-4 min-h-12"
                        v-model="coinFlipInput.gameId"
                        type="number">
                  </div>
                  <div class="w-full mt-4">
                    <button type="button"
                            class="w-full rounded-none border border-primary-alt bg-transparent hover:bg-primary-alt hover:text-white px-4 py-2 min-h-12"
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
              <div class="hidden md:block" v-if="coinFlipSelectedButton === 'betsByGameId'">
                <small>Game ID</small>
                <div class="flex flex-wrap">
                  <div class="w-1/2 pr-2">
                    <input
                        class="w-full border border-primary-alt bg-transparent hover:bg-yellow hover:text-white px-4 min-h-12"
                        v-model="coinFlipInput.gameId"
                        type="number">
                  </div>
                  <div class="w-1/2 pl-2">
                    <button type="button"
                            class="w-full rounded-none border border-primary-alt bg-transparent hover:bg-primary-alt hover:text-white px-4 py-2 min-h-12"
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
              <div class="hidden md:block" v-if="coinFlipSelectedButton === 'recentGames'">
                <small>Number of games</small>
                <div class="flex flex-wrap">
                  <div class="w-1/2 pr-2">
                    <input
                        class="w-full border border-primary-alt bg-transparent hover:bg-yellow hover:text-white px-4 min-h-12"
                        v-model="coinFlipInput.numberOfGames"
                        type="number">
                  </div>
                  <div class="w-1/2 pl-2">
                    <button type="button"
                            class="w-full rounded-none border border-primary-alt bg-transparent hover:bg-primary-alt hover:text-white px-4 py-2 min-h-12"
                            @click="recentGames(coinFlipInput.numberOfGames)">
                      Fetch games <i v-if="coinFlipLoading.recentGames" class="fas fa-cog fa-spin"></i>
                    </button>
                  </div>
                </div>
                <br>
                <br>
              </div>

              <!--      recentGamesByUser-->
              <div class="hidden md:block" v-if="coinFlipSelectedButton === 'recentGamesByUser'">
                <div class="flex flex-wrap">
                  <div class="w-1/2 pr-2">
                    <small>User address</small>
                    <input
                        class="w-full border border-primary-alt bg-transparent hover:bg-yellow hover:text-white px-4 min-h-12"
                        v-model="coinFlipInput.userAddress"
                        type="text">
                  </div>
                  <div class="w-1/2 pl-2">
                    <small>Number of games</small>
                    <input
                        class="w-full border border-primary-alt bg-transparent hover:bg-yellow hover:text-white px-4 min-h-12"
                        v-model="coinFlipInput.numberOfGames"
                        type="number">
                  </div>
                  <div class="w-full mt-4">
                    <button type="button"
                            class="w-full rounded-none border border-primary-alt bg-transparent hover:bg-primary-alt hover:text-white px-4 py-2 min-h-12"
                            @click="recentGamesByUser(coinFlipInput.userAddress, coinFlipInput.numberOfGames)">
                      Fetch games <i v-if="coinFlipLoading.recentGamesByUser" class="fas fa-cog fa-spin"></i>
                    </button>
                  </div>
                </div>
                <br>
                <br>
              </div>

              <!--      coinFlipperByGameId-->
              <div class="hidden md:block" v-if="coinFlipSelectedButton === 'coinFlipperByGameId'">
                <small>Game ID</small>
                <div class="flex flex-wrap">
                  <div class="w-1/2 pr-2">
                    <input
                        class="w-full border border-primary-alt bg-transparent hover:bg-yellow hover:text-white px-4 min-h-12"
                        v-model="coinFlipInput.gameId"
                        type="number">
                  </div>
                  <div class="w-1/2 pl-2">
                    <button type="button"
                            class="w-full rounded-none border border-primary-alt bg-transparent hover:bg-primary-alt hover:text-white px-4 py-2 min-h-12"
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
              <div class="hidden md:block" v-if="coinFlipSelectedButton === 'gameById'">
                <small>Game ID</small>
                <div class="flex flex-wrap">
                  <div class="w-1/2 pr-2">
                    <input
                        class="w-full border border-primary-alt bg-transparent hover:bg-yellow hover:text-white px-4 min-h-12"
                        v-model="coinFlipInput.gameId"
                        type="number">
                  </div>
                  <div class="w-1/2 pl-2">
                    <button type="button"
                            class="w-full rounded-none border border-primary-alt bg-transparent hover:bg-primary-alt hover:text-white px-4 py-2 min-h-12"
                            @click="gameById(coinFlipInput.gameId)">
                      Fetch game <i v-if="coinFlipLoading.gameById" class="fas fa-cog fa-spin"></i>
                    </button>
                  </div>
                </div>
                <br>
                <br>
              </div>

              <!--      gameByName-->
              <div class="hidden md:block" v-if="coinFlipSelectedButton === 'gameByName'">
                <small>Game name</small>
                <div class="flex flex-wrap">
                  <div class="w-1/2 pr-2">
                    <input
                        class="w-full border border-primary-alt bg-transparent hover:bg-yellow hover:text-white px-4 min-h-12"
                        v-model="coinFlipInput.gameName"
                        type="text">
                  </div>
                  <div class="w-1/2 pl-2">
                    <button type="button"
                            class="w-full rounded-none border border-primary-alt bg-transparent hover:bg-primary-alt hover:text-white px-4 py-2 min-h-12"
                            @click="gameByName(coinFlipInput.gameName)">
                      Fetch game <i v-if="coinFlipLoading.gameName" class="fas fa-cog fa-spin"></i>
                    </button>
                  </div>
                </div>
                <br>
                <br>
              </div>
            </div>

            <!--      lobby-->
            <button type="button"
                    :class="coinFlipDefaultView === 'default' ? 'bg-primary-alt text-brown' : 'bg-transparent text-primary-alt'"
                    class="hidden md:block w-full rounded-none border border-primary-alt bg-transparent hover:bg-primary-alt hover:text-brown px-4 py-2 min-h-12 mb-4"
                    @click="coinFlipDefaultView = 'default'">
              Lobby
            </button>

            <!--      yourGames-->
            <button type="button"
                    :class="coinFlipDefaultView === 'yourGames' ? 'bg-primary-alt text-brown' : 'bg-transparent text-primary-alt'"
                    class="hidden md:block w-full rounded-none border border-primary-alt bg-transparent hover:bg-primary-alt hover:text-brown px-4 py-2 min-h-12 mb-4"
                    @click="recentGamesByUser(metaMaskAccount, 25)">
              Your games
            </button>

            <br class="hidden md:block">
            <br class="hidden md:block">
            <br class="hidden md:block">

            <!--      coinFlipCreateGame-->
            <button type="button"
                    :class="coinFlipSelectedButton === 'createGame' ? 'bg-primary-alt text-brown' : 'bg-transparent text-primary-alt'"
                    class="hidden md:block w-full rounded-none border border-primary-alt bg-transparent hover:bg-primary-alt hover:text-brown px-4 py-2 min-h-12 mb-4"
                    @click="coinFlipSelectedButton = 'createGame'">
              Create new game
            </button>

            <!--      gameById-->
            <button type="button"
                    :class="coinFlipSelectedButton === 'gameById' ? 'bg-primary-alt text-brown' : 'bg-transparent text-primary-alt'"
                    class="hidden md:block w-full rounded-none border border-primary-alt bg-transparent hover:bg-primary-alt hover:text-brown px-4 py-2 min-h-12 mb-4"
                    @click="coinFlipSelectedButton = 'gameById'">
              Look up game by ID
            </button>

            <!--      gameByName-->
            <button type="button"
                    :class="coinFlipSelectedButton === 'gameByName' ? 'bg-primary-alt text-brown' : 'bg-transparent text-primary-alt'"
                    class="hidden md:block w-full rounded-none border border-primary-alt bg-transparent hover:bg-primary-alt hover:text-brown px-4 py-2 min-h-12 mb-4"
                    @click="coinFlipSelectedButton = 'gameByName'">
              Look up game by name
            </button>

            <!--      recentGames-->
            <button type="button"
                    :class="coinFlipSelectedButton === 'recentGames' ? 'bg-primary-alt text-brown' : 'bg-transparent text-primary-alt'"
                    class="hidden md:block w-full rounded-none border border-primary-alt bg-transparent hover:bg-primary-alt hover:text-brown px-4 py-2 min-h-12 mb-4"
                    @click="coinFlipSelectedButton = 'recentGames'">
              Look up recent games
            </button>

            <!--      recentGamesByUser-->
            <button type="button"
                    :class="coinFlipSelectedButton === 'recentGamesByUser' ? 'bg-primary-alt text-brown' : 'bg-transparent text-primary-alt'"
                    class="hidden md:block w-full rounded-none border border-primary-alt bg-transparent hover:bg-primary-alt hover:text-brown px-4 py-2 min-h-12 mb-4"
                    @click="coinFlipSelectedButton = 'recentGamesByUser'">
              Look up recent games by user
            </button>

            <!--      playerByPlayerIdAndGameId-->
            <button type="button"
                    :class="coinFlipSelectedButton === 'playerByPlayerIdAndGameId' ? 'bg-primary-alt text-brown' : 'bg-transparent text-primary-alt'"
                    class="hidden md:block w-full rounded-none border border-primary-alt bg-transparent hover:bg-primary-alt hover:text-brown px-4 py-2 min-h-12 mb-4"
                    @click="coinFlipSelectedButton = 'playerByPlayerIdAndGameId'">
              Look up player by game
            </button>

            <!--      betsByGameId-->
            <button type="button"
                    :class="coinFlipSelectedButton === 'betsByGameId' ? 'bg-primary-alt text-brown' : 'bg-transparent text-primary-alt'"
                    class="hidden md:block w-full rounded-none border border-primary-alt bg-transparent hover:bg-primary-alt hover:text-brown px-4 py-2 min-h-12 mb-4"
                    @click="coinFlipSelectedButton = 'betsByGameId'">
              Look up bet by game ID
            </button>

            <!--      coinFlipperByGameId-->
            <button type="button"
                    :class="coinFlipSelectedButton === 'coinFlipperByGameId' ? 'bg-primary-alt text-brown' : 'bg-transparent text-primary-alt'"
                    class="hidden md:block w-full rounded-none border border-primary-alt bg-transparent hover:bg-primary-alt hover:text-brown px-4 py-2 min-h-12 mb-4"
                    @click="coinFlipSelectedButton = 'coinFlipperByGameId'">
              Look up coin flipper
            </button>
          </div>

          <div class="w-full md:w-3/4 2xl:w-1/2 md:px-8">
            <!--      Game lobby-->
            <div class="md:mt-8">
              <div class="flex flex-wrap">
                <div class="hidden md:block w-1/3"></div>
                <div class="w-full w-1/3">
                  <h3 class="text-2xl md:text-4xl text-center">
                    {{
                      coinFlipDefaultView === 'default' ? 'Lobby' : coinFlipDefaultView === 'yourGames' ? 'Your games' : 'Custom search'
                    }}
                  </h3>
                </div>
                <div class="w-full text-center my-auto">
                  <span class="text-lg">
                    XYA Balance: {{ walletBalance }}
                  </span>
                </div>

                <div class="w-full mt-2 text-center my-auto">
                  <span @click="coinFlipShowEndedGames = !coinFlipShowEndedGames" class="cursor-pointer">
                    {{ coinFlipShowEndedGames ? 'Hide' : 'Show' }} finished games
                  </span>
                </div>
              </div>

              <div class="mt-4">
                <div class="pb-8" v-if="!game.ended && game.betAmount > 0" v-for="game in coinFlipShownGames">
                  <div style="border: 1px solid #b8a984" class="flex flex-wrap p-4 relative">
                    <div class="w-full md:w-3/5">
                      <p>
                        Game ID: {{ game.id }}
                      </p>
                      <p>
                        Name: <span style="word-break: break-all">{{ game.name }}</span>
                      </p>
                      <p style="word-break: break-all">
                        Player 1: <span style="word-break: break-all">{{ game.p1 === metaMaskAccount ? 'You' : game.p1 }}</span>
                      </p>
                      <p>
                        Player 2: <span style="word-break: break-all">{{
                          game.p2 === metaMaskAccount ? 'You' : game.p2 === '0x2B9F62aC65BCf956B6E15eC427456b2CF3a51992' ? 'House' : game.p2
                        }}</span>
                      </p>
                      <p>
                        Amount: {{ game.betAmount }} XYA
                      </p>
                    </div>
                    <div class="w-full md:w-2/5 mt-4 md:mt-0 md:pl-6">
                      <div>
                        <div
                            v-if="game.p2 !== '0x2B9F62aC65BCf956B6E15eC427456b2CF3a51992' || (game.p1 !== metaMaskAccount && game.p2 === '0x2B9F62aC65BCf956B6E15eC427456b2CF3a51992')">
                          Status: <br>
                          {{
                            (game.p2 === '0x0000000000000000000000000000000000000000' && game.p1 === metaMaskAccount) ? 'Searching for opponent' : 'In progress'
                          }} <span v-if="game.passwordProtected && game.p1 !== metaMaskAccount">(Locked game <i
                            class="fas fa-lock"></i>)</span>
                          <br><br>
                        </div>

                        <div v-if="game.passwordProtected && game.p1 !== metaMaskAccount" class="mb-2">
                          <input
                              class="w-full border border-primary-alt bg-transparent hover:bg-yellow hover:text-white px-4 min-h-12"
                              v-model="coinFlipPasswords[game.id]"
                              placeholder="password"
                              type="password"
                          >
                        </div>

                        <div
                            v-if="(game.p2 === '0x2B9F62aC65BCf956B6E15eC427456b2CF3a51992' || game.p2 === '0x0000000000000000000000000000000000000000') && game.p1 !== metaMaskAccount">
                          <button type="button"
                                  @click="joinGame(game.id, coinFlipPasswords[game.id], game.betAmount, 2)"
                                  class="w-full rounded-none border border-primary-alt bg-transparent hover:bg-primary-alt hover:text-brown px-4 py-2 min-h-12 mb-4">
                            <span v-if="coinFlipLoading.joiningGame">Challenging... </span>
                            <span v-else>Challenge </span>
                            <i v-if="coinFlipLoading.joiningGame === game.id" class="fas fa-cog fa-spin"></i>
                          </button>
                        </div>
                        <div v-else>
                          <div
                              v-if="game.p2 === '0x0000000000000000000000000000000000000000' && game.p1 === metaMaskAccount">
                            <button type="button"
                                    class="w-full rounded-none border border-primary-alt bg-transparent hover:bg-yellow hover:text-white px-4 py-2 min-h-12 mb-4">
                              Waiting for challenger
                            </button>
                          </div>
                          <div
                              class="flex flex-wrap"
                              v-if="game.p2 !== '0x0000000000000000000000000000000000000000' && game.flipper === metaMaskAccount">
                            <div v-if="game.p2 === '0x2B9F62aC65BCf956B6E15eC427456b2CF3a51992'"
                                 class="w-full mb-4 md:pr-8">
                              <small>Play against the house or wait for a player to join your game.</small>
                            </div>
                            <div
                                v-if="game.passwordProtected && game.p2 === '0x2B9F62aC65BCf956B6E15eC427456b2CF3a51992'"
                                class="mb-2">
                              <input
                                  class="w-full border border-primary-alt bg-transparent hover:bg-yellow hover:text-white px-4 min-h-12"
                                  v-model="coinFlipPasswords[game.id]"
                                  placeholder="password"
                                  type="password"
                              >
                            </div>
                            <div class="w-full flex flex-wrap md:pr-8">
                              <button type="button"
                                      @click="startGame(game.id, coinFlipPasswords[game.id], 1)"
                                      class="w-full md:w-2/5 rounded-none border border-primary-alt bg-transparent hover:bg-primary-alt hover:text-brown px-4 py-2 min-h-12">
                                Heads!
                              </button>
                              <div class="w-full md:w-1/5 my-1 text-center">
                                <i v-if="coinFlipLoading.flipping === game.id" class="fas fa-cog fa-spin"></i>
                              </div>
                              <button type="button"
                                      @click="startGame(game.id, coinFlipPasswords[game.id], 2)"
                                      class="w-full md:w-2/5 ml-auto rounded-none border border-primary-alt bg-transparent hover:bg-primary-alt hover:text-brown px-4 py-2 min-h-12">
                                Tails!
                              </button>
                            </div>
                          </div>
                          <div
                              v-if="game.p2 !== '0x0000000000000000000000000000000000000000' && ((game.p1 === metaMaskAccount || game.p2 === metaMaskAccount) && game.flipper !== metaMaskAccount)">
                            <button type="button"
                                    disabled
                                    class="w-full rounded-none border border-primary-alt bg-transparent hover:bg-yellow hover:text-white px-4 py-2 min-h-12 mb-4">
                              Waiting for flipper
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div v-if="game.p1 === metaMaskAccount || game.p2 === metaMaskAccount"
                         class="w-auto absolute top-0 right-0 p-4">
                      <i v-if="coinFlipLoading.cancellingGame" class="fas fa-cog fa-spin"></i>
                      <i v-else @click="cancelGame(game.id)" class="fas fa-times cursor-pointer"></i>
                    </div>
                  </div>
                </div>
                <div class="pb-8" v-if="coinFlipShowEndedGames && game.ended && game.betAmount > 0"
                     v-for="game in coinFlipShownGames">
                  <div style="border: 1px solid #b8a984" class="flex flex-wrap p-4 relative">
                    <div class="w-full md:w-3/5">
                      <p>
                        Game ID: {{ game.id }}
                      </p>
                      <p>
                        Name: <span style="word-break: break-all">{{ game.name }}</span>
                      </p>
                      <p style="word-break: break-all">
                        Player 1: <span style="word-break: break-all">{{ game.p1 === metaMaskAccount ? 'You' : game.p1 }}</span>
                      </p>
                      <p>
                        Player 2: <span style="word-break: break-all">{{
                          game.p2 === metaMaskAccount ? 'You' : game.p2 === '0x2B9F62aC65BCf956B6E15eC427456b2CF3a51992' ? 'House' : game.p2
                        }}</span>
                      </p>
                      <p>
                        Amount: {{ game.betAmount }} XYA
                      </p>
                    </div>
                    <div class="w-full md:w-2/5 mt-4 md:mt-0 md:pl-6">
                      <div>
                        Status: <br>
                        Ended
                        <br><br>
                        Winner: <br>
                        <span style="line-break: anywhere">{{
                            game.winner === metaMaskAccount ? 'YOU!' : game.winner === '0x2B9F62aC65BCf956B6E15eC427456b2CF3a51992' ? 'House' : game.winner
                          }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
          <div class="hidden 2xl:block w-1/4 mt-20">
            <button @click="showLastGames = !showLastGames"
                    type="button"
                    class="w-full rounded-none border border-primary-alt bg-transparent hover:bg-primary-alt hover:text-white px-4 py-2 min-h-12">
              {{ showLastGames ? 'Hide your last 5 games' : 'Show your last 5 games' }}
            </button>


            <div v-if="showLastGames" v-for="game in coinFlipLastGames">
              <br>
              ID: {{ game.id }} <br>
              Bet: {{ game.betAmount }} XYA <br>
              Winner: {{
                game.winner === metaMaskAccount ? 'YOU!' : game.betAmount === '0.0' ? 'Cancelled match' : game.winner === '0x0000000000000000000000000000000000000000' ? 'Ongoing' : 'Opponent'
              }}
              <hr>
            </div>
            <br>
            <br>

            <h3 class="text-4xl mb-2">
              {{ coinFlipSelectedButton === 'createGame' ? 'Create' : 'Look up' }}
            </h3>

            <!--      coinFlipCreateGame-->
            <div v-if="coinFlipSelectedButton === 'createGame'">
              <div class="flex flex-wrap">
                <div class="w-full">
                  <small>Name of room</small>
                  <input
                      class="w-full border border-primary-alt bg-transparent hover:bg-yellow hover:text-white px-4 min-h-12"
                      v-model="coinFlipCreateGame.name"
                      type="text">
                </div>
                <div class="w-full">
                  <small>Room password</small>
                  <input
                      class="w-full border border-primary-alt bg-transparent hover:bg-yellow hover:text-white px-4 min-h-12"
                      v-model="coinFlipCreateGame.password"
                      type="password">
                </div>
                <div class="w-full">
                  <small>Confirm room password</small>
                  <input
                      class="w-full border border-primary-alt bg-transparent hover:bg-yellow hover:text-white px-4 min-h-12"
                      v-model="coinFlipCreateGame.confirmPassword"
                      type="password">
                </div>
                <div class="w-full">
                  <small>Amount to bet with</small>
                  <input
                      class="w-full border border-primary-alt bg-transparent hover:bg-yellow hover:text-white px-4 min-h-12"
                      v-model="amount"
                      type="number" maxlength="25000">
                </div>
                <div class="w-full mt-4">
                  <button type="button"
                          class="w-full rounded-none border border-primary-alt bg-transparent hover:bg-primary-alt hover:text-white px-4 py-2 min-h-12"
                          @click="createGameRoom(coinFlipCreateGame.name, coinFlipCreateGame.password, amount)">
                    <span v-if="coinFlipLoading.creatingGame">Creating game... </span>
                    <span v-else>Create game! </span>
                    <i v-if="coinFlipLoading.creatingGame" class="fas fa-cog fa-spin"></i>
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
                  <input
                      class="w-full border border-primary-alt bg-transparent hover:bg-yellow hover:text-white px-4 min-h-12"
                      v-model="coinFlipInput.playerId"
                      type="number">
                </div>
                <div class="w-1/2 pl-2">
                  <small>Game ID</small>
                  <input
                      class="w-full border border-primary-alt bg-transparent hover:bg-yellow hover:text-white px-4 min-h-12"
                      v-model="coinFlipInput.gameId"
                      type="number">
                </div>
                <div class="w-full mt-4">
                  <button type="button"
                          class="w-full rounded-none border border-primary-alt bg-transparent hover:bg-primary-alt hover:text-white px-4 py-2 min-h-12"
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
                  <input
                      class="w-full border border-primary-alt bg-transparent hover:bg-yellow hover:text-white px-4 min-h-12"
                      v-model="coinFlipInput.gameId"
                      type="number">
                </div>
                <div class="w-1/2 pl-2">
                  <button type="button"
                          class="w-full rounded-none border border-primary-alt bg-transparent hover:bg-primary-alt hover:text-white px-4 py-2 min-h-12"
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
                  <input
                      class="w-full border border-primary-alt bg-transparent hover:bg-yellow hover:text-white px-4 min-h-12"
                      v-model="coinFlipInput.numberOfGames"
                      type="number">
                </div>
                <div class="w-1/2 pl-2">
                  <button type="button"
                          class="w-full rounded-none border border-primary-alt bg-transparent hover:bg-primary-alt hover:text-white px-4 py-2 min-h-12"
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
                  <input
                      class="w-full border border-primary-alt bg-transparent hover:bg-yellow hover:text-white px-4 min-h-12"
                      v-model="coinFlipInput.userAddress"
                      type="text">
                </div>
                <div class="w-1/2 pl-2">
                  <small>Number of games</small>
                  <input
                      class="w-full border border-primary-alt bg-transparent hover:bg-yellow hover:text-white px-4 min-h-12"
                      v-model="coinFlipInput.numberOfGames"
                      type="number">
                </div>
                <div class="w-full mt-4">
                  <button type="button"
                          class="w-full rounded-none border border-primary-alt bg-transparent hover:bg-primary-alt hover:text-white px-4 py-2 min-h-12"
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
                  <input
                      class="w-full border border-primary-alt bg-transparent hover:bg-yellow hover:text-white px-4 min-h-12"
                      v-model="coinFlipInput.gameId"
                      type="number">
                </div>
                <div class="w-1/2 pl-2">
                  <button type="button"
                          class="w-full rounded-none border border-primary-alt bg-transparent hover:bg-primary-alt hover:text-white px-4 py-2 min-h-12"
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
                  <input
                      class="w-full border border-primary-alt bg-transparent hover:bg-yellow hover:text-white px-4 min-h-12"
                      v-model="coinFlipInput.gameId"
                      type="number">
                </div>
                <div class="w-1/2 pl-2">
                  <button type="button"
                          class="w-full rounded-none border border-primary-alt bg-transparent hover:bg-primary-alt hover:text-white px-4 py-2 min-h-12"
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
                  <input
                      class="w-full border border-primary-alt bg-transparent hover:bg-yellow hover:text-white px-4 min-h-12"
                      v-model="coinFlipInput.gameName"
                      type="text">
                </div>
                <div class="w-1/2 pl-2">
                  <button type="button"
                          class="w-full rounded-none border border-primary-alt bg-transparent hover:bg-primary-alt hover:text-white px-4 py-2 min-h-12"
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
import fromExponential from "from-exponential";

import {mapGetters, mapActions} from "vuex";
import {ethers} from "ethers";

import wallet from "../../../plugins/wallet";
import Freyala from "../../../plugins/artifacts/freyala.json";
import CoinFlip from "../../../plugins/artifacts/coinflip.json";
import RouletteLow from "../../../plugins/artifacts/roulettelow.json";
import Staking from "../../../plugins/artifacts/staking.json";
import RouletteMedium from "../../../plugins/artifacts/roulettemedium.json";

export default {
  name: 'CoinFlip',
  mixins: [wallet],
  computed: {
    ...mapGetters([
      'metaMaskAccount',
      'metaMaskWallet',
    ])
  },
  data() {
    return {
      error: '',
      success: '',
      showLastGames: false,

      mainContract: {},
      coinFlipContract: {},
      coinFlipMounted: false,
      coinFlipInterval: undefined,
      walletBalance: 0,

      amount: 0,
      loading: {
        allowance: false,
        maxAllowance: false
      },
      allowance: 0,
      coinFlipLastGames: [],
      coinFlipShowEndedGames: true,
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
  async mounted() {
    this.mainContract = new ethers.Contract(Freyala.address, Freyala.abi, this.metaMaskWallet.signer)
    this.coinFlipContract = new ethers.Contract(CoinFlip.address, CoinFlip.abi, this.metaMaskWallet.signer)

    await this.fetchData()
    this.coinFlipMounted = true

    this.coinFlipInterval = setInterval(() => {
      this.fetchData()
    }, 2000)
  },
  beforeDestroy() {
    clearInterval(this.dataInterval)
  },
  watch: {
    amount() {
      if (this.amount > 25000) {
        this.amount = 25000
      }
    }
  },
  methods: {
    ...mapActions([
      'setFavourite'
    ]),
    async fetchData() {
      const coinFlipFetchedData = await Promise.all([
        this.coinFlipContract.lastGameId(),
        this.coinFlipContract.recentGames(100),
        this.coinFlipContract.recentGamesByUser(this.metaMaskAccount, 5),
        this.mainContract.allowance(this.metaMaskAccount, CoinFlip.address),
        this.mainContract.balanceOf(this.metaMaskAccount)
      ])

      this.allowance = ethers.utils.formatEther(coinFlipFetchedData[3]._isBigNumber ? ethers.BigNumber.from(coinFlipFetchedData[3]).toString() : coinFlipFetchedData[3])
      this.walletBalance = (coinFlipFetchedData[4] / Math.pow(10, 18)).toFixed(2)

      let lastGameId = coinFlipFetchedData[0]._isBigNumber ? ethers.BigNumber.from(coinFlipFetchedData[0]).toString() : coinFlipFetchedData[0]
      let recentGames = []
      let yourRecentGames = []

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
      for (const game of coinFlipFetchedData[2]) {
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

        yourRecentGames.push(gameWithInfo)
      }

      this.coinFlipFetchedData.lastGameId = lastGameId
      this.coinFlipFetchedData.recentGames = recentGames
      this.coinFlipLastGames = yourRecentGames

      if (this.coinFlipDefaultView === 'default') {
        this.coinFlipShownGames = recentGames
      }
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
      const game = await this.coinFlipContract.gamesByName(name.toLowerCase())

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
        await tx.wait(1)

      } catch (err) {
        if (err.code !== 4001) {
          this.coinFlipError = err
          this.error = err.data ? err.data.message : err
          this.$modal.show('error')
        }

        console.error(err)
        this.error = err.data ? err.data.message : err
        this.$modal.show('error')
      }

      this.coinFlipLoading.cancellingGame = false
    },
    async createGameRoom(name, password, amount) {
      this.coinFlipLoading.creatingGame = true

      if (this.coinFlipCreateGame.confirmPassword === password) {
        try {
          const tx = await this.coinFlipContract.createGameRoom(name.toLowerCase(), password ? password : '', ethers.utils.parseEther(amount))
          await tx.wait(1)

          this.coinFlipCreateGame = {
            name: '',
            password: '',
            confirmPassword: '',
            amount: 0
          }

        } catch (err) {
          if (err.code !== 4001) {
            this.coinFlipError = err

            if (err.data.message === 'execution reverted: ERC20: transfer amount exceeds allowance') {
              this.error = "ERROR: You have not approved the contract to stake your tokens yet, please approve the appropriate amount."
            } else {
              this.error = err.data ? err.data.message : err
            }

            this.$modal.show('error')
          }

          console.error(err)
          this.error = err.data ? err.data.message : err
          this.$modal.show('error')
        }
      } else {
        this.coinFlipError = 'Passwords are not the same'
        this.error = 'Passwords are not the same'
        this.$modal.show('error')
      }

      this.coinFlipLoading.creatingGame = false
    },
    async joinGame(id, password, amount, flipper) {
      this.coinFlipLoading.joiningGame = id

      try {
        const tx = await this.coinFlipContract.joinGame(id, password ? password : '', ethers.utils.parseEther(amount), flipper)
        await tx.wait(1)

      } catch (err) {
        if (err.code !== 4001) {
          this.coinFlipError = err
          this.error = err.data ? err.data.message : err
          this.$modal.show('error')
        }

        console.error(err)

        if (err.data.message === 'execution reverted: ERC20: transfer amount exceeds allowance') {
          this.error = "ERROR: You have not approved the contract to stake your tokens yet, please approve the appropriate amount."
        } else {
          this.error = err.data ? err.data.message : err
        }

        this.$modal.show('error')
      }

      this.coinFlipLoading.joiningGame = false
    },
    async startGame(id, password, side) {
      this.coinFlipLoading.flipping = id

      try {
        const tx = await this.coinFlipContract.startGame(id, password ? password : '', side)
        await tx.wait(1)

      } catch (err) {
        if (err.code !== 4001) {
          this.coinFlipError = err

          if (err.data.message === 'execution reverted: ERC20: transfer amount exceeds allowance') {
            this.error = "ERROR: You have not approved the contract to stake your tokens yet, please approve the appropriate amount."
          } else {
            this.error = err.data ? err.data.message : err
          }

          this.$modal.show('error')
        }

        console.error(err)
        this.error = err.data ? err.data.message : err
        this.$modal.show('error')
      }

      this.coinFlipLoading.joiningGame = false
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
        console.error(err)
      }

      const data = await this.mainContract.allowance(this.metaMaskAccount, CoinFlip.address)
      this.allowance = ethers.utils.formatEther(data._isBigNumber ? ethers.BigNumber.from(data).toString() : data)
    }
  }
}
</script>