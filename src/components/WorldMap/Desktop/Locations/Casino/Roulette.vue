<template>
  <div v-if="chainStatus === 'correct'">
    <div v-if="rouletteDefaultView === 'low' && rouletteMounted" class="flex flex-wrap">
      <div class="w-full flex">
        <div class="w-2/3 px-8 mx-auto">
          <!--      setAllowance-->
          <div class="flex flex-wrap">
            <small class="w-full text-center">
              Current allowance: {{ allowance.rouletteLow }} XYA
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
                class="w-full rounded-none border border-yellow bg-transparent hover:bg-yellow hover:text-brown px-4 py-2 min-h-12 mb-4"
                @click="rouletteDefaultView = 'low'">
          New kids table ( 1 - 50 )
        </button>

        <!--      mediumTable-->
        <button type="button"
                :class="rouletteDefaultView === 'medium' ? 'bg-yellow text-brown' : 'bg-transparent text-yellow'"
                class="w-full rounded-none border border-yellow bg-transparent hover:bg-yellow hover:text-brown px-4 py-2 min-h-12 mb-4"
                @click="rouletteDefaultView = 'medium'">
          Regular table ( 50 - 1000 )
        </button>

        <!--      highTable-->
        <button type="button"
                :class="rouletteDefaultView === 'high' ? 'bg-yellow text-brown' : 'bg-transparent text-yellow'"
                class="w-full rounded-none border border-yellow bg-transparent hover:bg-yellow hover:text-brown px-4 py-2 min-h-12 mb-4"
                @click="rouletteDefaultView = 'high'">
          High stakes table ( 1000 - 15000 )
        </button>

        <br>
        <br>
        <div class="flex flex-wrap">
          <img class="w-5/6 mx-auto" src="/images/ui/roulette.png" alt="Roulette table">

          <div class="w-full" v-if="rouletteFetchedData.timeLeft !== 'Finished'">
            <p>Feel powerful! Be the one to stop the wheel!</p>
            <button v-if="rouletteFetchedData.timeLeft > 0" type="button"
                    class="w-full rounded-none border border-yellow bg-transparent px-4 py-2 min-h-12 mb-4 mt-4 mx-1">
              <span>Wait for the timer to end... {{
                  rouletteFetchedData.timeLeft === 'Finished' ? 'Round finished' : `${rouletteFetchedData.timeLeft < 0 ? '0' : rouletteFetchedData.timeLeft}`
                }}</span>
            </button>
            <button v-else type="button"
                    class="w-full rounded-none border border-yellow bg-transparent hover:bg-yellow hover:text-brown px-4 py-2 min-h-12 mb-4 mt-4 mx-1"
                    @click="spinWheel()">
              <span v-if="rouletteLoading.spinWheel">Stopping wheel... </span>
              <span v-else>Stop wheel after placing bet! </span>
              <i v-if="rouletteLoading.spinWheel" class="fas fa-cog fa-spin"></i>
            </button>
          </div>
        </div>


        <div v-if="rouletteMounted && rouletteFetchedData.currentRound.length > 0" class="flex flex-wrap mt-4">
          <div class="w-full">
            <span class="text-xl" v-if="rouletteFetchedData.currentRound.length > 0">Current round bets: </span><br>
            <div v-if="bet.type === 'straight'" v-for="bet in rouletteFetchedData.currentRound">
              {{ bet.player }} <br> has bet {{ bet.betSize }} XYA on number {{ bet.spaceNumber }}
            </div>
            <div v-if="bet.type === 'outside'" v-for="bet in rouletteFetchedData.currentRound">
              {{ bet.player }} <br> has bet {{ bet.betSize }} XYA on {{ bet.betType }}
            </div>
          </div>
        </div>
        <br>
        <hr v-if="rouletteMounted">
        <br>
        <div v-if="rouletteMounted && rouletteFetchedData.lastWinners.length > 0" class="flex flex-wrap">
          <div class="w-full mt-4">
            <span class="text-xl">
              Last rounds winners: <br>
            </span>
            <div v-for="bet in rouletteFetchedData.lastWinners">
              {{ bet.player }} has won {{ bet.winnings }} XYA
            </div>
          </div>
        </div>
        <div v-if="rouletteMounted && rouletteFetchedData.lastWinners.length === 0" class="flex flex-wrap">
          <div class="w-full mt-4">
            <span class="text-xl">
              Last rounds winners: <br>
            </span>
            No winners last round.
          </div>
        </div>
        <br>
        <hr v-if="rouletteMounted && rouletteFetchedData.lastWinners.length > 0">
        <br>
        <div v-if="rouletteMounted && rouletteFetchedData.previousRound.length > 0" class="flex flex-wrap">
          <div class="w-full">
            <span class="text-xl"
                  v-if="rouletteFetchedData.previousRound.length > 0">Last round winners bets: </span><br>
            <div v-if="bet.type === 'straight'" v-for="bet in rouletteFetchedData.previousRound">
              {{ bet.player }} <br> had bet {{ bet.betSize }} XYA on number {{ bet.spaceNumber }}
            </div>
            <div v-if="bet.type === 'outside'" v-for="bet in rouletteFetchedData.previousRound">
              {{ bet.player }} <br> had bet {{ bet.betSize }} XYA on {{ bet.betType }}
            </div>
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

          <div class="w-full 2xl:w-3/4 flex mt-8 p-1">
            <div class="w-1/6">
              <button type="button"
                      :class="rouletteBetAmount === '1000000000000000000' ? 'bg-yellow text-brown' : 'bg-transparent text-yellow'"
                      class="rounded-none border border-yellow hover:bg-yellow hover:text-brown px-4 py-2 min-h-12"
                      @click="rouletteBetAmount = '1000000000000000000'">
                1 XYA
              </button>
            </div>
            <div class="w-1/6">
              <button type="button"
                      :class="rouletteBetAmount === '2000000000000000000' ? 'bg-yellow text-brown' : 'bg-transparent text-yellow'"
                      class="rounded-none border border-yellow hover:bg-yellow hover:text-brown px-4 py-2 min-h-12"
                      @click="rouletteBetAmount = '2000000000000000000'">
                2 XYA
              </button>
            </div>
            <div class="w-1/6">
              <button type="button"
                      :class="rouletteBetAmount === '5000000000000000000' ? 'bg-yellow text-brown' : 'bg-transparent text-yellow'"
                      class="rounded-none border border-yellow hover:bg-yellow hover:text-brown px-4 py-2 min-h-12"
                      @click="rouletteBetAmount = '5000000000000000000'">
                5 XYA
              </button>
            </div>
            <div class="w-1/6">
              <button type="button"
                      :class="rouletteBetAmount === '10000000000000000000' ? 'bg-yellow text-brown' : 'bg-transparent text-yellow'"
                      class="rounded-none border border-yellow hover:bg-yellow hover:text-brown px-4 py-2 min-h-12"
                      @click="rouletteBetAmount = '10000000000000000000'">
                10 XYA
              </button>
            </div>
            <div class="w-1/6">
              <button type="button"
                      :class="rouletteBetAmount === '20000000000000000000' ? 'bg-yellow text-brown' : 'bg-transparent text-yellow'"
                      class="rounded-none border border-yellow bg-transparent hover:bg-yellow hover:text-brown px-4 py-2 min-h-12"
                      @click="rouletteBetAmount = '20000000000000000000'">
                20 XYA
              </button>
            </div>
            <div class="w-1/6">
              <button type="button"
                      :class="rouletteBetAmount === '50000000000000000000' ? 'bg-yellow text-brown' : 'bg-transparent text-yellow'"
                      class="rounded-none border border-yellow bg-transparent hover:bg-yellow hover:text-brown px-4 py-2 min-h-12"
                      @click="rouletteBetAmount = '50000000000000000000'">
                50 XYA
              </button>
            </div>
          </div>
        </div>

        <div class="flex flex-wrap">
          <div class="w-full flex text-xl mt-7 mb-4">
            <div class="w-1/4">
              XYA Balance: {{ userBalance }}
            </div>
            <div class="w-1/4">
              Round number: {{ rouletteFetchedData.currentRoundNumber }}
            </div>
            <div class="w-1/4">
              {{
                rouletteFetchedData.timeLeft === 'Finished' ? 'Round finished' : `Wheel stoppable in: ${rouletteFetchedData.timeLeft < 0 ? '0' : rouletteFetchedData.timeLeft}`
              }}
            </div>
            <div class="w-1/4">
              Last game: {{ rouletteFetchedData.lastSpace.colour }} {{ rouletteFetchedData.lastSpace.number }}
            </div>
          </div>
          <div class="w-1/12 flex flex-wrap">
            <div @click="rouletteSelectedItem = space.number"
                 v-for="space in rouletteFetchedData.wheel.slice(0, 1)"
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
                 v-for="space in rouletteFetchedData.wheel.slice(1, 37)"
                 class="w-1/6 p-1">
              <div class="h-24 flex cursor-pointer"
                   :class="`text-${rouletteSelectedItem === space.number ? 'brown' : 'yellow'} bg-${rouletteSelectedItem === space.number ? 'white' : space.colour}`">
                <p class="m-auto">
                  {{ space.number }}
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
            <div @click="rouletteSelectedItem = (Math.floor(Math.random() * 37)).toString()" class="w-full p-1">
              <div class="h-full flex cursor-pointer"
                   :class="`text-${rouletteSelectedItem === 'random' ? 'brown' : 'yellow'} bg-${rouletteSelectedItem === 'random' ? 'white' : 'yellow'}`">
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
    <div v-if="rouletteDefaultView === 'medium' && rouletteMounted" class="flex flex-wrap">
      <div class="w-full flex">
        <div class="w-2/3 px-8 mx-auto">
          <!--      setAllowance-->
          <div class="flex flex-wrap">
            <small class="w-full text-center">
              Current allowance: {{ allowance.rouletteMedium }} XYA
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
                class="w-full rounded-none border border-yellow bg-transparent hover:bg-yellow hover:text-brown px-4 py-2 min-h-12 mb-4"
                @click="rouletteDefaultView = 'low'">
          New kids table ( 1 - 50 )
        </button>

        <!--      mediumTable-->
        <button type="button"
                :class="rouletteDefaultView === 'medium' ? 'bg-yellow text-brown' : 'bg-transparent text-yellow'"
                class="w-full rounded-none border border-yellow bg-transparent hover:bg-yellow hover:text-brown px-4 py-2 min-h-12 mb-4"
                @click="rouletteDefaultView = 'medium'">
          Regular table ( 50 - 1000 )
        </button>

        <!--      highTable-->
        <button type="button"
                :class="rouletteDefaultView === 'high' ? 'bg-yellow text-brown' : 'bg-transparent text-yellow'"
                class="w-full rounded-none border border-yellow bg-transparent hover:bg-yellow hover:text-brown px-4 py-2 min-h-12 mb-4"
                @click="rouletteDefaultView = 'high'">
          High stakes table ( 1000 - 15000 )
        </button>

        <br>
        <br>
        <div class="flex flex-wrap">
          <img class="w-5/6 mx-auto" src="/images/ui/roulette.png" alt="Roulette table">

          <div class="w-full" v-if="rouletteFetchedData.timeLeft !== 'Finished'">
            <p>Feel powerful! Be the one to stop the wheel!</p>
            <button v-if="rouletteFetchedData.timeLeft > 0" type="button"
                    class="w-full rounded-none border border-yellow bg-transparent px-4 py-2 min-h-12 mb-4 mt-4 mx-1">
              <span>Wait for the timer to end... {{
                  rouletteFetchedData.timeLeft === 'Finished' ? 'Round finished' : `${rouletteFetchedData.timeLeft < 0 ? '0' : rouletteFetchedData.timeLeft}`
                }}</span>
            </button>
            <button v-else type="button"
                    class="w-full rounded-none border border-yellow bg-transparent hover:bg-yellow hover:text-brown px-4 py-2 min-h-12 mb-4 mt-4 mx-1"
                    @click="spinWheel()">
              <span v-if="rouletteLoading.spinWheel">Stopping wheel... </span>
              <span v-else>Stop wheel after placing bet! </span>
              <i v-if="rouletteLoading.spinWheel" class="fas fa-cog fa-spin"></i>
            </button>
          </div>
        </div>


        <div v-if="rouletteMounted && rouletteFetchedData.currentRound.length > 0" class="flex flex-wrap mt-4">
          <div class="w-full">
            <span class="text-xl" v-if="rouletteFetchedData.currentRound.length > 0">Current round bets: </span><br>
            <div v-if="bet.type === 'straight'" v-for="bet in rouletteFetchedData.currentRound">
              {{ bet.player }} <br> has bet {{ bet.betSize }} XYA on number {{ bet.spaceNumber }}
            </div>
            <div v-if="bet.type === 'outside'" v-for="bet in rouletteFetchedData.currentRound">
              {{ bet.player }} <br> has bet {{ bet.betSize }} XYA on {{ bet.betType }}
            </div>
          </div>
        </div>
        <br>
        <hr v-if="rouletteMounted">
        <br>
        <div v-if="rouletteMounted && rouletteFetchedData.lastWinners.length > 0" class="flex flex-wrap">
          <div class="w-full mt-4">
            <span class="text-xl">
              Last rounds winners: <br>
            </span>
            <div v-for="bet in rouletteFetchedData.lastWinners">
              {{ bet.player }} has won {{ bet.winnings }} XYA
            </div>
          </div>
        </div>
        <div v-if="rouletteMounted && rouletteFetchedData.lastWinners.length === 0" class="flex flex-wrap">
          <div class="w-full mt-4">
            <span class="text-xl">
              Last rounds winners: <br>
            </span>
            No winners last round.
          </div>
        </div>
        <br>
        <hr v-if="rouletteMounted && rouletteFetchedData.lastWinners.length > 0">
        <br>
        <div v-if="rouletteMounted && rouletteFetchedData.previousRound.length > 0" class="flex flex-wrap">
          <div class="w-full">
            <span class="text-xl"
                  v-if="rouletteFetchedData.previousRound.length > 0">Last round winners bets: </span><br>
            <div v-if="bet.type === 'straight'" v-for="bet in rouletteFetchedData.previousRound">
              {{ bet.player }} <br> had bet {{ bet.betSize }} XYA on number {{ bet.spaceNumber }}
            </div>
            <div v-if="bet.type === 'outside'" v-for="bet in rouletteFetchedData.previousRound">
              {{ bet.player }} <br> had bet {{ bet.betSize }} XYA on {{ bet.betType }}
            </div>
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

          <div class="w-full 2xl:w-3/4 flex mt-8 p-1">
            <div class="w-1/6">
              <button type="button"
                      :class="rouletteBetAmount === '50000000000000000000' ? 'bg-yellow text-brown' : 'bg-transparent text-yellow'"
                      class="rounded-none border border-yellow hover:bg-yellow hover:text-brown px-4 py-2 min-h-12"
                      @click="rouletteBetAmount = '50000000000000000000'">
                50 XYA
              </button>
            </div>
            <div class="w-1/6">
              <button type="button"
                      :class="rouletteBetAmount === '100000000000000000000' ? 'bg-yellow text-brown' : 'bg-transparent text-yellow'"
                      class="rounded-none border border-yellow hover:bg-yellow hover:text-brown px-4 py-2 min-h-12"
                      @click="rouletteBetAmount = '100000000000000000000'">
                100 XYA
              </button>
            </div>
            <div class="w-1/6">
              <button type="button"
                      :class="rouletteBetAmount === '200000000000000000000' ? 'bg-yellow text-brown' : 'bg-transparent text-yellow'"
                      class="rounded-none border border-yellow bg-transparent hover:bg-yellow hover:text-brown px-4 py-2 min-h-12"
                      @click="rouletteBetAmount = '200000000000000000000'">
                200 XYA
              </button>
            </div>
            <div class="w-1/6">
              <button type="button"
                      :class="rouletteBetAmount === '500000000000000000000' ? 'bg-yellow text-brown' : 'bg-transparent text-yellow'"
                      class="rounded-none border border-yellow bg-transparent hover:bg-yellow hover:text-brown px-4 py-2 min-h-12"
                      @click="rouletteBetAmount = '500000000000000000000'">
                500 XYA
              </button>
            </div>
            <div class="w-1/6">
              <button type="button"
                      :class="rouletteBetAmount === '750000000000000000000' ? 'bg-yellow text-brown' : 'bg-transparent text-yellow'"
                      class="rounded-none border border-yellow bg-transparent hover:bg-yellow hover:text-brown px-4 py-2 min-h-12"
                      @click="rouletteBetAmount = '750000000000000000000'">
                750 XYA
              </button>
            </div>
            <div class="w-1/6">
              <button type="button"
                      :class="rouletteBetAmount === '1000000000000000000000' ? 'bg-yellow text-brown' : 'bg-transparent text-yellow'"
                      class="rounded-none border border-yellow bg-transparent hover:bg-yellow hover:text-brown px-4 py-2 min-h-12"
                      @click="rouletteBetAmount = '1000000000000000000000'">
                1000 XYA
              </button>
            </div>
          </div>
        </div>

        <div class="flex flex-wrap">
          <div class="w-full flex text-xl mt-7 mb-4">
            <div class="w-1/4">
              XYA Balance: {{ userBalance }}
            </div>
            <div class="w-1/4">
              Round number: {{ rouletteFetchedData.currentRoundNumber }}
            </div>
            <div class="w-1/4">
              {{
                rouletteFetchedData.timeLeft === 'Finished' ? 'Round finished' : `Wheel stoppable in: ${rouletteFetchedData.timeLeft < 0 ? '0' : rouletteFetchedData.timeLeft}`
              }}
            </div>
            <div class="w-1/4">
              Last game: {{ rouletteFetchedData.lastSpace.colour }} {{ rouletteFetchedData.lastSpace.number }}
            </div>
          </div>
          <div class="w-1/12 flex flex-wrap">
            <div @click="rouletteSelectedItem = space.number"
                 v-for="space in rouletteFetchedData.wheel.slice(0, 1)"
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
                 v-for="space in rouletteFetchedData.wheel.slice(1, 37)"
                 class="w-1/6 p-1">
              <div class="h-24 flex cursor-pointer"
                   :class="`text-${rouletteSelectedItem === space.number ? 'brown' : 'yellow'} bg-${rouletteSelectedItem === space.number ? 'white' : space.colour}`">
                <p class="m-auto">
                  {{ space.number }}
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
            <div @click="rouletteSelectedItem = (Math.floor(Math.random() * 37)).toString()" class="w-full p-1">
              <div class="h-full flex cursor-pointer"
                   :class="`text-${rouletteSelectedItem === 'random' ? 'brown' : 'yellow'} bg-${rouletteSelectedItem === 'random' ? 'white' : 'yellow'}`">
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
    <div v-if="rouletteDefaultView === 'high' && rouletteMounted" class="flex flex-wrap">
      <div class="w-full flex">
        <div class="w-2/3 px-8 mx-auto">
          <!--      setAllowance-->
          <div class="flex flex-wrap">
            <small class="w-full text-center">
              Current allowance: {{ allowance.rouletteHigh }} XYA
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
                class="w-full rounded-none border border-yellow bg-transparent hover:bg-yellow hover:text-brown px-4 py-2 min-h-12 mb-4"
                @click="rouletteDefaultView = 'low'">
          New kids table ( 1 - 50 )
        </button>

        <!--      mediumTable-->
        <button type="button"
                :class="rouletteDefaultView === 'medium' ? 'bg-yellow text-brown' : 'bg-transparent text-yellow'"
                class="w-full rounded-none border border-yellow bg-transparent hover:bg-yellow hover:text-brown px-4 py-2 min-h-12 mb-4"
                @click="rouletteDefaultView = 'medium'">
          Regular table ( 50 - 1000 )
        </button>

        <!--      highTable-->
        <button type="button"
                :class="rouletteDefaultView === 'high' ? 'bg-yellow text-brown' : 'bg-transparent text-yellow'"
                class="w-full rounded-none border border-yellow bg-transparent hover:bg-yellow hover:text-brown px-4 py-2 min-h-12 mb-4"
                @click="rouletteDefaultView = 'high'">
          High stakes table ( 1000 - 15000 )
        </button>

        <br>
        <br>
        <div class="flex flex-wrap">
          <img class="w-5/6 mx-auto" src="/images/ui/roulette.png" alt="Roulette table">

          <div class="w-full" v-if="rouletteFetchedData.timeLeft !== 'Finished'">
            <p>Feel powerful! Be the one to stop the wheel!</p>
            <button v-if="rouletteFetchedData.timeLeft > 0" type="button"
                    class="w-full rounded-none border border-yellow bg-transparent px-4 py-2 min-h-12 mb-4 mt-4 mx-1">
              <span>Wait for the timer to end... {{
                  rouletteFetchedData.timeLeft === 'Finished' ? 'Round finished' : `${rouletteFetchedData.timeLeft < 0 ? '0' : rouletteFetchedData.timeLeft}`
                }}</span>
            </button>
            <button v-else type="button"
                    class="w-full rounded-none border border-yellow bg-transparent hover:bg-yellow hover:text-brown px-4 py-2 min-h-12 mb-4 mt-4 mx-1"
                    @click="spinWheel()">
              <span v-if="rouletteLoading.spinWheel">Stopping wheel... </span>
              <span v-else>Stop wheel after placing bet! </span>
              <i v-if="rouletteLoading.spinWheel" class="fas fa-cog fa-spin"></i>
            </button>
          </div>
        </div>


        <div v-if="rouletteMounted && rouletteFetchedData.currentRound.length > 0" class="flex flex-wrap mt-4">
          <div class="w-full">
            <span class="text-xl" v-if="rouletteFetchedData.currentRound.length > 0">Current round bets: </span><br>
            <div v-if="bet.type === 'straight'" v-for="bet in rouletteFetchedData.currentRound">
              {{ bet.player }} <br> has bet {{ bet.betSize }} XYA on number {{ bet.spaceNumber }}
            </div>
            <div v-if="bet.type === 'outside'" v-for="bet in rouletteFetchedData.currentRound">
              {{ bet.player }} <br> has bet {{ bet.betSize }} XYA on {{ bet.betType }}
            </div>
          </div>
        </div>
        <br>
        <hr v-if="rouletteMounted">
        <br>
        <div v-if="rouletteMounted && rouletteFetchedData.lastWinners.length > 0" class="flex flex-wrap">
          <div class="w-full mt-4">
            <span class="text-xl">
              Last rounds winners: <br>
            </span>
            <div v-for="bet in rouletteFetchedData.lastWinners">
              {{ bet.player }} has won {{ bet.winnings }} XYA
            </div>
          </div>
        </div>
        <div v-if="rouletteMounted && rouletteFetchedData.lastWinners.length === 0" class="flex flex-wrap">
          <div class="w-full mt-4">
            <span class="text-xl">
              Last rounds winners: <br>
            </span>
            No winners last round.
          </div>
        </div>
        <br>
        <hr v-if="rouletteMounted && rouletteFetchedData.lastWinners.length > 0">
        <br>
        <div v-if="rouletteMounted && rouletteFetchedData.previousRound.length > 0" class="flex flex-wrap">
          <div class="w-full">
            <span class="text-xl"
                  v-if="rouletteFetchedData.previousRound.length > 0">Last round winners bets: </span><br>
            <div v-if="bet.type === 'straight'" v-for="bet in rouletteFetchedData.previousRound">
              {{ bet.player }} <br> had bet {{ bet.betSize }} XYA on number {{ bet.spaceNumber }}
            </div>
            <div v-if="bet.type === 'outside'" v-for="bet in rouletteFetchedData.previousRound">
              {{ bet.player }} <br> had bet {{ bet.betSize }} XYA on {{ bet.betType }}
            </div>
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

          <div class="w-full 2xl:w-3/4 flex mt-8 p-1">
            <div class="w-1/6">
              <button type="button"
                      :class="rouletteBetAmount === '1000000000000000000000' ? 'bg-yellow text-brown' : 'bg-transparent text-yellow'"
                      class="rounded-none border border-yellow hover:bg-yellow hover:text-brown px-4 py-2 min-h-12"
                      @click="rouletteBetAmount = '1000000000000000000000'">
                1000 XYA
              </button>
            </div>
            <div class="w-1/6">
              <button type="button"
                      :class="rouletteBetAmount === '2500000000000000000000' ? 'bg-yellow text-brown' : 'bg-transparent text-yellow'"
                      class="rounded-none border border-yellow hover:bg-yellow hover:text-brown px-4 py-2 min-h-12"
                      @click="rouletteBetAmount = '2500000000000000000000'">
                2500 XYA
              </button>
            </div>
            <div class="w-1/6">
              <button type="button"
                      :class="rouletteBetAmount === '5000000000000000000000' ? 'bg-yellow text-brown' : 'bg-transparent text-yellow'"
                      class="rounded-none border border-yellow bg-transparent hover:bg-yellow hover:text-brown px-4 py-2 min-h-12"
                      @click="rouletteBetAmount = '5000000000000000000000'">
                5000 XYA
              </button>
            </div>
            <div class="w-1/6">
              <button type="button"
                      :class="rouletteBetAmount === '10000000000000000000000' ? 'bg-yellow text-brown' : 'bg-transparent text-yellow'"
                      class="rounded-none border border-yellow bg-transparent hover:bg-yellow hover:text-brown px-4 py-2 min-h-12"
                      @click="rouletteBetAmount = '10000000000000000000000'">
                10000 XYA
              </button>
            </div>
            <div class="w-1/6">
              <button type="button"
                      :class="rouletteBetAmount === '12500000000000000000000' ? 'bg-yellow text-brown' : 'bg-transparent text-yellow'"
                      class="rounded-none border border-yellow bg-transparent hover:bg-yellow hover:text-brown px-4 py-2 min-h-12"
                      @click="rouletteBetAmount = '12500000000000000000000'">
                12500 XYA
              </button>
            </div>
            <div class="w-1/6">
              <button type="button"
                      :class="rouletteBetAmount === '15000000000000000000000' ? 'bg-yellow text-brown' : 'bg-transparent text-yellow'"
                      class="rounded-none border border-yellow bg-transparent hover:bg-yellow hover:text-brown px-4 py-2 min-h-12"
                      @click="rouletteBetAmount = '15000000000000000000000'">
                15000 XYA
              </button>
            </div>
          </div>
        </div>

        <div class="flex flex-wrap">
          <div class="w-full flex text-xl mt-7 mb-4">
            <div class="w-1/4">
              XYA Balance: {{ userBalance }}
            </div>
            <div class="w-1/4">
              Round number: {{ rouletteFetchedData.currentRoundNumber }}
            </div>
            <div class="w-1/4">
              {{
                rouletteFetchedData.timeLeft === 'Finished' ? 'Round finished' : `Wheel stoppable in: ${rouletteFetchedData.timeLeft < 0 ? '0' : rouletteFetchedData.timeLeft}`
              }}
            </div>
            <div class="w-1/4">
              Last game: {{ rouletteFetchedData.lastSpace.colour }} {{ rouletteFetchedData.lastSpace.number }}
            </div>
          </div>
          <div class="w-1/12 flex flex-wrap">
            <div @click="rouletteSelectedItem = space.number"
                 v-for="space in rouletteFetchedData.wheel.slice(0, 1)"
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
                 v-for="space in rouletteFetchedData.wheel.slice(1, 37)"
                 class="w-1/6 p-1">
              <div class="h-24 flex cursor-pointer"
                   :class="`text-${rouletteSelectedItem === space.number ? 'brown' : 'yellow'} bg-${rouletteSelectedItem === space.number ? 'white' : space.colour}`">
                <p class="m-auto">
                  {{ space.number }}
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
            <div @click="rouletteSelectedItem = (Math.floor(Math.random() * 37)).toString()" class="w-full p-1">
              <div class="h-full flex cursor-pointer"
                   :class="`text-${rouletteSelectedItem === 'random' ? 'brown' : 'yellow'} bg-${rouletteSelectedItem === 'random' ? 'white' : 'yellow'}`">
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

    <div v-if="!rouletteMounted" class="flex w-full h-full py-24">
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
          {{
            error === 'execution reverted: ERC20: transfer amount exceeds allowance' ? 'Transfer amount exceeds allowance, please approve an appropriate amount.' : error
          }}

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

