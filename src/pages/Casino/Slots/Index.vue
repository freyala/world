<template>
  <section style="
      background: url('/images/map/worldmap.png') no-repeat;
      background-size: cover;
      min-height: 100vh;
    " class="flex p-4 md:p-16 lg:px-32">
    <div style="background: #1c1c1c; z-index: 9999; overflow-y: auto" class="screen rounded-2xl w-full">
      <section id="section-i-1" class="border-b-4 border-primary-alt" style="
          background: url('/images/SVG/homepage-bg-top.svg') no-repeat top right;
        ">
        <div class="container mx-auto text-center pt-12 md:pt-12 pb-12 md:pb-12">
          <h1 class="text-2xl md:text-5xl text-primary-alt font-semibold">
            Slots
          </h1>
        </div>
      </section>
      <div v-if="!loader.slots" class="p-4 xl:p-8 relative mt-12">
        <div class="m-auto text-center">
          <div class="w-full flex">
            <img class="w-24 h-24 m-auto" src="/images/XYA.png" alt="XYA logo"
              style="animation: rotation 2s infinite linear" />
          </div>
          <br />
          <p class="text-2xl">Loading...</p>
        </div>
      </div>
      <div v-if="loader.slots" id="slot-container" class="p-4 md:p-8 relative flex justify-center mt-10">
        <div class="absolute top-0 left-0 p-4 md:p-8">
          <router-link :to="{ name: 'casino' }">
            <i class="fas fa-long-arrow-alt-left"></i> Back
          </router-link>
        </div>

        <div class="w-1/5 mt-16 text-center">
          <div class="text-2xl mb-3">Control Panel</div>
          <hr class="opacity-50" />
          <div :key="loader.allowance" class="mt-3 mb-3 flex justify-center">
            <a v-if="allowance <= 0" v-on:click="addAllowance(999999999999.9999)" class="hpt-btn w-5/6"
              href="javascript:;"><span><span v-if="!loader.contractAllowance">Enable Contract</span>
                <i v-if="loader.contractAllowance" class="fas fa-cog fa-spin"></i></span></a>
            <a v-if="allowance > 0" v-on:click="addAllowance(0)" class="hpt-btn w-5/6" href="javascript:;"><span><span
                  v-if="!loader.contractAllowance">Disable Contract</span>
                <i v-if="loader.contractAllowance" class="fas fa-cog fa-spin"></i></span></a>
          </div>
          <div v-if="allowance > 0" class="mt-3 mb-3 flex justify-center">
            <a v-on:click="showInsertCoinModal()" class="hpt-btn" href="javascript:;"><span><span
                  v-if="!loader.contractInsert">Insert XYA</span>
                <i v-if="loader.contractInsert" class="fas fa-cog fa-spin"></i></span></a>
          </div>
          <div v-if="allowance > 0" class="mt-3 mb-3 flex justify-center">
            <a v-on:click="withdraw()" class="hpt-btn" href="javascript:;"><span>
                <span v-if="!loader.contractWithdraw">Collect</span>
                <i v-if="loader.contractWithdraw" class="fas fa-cog fa-spin"></i></span></a>
          </div>

          <div class="mt-3 mb-3 flex justify-center">
            <a v-on:click="showPayTable()" class="hpt-btn" href="javascript:;"><span>Paytable</span></a>
          </div>
          <div v-if="allowance > 0" class="mt-3 mb-3 flex justify-center">
            <a v-on:click="forceMachineUpdate()" class="hpt-btn" href="javascript:;"><span><span
                  v-if="!loader.contractUpdateMachine">Update Machine</span>
                <i v-if="loader.contractUpdateMachine" class="fas fa-cog fa-spin"></i></span></a>
          </div>
        </div>
        <SlotMachine class="mr-40 ml-40" style="width: 450px; height: 500px" :contract="this.slotsContract"
          ref="slotMachine" v-on:roundFinished="onRoundFinished($event)"></SlotMachine>
        <div class="w-1/5 mt-16 text-center">
          <div class="text-2xl mb-3">Round Winnings</div>
          <div v-if="roundsHistory.length === 0">
            <hr class="opacity-50" />
            <p class="opacity-75 mt-3">You haven't played any rounds.</p>
          </div>
          <div v-for="(round, index) in roundsHistory" :key="index">
            <hr class="opacity-50" />
            <div class="mt-3 mb-3">
              <p class="opacity-75">Won</p>
              <p v-if="round > 0" class="text-xl">{{ round }} XYA</p>
              <p v-else class="text-xl opacity-50">Nothing</p>
            </div>
          </div>
        </div>
      </div>

      <window name="insert">
        <div class="flex flex-wrap p-6 bg-dark h-full">
          <div class="w-4/5">
            <div class="text-2xl">Insert XYA</div>
          </div>
          <div class="w-1/5 text-right">
            <i @click="$modal.hide('insert')" class="fas fa-times cursor-pointer text-xl"></i>
          </div>
          <div class="mt-4 flex w-full items-start justify-start">
            <input type="text" v-model="xyaAmount" />

            <div class="text-center w-full">
              <a v-on:click="insertCoin()" href="javascript:;"><span>Confirm</span></a>
            </div>
          </div>
        </div>
      </window>
    </div>
  </section>
