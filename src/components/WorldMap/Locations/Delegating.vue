<template>
  <transition name="slide">
    <div class="slide-in shadow-xl" v-if="openWindow === 'staking' || openWindow === 'staking-large'"
         :style="openWindow === 'casino-large' ? 'width: 100%;' : 'width: 30vw;'"
         style="background: url('/images/ui/screen-bg.png') repeat-y; top: 64px; min-width: 500px; background-size: contain; overflow-y: scroll;">
      <div class="flex relative">
        <img class="mx-auto" src="/images/ui/window-banner.png" alt="Banner">
        <div class="absolute text-center w-full" style="top: 75px">
          <p class="text-2xl">Extraction sites</p>
        </div>
      </div>

      <br>

      <div class="flex flex-wrap">
        <button class="w-full rounded-none border border-yellow bg-transparent px-4 py-2 h-12" @click="withdrawEarnings(false)">Claim rewards</button>
      </div>

      <br>
      <br>

      <div class="flex flex-wrap">
        <small class="w-full">{{ allowance }} XYA</small>

        <div class="w-1/2 pr-2">
          <input class="w-full border border-yellow bg-transparent px-4 h-12" v-model="amountToApprove" type="number">
        </div>
        <div class="w-1/2 pl-2">
          <button class="w-full rounded-none border border-yellow bg-transparent px-4 py-2 h-12" @click="addAllowance()">Set allowance</button>
        </div>

        <button class="w-full rounded-none border border-yellow bg-transparent px-4 py-2 h-12 mt-4" @click="addAllowance(999999999999.9999)">Set max allowance</button>
      </div>

      <br>

      <div class="flex flex-wrap">
        <small class="w-full">{{ userBalance }} XYA</small>

        <div class="w-1/2 pr-2">
          <input class="w-full border border-yellow bg-transparent px-4 h-12" v-model="amountToStake" type="number">
        </div>
        <div class="w-1/2 pl-2">
          <button class="w-full rounded-none border border-yellow bg-transparent px-4 py-2 h-12" @click="stake(false)">Stake</button>
        </div>

        <button class="w-full rounded-none border border-yellow bg-transparent px-4 py-2 h-12 mt-4" @click="stake(true)">Stake all</button>
      </div>

      <br>

      <div class="flex flex-wrap">
        <small class="w-full">{{ stakingBalance }} XYA</small>

        <div class="w-1/2 pr-2">
          <input class="w-full border border-yellow bg-transparent px-4 py-2 h-12" v-model="amountToUnstake" type="number">
        </div>
        <div class="w-1/2 pl-2">
          <button class="w-full rounded-none border border-yellow bg-transparent px-4 py-2 h-12" @click="unstake(false)">Unstake</button>
        </div>

        <button class="w-full rounded-none border border-yellow bg-transparent px-4  h-12 mt-4" @click="unstake(true)">Unstake all</button>
      </div>
      <br>
      <hr>
      <br>
      <p class="text-xl pb-24">
        The vast cave system beneath the kingdom of Freyala had been untouched for centuries. There had always
        been
        rumors that these caves was where the world had been drawing magic from, with creatures naturally
        being
        drawn to the entrances. A group of miners led by Payne, a man known for his talent in acquiring the
        rarest
        of jewels, had discovered a mystical ore unlike anything seen before.
        <br>
        <br>
        Payne immediately sought out the village elder, Zarius. Once the regent learned of this ore’s
        existence, he
        named it ‘XYA’ after his deceased daughter and quickly became obsessed with studying this ore, in
        hopes of
        finding the key to immortality. Apart from the most loyal servants of Regent Carroway, not a single
        person
        was allowed to step foot into the mines. Regent Carroway seemed to be immensely thankful, promising
        power
        and riches to Payne’s crew.
        <br>
        <br>
        Extraction sites were shortly constructed to excavate the cave and increase the monarch’s possession
        of XYA.
        Anyone that neared these caves, Freyfolk or not, were ordered to be killed on sight. There have been
        no
        traces of Payne’s crew since.
      </p>
    </div>
  </transition>