import wallet from "../../../../../plugins/wallet";
import Freyala from "../../../../../plugins/artifacts/freyala.json";
import RouletteLow from "../../../../../plugins/artifacts/roulettelow.json";
import RouletteMedium from "../../../../../plugins/artifacts/roulettemedium.json";
import RouletteHigh from "../../../../../plugins/artifacts/roulettehigh.json";
import {initWeb3} from "../../../../../plugins/initWeb3"

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
      rouletteMediumContract: {},
      rouletteMounted: false,
      rouletteInterval: undefined,

      rouletteBetAmount: '',
      rouletteSelectedItem: undefined,
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
    this.rouletteLowContract = new ethers.Contract(RouletteLow.address, RouletteLow.abi, this.metaMaskWallet.signer)
    this.rouletteMediumContract = new ethers.Contract(RouletteMedium.address, RouletteMedium.abi, this.metaMaskWallet.signer)
    this.rouletteHighContract = new ethers.Contract(RouletteHigh.address, RouletteHigh.abi, this.metaMaskWallet.signer)

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
    rouletteDefaultView() {
      this.fetchRouletteData()
    },
    async metaMaskWallet() {
      this.mainContract = new ethers.Contract(Freyala.address, Freyala.abi, this.metaMaskWallet.signer)
      this.rouletteMediumContract = new ethers.Contract(RouletteMedium.address, RouletteMedium.abi, this.metaMaskWallet.signer)
      this.rouletteHighContract = new ethers.Contract(RouletteHigh.address, RouletteHigh.abi, this.metaMaskWallet.signer)
    }
  },
  methods: {
    ...mapActions([
      'setFavourite'
    ]),
    async fetchRouletteData() {
      if (document.hasFocus()) {
        if (this.rouletteDefaultView === 'low') {
          const [currentRoundData, previousResultData, lastSpaceData, returnWheelData, roundStartedAtData] = await Promise.all([
            this.rouletteLowContract.getCurrentRound(),
            this.rouletteLowContract.getPreviousRoundResult(),
            this.rouletteLowContract.lastSpace(),
            this.rouletteLowContract.returnWheel(),
            this.rouletteLowContract.roundStartedAt()
          ])

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
        }

        if (this.rouletteDefaultView === 'medium') {
          const [currentRoundData, previousResultData, lastSpaceData, returnWheelData, roundStartedAtData] = await Promise.all([
            this.rouletteMediumContract.getCurrentRound(),
            this.rouletteMediumContract.getPreviousRoundResult(),
            this.rouletteMediumContract.lastSpace(),
            this.rouletteMediumContract.returnWheel(),
            this.rouletteMediumContract.roundStartedAt()
          ])

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
        }

        if (this.rouletteDefaultView === 'high') {
          const [currentRoundData, previousResultData, lastSpaceData, returnWheelData, roundStartedAtData] = await Promise.all([
            this.rouletteHighContract.getCurrentRound(),
            this.rouletteHighContract.getPreviousRoundResult(),
            this.rouletteHighContract.lastSpace(),
            this.rouletteHighContract.returnWheel(),
            this.rouletteHighContract.roundStartedAt()
          ])

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
        }
      }
    },

    // ROULETTE
    // CALL DATA
    async currentBets() {
      this.rouletteLoading.currentBets = true

      if (this.rouletteDefaultView === 'low') {
        this.rouletteFetchedData.currentBets = await this.rouletteLowContract.currentBets()
      }

      if (this.rouletteDefaultView === 'medium') {
        this.rouletteFetchedData.currentBets = await this.rouletteMediumContract.currentBets()
      }

      if (this.rouletteDefaultView === 'high') {
        this.rouletteFetchedData.currentBets = await this.rouletteHighContract.currentBets()
      }

      this.rouletteLoading.currentBets = false
    },
    async currentBetsByAddress(address) {
      this.rouletteLoading.currentBetsByAddress = true

      if (this.rouletteDefaultView === 'low') {
        this.rouletteFetchedData.currentBetsByAddress = await this.rouletteLowContract.currentBetsByAddress(address)
      }

      if (this.rouletteDefaultView === 'medium') {
        this.rouletteFetchedData.currentBetsByAddress = await this.rouletteMediumContract.currentBetsByAddress(address)
      }

      if (this.rouletteDefaultView === 'high') {
        this.rouletteFetchedData.currentBetsByAddress = await this.rouletteHighContract.currentBetsByAddress(address)
      }

      this.rouletteLoading.currentBetsByAddress = false
    },
    async lastSpace() {
      this.rouletteLoading.lastSpace = true

      if (this.rouletteDefaultView === 'low') {
        this.rouletteFetchedData.lastSpace = await this.rouletteLowContract.lastSpace()
      }

      if (this.rouletteDefaultView === 'medium') {
        this.rouletteFetchedData.lastSpace = await this.rouletteMediumContract.lastSpace()
      }

      if (this.rouletteDefaultView === 'high') {
        this.rouletteFetchedData.lastSpace = await this.rouletteHighContract.lastSpace()
      }

      this.rouletteLoading.lastSpace = false
    },
    async returnWheel() {
      this.rouletteLoading.returnWheel = true

      if (this.rouletteDefaultView === 'low') {
        this.rouletteFetchedData.returnWheel = await this.rouletteLowContract.returnWheel()
      }

      if (this.rouletteDefaultView === 'medium') {
        this.rouletteFetchedData.returnWheel = await this.rouletteMediumContract.returnWheel()
      }

      if (this.rouletteDefaultView === 'high') {
        this.rouletteFetchedData.returnWheel = await this.rouletteHighContract.returnWheel()
      }

      this.rouletteLoading.returnWheel = false
    },
    async roundNumber() {
      this.rouletteLoading.roundNumber = true

      if (this.rouletteDefaultView === 'low') {
        this.rouletteFetchedData.roundNumber = await this.rouletteLowContract.rN()
      }

      if (this.rouletteDefaultView === 'medium') {
        this.rouletteFetchedData.roundNumber = await this.rouletteMediumContract.rN()
      }

      if (this.rouletteDefaultView === 'high') {
        this.rouletteFetchedData.roundNumber = await this.rouletteHighContract.rN()
      }

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

        if (this.rouletteDefaultView === 'low') {
          tx = await this.rouletteLowContract.makeOutsideBet(number, amount)
        }

        if (this.rouletteDefaultView === 'medium') {
          tx = await this.rouletteMediumContract.makeOutsideBet(number, amount)
        }

        if (this.rouletteDefaultView === 'high') {
          tx = await this.rouletteHighContract.makeOutsideBet(number, amount)
        }

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

        if (this.rouletteDefaultView === 'low') {
          tx = await this.rouletteLowContract.makeStraightBet(number, amount)
        }

        if (this.rouletteDefaultView === 'medium') {
          tx = await this.rouletteMediumContract.makeStraightBet(number, amount)
        }

        if (this.rouletteDefaultView === 'high') {
          tx = await this.rouletteHighContract.makeStraightBet(number, amount)
        }

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
        if (this.rouletteDefaultView === 'low') {
          let web3 = await initWeb3()
          const gasPrice = await web3.eth.getGasPrice();

          const rouletteLowContract = await new web3.eth.Contract(RouletteLow.abi, RouletteLow.address);
          await rouletteLowContract.methods.spinWheel().send({
            from: this.metaMaskAccount,
            gasPrice: gasPrice,
            gasLimit: 250000,
            gas: parseFloat((gasPrice * 250000) / Math.pow(10, 9))
          })
        }

        if (this.rouletteDefaultView === 'medium') {
          let web3 = await initWeb3()
          const gasPrice = await web3.eth.getGasPrice();

          const rouletteMediumContract = await new web3.eth.Contract(RouletteMedium.abi, RouletteMedium.address);
          await rouletteMediumContract.methods.spinWheel().send({
            from: this.metaMaskAccount,
            gasPrice: gasPrice,
            gasLimit: 250000,
            gas: parseFloat((gasPrice * 250000) / Math.pow(10, 9))
          })
        }

        if (this.rouletteDefaultView === 'high') {
          let web3 = await initWeb3()
          const gasPrice = await web3.eth.getGasPrice();

          const rouletteHighContract = await new web3.eth.Contract(RouletteHigh.abi, RouletteHigh.address);
          await rouletteHighContract.methods.spinWheel().send({
            from: this.metaMaskAccount,
            gasPrice: gasPrice,
            gasLimit: 250000,
            gas: parseFloat((gasPrice * 250000) / Math.pow(10, 9))
          })
        }

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
        let tx = {}

        if (this.rouletteDefaultView === 'low') {
          tx = await this.mainContract.approve(RouletteLow.address, arg)
        }

        if (this.rouletteDefaultView === 'medium') {
          tx = await this.mainContract.approve(RouletteMedium.address, arg)
        }

        if (this.rouletteDefaultView === 'high') {
          tx = await this.mainContract.approve(RouletteHigh.address, arg)
        }

        await tx.wait(1)

      } catch (err) {
        if (err.code !== 4001) {
          this.error = err.data ? err.data.message : err
          this.$modal.show('error')
        }

        console.error(err);
        this.error = err.data ? err.data.message : err
        this.$modal.show('error')
      }

      this.rouletteLoading.maxAllowance = false
      this.rouletteLoading.allowance = false
      this.rouletteAmountToApprove = 0;
    }
  }
}
</script>