</template>

<script>
  import fromExponential from "from-exponential";
  import SlotMachine from "../../../components/Casino/Slots/SlotMachine";
  import SlotScreen from "../../../components/Casino/Slots/SlotScreen";
  import {
    mapGetters,
    mapActions
  } from "vuex";
  import {
    ethers
  } from "ethers";
  import {
    initWeb3
  } from "../../../plugins/initWeb3";

  import wallet from "../../../plugins/wallet";
  import Slots from "../../../plugins/artifacts/newSlots.json";
  import HPTToken from "../../../plugins/artifacts/hptToken.json";

  export default {
    name: "Slots",
    components: {
      SlotMachine,
      SlotScreen
    },
    mixins: [wallet],
    data() {
      return {
        roundsHistory: [],
        mainContract: null,
        allowance: 0,
        slotsContract: null,
        xyaAmount: 0,
        loader: {
          contractAllowance: false,
          contractInsert: false,
          contractWithdraw: false,
          contractUpdateMachine: false,
          slots: false,
          allowance: false,
        },
      };
    },
    computed: {
      ...mapGetters(["metaMaskAccount", "metaMaskWallet"]),
    },
    methods: {
      ...mapActions([""]),
      showPayTable() {
        this.$refs.slotMachine.showPayTable();
      },
      async forceMachineUpdate() {
        await this.$refs.slotMachine.fetchPlayerData();
        await this.$refs.slotMachine.fetchGameReels();
      },
      showInsertCoinModal() {
        this.$modal.show("insert");
      },
      async insertCoin() {
        if (this.loader.contractInsert) return;
        try {
          const amount = this.xyaAmount;
          let actual = 0;

          if (amount > 0) {
            actual = amount * 10 ** 18;
          } else {
            actual = 0;
          }

          const arg = fromExponential(actual);
          const tx = await this.slotsContract.insertXYA(arg);

          this.loader.contractInsert = true;
          this.$modal.hide("insert");

          await tx.wait(1);
          this.loader.contractInsert = false;
        } catch (err) {
          this.loader.contractInsert = false;
        }
      },
      async withdraw() {
        if (this.loader.contractWithdraw) return;
        try {
          const tx = await this.slotsContract.withdraw();
          this.loader.contractWithdraw = true;
          await tx.wait(1);
          this.loader.contractWithdraw = false;
        } catch (err) {
          this.loader.contractWithdraw = false;
        }
      },
      async addAllowance(amount) {
        if (this.loader.contractAllowance) return;
        let actual = 0;

        if (amount > 0) {
          actual = amount * 10 ** 18;
        } else {
          actual = 0;
        }

        try {
          const arg = fromExponential(actual);
          const tx = await this.mainContract.approve(
            this.slotsContract.address,
            arg
          );
          this.loader.contractAllowance = true;

          await tx.wait(1);
          this.loader.contractAllowance = false;
        } catch (err) {
          this.loader.contractAllowance = false;
        }

        const data = await this.mainContract.allowance(
          this.metaMaskAccount,
          this.slotsContract.address
        );
        this.allowance = ethers.utils.formatEther(
          data._isBigNumber ? ethers.BigNumber.from(data).toString() : data
        );
      },
      async onRoundFinished(roundWinnings) {
        this.appendToLocalStorageList("rounds_history", roundWinnings, 5);
        this.roundsHistory.unshift(roundWinnings);
        this.roundsHistory = this.roundsHistory.slice(0, 5);
      },

      //WILL MOVE THESE IN A LOCAL STORAGE VUE PLUGIN
      async appendToLocalStorageList(key, item, max = 999) {
        const listData = await localStorage.getItem(key);
        let listItems = JSON.parse(listData);
        if (!listItems || listItems.length === 0) {
          await localStorage.setItem(key, JSON.stringify([item]));
          return;
        }

        if (listItems.length > max) {
          listItems.slice(0, max);
        }

        listItems.unshift(item);
        await localStorage.setItem(key, JSON.stringify(listItems));
      },
      async removeFromLocalStorageList(key, item) {
        const listData = await localStorage.getItem(key);
        let listItems = JSON.parse(listData);

        listItems = listItems.filter((c) => c !== item);
        await localStorage.setItem(key, JSON.stringify(listItems));
      },
      async getLocalStorageItem(key) {
        const itemData = await localStorage.getItem(key);
        let item = JSON.parse(itemData);

        return item;
      },
    },
    async mounted() {
      this.mainContract = new ethers.Contract(
        HPTToken.address,
        HPTToken.abi,
        this.metaMaskWallet.signer
      );
      this.slotsContract = new ethers.Contract(
        Slots.address,
        Slots.abi,
        this.metaMaskWallet.signer
      );

      const allowance = await this.mainContract.allowance(
        this.metaMaskAccount,
        Slots.address
      );

      this.allowance = ethers.utils.formatEther(
        allowance._isBigNumber ?
        ethers.BigNumber.from(allowance).toString() :
        allowance
      );
      this.loader.allowance = true;
      this.loader.slots = true;

      this.roundsHistory = await this.getLocalStorageItem("rounds_history");
      if (!this.roundsHistory) this.roundsHistory = [];
      this.roundsHistory = this.roundsHistory.slice(0, 5);
    },
  };