</template>

<script>
import fromExponential from "from-exponential";

import {mapGetters} from "vuex";
import {ethers} from "ethers";

import wallet from "../../../plugins/wallet";
import Freyala from "../../../plugins/artifacts/freyala.json";
import Staking from "../../../plugins/artifacts/staking.json";

export default {
  name: 'Delegating',
  mixins: [wallet],
  computed: {
    ...mapGetters([
      'loadingBalances',
      'userBalance',
      'stakingBalance',
      'rewardBalance',
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
      stakingContract: {},
      amountToStake: 0,
      amountToApprove: 0,
      amountToUnstake: 0
    }
  },
  watch: {
    async metaMaskWallet() {
      this.mainContract = new ethers.Contract(Freyala.address, Freyala.abi, this.metaMaskWallet.signer)
      this.stakingContract = new ethers.Contract(Staking.address, Staking.abi, this.metaMaskWallet.signer)
    }
  },
  methods: {
    async updateStakes() {
      const stake = await this.stakingContract.stakes(this.metaMaskAccount)
      this.stakes = stake;
      return stake;
    },
    async updateTotalStaked() {
      if (this.stakingContract) {
        return await this.stakingContract.totalStaked()
      }
    },
    async addAllowance(amount) {
      this.error = ''

      let actual = 0

      if (amount) {
        actual = amount * (10 ** 18);
      } else {
        actual = this.amountToApprove * (10 ** 18);
      }

      const arg = fromExponential(actual);

      try {
        await this.mainContract.approve(Staking.address, arg)
      } catch (err) {
        if (err.code !== 4001) {
          this.error = err
        }
        console.error(err);
      }

      this.amountToApprove = 0;
    },
    async stakeRewards() {
      if (this.stakingContract) {
        const rewards = parseInt(await this.stakingContract.stakeRewards(this.metaMaskAccount))
        const owing = parseInt(await this.stakingContract.calculateEarnings(this.metaMaskAccount))
        const sum = rewards + owing;
        this.stakingRewards = sum;
        return sum;
      }
    },
    async stake(all) {
      this.error = ''
      let actual = 0

      if (all) {
        actual = await this.mainContract.balanceOf(this.metaMaskAccount)
      } else {
        actual = this.amountToStake * (10 ** 18);
      }

      const arg = fromExponential(actual);

      try {

        const status = await this.stakingContract.registered(this.metaMaskAccount)

        if (status) {
          await this.stakingContract.stake(arg)

        } else {
          let ref = "0x0000000000000000000000000000000000000000";

          await this.stakingContract.registerAndStake(arg, ref)
        }

        this.amountToStake = 0;

      } catch (err) {
        if (err.code !== 4001) {
          this.error = err
        }
        console.error(err);
      }

      this.stakingLoading = false;
    },
    async unstake(all) {
      this.error = ''

      if (parseInt(this.stakingBalance) === 0) {
        this.error = "You don't have any staked XYA yet!"
        console.error("You don't have any staked XYA yet!");
        return;
      }

      let actual = 0

      if (all) {
        actual = await this.stakingContract.stakes(this.metaMaskAccount)
      } else {
        actual = this.amountToUnstake * (10 ** 18);
      }

      const arg = fromExponential(actual)

      try {
        await this.stakingContract.unstake(arg)
        this.amountToUnstake = 0;

      } catch (err) {
        if (err.code !== 4001) {
          this.error = err
        }
        console.error(err);
      }
    },
    async withdrawEarnings() {
      this.error = ''

      if (parseFloat(this.rewardBalance) === 0) {
        this.error = "No earnings yet!"
        console.error("No earnings yet!");
        return;
      }

      this.withdrawLoading = true;
      try {
        await this.stakingContract.withdrawEarnings()
      } catch (err) {
        if (err.code !== 4001) {
          this.error = err
        }
        console.error(err);
      }
    }
  }
}
</script>