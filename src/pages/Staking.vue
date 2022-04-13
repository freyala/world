<template>
  <div style="width: 100vw; min-height:100vh; height: 100vh; z-index: 999"
       class="flex flex-row w-full h-full relative bg-detail-bg">

    <div class='absolute flex flex-row h-16 w-full top-0 dark-panel items-center' style="z-index: 1000">
      <div class='ml-6 mt-5 mb-4 w-auto text-xl cursor-pointer absolute z-50 w-2/5 flex flex-row items-center'>
        <router-link class='flex items-center' :to="{ name: 'world-map' }">
          <i class='fa fa-arrow-left mr-2'></i>
          <span class='sm:block hidden'>Back</span>
        </router-link>
      </div>
      <div class='w-full text-center lg:text-3xl sm:text-xl text-xl font-bold absolute'>
        <p>Staking</p>
      </div>

    </div>

    <div class="w-full flex flex-wrap mt-24">
      <div class='lg:px-8 lg:py-4 md:px-8 md:py-0 px-4 py-4 w-full h-full flex items-start justify-center overflow-y-auto'>

        <div class='w-4/5 flex justify-center flex-wrap'>
          <div v-if="stakingMounted" class="relative">
            <div class="container items-center space-x-4 lg:flex-row">
              <div class="flex mt-8 md:mt-0 flex-wrap">
                <div class="w-full md:w-1/2 mt-4 md:mt-0">
                  <p class="text-center text-primary-head">
                    Gems left in pool
                  </p>
                  <p v-if="parseInt(rewardPool) === 0" class="font-poppins text-center">Fetching...</p>
                  <p v-else class="font-poppins text-center">{{ parseFloat(rewardPool).toFixed(4) }} XYA</p>
                </div>
                <div class="w-full md:w-1/2 mt-4 md:mt-0">
                  <p class="text-center text-primary-head">
                    Gems actively extracting
                  </p>
                  <p v-if="parseInt(totalStaked) === 0" class="font-poppins text-center">Fetching...</p>
                  <p class="font-poppins text-center">{{ parseFloat(totalStaked).toFixed(4) }} XYA</p>
                </div>

                <div class="w-full md:w-1/2 mt-4 md:mt-4">
                  <p class="text-center text-primary-head">
                    In wallet
                  </p>
                  <p class="font-poppins text-center">{{ walletBalance }} XYA</p>
                </div>
                <div class="w-full md:w-1/2 mt-4 md:mt-4">
                  <p class="text-center text-primary-head">
                    In extractor
                  <p class="font-poppins text-center">{{ stakingBalance }} XYA</p>
                </div>
              </div>

              <br>
              <br>

              <div class="flex flex-wrap">
                <div class="w-full" v-if="parseInt(allowance) > 0">
                  <button class="w-full mx-auto text-white xya-btn relative"
                          @click="addAllowance(0)">
                    Disable extractor <small class="hidden md:inline font-poppins">(contract will no longer have rights to
                    use
                    your XYA)</small> <i v-if="loading.allowance" class="fas fa-cog fa-spin"></i>
                  </button>
                </div>

                <div class="w-full" v-else>
                  <button class="w-full mx-auto text-white xya-btn relative"
                          @click="addAllowance(999999999999.9999)">
                    Enable extractor <i v-if="loading.maxAllowance" class="fas fa-cog fa-spin"></i>
                  </button>
                </div>
              </div>

              <br>

              <div class="flex flex-wrap" v-if="parseInt(allowance) > 0">
                <button v-if="rewardBalance === '0.0'"
                        class="w-full text-white mx-auto xya-btn relative">
                  No rewards yet
                </button>
                <button v-else class="w-full text-white mx-auto xya-btn relative"
                        @click="withdrawEarnings(false)">
                  Claim <span class="hidden md:inline">{{ rewardBalance }} XYA</span> <span
                    class="md:hidden">rewards</span>
                  <i v-if="loading.withdrawing" class="fas fa-cog fa-spin"></i>
                </button>
              </div>

              <br>
              <br>
              <br>
              <br>

              <div v-if="parseInt(allowance) > 0">
                <div class="flex flex-wrap">
                  <small class="w-full text-primary-head">Max: {{ walletBalance }} XYA</small>

                  <div class="w-1/3 md:w-2/3 pr-2">
                    <input class="w-full border border-primary-head bg-transparent px-4 h-12" v-model="amountToStake"
                           type="number">
                  </div>
                  <div class="w-2/3 md:w-1/3 pl-2">
                    <button v-if="rewardBalance > 0" class="w-full border border-primary-head bg-transparent px-4 h-12"
                            @click="withdrawEarnings(false)">
                      <span v-if="loading.staking">Claiming</span>
                      <span v-else>Claim rewards first!</span>
                    </button>
                    <button v-else class="w-full border border-primary-head bg-transparent px-4 h-12"
                            @click="stake(false)">
                      <span v-if="loading.staking">Depositing</span>
                      <span v-else>Deposit</span>
                    </button>
                  </div>
                </div>

                <br>

                <div class="flex flex-wrap">
                  <small class="w-full text-primary-head">Max: {{ stakingBalance }} XYA</small>

                  <div class="w-1/3 md:w-2/3 pr-2">
                    <input class="w-full border border-primary-head bg-transparent px-4 h-12" v-model="amountToUnstake"
                           type="number">
                  </div>
                  <div class="w-2/3 md:w-1/3 pl-2">
                    <button v-if="rewardBalance > 0" class="w-full border border-primary-head bg-transparent px-4 h-12"
                            @click="withdrawEarnings(false)">
                      <span v-if="loading.staking">Claiming</span>
                      <span v-else>Claim rewards first!</span>
                    </button>
                    <button v-else class="w-full border border-primary-head bg-transparent px-4 h-12"
                            @click="unstake(false)">
                      <span v-if="loading.unstaking">Withdrawing</span>
                      <span v-else>Withdraw</span>
                    </button>
                  </div>

                  <div class="text-center w-full">
                    <small>A small 0.5% tax fee will be charged upon withdrawal. This fee will be sent back to the staking
                      contract.</small>
                  </div>
                </div>
              </div>
            </div>

          </div>
          <div v-else class="p-4 md:p-8 relative mt-12">
            <div v-if="installMetamask">
              <div class="m-auto text-center">
                <div class="w-full flex">
                  <img class="w-24 h-24 m-auto" src="/images/GFXLogoHalf.svg" alt="XYA logo"
                       style="animation: rotation 2s infinite linear;">
                </div>
                <br>
                <p class="text-2xl">Please install metamask...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import fromExponential from "from-exponential"

