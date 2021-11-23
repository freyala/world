<template>
    <div class='w-full h-full py-4 flex flex-row mt-2'>
        <div v-on:click='goBack()' class="absolute top-0 left-0 p-4 cursor-pointer">
            <i class="fas fa-long-arrow-alt-left"></i> Back to markets
        </div>
        <div class='w-3/12 h-full rounded-lg relative bg-light' style='height: calc(60vh - 80px);'>
            <div class='text-center flex flex-col justify-center items-center mt-4 pb-4 shadow-xl'
                style='height: 80px;'>
                <div class='w-full text-center text-xl mb-4'>Filter</div>
                <div class='w-9/12 mx-auto flex h-full'>
                    <button v-on:click='resetMarketFilters()' type="button"
                        class="w-9/12 mx-2 rounded-lg hover:text-white px-0 py-0 min-h-9">
                        Reset
                    </button>
                    <button v-on:click='initiateMarketSearch()' type="button"
                        class="w-9/12 mr-2 rounded-lg border border-primary-alt bg-transparent hover:bg-primary-alt hover:text-white px-0 py-0 min-h-9">
                        Apply
                    </button>
                </div>
            </div>
            <div :key='keys.filters' class="text-center overflow-y-auto h-full flex flex-col mt-4 bg-light">
                <div v-for='(attribute, index) in marketAttributes' :key='index' class="w-full mb-2">
                    <div class='mb-1'>
                        {{ attribute.key }}
                    </div>
                    <select v-model='marketSelectedFilters[index]'
                        class="w-9/12 border rounded-lg border-yellow py-2 px-4 bg-dark"
                        v-bind:class='{"text-white": marketSelectedFilters[index] !== ""}'>
                        <option v-bind:value='""'>None</option>
                        <option v-bind:value='item' v-for='(item, itemIndex) in attribute.values' :key='itemIndex'>
                            {{ item }}</option>
                    </select>
                </div>

            </div>
        </div>
        <div class='p-4 w-9/12' style='height: 60vh; overflow-y: auto; overflow-x:hidden'>
            <div class='w-11/12 flex mx-10 flex select-none'>
                <h2 v-on:click='marketTab = CONSTANTS.SALES_TAB'
                    v-bind:class='{"opacity-50": marketTab !== CONSTANTS.SALES_TAB}'
                    class='text-2xl mt-1 mr-8 cursor-pointer'>Sales</h2>
                <h2 v-on:click='marketTab = CONSTANTS.USER_TAB'
                    v-bind:class='{"opacity-50": marketTab !== CONSTANTS.USER_TAB}'
                    class='text-2xl mt-1 mr-8 cursor-pointer'>My Sales
                    ({{ userSales.length }})</h2>
                <h2 v-on:click='marketTab = CONSTANTS.COLLECTION_TAB'
                    v-bind:class='{"opacity-50": marketTab !== CONSTANTS.COLLECTION_TAB}'
                    class='text-2xl mt-1 mr-8 cursor-pointer'>My Collection
                    ({{ userTokens.length }})</h2>
                <div class='ml-auto mr-4 w-1/12 flex'>
                    <select v-on:change='initiateMarketSearch()' v-model='marketSelectedCurrency'
                        class="w-full border rounded-lg border-yellow py-2 px-4 bg-dark">
                        <option value='All'>All</option>
                        <option v-for='(currency, index) in acceptedTokens' :key='index' v-bind:value='currency.value'>
                            {{currency.key}}</option>
                    </select>
                </div>
                <div class='w-3/12 flex'>
                    <select :key='marketSelectedCurrency' v-on:change='initiateMarketSearch()' v-model='marketSortBy'
                        class="w-full border rounded-lg border-yellow py-2 px-4 bg-dark">
                        <option v-bind:value='""'>Order By</option>
                        <option v-if='marketSelectedCurrency !== "All"' value="price-asc">Price ascending
                        </option>
                        <option v-if='marketSelectedCurrency !== "All"' value="price-desc">Price descending
                        </option>
                        <option value="tokenId-asc">ID ascending</option>
                        <option value="tokenId-desc">ID descending</option>
                    </select>
                </div>
                <div class='w-auto flex ml-5 items-center cursor-pointer' v-on:click='$modal.show("user-profile")'>
                    <span><i class="fas fa-user text-xl hover:text-white"></i></span>
                </div>
                <div class='w-auto flex ml-5 items-center cursor-pointer' v-on:click='$modal.show("allowances")'>
                    <span><i class="fas fa-cog text-xl hover:text-white"></i></span>
                </div>
            </div>
            <hr class='m-5' />

            <!-- SALES -->
            <div v-show='marketTab === CONSTANTS.SALES_TAB' class='w-full h-full mx-6 market-plaza'>
                <div class='text-xl p-4 opacity-75' v-if='marketTokens.length === 0'>There are no sales.</div>
                <MarketPlazaItem class='mt-2 mx-4 mb-6 flex flex-col' v-for='(item, index) in marketTokens'
                    :key='index'>
                    <div v-on:click='showMarketCardModal(item)' class='market-item-header relative' slot='header'>
                        <div style='background-color: #8E2D2D'
                            class='absolute rounded-r-xl text-white text-base flex items-center justify-center top-3 left-0 w-6/12 h-6'>
                            <span v-if='item.type === CONSTANTS.AUCTION'>
                                Auction
                            </span>
                            <span v-else>
                                SALE
                            </span>
                        </div>
                        <img v-bind:src='getListingImage(item.tokenId)' />
                    </div>
                    <div class='px-1 market-item-body' slot='body'>
                        <div class='mt-2 w-full ml-2 mr-2 flex opacity-50'>
                            <div class='w-8/12'> {{market.collectionName}} </div>
                            <div v-if='item.type === CONSTANTS.SALE' class='w-4/12'>Price</div>
                            <div v-else class='w-7/12'>Highest Bid</div>
                        </div>
                        <div class='ml-2 w-full ml-2 mr-2 flex'>
                            <div class='w-8/12'>#{{ item.tokenId }}</div>
                            <div class='w-4/12 text-white'>{{ item.price / (10 ** 18)}}
                                {{getCurrencyName(item.currency.id)}}</div>
                        </div>
                        <div v-if='false' class='w-full mt-2 ml-2 mr-2 flex text-white opacity-50'>
                            <div class='w-8/12 text-right mr-2 my-auto mt-1 text-xs'>Last </div>
                            <div class='w-4/12'>10 XYA</div>
                        </div>
                    </div>
                    <div slot='footer' class='market-item-footer p-2 mt-auto flex justify-evenly'>
                        <button type="button"
                            class="w-full mx-2 rounded-lg border border-primary-alt bg-transparent hover:bg-primary-alt hover:text-white px-0 py-0 min-h-12">
                            Details
                        </button>
                        <button v-if='item.type === CONSTANTS.SALE' v-on:click='buyMarketToken(item)' type="button"
                            class="w-full mx-2 rounded-lg border border-primary-alt bg-transparent hover:bg-primary-alt hover:text-white px-0 py-0 min-h-12">
                            <span>Buy</span>
                        </button>
                        <button v-if='item.type === CONSTANTS.AUCTION' v-on:click='showMakeBidModal(item)' type="button"
                            class="w-full mx-2 rounded-lg border border-primary-alt bg-transparent hover:bg-primary-alt hover:text-white px-0 py-0 min-h-12">
                            <span>Bid</span>
                        </button>
                    </div>
                </MarketPlazaItem>
            </div>

            <!-- My Sales -->
            <div v-show='marketTab === CONSTANTS.USER_TAB' class='w-full h-full mx-6 market-plaza'>
                <div class='text-xl p-4 opacity-75' v-if='userSales.length === 0'>You don't have any sales.</div>
                <MarketPlazaItem class='mt-2 mx-4 mb-6 flex flex-col' v-for='(item, index) in userSales' :key='index'>
                    <div v-on:click='showCollectionSaleModal(item)' class='market-item-header relative' slot='header'>
                        <div style='background-color: #8E2D2D'
                            class='absolute rounded-r-xl text-white text-base flex items-center justify-center top-3 left-0 w-6/12 h-6'>
                            <span v-if='item.type === CONSTANTS.AUCTION'>
                                Auction
                            </span>
                            <span v-else>
                                SALE
                            </span>
                        </div>
                        <img v-bind:src='getListingImage(item.tokenId)' />
                    </div>
                    <div class='px-1 market-item-body' slot='body'>
                        <div class='mt-2 w-full ml-2 mr-2 flex opacity-50'>
                            <div class='w-8/12'> {{market.collectionName}} </div>
                            <div v-if='item.type === CONSTANTS.SALE' class='w-4/12'>Price</div>
                            <div v-else class='w-7/12'>Highest Bid</div>
                        </div>
                        <div class='ml-2 w-full ml-2 mr-2 flex'>
                            <div class='w-8/12'>#{{ item.tokenId }}</div>
                            <div class='w-4/12 text-white'>{{item.price / (10 ** 18)}}
                                {{getCurrencyName(item.currency.id)}}</div>
                        </div>
                        <div v-if='false' class='w-full mt-2 ml-2 mr-2 flex text-white opacity-50'>
                            <div class='w-8/12 text-right mr-2 my-auto mt-1 text-xs'>Last </div>
                            <div class='w-4/12'>10 XYA</div>
                        </div>
                    </div>
                    <div slot='footer' class='relative market-item-footer p-2 mt-auto flex justify-evenly'>
                        <button v-on:click='showCollectionSaleModal(item)'
                            class="w-full mx-2 rounded-lg border border-primary-alt bg-transparent hover:bg-primary-alt hover:text-white px-0 py-0 min-h-12">
                            Details
                        </button>
                        <button v-if='item.type === CONSTANTS.SALE' v-on:click='delistNft()'
                            class="w-full mx-2 rounded-lg border border-primary-alt bg-transparent hover:bg-primary-alt hover:text-white px-0 py-0 min-h-12">
                            Cancel
                        </button>
                    </div>
                </MarketPlazaItem>
            </div>


            <!-- USER COLLECTION -->
            <div :key='keys.nftCollection' class='w-full h-full mx-6 market-plaza'
                v-show='marketTab === CONSTANTS.COLLECTION_TAB'>
                <div v-if='userTokens.length === 0'>Your collection is empty.</div>
                <MarketPlazaItem class='m-2 mx-4 mb-6 flex flex-col' v-for='(item, index) in userTokens' :key='index'>
                    <div v-on:click='showCollectionCardModal(item)' class='market-item-header' slot='header'>
                        <img v-bind:src='getListingImage(item.tokenId)' />
                    </div>
                    <div class='px-1 market-item-body' slot='body'>
                        <div class='mt-2 w-full ml-2 mr-2 flex opacity-50'>
                            <div class='w-8/12'> {{market.collectionName}} </div>
                        </div>
                        <div class='ml-2 w-full ml-2 mr-2 flex'>
                            <div class='w-8/12'>#{{ item.tokenId }}</div>
                        </div>
                    </div>
                    <div slot='footer' class='relative market-item-footer p-2 mt-auto flex justify-evenly'>
                        <button v-on:click='showCollectionCardModal(item)' type="button"
                            class="w-6/12 mx-2 rounded-lg border border-primary-alt bg-transparent hover:bg-primary-alt hover:text-white px-0 py-0 min-h-9">
                            Details
                        </button>
                        <button id='collectionMenuButton' v-bind:data-token-id='item.tokenId'
                            v-on:click='showCollectionDropwdown' type="button"
                            class="w-6/12 z-20 mx-2 rounded-lg border bg-transparent hover:text-white hover:border hover:border-primary-alt p-2 min-h-12">
                            <span class='pointer-events-none'>More</span>
                        </button>
                    </div>
                </MarketPlazaItem>
            </div>
        </div>

        <div id='collectionMenu' v-show='bools.collectionMenu' ref='collectionMenu'
            class='fixed border shadow-xl px-6 py-2 text-center bg-light rounded-lg cursor-pointer'>
            <div class='my-4 hover:text-white'>Collect</div>
            <div v-on:click='showPickCurrencyModal()' class='my-4 hover:text-white'>
                Register
            </div>
            <div v-on:click='showSendNftModal()' class='my-4 hover:text-white'>
                Send
            </div>
        </div>

        <!--Collection Card Modal-->
        <MarketModal v-if='bools.collectionCard' v-on:closeModal='bools.collectionCard = false'
            :item='collectionSelectedToken' :image='getListingImage(collectionSelectedToken.tokenId)'>
            <template slot='header-content'>

                <div class='w-full h-3/6'>
                    <div class='w-full flex h-8'>
                        <h2 class='text-xl opacity-75'>{{ market.collectionName }}</h2>
                        <i v-on:click='bools.collectionCard = false'
                            class="fas ml-auto fa-times cursor-pointer text-xl"></i>
                    </div>
                    <div class='w-full flex items-center'>
                        <h2 v-if='collectionSelectedToken' class='text-4xl mb-1'>{{ market.tokenName }}
                            #{{ collectionSelectedToken.tokenId }}</h2>
                        <span class='ml-auto'>SEND REGISTER COLLECT</span>
                    </div>
                    <h2 class='text-base text-white opacity-50'>Owned by: You</h2>
                </div>
                <div class='w-full flex flex-col rounded-xl h-3/6'>
                    <h2 class='text-xl'>List item for sale</h2>
                    <button v-on:click='showCreateMarketSaleModal()' type="button"
                        class="w-4/12 mt-auto rounded-lg border border-primary-alt bg-transparent hover:bg-primary-alt hover:text-white">
                        Fixed Price
                    </button>
                    <button v-on:click='showCreateMarketAuctionModal()' type="button"
                        class="w-4/12 mt-auto rounded-lg border border-primary-alt bg-transparent hover:bg-primary-alt hover:text-white">
                        Auction
                    </button>
                </div>
            </template>
        </MarketModal>

        <!--My Sale Card Modal-->
        <MarketModal v-if='bools.collectionSale' v-on:closeModal='bools.collectionSale = false'
            :item='collectionSelectedToken' :image='getListingImage(collectionSelectedToken.tokenId)'>
            <template slot='header-content'>

                <div class='w-full h-3/6'>
                    <div class='w-full flex h-8'>
                        <h2 class='text-xl opacity-75'>{{ market.collectionName }}</h2>
                        <i v-on:click='bools.collectionSale = false'
                            class="fas ml-auto fa-times cursor-pointer text-xl"></i>
                    </div>
                    <div class='w-full flex items-center'>
                        <h2 v-if='collectionSelectedToken' class='text-4xl mb-1'>{{ market.tokenName }}
                            #{{ collectionSelectedToken.tokenId }}</h2>
                    </div>
                    <h2 class='text-base text-white opacity-50'>Owned by: You</h2>
                </div>
                <div class='w-full flex flex-col rounded-xl h-3/6'>
                    <h2 class='text-xl'>Manage item</h2>
                    <h2 v-if='collectionSelectedToken.type === CONSTANTS.SALE' class='text-base mt-2 opacity-75'>Price
                    </h2>
                    <h2 v-else class='text-base mt-2 opacity-75'>Highest Bidder: </h2>

                    <div class='flex w-full items-center'>
                        <h2 class='text-xl text-white'>
                            {{ collectionSelectedToken.price / (10 ** 18) }}
                            {{ getCurrencyName(collectionSelectedToken.currency.id) }}</h2>
                    </div>

                    <h2 v-if='collectionSelectedToken.type === CONSTANTS.AUCTION' class='text-base mt-2 opacity-75'>Ends
                        In:
                    </h2>

                    <div v-if='collectionSelectedToken.type === CONSTANTS.AUCTION && !collectionSelectedToken.order.ended'
                        class='mt-auto flex flex-row items-center w-full'>
                        <h2 class='text-xl text-white'>
                            {{ getAuctionEndDate(collectionSelectedToken) }}
                        </h2>
                    </div>
                    <div v-else class='mt-auto flex flex-row items-center w-full'>
                        <h2 class='text-xl text-white'>
                            Auction Ended
                        </h2>
                        <button v-on:click='withdrawNft(collectionSelectedToken)' type="button"
                            class="w-4/12 ml-auto mt-auto rounded-lg border border-primary-alt bg-transparent hover:bg-primary-alt hover:text-white">
                            Withdraw
                        </button>
                    </div>

                    <div v-if='collectionSelectedToken.type === CONSTANTS.SALE' class='mt-auto'>
                        <button v-on:click='delistNft()' type="button"
                            class="w-4/12 mt-auto rounded-lg border border-primary-alt bg-transparent hover:bg-primary-alt hover:text-white">
                            Cancel
                        </button>
                    </div>
                </div>
            </template>
        </MarketModal>


        <!--Market Card Modal-->
        <MarketModal v-if='bools.marketCard' v-on:closeModal='bools.marketCard = false' :item='marketSelectedToken'
            :image='getListingImage(marketSelectedToken.tokenId)'>
            <template slot='header-content'>
                <div class='w-full h-3/6'>
                    <div class='w-full flex h-8'>
                        <h2 class='text-xl opacity-75'>{{ market.collectionName }}</h2>
                        <i v-on:click='bools.marketCard = false'
                            class="fas ml-auto fa-times cursor-pointer text-xl"></i>
                    </div>
                    <h2 v-if='marketSelectedToken' class='text-4xl mb-1'>{{ market.tokenName }}
                        #{{ marketSelectedToken.tokenId }}</h2>
                    <h2 class='text-base text-white opacity-50'>Owned by: {{ marketSelectedToken.order.seller.id }}</h2>
                </div>
                <div class='w-full flex flex-col rounded-xl h-3/6'>
                    <h2 class='text-xl'>Manage item</h2>
                    <h2 v-if='marketSelectedToken.type === CONSTANTS.SALE' class='text-base mt-2 opacity-75'>Price
                    </h2>
                    <h2 v-else class='text-base mt-2 opacity-75'>Highest Bidder: </h2>

                    <div class='flex w-full items-center'>
                        <h2 class='text-xl text-white'>
                            {{ marketSelectedToken.price / (10 ** 18) }}
                            {{ getCurrencyName(marketSelectedToken.currency.id) }}</h2>

                        <button v-if='marketSelectedToken.type === CONSTANTS.AUCTION'
                            v-on:click='showMakeBidModal(marketSelectedToken)' type="button"
                            class="w-4/12 ml-auto rounded-lg border border-primary-alt bg-transparent hover:bg-primary-alt hover:text-white">
                            Bid
                        </button>
                    </div>

                    <h2 v-if='marketSelectedToken.type === CONSTANTS.AUCTION' class='text-base mt-2 opacity-75'>Ends
                        In:
                    </h2>

                    <div v-if='marketSelectedToken.type === CONSTANTS.AUCTION && !marketSelectedToken.order.ended'
                        class='mt-auto flex flex-row items-center w-full'>
                        <h2 class='text-xl text-white'>
                            {{ getAuctionEndDate(marketSelectedToken) }}
                        </h2>
                    </div>
                    <div v-else class='mt-auto flex flex-row items-center w-full'>
                        <h2 class='text-xl text-white'>
                            Auction Ended
                        </h2>
                    </div>
                </div>
            </template>
        </MarketModal>

        <!--Create Sale Modal-->
        <window v-if='bools.collectionCard' name="create-listing" width='80%' height='auto'>
            <div class="flex flex-wrap flex-col p-6 bg-dark h-full">
                <div class='w-full flex'>
                    <div class="w-4/5">
                        <div v-if='collectionSaleType === CONSTANTS.SALE' class="text-2xl">List
                            #{{collectionSelectedToken.tokenId}} for sale</div>
                        <div v-else class="text-2xl">Create auction for #{{collectionSelectedToken.tokenId}}</div>
                    </div>
                    <div class="w-1/5 text-right">
                        <i @click="$modal.hide('create-listing')" class="fas fa-times cursor-pointer text-xl"></i>
                    </div>
                </div>
                <div class='mt-1 p-1'>
                    <p class='mt-1 text-xl'>Price
                    </p>
                </div>
                <div class="mt-1 mb-4 flex w-full p-1">
                    <input class='w-full rounded text-black px-2 h-9 shadow-xl border border-primary-alt' type="number"
                        v-model='collectionSaleAmount' />

                    <select v-model='collectionSaleToken'
                        class="w-6/12 border rounded-lg border-yellow ml-4 px-4 bg-dark">
                        <option v-for='(token, index) in acceptedTokens' v-bind:value="token.value" :key='index'>
                            {{ token.key }}</option>
                    </select>
                </div>
                <div v-if='collectionSaleType === CONSTANTS.AUCTION' class='mt-1 p-1'>
                    <p class='mt-1 text-xl'>Duration
                    </p>
                </div>
                <div v-if='collectionSaleType === CONSTANTS.AUCTION' class="mt-1 mb-4 flex w-full p-1">
                    <input class='w-full rounded text-black px-2 h-9 shadow-xl border border-primary-alt' type="number"
                        v-model='collectionSaleDuration' />
                </div>

                <div class='w-full flex justify-space h-12 p-1 text-base'>
                    <div class='w-6/12'></div>
                    <button v-on:click="$modal.hide('create-listing')"
                        class="w-4/12 mx-6 mt-auto rounded-lg hover:border hover:border-primary-alt bg-transparent hover:text-white">
                        Cancel
                    </button>
                    <button v-on:click="listNft(collectionSaleType === CONSTANTS.AUCTION)"
                        class="w-4/12 mt-auto rounded-lg border border-primary-alt bg-transparent hover:bg-primary-alt hover:text-white">
                        Confirm
                    </button>
                </div>
            </div>
        </window>

        <window class='w-10/12' height="auto" width="80%" name="pick-currency">
            <div class="flex flex-wrap p-6 bg-dark h-full">
                <div class="w-4/5">
                    <div class="text-2xl">Register Frey</div>
                </div>
                <div class="w-1/5 text-right">
                    <i @click="$modal.hide('pick-currency')" class="fas fa-times cursor-pointer text-xl"></i>
                </div>
                <div class='mt-4 md:text-base text-sm opacity-75'>
                    <p v-if='collectionSelectedToken' class='mt-1'>Register #{{collectionSelectedToken.tokenId}} for:
                    </p>
                </div>
                <div class="mt-4 flex md:flex-row flex-row w-full items-start justify-start">
                    <select v-model='collectionSaleToken' class="w-9/12 border rounded-lg border-yellow px-4 bg-dark">
                        <option v-for='(token, index) in acceptedTokens' v-bind:value="token.value" :key='index'>
                            {{ token.key }}</option>
                    </select>
                    <div class="text-right md:text-center md:w-9/12 w-5/12 mx-2 md:mx-0">
                        <button v-on:click="registerFrey()" type="button"
                            class="w-full md:w-10/12 md:text-base text-sm rounded-xl border border-primary-alt bg-transparent hover:bg-primary-alt hover:text-white px-2 mx-2 py-0">
                            <span v-if='!loaders.nftRegister'>Confirm</span>
                            <span v-else><i class="fas fa-cog fa-spin"></i></span>
                        </button>
                    </div>
                </div>
            </div>
        </window>

        <window class='w-10/12' height="auto" width="80%" name="send-nft">
            <div class="flex flex-wrap p-6 bg-dark h-full">
                <div class="w-4/5">
                    <div class="text-2xl">Send Nft</div>
                </div>
                <div class="w-1/5 text-right">
                    <i @click="$modal.hide('send-nft')" class="fas fa-times cursor-pointer text-xl"></i>
                </div>
                <div class='mt-4 md:text-base text-sm opacity-75'>
                    <p v-if='collectionSelectedToken' class='mt-1'>Send #{{collectionSelectedToken.tokenId}} to: </p>
                </div>
                <div class="mt-4 flex md:flex-row flex-row w-full items-start justify-start">
                    <input class='w-full text-black px-2' type="text" v-model='nftTransactionTo' />
                    <div class="text-right md:text-center md:w-9/12 w-5/12 mx-2 md:mx-0">
                        <button v-on:click="sendNft()" type="button"
                            class="w-full md:w-10/12 md:text-base text-sm rounded-none border border-primary-alt bg-transparent hover:bg-primary-alt hover:text-white px-2 mx-2 py-0">
                            <span v-if='!loaders.nftSend'>Confirm</span>
                            <span v-else><i class="fas fa-cog fa-spin"></i></span>
                        </button>
                    </div>
                </div>
            </div>
        </window>

        <window class='w-10/12' height="auto" width="80%" name="make-bid">
            <div class="flex flex-wrap p-6 bg-dark h-full">
                <div class="w-4/5">
                    <div class="text-2xl">Make Bid</div>
                </div>
                <div class="w-1/5 text-right">
                    <i @click="$modal.hide('make-bid')" class="fas fa-times cursor-pointer text-xl"></i>
                </div>
                <div class='mt-4 md:text-base text-sm opacity-75'>
                    <p v-if='marketSelectedToken' class='mt-1'>Bid for #{{marketSelectedToken.tokenId}} to: </p>
                </div>
                <div class="mt-4 flex md:flex-row flex-row w-full items-start justify-start">
                    <input class='w-full text-black px-2' type="text" v-model='marketBidAmount' />
                    <div class="text-right md:text-center md:w-9/12 w-5/12 mx-2 md:mx-0">
                        <button v-on:click="bidMarketToken(marketSelectedToken)" type="button"
                            class="w-full md:w-10/12 md:text-base text-sm rounded-none border border-primary-alt bg-transparent hover:bg-primary-alt hover:text-white px-2 mx-2 py-0">
                            <span v-if='!loaders.nftSend'>Confirm</span>
                            <span v-else><i class="fas fa-cog fa-spin"></i></span>
                        </button>
                    </div>
                </div>
            </div>
        </window>

        <window height='auto' width='80%' name='allowances'>
            <div class="flex flex-wrap p-6 bg-dark h-full">
                <div class="w-4/5">
                    <div class="text-2xl">Control Panel</div>
                </div>
                <div class="w-1/5 text-right">
                    <i @click="$modal.hide('allowances')" class="fas fa-times cursor-pointer text-xl"></i>
                </div>
                <div class="mt-4 flex flex-col w-full items-start justify-start">
                    <div class="w-4/5">
                        <h2 class="text-xl my-2 opacity-75">Market Tokens</h2>
                    </div>
                    <div class='flex w-full flex-row my-2' v-for='(token, index) in acceptedTokens' :key='index'>
                        <p class='w-2/12'>{{token.key}}</p>
                        <div v-if='index > 0' class="w-6/12 text-right md:text-center mx-2">
                            <button v-on:click="setTokenAllowance(token, !token.approved ? 999999999 : 0)" type="button"
                                class="w-full md:w-10/12 md:text-base text-sm rounded-none border border-primary-alt bg-transparent hover:bg-primary-alt hover:text-white px-2 mx-2 py-0">
                                <span v-if='!token.approved'>Enable</span>
                                <span v-else>Disable</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </window>

        <window height='auto' width='80%' name='user-profile'>
            <div class="flex flex-wrap p-6 bg-dark h-full">
                <div class="w-4/5">
                    <div class="text-2xl">User Profile</div>
                </div>
                <div class="w-1/5 text-right">
                    <i @click="$modal.hide('user-profile')" class="fas fa-times cursor-pointer text-xl"></i>
                </div>
                <div class="mt-4 flex flex-col w-full items-start justify-start">
                    <div class="w-4/5">
                        <h2 class="text-xl my-2 opacity-75">Balances</h2>
                    </div>
                    <div class='flex w-full flex-row my-2' v-for='(token, index) in acceptedTokens' :key='index'>
                        <p class='w-2/12'>{{token.key}}</p>
                        <p class='w-2/12 text-white'>{{token.balance}}</p>
                        <div v-if='token.balance > 0' class="w-6/12 text-right md:text-center mx-2">
                            <button v-on:click="withdraw(token)" type="button"
                                class="w-full md:w-10/12 md:text-base text-sm rounded-none border border-primary-alt bg-transparent hover:bg-primary-alt hover:text-white px-2 mx-2 py-0">
                                <span>Collect</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </window>
    </div>
