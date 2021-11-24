<template>
  <section style="background: url('/images/map/worldmap.png') no-repeat; background-size: cover; min-height: 100vh"
           class="flex p-4 md:p-16 lg:px-32">
    <div style="background: #1c1c1c; z-index: 9999; overflow-y: auto" class="screen rounded-2xl w-full">
      <section id="section-i-1" class="border-b-4 border-bbrown"
               style="background: url('/images/SVG/homepage-bg-top.svg') no-repeat top right">
        <div class="container flex flex-wrap mx-auto text-center pt-16 md:pt-24 pb-16 md:pb-12">
          <h1 class="w-full text-2xl md:text-5xl text-primary-alt font-semibold">
            Marketplace
          </h1>

          <div class="w-full flex">
            <div class="w-auto flex mx-auto">
              <button
                  @click="activeScreen = 'sales'"
                  :class="activeScreen === 'sales' ? 'bg-yellow text-white' : 'bg-dark text-yellow'"
                  class="w-1/5 mx-auto h-full md:w-auto border border-bbrown rounded-xl hover:text-white hover:bg-bbrown rounded-none px-4 md:mx-2">
                <small>
                  Home
                </small>
              </button>

              <button
                  @click="activeScreen = 'collection'"
                  :class="activeScreen === 'collection' ? 'bg-yellow text-white' : 'bg-dark text-yellow'"
                  class="w-1/5 mx-auto h-full md:w-auto border border-bbrown rounded-xl hover:text-white hover:bg-bbrown rounded-none px-4 md:mx-2">
                <small>
                  My collection
                </small>
              </button>

              <button
                  @click="activeScreen = 'bids'"
                  :class="activeScreen === 'bids' ? 'bg-yellow text-white' : 'bg-dark text-yellow'"
                  class="w-1/5 mx-auto h-full md:w-auto border border-bbrown rounded-xl hover:text-white hover:bg-bbrown rounded-none px-4 md:mx-2">
                <small>
                  My bids
                </small>
              </button>

              <button
                  @click="activeScreen = 'offers'"
                  :class="activeScreen === 'offers' ? 'bg-yellow text-white' : 'bg-dark text-yellow'"
                  class="w-1/5 mx-auto h-full md:w-auto border border-bbrown rounded-xl hover:text-white hover:bg-bbrown rounded-none px-4 md:mx-2">
                <small>
                  My offers
                </small>
              </button>
            </div>
          </div>
          <div class="w-full flex mt-4">
            <div class="w-auto flex mx-auto">
              <select class="border border-bbrown rounded-xl py-2 px-4 bg-dark" name="Marketplace" id="marketplace">
                <option :value="market.address" v-for="market in markets">{{ market.name }}</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      <div class="p-4 md:p-8 relative">
        <div v-if="activeScreen === 'sales' && marketplaceMounted" class="flex flex-wrap w-full -m-2 p-4">
          <div class="w-1/4">
            <h2 class="text-xl p-2">
              Filter
            </h2>
            <br>

            <div class="pr-4">
              <select class="w-full border border-bbrown rounded-xl py-2 px-4 bg-dark" name="Sort by" id="sort-by"
                      v-model="sortByValue" @change="sortBy(sortByValue.split('-'))">
                <option value="">Sort by...</option>
                <option value="price-ASC">Price ascending</option>
                <option value="price-DESC">Price descending</option>
                <option value="id-ASC">ID ascending</option>
                <option value="id-DESC">ID descending</option>
              </select>
            </div>

          </div>
          <div class="w-3/4 flex flex-wrap">

            <h2 class="text-xl w-full p-2">
              Sales
            </h2>
            <br>

            <div class="w-1/4 relative p-2" v-for="listing in listings">
              <img class="cursor-pointer" @click="showDetail(listing.id)"
                   v-lazy="`https://frey.freyala.com/images/${listing.id}.png`" :alt="listing.id">

              <div class="absolute bg-dark pt-3 pr-3 pb-2 pl-2 right-0 top-0 opacity-90">
                {{ listing.price.price }}
                {{
                  listing.price.currencyType === 0 ? 'ONE' : listing.price.currencyType === 1 ? 'XYA' : listing.price.currencyType === 2 ? 'YIN' : 'YANG'
                }}
              </div>

              <div class="flex w-full text-center">
                <p class="p-2">
                  {{ marketName }} #{{ listing.id }}
                </p>
              </div>

              <div v-if="listing.bid" class="flex w-full text-center">
                <p class="p-2">
                  Current bid: {{ listing.bid.bid }}
                </p>
              </div>
              <div v-else class="flex w-full text-center">
                <p class="p-2">
                  No current bid
                </p>
              </div>

              <div class="flex w-full bg-yellow text-white text-center">
                <div @click="preBidToken(listing.id)" class="cursor-pointer p-2 w-1/2">
                  <small>
                    Bid!
                  </small>
                </div>
                <button @click="buyToken(listing.id, listing.price.currencyType, listing.price.price)"
                        class="p-2 w-1/2 border-l border-white rounded-none text-center">
                  <small>
                    Buy!
                  </small>
                  </a>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div v-else-if="activeScreen === 'collection' && marketplaceMounted" class="flex flex-wrap w-full -m-2 p-4">
          <div class="w-3/4 mx-auto flex flex-wrap">

            <h2 class="text-xl w-full p-2">
              Collection
            </h2>
            <br>

            <div class="w-1/4 relative p-2" v-for="item in collection">
              <img class="cursor-pointer" @click="showDetail(item.tokenId)" v-lazy="item.image" :alt="item.tokenId">

              <div class="flex w-full text-center">
                <p class="p-2">
                  {{ item.name }}
                </p>
              </div>

              <div class="flex w-full bg-yellow text-white text-center">
                <div @click="preSendToken(item.tokenId)" class="cursor-pointer p-2 w-1/2">
                  <small>
                    Send
                  </small>
                </div>
                <button v-if="item.listed" @click="delistToken(item.tokenId)"
                        class="p-2 w-1/2 border-l border-white rounded-none text-center">
                  <small>
                    {{ !delistingLoading ? 'Delist' : 'Delisting...' }}
                  </small>
                </button>
                <button v-else @click="preListToken(item.tokenId)"
                        class="p-2 w-1/2 border-l border-white rounded-none text-center">
                  <small>
                    List
                  </small>
                </button>
              </div>
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

      <window class="-mt-48" @before-open="beforeDetailWindowOpen()" @before-close="beforeDetailWindowClose()"
              name="detail" width="80%">
        <div v-if="detail.image" class="p-6 bg-dark flex flex-wrap">
          <div class="w-full">
            <img :src="detail.image" :alt="detail.name">
          </div>

          <div class="w-full">
            <br>
            <hr>
            <br>

            <p class="text-xl">
              {{ detail.name }}
            </p>
          </div>

          <div class="py-2 w-full">
            <div class="flex" :key="detail.tokenId + attribute.trait_type" v-for="attribute in detail.attributes">
              <strong class="w-5/12">{{ attribute.trait_type }}: </strong>
              <span class="w-7/12">{{ attribute.value === '-' ? 'None' : attribute.value }}</span>
            </div>
          </div>
        </div>
        <div v-else class="p-6 bg-dark flex flex-wrap">
          <div class="m-auto text-center py-12">
            <div class="w-full flex">
              <img class="w-24 h-24 m-auto" src="/images/XYA.png" alt="XYA logo"
                   style="animation: rotation 2s infinite linear;">
            </div>
            <br>
            <p class="text-2xl">Loading...</p>
          </div>
        </div>
      </window>

      <window @before-close="beforeBidWindowClose()" name="bid" width="80%">
        <div class="p-6 bg-dark flex flex-wrap">
          <div class="w-full">
            <p class="text-xl">
              Bid on #{{ bid.id }}!
            </p>

            <br>
            <hr>
            <br>
          </div>

          <div class="w-full flex flex-wrap mb-4">
            <div @click="bid.currencyType = 0"
                 :class="bid.currencyType === 0 ? 'bg-yellow text-white' : 'bg-dark text-yellow'"
                 class="py-2 text-center cursor-pointer w-full h-full md:w-1/5 border border-bbrown rounded-xl hover:text-white hover:bg-bbrown rounded-none px-4 mx-auto">
              ONE
            </div>
            <div @click="bid.currencyType = 1"
                 :class="bid.currencyType === 1 ? 'bg-yellow text-white' : 'bg-dark text-yellow'"
                 class="py-2 text-center cursor-pointer w-full h-full md:w-1/5 border border-bbrown rounded-xl hover:text-white hover:bg-bbrown rounded-none px-4 mx-auto">
              XYA
            </div>
            <div @click="bid.currencyType = 2"
                 :class="bid.currencyType === 2 ? 'bg-yellow text-white' : 'bg-dark text-yellow'"
                 class="py-2 text-center cursor-pointer w-full h-full md:w-1/5 border border-bbrown rounded-xl hover:text-white hover:bg-bbrown rounded-none px-4 mx-auto">
              YIN
            </div>
            <div @click="bid.currencyType = 3"
                 :class="bid.currencyType === 3 ? 'bg-yellow text-white' : 'bg-dark text-yellow'"
                 class="py-2 text-center cursor-pointer w-full h-full md:w-1/5 border border-bbrown rounded-xl hover:text-white hover:bg-bbrown rounded-none px-4 mx-auto">
              YANG
            </div>
          </div>

          <input type="text" class="w-2/3 border border-bbrown rounded-xl bg-dark p-2" v-model="bid.amount">

          <button @click="bidToken()"
                  class="w-auto h-full md:w-auto border border-bbrown rounded-xl hover:text-white hover:bg-bbrown rounded-none px-4 md:ml-4">
            <small>
              {{ !biddingLoading ? 'Bid!' : 'Bidding...' }}
            </small>
          </button>
        </div>
      </window>

      <window @before-close="beforeSellWindowClose()" name="list" width="80%">
        <div class="p-6 bg-dark flex flex-wrap">
          <div class="w-full">
            <p class="text-xl">
              Set #{{ listingIdOf }} for sale
            </p>

            <br>
            <hr>
            <br>
          </div>

          <div class="w-full flex">
            <div @click="list.currencyType = 0"
                 :class="list.currencyType === 0 ? 'bg-yellow text-white' : 'bg-dark text-yellow'"
                 class="py-2 text-center cursor-pointer w-full h-full md:w-1/5 border border-bbrown rounded-xl hover:text-white hover:bg-bbrown rounded-none px-4 mx-auto">
              ONE
            </div>
            <div @click="list.currencyType = 1"
                 :class="list.currencyType === 1 ? 'bg-yellow text-white' : 'bg-dark text-yellow'"
                 class="py-2 text-center cursor-pointer w-full h-full md:w-1/5 border border-bbrown rounded-xl hover:text-white hover:bg-bbrown rounded-none px-4 mx-auto">
              XYA
            </div>
            <div @click="list.currencyType = 2"
                 :class="list.currencyType === 2 ? 'bg-yellow text-white' : 'bg-dark text-yellow'"
                 class="py-2 text-center cursor-pointer w-full h-full md:w-1/5 border border-bbrown rounded-xl hover:text-white hover:bg-bbrown rounded-none px-4 mx-auto">
              YIN
            </div>
            <div @click="list.currencyType = 3"
                 :class="list.currencyType === 3 ? 'bg-yellow text-white' : 'bg-dark text-yellow'"
                 class="py-2 text-center cursor-pointer w-full h-full md:w-1/5 border border-bbrown rounded-xl hover:text-white hover:bg-bbrown rounded-none px-4 mx-auto">
              YANG
            </div>
          </div>

          <input type="text" class="w-4/5 border border-bbrown rounded-xl bg-dark p-2 mt-4" v-model="list.amount">

          <button @click="listNFT(listingIdOf)" class="py-2 w-full">{{ !listingLoading ? 'List NFT!' : 'Listing...'}}</button>
        </div>
      </window>

      <window name="send" width="80%">
        <div class="p-6 bg-dark flex flex-wrap">
          <div class="w-full">
            <p class="text-xl">
              Send #{{ sendingIdOf }} to another address
            </p>

            <br>
            <hr>
            <br>
          </div>

          <input class="border w-full border-bbrown bg-dark p-2"
                 v-model="sendToAddress" type="text" placeholder="Type address here...">
          <hr>
          <button @click="sendNFT(sendingIdOf)" class="py-2 w-full">{{ !sendingLoading ? 'Send NFT Away!' : 'Sending away!'}}</button>
        </div>
      </window>
    </div>
  </section>
