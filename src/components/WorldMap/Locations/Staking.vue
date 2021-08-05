<template>
  <transition name="slide" v-if="chainStatus === 'correct' && walletConnected && stakingMounted">
    <div class="slide-in shadow-xl relative" v-if="openWindow === 'staking' || openWindow === 'staking-large'"
         :style="openWindow === 'casino-large' ? 'width: 100%;' : 'width: 30vw;'"
         style="background: url('/images/ui/screen-bg.png') repeat-y; top: 64px; min-width: 500px; background-size: contain; overflow-y: scroll;">

      <div class="absolute top-0 left-0 py-4 px-6">
        <i @click="$store.dispatch('setOpenWindow', '')" class="fas fa-times cursor-pointer text-xl"></i>
      </div>

      <div class="flex relative cursor-pointer" @click="setFavourite('staking')">
        <img v-if="favourites.includes('staking')" class="mx-auto" src="/images/ui/window-banner-favourite.png"
             alt="Banner">
        <img v-else class="mx-auto" src="/images/ui/window-banner-unfavourite.png" alt="Banner">
        <div class="absolute text-center w-full" style="top: 80px; line-height: 0.25">
          <small>Click to favourite</small>
          <p class="text-2xl">Extraction sites</p>
        </div>
      </div>

      <br>

      <p>
        {{ error }}
      </p>

      <br>

      <div class="flex flex-wrap">
        <div class="w-full">
          <p class="text-xl text-center">
            Staking contract info:
          </p>
        </div>
        <div class="w-1/2">
          <p class="text-center">
            Rewards left:
          </p>
          <p class="text-center">{{ parseFloat(rewardPool).toFixed(4) }} XYA</p>
        </div>
        <div class="w-1/2">
          <p class="text-center">
            Total staked:
          </p>
          <p class="text-center">{{ parseFloat(totalStaked).toFixed(4) }} XYA</p>
        </div>

        <div class="w-full">
          <br>
          <hr>
          <br>
        </div>

        <div class="w-full">
          <p class="text-xl text-center">
            User staking info:
          </p>
        </div>
        <div class="w-1/2">
          <p class="text-center">
            In wallet:
          </p>
          <p class="text-center">{{ userBalance }} XYA</p>
        </div>
        <div class="w-1/2">
          <p class="text-center">
            In staking:
          <p class="text-center">{{ stakingBalance }} XYA</p>
        </div>
      </div>

      <br>
      <br>

      <div class="flex flex-wrap">
        <button v-if="rewardBalance === '0.000'" class="w-full rounded-none border border-yellow bg-transparent px-4 py-2 h-12">
          No rewards to claim
        </button>
        <button v-else class="w-full rounded-none border border-yellow bg-transparent px-4 py-2 h-12"
                @click="withdrawEarnings(false)">
          Claim {{ rewardBalance }} XYA <i v-if="loading.withdrawing" class="fas fa-cog fa-spin"></i>
        </button>
      </div>

      <br>

      <div class="flex flex-wrap">
        <small class="w-full">Currently approved: {{ allowance.staking }} XYA</small>

        <div class="w-1/2 pr-2">
          <input class="w-full border border-yellow bg-transparent px-4 h-12" v-model="amountToApprove" type="number">
        </div>
        <div class="w-1/2 pl-2">
          <button class="w-full rounded-none border border-yellow bg-transparent px-4 py-2 h-12"
                  @click="addAllowance()">
            Approve amount <i v-if="loading.allowance" class="fas fa-cog fa-spin"></i>
          </button>
        </div>

        <button class="w-full rounded-none border border-yellow bg-transparent px-4 py-2 h-12 mt-4"
                @click="addAllowance(999999999999.9999)">
          Approve max amount <i v-if="loading.maxAllowance" class="fas fa-cog fa-spin"></i>
        </button>
      </div>

      <br>

      <div class="flex flex-wrap">
        <small class="w-full">Max: {{ userBalance }} XYA</small>

        <div class="w-1/2 pr-2">
          <input class="w-full border border-yellow bg-transparent px-4 h-12" v-model="amountToStake" type="number">
        </div>
        <div class="w-1/2 pl-2">
          <button class="w-full rounded-none border border-yellow bg-transparent px-4 py-2 h-12" @click="stake(false)">
            Stake <i v-if="loading.staking" class="fas fa-cog fa-spin"></i>
          </button>
        </div>

        <button class="w-full rounded-none border border-yellow bg-transparent px-4 py-2 h-12 mt-4"
                @click="stake(true)">
          Stake all <i v-if="loading.stakingAll" class="fas fa-cog fa-spin"></i>
        </button>
      </div>

      <br>

      <div class="flex flex-wrap">
        <small class="w-full">Max: {{ stakingBalance }} XYA</small>

        <div class="w-1/2 pr-2">
          <input class="w-full border border-yellow bg-transparent px-4 py-2 h-12" v-model="amountToUnstake"
                 type="number">
        </div>
        <div class="w-1/2 pl-2">
          <button class="w-full rounded-none border border-yellow bg-transparent px-4 py-2 h-12"
                  @click="unstake(false)">
            Unstake <i v-if="loading.unstaking" class="fas fa-cog fa-spin"></i>
          </button>
        </div>

        <button class="w-full rounded-none border border-yellow bg-transparent px-4  h-12 mt-4" @click="unstake(true)">
          Unstake all <i v-if="loading.unstakingAll" class="fas fa-cog fa-spin"></i>
        </button>
      </div>
      <br>
      <hr>
      <br>
      <p class="text-xl pb-24">
        The vast cave system beneath the kingdom of Freyala had been untouched for centuries. There had always been
        rumors that these caves was where the world had been drawing magic from, with creatures naturally being drawn to
        the entrances. A group of miners led by Payne, a man known for his talent in acquiring the rarest of jewels, had
        discovered a mystical ore unlike anything seen before.
        <br>
        <br>
        Payne immediately sought out the village elder, Zarius. Once the regent learned of this ore’s existence, he
        named it ‘XYA’ after his deceased daughter and quickly became obsessed with studying this ore, in hopes of
        finding the key to immortality. Apart from the most loyal servants of Regent Carroway, not a single person was
        allowed to step foot into the mines. Regent Carroway seemed to be immensely thankful, promising power and riches
        to Payne’s crew.
        <br>
        <br>
        Extraction sites were shortly constructed to excavate the cave and increase the monarch’s possession of XYA.
        Anyone that neared these caves, Freyfolk or not, were ordered to be killed on sight. There have been no traces
        of Payne’s crew since.
      </p>
    </div>
  </transition>
