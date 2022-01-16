<template>
  <section class="flex p-4 mx-auto overflow-y-hidden md:p-16 my-16 md:my-0 lg:px-32 pig-tamagotchi">
    <div class="screen rounded-2xl overflow-x-hidden w-full bg-light relative">
      <!-- MENU -->
      <div v-on:click='showPiggyCooldown = false' v-if='showPiggyCooldown'
        class='absolute top-0 bottom-0 right-0 left-0 bg-opacity-20 bg-dark'>

      </div>
      <div v-on:click='showPiggyTutorial = false' v-if='showPiggyTutorial'
        class='absolute top-0 bottom-0 right-0 left-0 bg-opacity-20 w-full h-full z-50 bg-dark'>

      </div>
      <transition name='pop-in'>
        <div v-on:click='closeModal' v-if='showPiggyTutorial'
          class='absolute modal-overlay flex items-center justify-center top-0 bottom-0 right-0 left-0 bg-opacity-20 w-full h-full z-50 '>
          <div
            class='sm:w-7/10 w-9/10 flex flex-col items-start justify-center my-8 h-auto sm:pb-0 pb-3 bg-white rounded-2xl piggy-modal'>
            <div
              style='background-image: url("/pigs/snout.svg"); background-repeat: no-repeat; background-size: contain; background-position: center; z-index: 0'
              class='opacity-50 absolute top-0 bottom-0 left-0 m-4 right-0'>

            </div>
            <template v-if='tutorialPage === 1'>
              <div class='w-full flex flex-row justify-center items-center z-50'>
                <h2 class='h-auto w-full ml-4 text-center mt-4 text-xl pink mb-4 z-10'>Tutorial</h2>
                <i v-on:click='showPiggyTutorial = false'
                  class='text-2xl scale-anim opacity-50 hover:opacity-100 pink cursor-pointer text-white ml-auto mr-4 fa fa-close'></i>
              </div>
              <div class='h-full w-full flex flex-col justify-start items-start z-10'>
                <p class='text-light px-4 h-2/7 mb-2 sm:text-base text-sm text-center font-bold'
                  style='font-family: "Maven Pro";color: #3C2F35'>
                  In order to start playing, you need to import your piggies inside the tamagotchi.
                  <br /><br />
                  Once imported, you can start taking care of your piggy. But, be careful! A toaster piggy's needs are
                  not easy to fulfill.
                </p>
              </div>
            </template>
            <template v-else-if='tutorialPage === 2'>
              <div class='w-full flex flex-row justify-center items-center z-50'>
                <h2 class='h-auto w-full ml-4 text-center mt-4 text-xl pink mb-4 z-10'>Attributes</h2>
                <i v-on:click='showPiggyTutorial = false'
                  class='text-2xl scale-anim opacity-50 hover:opacity-100 pink cursor-pointer text-white ml-auto mr-4 fa fa-close'></i>
              </div>
              <div class='h-full w-full flex flex-col justify-start items-start z-10'>
                <p class='text-light px-4 h-2/7 mb-2 sm:text-base text-sm text-center font-bold'
                  style='font-family: "Maven Pro";color: #3C2F35'>
                  Each piggy has 4 main attributes:<br /> Hunger, Happiness, Hygiene and Energy.
                  <br /><br />
                  In order to keep your piggy alive and well, you need to ensure that none of these attributes deplete
                  to
                  a critical point.
                </p>
              </div>
            </template>
            <template v-else-if='tutorialPage === 3'>
              <div class='w-full flex flex-row justify-center items-center z-50'>
                <h2 class='h-auto w-full ml-4 text-center mt-4 text-xl pink mb-4 z-10'>Hunger</h2>
                <i v-on:click='showPiggyTutorial = false'
                  class='text-2xl scale-anim opacity-50 hover:opacity-100 pink cursor-pointer text-white ml-auto mr-4 fa fa-close'></i>
              </div>
              <div class='h-full w-full flex flex-col justify-start items-start z-10'>
                <p class='text-light px-4 h-2/7 mb-2 sm:text-base text-sm text-center font-bold'
                  style='font-family: "Maven Pro";color: #3C2F35'>
                  You can feed your piggy for free once every 12 hours. If you wish to do so more often, you have to pay
                  a small COINKX fee!
                  <br /><br />
                  Hunger fully depletes in 24 hours.
                  <br /><br />
                  If Hunger drops below 0%, the piggy will die.
                  <br /><br />
                  Whenever the piggy eats, it loses 15% Hygiene.
                </p>
              </div>
            </template>
            <template v-else-if='tutorialPage === 4'>
              <div class='w-full flex flex-row justify-center items-center z-50'>
                <h2 class='h-auto w-full ml-4 text-center mt-4 text-xl pink mb-4 z-10'>Happiness</h2>
                <i v-on:click='showPiggyTutorial = false'
                  class='text-2xl scale-anim opacity-50 hover:opacity-100 pink cursor-pointer text-white ml-auto mr-4 fa fa-close'></i>
              </div>
              <div class='h-full w-full flex flex-col justify-start items-start z-10'>
                <p class='text-light px-4 h-2/7 mb-2 sm:text-base text-sm text-center font-bold'
                  style='font-family: "Maven Pro";color: #3C2F35'>
                  You can play with your piggy for free once every 12 hours. If you wish to do so more often, you have to
                  pay a small COINKX fee!
                  <br /><br />
                  Happiness fully depletes in 24 hours
                  <br /><br />
                  If the Happiness drops below 0%, the piggy will die.
                  <br /><br />
                  Whenever the piggy plays, it loses 15% Energy.
                </p>
              </div>
            </template>
            <template v-else-if='tutorialPage === 5'>
              <div class='w-full flex flex-row justify-center items-center z-50'>
                <h2 class='h-auto w-full ml-4 text-center mt-4 text-xl pink mb-4 z-10'>Hygiene</h2>
                <i v-on:click='showPiggyTutorial = false'
                  class='text-2xl scale-anim opacity-50 hover:opacity-100 pink cursor-pointer text-white ml-auto mr-4 fa fa-close'></i>
              </div>
              <div class='h-full w-full flex flex-col justify-start items-start z-10'>
                <p class='text-light px-4 h-2/7 mb-2 sm:text-base text-sm text-center font-bold'
                  style='font-family: "Maven Pro";color: #3C2F35'>
                  You can wash your piggy for free once every 16 hours. If you wish to do so more often, you have to pay
                  a small COINKX fee!
                  <br /><br />
                  Hygiene fully depletes in 96 hours.
                  <br /><br />
                  If Hygiene drops below 0%, the piggy will die.
                </p>
              </div>
            </template>
            <template v-else-if='tutorialPage === 6'>
              <div class='w-full flex flex-row justify-center items-center z-50'>
                <h2 class='h-auto w-full ml-4 text-center mt-4 text-xl pink mb-4 z-10'>Energy</h2>
                <i v-on:click='showPiggyTutorial = false'
                  class='text-2xl scale-anim opacity-50 hover:opacity-100 pink cursor-pointer text-white ml-auto mr-4 fa fa-close'></i>
              </div>
              <div class='h-full w-full flex flex-col justify-start items-start z-10'>
                <p class='text-light px-4 h-2/7 mb-2 sm:text-base text-sm text-center font-bold'
                  style='font-family: "Maven Pro";color: #3C2F35'>
                  You can put your piggy to sleep for 24 hours. While the piggy sleeps, its energy will
                  slowly replenish
                  back to 100%.
                  <br /><br />
                  You can't wake or interact with the piggy during this time.
                  <br /><br />
                  Energy fully depletes in 24 hours.
                  <br /><br />
                  If Energy drops below 0%, the piggy will die.
                  <br /><br />
                  While the piggy sleeps, Hunger and Happiness will drain at a 25% reduced rate, but it will lose 3.5%
                  Hygiene per hour.
                </p>
              </div>
            </template>
            <template v-else-if='tutorialPage === 7'>
              <div class='w-full flex flex-row justify-center items-center z-50'>
                <h2 class='h-auto w-full ml-4 text-center mt-4 text-xl pink mb-4 z-10'>Play To Earn 1</h2>
                <i v-on:click='showPiggyTutorial = false'
                  class='text-2xl scale-anim opacity-50 hover:opacity-100 pink cursor-pointer text-white ml-auto mr-4 fa fa-close'></i>
              </div>
              <div class='h-full w-full flex flex-col justify-start items-start z-10'>
                <p class='text-light px-4 h-2/7 mb-2 sm:text-base text-sm text-center font-bold'
                  style='font-family: "Maven Pro";color: #3C2F35'>
                  An epoch passes every 3 days, which means that a small % of all the COINKX gathered in the reward
                  pool is split amongst the alive and registered piggies.
                  <br /><br />
                  Each piggy has a small share of the reward pool. This is based 50% on the current Age of the pig, and
                  50% on the rarity and body color.
                  <br /><br />
                  <span class='pink'>
                    Registering a piggy near the end of an epoch will guarantee more coinks!
                  </span>
                  <br /><br />
                </p>
              </div>
            </template>
            <template v-else-if='tutorialPage === 8'>
              <div class='w-full flex flex-row justify-center items-center z-50'>
                <h2 class='h-auto w-full ml-4 text-center mt-4 text-xl pink mb-4 z-10'>Play To Earn 2</h2>
                <i v-on:click='showPiggyTutorial = false'
                  class='text-2xl scale-anim opacity-50 hover:opacity-100 pink cursor-pointer text-white ml-auto mr-4 fa fa-close'></i>
              </div>
              <div class='h-full w-full flex flex-col justify-start items-start z-10'>
                <p class='text-light px-4 h-2/7 mb-2 sm:text-base text-sm text-center font-bold'
                  style='font-family: "Maven Pro";color: #3C2F35'>
                  In order to be eligible for these rewards, you have to 'Register' your piggies to the current epoch.
                  <br /><br />
                  Open up the 'Piggy Bank' by pressing on the wallet icon, and register or claim the pending rewards for
                  each of your piggies.
                  <br /><br />
                  When an epoch ends, you or any other player must press on the 'End Epoch Button' in order to
                  distribute any pending rewards to each piggy holder!
                  <br /><br />
                </p>
              </div>
            </template>
            <template v-else-if='tutorialPage === 9'>
              <div class='w-full flex flex-row justify-center items-center z-50'>
                <h2 class='h-auto w-full ml-4 text-center mt-4 text-xl pink mb-4 z-10'>Good luck!</h2>
                <i v-on:click='showPiggyTutorial = false'
                  class='text-2xl scale-anim opacity-50 hover:opacity-100 pink cursor-pointer text-white ml-auto mr-4 fa fa-close'></i>
              </div>
              <div class='h-full w-full flex flex-col justify-start items-start z-10'>
                <p class='text-light px-4 h-2/7 mb-2 sm:text-base text-sm text-center font-bold'
                  style='font-family: "Maven Pro";color: #3C2F35'>
                  For more information about the tamagotchi, please refer to our detailed document on game mechanics
                  here: <br /><br /><a class='pink underline' target='_blank'
                    href='https://docs.freyala.com/freyala/cryptopigs'>Piggy
                    Docs</a>
                  <br /><br />
                </p>
              </div>
            </template>
            <div class='w-full h-20 z-50 flex justify-center items-center'>
              <p v-bind:class='{"opacity-50": tutorialPage - 1 < 1}'
                v-on:click='tutorialPage = Math.max(1, tutorialPage - 1)'
                class=' sm:text-base text-xs h-12 flex items-center justify-center mx-2 w-4/10 rounded-2xl press-anim pink-border-bottom cursor-pointer hover:shadow-2xl bg-pink text-white border mt-2'>
                Previous
              </p>
              <p v-bind:class='{"opacity-50": tutorialPage + 1 > tutorialPages}'
                v-on:click='tutorialPage = Math.min(tutorialPages, tutorialPage + 1)'
                class=' sm:text-base text-xs h-12 flex items-center justify-center mx-2 w-4/10 rounded-2xl press-anim pink-border-bottom cursor-pointer hover:shadow-2xl bg-pink text-white border mt-2'>
                Next
              </p>
            </div>
          </div>
        </div>
      </transition>

      <transition name='pop-in'>
        <div v-on:click='closeModal' v-if='showPiggyCooldown'
          class='absolute modal-overlay flex items-center justify-center top-0 bottom-0 right-0 left-0 bg-opacity-20 w-full h-full z-50 '>
          <div
            class='sm:w-7/10 w-9/10 flex flex-col items-start justify-center h-auto sm:pb-0 pb-3 bg-white rounded-2xl piggy-modal'>
            <div
              style='background-image: url("/pigs/snout.svg"); background-repeat: no-repeat; background-size: contain; background-position: center; z-index: 0'
              class='opacity-50 absolute top-0 bottom-0 left-0 m-4 right-0'>

            </div>
            <div class='w-full flex flex-row justify-center items-center z-50'>
              <h2 class='h-auto w-full ml-4 text-center mt-4 text-lg sm:text-xl pink mb-4 z-10'>Oink! Oink!</h2>
              <i v-on:click='showPiggyCooldown = false'
                class='text-2xl scale-anim opacity-50 hover:opacity-100 pink cursor-pointer text-white ml-auto mr-4 fa fa-close'></i>
            </div>
            <div class='h-full w-full flex flex-col justify-center items-center z-10'>
              <p class='text-light px-4 h-2/7 mb-2 sm:text-base text-sm text-center font-bold'
                style='font-family: "Maven Pro";color: #3C2F35'>
                {{ piggyActionMessage }}
              </p>
              <p class='w-full h-5 opacity-50 text-center pink'>or</p>
              <p style='font-family: "Maven Pro";color: #3C2F35' class='font-bold'>
                {{ piggyLastActionMessage }}
              </p>
              <img style='' class='bg-white rounded-2xl shadow-2xl my-3' width='72px'
                v-bind:src="'/pigs/' + selectedAttribute.name + '.svg'" />
              <p v-on:click='usePiggyPaidAction(currentPig, selectedAttribute)'
                class='sm:text-base text-xs text-center sm:w-4/10 w-5/10 rounded-2xl press-anim pink-border-bottom cursor-pointer hover:shadow-2xl bg-pink text-white border my-2'>
                {{ selectedAttribute.paidPowerUp.price / (10 ** 18) }} COINKX
              </p>
              <a href='https://game.defikingdoms.com/#/marketplace?outputCurrency=0x7ca9c1d0bb11f1b7c31ee5538d7a75aaf2d8e2fc'
                target="_blank" class='opacity-75 sm:text-lg text-sm pink'>
                Buy COINKX!
              </a>
            </div>
          </div>
        </div>
      </transition>

      <div v-on:click='showPiggyAlertDialog = false' v-if='showPiggyAlertDialog'
        class='absolute top-0 bottom-0 right-0 left-0 bg-opacity-20 w-full h-full z-50 bg-dark'>

      </div>
      <transition name='pop-in'>
        <div v-on:click='closeModal' v-if='showPiggyAlertDialog'
          class='absolute modal-overlay flex items-center justify-center top-0 bottom-0 right-0 left-0 bg-opacity-20 w-full h-full z-50'>
          <div
            class='sm:w-7/10 w-9/10 flex flex-col items-start justify-center h-auto py-4 bg-white rounded-2xl piggy-modal'>
            <div
              style='background-image: url("/pigs/snout.svg"); background-repeat: no-repeat; background-size: contain; background-position: center; z-index: 0'
              class='opacity-50 absolute top-0 bottom-0 left-0 m-4 right-0'>

            </div>
            <div class='w-full flex flex-row justify-center z-50'>
              <h2 class='h-auto w-full ml-4 text-center text-xl pink mb-4 z-10'>Piggy Panel!</h2>
              <i v-on:click='showPiggyAlertDialog = false'
                class='text-2xl scale-anim opacity-50 hover:opacity-100 pink cursor-pointer text-white ml-auto mr-4 fa fa-close'></i>
            </div>
            <div v-if='showPiggyAllowance' class='h-full w-full flex flex-col justify-start text-center z-10'>
              <template v-if='!piggyAllowance'>
                <p class='text-light px-4 h-2/7 mb-2  sm:text-base text-xs text-center font-bold'
                  style='font-family: "Maven Pro";color: #3C2F35'>
                  Approve the 'COINKX' contract in order to purchase piggy powerups.
                </p>
                <p v-on:click='setTokenAllowance(999999999999.9999)'
                  class=' sm:text-base text-xs w-6/10 mx-auto rounded-2xl press-anim cursor-pointer py-2 bg-pink pink-border-bottom text-white border mt-2'>
                  Approve COINKX </p>
              </template>
              <template v-else>
                <p class='text-light px-4 h-2/7 mb-2 sm:text-base text-xs text-center font-bold'
                  style='font-family: "Maven Pro";color: #3C2F35'>
                  Disable the 'COINKX' contract.
                </p>
                <p v-on:click='setTokenAllowance(0)'
                  class=' sm:text-base text-xs w-6/10 mx-auto rounded-2xl press-anim cursor-pointer py-2 bg-pink pink-border-bottom text-white border mt-2'>
                  Disable COINKX </p>
              </template>
            </div>
            <div v-else-if='showPiggyImport' class='h-full w-full flex flex-col justify-start text-center z-10'>
              <p class='text-light px-4 h-2/7 mb-2 text-base text-center font-bold'
                style='font-family: "Maven Pro";color: #3C2F35'>
                Import your piggy in the Tamagotchi to start playing!
              </p>
              <p v-on:click='importPiggy(selectedPig, true)'
                class='text-base w-6/10 mx-auto rounded-2xl text-center press-anim cursor-pointer py-2 bg-pink pink-border-bottom text-white border mt-2'>
                Import #{{ selectedPig.id }} </p>
            </div>
            <div v-else-if='showPiggyName' class='h-full w-full flex flex-col justify-start text-center z-10'>
              <p class='text-light px-4 h-2/7 mb-3 text-base text-center font-bold'
                style='font-family: "Maven Pro";color: #3C2F35'>
                Name your piggy:
              </p>
              <input v-model='newPiggyName' type='text' class='piggy-input w-8/10 rounded-xl h-10 mx-auto p-4'
                style='background-color: white; border: 1px solid pink' />

              <div class='w-full h-full flex flex-row'>
                <p v-on:click='hideAllPiggyDialogs()'
                  class='sm:text-base text-xs w-3/10 ml-auto mr-2 rounded-2xl text-center press-anim cursor-pointer py-2 bg-pink pink-border-bottom text-white border mt-2'>
                  Cancel</p>
                <p v-on:click='setPiggyName(currentPig)'
                  class='sm:text-base text-xs w-3/10 mr-8 rounded-2xl text-center press-anim cursor-pointer py-2 bg-pink pink-border-bottom text-white border mt-2'>
                  Save</p>
              </div>
            </div>
          </div>
        </div>
      </transition>


      <div v-if='piggyLoading' class='absolute top-0 bottom-0 left-0 right-0 flex flex-col justify-center items-center'
        style='z-index: 9999; background-color: rgba(0,0,0,0.5)'>
        <img class='fa-spin' width="68px" src='/pigs/snout.svg' />
        <h2 class='mt-3 text-2xl text-white'>Loading...</h2>
      </div>

      <div v-on:click='showPiggyMenu = false' v-if='showPiggyMenu'
        class='absolute top-0 bottom-0 right-0 left-0 bg-opacity-20 w-full h-full z-50 bg-dark'>
      </div>

      <transition name='menu'>
        <PiggyDividends :piggyList='piggyList' :tamagotchiContract='tamagotchiContract' v-if='showPiggyBank'
          v-on:close='showPiggyBank = false' v-on:error='handleError($event)'>

        </PiggyDividends>
      </transition>

      <transition name='menu'>
        <div v-if='showPiggyMenu' class='piggie-menu-container top-0 bottom-0 sm:w-7/10 w-9/10' style=''>
          <div class='w-full flex flex-col justify-center my-4'>
            <div class='w-full flex flex-row justify-center items-center'>
              <h2 class='h-auto w-full ml-4 text-center mt-2 sm:text-2xl text-xl text-white mb-4 z-10'>Your Piggies</h2>
              <div class='cursor-pointer '>
                <i v-on:click='showPiggyMenu = false'
                  class='sm:text-2xl text-xl scale-anim opacity-50 hover:opacity-100 text-white ml-auto mr-4 fa fa-close'></i>
              </div>
            </div>
            <a href='https://cryptopigs.one/#/' target="_blank">
              <div class='w-full flex flex-row justify-center items-center'>
                <h2
                  class='h-auto w-full ml-4 text-center mt-2 sm:text-xl text-lg opacity-75 hover:opacity-100 text-white mb-4 z-10'>
                  Adopt a piggy!</h2>
              </div>
            </a>


            <div
              class='w-8/10 h-32 my-2 py-2 mx-auto rounded-xl pink-border-bottom scale-anim bg-white flex flex-col justify-center text-center items-center pink sm:text-lg text-sm cursor-pointer hover:opacity-100'
              v-for='piggy in piggyList' :key='piggy.id' v-on:click='selectPiggy(piggy)'>
              <p class='w-full h-1/5'>Pig #{{piggy.id}}</p>
              <div class='sm:w-4/10 w-5/10 mt-2 h-4/5 relative flex items-center'>
                <img v-for='(attribute, index) in piggy.attributes' :key='index' class='absolute -top-6'
                  v-bind:src='getSimplePiggyAttributeImage(attribute)' alt="Pig">
              </div>
            </div>
          </div>
        </div>
      </transition>

      <!-- BACKGROUND -->
      <div class="p-8 flex h-3/5 z-0 absolute top-0 w-full bg-pig-sky">
      </div>
      <div style='background-image: url("pigs/ground_purple.png");' class='w-full h-3/5 z-0 absolute bottom-0 bg-cover'>
      </div>
      <div v-bind:style='getPiggyBackground(currentPig)' class='w-full h-3/5 z-10 absolute bottom-0 bg-cover'>
      </div>
      <img class='absolute z-25' v-for='(cloud, index) in piggyClouds' :key='index'
        v-bind:style='{"top": cloud.top + "px", "left": cloud.left + "px", opacity: cloud.opacity}'
        v-bind:src='cloud.img' />
      <img class='absolute z-10 right-2 w-7/10' style='top: 40%' v-bind:src='getPigstyColor(currentPig)' />

      <div class="flex flex-wrap p-4 md:p-8 z-10 relative h-full">

        <!-- NAVBAR -->
        <div class='absolute mx-auto h-20 z-50 flex xs:w-9/10 w-9/10 top-4'>

          <div v-on:click='goToRoute("world-map")'
            class='cursor-pointer w-auto h-full w-auto xs:mr-2 mr-1 piggie-menu-btn'>
            <img class='h-full' src='/pigs/back_button.svg' />
          </div>
          <div v-on:click='showPiggyMenu = true'
            class='cursor-pointer ml-auto w-auto sm:mr-5 mr-1 w-auto h-full piggie-menu-btn'>
            <img class='h-full' src='/pigs/piggies_button.svg' />
          </div>
          <div v-on:click='showPiggyBank = true'
            class='cursor-pointer w-auto sm:mr-5 mr-1 w-auto h-full piggie-menu-btn'>
            <img class='h-full' src='/pigs/wallet_button.svg' />
          </div>

          <a class='cursor-pointer w-auto sm:mr-5 mr-1 h-full piggie-menu-btn' target='_blank'
            href='/#/marketplace?market=0xe5fd335819edb8da8395f8ec48beca747a0790ab'>
            <img class='h-full' src='/pigs/market_button.svg' />
          </a>
          <div v-on:click='showPiggySettingsModal()' class='cursor-pointer w-auto sm:mr-1 mr-1 h-full piggie-menu-btn'>
            <img class='h-full' src='/pigs/settings_button.svg' />
          </div>
        </div>

        <div v-show='!piggyDead && piggyActions.eating'
          class='w-full pointer-events-none h-3/5 mt-6 absolute flex items-center justify-center z-50'>
          <img ref='carrot' class='m-auto absolute sm:w-7/10 w-9/10 mr-12 lg:pt-60 pt-48'
            v-bind:src="'/pigs/attributes/' + piggyFood" />
        </div>

        <div v-show='!piggyDead && piggySleeping'
          class='w-full piggy-sleep pointer-events-none h-3/5 mt-6 absolute flex items-center justify-center z-50'>
          <img ref='sleepz' class='m-auto absolute sm:w-7/10 w-9/10 mr-12 lg:pt-60 pt-48'
            src='/pigs/attributes/sleep.png' />
        </div>

        <!-- PIG -->
        <div ref='pig' v-bind:class='{"piggy-idle": !isPiggyBusy && !piggyDead && !piggySleeping}' v-cloak
          v-show='currentPig && showPig' class="w-full h-3/5 mt-14 relative flex items-center justify-center z-25">
          <img v-for='(attribute, index) in selectedPigAttributes' :key='index'
            class="m-auto absolute sm:w-7/10 w-9/10 lg:pt-60 pt-48" v-bind:src='getPiggieAttributeImage(attribute)'
            alt="Pig">
          <img class='m-auto absolute sm:w-7/10 w-9/10 lg:pt-60 pt-48' v-bind:src='getPiggyWashStatus()' />
        </div>

        <div v-on:click='showPiggyMenu = true'
          class='absolute left-0 flex flex-col items-center justify-center w-full opacity-50 hover:opacity-100 cursor-pointer'
          style='top: 50%;' v-if='!currentPig || !showPig'>
          <img width="64px" src='/pigs/snout.svg' />
          <p class='text-2xl text-white'>Select Pig</p>
        </div>

        <div v-on:click='revivePiggy(currentPig)'
          class='absolute sm:py-6 py-2 left-0 flex flex-col rounded-xl items-center justify-center w-full opacity-75 hover:opacity-100 cursor-pointer'
          style='top: 45%; background-color: rgba(0,0,0,0.5)' v-if='showPig && piggyDead'>
          <img width="64px" src='/pigs/snout.svg' />
          <p class='sm:text-2xl text-lg text-white'>Revive Pig</p>
          <p class='sm:text-2xl text-lg text-white'>25 COINKX</p>
        </div>

        <!-- NAME & AGE -->
        <div class='absolute ml-auto sm:h-16 h-12 pres-anim flex w-full left-0 sm:top-32 top-28 z-50'>
          <div style='border: 1px solid #F1609766'
            class='shadow-lg sm:mr-4 sm:ml-auto mx-auto sm:w-6/10 w-9/10 flex items-center justify-center rounded-2xl h-12 bg-white'>
            <h2 title='Change name' v-on:click='showPiggyNameModal()' v-bind:class='getPiggyNameFontSize(piggyName)'
              class='w-7/10 text-center cursor-pointer' style='color: #3C2F35;'>{{ piggyName }}</h2>
            <div class='w-3/10 shadow-lg relative sm:h-14 h-14 bg-black rounded-2xl' style='background-color: #F16097'>
              <div class='flex w-full h-full justify-center'>
                <div
                  class='w-5/10 flex flex-col justify-center items-center cursor-pointer text-white sm:text-2xl text-lg h-full'>
                  <p v-bind:class='{"h-3/5 pt-2": !piggyDead, "h-5/5 mb-1": piggyDead}'> {{ piggyAge }} </p>
                  <p v-if='!piggyDead' class='mb-2 sm:text-base text-xs'>Age</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- HELPFUL BUTTONS -->
        <div class='absolute ml-auto sm:h-16 sm:h-12 h-8 pres-anim flex w-full left-0 sm:top-48 top-44 z-50'>
          <div class='w-auto mr-4 h-full flex ml-auto'>
            <div v-bind:class='{"icon-pulse": piggyFirstTime}' v-on:click='showPiggyTutorialModal()'
              style='border: 1px solid #F1609766'
              class='shadow-lg sm:w-12 w-8 sm:h-12 h-8 mx-2 flex items-center justify-center rounded-2xl bg-white scale-anim cursor-pointer'>
              <p class='fa opacity-75 sm:text-2xl text-lg fa-question pink'></p>
            </div>
            <div style='border: 1px solid #F1609766'
              class='shadow-lg sm:w-12 w-8 sm:h-12 h-8 flex items-center justify-center rounded-2xl mr-2 bg-white scale-anim cursor-pointer'>
              <a href='https://game.defikingdoms.com/#/marketplace?outputCurrency=0x7ca9c1d0bb11f1b7c31ee5538d7a75aaf2d8e2fc'
                target="_blank" class='fa opacity-75 sm:text-2xl text-lg fa-money pink'>

              </a>
            </div>
            <div style='border: 1px solid #F1609766'
              class='shadow-lg sm:w-12 w-8 sm:h-12 h-8 flex items-center justify-center rounded-2xl bg-white scale-anim cursor-pointer'>
              <a href='https://docs.freyala.com/freyala/cryptopigs' target="_blank"
                class='fa opacity-75 sm:text-2xl text-lg fa-book pink'>

              </a>
            </div>
          </div>
        </div>

        <div v-if='piggySleeping'
          class='absolute ml-auto sm:h-16 sm:h-12 h-8 pres-anim flex w-full left-0 sm:top-64 top-56 z-50'>
          <div class='w-auto sm:mr-4 mr-0 sm:text-left text-right mr-4 h-full flex ml-auto'>
            <p class='pink opacity-50'>
              {{ piggySleepingString }}
            </p>
          </div>
        </div>

        <!-- TAMAGOTCHI -->
        <div v-if='piggyAttributes' class="sm:w-9/10 w-full flex md:h-20 xs:h-16 h-16 mb-4 mt-auto pink">
          <PiggyBar class="shadow-lg" v-for='attribute in piggyAtributeList' :key='keys[attribute]'
            v-on:click='usePiggyFreeAction(currentPig, piggyAttributes[attribute])'
            :attribute='piggyAttributes[attribute]'></PiggyBar>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import wallet from "../../plugins/wallet"
  import {
    ethers
  } from "ethers";
  import axios from "axios";
  import {
    mapGetters
  } from "vuex";
  import {
    provideToast
  } from 'vue-toastification';

  import Piggy from "../../plugins/artifacts/frey.json";
  import AttributeManager from "../../plugins/artifacts/piggyAttributeManager.json";
  import PiggyTamagotchi from "../../plugins/artifacts/piggyTamagotchi.json";
  import Token from '../../plugins/artifacts/freyala.json';
  import fromExponential from "from-exponential";

  import PiggyBar from '../../components/Pigs/PiggyBar.vue';
  import PiggyDividends from '../../components/Pigs/PiggyDividends.vue';

  export default {
    name: 'CryptoPigs',
    mixins: [wallet],
    components: {
      PiggyBar,
      PiggyDividends
    },
    setup() {
      provideToast({
        toastClassName: "piggy-toast",

        bodyClassName: ["piggy-toast-body", "piggy-toaster"]
      });
    },
    computed: {
      ...mapGetters([
        'metaMaskAccount',
        'metaMaskWallet'
      ]),

      basePiggyStats() {
        return this.piggyAttributes.filter(c => c.name !== 'Age');
      },

      selectedPigAttributes() {
        if (!this.currentPig) return [];
        return this.currentPig.attributes;
      },
    },
    data() {
      return {
        attributeManagerContract: undefined,
        tamagotchiContract: undefined,
        piggyList: [],
        keys: {
          Hunger: 0,
          Happiness: 50,
          Hygiene: 100,
          Energy: 150,
          piggyAttributes: 0,
          piggyBackground: 500,
        },
        currentPig: undefined,
        selectedPig: undefined,

        piggyNone: '/pigs/attributes/none.png',
        piggyName: "No Piggy",
        newPiggyName: "",
        piggyAge: 0,
        piggyRevivalPrice: 0,
        piggyDead: false,
        piggyCloudsHandler: undefined,
        piggyClouds: [],
        piggyStats: [],
        piggyAttributes: undefined,
        piggyAtributeList: [],
        piggyLoading: false,
        piggyInterval: undefined,
        piggyAllowance: false,
        selectedAttribute: undefined,
        piggyLastActionMessage: "",
        piggyLastActionItem: "",
        piggyLastAttribute: undefined,
        piggySleeping: false,
        piggySleepingString: "",
        isPiggyBusy: false,
        piggyActions: {
          eating: false,
          playing: false,
          washing: false,
          sleeping: false
        },
        piggyFood: 'carrot.png',
        piggyActionMessage: 'You must wait a while before performing this action again.',
        piggyFirstTime: false,

        showPig: false,
        showPiggyAlertDialog: false,
        showPiggyCooldown: false,
        showPiggyAllowance: false,
        showPiggyImport: false,
        showPiggyName: false,
        showPiggyMenu: false,
        showPiggyBank: false,
        showPiggyTutorial: false,

        CONSTANTS: {
          CARROT_FOOD: 'carrot.png',
          TURNIP_FOOD: 'turnip.png',

          CD_MESSAGE: 'You must wait a while before performing this action again.',
          THRESHOLD_MESSAGE: 'Your piggy feels neglected.'
        },

        backAttributeFilter: ['Cloud', 'Dark Clouds', 'Green Candles', 'Mat', 'Meteorite', 'Stars', 'Sunny Day'],

        tutorialPage: 1,
        tutorialPages: 9

      }
    },
    async mounted() {
      try {
        this.piggyLoading = true;
        this.initializeClouds();

        this.attributeManagerContract = await new ethers.Contract(AttributeManager.address, AttributeManager.abi, this
          .metaMaskWallet
          .signer);
        this.tamagotchiContract = await new ethers.Contract(PiggyTamagotchi.address, PiggyTamagotchi.abi, this
          .metaMaskWallet.signer);
        let tempContract = await new ethers.Contract("0x7ca9C1D0bb11F1b7C31ee5538D7a75aAF2d8E2FC", Token.abi, this
          .metaMaskWallet.signer);
        const allowance = await tempContract.allowance(this.metaMaskAccount, PiggyTamagotchi.address);
        this.piggyAllowance = allowance > 0;

        const contractAttributes = await this.tamagotchiContract.getDefaultAttributeList();
        const attributeLimits = await this.attributeManagerContract.getAttributeLimits();
        const contractPowerups = await this.tamagotchiContract.getPowerups();

        if (!localStorage.piggyFirstTimeNew) {
          localStorage.piggyFirstTimeNew = false;
          this.piggyFirstTime = true;
        }


        let powerUps = [];
        contractPowerups.forEach((c, index) => {
          powerUps.push({
            data: c,
            index: index
          });
        });
        let attributes = {};

        for (let i = 0; i < contractAttributes.length; i++) {
          if (contractAttributes[i] === 'Age' || contractAttributes[i] === 'Exp') continue;
          const freePowerUp = powerUps.filter(c => c.data.price * 1 === 0 && c.data.boostInitialisers[0]
            .attributeName === contractAttributes[i])[0];
          const paidPowerUp = powerUps.filter(c => c.data.price * 1 > 0 && c.data.boostInitialisers[0]
            .attributeName ===
            contractAttributes[i])[0];
          const attributeLimit = attributeLimits.filter(c => c.attributeName === contractAttributes[i])[0];

          attributes[contractAttributes[i]] = {
            name: contractAttributes[i],
            max: attributeLimit.value * 1,
            current: attributeLimit.value * 1,
            freePowerUp: {
              ...freePowerUp.data,
              index: freePowerUp.index
            },
            paidPowerUp: {
              ...paidPowerUp.data,
              index: paidPowerUp.index
            },
          };
        }
        this.piggyAttributes = attributes;
        this.piggyAtributeList = contractAttributes.filter(c => c !== 'Age' && c !== 'Exp');

        await this.getPiggyList();

        this.piggyInterval = setInterval(async () => {
          this.fetchPiggyStats(this.currentPig);
        }, 25 * 1000);

        this.piggyLoading = false;
        this.showPig = true;
        this.keys.piggyBackground++;

      } catch (err) {
        this.handleError(err);
      }

    },
    methods: {
      hideAllPiggyDialogs() {
        this.showPiggyAlertDialog = false;
        this.showPiggyImport = false;
        this.showPiggyName = false;
        this.showPiggyAllowance = false;
      },

      showPiggySettingsModal() {
        this.hideAllPiggyDialogs();
        this.showPiggyAlertDialog = true;
        this.showPiggyAllowance = true;
      },

      showPiggyImportModal() {
        this.hideAllPiggyDialogs();
        this.showPiggyAlertDialog = true;
        this.showPiggyImport = true;
      },

      showPiggyNameModal() {
        this.hideAllPiggyDialogs();
        this.showPiggyAlertDialog = true;
        this.showPiggyName = true;
      },

      showPiggyTutorialModal() {
        this.showPiggyTutorial = true;
        this.tutorialPage = 1;
        this.piggyFirstTime = false;
      },

      goToRoute(route, query) {
        this.$router.push({
          name: route,
          query: query
        });
      },

      async setTokenAllowance(amount) {
        let actual = 0;
        const coinkAddress = "0x7ca9C1D0bb11F1b7C31ee5538D7a75aAF2d8E2FC";
        if (amount > 0) {
          actual = amount * 10 ** 18;
        } else {
          actual = 0;
        }
        try {
          const arg = fromExponential(actual);
          let tempContract = await new ethers.Contract(coinkAddress, Token.abi, this
            .metaMaskWallet.signer);
          const tx = await tempContract.approve(
            this.tamagotchiContract.address,
            arg
          );

          this.showPiggyAlertDialog = false;
          await tx.wait(1);
          this.piggyAllowance = amount > 0;

          if (amount > 0) this.$toast.success(`COINKX has been enabled!`);
          else this.$toast.succes('COINKX has been disabled!');
        } catch (err) {
          this.handleError(err);
        }
      },

      async usePiggyPaidAction(piggy, attribute) {
        try {
          if (!piggy) throw 'Select a piggy first!'
          if (this.piggySleeping) throw `${piggy.name} is sleeping!`;
          if (attribute.loading) return;

          if (!this.piggyAllowance) {
            this.showPiggyCooldown = false;
            this.showPiggySettingsModal();
            throw '"COINKX" token is not enabled!';
          }

          attribute.loading = true;
          this.keys[attribute.name]++;

          const tx = await this.tamagotchiContract.buyPowerup(piggy.id, attribute.paidPowerUp.index, {
              gasLimit: 2000000,
              gasPrice: 30000000000
            });
          this.showPiggyCooldown = false;

          await tx.wait(1);
          if (attribute.name === 'Hunger') this.piggyFood = this.CONSTANTS.TURNIP_FOOD;

          this.selectedAttribute = attribute;
          this.piggyLastAttribute = attribute;
          attribute.loading = false;
          await this.fetchPiggyStats(piggy);
        } catch (err) {
          this.handleError(err);
        }
        attribute.loading = false;
        this.keys[attribute.name]++;
      },

      async usePiggyFreeAction(piggy, attribute) {
        try {
          if (!piggy) throw 'Select a piggy first!'
          if (this.piggySleeping) throw `${this.piggyName} is sleeping.`;
          if (this.piggyDead) throw `${this.piggyName} is dead.`;
          if (attribute.loading) return;
          attribute.loading = true;
          this.keys[attribute.name]++;

          this.selectedAttribute = attribute;
          const cooldown = await this.getCooldownForAttributePowerUp(piggy, attribute);

          if (cooldown > 0) {
            this.preparePiggyCooldownModal(attribute);
          } else {
            for (let i = 0; i < attribute.freePowerUp.thresholds.length; i++) {
              const threshold = attribute.freePowerUp.thresholds[i];
              const thresholdAttribute = this.piggyAttributes[threshold.attributeName];

              if (threshold.greaterThan && thresholdAttribute.current * 1 < threshold.value * 1) {
                this.preparePiggyCooldownModal(attribute);
                this.piggyActionMessage = this.CONSTANTS.THRESHOLD_MESSAGE;
                throw `${threshold.attributeName} must be higher than ${threshold.value}`;
              } else if (!threshold.greaterThan && thresholdAttribute.current * 1 > threshold.value * 1) {
                this.piggyActionMessage = this.CONSTANTS.THRESHOLD_MESSAGE;
                this.preparePiggyCooldownModal(attribute);
                throw `${threshold.attributeName} too high.`;
              }
            }
            const tx = await this.tamagotchiContract.buyPowerup(piggy.id, attribute.freePowerUp.index, {
              gasLimit: 2000000,
              gasPrice: 30000000000
            });

            await tx.wait(1);

            if (attribute.name === 'Hunger') this.piggyFood = this.CONSTANTS.CARROT_FOOD;
            this.piggyLastAttribute = attribute;
            await this.fetchPiggyStats(piggy);
          }

        } catch (err) {
          this.handleError(err);
        }

        attribute.loading = false;
        this.keys[attribute.name]++;
      },

      preparePiggyCooldownModal(attribute) {
        this.piggyActionMessage = this.CONSTANTS.CD_MESSAGE;
        switch (attribute.name) {
          case 'Hunger':
            this.piggyLastActionMessage = 'Purchase a deluxe turnip';
            break;
          case 'Energy':
            this.piggyLastActionMessage = 'Purchase a XPiggo energy drink'
            break;
          case 'Happiness':
            this.piggyLastActionMessage = 'Purchase a toy for your piggy.'
            break;
          case 'Hygiene':
            this.piggyLastActionMessage = 'Purchase a pair of scrubbing gloves!'
            break;
        }
        this.showPiggyCooldown = true;
      },

      async revivePiggy(piggy) {
        try {
          if (!this.piggyAllowance) {
            this.showPiggyCooldown = false;
            this.showPiggySettingsModal();
            throw '"COINKX" token is not enabled!';
          }

          const isRegistered = await this.tamagotchiContract.isImported(piggy.id);
          if (!isRegistered) return;
          const isDead = await this.tamagotchiContract.isDead(piggy.id);

          if (isDead) {
            const tx = await this.tamagotchiContract.revivePig(piggy.id, {
              gasLimit: 2000000,
              gasPrice: 30000000000
            });

            this.piggyLoading = true;
            await tx.wait(1);

            await this.fetchPiggyStats(piggy);
            this.keys.piggyBackground++;
          }
        } catch (err) {
          this.handleError(err);
        }

        this.piggyLoading = false;
      },

      async importPiggy(piggy) {
        try {
          this.piggyLoading = true;
          const isRegistered = await this.tamagotchiContract.isImported(piggy.id);
          if (!isRegistered) {
            const tx = await this.tamagotchiContract.importPig(piggy.id);
            await tx.wait(1);

            this.resetStatus();
          }

          this.currentPig = piggy;
          await this.fetchPiggyStats(piggy);
          this.showPig = true;
        } catch (err) {
          this.showPig = false;
          this.handleError(err);
        }
        this.showPiggyMenu = false;
        this.showPiggyAlertDialog = false;
        this.piggyLoading = false;
      },

      async fetchPiggyStats(piggy) {
        try {
          if (!this.currentPig) return;

          for (let i = 0; i < this.piggyAtributeList.length; i++) {
            const attribute = this.piggyAttributes[this.piggyAtributeList[i]];
            const attributeValue = await this.attributeManagerContract.getValueOfAttributeOfPig(piggy.id,
              attribute.name);
            attribute.current = parseInt(attributeValue);

            if (attribute.name !== 'Age') {
              attribute.freePowerUp.cooldown = await this.getCooldownForAttributePowerUp(piggy, attribute);
            }
          }

          this.piggySleeping = await this.tamagotchiContract.isOccupied(piggy.id, 'Sleep');
          if (this.piggySleeping) {
            let sleepsUntill = await this.tamagotchiContract.occupiedUntil(piggy.id, 'Sleep');
            this.piggySleepingString = "Wakes up in " + this.$timeStamper(sleepsUntill * 1000 - Date.now());
          }

          const piggyName = await this.attributeManagerContract.getNameOfPig(piggy.id);
          this.piggyName = piggyName ? piggyName : "#" + piggy.id;
          this.newPiggyName = this.piggyName;

          const ageAttribute = await this.attributeManagerContract.getValueOfAttributeOfPig(piggy.id, 'Age');
          this.piggyDead = await this.tamagotchiContract.isDead(piggy.id);
          this.piggyAge = ageAttribute && !this.piggyDead ? parseInt(ageAttribute / (12 * 3600)) : "RIP";
        } catch (err) {
          this.handleError(err);
        }
        this.keys.piggyAttributes++;
      },

      async getCooldownForAttributePowerUp(piggy, attribute) {
        const cooldownName = attribute.name === 'Energy' ? "Sleep_Cooldown" : attribute.name + "_Cooldown";
        const occupiedUntil = await this.tamagotchiContract.occupiedUntil(piggy.id, cooldownName) * 1000;

        const dateNow = Date.now();

        const cooldown = occupiedUntil - dateNow;
        attribute.cooldown = cooldown;
        return cooldown;
      },

      async setPiggyName(pig) {
        try {
          let name = this.newPiggyName;

          if (!name || name.length === 0) throw 'Names can not be empty';
          if (name.length > 16) throw "Names can not be longer than 16 characters.";

          this.hideAllPiggyDialogs();

          const tx = await this.tamagotchiContract.setNameOfPig(pig.id, name);
          this.piggyLoading = true;
          await tx.wait(1);

          this.piggyName = this.newPiggyName;
        } catch (err) {
          this.handleError(err);
        }
        this.piggyLoading = false;
      },

      async selectPiggy(pig) {
        try {
          this.piggyLoading = true;
          const isRegistered = await this.tamagotchiContract.isImported(pig.id);
          if (!isRegistered) {
            this.resetStatus();
            this.selectedPig = pig;
            this.showPiggyImportModal();
            this.showPiggyMenu = false;
            this.piggyLoading = false;
            this.currentPig = undefined;
          } else {
            this.importPiggy(pig);
          }
        } catch (err) {
          this.piggyLoading = false;
          this.showPig = false;
          this.handleError(err);
        }
      },

      async getPiggyList() {
        const contract = new ethers.Contract('0xe5fd335819edb8da8395f8ec48beca747a0790ab', Piggy.abi, this
          .metaMaskWallet.signer)
        const pigIds = await contract.tokensOfOwner(this.metaMaskAccount)

        if (pigIds.length === 0) return;

        let ids = await pigIds.map(async (Piggy) => {
          return Piggy._isBigNumber ? ethers.BigNumber.from(Piggy._hex).toString() : Piggy._hex
        })

        await Promise.all(ids)
          .then(async (listOfIds) => {

            const piggyList = await axios.get(`https://api.cryptopigs.one/meta/list?items=${listOfIds}`)
            this.piggyList = piggyList.data
            this.loading = false

            if (this.piggyList.length > 0) {
              const firstPig = this.piggyList[0];
              const isRegistered = await this.tamagotchiContract.isImported(firstPig.id);

              if (isRegistered) {
                await this.importPiggy(firstPig);
              }
            }
          })
      },

      getPiggyAttribute(attributeName) {
        const attribute = this.piggyStats.filter(c => c.name === attributeName)[0];
        return attribute;
      },

      getSimplePiggyAttributeImage(attribute) {
        if (attribute.trait_type === 'Background') return '/pigs/attributes/none.png';
        return `/pigs/attributes/${attribute.trait_type}/${attribute.value}.png`;
      },

      getPiggieAttributeImage(attribute) {
        if (attribute.trait_type === 'Background' || !this.currentPig) return this.piggyNone;
        const hygiene = this.piggyAttributes['Hygiene'];
        const energy = this.piggyAttributes['Energy'];

        if (!hygiene || !energy) return this.piggyNone;

        if (attribute.trait_type === 'Back') {
          if (this.backAttributeFilter.indexOf(attribute.value)) return this.piggyNone;
        }

        if (attribute.trait_type === 'Eye') {
          if (this.piggyDead) {
            return '/pigs/attributes/Eye/Crosses.png';
          }
          if (this.piggySleeping) {
            return '/pigs/attributes/closed_eyes.png';
          }
          if (hygiene.current < 0.25 * hygiene.max) {
            return '/pigs/attributes/Eye/Surprised.png';
          }
          if (energy.current < 0.25 * energy.max) {
            return '/pigs/attributes/Eye/Sleepy.png';
          }
        }

        if (attribute.trait_type === 'Front') {
          if (this.piggyDead || this.piggyActions.eating) return this.piggyNone;
        }

        return `/pigs/attributes/${attribute.trait_type}/${attribute.value}.png`;
      },

      getPiggyWashStatus(wash) {
        if (!this.currentPig) return this.piggyNone;
        const hygiene = this.piggyAttributes['Hygiene'];
        if (!hygiene) return this.piggyNone;

        if (hygiene.current <= 0.25 * hygiene.max) {
          return '/pigs/attributes/Modifiers/shitter.png';
        } else if (hygiene.current < 0.5 * hygiene.max) {
          return '/pigs/attributes/Modifiers/muddy.png';
        }
        return this.piggyNone;
      },

      getPiggyNameFontSize(piggyName) {
        if (piggyName.length > 12) {
          return "sm:text-lg text-base";
        }
        return "sm:text-2xl text-xl";
      },

      managePiggyAnimations(attribute) {
        clearTimeout(this.piggyLastActionItem);
        this.clearPiggyAnimations();
        const pig = this.$refs.pig;
        this.isPiggyBusy = true;

        if (attribute.name === 'Hunger') {
          const carrotElement = this.$refs.carrot;
          carrotElement.classList.add('opacity-0');

          this.piggyLastActionItem = setTimeout(() => {
            carrotElement.classList.remove('opacity-0');
            carrotElement.classList.remove('carrot-fall');
            carrotElement.classList.add('carrot-fall');

            pig.classList.remove('piggy-eat');
            pig.classList.add('piggy-eat');

            setTimeout(() => {
              this.piggyActions.eating = false;
              this.isPiggyBusy = false;
            }, 2000);
          }, 500);
        }

        if (attribute.name === 'Happiness') {

          this.piggyLastActionItem = setTimeout(() => {
            pig.classList.add('piggy-jump');

            setTimeout(() => {
              this.piggyActions.playing = false;
              this.isPiggyBusy = false;
            }, 2800);
          }, 500);
        }
      },

      clearPiggyAnimations() {
        const pig = this.$refs.pig;
        const carrot = this.$refs.carrot;

        carrot.classList.remove('carrot-fall');
        pig.classList.remove('piggy-eat');
        pig.classList.remove('piggy-jump');
      },

      initializeClouds() {
        for (let i = 0; i < 4; i++) {
          this.piggyClouds.push({
            img: `/pigs/cloud_${1 + i % 3}.png`,
            left: Math.random() * 156 - 200,
            top: Math.random() * 200 - 100,
            speed: Math.random() / 3 + 0.05,
            opacity: 0.25 + Math.random()
          })
        }

        const windowWidth = window.innerWidth * 0.4;
        this.piggyCloudsHandler = setInterval(() => {
          this.piggyClouds.forEach(cloud => {
            cloud.left += cloud.speed;
            if (cloud.stopped) return;
            if (cloud.left > windowWidth * 1.1) {
              cloud.stopped = true;
              cloud.left = Math.random() * 156 - 400;
              cloud.top = Math.random() * 200 - 100;
              cloud.speed = Math.random() / 3 + 0.05;
              setTimeout(() => {
                cloud.stopped = false;
              }, Math.random() * 2000);
            }
          });
        }, 0);
      },

      getPiggyBackground(piggy) {
        const defaultValue = {
          backgroundImage: `url('/pigs/ground_purple.png')`
        };
        if (!piggy) return defaultValue;
        let bg = piggy.attributes.filter(c => c.trait_type === 'Background')[0];
        if (!bg) return defaultValue;
        return {
          backgroundImage: `url('/pigs/ground_${bg.value}.png')`
        };
      },

      getPigstyColor(piggy) {
        const defaultValue = `/pigs/pigsty.png`;
        if (!piggy) return defaultValue;
        let bg = piggy.attributes.filter(c => c.trait_type === 'Background')[0];
        if (!bg || !piggy) return defaultValue;
        if (bg.value === 'Purple') return defaultValue;
        return `/pigs/pigsty_${bg.value}.png`
      },

      handleError(error) {
        const errorMessage =
          typeof error == "object" ? error.message : error.toLowerCase();
        const lcMessage = errorMessage.toLowerCase();
        if (lcMessage.indexOf("user denied") > -1) return;
        if (lcMessage.indexOf("transaction failed") > -1) {
          this.$toast.error("Transaction Failed");
        } else if (errorMessage.length < 100) {
          this.$toast.error(errorMessage);
        } else {
          this.$toast.error('Transaction Failed');
        }
      },

      resetStatus() {
        this.piggyStats.forEach(c => {
          c.loading = false;
          c.current = 0;
        });
        this.keys.piggyBackground++;
      },

      closeModal(event) {
        const classes = event.target.classList;
        if (classes.contains('modal-overlay')) {
          this.showPiggyAlertDialog = false;
        }
      }
    },
    watch: {
      piggyLastAttribute(newVal) {
        if (newVal.name === 'Hunger') {
          this.piggyActions.eating = true;
        } else if (newVal.name === 'Happiness') {
          this.piggyActions.playing = true;
        } else if (newVal.name === 'Hygiene') {
          this.piggyActions.washing = true;
        } else if (newVal.name === 'Energy') {
          this.piggyActions.sleeping = true;
        }
        this.managePiggyAnimations(newVal);
      }
    }
  }
