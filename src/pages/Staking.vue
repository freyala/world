<template>
  <section style="background: url('/images/map/worldmap.png') no-repeat; background-size: cover; min-height: 100vh"
           class="flex p-4 md:p-16 lg:px-32">
    <div style="background: #1c1c1c; z-index: 9999; overflow-y: auto;" class="screen rounded-2xl w-full">
      <section id="section-i-1" class="border-b-4 border-primary-alt"
               style="background: url('/images/SVG/homepage-bg-top.svg') no-repeat top right">
        <div class="container mx-auto text-center pt-16 md:pt-24 pb-16 md:pb-20">
          <h1 class="text-2xl md:text-5xl text-primary-alt font-semibold">
            Extraction Mines
          </h1>
          <p class="text-xl text-primary-alt cursor-pointer" @click="setFavourite('staking')">
            <i v-if="favourites.includes('staking')" class="fas fa-star"></i>
            <i v-else class="far fa-star"></i>

            <span v-if="favourites.includes('staking')">Favourite</span>
            <span v-else>Favourite</span>
          </p>
        </div>
      </section>

      <div v-if="stakingMounted" class="p-4 md:p-8 relative">
        <div class="absolute top-0 left-0 p-4 md:p-8">
          <router-link :to="{ name: 'world-map' }">
            <i class="fas fa-long-arrow-alt-left"></i> Back
          </router-link>
        </div>

        <div class="flex">
          <div class="w-full md:w-4/5 lg:w-3/5 mx-auto">
            <div class="flex flex-wrap">
              <div class="w-full">
                <p class="text-xl text-center">
                  Extractor information
                </p>
              </div>
              <div class="w-1/2">
                <p class="text-center">
                  Gems left in pool
                </p>
                <p v-if="parseInt(rewardPool) === 0" class="text-center">Fetching...</p>
                <p v-else class="text-center">{{ parseFloat(rewardPool).toFixed(4) }} XYA</p>
              </div>
              <div class="w-1/2">
                <p class="text-center">
                  Gems actively extracting
                </p>
                <p v-if="parseInt(totalStaked) === 0" class="text-center">Fetching...</p>
                <p class="text-center">{{ parseFloat(totalStaked).toFixed(4) }} XYA</p>
              </div>

              <div class="w-full">
                <br>
                <hr>
                <br>
              </div>

              <div class="w-full">
                <p class="text-xl text-center">
                  User info
                </p>
              </div>
              <div class="w-1/2">
                <p class="text-center">
                  In wallet
                </p>
                <p class="text-center">{{ walletBalance }} XYA</p>
              </div>
              <div class="w-1/2">
                <p class="text-center">
                  In extractor
                <p class="text-center">{{ stakingBalance }} XYA</p>
              </div>
            </div>

            <br>
            <br>

            <div class="flex flex-wrap">
              <div class="w-full" v-if="parseInt(allowance) > 0">
                <button class="w-full rounded-none border border-primary-alt bg-transparent hover:bg-yellow hover:text-white px-4 py-2 h-12"
                        @click="addAllowance(0)">
                  Disable extractor <small>(contract will no longer have rights to use your XYA)</small> <i v-if="loading.allowance" class="fas fa-cog fa-spin"></i>
                </button>
              </div>

              <div class="w-full" v-else>
                <button class="w-full rounded-none border border-primary-alt bg-transparent hover:bg-yellow hover:text-white px-4 py-2 h-12 mt-4"
                        @click="addAllowance(999999999999.9999)">
                  Enable extractor <i v-if="loading.maxAllowance" class="fas fa-cog fa-spin"></i>
                </button>
              </div>
            </div>

            <br>

            <div class="flex flex-wrap" v-if="parseInt(allowance) > 0">
              <button v-if="rewardBalance === '0.0'"
                      class="w-full rounded-none border border-primary-alt bg-transparent hover:bg-yellow hover:text-white px-4 py-2 h-12">
                No rewards to claim
              </button>
              <button v-else class="w-full rounded-none border border-primary-alt bg-transparent hover:bg-yellow hover:text-white px-4 py-2 h-12"
                      @click="withdrawEarnings(false)">
                Claim {{ rewardBalance }} XYA <i v-if="loading.withdrawing" class="fas fa-cog fa-spin"></i>
              </button>
            </div>

            <br>

            <div v-if="parseInt(allowance) > 0">
              <div class="flex flex-wrap">
                <small class="w-full">Max: {{ walletBalance }} XYA</small>

                <div class="w-1/2 pr-2">
                  <input class="w-full border border-primary-alt bg-transparent hover:bg-yellow hover:text-white px-4 h-12" v-model="amountToStake"
                         type="number">
                </div>
                <div class="w-1/2 pl-2">
                  <button class="w-full rounded-none border border-primary-alt bg-transparent hover:bg-yellow hover:text-white px-4 py-2 h-12"
                          @click="stake(false)">
                    Stake <i v-if="loading.staking" class="fas fa-cog fa-spin"></i>
                  </button>
                </div>

                <button class="w-full rounded-none border border-primary-alt bg-transparent hover:bg-yellow hover:text-white px-4 py-2 h-12 mt-4"
                        @click="stake(true)">
                  Stake all <i v-if="loading.stakingAll" class="fas fa-cog fa-spin"></i>
                </button>
              </div>

              <br>

              <div class="flex flex-wrap">
                <small class="w-full">Max: {{ stakingBalance }} XYA</small>

                <div class="w-1/2 pr-2">
                  <input class="w-full border border-primary-alt bg-transparent hover:bg-yellow hover:text-white px-4 py-2 h-12" v-model="amountToUnstake"
                         type="number">
                </div>
                <div class="w-1/2 pl-2">
                  <button class="w-full rounded-none border border-primary-alt bg-transparent hover:bg-yellow hover:text-white px-4 py-2 h-12"
                          @click="unstake(false)">
                    Unstake <i v-if="loading.unstaking" class="fas fa-cog fa-spin"></i>
                  </button>
                </div>

                <button class="w-full rounded-none border border-primary-alt bg-transparent hover:bg-yellow hover:text-white px-4  h-12 mt-4"
                        @click="unstake(true)">
                  Unstake all <i v-if="loading.unstakingAll" class="fas fa-cog fa-spin"></i>
                </button>
              </div>
            </div>


            <br>
            <br>
            <hr>
            <br>
            <p class="text-lg md:text-xl pb-24">
              The vast cave system beneath the kingdom of Freyala had been untouched for centuries. There had always
              been
              rumors that these caves was where the world had been drawing magic from, with creatures naturally being
              drawn
              to
              the entrances. A group of miners led by Payne, a man known for his talent in acquiring the rarest of
              jewels,
              had
              discovered a mystical ore unlike anything seen before.
              <br>
              <br>
              Payne immediately sought out the village elder, Zarius. Once the regent learned of this ore’s existence,
              he
              named it ‘XYA’ after his deceased daughter and quickly became obsessed with studying this ore, in hopes of
              finding the key to immortality. Apart from the most loyal servants of Regent Carroway, not a single person
              was
              allowed to step foot into the mines. Regent Carroway seemed to be immensely thankful, promising power and
              riches
              to Payne’s crew.
              <br>
              <br>
              Extraction sites were shortly constructed to excavate the cave and increase the monarch’s possession of
              XYA.
              Anyone that neared these caves, Freyfolk or not, were ordered to be killed on sight. There have been no
              traces
              of Payne’s crew since.
            </p>
          </div>
        </div>
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
import fromExponential from "from-exponential"

