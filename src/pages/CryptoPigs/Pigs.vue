<template>
  <section class="flex p-4 mx-auto overflow-y-hidden md:p-16 my-16 md:my-0 lg:px-32 pig-tamagotchi">
    <div class="screen rounded-2xl overflow-x-hidden w-full bg-dark relative">
      <!-- MENU -->
      <div v-on:click='showPiggyCooldown = false' v-if='showPiggyCooldown'
        class='absolute top-0 bottom-0 right-0 left-0 bg-opacity-20 bg-dark'>

      </div>
      <transition name='pop-in'>
        <div v-on:click='closeModal' v-if='showPiggyCooldown'
          class='absolute modal-overlay flex items-center justify-center top-0 bottom-0 right-0 left-0 bg-opacity-20 w-full h-full z-50 '>
          <div
            class='sm:w-7/10 w-9/10 flex flex-col items-start justify-center sm:h-2/5 h-3/7 sm:pb-0 pb-3 bg-white rounded-2xl piggy-modal'>
            <div
              style='background-image: url("/pigs/snout.svg"); background-repeat: no-repeat; background-size: contain; background-position: center; z-index: 0'
              class='opacity-50 absolute top-0 bottom-0 left-0 m-4 right-0'>

            </div>
            <div class='w-full flex flex-row justify-center items-center z-50'>
              <h2 class='h-auto w-full ml-4 text-center mt-4 text-xl pink mb-4 z-10'>Oink! Oink!</h2>
              <i v-on:click='showPiggyCooldown = false'
                class='text-2xl scale-anim opacity-50 hover:opacity-100 pink cursor-pointer text-white ml-auto mr-4 fa fa-close'></i>
            </div>
            <div class='h-full w-full flex flex-col justify-center z-10'>
              <p class='text-light px-4 h-2/7 mb-2 sm:text-base text-sm text-center font-bold'
                style='font-family: "Maven Pro";color: #3C2F35'>
                You must wait a while before performing this action again.
              </p>
              <p class='w-full h-5 opacity-50 text-center pink'>or</p>
              <div
                class='w-full px-4 text-center h-3/5 flex flex-col mt-2 sm:mt-0 sm:text-base text-sm items-center justify-center'>
                <p style='font-family: "Maven Pro";color: #3C2F35' class='font-bold'>
                  {{ piggyLastActionMessage }}
                </p>
                <img style='' class='bg-white rounded-2xl shadow-2xl' width='72px'
                  v-bind:src="'/pigs/' + selectedAttribute.name + '.svg'" />
                <p v-on:click='usePiggyPaidAction(currentPig, selectedAttribute)'
                  class='text-base w-4/10 rounded-2xl press-anim pink-border-bottom cursor-pointer hover:shadow-2xl bg-pink text-white border mt-2'>
                  {{ selectedAttribute.paidEvent.price / (10 ** 18) }} COINK
                </p>
              </div>
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
                <p class='text-light px-4 h-2/7 mb-2 text-base text-center font-bold'
                  style='font-family: "Maven Pro";color: #3C2F35'>
                  Approve the 'Coink' contract in order to purchase piggy powerups.
                </p>
                <p v-on:click='setTokenAllowance(999999999999.9999)'
                  class='text-base w-6/10 mx-auto rounded-2xl press-anim cursor-pointer py-2 bg-pink pink-border-bottom text-white border mt-2'>
                  Approve Coink </p>
              </template>
              <template v-else>
                <p class='text-light px-4 h-2/7 mb-2 text-base text-center font-bold'
                  style='font-family: "Maven Pro";color: #3C2F35'>
                  Disable the 'Coink' contract.
                </p>
                <p v-on:click='setTokenAllowance(0)'
                  class='text-base w-6/10 mx-auto rounded-2xl press-anim cursor-pointer py-2 bg-pink pink-border-bottom text-white border mt-2'>
                  Disable Coink </p>
              </template>
            </div>
            <div v-else-if='showPiggyImport' class='h-full w-full flex flex-col justify-start text-center z-10'>
              <p class='text-light px-4 h-2/7 mb-2 text-base text-center font-bold'
                style='font-family: "Maven Pro";color: #3C2F35'>
                Register your piggy in the Tamagotchi to start playing!
              </p>
              <p v-on:click='importPiggy(selectedPig, true)'
                class='text-base w-6/10 mx-auto rounded-2xl text-center press-anim cursor-pointer py-2 bg-pink pink-border-bottom text-white border mt-2'>
                Register #{{ selectedPig.id }} </p>
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
                  class='text-base w-3/10 ml-auto mr-2 rounded-2xl text-center press-anim cursor-pointer py-2 bg-pink pink-border-bottom text-white border mt-2'>
                  Cancel</p>
                <p v-on:click='setPiggyName(currentPig)'
                  class='text-base w-3/10 mr-8 rounded-2xl text-center press-anim cursor-pointer py-2 bg-pink pink-border-bottom text-white border mt-2'>
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

      <div v-on:click='revivePiggy(currentPig)' v-if='piggyDead'
        class='absolute top-32 w-full flex flex-col justify-center items-center' style='z-index: 1000;'>
        <div
          class="text-base sm:w-3/10 w-6/10 h-16 px-2 rounded-2xl text-center press-anim cursor-pointer py-4 bg-pink pink-border-bottom text-white border mt-2">
          <h2 class='w-full text-lg'>Revive</h2>
        </div>
      </div>

      <div v-on:click='showPiggyMenu = false' v-if='showPiggyMenu'
        class='absolute top-0 bottom-0 right-0 left-0 bg-opacity-20 w-full h-full z-50 bg-dark'>

      </div>
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

            <div
              class='w-8/10 h-10 my-1 mx-auto rounded-xl scale-anim bg-white flex justify-center text-center items-center pink sm:text-lg text-sm cursor-pointer hover:opacity-100'
              v-for='piggy in yourPigs' :key='piggy.id' v-on:click='selectPiggy(piggy)'>
              <img v-if='currentPig && currentPig.id === piggy.id' class='mt-1 mx-2 opacity-50' width="22px"
                src='/pigs/snout_dark.svg' />
              Pig #{{piggy.id}}
            </div>
          </div>
        </div>

      </transition>
      <!-- BACKGROUND -->
      <div class="p-8 flex h-3/5 z-0 absolute top-0 w-full bg-pig-sky">
      </div>
      <div class='w-full h-3/5 z-0 absolute bottom-0 bg-pig-ground'>
      </div>
      <img class='absolute z-25' v-for='(cloud, index) in piggyClouds' :key='index'
        v-bind:style='{"top": cloud.top + "px", "left": cloud.left + "px", opacity: cloud.opacity}'
        v-bind:src='cloud.img' />
      <img class='absolute z-10 right-2 w-7/10' style='top: 40%' src='/pigs/pigsty.png' />

      <div class="flex flex-wrap p-4 md:p-8 z-10 relative h-full">

        <!-- NAVBAR -->
        <div class='absolute mx-auto h-20 z-50 flex xs:w-9/10 w-9/10 top-4'>

          <router-link :to="{ name: 'world-map' }">
            <div class='cursor-pointer w-auto h-full sm:mx-0 mx-2 piggie-menu-btn'>
              <img class='h-full' src='/pigs/back_button.svg' />
            </div>
          </router-link>
          <div v-on:click='showPiggyMenu = true' class='cursor-pointer ml-auto w-auto h-full piggie-menu-btn'>
            <img class='h-full' src='/pigs/piggies_button.svg' />
          </div>
          <router-link target="_blank"
            :to="{path: 'marketplace', query: { market: '0xe5fd335819edb8da8395f8ec48beca747a0790ab' }}">
            <div class='cursor-pointer w-auto sm:mx-4 mx-2 h-full piggie-menu-btn'>
              <img class='h-full' src='/pigs/market_button.svg' />
            </div>
          </router-link>
          <div v-on:click='showPiggySettingsModal()' class='cursor-pointer w-auto xs:mr-2 mr-1 h-full piggie-menu-btn'>
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


        <div ref='pig' v-cloak v-show='currentPig && showPig'
          class="w-full h-3/5 mt-14 relative flex items-center justify-center z-25">
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

        <div class='absolute mx-auto sm:h-16 h-12 pres-anim flex w-full left-0 sm:bottom-40 bottom-24 z-50'>
          <div class='mx-auto sm:w-8/10 w-9/10 flex items-center justify-center rounded-2xl h-full bg-white'>
            <h2 title='Change name' v-on:click='showPiggyNameModal()'
              class='sm:text-3xl text-xl w-5/10 text-center cursor-pointer' style='color: #3C2F35'>{{ piggyName }}</h2>
            <div class='w-5/10 relative sm:h-20 h-14 bg-black rounded-2xl' style='background-color: #8660F1'>
              <div class='flex w-full h-full justify-center'>
                <div
                  class='w-5/10 flex flex-col justify-center items-center cursor-pointer text-white sm:text-4xl text-xl h-full'>
                  <p class='h-3/5 pt-2 mb-1'> {{ piggyAge }} </p>
                  <p class='h-2/5 sm:text-base text-xs'>Age</p>
                </div>
                <div
                  class='w-5/10 flex flex-col justify-center items-center cursor-pointer text-white sm:text-4xl text-xl h-full'>
                  <p class='h-3/5 mb-1 p-4 sm:p-0 sm:pt-4 pt-2'>
                    <img width='32px' src='/pigs/battle.svg' />
                  </p>
                  <p class='h-2/5 sm:text-base text-xs'>Battle</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- TAMAGOTCHI -->
        <div :key='keys.piggyStats' class="sm:w-9/10 w-full flex md:h-20 xs:h-16 h-12 mb-4 mt-auto pink">
          <PiggyBar v-bind:class='{"opacity-75": piggySleeping && index != 3, "scale-anim": !piggySleeping}'
            v-on:click='usePiggyFreeAction(currentPig, attribute)' v-for='(attribute, index) in basePiggyStats'
            :key='index' :attribute='attribute'></PiggyBar>
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

  import Piggy from "../../plugins/artifacts/frey.json";
  import AttributeManager from "../../plugins/artifacts/attributeManager.json";
  import Token from '../../plugins/artifacts/freyala.json';
  import PiggyTamagotchi from "../../plugins/artifacts/tamagotchi.json";
  import fromExponential from "from-exponential";

  import PiggyBar from '../../components/Pigs/PiggyBar.vue';

  export default {
    name: 'CryptoPigs',
    mixins: [wallet],
    components: {
      PiggyBar
    },
    computed: {
      ...mapGetters([
        'metaMaskAccount',
        'metaMaskWallet'
      ]),

      basePiggyStats() {
        return this.piggyStats.filter(c => c.name !== 'Age');
      },

      selectedPigAttributes() {
        if (!this.currentPig) return [];
        return this.currentPig.attributes;
      }
    },
    data() {
      return {
        attributeManagerContract: undefined,
        tamagotchiContract: undefined,
        yourPigs: [],
        keys: {
          piggyStats: 0
        },
        currentPig: undefined,
        selectedPig: undefined,

        piggyNone: '/pigs/attributes/none.png',
        piggyName: "",
        newPiggyName: "",
        piggyAge: 0,
        piggyDead: false,
        piggyCloudsHandler: undefined,
        piggyClouds: [],
        piggyStats: [],
        piggyLoading: false,
        piggyInterval: undefined,
        piggyAllowance: false,
        selectedAttribute: undefined,
        piggyLastActionMessage: "",
        piggyLastActionItem: "",
        piggyLastAttribute: undefined,
        piggySleeping: false,
        piggyActions: {
          eating: false,
          playing: false,
          washing: false,
          sleeping: false
        },
        piggyFood: 'carrot.png',

        showPig: false,
        showPiggyAlertDialog: false,
        showPiggyCooldown: false,
        showPiggyAllowance: false,
        showPiggyImport: false,
        showPiggyName: false,
        showPiggyMenu: false,

        CONSTANTS: {
          CARROT_FOOD: 'carrot.png',
          TURNIP_FOOD: 'turnip.png'
        }

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
        let tempContract = await new ethers.Contract("0xc963cb270b96d8d34f5d31aab36bc1a33b3caba2", Token.abi, this
          .metaMaskWallet.signer);
        const allowance = await tempContract.allowance(this.metaMaskAccount, PiggyTamagotchi.address);
        this.piggyAllowance = allowance > 0;

        const attributes = await this.tamagotchiContract.getAttributeList();
        const contractEvents = await this.tamagotchiContract.getPurchaseableEvents();
        const contractPowerups = await this.tamagotchiContract.getPowerups();

        let events = [],
          powerUps = [];
        contractEvents.forEach((c, index) => events.push({
          attributeName: c.attributeName,
          price: parseInt(c.price),
          name: c.name,
          index: index
        }));
        contractPowerups.forEach((c, index) => powerUps.push({
          attributeName: c.attributeName,
          price: parseInt(c.price),
          name: c.name,
          index: index
        }));

        for (let i = 0; i < attributes.length; i++) {
          const freeEvent = events.filter(c => c.attributeName === attributes[i].attributeName && c.price === 0)[
            0];
          const paidEvent = events.filter(c => c.attributeName === attributes[i].attributeName && c.price > 0)[0];
          const powerUp = powerUps.filter(c => c.attributeName === attributes[i].attributeName)[0];

          this.piggyStats.push({
            name: attributes[i].attributeName,
            threshold: attributes[i].thresholdValue * 1,
            max: attributes[i].value * 1,
            current: 0,
            freeEvent,
            paidEvent,
            powerUp,
            loading: false
          });
        }
        await this.getYourPigs();

        this.piggyInterval = setInterval(async () => {
          this.fetchPiggyStats(this.currentPig);
        }, 15 * 1000);

        this.piggyLoading = false;
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

      async fetchBlockNumber() {
        try {
          const body =
            '{"jsonrpc":"2.0", "method":"hmy_blockNumber","params":[], "id":1}';

          const response = await fetch("https://api.harmony.one/", {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            headers: {
              "Content-Type": "application/json",
            },
            body: body,
          });

          const blockNumber = await response.json();
          return parseInt(blockNumber.result);
        } catch (err) {
          this.handleError(err);
          return 0;
        }
      },

      async setTokenAllowance(amount) {
        let actual = 0;
        const coinkAddress = "0xc963cb270b96d8d34f5d31aab36bc1a33b3caba2";
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

          this.$toast.success(``);
        } catch (err) {
          this.handleError(err);
        }
      },

      async usePiggyPaidAction(piggy, attribute) {
        try {
          if (!piggy) throw 'No selected piggy.'
          if (this.piggySleeping) throw 'Piggy is sleeping.';
          if (attribute.loading) return;

          if (!this.piggyAllowance) {
            this.showPiggyCooldown = false;
            this.showPiggySettingsModal();
            throw '"Coink" token is not enabled!';
          }

          const paidEvent = attribute.paidEvent;
          const tx = await this.tamagotchiContract.buyEvent(piggy.id, paidEvent.index);

          attribute.loading = true;
          this.showPiggyCooldown = false;
          this.selectedAttribute = attribute;

          if (attribute.name === 'Hunger') this.piggyFood = this.CONSTANTS.TURNIP_FOOD;

          await tx.wait(1);
          this.piggyLastAttribute = attribute;
          const value = await this.attributeManagerContract.getAttributeValueOfPig(piggy.id, paidEvent
            .attributeName);

          attribute.current = value;
          attribute.loading = false;
        } catch (err) {
          this.handleError(err);
        }

        attribute.loading = false;
      },

      async usePiggyFreeAction(piggy, attribute) {
        try {
          if (!piggy) throw 'No selected piggy.'
          if (this.piggySleeping) throw 'Piggy is sleeping.';
          if (this.piggyDead) throw 'Piggy is dead.';
          if (attribute.loading) return;

          const freeEvent = attribute.freeEvent;
          const cooldownStatus = await this.tamagotchiContract.getCooldownEndsAtForPurchaseableEventOfPig(piggy.id,
            freeEvent.index);

          const blockNumber = await this.fetchBlockNumber();
          const isCooldown = parseInt(cooldownStatus) - blockNumber > 0;
          this.selectedAttribute = attribute;

          if (isCooldown) {
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
          } else {
            attribute.loading = true;
            let tx = undefined;

            if (attribute.name === 'Energy') {
              tx = await this.tamagotchiContract.buyPowerup(piggy.id, attribute.powerUp.index);
            } else {
              tx = await this.tamagotchiContract.buyEvent(piggy.id, freeEvent.index);
            }

            if (attribute.name === 'Hunger') this.piggyFood = this.CONSTANTS.CARROT_FOOD;
            await tx.wait(1);

            this.piggyLastAttribute = attribute;
            await this.fetchPiggyStats(piggy);
          }

        } catch (err) {
          this.handleError(err);
        }

        attribute.loading = false;
      },

      async revivePiggy(piggy) {
        try {
          const isRegistered = await this.tamagotchiContract.isImported(piggy.id);
          if (!isRegistered) return;
          const isDead = await this.tamagotchiContract.isDead(piggy.id);

          if (isDead) {
            const tx = await this.tamagotchiContract.revivePig(piggy.id, {
              gasPrice: 100000000000,
              gasLimit: 1000000
            });

            this.piggyLoading = true;
            await tx.wait(1);

            await this.fetchPiggyStats(piggy);
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
            const tx = await this.tamagotchiContract.importPig(piggy.id, {
              gasPrice: 100000000000,
              gasLimit: 1000000
            });
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

          for (let i = 0; i < this.piggyStats.length; i++) {
            const attributeValue = await this.attributeManagerContract.getAttributeValueOfPig(piggy.id,
              this.piggyStats[i].name);
            this.piggyStats[i].current = parseInt(attributeValue);
          }

          let currentBlock = await this.fetchBlockNumber();
          const occupiedUntil = await this.tamagotchiContract.occupiedUntil(piggy.id);

          this.piggySleeping = currentBlock < parseInt(occupiedUntil);
          const piggyName = await this.attributeManagerContract.getNameOfPig(piggy.id);

          this.piggyName = piggyName ? piggyName : "#" + piggy.id;
          this.newPiggyName = this.piggyName;
          const piggyDead = await this.tamagotchiContract.isDead(piggy.id);

          const ageAttribute = this.piggyStats.filter(c => c.name === 'Age')[0];
          this.piggyAge = ageAttribute && !piggyDead ? parseInt(ageAttribute.current / 10) : "RIP";
          this.piggyDead = piggyDead;
        } catch (err) {
          this.handleError(err);
        }
      },

      async setPiggyName(pig) {
        try {
          let name = this.piggyName;

          if (!name) throw 'Names can not be empty';
          if (name.length > 30) "Names can not be longer than 30 characters.";

          this.hideAllPiggyDialogs();

          const tx = await this.attributeManagerContract.setNameOfPig(pig.id, name, {
            gasPrice: 100000000000,
            gasLimit: 1000000
          });
          await tx.wait(1);

          this.piggyName = this.newPiggyName;
        } catch (err) {
          this.handleError(err);
        }
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

      async getYourPigs() {
        const contract = new ethers.Contract('0xe5fd335819edb8da8395f8ec48beca747a0790ab', Piggy.abi, this
          .metaMaskWallet.signer)
        const pigIds = await contract.tokensOfOwner(this.metaMaskAccount)

        let ids = await pigIds.map(async (Piggy) => {
          return Piggy._isBigNumber ? ethers.BigNumber.from(Piggy._hex).toString() : Piggy._hex
        })

        await Promise.all(ids)
          .then(async (listOfIds) => {

            const yourPigs = await axios.get(`https://api.cryptopigs.one/meta/list?items=${listOfIds}`)
            this.yourPigs = yourPigs.data
            this.loading = false

            if (this.yourPigs.length) {
              const firstPig = this.yourPigs[0];
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

      getPiggieAttributeImage(attribute) {
        if (attribute.trait_type === 'Background' || !this.currentPig) return this.piggyNone;
        const hygiene = this.piggyStats.filter(c => c.name === 'Hygiene')[0];
        const energy = this.piggyStats.filter(c => c.name === 'Energy')[0];

        if (!hygiene || !energy) return this.piggyNone;

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
        const hygiene = this.piggyStats.filter(c => c.name === 'Hygiene')[0];
        if (!hygiene) return this.piggyNone;

        if (hygiene.current <= 0.25 * hygiene.max) {
          return '/pigs/attributes/Modifiers/shitter.png';
        } else if (hygiene.current < 0.5 * hygiene.max) {
          return '/pigs/attributes/Modifiers/muddy.png';
        }
        return this.piggyNone;
      },

      managePiggyAnimations(attribute) {
        clearTimeout(this.piggyLastActionItem);
        this.clearPiggyAnimations();
        const pig = this.$refs.pig;

        if (attribute.name === 'Hunger') {
          const carrotElement = this.$refs.carrot;
          carrotElement.classList.add('opacity-0');

          this.piggyLastActionItem = setTimeout(() => {
            carrotElement.classList.remove('opacity-0');
            carrotElement.classList.remove('carrot-fall');
            carrotElement.classList.add('carrot-fall');

            pig.classList.remove('piggy-eat');
            pig.classList.add('piggy-eat');

            setTimeout(() => this.piggyActions.eating = false, 1500);
          }, 500);
        }

        if (attribute.name === 'Happiness') {

          this.piggyLastActionItem = setTimeout(() => {
            pig.classList.add('piggy-jump');

            setTimeout(() => this.piggyActions.playing = false, 1500);
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
      height: 85vh;
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

  .scale-anim:hover {
    transform: scale(1.05);
  }

  .press-anim:hover {
    border-bottom: 0;
    border-top: solid 8px #dc4689;
    color: rgba(255, 255, 255, 50%) !important;
  }

  .Vue-Toastification__toast--error {
    background-color: #dc4689 !important;
    color: #fff;
  }


  div,
  input {
    font-family: 'Chango', serif !important;
  }

  .bg-pig-sky {
    background: url('/pigs/sky.png') no-repeat;
    background-size: cover;
  }

  .bg-pig-ground {
    background: url('/pigs/ground.png') no-repeat;
    background-size: cover;
  }

  .piggie-menu-btn:hover {
    position: relative;
    transform: scale(1.05);
  }

  .pink-border-bottom {
    border-bottom: solid 8px #dc4689;
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

  .piggie-menu-container {
    z-index: 5000;
    position: absolute;
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

  .progress-container {
    padding: 12px 15px 20px 15px;
  }

  .progress {
    width: 100%;
    height: 100%;
    background-color: #fff;
    border: 1px solid #ccc;
    position: relative;
  }

  .bar {
    width: 100%;
    display: block;
    font-size: 12px;
    background-color: #bb9319;
    color: #fff;
    position: absolute;
    bottom: 0;
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