</script>

<style scoped>
  .piggie-btn {
    min-width: 64px;
    min-height: 64px;
    background: #F16097;
    border: 1px solid #FBCCDE;
    box-sizing: border-box;
    border-radius: 12px;
  }

  .bg-pink {
    background: #F16097;
  }

  .bg-pink-light {
    background-color: #F16097;
  }

  .pink {
    color: #dc5689 !important;
  }

  .scale-anim:hover {
    transform: scale(1.05);
  }

  .press-anim:hover {
    border-top: solid 8px #dc4689;
    border-bottom: solid 1px #dc4689;
    color: rgba(255, 255, 255, 50%) !important;
  }

  .pink-border-bottom {
    border-bottom: solid 8px #dc4689;
  }

  .text-light {
    font-family: "Maven Pro";
    color: #3C2F35;
  }

  .pig-tamagotchi {
    max-width: 768px;
    width: 768;
    height: 100vh;
  }

  @media only screen and (max-width: 1024px) {
    .pig-tamagotchi {
      max-width: 75vw;
      width: 75vw;
      height: 100vh;
    }
  }

  @media only screen and (max-width: 768px) {
    .pig-tamagotchi {
      max-width: 85vw;
      width: 85vw;
      height: 100vh;
    }
  }

  @media only screen and (max-width: 512px) {
    .pig-tamagotchi {
      max-width: 95vw;
      width: 95vw;
      height: 90vh;
      margin-top: 5vh !important;
    }
  }

  .piggy-modal {
    position: relative;
    border: 6px solid #F16097;
    box-shadow: 0px 12px 0px #F16097;
    background-color: #FEEEF2;
  }

  .piggy-modal::after {
    content: "";
    position: absolute;
    top: 0;
    bottom: -12px;
    z-index: -1;
    left: 0;
    right: 0;
    box-shadow: 0px 12px 24px rgba(0, 0, 0, 0.5);
  }

  div,
  input {
    font-family: 'Chango', serif !important;
  }

  .bg-pig-sky {
    background: url('/pigs/sky.png') no-repeat;
    background-size: cover;
  }

  .piggie-menu-btn:hover {
    position: relative;
    transform: scale(1.05);
  }

  .piggy-jump {
    animation: piggy-jump 0.35s infinite ease-in-out;
    animation-iteration-count: 8;
  }

  .piggy-eat {
    animation: piggy-eat 3s ease-in-out;
  }

  .piggy-sleep {
    animation: piggy-sleep 5s linear infinite;
  }

  .carrot-fall {
    animation: carrot-fall 0.5s ease-in-out;
  }

  .piggy-idle {
    animation: piggy-idle 20s ease-in-out infinite;
    animation-delay: 10s;
  }

  .icon-pulse {
    animation: pulse 1s ease-in-out infinite;
  }

  @keyframes pulse {
    0% {
      transform: scale(1);
    }

    50% {
      transform: scale(1.1);
    }
  }

  @keyframes piggy-eat {
    0% {
      transform: translate(0, 0);
    }

    5% {
      transform: translate(-10px, 10px)
    }

    10% {
      transform: translate(-12px, 15px);
    }

    15% {
      transform: translate(-12px, 18px);
    }

    25% {
      transform: translate(-12px, 15px);
    }

    35% {
      transform: translate(-12px, 22px);
    }

    50% {
      transform: translate(-12px, 15px);
    }

    65% {
      transform: translate(0px, 0px);
    }

    80% {
      transform: translate(0px, 0xp);
    }
  }

  @keyframes piggy-sleep {
    0% {
      transform: translate(0, 5px);
      opacity: 1;
    }

    10% {
      transform: translate(-20px, -10px);
      opacity: 0.8;
    }

    20% {
      transform: translate(20px, -30px);
      opacity: 0.6;
    }

    30% {
      transform: translate(-35px, -50px);
      opacity: 0.4;
    }

    40% {
      transform: translate(35px, -70px);
      opacity: 0.2;
    }

    50% {
      transform: translate(-50px, -90px);
      opacity: 0;
    }

    51% {
      transform: translate(0, 0);
      opacity: 0;
    }

    99% {
      opacity: 0;
      transform: translate(0, 0);
    }

    100% {
      opacity: 1;
      transform: translate(0, 0);
    }
  }

  @keyframes carrot-fall {
    0% {
      transform: translateY(-100px)
    }

    50% {
      transform: translateY(0px);
    }

    75% {
      transform: translateY(-20px);
    }

    85% {
      transform: translateY(-0px);
    }

    95% {
      transform: translateY(-8px);
    }

    100% {
      transforM: translateY(0px);
    }
  }

  @keyframes piggy-jump {
    0% {
      transform: translateY(0px);
    }

    40% {
      transform: translateY(-60px);
    }

    45% {
      transform: translateY(-65px)
    }

    50% {
      transform: translateY(-67px);
    }

    55% {
      transform: translateY(-65px);
    }

    65% {
      transform: translateY(-60px);
    }

    100% {
      transform: translateY(0px);
    }
  }

  @keyframes piggy-idle {
    0% {
      transform: translateX(0px);
    }

    2% {
      transform: translateX(-6px);
    }

    5% {
      transform: translateX(-10px);
    }

    30% {
      transform: translateX(-10px);
    }

    33% {
      transform: translateX(0px);
    }

    36% {
      transform: translateX(3px);
    }

    42% {
      transform: translateX(8px);
    }

    70% {
      transform: translateX(0px);
    }

    80% {
      transform: translateX(0px);
    }
  }

  .piggie-menu-container {
    z-index: 5000;
    position: absolute;
    max-height: 100%;
    overflow-y: auto;
    background: linear-gradient(269.03deg, #FF8AB6 0.85%, #F16097 99.18%);
    box-shadow: 4px 0px 12px 6px rgba(0, 0, 0, 0.15);
    border-radius: 16px;
  }

  .piggie-menu-btn:hover::after {
    display: block;
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(255, 255, 255, 0.2);
  }

  ::-webkit-scrollbar-thumb {
    background: #FFFFFF !important;
    border-radius: 12px;
  }

  input {
    background: none;
    outline: none;
  }


  .menu-enter-active,
  .menu-leave-active {
    transform: translateX(0);
    opacity: 1;
    transition: all .35s;
  }

  .menu-enter,
  .menu-leave-to {
    transforM: translateX(-200px);
    opacity: 0.25;
  }

  .fade-enter-active,
  .fade-leave-active {
    opacity: 1;
    transition: all .35s;
  }

  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }

  .pop-in-enter-active,
  .pop-in-leave-active {
    opacity: 1;
    transition: all .35s;
    transform: translateX(-0px) translateY(-0px);
  }

  .pop-in-enter,
  .pop-in-leave-to {
    opacity: 0;
    transform: translateX(-50px) translateY(-50px);
  }
</style>