<template>
  <section style="background: url('/images/map/worldmap.png') no-repeat; background-size: cover; min-height: 100vh"
           class="flex p-4 md:p-16 lg:px-32">
    <div style="background: #1c1c1c; z-index: 9999; overflow-y: auto;" class="screen rounded-2xl w-full">
      <section id="section-i-1" class="border-b-4 border-primary-alt"
               style="background: url('/images/SVG/homepage-bg-top.svg') no-repeat top right">
        <div class="container mx-auto text-center pt-16 md:pt-24 pb-16 md:pb-20">
          <h1 class="text-2xl md:text-5xl text-primary-alt font-semibold">
            Everglen Castle
          </h1>
        </div>
      </section>
      <div class="p-4 md:p-8 relative">
        <div class="absolute top-0 left-0 p-4 md:p-8">
          <router-link :to="{ name: 'world-map' }">
            <i class="fas fa-long-arrow-alt-left"></i> Back
          </router-link>
        </div>
        <br>

        <div v-if="governanceMounted" class="flex">
          <div class="w-full md:w-4/5 lg:w-3/5 mx-auto">
            <div class="w-full">
              <p class="text-center md:text-2xl mt-8">
                Current proposal:
              </p>
            </div>
            <div v-if="parseInt(governanceFetchedData.currentBallot.timeLeft) > 0" class="w-full text-center">
              <small>Vote ends in {{ fancyTimeFormat(governanceFetchedData.currentBallot.timeLeft) }} (HH:MM:SS)</small>
            </div>

            <div class="flex flex-wrap mb-12 mt-8">
              <div class="w-full">
                <div class="text-center md:text-xl" v-html="governanceFetchedData.currentBallot.name"></div>

                <br>

                <div class="w-full flex"
                     v-if="!governanceFetchedData.currentBallot.voted && parseInt(governanceFetchedData.currentBallot.timeLeft) > 0">
                  <div class="w-2/5 text-center">
                    <small><a
                        href="https://viperswap.one/#/swap?inputCurrency=one&outputCurrency=0x340042552D19211795dbe55d84FA2E63bc49B890&theme=light"
                        target="_blank">Buy yang!</a></small>
                    <button type="button"
                            @click="vote(governanceFetchedData.currentBallot.id, 'yang')"
                            class="w-full ml-auto rounded-none border border-primary-alt bg-transparent hover:bg-primary-alt hover:text-brown px-4 py-2 min-h-12">
                      Vote aye <br> with Yang!
                    </button>
                    <p class="text-center">
                      <small>{{ governanceFetchedData.currentBallot.info.yang.votes }}
                        vote{{ parseInt(governanceFetchedData.currentBallot.info.yang.votes) === 1 ? '' : 's' }}</small>
                    </p>
                  </div>
                  <div class="w-1/5 my-auto text-center">
                    <i v-if="governanceLoading.voting" class="fas fa-cog fa-spin"></i>
                  </div>
                  <div class="w-2/5 text-center">
                    <small><a
                        href="https://viperswap.one/#/swap?inputCurrency=one&outputCurrency=0xE59AA7f9e91B4Cc6C25D3542CEcb851e0316138c&theme=dark"
                        target="_blank">Buy yin!</a></small>
                    <button type="button"
                            @click="vote(governanceFetchedData.currentBallot.id, 'yin')"
                            class="w-full rounded-none border border-primary-alt bg-transparent hover:bg-primary-alt hover:text-brown px-4 py-2 min-h-12">
                      Vote nay <br> with Yin!
                    </button>
                    <p class="text-center">
                      <small>{{ governanceFetchedData.currentBallot.info.yin.votes }}
                        vote{{ parseInt(governanceFetchedData.currentBallot.info.yin.votes) === 1 ? '' : 's' }}</small>
                    </p>
                  </div>
                </div>

                <div class="text-center" v-else>
                  <p class="text-xl">
                    Votes:
                  </p>
                  <p>
                    Yin: {{ governanceFetchedData.currentBallot.info.yin.votes }}
                    <br>
                    Yang: {{ governanceFetchedData.currentBallot.info.yang.votes }}
                  </p>
                  <br>
                  <br>
                  <button
                      v-if="parseInt(governanceFetchedData.currentBallot.timeLeft) > 0" type="button"
                      class="w-full rounded-none border border-primary-alt bg-transparent hover:bg-yellow hover:text-white px-4 py-2 min-h-12">
                    Already voted on this ballot
                  </button>

                  <div v-if="parseInt(governanceFetchedData.currentBallot.timeLeft) <= 0">
                    <p class="text-3xl text-center">
                      Proposal vote ended!
                    </p>
                  </div>
                </div>

                <div v-if="parseInt(governanceFetchedData.currentBallot.timeLeft) > 0" class="w-full text-center mt-4">
                  Minimum needed to vote: {{ governanceFetchedData.currentBallot.amountNeededToVote }} YIN or YANG
                  <br>
                  You can buy both YIN and YANG on ViperSwap!
                </div>
              </div>
            </div>

            <br>
            <hr>
            <br>
            <p class="md:text-lg pb-24">
              Yin and Yang. Every single member of the Freyfolk knew these names. The two factions, originating after
              the
              rise of XYA in the kingdom, had forever divided the Freyfolk. Weeks after the village elder’s mysterious
              disappearance, the Yin faction had made a public statement as Carroway had found the XYA depositories
              completely raided, battered to mere pieces. There were etchings in red garish fluid on the floor: “The
              revolution is coming”. The regent sent out his entire task force to scour the kingdom for traces of the
              two
              factions, but to no avail. Word quickly began spreading that the long anticipated war between Yin and Yang
              was
              just around the corner…
              <br>
              <br>
              The monarch had been infiltrated. It was an upper power ruled by Regent Carroway no longer, but instead an
              internal battle between the two factions for ultimate power.
            </p>
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
    </div>
  </section>
