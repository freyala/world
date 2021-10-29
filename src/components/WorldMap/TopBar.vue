<template>
  <div class="flex flex-wrap h-16 absolute z-50 top-0 w-full left-0 p-4 md:p-8 opacity-90">
    <div class="w-auto md:w-full flex flex-wrap">
      <div class="hidden md:block w-auto rounded-full bg-dark p-2 z-20">
        <div @mouseenter="hoverUser = true" @mouseleave="hoverUser = false"
             class="w-16 md:w-24 h-16 md:h-24 cursor-pointer relative" @click="$modal.show('settings')">
          <img v-if="avatar !== undefined" class="rounded-full" :src="`https://frey.freyala.com/images/${avatar}.png`" alt="Your Frey">
          <img v-else src="/images/XYA.png" alt="XYA logo">
          <div :class="`${hoverUser ? 'opacity-25' : 'opacity-0'}`"
               class="absolute top-0 left-0 flex h-full w-full bg-black rounded-full"></div>
          <div :class="`${hoverUser ? 'opacity-75' : 'opacity-0'}`" class="absolute top-0 left-0 flex h-full w-full"><i
              class="m-auto text-black text-xl fas fa-user-edit"></i></div>
        </div>
      </div>
      <div class="w-auto -ml-14 z-10 md:h-12 pt-3">
        <div class="my-auto w-full flex">
          <p class="text-lg bg-dark pl-16">
            Balance
          </p>
          <p class="w-auto md:text-lg bg-dark rounded-r-lg px-4">
            {{ loadingBalances ? 'fetching...' : `${walletBalance}` }} XYA
          </p>
        </div>
        <div class="w-full my-auto py-1 flex rounded-r-lg">
          <p class="text-lg bg-dark pl-16">
            Staked
          </p>
          <p class="w-auto md:text-lg bg-dark rounded-r-lg px-4">
            {{ loadingBalances ? 'fetching...' : `${stakingBalance}` }} XYA
          </p>
        </div>
        <div class="w-full my-auto flex rounded-r-lg">
          <p class="text-lg bg-dark pl-16">
            Rewards
          </p>
          <p class="w-auto md:text-lg bg-dark rounded-r-lg px-4">
            {{ loadingBalances ? 'fetching...' : `${rewardBalance}` }} XYA
          </p>
        </div>
      </div>
    </div>
    <div class="w-1/5 md:hidden flex flex-wrap">
      <drop-down-menu></drop-down-menu>
    </div>

    <window name="settings" width="80%">
      <div class="flex flex-wrap p-6 bg-dark h-full">
        <div class="w-full flex mb-4">
          <div class="w-full flex">
            <div class="inline text-2xl">Select avatar:</div>
            <div @click="removeFrey" class="inline ml-auto my-auto cursor-pointer">
              (remove avatar)
            </div>
          </div>
          <div class="w-auto text-right my-auto pl-10">
            <i @click="$modal.hide('settings')" class="fas fa-times cursor-pointer text-xl"></i>
          </div>
        </div>
        <div v-if="yourFrey.length > 0 && loading === false" class="w-full flex flex-wrap" style="max-height: 30vh; overflow: auto">
          <div @click="selectFrey(frey.tokenId)" class="w-1/4 px-2 py-1 -mx-1 relative" :key="frey.name" v-for="frey in yourFrey">
            <img class="w-full h-auto" v-lazy="frey.image" :alt="frey.name">

            <div class="absolute top-0 flex left-0 w-full h-full opacity-0 hover:opacity-100 cursor-pointer" style="background: rgba(0,0,0,.5)">
              <p class="m-auto text-white font-black">
                Select
              </p>
            </div>
          </div>
        </div>
        <div v-else class="p-4 mx-auto md:p-8 relative mt-12">
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
    </window>
  </div>
</template>

<script>
import Frey from "../../plugins/artifacts/frey.json";
import Freyala from "../../plugins/artifacts/freyala.json";
import Staking from "../../plugins/artifacts/staking.json";
import Avatar from "../../plugins/artifacts/avatar.json";
import {mapGetters} from 'vuex'
import wallet from '../../plugins/wallet'
import dropDownMenu from './DropDownMenu'
import {ethers} from 'ethers'
import axios from 'axios'

