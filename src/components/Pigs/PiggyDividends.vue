<template>
  <div ref='container' class='piggie-menu-container top-0 bottom-0 w-full' style=''>

    <div :key='dividendsKey' class='w-full flex flex-col justify-center mt-4'>
      <div class='w-full flex flex-row justify-center items-center'>
        <h2 class='h-auto w-full ml-12 text-center mt-2 sm:text-2xl text-xl text-white mb-4 z-10'>Piggy Bank
        </h2>

        <div class='cursor-pointer '>
          <i v-on:click='$emit("close")'
             class='sm:text-2xl text-xl scale-anim opacity-50 hover:opacity-100 text-white ml-auto mr-6 fa fa-close'></i>
        </div>
      </div>

      <div
          class="w-8/10 h-12 mb-4 py-4 mx-auto rounded-xl bg-white flex flex-col justify-center text-center items-center pink sm:text-lg text-sm cursor-pointer hover:opacity-100">
        <p class='opacity-75'>Current Epoch {{currentEpoch}}</p>
      </div>
      <div
          class="w-8/10 h-12 mb-4 py-4 mx-auto rounded-xl bg-white flex flex-col justify-center text-center items-center pink sm:text-lg text-sm cursor-pointer hover:opacity-100">
        <p class='opacity-75'>Registered Piggies {{currentEpochPiggyCount}} / {{ piggyList.length }}</p>
      </div>
      <div
          class="w-8/10 h-12 mb-0 py-4 mx-auto rounded-xl bg-white flex flex-col justify-center text-center items-center pink sm:text-lg text-sm cursor-pointer hover:opacity-100">
        <p class='opacity-75'>Epoch Ends in {{getEpochEndTime(contractTimeStamp)}}</p>
      </div>
      <div v-if='!lastEpochEnded'
           class='w-8/10 h-12 mb-2 py-4 mb-4 mx-auto rounded-xl flex flex-row text-center cursor-pointer'>
        <div v-on:click='endEpoch()'
             class='w-full rounded-xl pink-border-bottom press-anim text-white h-12 bg-white pink'>
          <p class='pink mt-2'>End Last Epoch</p>
        </div>
      </div>
      <h2 class='h-auto w-full text-center mt-2 sm:text-2xl text-xl text-white mb-4 pt-2 z-10'>Your Piggies
      </h2>
      <div v-show='!loading' v-for='piggy in piggyList' :key='piggy.id'
           class='sm:w-8/10 w-9/10 h-36 my-6 py-6 px-2 pink-border-bottom mx-auto rounded-xl relative bg-white flex flex-col justify-center text-center items-center pink sm:text-lg text-sm cursor-pointer hover:opacity-100'>
        <p
            class='text-pink sm:text-xl text-sm bg-white sm:-top-8 -top-6 absolute w-5/10 rounded-xl rounded-b-none my-1'>
          Piggy
          #{{ piggy.id }}</p>
        <div class='w-full h-full relative flex flex-row'>
          <div class='flex flex-col items-center mt-auto justify-center h-full w-5/10'>
            <p class='text-pink text-xs sm:text-sm opacity-75 my-1'>Last Epoch</p>
            <p class='text-pink text-xs opacity-75'>{{(piggy.claimedLastEpoch / 10 ** 18).toFixed(2)}}</p>
            <p v-if='piggy.claimedLastEpoch > 0' v-on:click='claimDividendsForPiggy(piggy)'
               class='sm:text-sm text-xs sm:w-7/10 w-full rounded-2xl text-center press-anim cursor-pointer text-white py-1 bg-pink pink-border-bottom border mt-2'>
              Claim</p>
            <p v-else
               class='sm:text-sm text-xs sm:w-7/10 w-full rounded-2xl text-center opacity-50 text-white py-1 bg-pink border mt-2'>
              Claim</p>
          </div>
          <div class='w-4/10 h-1/5 relative'>
            <img v-for='(attribute, index) in piggy.attributes' :key='index'
                 class="absolute sm:-top-6 top-0" v-bind:src='getPiggieAttributeImage(attribute)' alt="Pig">
          </div>
          <div class='flex flex-col justify-center mt-auto items-center h-full w-5/10'>
            <p v-if='piggy.isRegistered' class='text-pink text-xs sm:text-sm opacity-75 my-1'>Current Epoch
            </p>
            <p v-if='!piggy.isRegistered' class='text-pink text-xs sm:text-sm opacity-75 my-1'>Not
              Registered</p>
            <p v-if='piggy.isRegistered' class='text-pink text-xs opacity-75'>
              {{(piggy.claimedNextEpoch / 10 ** 18).toFixed(2)}}</p>
            <p v-on:click='registerPiggy(piggy)' v-if='!piggy.isRegistered'
               class='sm:text-sm text-xs sm:w-7/10 w-full rounded-2xl text-center press-anim cursor-pointer text-white py-1 bg-pink pink-border-bottom border mt-2'>
              Register</p>
            <p v-else
               class='sm:text-sm text-xs sm:w-7/10 w-full rounded-2xl text-center opacity-50 text-white py-1 bg-pink border mt-2'>
              Register</p>
          </div>
        </div>
      </div>
      <div v-if='loading' class='absolute top-0 bottom-0 left-0 right-0 flex flex-col justify-center items-center'
           style='z-index: 9999; background-color: rgba(0,0,0,0.5)'>
        <img class='fa-spin' width="68px" src='/pigs/snout.svg' />
        <h2 class='mt-3 text-2xl text-white'>Loading...</h2>
      </div>

    </div>
  </div>