import {mapGetters} from "vuex"
import {ethers} from "ethers"

import wallet from "../plugins/wallet"
import Xangaea from "../plugins/artifacts/xangaea.json"
import Staking from "../plugins/artifacts/staking.json"

export default {
  mixins: [wallet],
  computed: {
    ...mapGetters([
      'metaMaskAccount',
      'metaMaskWallet'
    ])
  },
  data() {
    return {
      showSideBar: false,
      navOpen: false,
      BreadcrumbTitle: "Staking",
      BreadcrumbSubTitle: "staking",
      paddingTop: "",
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
      },
      installMetamask: false
    }
  },
  async mounted() {
    try {
      await this.connectWallet()

      this.mainContract = new ethers.Contract(Xangaea.address, Xangaea.abi, this.metaMaskWallet.signer)
      this.stakingContract = new ethers.Contract(Staking.address, Staking.abi, this.metaMaskWallet.signer)

      await this.fetchData()
      this.stakingMounted = true
    } catch (err) {
      this.installMetamask = true
    }
  },
  beforeDestroy() {
    clearInterval(this.dataInterval)
  },
  methods: {
    async fetchData() {
      const data = await Promise.all([
        this.mainContract.balanceOf(this.metaMaskAccount),
        this.stakingContract.stakes(this.metaMaskAccount),
        this.stakingContract.calculateEarnings(this.metaMaskAccount),
        this.mainContract.balanceOf('0x861ef0CaB3ab4a1372E7eDa936668C8967F70110'),
        this.stakingContract.totalStaked(),
        this.mainContract.allowance(this.metaMaskAccount, Staking.address)
      ])

      this.walletBalance = ethers.utils.formatEther(data[0]._isBigNumber ? ethers.BigNumber.from(data[0]).toString() : data[0])
      this.stakingBalance = ethers.utils.formatEther(data[1]._isBigNumber ? ethers.BigNumber.from(data[1]).toString() : data[1])
      this.rewardBalance = ethers.utils.formatEther(data[2]._isBigNumber ? ethers.BigNumber.from(data[2]).toString() : data[2])
      this.rewardPool = ethers.utils.formatEther(data[3]._isBigNumber ? ethers.BigNumber.from(data[3]).toString() : data[3]) - ethers.utils.formatEther(data[4]._isBigNumber ? ethers.BigNumber.from(data[4]).toString() : data[4])
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

          await this.fetchData()

          this.loading.staking = false
          this.loading.stakingAll = false
        } else {
          let ref = "0x0000000000000000000000000000000000000000"

          const tx = await this.stakingContract.registerAndStake(arg, ref)

          await tx.wait(1)

          await this.fetchData()

          this.loading.staking = false
          this.loading.stakingAll = false
        }

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

      if ((!parseFloat(this.stakingBalance) > 0)) {
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

        await this.fetchData()

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

      if (!(parseFloat(this.rewardBalance) > 0)) {
        this.error = "No earnings yet!"
        console.error("No earnings yet!")
        return
      }

      this.loading.withdrawing = true
      try {
        const tx = await this.stakingContract.withdrawEarnings()

        await tx.wait(1)

        await this.fetchData()

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