export default {
  name: 'TopBar',
  mixins: [wallet],
  data() {
    return {
      mainContract: {},
      stakingContract: {},
      freyContract: {},
      dataInterval: undefined,
      balances: [],
      loadingBalances: true,
      topBarLoaded: false,
      walletBalance: 0,
      stakingBalance: 0,
      rewardBalance: 0,
      hoverUser: false,
      yourFrey: [],
      avatar: undefined,
      loading: false
    }
  },
  components: {
    dropDownMenu
  },
  computed: {
    ...mapGetters([
      'metaMaskAccount',
      'metaMaskWallet'
    ])
  },
  async mounted() {
    this.mainContract = await new ethers.Contract(Freyala.address, Freyala.abi, this.metaMaskWallet.signer)
    this.stakingContract = await new ethers.Contract(Staking.address, Staking.abi, this.metaMaskWallet.signer)
    this.freyContract = new ethers.Contract(Frey.address, Frey.abi, this.metaMaskWallet.signer)
    this.avatarContract = new ethers.Contract(Avatar.address, Avatar.abi, this.metaMaskWallet.signer)

    await this.fetchData()
    await this.getYourFrey()
    this.topBarLoaded = true

    this.dataInterval = setInterval(() => {
      this.fetchData()
    }, 4000)
  },
  beforeDestroy() {
    clearInterval(this.dataInterval)
  },
  methods: {
    async fetchData() {
      const balances = await Promise.all([
        this.mainContract.balanceOf(this.metaMaskAccount),
        this.stakingContract.stakes(this.metaMaskAccount),
        this.stakingContract.calculateEarnings(this.metaMaskAccount)
      ])

      this.walletBalance = (balances[0] / Math.pow(10, 18)).toFixed(2)
      this.stakingBalance = (balances[1] / Math.pow(10, 18)).toFixed(2)
      this.rewardBalance = (balances[2] / Math.pow(10, 18)).toFixed(2)

      const avatar = await this.avatarContract.getAvatar()

      if (avatar[1] === true && (avatar[0]._isBigNumber ? ethers.BigNumber.from(avatar[0]._hex).toString() : avatar[0]._hex) !== '99999') {
        this.avatar = avatar[0]._isBigNumber ? ethers.BigNumber.from(avatar[0]._hex).toString() : avatar[0]._hex
      } else {
        this.avatar = undefined
      }

      this.loadingBalances = false
    },
    async getYourFrey() {
      const allFrey = await this.freyContract.tokensOfOwner(this.metaMaskAccount)

      let ids = await allFrey.map(async (frey) => {
        return frey._isBigNumber ? ethers.BigNumber.from(frey._hex).toString() : frey._hex
      })

      await Promise.all(ids)
        .then(async (listOfIds) => {
          const yourFrey = await axios.get(`https://frey.freyala.com/meta/list?items=${listOfIds}`)
          this.yourFrey = yourFrey.data
        })
    },
    async removeFrey() {
      this.error = ''
      this.loading = true

      try {
        const tx = await this.avatarContract.removeUser()

        await tx.wait(1)

      } catch (err) {
        if (err.code !== 4001) {
          this.error = err
        }
        console.error(err)
      }

      const avatar = await this.avatarContract.getAvatar()

      if (avatar[1] === true && (avatar[0]._isBigNumber ? ethers.BigNumber.from(avatar[0]._hex).toString() : avatar[0]._hex) !== '99999') {
        this.avatar = avatar[0]._isBigNumber ? ethers.BigNumber.from(avatar[0]._hex).toString() : avatar[0]._hex
      } else {
        this.avatar = undefined
      }

      this.loading = false
    },
    async selectFrey(id) {
      this.error = ''
      this.loading = true

      try {
        const tx = await this.avatarContract.selectAvatar(id)

        await tx.wait(1)

      } catch (err) {
        if (err.code !== 4001) {
          this.error = err
        }
        console.error(err)
      }

      const avatar = await this.avatarContract.getAvatar()

      if (avatar[1] === true && (avatar[0]._isBigNumber ? ethers.BigNumber.from(avatar[0]._hex).toString() : avatar[0]._hex) !== '99999') {
        this.avatar = avatar[0]._isBigNumber ? ethers.BigNumber.from(avatar[0]._hex).toString() : avatar[0]._hex
      } else {
        this.avatar = undefined
      }

      this.loading = false
    }
  }
}
</script>