</template>

<script>
import fromExponential from "from-exponential"

import {mapGetters, mapActions} from "vuex"
import {ethers} from "ethers"

import wallet from "../../../plugins/wallet"
import Freyala from "../../../plugins/artifacts/freyala.json"
import Staking from "../../../plugins/artifacts/staking.json"

export default {
  name: 'Staking',
  mixins: [wallet],
  computed: {
    ...mapGetters([
      'chainID',
      'chainStatus',
      'loadingBalances',
      'userBalance',
      'stakingBalance',
      'rewardBalance',
      'loggedIn',
      'walletConnected',
      'metaMaskAccount',
      'metaMaskWallet',
      'openWindow',
      'allowance',
      'favourites'
    ])
  },
  data() {
    return {
      rewardPool: 0,
      totalStaked: 0,
      stakingMounted: false,
      preApprove: false,
      mainContract: {},
      stakingContract: {},
      amountToStake: 0,
      amountToApprove: 0,
      amountToUnstake: 0,
      error: '',
      loading: {
        withdrawing: false,
        maxAllowance: false,
        allowance: false,
        staking: false,
        stakingAll: false,
        unstaking: false,
        unstakingAll: false
      }
    }
  },
  watch: {
    async metaMaskWallet() {
      this.mainContract = new ethers.Contract(Freyala.address, Freyala.abi, this.metaMaskWallet.signer)
      this.stakingContract = new ethers.Contract(Staking.address, Staking.abi, this.metaMaskWallet.signer)

      const staked = await this.stakingContract.totalStaked()
      this.totalStaked = ethers.utils.formatEther(staked._isBigNumber ? ethers.BigNumber.from(staked).toString() : staked)

      const reward = await this.stakingContract.rewardPool()
      this.rewardPool = ethers.utils.formatEther(reward._isBigNumber ? ethers.BigNumber.from(reward).toString() : reward)
    }
  },
  mounted() {
    this.stakingMounted = true
  },
  methods: {
    ...mapActions([
      'setFavourite'
    ]),
    async updateStakes() {
      const stake = await this.stakingContract.stakes(this.metaMaskAccount)
      this.stakes = stake
      return stake
    },
    async updateTotalStaked() {
      if (this.stakingContract) {
        return await this.stakingContract.totalStaked()
      }
    },
    async stakeRewards() {
      if (this.stakingContract) {
        const rewards = parseInt(await this.stakingContract.stakeRewards(this.metaMaskAccount))
        const owing = parseInt(await this.stakingContract.calculateEarnings(this.metaMaskAccount))
        const sum = rewards + owing
        this.stakingRewards = sum
        return sum
      }
    },
    async addAllowance(amount) {
      this.error = ''

      let actual = 0

      if (amount) {
        actual = amount * (10 ** 18)
        this.loading.maxAllowance = true
      } else {
        actual = this.amountToApprove * (10 ** 18)
        this.loading.allowance = true
      }

      const arg = fromExponential(actual)

      try {
        const tx = await this.mainContract.approve(Staking.address, arg)

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

      this.amountToApprove = 0
    },
    async stake(all) {
      this.error = ''
      let actual = 0

      if (all) {
        actual = await this.mainContract.balanceOf(this.metaMaskAccount)
        this.loading.stakingAll = true
      } else {
        actual = this.amountToStake * (10 ** 18)
        this.loading.staking = true
      }

      const arg = fromExponential(actual)

      try {

        const status = await this.stakingContract.registered(this.metaMaskAccount)

        if (status) {
          const tx = await this.stakingContract.stake(arg)

          await tx.wait(1)

          this.loading.staking = false
          this.loading.stakingAll = false
        } else {
          let ref = "0x0000000000000000000000000000000000000000"

          const tx = await this.stakingContract.registerAndStake(arg, ref)

          await tx.wait(1)

          this.loading.staking = false
          this.loading.stakingAll = false
        }

        this.amountToStake = 0

      } catch (err) {
        if (err.code !== 4001) {
          this.error = err
        }

        this.loading.staking = false
        this.loading.stakingAll = false
        console.error(err)
      }
    },
    async unstake(all) {
      this.error = ''

      if (parseInt(this.stakingBalance) === 0) {
        this.error = "You don't have any staked XYA yet!"
        console.error("You don't have any staked XYA yet!")
        return
      }

      let actual = 0

      if (all) {
        actual = await this.stakingContract.stakes(this.metaMaskAccount)
        this.loading.unstakingAll = true
      } else {
        actual = this.amountToUnstake * (10 ** 18)
        this.loading.unstaking = true
      }

      const arg = fromExponential(actual)

      try {
        const tx = await this.stakingContract.unstake(arg)

        await tx.wait(1)

        this.loading.unstaking = false
        this.loading.unstakingAll = false

        this.amountToUnstake = 0
      } catch (err) {
        if (err.code !== 4001) {
          this.error = err
        }

        this.loading.unstaking = false
        this.loading.unstakingAll = false
        console.error(err)
      }
    },
    async withdrawEarnings() {
      this.error = ''

      if (parseInt(this.rewardBalance) === 0) {
        this.error = "No earnings yet!"
        console.error("No earnings yet!")
        return
      }

      this.loading.withdrawing = true
      try {
        const tx = await this.stakingContract.withdrawEarnings()

        await tx.wait(1)

        this.loading.withdrawing = false
      } catch (err) {
        if (err.code !== 4001) {
          this.error = err
        }
        this.loading.withdrawing = false
        console.error(err)
      }
    }
  }
}
</script>