</template>

<script>
import wallet from "../plugins/wallet"
import {mapGetters} from "vuex";
import {ethers} from "ethers";
import marketplaceContract from "../plugins/artifacts/marketplace.json";
import freyContract from "../plugins/artifacts/frey.json";
import axios from 'axios'

export default {
  name: 'Marketplace',
  mixins: [wallet],
  computed: {
    ...mapGetters([
      'metaMaskAccount',
      'metaMaskWallet',
    ])
  },
  data() {
    return {
      activeScreen: 'collection',
      error: '',
      marketplaceMounted: false,
      collection: [],
      yinOrYang: '',
      sortByValue: '',
      marketplaceContract: {},
      marketplaceInterval: undefined,
      marketplaceFetchedData: {},
      marketplaceLoading: {
        buying: false,
        bid: false
      },
      bid: {
        id: undefined,
        currencyType: 0,
        amount: 0
      },
      list: {
        id: undefined,
        currencyType: 0,
        amount: 0
      },
      listings: [],
      detail: {},
      markets: [],
      market: '0xD9D6B8C7f63cc2f5d5dF5f3A77B2F596a66230D2',
      marketName: 'The Frey',
      showDetailOf: undefined,
      sendingIdOf: undefined,
      listingIdOf: undefined,
      sendToAddress: '',
      sendingLoading: false,
      biddingLoading: false,
      listingLoading: false,
      delistingLoading: false
    }
  },
  watch: {
    activeScreen() {
      if (this.activeScreen === 'collection') {
        this.getYourNFT()
      }

      if (this.activeScreen === 'sales') {
        this.fetchData()
      }
    }
  },
  async mounted() {
    this.marketplaceContract = new ethers.Contract(marketplaceContract.address, marketplaceContract.abi, this.metaMaskWallet.signer)
    this.freyContract = new ethers.Contract(freyContract.address, freyContract.abi, this.metaMaskWallet.signer)

    await this.getYourNFT()
  },
  methods: {
    async fetchData() {
      this.marketplaceMounted = false

      const [markets, listings] = await Promise.all([
        this.marketplaceContract.listLiveMarkets(),
        this.marketplaceContract.getTokensOnSaleForSpecificMarket(this.market)
      ])

      const listingPromise = await listings.map(async (listing) => {
        const tokenHasBid = await this.marketplaceContract.tokenHasBid(this.market, listing)

        let fetchedBid
        let fetchedPrice

        if (tokenHasBid) {
          [fetchedBid, fetchedPrice] = await Promise.all([
            this.marketplaceContract.getCurrentBidForToken(this.market, listing),
            this.marketplaceContract.getPriceOfToken(this.market, listing)
          ])

          const price = {}
          const bid = {}

          price.currencyType = fetchedPrice[0]
          price.price = ethers.BigNumber.from(fetchedPrice[1]._hex).toString()

          bid.bidder = fetchedBid[0]
          bid.currencyType = fetchedBid[1]
          bid.bid = ethers.BigNumber.from(fetchedBid[2]._hex).toString()

          return {
            id: ethers.BigNumber.from(listing._hex).toString(),
            price,
            bid
          }
        } else {
          fetchedPrice = await this.marketplaceContract.getPriceOfToken(this.market, listing)

          const price = {}

          price.currencyType = fetchedPrice[0]
          price.price = ethers.BigNumber.from(fetchedPrice[1]._hex).toString()

          return {
            id: ethers.BigNumber.from(listing._hex).toString(),
            price
          }
        }
      })

      Promise.all(listingPromise).then(async (filledListings) => {
        markets[0].map((m, index) => {
          this.markets.push({
            name: markets[0][index],
            contract: markets[1][index]
          })
        })

        this.listings = filledListings
        this.marketplaceMounted = true
      })
    },

    async beforeBidWindowClose() {
      this.bid.currencyType = 0
      this.bid.amount = 0
    },

    async beforeSellWindowClose() {
      this.list.currencyType = 0
      this.list.amount = 0
    },

    async beforeDetailWindowOpen() {
      const detail = await axios.get(`https://frey.freyala.com/meta?meta=${this.showDetailOf}`)
      this.detail = detail.data
    },

    async beforeDetailWindowClose() {
      this.detail = {}
    },

    async buyToken(id, currencyType, amount) {
      const market = this.market
      this.marketplaceLoading.buying = id

      const tx = await this.marketplaceContract.buyToken(market, id, currencyType, amount)
      tx.wait(1)

      this.marketplaceLoading.buying = false
    },

    async showDetail(id) {
      this.showDetailOf = id

      this.$modal.show('detail')
    },

    async preBidToken(id) {
      this.bid.id = id

      this.$modal.show('bid')
    },

    async preSendToken(id) {
      this.sendingIdOf = id

      this.$modal.show('send')
    },

    async preListToken(id) {
      this.listingIdOf = id

      this.$modal.show('list')
    },

    async delistToken(id) {
      const market = this.market

      try {
        this.delistingLoading = true

        const tx = await this.marketplaceContract.delistToken(market, id)
        await tx.wait(1)

        this.delistingLoading = false
        await this.getYourNFT()
      } catch {
        this.delistingLoading = false
      }
    },

    async bidToken() {
      const market = this.market
      const id = this.bid.id
      const currencyType = this.bid.currencyType
      const amount = this.bid.amount

      try {
      this.biddingLoading = true

      const tx = await this.marketplaceContract.bidOnToken(market, id, currencyType, amount)
      tx.wait(1)

        this.biddingLoading = false
        this.$modal.hide('bid')
      await this.fetchData()
      } catch {
        this.biddingLoading = false
      }
    },

    async sortBy(value) {
      console.log(this.listings)
      this.listings = this.listings.sort((a, b) => {
        if (value[0] === 'id') {
          if (value[1] === 'ASC') {
            return a.id - b.id
          }

          if (value[1] === 'DESC') {
            return b.id - a.id
          }
        }

        if (value[0] === 'price') {
          if (value[1] === 'ASC') {
            return a.price.price - b.price.price
          }

          if (value[1] === 'DESC') {
            return b.price.price - a.price.price
          }
        }
      })
    },

    async getYourNFT() {
      const markets = await this.marketplaceContract.listLiveMarkets()

        markets[0].map((m, index) => {
          this.markets.push({
            name: markets[0][index],
            contract: markets[1][index]
          })
      })

      const market = this.market
      this.marketplaceMounted = false

      const allNFT = await this.freyContract.tokensOfOwner(this.metaMaskAccount)

      let ids = await allNFT.map(async (frey) => {
        return frey._isBigNumber ? ethers.BigNumber.from(frey._hex).toString() : frey._hex
      })

      await Promise.all(ids)
          .then(async (listOfIds) => {
            let yourNFT = await axios.get(`https://frey.freyala.com/meta/list?items=${listOfIds}`)

            this.collection = []
            const collection = []

            await yourNFT.data.map(async (nft) => {

              try {
                nft.listed = await this.marketplaceContract.tokenIsForSale(market, nft.tokenId)
              } catch {

              }

              collection.push(nft)
            })

            this.collection = collection.sort((a, b) => {
              return a.tokenId - b.tokenId
            })

            this.marketplaceMounted = true
          })
    },

    async sendNFT() {
      const address = this.sendToAddress
      try {
        this.sendingLoading = true

        const tx = await this.freyContract.transferFrom(this.metaMaskAccount, address, id)
        await tx.wait(1)

        this.sendingLoading = false
        this.$modal.hide('send')
        await this.getYourNFT()
      } catch {
        this.sendingLoading = false
      }
    },

    async listNFT(id) {
      const amount = this.list.amount
      const currencyType = this.list.currencyType
      const market = this.market

      try {
        this.listingLoading = true

        const tx = await this.marketplaceContract.listToken(market, id, amount, currencyType)
        await tx.wait(1)

        this.listingLoading = false
        this.$modal.hide('list')
        await this.getYourNFT()
      } catch {
        this.listingLoading = false
      }
    },
  }
}
</script>