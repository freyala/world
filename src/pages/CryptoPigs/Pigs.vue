<template>
  <section style="min-height: 100vh; width: 40vw" class="flex p-4 mx-auto overflow-y-hidden md:p-16 lg:px-32">
    <div class="screen rounded-2xl overflow-x-hidden w-full bg-dark relative">
      <!-- MENU -->
      <div v-if='showPiggyMenu' class='absolute top-0 bottom-0 right-0 left-0 bg-opacity-20 w-full h-full z-50 bg-dark'>

      </div>
      <transition name='menu'>
        <div v-if='showPiggyMenu' class='piggie-menu-container top-0 bottom-0 w-7/10 ' style=''>

          <div class='w-full flex flex-col justify-center my-8'>
            <h2 class='w-full text-center text-white text-2xl mb-4'>Your Piggies</h2>

            <div
              class='w-full flex justify-center text-center items-center text-white text-lg cursor-pointer hover:opacity-100'
              v-for='piggy in yourPigs' :key='piggy.id' v-on:click='importPiggy(piggy)'>
              <img v-if='selectedPig && selectedPig.id === piggy.id' class='mt-1 mx-2' width="22px" src='/pigs/snout.svg' />
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
        <div class='absolute mx-auto h-20 z-50 flex w-9/10 top-4'>
          <div class='cursor-pointer w-auto h-full piggie-menu-btn'>
            <img class='h-full' src='/pigs/back_button.svg' />
          </div>
          <div v-on:click='showPiggyMenu = true' class='cursor-pointer ml-auto mr-4 w-auto h-full piggie-menu-btn'>
            <img class='h-full' src='/pigs/piggies_button.svg' />
          </div>
          <div class='cursor-pointer w-auto h-full piggie-menu-btn'>
            <img class='h-full' src='/pigs/wallet_button.svg' />
          </div>
          <div class='cursor-pointer w-auto mx-4 h-full piggie-menu-btn'>
            <img class='h-full' src='/pigs/market_button.svg' />
          </div>
          <div class='cursor-pointer w-auto mr-4 h-full piggie-menu-btn'>
            <img class='h-full' src='/pigs/settings_button.svg' />
          </div>
        </div>

        <div v-cloak v-if='selectedPig && showPig'
          class="w-full h-3/5 mt-14 relative flex items-center justify-center z-25">
          <img v-for='(attribute, index) in selectedPig.attributes' :key='index' class="m-auto absolute w-7/10 pt-60"
            v-bind:src='getPiggieAttributeImage(attribute)' alt="Pig">
          <img class='m-auto absolute w-7/10 pt-60' v-bind:src='getPiggyWashStatus()' />
        </div>
        <div v-on:click='showPiggyMenu = true'
          class='absolute left-0 flex flex-col items-center justify-center w-full opacity-50 hover:opacity-100 cursor-pointer'
          style='top: 50%;' v-else>
          <img width="64px" src='/pigs/snout.svg' />
          <p class='text-2xl text-white'>Select Pig</p>
        </div>

        <div class='absolute mx-auto h-16 flex w-full left-0 bottom-40 z-50'>
          <div class='mx-auto w-8/10 flex items-center justify-center rounded-2xl h-full bg-white'>
            <h2 class='text-3xl w-5/10 text-center' style='color: #3C2F35'>{{ piggyName }}</h2>
            <div class='w-5/10 relative h-20 bg-black rounded-2xl' style='background-color: #8660F1'>
              <div class='flex w-full h-full justify-center'>
                <div class='w-5/10 flex flex-col justify-center items-center cursor-pointer text-white text-4xl h-full'>
                  <p class='h-3/5 pt-2 mb-1'> {{ piggyAge }} </p>
                  <p class='h-2/5 text-base'>Age</p>
                </div>
                <div class='w-5/10 flex flex-col justify-center items-center cursor-pointer text-white text-4xl h-full'>
                  <p class='h-3/5 pt-2 mb-1 pt-4'>
                    <img width='32px' src='/pigs/battle.svg' />
                  </p>
                  <p class='h-2/5 text-base'>Battle</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- TAMAGOTCHI -->
        <div :key='keys.piggyStats' class="w-9/10 flex h-20 mb-4 mt-auto pink">
          <PiggyBar v-on:click='performAttributeAction(attribute)' v-for='(attribute, index) in piggyStats' :key='index'
            :attribute='attribute'></PiggyBar>
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
  import PiggyTamagotchi from "../../plugins/artifacts/tamagotchi.json";

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
    },
    data() {
      return {
        attributeManagerContract: undefined,
        tamagotchiContract: undefined,

        titleText: 'George be feeling tired ser',
        yourPigs: [],
        keys: {
          piggyStats: 0
        },
        selectedPig: {id: 0},

        showPiggyMenu: false,

        piggyNone: '/pigs/attributes/none.png',
        piggyName: "",
        piggyAge: 0,
        piggyCloudsHandler: undefined,
        piggyClouds: [],
        piggyStats: [],
        piggyActions: {
          eating: false,
          playing: false,
          washing: false,
          napping: false,
        },

        showPig: false
      }
    },
    async mounted() {
      this.initializeClouds();

      this.attributeManagerContract = await new ethers.Contract(AttributeManager.address, AttributeManager.abi, this
        .metaMaskWallet
        .signer);
      this.tamagotchiContract = await new ethers.Contract(PiggyTamagotchi.address, PiggyTamagotchi.abi, this
        .metaMaskWallet.signer);


      const attributes = await this.tamagotchiContract.getAttributeList();
      const events = await this.tamagotchiContract.getPurchaseableEvents();

      const freeEvents = events.filter(c => parseInt(c.price._hex) === 0);

      for (let i = 0; i < attributes.length; i++) {
        const event = freeEvents.filter(c => c.attributeName === attributes[i].attributeName)[0];
        this.piggyStats.push({
          name: attributes[i].attributeName,
          threshold: attributes[i].thresholdValue * 1,
          max: attributes[i].value * 1,
          current: 0,
          eventName: event.name
        });
      }

      await this.getYourPigs();
    },
    methods: {

      async importPiggy(piggy) {
        try {
          const isRegistered = await this.tamagotchiContract.isImported(piggy.id);
          if (!isRegistered) {
            const tx = await this.tamagotchiContract.importPig(piggy.id, {
              gasPrice: 100000000000,
              gasLimit: 1000000
            });

            await tx.wait(1);

            this.selectedPig = piggy;
            this.showPiggyMenu = false;
            await this.fetchPiggyStats(piggy);
          } else {
            this.selectedPig = piggy;
            this.showPiggyMenu = false;
            await this.fetchPiggyStats(piggy);
          }
          this.showPig = true;
        } catch (err) {
          this.showPig = false;
          console.error(err);
        }
      },

      async fetchPiggyStats(piggy) {

        for (let i = 0; i < this.piggyStats.length; i++) {
          const attributeValue = await this.attributeManagerContract.getAttributeValueOfPig(piggy.id,
            this.piggyStats[i].name);
          this.piggyStats[i].current = parseInt(attributeValue);
        }
      },

      getPiggyAttribute(attributeName) {
        const attribute = this.piggyStats.filter(c => c.name === attributeName)[0];
        return attribute;
      },

      async selectPiggy(pig) {
        try {
          const isRegistered = await this.tamagotchiContract.isImported(pig.id);
          if (!isRegistered) {
            this.selectedPig = undefined;
          }
          this.showPig = true;
        } catch (err) {
          this.showPig = false;
          console.error(err);
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
              this.selectedPig = this.yourPigs[0];
              await this.importPiggy(this.selectedPig);
            }
          })
      },

      getPiggieAttributeImage(attribute) {
        if (attribute.trait_type === 'Background' || !this.selectedPig) return this.piggyNone;
        const hygiene = this.piggyStats.filter(c => c.name === 'Hygiene')[0];
        const energy = this.piggyStats.filter(c => c.name === 'Energy')[0];

        if (!hygiene || !energy) return this.piggyNone;

        if (attribute.trait_type === 'Eye') {
          if (hygiene.current < 0.25 * hygiene.max) {
            return '/pigs/attributes/Eye/Surprised.png';
          }

          if (energy.current < 0.25 * energy.max) {
            return '/pigs/attributes/Eye/Sleepy.png';
          }
        }

        if (attribute.trait_type === 'Front') {
          if (this.piggyActions.eating || this.piggyActions.playing ||
            hygiene.current <= hygiene.max * 0.25) {
            return this.piggyNone;
          }
        }

        return `/pigs/attributes/${attribute.trait_type}/${attribute.value}.png`;
      },

      getPiggyWashStatus(wash) {
        if (!this.selectedPig) return this.piggyNone;
        const hygiene = this.piggyStats.filter(c => c.name === 'Hygiene')[0];
        if (!hygiene) return this.piggyNone;

        if (hygiene.current <= 0.25 * hygiene.max) {
          return '/pigs/attributes/Modifiers/shitter.png';
        } else if (hygiene.current < 0.5 * hygiene.max) {
          return '/pigs/attributes/Modifiers/muddy.png';
        }
        return this.piggyNone;
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
    }
  }
</script>

<style scoped>
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

  .piggie-jump {
    animation: piggiejump 0.25s infinite ease-in-out;
  }

  @keyframes piggiejump {
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
</style>