</script>

<style>
  #slot-container {
    --var-slots-bg: #1e2b22;
    --var-slots-dark-bg: #181f1f;
    --var-hilight-color: #43ac6b;
    --var-hilight-strong: #8cd1a6;
    --var-soft-shadow-color: #263c2f;
    --var-shadow-color: #0e1111;
    --var-border-radius: 12px;
    border-radius: 12px;
  }

  .inner-shadow {
    -moz-box-shadow: inset 0 0 12px var(--var-shadow-color);
    -webkit-box-shadow: inset 0 0 12px var(--var-shadow-color);
    box-shadow: inset 0 0 12px var(--var-shadow-color);
  }

  .highlight-border {
    border-width: 1px;
    border-style: solid;
    border-image: linear-gradient(225deg,
        var(--var-hilight-color),
        var(--var-soft-shadow-color),
        var(--var-soft-shadow-color)) 1 25%;
  }

  .hpt-btn {
    background-color: var(--var-slots-bg);
    border-radius: var(--var-border-radius);
    box-sizing: border-box;
    color: #8cd1a7c7;
    display: block;
    height: 40px;
    font-size: 18px;
    padding: 4px;
    position: relative;
    text-decoration: none;
    z-index: 2;
    transition: all 1s ease-out;
    width: 75%;
  }

  .hpt-btn:hover {
    background-image: linear-gradient(190deg,
        var(--var-hilight-strong) 5%,
        var(--var-hilight-color) 10%,
        var(--var-soft-shadow-color),
        var(--var-slots-bg));
    color: #fff;
  }

  .hpt-btn span {
    align-items: center;
    background: var(--var-slots-bg);
    border-radius: var(--var-border-radius);
    display: flex;
    justify-content: center;
    height: 100%;
    transition: background 0.1s ease;
    width: 100%;
  }

  .hpt-btn:hover span {
    background: transparent;
  }
</style>