</template>

<script>
    const GRAPH_API = "http://marketplace-api.freyala.com:8080/graphql";
    const ONE_TOKEN = "0x0000000000000000000000000000000000000000";
    const FREYS = "https://frey.freyala.com/images/";

    import MarketPlazaItem from './MarketPlazaItem';
    import MarketModal from './MarketModal';
    import HRC721 from '../../plugins/artifacts/HRC721.json';
    import HRC20 from '../../plugins/artifacts/freyala.json';
    import FreyRegistry from '../../plugins/artifacts/freyRegistry.json';
    import fromExponential from "from-exponential";

    import {
        mapGetters,
        mapActions
    } from "vuex";
    import {
        ethers
    } from "ethers";

    import * as FilterQuery from "../../plugins/graphql/marketplace/filter";
    import * as AttributeQuery from "../../plugins/graphql/marketplace/attributes";

    export default {
        name: 'MarketPlaza',

        components: {
            MarketPlazaItem,
            MarketModal
        },

        props: {
            contract: {
                type: Object,
                default: undefined
            },
            market: {
                type: Object,
                default: undefined
            },
        },

        data() {
            return {
                marketApproved: false,
                freyRegistryContract: undefined,
                marketRegisterContract: undefined,
                marketTab: 3,
                marketPage: 0,
                marketPerPage: 100,
                marketSortBy: "",
                marketSelectedCurrency: "All",
                marketAttributes: [],
                marketSelectedFilters: [],
                marketSales: [],
                marketAuctions: [],
                marketTokens: [],
                marketBidAmount: 0,
                initialUserTokens: [],
                userTokens: [],
                userSales: [],
                marketSelectedToken: undefined,
                collectionSaleToken: undefined,
                collectionSaleDuration: 0,
                collectionSelectedToken: undefined,
                collectionOperations: [],
                collectionSaleAmount: 0,
                collectionSaleDate: 0,
                collectionSaleType: 0,
                keys: {
                    filters: 0,
                    nftCollection: 0
                },
                nftTransactionTo: "",
                nftTransactionFrom: "",
                loaders: {
                    nftSend: false,
                    nftRegister: false,
                    nftList: false,
                    nftBid: false,
                    fetchUserNft: false,
                    fetchMarketNft: false
                },
                bools: {
                    collectionCard: false,
                    collectionSale: false,
                    collectionMakeSale: false,
                    collectionMakeAuction: false,
                    collectionMenu: false,
                    marketCard: false,
                    cardAttributes: false,
                    cardSales: false,
                    cardDetails: false
                },
                blockNumber: 0,
                tokens: [{
                        key: "ONE",
                        value: "0x0000000000000000000000000000000000000000",
                        approved: true,
                        balance: 0
                    },
                    {
                        key: "HOPI",
                        value: "0xd2bee32c075086562268094ac0790a69c70dc58f",
                        approved: false,
                        balance: 0
                    },
                    {
                        key: "XYA",
                        value: "0x9b68bf4bf89c115c721105eaf6bd5164afcc51e4",
                        approved: false,
                        balance: 0
                    },
                    {
                        key: "YANG",
                        value: "0xe59aa7f9e91b4cc6c25d3542cecb851e0316138c",
                        approved: false,
                        balance: 0
                    },
                    {
                        key: "YIN",
                        value: "0x340042552d19211795dbe55d84fa2e63bc49b890",
                        approved: false,
                        balance: 0
                    },
                ],
                acceptedTokens: [],
                CONSTANTS: {
                    //LISTING TYPE
                    SALE: 0,
                    AUCTION: 1,

                    //MARKET TABS
                    COLLECTION_TAB: 0,
                    USER_TAB: 1,
                    AUCTIONS_TAB: 2,
                    SALES_TAB: 3
                }
            };
        },

        async mounted() {
            const promise = new Promise(async (resolve, reject) => {
                const hmyNet = "https://api.s0.b.hmny.io";
                const body =
                    '{"jsonrpc":"2.0","method":"hmyv2_blockNumber","params":[],"id":1}';

                const response = await fetch(hmyNet, {
                    method: "POST",
                    mode: "cors",
                    cache: "no-cache",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: body,
                });

                const data = await response.json();
                this.blockNumber = data.result;
                resolve();
            });

            this.marketNftContract = new ethers.Contract(this.market.token, HRC721.abi, this.metaMaskWallet.signer);
            this.freyRegistryContract = new ethers.Contract(FreyRegistry.address, FreyRegistry.abi, this
                .metaMaskWallet.signer);

            this.$nextTick(async () => {
                this.marketApproved = await this.marketNftContract.isApprovedForAll(this
                    .metaMaskAccount,
                    this.contract.address);

                for (let i = 0; i < this.tokens.length; i++) {
                    const acceptsCurrency = await this.contract.acceptsCurrency(this.tokens[i].value);
                    if (!acceptsCurrency) continue;

                    this.acceptedTokens.push(this.tokens[i]);
                }

                this.collectionSaleToken = this.acceptedTokens[0].value;
                await this.verifyTokens();

                await this.fetchMarketAttributes();
                await this.initiateMarketSearch();
                await this.fetchUserNfts();
            });
        },

        methods: {
            async verifyTokens() {
                for (let i = 0; i < this.acceptedTokens.length; i++) {
                    const balance = await this.contract.getBalance(this.metaMaskAccount, this
                        .acceptedTokens[i].value) / (10 ** 18);
                    this.acceptedTokens[i].balance = balance > 0 ? balance : 0;

                    if (this.acceptedTokens[i].value === ONE_TOKEN) continue;

                    let tempContract = new ethers.Contract(this.acceptedTokens[i].value, HRC20.abi, this
                        .metaMaskWallet.signer);
                    const allowance = await tempContract.allowance(this.metaMaskAccount, this.contract.address);
                    const etherAllowance = ethers.utils.formatEther(
                        allowance._isBigNumber ?
                        ethers.BigNumber.from(allowance).toString() :
                        allowance
                    );

                    this.acceptedTokens[i].approved = etherAllowance > 0;
                }
            },

            async setTokenAllowance(token, amount) {
                let actual = 0;
                if (amount > 0) {
                    actual = amount * 10 ** 18;
                } else {
                    actual = 0;
                }
                try {
                    const arg = fromExponential(actual);

                    let tempContract = new ethers.Contract(token.value, HRC20.abi, this
                        .metaMaskWallet.signer);
                    const tx = await tempContract.approve(
                        this.contract.address,
                        arg
                    );
                    await tx.wait(1);
                    token.approved = true;
                } catch (err) {
                    console.error(err);
                }
            },

            goBack() {
                this.$emit('goBack');
            },

            showCollectionCardModal(item) {
                this.collectionSelectedToken = item;
                this.bools.collectionCard = true;
            },

            showCollectionSaleModal(item) {
                this.collectionSelectedToken = item;
                this.bools.collectionSale = true;
            },

            showMarketCardModal(item) {
                this.marketSelectedToken = item;
                this.bools.marketCard = true;
            },

            showMakeBidModal(item) {
                this.marketSelectedToken = item;
                this.marketBidAmount = 0;
                this.$modal.show('make-bid');
            },

            showCreateMarketSaleModal() {
                this.collectionSaleAmount = 0;
                this.collectionSaleToken = this.acceptedTokens[0].value;
                this.collectionSaleDate = 0;
                this.collectionSaleDuration = 0;
                this.collectionSaleType = this.CONSTANTS.SALE;
                this.$modal.show("create-listing");
            },

            showCreateMarketAuctionModal() {
                this.collectionSaleAmount = 0;
                this.collectionSaleToken = this.acceptedTokens[0].value;
                this.collectionSaleDate = 0;
                this.collectionSaleDuration = 0;
                this.collectionSaleType = this.CONSTANTS.AUCTION;
                this.$modal.show("create-listing");
            },

            showSendNftModal() {
                this.$modal.show('send-nft');
            },

            showPickCurrencyModal() {
                this.$modal.show('pick-currency');
            },

            generateMarketFilterQuery() {
                let query = [];

                for (let i = 0; i < this.marketAttributes.length; i++) {
                    if (this.marketSelectedFilters[i] === '') continue;

                    query.push({
                        key: this.marketAttributes[i].key,
                        value: this.marketSelectedFilters[i]
                    });
                }

                let strQuery = JSON.stringify(query);
                strQuery = strQuery.replaceAll('"key"', 'key').replaceAll('"value"', 'value');

                return strQuery;
            },

            getListingImage(id) {
                return FREYS + id + ".png";
            },

            getCurrencyName(id) {
                const currency = this.acceptedTokens.filter(c => c.value === id)[0];
                if (!currency) return "";
                return currency.key;
            },

            getAuctionEndDate(item) {
                const order = item.order;
                if (order.ended) return "ENDED";

                const blocks = item.order.endsAt - this.blockNumber;

                const dateNow = Date.now();
                const endDate = new Date(dateNow + parseInt(blocks * 2));

                const diffMilis = Math.abs(endDate - dateNow);
                const diffMins = Math.ceil(diffMilis / 1000 / 60);
                const diffHours = Math.ceil(diffMins / 60);
                const diffDays = Math.ceil(diffHours / 24);

                return diffDays + " Day(s), " + diffHours % 24 + " Hour(s), " + diffMins % 60 + " Minute(s)";
            },

            getPaginationInfo() {
                return undefined;
                return {
                    perPage: this.marketPerPage,
                    page: this.marketPage
                };
            },

            getOrderQuery() {
                if (this.marketSortBy === '') return undefined;
                const order = this.marketSortBy.split('-');
                return {
                    orderBy: order[0],
                    orderDirection: order[1]
                };
            },

            getCurrencyQuery() {
                if (this.marketSelectedCurrency === 'All') return undefined;
                return this.marketSelectedCurrency;
            },

            async fetchUserNfts() {
                const nfts = await this.marketNftContract.tokensOfOwner(this.metaMaskAccount);

                let ids = await nfts.map(async (frey) => {
                    return frey._isBigNumber ? ethers.BigNumber.from(frey._hex).toString() : frey._hex
                });

                await Promise.all(ids)
                    .then(async (listOfIds) => {
                        const userNfts = await this.$http.get(
                            `https://frey.freyala.com/meta/list?items=${listOfIds}`);

                        this.userTokens = userNfts.data;
                        this.initialUserTokens = userNfts.data;
                    });
            },

            async fetchMarketSales() {
                const filters = {
                    attributeFilter: this.generateMarketFilterQuery(),
                    currency: this.getCurrencyQuery()
                };
                const pagination = this.getPaginationInfo();
                const orderInfo = this.getOrderQuery();

                console.log(FilterQuery.FetchMarketNfts(this.market.token, filters, pagination, orderInfo));

                const result = await this.$http.post(GRAPH_API, {
                    query: FilterQuery.FetchMarketNfts(this.market.token, filters, pagination, orderInfo)
                });

                const marketSales = result.data.data.sales;
                marketSales.forEach(c => c.type = this.CONSTANTS.SALE);
                const marketAuctions = result.data.data.auctions;
                marketAuctions.forEach(c => c.type = this.CONSTANTS.AUCTION);

                this.marketTokens = [...marketSales, ...marketAuctions];
                this.sortCollectionByField(this.marketTokens);

                if (this.marketSortBy === '') {
                    this.marketTokens.sort((a, b) => a.order.timestamp > b.order.timestamp ? -1 : b.order
                        .timestamp < a
                        .order.timestamp ? 1 : -1);
                }
            },

            async fetchMarketAttributes() {
                const result = await this.$http.post(GRAPH_API, {
                    query: AttributeQuery.FetchMarketAttributes(this.market.token)
                });

                this.marketAttributes = result.data.data.markets[0].attributes;

                for (let i = 0; i < this.marketAttributes.length; i++) {
                    this.marketSelectedFilters.push("");
                }
            },

            async initiateMarketSearch() {
                let userSales = this.userSales;
                try {
                    this.userSales = [];
                    await this.fetchMarketSales();
                    await this.applyCollectionFilters();
                    const metamaskAccount = this.metaMaskAccount.toLowerCase();

                    const userSales = this.marketTokens.filter(c => c.order.seller.id === metamaskAccount && c
                        .type === this.CONSTANTS.SALE);
                    const userAuctions = this.marketTokens.filter(c => c.order.seller.id === metamaskAccount && c
                        .type === this.CONSTANTS.AUCTION);
                    this.marketTokens = this.marketTokens.filter(c => c.order.seller.id !== metamaskAccount);

                    this.userSales = [...userSales, ...userAuctions];
                } catch (err) {
                    console.error(err);
                    this.userSales = userSales;
                }
            },

            resetMarketFilters() {
                for (let i = 0; i < this.marketSelectedFilters.length; i++) {
                    this.marketSelectedFilters[i] = '';
                }
                this.initiateMarketSearch();
                this.userTokens = this.initialUserTokens;
                this.keys.filters++;
            },

            applyCollectionFilters() {
                this.userTokens = [];

                for (let i = 0; i < this.initialUserTokens.length; i++) {
                    const userToken = this.initialUserTokens[i];
                    let isMatch = true;

                    for (let j = 0; j < userToken.attributes.length && isMatch; j++) {
                        if (this.marketSelectedFilters[j] === '') continue;
                        if (userToken.attributes[j].value !== this.marketSelectedFilters[j]) {
                            isMatch = false;
                        }
                    }
                    if (isMatch) {
                        this.userTokens.push(userToken);
                    }
                }
            },

            hideSendNftModal() {
                this.nftTransactionTo = "";
                this.collectionSelectedToken = undefined;
                this.$modal.hide('send-nft');
                this.keys.nftCollection++;
            },

            async sendNft() {
                const address = this.nftTransactionTo;
                const id = this.collectionSelectedToken.tokenId;

                try {
                    this.loaders.nftSend = true;

                    const tx = await this.marketNftContract.transferFrom(this.metaMaskAccount, address, id);
                    await tx.wait(1);

                    this.loaders.nftSend = false;
                    this.hideSendNftModal();
                    this.userTokens = this.userTokens.filter(c => c.tokenId !== id);
                } catch (err) {
                    this.hideSendNftModal();
                    this.loaders.nftSend = false;
                }
            },

            async registerFrey() {
                const item = this.collectionSelectedToken;
                let isFreyRegistered = true;
                try {
                    const fees = await this.freyRegistryContract.getFees(item.tokenId);
                } catch (err) {
                    isFreyRegistered = false;
                }

                try {
                    let tx = undefined;
                    if (!isFreyRegistered) {
                        tx = await this.freyRegistryContract.register(item.tokenId + "", this.collectionSaleToken, {
                            gasPrice: 100000000000,
                            gasLimit: 1000000,
                        });
                    } else {
                        tx = await this.freyRegistryContract.switchCurrency(item.tokenId + "", this
                            .collectionSaleToken, {
                                gasPrice: 100000000000,
                                gasLimit: 500000,
                            });
                    }
                    await tx.wait(1);
                    this.$modal.hide('pick-currency');
                } catch (err) {
                    this.$modal.hide('pick-currency');
                }
            },

            async buyMarketToken(token) {
                const [tokenAddress, tokenId, price, currency] = [this.market.token, token.tokenId,
                    token.price, token.currency.id
                ];
                console.log(tokenAddress, tokenId, currency, price);
                try {
                    const contractSellOrder = await this.contract.getSellOrder(tokenAddress, tokenId);

                    if (!contractSellOrder) throw "Sell order doesn't exist or expired.";

                    const priceValue = token.currency.id === this.acceptedTokens[0].value ? price : 0;
                    const acceptedCurrency = this.acceptedTokens.filter(c => c.value === currency)[0];

                    if (!acceptedCurrency) throw "Currency not supported";
                    if (!acceptedCurrency.approved) throw `${acceptedCurrency.key} is not approved.`;

                    const tx = await this.contract.buy(tokenAddress, tokenId, currency, price, {
                        gasPrice: 100000000000,
                        gasLimit: 1000000,
                        value: priceValue
                    });
                    await tx.wait(1);
                } catch (err) {
                    console.error(err);
                }
            },

            async bidMarketToken(token) {
                const [tokenAddress, tokenId, currency, amount] = [this.market.token, token.tokenId, token.currency
                    .id, this.marketBidAmount
                ];
                const price = token.price;

                try {
                    const contractAuction = await this.contract.getAuction(tokenAddress, tokenId);

                    if (!contractAuction) throw "Auction order doesn't exist or ended.";

                    const priceValue = token.currency.id === this.acceptedTokens[0].value ? amount : 0;
                    const acceptedCurrency = this.acceptedTokens.filter(c => c.value === currency)[0];

                    if (!acceptedCurrency) throw "Currency not supported";
                    if (!acceptedCurrency.approved) throw `${acceptedCurrency.key} is not approved.`;

                    const tx = await this.contract.bid(tokenAddress, tokenId, price, {
                        gasPrice: 100000000000,
                        gasLimit: 1000000,
                        value: priceValue
                    });
                    await tx.wait(1);
                } catch (err) {
                    console.error(err);
                }
            },

            async listNft(isAuction = false) {
                const [token, tokenId, currency, amount, duration] = [this.market.token, this
                    .collectionSelectedToken.tokenId,
                    this.collectionSaleToken, "" + fromExponential(this.collectionSaleAmount * (10 ** 18)), this
                    .collectionSaleDuration
                ];

                try {
                    if (!this.marketApproved) {
                        await this.setMarketApproval(true);
                    }

                    const tx = isAuction ? await this.contract.createAuction(token, tokenId, currency, amount,
                            duration) :
                        await this.contract.sell(token, tokenId, currency, amount);
                    await tx.wait(1)

                    await this.fetchUserNfts();
                    this.$modal.show("create-listing");
                    this.bools.collectionCard = false;
                } catch (err) {}
            },

            async delistNft() {
                const [token, tokenId] = [this.market.token, this.collectionSelectedToken.tokenId];

                try {
                    const tx = await this.contract.cancelSell(token, tokenId);
                    await tx.wait(1);

                    await this.fetchUserNfts();
                    this.collectionSale = false;
                } catch (err) {}
            },

            async withdraw(token) {
                try {
                    const tx = await this.contract.withdraw(token.value);
                    await tx.wait(1);
                    token.balance = 0;
                } catch (err) {

                }
            },

            async setMarketApproval(approve) {
                try {
                    const tx = await this.marketNftContract.setApprovalForAll(this.contract.address, approve);
                    await tx.wait(1);
                    this.marketApproved = approve;
                } catch (err) {

                }
            },

            sortCollectionByField(collection) {
                const sortBy = this.marketSortBy.split('-');
                const order = sortBy[1] === 'asc' ? 1 : -1;

                if (sortBy[0] === 'price') {
                    collection.sort((a, b) => (a.price > b.price) ? order : ((b.price > a
                        .price ? -order :
                        0)));
                } else {
                    collection.sort((a, b) => (a.tokenId > b.tokenId) ? order : ((b.tokenId > a.tokenId ? -order :
                        0)));
                }
            },

            showCollectionDropwdown(event) {
                try {
                    const tokenId = event.target.dataset["tokenId"];
                    const selectedCard = this.userTokens.filter(c => c.tokenId == tokenId)[0];

                    if (!selectedCard) return;
                    this.collectionSelectedToken = selectedCard;

                    this.bools.collectionMenu = true;
                    let dropdown = this.$refs.collectionMenu;

                    const buttonPosition = event.target.getBoundingClientRect();

                    dropdown.style.top = (buttonPosition.top - 160) + 'px';
                    dropdown.style.left = (buttonPosition.left) + 'px';

                    const onClick = (event) => {
                        if (event.target.id === 'collectionMenuButton') return;

                        window.removeEventListener('click', onClick);
                        window.removeEventListener('mousewheel', onScroll);
                        this.bools.collectionMenu = false;
                    }

                    const onScroll = (event) => {
                        window.removeEventListener('click', onClick);
                        window.removeEventListener('mousewheel', onScroll);
                        this.bools.collectionMenu = false;
                    }

                    window.addEventListener('click', onClick);
                    window.addEventListener('mousewheel', onScroll);
                } catch (err) {
                    console.error(err);
                }
            },
        },

        computed: {
            ...mapGetters(["metaMaskAccount", "metaMaskWallet"]),

        }
    }
</script>

<style>
    .details-modal {
        position: fixed;
        top: 15%;
        bottom: 15%;
        left: 25%;
        right: 25%;
    }

    .bg-light {
        background-color: #212121;
    }

    .bg-hover {
        background-color: #313131;
    }

    ::-webkit-scrollbar {
        width: 10px;
    }

    ::-webkit-scrollbar-track {
        background: #0E0E0E;
        border-radius: 12px;
    }

    ::-webkit-scrollbar-thumb {
        background: #54B67A;
        border-radius: 12px;
    }

    ::-webkit-scrollbar-thumb:hover {
        background: #555;
    }

    .market-plaza {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
    }

    .item-info-enter-active,
    .item-info-leave-active {
        transition: all 0.5s;
        left: 0;
    }

    .item-info-enter,
    .item-info-leave-to {
        left: -2000px;
    }
</style>