</template>

<script>
import wallet from "../plugins/wallet"
import {mapGetters} from "vuex";
import {ethers} from "ethers";
import governanceContract from "../plugins/artifacts/governance.json";

export default {
  name: 'Governance',
  mixins: [wallet],
  computed: {
    ...mapGetters([
      'metaMaskAccount',
      'metaMaskWallet',
    ])
  },
  data() {
    return {
      error: '',
      governanceMounted: false,

      yinOrYang: '',
      governanceContract: {},
      governanceInterval: undefined,
      governanceFetchedData: {},
      governanceLoading: {
        voting: false
      }
    }
  },
  async mounted() {
    this.governanceContract = new ethers.Contract(governanceContract.address, governanceContract.abi, this.metaMaskWallet.signer)

    await this.fetchData()
    this.governanceMounted = true

    this.governanceInterval = setInterval(() => {
      this.fetchData()
    }, 4000)
  },
  beforeDestroy() {
    clearInterval(this.jennyMineInterval)
  },
  methods: {
    fancyTimeFormat(duration) {
      // Hours, minutes and seconds
      let hrs = ~~(duration / 3600);
      let mins = ~~((duration % 3600) / 60);
      let secs = ~~duration % 60;

      // Output like "1:01" or "4:03:59" or "123:03:59"
      let ret = "";

      ret += (hrs < 10 ? "0" : "");
      ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
      ret += "" + mins + ":" + (secs < 10 ? "0" : "");
      ret += "" + secs;
      return ret;
    },

    // CALL
    async fetchData() {
      const nextBallotId = await this.governanceContract.nextBallotId();

      const [ballotInfo, ballot, lastBallot, voted] = await Promise.all([
        this.governanceContract.getBallot(nextBallotId - 1),
        this.governanceContract.ballots(nextBallotId - 1),
        this.governanceContract.ballots(nextBallotId - 2),
        this.governanceContract.votes(this.metaMaskAccount, nextBallotId - 1)
      ])

      this.governanceFetchedData.currentBallot = {
        id: ballot[0]._isBigNumber ? ethers.BigNumber.from(ballot[0]).toString() : ballot[0],
        name: ballot[1],
        endEpoch: ballot[2]._isBigNumber ? ethers.BigNumber.from(ballot[2]).toString() : ballot[2],
        amountNeededToVote: ethers.utils.formatEther(ballot[3]._isBigNumber ? ethers.BigNumber.from(ballot[3]).toString() : ballot[3]),
        timeLeft: parseInt(ballot[2]._isBigNumber ? ethers.BigNumber.from(ballot[2]).toString() : ballot[2]) - Date.now() / 1000 | 0,
        voted: voted,
        info: {
          yin: {
            id: ballotInfo[2][0][0]._isBigNumber ? ethers.BigNumber.from(ballotInfo[2][0][0]).toString() : ballotInfo[2][0][0],
            votes: ballotInfo[2][0][2]._isBigNumber ? ethers.BigNumber.from(ballotInfo[2][0][2]).toString() : ballotInfo[2][0][2]
          },
          yang: {
            id: ballotInfo[2][1][0]._isBigNumber ? ethers.BigNumber.from(ballotInfo[2][1][0]).toString() : ballotInfo[2][1][0],
            votes: ballotInfo[2][1][2]._isBigNumber ? ethers.BigNumber.from(ballotInfo[2][1][2]).toString() : ballotInfo[2][1][2]
          }
        }
      }

      this.governanceFetchedData.lastBallot = {
        id: lastBallot[0]._isBigNumber ? ethers.BigNumber.from(lastBallot[0]).toString() : lastBallot[0],
        name: lastBallot[1],
        endEpoch: lastBallot[2]._isBigNumber ? ethers.BigNumber.from(lastBallot[2]).toString() : lastBallot[2],
        amountNeededToVote: ethers.utils.formatEther(lastBallot[3]._isBigNumber ? ethers.BigNumber.from(lastBallot[3]).toString() : lastBallot[3]),
        timeLeft: parseInt(lastBallot[2]._isBigNumber ? ethers.BigNumber.from(lastBallot[2]).toString() : lastBallot[2]) - Date.now() / 1000 | 0
      }
    },

    // SEND
    async vote(ballotId, yinOrYang) {
      this.error = ''
      this.governanceLoading.voting = true

      try {
        let tx = undefined

        if (yinOrYang === 'yin') {
          tx = await this.governanceContract.voteYin(ballotId)
        } else {
          tx = await this.governanceContract.voteYang(ballotId)
        }

        await tx.wait(1)

        this.governanceLoading.voting = false
      } catch (err) {
        if (err.code !== 4001) {
          this.error = err.data ? err.data.message : err
        }
        this.governanceLoading.voting = false
        console.error(err)
      }
    }
  }
}
</script>