import {mapGetters, mapActions} from "vuex"
import {ethers} from "ethers"

import wallet from "../plugins/wallet"
import Freyala from "../plugins/artifacts/freyala.json"
import Staking from "../plugins/artifacts/staking.json"

export default {
  name: 'Staking',
  mixins: [wallet],
  computed: {
    ...mapGetters([
      'metaMaskAccount',
      'metaMaskWallet',
      'favourites'
    ])
  },
  data() {
    return {
      mainContract: {},
      stakingContract: {},
      dataInterval: undefined,
      balances: [],
      loadingBalances: true,
      walletBalance: 0,
      stakingBalance: 0,
      rewardBalance: 0,
      rewardPool: 0,
      totalStaked: 0,
      stakingMounted: false,
      preApprove: false,
      amountToStake: 0,
      amountToApprove: 0,
      amountToUnstake: 0,
      error: '',
      allowance: 0,
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
  async mounted() {
    this.mainContract = new ethers.Contract(Freyala.address, Freyala.abi, this.metaMaskWallet.signer)
    this.stakingContract = new ethers.Contract(Staking.address, Staking.abi, this.metaMaskWallet.signer)

    await this.fetchData()
    this.stakingMounted = true

    this.dataInterval = setInterval(() => {
      this.fetchData()
    }, 4000)
  },
  beforeDestroy() {
    clearInterval(this.dataInterval)
  },
  methods: {
    ...mapActions([
      'setFavourite'
    ]),
    async fetchData() {
      const data = await Promise.all([
        this.mainContract.balanceOf(this.metaMaskAccount),
        this.stakingContract.stakes(this.metaMaskAccount),
        this.stakingContract.calculateEarnings(this.metaMaskAccount),
        this.stakingContract.rewardPool(),
        this.stakingContract.totalStaked(),
        this.mainContract.allowance(this.metaMaskAccount, Staking.address)
      ])

      this.walletBalance = ethers.utils.formatEther(data[0]._isBigNumber ? ethers.BigNumber.from(data[0]).toString() : data[0])
      this.stakingBalance = ethers.utils.formatEther(data[1]._isBigNumber ? ethers.BigNumber.from(data[1]).toString() : data[1])
      this.rewardBalance = ethers.utils.formatEther(data[2]._isBigNumber ? ethers.BigNumber.from(data[2]).toString() : data[2])
      this.rewardPool = ethers.utils.formatEther(data[3]._isBigNumber ? ethers.BigNumber.from(data[3]).toString() : data[3])
      this.totalStaked = ethers.utils.formatEther(data[4]._isBigNumber ? ethers.BigNumber.from(data[4]).toString() : data[4])
      this.allowance = ethers.utils.formatEther(data[5]._isBigNumber ? ethers.BigNumber.from(data[5]).toString() : data[5])

      this.loadingBalances = false
    },
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
        this.rewardBalance = sum
        return sum
      }
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

      const data = await this.mainContract.allowance(this.metaMaskAccount, Staking.address)
      this.allowance = ethers.utils.formatEther(data._isBigNumber ? ethers.BigNumber.from(data).toString() : data)
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
          if (err.data.message === 'execution reverted: ERC20: transfer amount exceeds allowance') {
            this.error = "ERROR: You have not approved the contract to stake your tokens yet, please approve the appropriate amount."
          } else {
            this.error = err.data ? err.data.message : err
          }
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
          this.error = err.data ? err.data.message : err
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
          this.error = err.data ? err.data.message : err
        }
        this.loading.withdrawing = false
        console.error(err)
      }
    }
  }
}
</script>