</template>


<script>
import PiggyDividends from "../../plugins/artifacts/piggyDividends.json";
import {
  ethers
} from "ethers";
import {
  mapGetters
} from "vuex";

export default {
  name: 'PiggyDividends',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    tamagotchiContract: {
      type: Object,
      default: undefined
    },
    piggyList: {
      type: Array,
      default: []
    }
  },
  computed: {
    ...mapGetters([
      'metaMaskAccount',
      'metaMaskWallet'
    ]),
  },
  data() {
    return {
      loading: false,
      contract: undefined,
      currentEpoch: 0,
      currentEpochPiggyCount: 0,
      dividendsKey: 0,
      lastEpochEnded: false,
      piggyListMirror: [],
      contractTimeStamp: 1640343600000
    };
  },
  async mounted() {
    this.contract = await new ethers.Contract(PiggyDividends.address, PiggyDividends.abi, this
        .metaMaskWallet
        .signer);

    await this.getEpochInfo();
    await this.fetchPiggyData(0);
  },
  methods: {

    async getEpochInfo() {
      try {

      } catch (err) {
        this.$emit('error', err);
      }
    },

    getPiggieAttributeImage(attribute) {
      if (attribute.trait_type === 'Background') return '/pigs/attributes/none.png';
      return `/pigs/attributes/${attribute.trait_type}/${attribute.value}.png`;
    },

    getEpochEndTime(timeStamp) {
      const dateNow = Date.now();
      const millis = (72 * 3600 * 1000) - (dateNow - timeStamp) % (72 * 3600 * 1000);

      return this.$timeStamper(millis);
    },

    async claimDividendsForPiggy(piggy) {
      try {
        if (!this.lastEpochEnded) throw 'You must end the epoch before claiming rewards!';
        const tx = await this.contract.claim(piggy.id);
        await tx.wait(1);
        piggy.claimedLastEpoch = 0;
      } catch (err) {
        this.$emit('error', err);
      }
    },

    async registerPiggy(piggy) {
      try {
        const piggyStatus = await this.tamagotchiContract.isImported(piggy.id);
        if (!piggyStatus) throw `Piggy #${piggy.id} is not imported!`;
        const piggyDead = await this.tamagotchiContract.isDead(piggy.id);
        if (piggyDead) throw `Piggy #${piggy.id} is dead`;

        const tx = await this.contract.registerPig(piggy.id);
        await tx.wait(1);
        piggy.registered = true;
        this.$toast.success(`Piggy #${piggy.id} has been registered!`);
        this.fetchPiggyData();
      } catch (err) {
        this.$emit('error', err);
      }
    },

    async claimAllPiggys(piggyList) {
      const piggyIds = [];
      piggyList.forEach(c => piggyIds.push(c.id));

      try {
        if (!this.lastEpochEnded) throw 'You must end the epoch before claiming rewards!';
        const tx = await this.contract.bulkClaimPig(piggyIds);
        await tx.wait(1);
        await this.fetchPiggyData();
      } catch (err) {
        this.$emit('error', err);
      }
    },

    async registerAllPiggys(piggyList) {
      const piggyIds = [];
      piggyList.forEach(piggy => {
        if (!piggy.isDead && !piggy.isRegistered) piggyIds.push(piggy.id);
      });

      try {
        const tx = await this.contract.bulkRegisterPig(piggyIds);
        await tx.wait(1);
        this.$toast.success(`Your piggies have been registered!`);
        await this.fetchPiggyData();
      } catch (err) {
        this.$emit('error', "Couldn't register one or more piggies.");
      }
    },

    async endEpoch() {
      try {
        const tx = await this.contract.endLastEpoch();
        await tx.wait(1);
        this.$toast.success(`The epoch has been ended! Claim your reward!`);
        await this.fetchPiggyData();
      } catch (err) {
        this.$emit('error', "The epoch was ended by another player.");
      }
    },

    async fetchPiggyData() {
      this.loading = true;
      this.lastEpochEnded = await this.contract.lastEpochEnded();
      this.currentEpoch = await this.contract.currentEpochNumber();
      const data = await this.contract.bigDaddyFunction(this.metaMaskAccount);

      const piggies = data.bigDaddyPigResults;
      this.currentEpochPiggyCount = data.registered;

      for (let i = 0; i < piggies.length; i++) {
        const piggy = this.piggyList.filter(c => c.id == piggies[i].pigId)[0];
        if (!piggy) continue;

        piggy.isRegistered = piggies[i].registered;
        piggy.claimedLastEpoch = piggies[i].claimable * 1;
        piggy.claimedNextEpoch = piggies[i].claimableNextEpoch * 1;
      }

      this.dividendsKey++;
      this.loading = false;
    }
  }
}
</script>

<style scoped>
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
</style>