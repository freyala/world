<template>
    <div :key='keys.application' class='w-full h-full flex flex-row'>

        <div v-show='loaders.application'
            class='fixed top-0 bottom-0 right-0 left-0 flex flex-col justify-center items-center'
            style='background-color: rgba(0,0,0, 0.5); z-index: 9999'>
            <div class="w-full flex">
                <img class="w-24 h-24 m-auto" src="/images/XYA.png" alt="XYA logo"
                    style="animation: rotation 2s infinite linear;">
            </div>
            <h2 class='text-white text-2xl'>Loading...</h2>
        </div>


        <div
            class='2xl:w-3/12 xl:block h-auto flex flex-col hidden 2xl:text-base md:text-sm rounded-lg relative bg-light'>
            <div class='text-center flex flex-col justify-center items-center mt-4 pb-4 shadow-lg'
                style='height: 67px;'>
                <div class='w-9/12 mx-auto flex h-full'>
                    <button v-on:click='resetMarketFilters()' type="button"
                        class="w-9/12 mx-2 rounded-lg hover:text-white px-0 py-0 min-h-9">
                        Reset
                    </button>
                    <button v-on:click='initiateMarketSearch()' type="button"
                        class="w-full mr-2 xya-btn z-0 flex items-center justify-center">
                        Apply
                    </button>
                </div>
            </div>
            <div :key='keys.filters' class="overflow-y-auto text-center flex py-4 mx-2 my-4 flex-col bg-light"
                style='height: calc(100% - 120px)'>
                <div class='w-full mb-2'>
                    <div class='mb-1'>
                        Search by #
                    </div>
                    <div class='flex w-9/12 mx-auto'>
                        <select v-model='marketIdQueryComparator'
                            class="w-9/12 border rounded-lg border-yellow text-sm py-2 px-4 bg-dark">
                            <option value='tokenId'>Equal</option>
                            <option value='tokenId_lte'>Lesser Than</option>
                            <option value='tokenId_gte'>Greater Than</option>
                        </select>
                        <input v-model='marketIdQuery' type='number'
                            class='w-6/12 ml-4 border rounded-lg border-yellow py-2 px-4 bg-dark' />
                    </div>
                </div>

                <div class='w-full mb-2'>
                    <div class='mb-1'>
                        Currency
                    </div>
                    <select v-model='marketSelectedCurrency'
                        class="w-9/12 border rounded-lg border-yellow py-2 px-4 bg-dark">
                        <option value='All'>All</option>
                        <option v-for='(currency, index) in acceptedTokens' :key='index' v-bind:value='currency.value'>
                            {{currency.key}}</option>
                    </select>
                </div>
                <div class='mb-1'>
                    Order
                </div>
                <div class='w-full mb-2'>
                    <select :key='marketSelectedCurrency' v-model='marketSortBy'
                        class="w-9/12 border rounded-lg border-yellow py-2 px-4 bg-dark">
                        <option v-bind:value='""'>Order By</option>
                        <option v-if='marketSelectedCurrency !== "All"' value="currentPrice-asc">Price ascending
                        </option>
                        <option v-if='marketSelectedCurrency !== "All"' value="currentPrice-desc">Price descending
                        </option>
                        <option value="tokenId-asc">ID ascending</option>
                        <option value="tokenId-desc">ID descending</option>
                    </select>
                </div>
                <hr class='w-9/12 opacity-75 mx-auto my-6'>
                <div v-for='(attribute, index) in marketAttributes' :key='index' class="w-full mb-2">
                    <div class='mb-1'>
                        {{ attribute.key }}
                    </div>
                    <select v-model='marketSelectedFilters[index]'
                        class="w-9/12 border rounded-lg border-yellow py-2 px-4 bg-dark"
                        v-bind:class='{"text-white": marketSelectedFilters[index] !== ""}'>
                        <option v-bind:value='""'>None</option>
                        <option v-bind:value='item' v-for='(item, itemIndex) in attribute.values' :key='itemIndex + 10'>
                            {{ item }}</option>
                    </select>
                </div>
            </div>
        </div>


        <transition name='filters'>
            <div v-show='bools.responsiveFilters'
                class='h-auto top-0 left-0 xl:hidden absolute h-full md:w-8/12 w-full 2xl:text-base md:text-sm rounded-lg bg-light z-50'
                style='box-shadow: 12px 0px 6px rgba(0,0,0,0.35)'>
                <div class='text-center flex flex-col justify-center items-center mt-4 pb-4 shadow-lg'
                    style='height: 80px;'>
                    <div class='w-full flex items-center mx-auto flex h-full'>
                        <button v-on:click='resetMarketFilters()' type="button"
                            class="w-9/12 mx-2 rounded-lg hover:text-white px-0 py-0 min-h-9">
                            Reset
                        </button>
                        <button v-on:click='initiateMarketSearch()' type="button"
                            class="w-9/12 mr-2 xya-btn h-9 z-0 flex items-center justify-center">
                            Apply
                        </button>
                        <i class="fas w-3/12 fa-times cursor-pointer ml-auto text-xl"
                            v-on:click='bools.responsiveFilters = false'></i>
                    </div>
                </div>
                <div :key='keys.filters' class="text-center overflow-y-auto flex py-4 mx-2 flex-col bg-light"
                    style='height: calc(100% - 120px)'>
                    <div class='w-full mb-2'>
                        <div class='mb-1'>
                            Search by #
                        </div>
                        <div class='flex w-9/12 mx-auto'>
                            <select v-model='marketIdQueryComparator'
                                class="w-9/12 border rounded-lg border-yellow text-sm py-2 px-4 bg-dark">
                                <option value='tokenId'>Equal</option>
                                <option value='tokenId_lte'>Lesser Than</option>
                                <option value='tokenId_gte'>Greater Than</option>
                            </select>
                            <input v-model='marketIdQuery' type='number'
                                class='w-6/12 ml-4 border rounded-lg border-yellow py-2 px-4 bg-dark' />
                        </div>
                    </div>
                    <div class='w-full mb-2'>
                        <div class='w-full mb-2'>
                            <div class='mb-1'>
                                Currency
                            </div>
                            <select v-on:change='initiateMarketSearch()' v-model='marketSelectedCurrency'
                                class="w-9/12 border rounded-lg border-yellow py-2 px-4 bg-dark">
                                <option value='All'>All</option>
                                <option v-for='(currency, index) in acceptedTokens' :key='index'
                                    v-bind:value='currency.value'>
                                    {{currency.key}}</option>
                            </select>
                        </div>
                        <div class='mb-1'>
                            Order
                        </div>
                        <select :key='marketSelectedCurrency' v-on:change='initiateMarketSearch()'
                            v-model='marketSortBy' class="w-9/12 border rounded-lg border-yellow py-2 px-4 bg-dark">
                            <option v-bind:value='""'>Order By</option>
                            <option v-if='marketSelectedCurrency !== "All"' value="currentPrice-asc">Price ascending
                            </option>
                            <option v-if='marketSelectedCurrency !== "All"' value="currentPrice-desc">Price descending
                            </option>
                            <option value="tokenId-asc">ID ascending</option>
                            <option value="tokenId-desc">ID descending</option>
                        </select>
                    </div>
                    <hr class='w-9/12 opacity-75 mx-auto my-6'>
                    <div v-for='(attribute, index) in marketAttributes' :key='index' class="w-full mb-2">
                        <div class='mb-1'>
                            {{ attribute.key }}
                        </div>
                        <select v-model='marketSelectedFilters[index]'
                            class="w-9/12 border rounded-lg border-yellow py-2 px-4 bg-dark"
                            v-bind:class='{"text-white": marketSelectedFilters[index] !== ""}'>
                            <option v-bind:value='""'>None</option>
                            <option v-bind:value='item' v-for='(item, itemIndex) in attribute.values'
                                :key='itemIndex + 10'>
                                {{ item }}</option>
                        </select>
                    </div>
                </div>
            </div>
        </transition>

        <div
            class='xl:w-9/12 w-full h-full min-h-100 flex flex-col overflow-x-hidden sm:overflow-y-hidden overflow-y-scroll'>
            <div
                class='w-full mx-auto flex md:justify-end justify-evenly md:flex-row flex-col p-4 xl:ml-0 md:ml-4 ml-0 select-none text-center shadow-xl'>
                <h2 v-on:click='bools.responsiveFilters = !bools.responsiveFilters'
                    class='2xl:text-xl xl:hidden block opacity-25 z-0 lg:text-lg md:text-base text-xl mt-1 mr-8 hover:opacity-100 cursor-pointer md:mb-0 mb-3 md:w-4/12 w-full xya-btn'>
                    Filter</h2>
                <h2 v-on:click='marketTab = CONSTANTS.SALES_TAB'
                    v-bind:class='{"opacity-25": marketTab !== CONSTANTS.SALES_TAB, "text-white": marketTab === CONSTANTS.SALES_TAB}'
                    class='2xl:text-xl z-0 lg:text-lg md:text-base text-xl mt-1 mr-8 cursor-pointer hover:opacity-100 md:mb-0 mb-3 md:w-3/12 w-full xya-btn'>
                    Sales</h2>
                <h2 v-on:click='marketTab = CONSTANTS.USER_TAB'
                    v-bind:class='{"opacity-25": marketTab !== CONSTANTS.USER_TAB, "text-white": marketTab === CONSTANTS.USER_TAB}'
                    class='2xl:text-xl z-0 lg:text-lg md:text-base text-xl mt-1 mr-8 cursor-pointer hover:opacity-100 md:mb-0 mb-3 md:w-3/12 w-full xya-btn'>
                    My Sales
                    ({{ userSales.length }})</h2>
                <h2 v-on:click='marketTab = CONSTANTS.COLLECTION_TAB'
                    v-bind:class='{"opacity-25": marketTab !== CONSTANTS.COLLECTION_TAB, "text-white": marketTab === CONSTANTS.COLLECTION_TAB}'
                    class='2xl:text-xl z-0 lg:text-lg md:text-base text-xl mt-1 mr-8 cursor-pointer hover:opacity-100 md:mb-0 md:w-3/12 w-full mb-3 xya-btn'>
                    My NFT's
                    ({{ userTokens.length }})</h2>
            </div>

            <div class='h-5/6 2xl:mx-8 xl:mx-6 md:mx-8 py-4 sm:overflow-y-scroll'>
                <!-- SALES -->
                <div :key='keys.marketSales' v-show='marketTab === CONSTANTS.SALES_TAB'
                    class='w-full h-full mx-auto flex xl:justify-start justify-center flex-wrap overflow-x-hidden'>
                    <div class='text-xl md:p-4 p-0 md:w-6/12 w-8/12 opacity-75' v-if='marketTokens.length === 0'>There
                        are
                        no sales.</div>
                    <MarketPlazaItem :isBusy='item.isBusy' class='mt-2 2xl:mx-4 md:mx-2 mb-6 flex flex-col'
                        v-for='(item, index) in marketTokens' :key='index'>
                        <div v-on:click='showMarketCardModal(item)' class='market-item-header relative' slot='header'>
                            <div
                                class='bg-red shadow-lg absolute rounded-r-xl text-white text-base flex items-center justify-center top-3 left-0 w-6/12 h-6'>
                                <span v-if='item.type === CONSTANTS.AUCTION'>
                                    Auction
                                </span>
                                <span v-else>
                                    SALE
                                </span>
                            </div>
                            <div style="bottom: 15px; right: 0px"
                                class="absolute bg-white py-1 px-4 rounded-l-xl text-sm uppercase text-dark"
                                v-if="isFreyMarket && item.tokenId <= 542">
                                <strong>Pre sale Frey</strong>
                            </div>

                            <div v-if='item.type === CONSTANTS.AUCTION && item.order.highestBidder'
                                v-bind:class='{"bg-red": metaMaskAccount.toLowerCase() !== item.order.highestBidder, "bg-green": metaMaskAccount.toLowerCase() === item.order.highestBidder}'
                                class='absolute shadow-lg rounded-r-xl text-white text-base flex items-center justify-center top-12 left-0 w-3/12 h-6'>
                                <span class='text-sm'>
                                    ...{{ item.order.highestBidder.slice(item.order.highestBidder.length - 5) }}
                                </span>
                            </div>
                            <img loading='lazy' v-bind:src='getNftImage(item)' />
                        </div>
                        <div class='px-1 market-item-body' slot='body'>
                            <div class='mt-2 w-full ml-2 mr-2 flex opacity-50'>
                                <div class='w-8/12'> {{market.collectionName}} </div>
                                <div v-if='item.type === CONSTANTS.SALE' class='w-full text-right mr-4'>Price</div>
                                <div v-else class='w-full text-right mr-4'>Highest Bid</div>
                            </div>
                            <div class='ml-2 w-full ml-2 mr-2 flex'>
                                <div class='w-8/12'>#{{ item.tokenId }}</div>
                                <div class='w-full text-right mr-4 text-white text-white'>
                                    {{ (item.currentPrice / (10 ** 18)).toFixed(1) }}
                                    {{getCurrencyName(item.currency.id)}}</div>
                            </div>
                            <div v-if='false' class='w-full mt-2 ml-2 mr-2 flex text-white opacity-50'>
                                <div class='w-8/12 text-right mr-2 my-auto mt-1 text-xs'>Last </div>
                                <div class='w-4/12'>10 XYA</div>
                            </div>
                        </div>
                        <div slot='footer' class='market-item-footer p-2 mt-auto flex justify-evenly'>
                            <button v-on:click='showMarketCardModal(item)' type="button" class="xya-btn mx-2">
                                Details
                            </button>
                            <button v-if='item.type === CONSTANTS.SALE' v-on:click='buyMarketNFT(item)' type="button"
                                class="xya-btn mx-2">
                                <span>Buy</span>
                            </button>
                            <button v-if='item.type === CONSTANTS.AUCTION && !item.ended'
                                v-on:click='showMakeBidModal(item)' type="button" class="xya-btn mx-2">
                                <span>Bid</span>
                            </button>
                        </div>
                    </MarketPlazaItem>
                </div>

                <!-- My Sales -->
                <div :key='keys.userSales' v-show='marketTab === CONSTANTS.USER_TAB'
                    class='w-full h-full mx-auto flex xl:justify-start justify-center flex-wrap'>
                    <div class='text-xl p-4 opacity-75' v-if='userSales.length === 0'>You don't have any sales.</div>
                    <MarketPlazaItem :isBusy='item.isBusy' class='mt-2 2xl:mx-4 md:mx-2 mb-6 flex flex-col'
                        v-for='(item, index) in userSales' :key='index'>
                        <div v-on:click='showCollectionSaleModal(item)' class='market-item-header relative'
                            slot='header'>
                            <div style='background-color: #8E2D2D'
                                class='absolute rounded-r-xl text-white text-base flex items-center justify-center top-3 left-0 w-6/12 h-6'>
                                <span v-if='item.type === CONSTANTS.AUCTION'>
                                    Auction
                                </span>
                                <span v-else>
                                    SALE
                                </span>
                            </div>
                            <div style="bottom: 15px; right: 0px"
                                class="absolute bg-white py-1 px-4 rounded-l-xl text-sm uppercase text-dark"
                                v-if="isFreyMarket && item.tokenId <= 542">
                                <strong>Pre sale Frey</strong>
                            </div>
                            <div v-if='item.type === CONSTANTS.AUCTION && item.order.highestBidder'
                                v-bind:class='{"bg-red": metaMaskAccount.toLowerCase() !== item.order.highestBidder, "bg-green": metaMaskAccount.toLowerCase() === item.order.highestBidder}'
                                class='absolute shadow-lg rounded-r-xl text-white text-base flex items-center justify-center top-12 left-0 w-3/12 h-6'>
                                <span class='text-sm'>
                                    ...{{ item.order.highestBidder.slice(item.order.highestBidder.length - 5) }}
                                </span>
                            </div>
                            <img loading='lazy' v-bind:src='getNftImage(item)' />
                        </div>
                        <div class='px-1 market-item-body' slot='body'>
                            <div class='mt-2 w-full ml-2 mr-2 flex opacity-50'>
                                <div class='w-8/12'> {{market.collectionName}} </div>
                                <div v-if='item.type === CONSTANTS.SALE' class='w-4/12'>Price</div>
                                <div v-else class='w-full text-right mr-4'>Highest Bid</div>
                            </div>
                            <div class='ml-2 w-full ml-2 mr-2 flex'>
                                <div class='w-6/12'>#{{ item.tokenId }}</div>
                                <div class='w-full text-right mr-4 text-white'>
                                    {{ (item.currentPrice / (10 ** 18)).toFixed(1) }}
                                    {{getCurrencyName(item.currency.id)}}</div>
                            </div>
                            <div v-if='false' class='w-full mt-2 ml-2 mr-2 flex text-white opacity-50'>
                                <div class='w-8/12 text-right mr-2 my-auto mt-1 text-xs'>Last </div>
                                <div class='w-4/12'>10 XYA</div>
                            </div>
                        </div>
                        <div slot='footer' class='relative market-item-footer p-2 mt-auto flex justify-evenly'>
                            <button v-on:click='showCollectionSaleModal(item)' class="xya-btn mx-2">
                                Details
                            </button>
                            <button v-on:click='delistNFT(item)' class="xya-btn mx-2">
                                <span v-if='item.type === CONSTANTS.SALE'>Cancel</span>
                                <span v-else>END</span>
                            </button>
                        </div>
                    </MarketPlazaItem>
                </div>

                <!-- USER COLLECTION -->
                <div class='w-full h-full mx-auto flex xl:justify-start justify-center flex-wrap'
                    v-show='marketTab === CONSTANTS.COLLECTION_TAB'>
                    <div class='text-xl p-4 opacity-75' v-if='userTokens.length === 0'>Your collection is empty.</div>
                    <MarketPlazaItem :isBusy='item.isBusy' class='mt-2 2xl:mx-4 xl:m-2 md:mx-4 mb-6 flex flex-col'
                        v-for='(item, index) in userTokens' :key='index'>
                        <div v-on:click='showCollectionCardModal(item)' class='market-item-header relative'
                            slot='header'>
                            <div style="bottom: 15px; right: 0px"
                                class="absolute bg-white py-1 px-4 rounded-l-xl text-sm uppercase text-dark"
                                v-if="isFreyMarket && item.tokenId <= 542">
                                <strong>Pre sale Frey</strong>
                            </div>
                            <img loading='lazy' v-bind:src='getNftImage(item)' />
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
                            <button v-on:click='showCollectionCardModal(item)' type="button" class="xya-btn mx-2">
                                Details
                            </button>
                            <button id='collectionMenuButton' v-bind:data-token-id='item.tokenId'
                                v-on:click='showCollectionDropdown' type="button" class="xya-btn mx-2">
                                <span class='pointer-events-none'>More</span>
                            </button>
                        </div>
                    </MarketPlazaItem>
                </div>
            </div>
        </div>

        <div id='collectionMenu' style='min-width: 128px' v-show='bools.collectionMenu' ref='collectionMenu'
            class='fixed border shadow-xl px-6 py-2 text-center bg-light rounded-lg cursor-pointer'>
            <div v-if='isFreyMarket' v-on:click='showPickCurrencyModal()' class='my-4 hover:text-white'>
                Register
            </div>
            <div v-on:click='showSendNFTModal()' class='my-4 hover:text-white'>
                Send
            </div>
        </div>

        <!--Collection Card Modal-->
        <transition name="market-modal">
            <MarketModal v-if='bools.collectionCard && collectionSelectedNFT'
                v-on:closeModal='bools.collectionCard = false' :item='collectionSelectedNFT'
                :image='getNftImage(collectionSelectedNFT)'>
                <template slot='header-content'>

                    <div class='w-full md:h-3/6 h-2/6'>
                        <div class='w-full flex items-center md:h-8 h-0'>
                            <h2 class='text-xl hidden md:block opacity-75'>{{ market.collectionName }}</h2>

                            <h2 v-if='collectionSelectedNFT' class='md:hidden block text-xl mb-1'>{{ market.tokenName }}
                                #{{ collectionSelectedNFT.tokenId }}</h2>

                            <span v-on:click='showSendNFTModal()' title='Send' data-tooltip-target="tooltip-send"
                                data-tooltip-placement="left" class='cursor-pointer mx-2 ml-auto hover:text-white'><i
                                    class="fas fa-share-square"></i></span>
                            <span v-if='isFreyMarket' v-on:click='showPickCurrencyModal()' title='Register'
                                class='cursor-pointer mx-2 hover:text-white'><i class="fas fa-check"></i></span>
                            <span v-on:click='bools.collectionCard = false'
                                class="fas mx-2 text-xl ml-4 fa-times cursor-pointer text-xl hover:text-white">

                            </span>
                        </div>
                        <div class='w-full flex items-center'>
                            <h2 v-if='collectionSelectedNFT'
                                class='md:text-2xl lg:text-3xl text-xl hidden md:block mb-1'>
                                {{ market.tokenName }}
                                #{{ collectionSelectedNFT.tokenId }}</h2>

                        </div>
                        <h2 v-if='collectionSelectedNFT' class='md:text-lg text-sm md:block hidden mb-1'>
                            {{ collectionSelectedNFT.description }}
                        </h2>
                        <h2 v-if='isFreyMarket' class='md:text-sm text-sm md:mt-2 md:mb-0 md:mt-0 mb-4 mt-4'><span
                                class='text-white opacity-50'>Frey Fees:</span>
                            <strong class='text-white'> {{ collectionSelectedNFTFees }}</strong></h2>
                    </div>
                    <div class='w-full flex flex-row md:flex-row md:my-0 md:mt-0 mt-2 rounded-xl h-3/6'>
                        <button v-on:click='showCreateMarketSaleModal()' type="button"
                            class="w-full md:ml-auto mr-2 mt-auto xya-btn">
                            Sale
                        </button>
                        <button v-on:click='showCreateMarketAuctionModal()' type="button"
                            class="w-full md:ml-0 mt-auto xya-btn">
                            Auction
                        </button>
                    </div>
                </template>
            </MarketModal>
        </transition>

        <transition name="market-modal">
            <!--My Sale Card Modal-->
            <MarketModal v-if='bools.collectionSale && collectionSelectedNFT'
                v-on:closeModal='bools.collectionSale = false' :item='collectionSelectedNFT'
                :image='getNftImage(collectionSelectedNFT)'>
                <template slot='header-content'>

                    <div class='w-full md:h-2/6 h-auto'>
                        <div class='w-full flex items-center md:h-8 h-0'>
                            <h2 class='text-xl block md:block opacity-75'>{{ market.collectionName }}</h2>

                            <i v-on:click='bools.collectionSale = false'
                                class="fas ml-auto fa-times cursor-pointer text-xl"></i>
                        </div>
                        <div class='w-full flex items-center'>
                            <h2 v-if='collectionSelectedNFT' class='md:text-4xl text-xl block mt-5 md:mt-2 mb-1'>
                                {{ market.tokenName }}
                                #{{ collectionSelectedNFT.tokenId }}</h2>

                        </div>
                        <h2 class='text-base text-white opacity-50 mt-1 md:my-1'>Owned by: You</h2>
                    </div>
                    <div class='w-full flex md:flex-nowrap flex-wrap md:flex-col flex-row rounded-xl md:h-4/6'>
                        <h2 v-if='collectionSelectedNFT' class='text-xl mb-1'>{{ collectionSelectedNFT.description }}
                        </h2>
                        <h2 class='text-xl mt-auto hidden md:block'>Manage item</h2>
                        <h2 v-if='collectionSelectedNFT.type === CONSTANTS.SALE' class='text-base mt-3 opacity-75'>Price
                        </h2>
                        <h2 v-else-if='collectionSelectedNFT.order.highestBidder || collectionSelectedNFT.order.ended'
                            class='text-base mt-3 opacity-75'>
                            Highest Bidder: <span
                                class='text-sm text-white opacity-75'>{{ getAccountStamp(collectionSelectedNFT.order.highestBidder)}}</span>
                        </h2>
                        <h2 class='text-base mt-2 opacity-75' v-else>Initial Bid</h2>

                        <div class='flex flex-row md:flex-row w-full md:items-center mt-0 md:mt-0 items-center'>
                            <h2 class='text-xl text-white'>
                                {{ collectionSelectedNFT.currentPrice / (10 ** 18) }}
                                {{ getCurrencyName(collectionSelectedNFT.currency.id) }}</h2>
                            <button v-if='collectionSelectedNFT.type === CONSTANTS.SALE'
                                v-on:click='delistNFT(collectionSelectedNFT)' type="button"
                                class="xya-btn md:ml-auto ml-auto h-12 w-6/12 md:w-4/12 mt-2 md:mt-0">
                                Cancel
                            </button>
                        </div>
                        <h2 v-if='collectionSelectedNFT.type === CONSTANTS.AUCTION' class='text-base mt-2 opacity-75'>
                            Ends
                            In:
                        </h2>
                        <div v-if='collectionSelectedNFT.type === CONSTANTS.AUCTION && !collectionSelectedNFT.order.ended'
                            class='mt-2 flex flex-row items-center w-full'>
                            <h2 class='text-xl text-white'>
                                {{ getAuctionEndDate(collectionSelectedNFT) }}
                            </h2>
                        </div>
                        <div v-else-if='collectionSelectedNFT.type === CONSTANTS.AUCTION'
                            class='flex flex-row md:flex-row w-full mt-2 md:mt-0'>
                            <h2 class='text-lg md:text-xl mt-2 text-white'>
                                Auction Ended
                            </h2>
                            <button v-on:click='delistNFT(collectionSelectedNFT)' type="button"
                                class="xya-btn md:ml-auto ml-auto h-12 w-4/12 md:w-4/12 mt-2 md:mt-0">
                                End
                            </button>
                        </div>
                    </div>
                </template>
            </MarketModal>
        </transition>


        <transition name="market-modal">
            <!--Market Card Modal-->
            <MarketModal v-if='bools.marketCard && marketSelectedNFT' v-on:closeModal='bools.marketCard = false'
                :item='marketSelectedNFT' :image='getNftImage(marketSelectedNFT)'>
                <template slot='header-content'>
                    <div class='w-full h-2/6'>
                        <div class='w-full flex h-8'>
                            <h2 class='text-xl opacity-75'>{{ market.collectionName }}</h2>
                            <i v-on:click='bools.marketCard = false'
                                class="fas ml-auto fa-times cursor-pointer text-xl"></i>
                        </div>
                        <h2 v-if='marketSelectedNFT' class='text-4xl mb-1'>{{ market.tokenName }}
                            #{{ marketSelectedNFT.tokenId }}</h2>
                        <h2 class='text-base text-white opacity-50 md:mb-1 mb-2'>Owned by:
                            {{ getAccountStamp(marketSelectedNFT.order.seller.id) }}
                        </h2>

                    </div>
                    <div class='w-full h-4/6 flex flex-col rounded-xl mt-auto'>
                        <h2 v-if='marketSelectedNFT' class='text-xl mb-1'>{{ marketSelectedNFT.description }}</h2>
                        <h2 class='mt-auto text-xl'>Manage item</h2>
                        <h2 v-if='marketSelectedNFT.type === CONSTANTS.SALE' class='text-base mt-2 opacity-75'>Price
                        </h2>
                        <h2 v-else-if='marketSelectedNFT.order.highestBidder' class='text-base mt-2 opacity-75'>
                            Highest Bidder: </h2>
                        <h2 class='text-base mt-2 opacity-75' v-else>Initial
                            Bid</h2>

                        <div class='flex w-full items-center'>
                            <h2 class='text-xl text-white'>
                                {{ marketSelectedNFT.currentPrice / (10 ** 18) }}
                                {{ getCurrencyName(marketSelectedNFT.currency.id) }}</h2>
                            <h2 v-if='marketSelectedNFT.order.highestBidder'
                                class='text-white opacity-50 text-sm mx-3 hidden lg:block'>
                                {{getAccountStamp(marketSelectedNFT.order.highestBidder)}}
                            </h2>
                            <h2 v-if='marketSelectedNFT.order.highestBidder'
                                class='text-white opacity-50 text-sm mx-3 block lg:hidden'>
                                {{getAccountStamp(marketSelectedNFT.order.highestBidder)}}
                            </h2>
                            <button v-if='marketSelectedNFT.type === CONSTANTS.SALE'
                                v-on:click='buyMarketNFT(marketSelectedNFT)' type="button"
                                class="xya-btn ml-auto w-4/12 mx-2">
                                <span>Buy</span>
                            </button>
                            <button v-if='marketSelectedNFT.type === CONSTANTS.AUCTION'
                                v-on:click='showMakeBidModal(marketSelectedNFT)' type="button"
                                class="xya-btn ml-auto w-4/12 mx-2">
                                <span>Bid</span>
                            </button>
                        </div>

                        <h2 v-if='marketSelectedNFT.type === CONSTANTS.AUCTION' class='text-base mt-2 opacity-75'>Ends
                            In:
                        </h2>

                        <div v-if='marketSelectedNFT.type === CONSTANTS.AUCTION && !marketSelectedNFT.order.ended'
                            class='mt-auto flex flex-row items-center w-full'>
                            <h2 class='text-xl text-white'>
                                {{ getAuctionEndDate(marketSelectedNFT) }}
                            </h2>
                        </div>
                        <div v-else-if='marketSelectedNFT.type === CONSTANTS.AUCTION'
                            class='mt-4 flex flex-row items-center w-full'>
                            <h2 class='text-xl text-white'>
                                Auction Ended
                            </h2>
                        </div>
                    </div>
                </template>
            </MarketModal>
        </transition>

        <!--Create Sale Modal-->
        <window v-if='bools.collectionCard && collectionSelectedNFT' name="create-listing" width='80%' height='auto'>
            <div class="flex flex-wrap flex-col p-6 bg-dark h-full">
                <div class='w-full flex'>
                    <div class="w-4/5">
                        <div v-if='collectionSaleType === CONSTANTS.SALE' class="text-2xl">List
                            #{{collectionSelectedNFT.tokenId}} for sale</div>
                        <div v-else class="md:text-2xl text-lg">Create auction for #{{collectionSelectedNFT.tokenId}}
                        </div>
                    </div>
                    <div class="w-1/5 text-right">
                        <i @click="$modal.hide('create-listing')" class="fas fa-times cursor-pointer text-xl"></i>
                    </div>
                </div>
                <div class='mt-3'>
                    <p class='mt-1 md:text-xl text-base'>Price
                    </p>
                </div>
                <div class="mt-2 mb-4 flex w-full">
                    <input class='w-full rounded-lg text-black px-2 h-9 shadow-xl border border-primary-alt'
                        type="number" v-model='collectionSaleAmount' />

                    <select v-model='collectionSaleToken'
                        class="w-6/12 border rounded-lg rounded-base border-yellow ml-4 px-4 bg-dark">
                        <option v-for='(token, index) in acceptedTokens' v-bind:value="token.value" :key='index'>
                            {{ token.key }}</option>
                    </select>
                </div>
                <div v-if='collectionSaleType === CONSTANTS.AUCTION' class='mt-1'>
                    <p class='mt-1 md:text-xl text-base'>Duration
                    </p>
                </div>
                <div v-if='collectionSaleType === CONSTANTS.AUCTION' class="mt-1 mb-4 flex h-12 w-full px-0 py-1">
                    <select v-model='collectionSaleDuration'
                        class="w-full border rounded-lg border-yellow mr-2 py-2 px-2 bg-dark text-sm md:text-base">
                        <option :disabled='index < 5 && collectionSaleDurationType === "minute"'
                            v-for='index in collectionDurationIntervalLimit' :key='index' v-bind:value='index'>{{index}}
                            {{collectionSaleDurationType}}<span v-if='index > 1'>s</span>
                        </option>
                    </select>
                    <select v-on:change='getIntervalLimit(collectionSaleDurationType)'
                        v-model='collectionSaleDurationType'
                        class="w-6/12 border rounded-lg border-yellow ml-2 py-2 px-2 bg-dark text-xs md:text-base">
                        <option value='minute'> Minute </option>
                        <option value='hour'> Hour </option>
                        <option value='day'> Day </option>

                    </select>
                </div>

                <div class='w-full flex justify-space h-12 p-1 mt-4 text-base'>
                    <div class='w-6/12'></div>
                    <button v-on:click="$modal.hide('create-listing')"
                        class="w-4/12 mx-6 mt-auto rounded-lg hover:border hover:border-primary-alt bg-transparent hover:text-white md:text-xl text-base">
                        Cancel
                    </button>
                    <button v-on:click="listNFT(collectionSelectedNFT, collectionSaleType)"
                        class="w-6/12 mt-auto xya-btn md:text-xl text-base">
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
                    <p v-if='collectionSelectedNFT' class='mt-1'>Register #{{collectionSelectedNFT.tokenId}} for:
                    </p>
                </div>
                <div class="mt-4 flex md:flex-row flex-row w-full items-start justify-start">
                    <select v-model='collectionSaleToken' class="w-9/12 border rounded-lg border-yellow px-4 bg-dark">
                        <option v-for='(token, index) in acceptedTokens' v-bind:value="token.value" :key='index'>
                            {{ token.key }}</option>
                    </select>
                    <div class="text-right md:text-center md:w-9/12 w-5/12 mx-2 md:mx-0">
                        <button v-on:click="registerFreyNFT(collectionSelectedNFT)" type="button"
                            class="w-full md:w-10/12 md:text-base text-sm rounded-xl border border-primary-alt bg-transparent hover:bg-primary-alt hover:text-white px-2 mx-2 py-0">
                            <span>Confirm</span>
                        </button>
                    </div>
                </div>
            </div>
        </window>

        <window class='w-10/12' height="auto" width="80%" name="send-NFT">
            <div class="flex flex-wrap p-6 bg-dark h-full">
                <div class="w-4/5">
                    <div class="text-2xl">Send NFT</div>
                </div>
                <div class="w-1/5 text-right">
                    <i @click="$modal.hide('send-NFT')" class="fas fa-times cursor-pointer text-xl"></i>
                </div>
                <div class='mt-4 md:text-base text-sm opacity-75'>
                    <p v-if='collectionSelectedNFT' class='mt-1'>Send #{{collectionSelectedNFT.tokenId}} to: </p>
                </div>
                <div class="mt-4 flex md:flex-row flex-row w-full items-start justify-start">
                    <input class='w-full text-black px-2' type="text" v-model='NFTTransactionTo' />
                    <div class="text-right md:text-center md:w-9/12 w-5/12 mx-2 md:mx-0">
                        <button v-on:click="sendNFT(collectionSelectedNFT)" type="button"
                            class="w-full md:w-10/12 md:text-base text-sm rounded-none border border-primary-alt bg-transparent hover:bg-primary-alt hover:text-white px-2 mx-2 py-0">
                            <span>Confirm</span>
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
                <div class='mt-2 md:text-base text-sm opacity-75'>
                    <p v-if='marketSelectedNFT' class='mt-1'>Bid for #{{marketSelectedNFT.tokenId}} : </p>
                </div>
                <div class="mt-4 flex md:flex-row flex-row w-full items-start justify-start">
                    <input class='w-full text-black px-2 h-9 rounded-xl' type="text" v-model='marketBidAmount' />
                    <div class="text-right md:text-center md:w-9/12 w-5/12 mx-2 md:mx-0">
                        <button v-on:click="bidMarketNFT(marketSelectedNFT, marketBidAmount)" type="button"
                            class="xya-btn mx-2 h-9 flex items-center justify-center">
                            <span>Confirm</span>
                        </button>
                    </div>
                </div>
            </div>
        </window>

        <window height='auto' width='80%' name='allowances'>
            <div :key='keys.marketAllowances' class="flex flex-wrap p-6 bg-dark h-full">
                <div class="w-4/5">
                    <div class="text-2xl">Control Panel</div>
                </div>
                <div class="w-1/5 text-right">
                    <i @click="$modal.hide('allowances')" class="fas fa-times cursor-pointer text-xl"></i>
                </div>
                <div class="mt-4 flex flex-col w-full items-start justify-start">
                    <div class='flex w-full flex-col md:flex-row my-2 items-center'>
                        <p class='text-lg md:text-xl md:w-6/12 w-full mb-2 md:mb-0'>Market Contract</p>
                        <div class="w-6/12 text-right md:text-center">
                            <button v-on:click="setMarketApproval(!marketApproved ? 999999999 : 0)" type="button"
                                class="w-full xya-btn">
                                <span v-if='!marketApproved'>Enable</span>
                                <span v-else>Disable</span>
                            </button>
                        </div>
                    </div>
                    <hr class='w-9/12 mx-auto my-4 opacity-75' />
                    <div class="w-4/5">
                        <h2 class="text-lg md:text-xl my-2">Market Tokens</h2>
                    </div>
                    <div class='flex w-full items-center flex-row my-2' v-for='(token, index) in acceptedTokens'
                        :key='index'>
                        <p class='w-6/12'>{{token.key}}</p>
                        <div v-if='index > 0' class="w-6/12 text-right md:text-center mx-2">
                            <button v-on:click="setTokenAllowance(token, !token.approved ? 999999999 : 0)" type="button"
                                class="w-full ml-auto xya-btn">
                                <span v-if='!token.approved'>Enable</span>
                                <span v-else>Disable</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </window>

        <window height='auto' width='80%' name='market-tutorial'>
            <div id='tutorial' class="flex flex-wrap p-6 bg-dark h-full">
                <div class="w-4/5">
                    <div class="text-2xl">Tutorial</div>
                </div>
                <div class="w-1/5 text-right">
                    <i @click="$modal.hide('market-tutorial')" class="fas fa-times cursor-pointer text-xl"></i>
                </div>
                <div class="mt-4 flex flex-col w-full" style='min-height: 220px'>
                    <template v-if="tutorial.page === 0">
                        <p class="text-xl mb-2">Sell Orders</p>
                        <p class='txt-tutorial md:text-base text-sm'>
                            Pick any NFT from your collection, set its price and list it on the market.
                        </p>
                        <br>
                        <p class='txt-tutorial md:text-base text-sm'>Once somebody purchases your NFT, you will receive
                            the tokens after a small fee is deducted
                            from its sale price.</p>
                        <br>
                        <p>
                            Sell orders can be cancelled at any time.
                        </p>
                    </template>

                    <template v-if="tutorial.page === 1">
                        <p class="text-xl mb-2">Auctions</p>
                        <p class='txt-tutorial md:text-base text-sm mb-2'>
                            Pick any NFT from your collection, set its price and list it on the market for any duration
                            between 5 minutes to 7 days.
                        </p>
                        <p>
                            While the auction is ongoing, you cannot retract the NFT.
                        </p>
                        <br>
                        <p class='txt-tutorial'>
                            Once the auction expires, you need to end it manually in order to receive your tokens.
                        </p>
                        <p class='mt-2'>The NFT will be transferred to the highest bidder after the owner ends the
                            auction.</p>
                        <br>
                    </template>

                    <template v-if="tutorial.page === 2">
                        <p class="text-xl mb-2">Frey Reflection Fee</p>
                        <p class='txt-tutorial md:text-base text-sm'>In order to be eligible for reflection fees, you
                            need to register each Frey in your collection to a specific token.
                        </p>
                        <br>
                        <p class='txt-tutorial md:text-base text-sm'>Once registered, your Frey will earn rewards for
                            each market transaction made with the token
                            selected.</p>
                        <br>
                    </template>

                    <template v-if="tutorial.page === 3">
                        <p class="text-xl mb-2">User Profile</p>
                        <p class='txt-tutorial md:text-base text-sm'>
                            To prevent abuse, tokens and NFTs will not be transferred directly into your wallet.
                        </p>
                        <br>
                        <p class='txt-tutorial md:text-base text-sm'>
                            Instead, they are stored inside the contract and you can withdraw them at any time
                            by opening the User Panel window. <span><i
                                    class="ml-4 fas fa-user text-xl hover:text-white"></i></span>
                        </p>
                        <br>
                    </template>
                </div>
                <div class='w-full flex justify-center cursor-pointer select-none mt-5'>
                    <span><a v-bind:class='{"opacity-50": tutorial.page - 1 < 0}'
                            v-on:click='tutorial.page = Math.max(0, tutorial.page - 1)' class="mr-5">Previous</a>
                        <a v-bind:class='{"opacity-50": tutorial.page + 1 > tutorial.pages}'
                            v-on:click='tutorial.page = Math.min(tutorial.pages, tutorial.page + 1)'>Next</a></span>
                </div>
            </div>
        </window>

        <window height='auto' width='80%' name='user-profile'>
            <div :key='keys.feeBalance' class="flex flex-wrap p-6 md:text-base text-xs bg-dark h-full">
                <div class="w-4/5">
                    <div class="text-2xl">User Profile</div>
                </div>
                <div class="w-1/5 text-right">
                    <i @click="$modal.hide('user-profile')" class="fas fa-times cursor-pointer text-xl"></i>
                </div>
                <div class="mt-4 flex flex-col w-full items-start justify-start">
                    <div class="w-4/5">
                        <h2 class="md:text-xl text-base my-2 opacity-75">Market Sales</h2>
                    </div>
                    <div class='flex w-full flex-row items-center my-2' v-for='(token, index) in acceptedTokens'
                        :key='index'>
                        <p class='w-4/12 md:mr-0 mr-2'>{{token.key}}</p>
                        <p class='w-4/12 text-white'>{{token.balance}}</p>
                        <button v-on:click="withdraw(token)" type="button" class="w-4/12 ml-auto xya-btn">
                            Collect
                        </button>
                    </div>
                </div>

                <div v-if='isFreyMarket' class="mt-4 flex flex-col w-full items-start justify-start">
                    <div class="w-4/5">
                        <h2 class="md:text-xl text-base my-2 opacity-75">Frey Reflection Fee</h2>
                    </div>
                    <div class='flex w-full items-center flex-row my-2' v-for='(token, index) in acceptedTokens'
                        :key='index'>
                        <p class='w-4/12 md:mr-0 mr-2'>{{token.key}}</p>
                        <p class='w-4/12 text-white'>{{token.NFTBalance}}</p>
                        <button v-if='index === acceptedTokens.length - 1' v-on:click="withdrawFreyFees(token)"
                            type="button" class="w-4/12 ml-auto xya-btn">
                            Collect
                        </button>
                    </div>
                </div>

                <div class="w-4/5 mt-4">
                    <h2 class="md:text-xl text-base opacity-75">Claim NFT's</h2>
                </div>
                <div class="mt-4 w-full flex flex-wrap">
                    <h2 v-if='marketPendingTokens.length === 0'>You have no NFT's to claim.</h2>
                    <div class='flex cursor-pointer justify-evenly mx-4 ' v-for='(token, index) in marketPendingTokens'
                        :key='index'>
                        <div class='flex flex-col text-center'>
                            <img loading='lazy' v-on:click='withdrawNFT(token.tokenId)' class='rounded-xl' width='64px'
                                height="64px" v-bind:src='getNftImage(token)' />
                            <h2>#{{token.tokenId}}</h2>
                        </div>
                    </div>
                </div>
            </div>
        </window>
    </div>
</template>

<script>
    import MarketPlazaItem from './MarketPlazaItem';
    import MarketModal from './MarketModal';
    import HRC721 from '../../plugins/artifacts/HRC721.json';
    import HRC20 from '../../plugins/artifacts/freyala.json';
    import FreyRegistry from '../../plugins/artifacts/freyRegistry.json';
    import fromExponential from "from-exponential";

    import {
        mapGetters
    } from "vuex";
    import {
        ethers
    } from "ethers";

    import * as MarketRepository from "../../plugins/graphql/marketplace/filter";
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
                isFreyMarket: false,
                freyRegistryContract: undefined,

                marketTab: 3,
                marketPage: 0,
                marketPerPage: 100,
                marketSortBy: "",
                marketSelectedCurrency: "All",
                marketIdQuery: 0,
                marketIdQueryComparator: "tokenId",
                marketAttributes: [],
                marketSelectedFilters: [],
                marketSales: [],
                marketAuctions: [],
                marketTokens: [],
                marketBidAmount: 0,
                marketPendingTokens: [],

                initialUserTokens: [],
                userTokens: [],
                userSales: [],
                marketSelectedNFT: undefined,
                collectionSaleToken: undefined,
                collectionSaleDuration: 5,
                collectionDurationIntervalLimit: 60,
                collectionSaleDurationType: 'minute',
                collectionSelectedNFT: undefined,
                collectionSelectedNFTFees: "",
                collectionOperations: [],
                collectionSaleAmount: 0,
                collectionSaleDate: 0,
                collectionSaleType: 0,

                keys: {
                    filters: 0,
                    NFTCollection: 100,
                    marketSales: 1000,
                    userSales: 10000,
                    feeBalance: 0,
                    marketAllowances: 0,
                    application: 0
                },

                NFTTransactionTo: "",
                loaders: {
                    application: true
                },

                bools: {
                    responsiveFilters: false,
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

                tokens: [{
                    key: "ONE",
                    value: "0x0000000000000000000000000000000000000000",
                    approved: true,
                    balance: 0,
                    isBusy: false,
                }],

                acceptedTokens: [],

                CONSTANTS: {
                    SALE: 0,
                    AUCTION: 1,

                    COLLECTION_TAB: 0,
                    USER_TAB: 1,
                    AUCTIONS_TAB: 2,
                    SALES_TAB: 3,

                    GRAPH_API: "https://marketplace-api.freyala.com/graphql/",
                    ONE_TOKEN: "0x0000000000000000000000000000000000000000"
                },

                tutorial: {
                    page: 0,
                    pages: 3
                }
            };
        },

        async mounted() {
            await this.initializeMarketPlaza();
            if (this.isFreyMarket) {
                const showTutorial = await localStorage.getItem('market-tutorial');
                if (!showTutorial) {
                    await localStorage.setItem('market-tutorial', "true");
                    this.showTutorial();
                }
            }
        },

        watch: {
            'metaMaskAccount': async function (oldVal, newVal) {
                if (newVal !== this.metamaskAccount) {
                    await this.initializeMarketPlaza();
                }
            }
        },

        methods: {
            goBack() {
                this.$emit('goBack');
            },

            async initializeMarketPlaza() {
                this.marketNFTContract = new ethers.Contract(this.market.token, HRC721.abi, this.metaMaskWallet
                    .signer);
                this.freyRegistryContract = new ethers.Contract(FreyRegistry.address, FreyRegistry.abi, this
                    .metaMaskWallet.signer);
                this.isFreyMarket = this.market.tokenName === "The Frey";

                this.$nextTick(async () => {
                    this.loaders.application = true;
                    this.initialUserTokens = [];
                    this.userTokens = [];
                    this.marketTokens = [];
                    this.acceptedTokens = [];
                    this.userSales = [];

                    await this.fetchMarketTokens();

                    this.marketApproved = await this.marketNFTContract.isApprovedForAll(this
                        .metaMaskAccount,
                        this.contract.address);

                    for (let i = 0; i < this.tokens.length; i++) {
                        const acceptsCurrency = await this.contract.acceptsCurrency(this.tokens[i]
                            .value);
                        if (!acceptsCurrency) continue;

                        this.acceptedTokens.push(this.tokens[i]);
                    }

                    this.collectionSaleToken = this.acceptedTokens[0].value;

                    await this.verifyTokens();
                    await this.fetchMarketAttributes();
                    await this.initiateMarketSearch();
                    await this.fetchUserNFTs();
                    await this.fetchPendingNFTs();

                    if (this.isFreyMarket) {
                        await this.getFreyFees();
                    }
                });
            },

            showTutorial() {
                this.tutorial.page = 0;
                this.$modal.show('market-tutorial');
            },

            async showCollectionCardModal(item) {
                try {
                    this.loaders.application = true;
                    if (this.isFreyMarket) {
                        const isRegistered = await this.freyRegistryContract.isRegistered(item.tokenId);
                        this.collectionSelectedNFTFees = "";
                        if (isRegistered) {
                            const fees = await this.freyRegistryContract.getFreyFees(item.tokenId);
                            const currency = fees[0].toLowerCase();
                            const acceptedCurrency = this.acceptedTokens.filter(c => c.value.toLowerCase() ===
                                currency)[0];
                            this.collectionSelectedNFTFees = (fees[1] / (10 ** 18)).toFixed(2) + " " + (
                                acceptedCurrency ? acceptedCurrency.key : "");
                        } else {
                            this.collectionSelectedNFTFees = "Not Registered";
                        }
                    }
                } catch (err) {
                    this.collectionSelectedNFTFees = "Not Registered";
                    this.loaders.application = false;
                }

                this.collectionSelectedNFT = item;
                this.bools.collectionCard = true;
                this.loaders.application = false;
            },

            async showUserProfileModal() {
                try {
                    this.loaders.application = true;
                    await this.verifyTokens();
                    await this.fetchPendingNFTs();
                    if (this.isFreyMarket) {
                        await this.getFreyFees();
                    }
                    this.loaders.application = false;
                    this.$modal.show("user-profile")
                } catch (err) {
                    this.loaders.application = false;
                }
            },

            showMarketAllowances() {
                this.$modal.show("allowances");
            },

            showCollectionSaleModal(item) {
                this.collectionSelectedNFT = item;
                this.bools.collectionSale = true;
            },

            async showMarketCardModal(item) {
                try {
                    if (item.type === this.CONSTANTS.AUCTION) {
                        const contractAuction = await this.contract.getAuction(this.market.token, item.tokenId);
                        if (!contractAuction) {
                            throw "Auction expired or doesn't exist";
                        }
                    } else {
                        const contractSellOrder = await this.contract.getSellOrder(this.market.token, item.tokenId);
                        if (!contractSellOrder) {
                            throw "Sell order expired or doesn't exist";
                        }
                    }

                    this.marketSelectedNFT = item;
                    this.bools.marketCard = true;
                } catch (err) {
                    this.marketTokens = this.marketTokens.filter(c => c.tokenId !== item.tokenId);
                    this.triggerListReactivity(this.marketTokens);
                    this.handleError(err);
                }
            },

            showMakeBidModal(item) {
                this.marketSelectedNFT = item;
                this.marketBidAmount = 0;
                this.$modal.show('make-bid');
            },

            showCreateMarketSaleModal() {
                this.collectionSaleAmount = 0;
                this.collectionSaleToken = this.acceptedTokens[0].value;
                this.collectionSaleDate = 0;
                this.collectionSaleDuration = 5;
                this.collectionSaleType = this.CONSTANTS.SALE;
                this.$modal.show("create-listing");
            },

            showCreateMarketAuctionModal() {
                this.collectionSaleAmount = 0;
                this.collectionSaleToken = this.acceptedTokens[0].value;
                this.collectionSaleDate = 0;
                this.collectionSaleDuration = 5;
                this.collectionSaleType = this.CONSTANTS.AUCTION;
                this.$modal.show("create-listing");
            },

            showSendNFTModal() {
                this.$modal.show('send-NFT');
            },

            showPickCurrencyModal() {
                this.$modal.show('pick-currency');
            },

            hideSendNFTModal() {
                this.NFTTransactionTo = "";
                this.collectionSelectedNFT = undefined;
                this.$modal.hide('send-NFT');
                this.keys.NFTCollection++;
            },

            async fetchUserNFTs() {
                try {
                    const NFTs = await this.marketNFTContract.tokensOfOwner(this.metaMaskAccount);

                    let ids = await NFTs.map(async (frey) => {
                        return frey._isBigNumber ? ethers.BigNumber.from(frey._hex).toString() : frey
                            ._hex
                    });

                    await Promise.all(ids)
                        .then(async (listOfIds) => {
                            const userNFTs = await this.$http.get(
                                `${this.market.metadata}${listOfIds}`);

                            userNFTs.data.forEach(c => {
                                if (c.id !== undefined) {
                                    c.tokenId = c.id;
                                }

                                if (this.market.tokenName === "CryptoPig") {
                                    c.description = c.rarity;
                                }
                            })

                            this.userTokens = userNFTs.data;
                            this.userTokens.forEach(c => c.isBusy = false);
                            this.initialUserTokens = userNFTs.data;
                        });
                    this.keys.NFTCollection++;
                } catch (err) {}
            },

            async fetchMarketTokens() {
                try {
                    const result = await this.$http.post(this.CONSTANTS.GRAPH_API, {
                        query: MarketRepository.FetchMarketTokens()
                    });

                    this.tokens = this.tokens.filter(c => c.key === "ONE");

                    const tokens = result.data.data.currencies;

                    for (let i = 0; i < tokens.length; i++) {
                        if (tokens[i].id === this.CONSTANTS.ONE_TOKEN) continue;
                        const tokenContract = await new ethers.Contract(tokens[i].id, HRC20.abi, this
                            .metaMaskWallet.signer);
                        const tokenName = await tokenContract.symbol();

                        this.tokens.push({
                            key: tokenName,
                            value: tokens[i].id,
                            approved: false,
                            balance: 0,
                            isBusy: false
                        });
                    }
                } catch (err) {}
            },

            async fetchMarketSales() {
                try {
                    const filters = {
                        attributeFilter: this.generateMarketFilterQuery(),
                        currency: this.getCurrencyQuery(),
                        tokenId: this.getTokenIdQuery(),
                        tokenIdComparator: this.marketIdQueryComparator
                    };

                    const pagination = this.getPaginationInfo();
                    const orderInfo = this.getOrderQuery();

                    const result = await this.$http.post(this.CONSTANTS.GRAPH_API, {
                        query: MarketRepository.FetchMarketNFTs(this.market.token, filters, pagination,
                            orderInfo)
                    });

                    const timeStampNow = Date.now();

                    const marketSales = result.data.data.sales;
                    marketSales.forEach(c => c.type = this.CONSTANTS.SALE);
                    const marketAuctions = result.data.data.auctions;
                    marketAuctions.forEach(c => {
                        c.type = this.CONSTANTS.AUCTION;
                        c.order.ended = c.order.endsAt * 1000 - timeStampNow < 0
                    });

                    this.marketTokens = [...marketSales, ...marketAuctions];
                    this.marketTokens.forEach(c => {
                        c.isBusy = false
                    });
                    this.sortCollectionByField(this.marketTokens, this.marketSortBy);
                } catch (err) {

                }
            },

            async fetchPendingNFTs() {
                try {
                    const result = await this.$http.post(this.CONSTANTS.GRAPH_API, {
                        query: MarketRepository.FetchPendingNFTs(this.market.token, this.metaMaskAccount
                            .toLowerCase())
                    });
                    this.marketPendingTokens = result.data.data.nfts;
                } catch (err) {

                }
            },

            async fetchMarketAttributes() {
                try {
                    const result = await this.$http.post(this.CONSTANTS.GRAPH_API, {
                        query: AttributeQuery.FetchMarketAttributes(this.market.token)
                    });

                    this.marketAttributes = result.data.data.markets[0].attributes;

                    for (let i = 0; i < this.marketAttributes.length; i++) {
                        this.marketSelectedFilters.push("");
                    }
                } catch (err) {

                }
            },

            async initiateMarketSearch() {
                let userSales = this.userSales;
                try {
                    this.userSales = [];
                    this.loaders.application = true;

                    await this.fetchMarketSales();
                    await this.applyCollectionFilters();
                    const metamaskAccount = this.metaMaskAccount.toLowerCase();

                    const userSales = this.marketTokens.filter(c => c.order.seller.id === metamaskAccount && c
                        .type === this.CONSTANTS.SALE);
                    const userAuctions = this.marketTokens.filter(c => c.order.seller.id === metamaskAccount && c
                        .type === this.CONSTANTS.AUCTION);
                    this.marketTokens = this.marketTokens.filter(c => c.order.seller.id !== metamaskAccount && !(c
                        .type === this.CONSTANTS.AUCTION && c.order.ended));

                    this.loaders.application = false;
                    this.userSales = [...userSales, ...userAuctions];
                } catch (err) {
                    this.loaders.application = false;
                    this.userSales = userSales;
                }
            },

            async verifyTokens() {
                try {
                    for (let i = 0; i < this.acceptedTokens.length; i++) {
                        const balance = await this.contract.getBalance(this.metaMaskAccount, this
                            .acceptedTokens[i].value) / (10 ** 18);
                        this.acceptedTokens[i].balance = balance > 0 ? balance.toFixed(2) : 0;
                        this.acceptedTokens[i].NFTBalance = 0;

                        if (this.acceptedTokens[i].value === this.CONSTANTS.ONE_TOKEN) continue;

                        let tempContract = new ethers.Contract(this.acceptedTokens[i].value, HRC20.abi, this
                            .metaMaskWallet.signer);
                        const allowance = await tempContract.allowance(this.metaMaskAccount, this.contract.address);
                        const etherAllowance = ethers.utils.formatEther(
                            allowance._isBigNumber ?
                            ethers.BigNumber.from(allowance).toString() :
                            allowance
                        );

                        this.acceptedTokens[i].approved = etherAllowance > 0;
                        this.acceptedTokens[i].isBusy = false;
                    }
                } catch (err) {

                }
            },

            async getRegisteredFreysIds() {
                const freyIds = [];

                this.userTokens.forEach(c => freyIds.push(c.tokenId));

                const registeredFreys = await this.freyRegistryContract.getFreys(freyIds);
                const registeredFreyIds = [];

                registeredFreys.forEach((c, index) => {
                    if (c.isRegistered === true) {
                        registeredFreyIds.push(freyIds[index]);
                    }
                });

                return registeredFreyIds;
            },

            async getFreyFees() {
                const freyIds = await this.getRegisteredFreysIds();

                try {

                    const freyFees = await this.freyRegistryContract.getFreysFees(freyIds);

                    freyFees.forEach(freyFee => {
                        const currency = freyFee[0].toLowerCase();
                        const fee = 1 * fromExponential(freyFee[1] / (10 ** 18));

                        let acceptedCurrency = this.acceptedTokens.filter(c => c.value === currency)[0];

                        if (!acceptedCurrency) return;
                        acceptedCurrency.NFTBalance += fee;
                    });
                    this.acceptedTokens.forEach(c => c.NFTBalance = c.NFTBalance.toFixed(2));

                    this.keys.feeBalance++;
                } catch (err) {

                }
            },

            async setTokenAllowance(token, amount) {
                if (token.isBusy) return;

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
                    token.isBusy = true;
                    this.keys.marketAllowances++;

                    await tx.wait(1);

                    token.isBusy = false;
                    token.approved = amount > 0 ? true : false;
                    this.$toast.success(`${token.key} ${amount > 0 ? 'approved' : 'disabled'}`);
                } catch (err) {
                    this.handleError(err, token.approved ? 'Disabling token failed.' : 'Approving token failed.');
                }
                token.isBusy = false;
                this.keys.marketAllowances++;
            },

            async sendNFT(item) {
                if (item.isBusy) return;

                const address = this.NFTTransactionTo;
                const id = item.tokenId;

                try {
                    const tx = await this.marketNFTContract.transferFrom(this.metaMaskAccount, address, id);

                    item.isBusy = true;
                    this.hideSendNFTModal();

                    await tx.wait(1);

                    item.isBusy = false;
                    this.userTokens = this.userTokens.filter(c => c.tokenId !== id);
                    this.$toast.success(`#${item.tokenId} sent successfully`)
                } catch (err) {
                    this.handleError(`Sending NFT failed`);
                    this.hideSendNFTModal();
                    item.isBusy = false;
                }
            },

            async registerFreyNFT(item) {
                if (item.isBusy) return;

                const freyRegister = await this.freyRegistryContract.getFrey(item.tokenId);
                try {
                    let tx = undefined;
                    if (!freyRegister.isRegistered) {
                        tx = await this.freyRegistryContract.register(item.tokenId, this.collectionSaleToken);
                    } else {
                        tx = await this.freyRegistryContract.switchCurrency(item.tokenId, this
                            .collectionSaleToken);
                    }
                    item.isBusy = true;
                    this.triggerListReactivity(this.userTokens);
                    this.$modal.hide('pick-currency');

                    await tx.wait(1);

                    item.isBusy = false;
                    this.$toast.success(`#${item.tokenId} registered successfully`)
                } catch (err) {
                    this.handleError(`Registration for #${item.tokenId} failed`);
                    item.isBusy = false;
                    this.$modal.hide('pick-currency');
                }
                this.triggerListReactivity(this.userTokens);
            },

            async buyMarketNFT(item) {
                if (item.isBusy) return;

                const [tokenAddress, tokenId, price, currency] = [this.market.token, item.tokenId,
                    item.currentPrice, item.currency.id
                ];
                try {
                    const contractSellOrder = await this.contract.getSellOrder(tokenAddress, tokenId);

                    if (!contractSellOrder) {
                        this.marketTokens = this.marketTokens.filter(c => c.tokenId !== item.tokenId);
                        throw "Sell order doesn't exist or expired.";
                    }

                    const priceValue = item.currency.id === this.acceptedTokens[0].value ? price : 0;
                    const acceptedCurrency = this.acceptedTokens.filter(c => c.value === currency)[0];

                    if (!acceptedCurrency) throw "Currency not supported";
                    if (!acceptedCurrency.approved) {
                        this.marketSelectedNFT = undefined;
                        this.bools.marketCard = false;
                        this.$modal.show('allowances');
                        throw `${acceptedCurrency.key} is not approved.`;
                    }

                    const tx = await this.contract.buy(tokenAddress, tokenId, currency, price, {
                        value: priceValue
                    });

                    item.isBusy = true;
                    this.triggerListReactivity(this.marketTokens);
                    this.bools.marketCard = false;
                    this.marketSelectedNFT = undefined;

                    await tx.wait(1);

                    await this.fetchUserNFTs();
                    this.marketTokens = this.marketTokens.filter(c => c.tokenId !== item.tokenId);
                    item.isBusy = false;
                    this.$toast.success('Buy order successful');
                } catch (err) {
                    this.handleError(err);
                    item.isBusy = false;
                }
                this.triggerListReactivity(this.marketTokens);
            },

            async bidMarketNFT(item, amount) {
                if (item.isBusy) return;

                const [tokenAddress, tokenId, currency] = [this.market.token, item.tokenId, item.currency.id];
                const price = fromExponential(amount * (10 ** 18));

                const contractAuction = await this.contract.getAuction(tokenAddress, tokenId);
                try {
                    if (!contractAuction || contractAuction.ended) {
                        item.order.ended = true;
                        this.marketTokens = this.marketTokens.filter(c => c.tokenId !== item.tokenId);
                        this.$modal.hide('make-bid');
                        this.bools.marketCard = false;
                        throw "Auction order doesn't exist or ended.";
                    }

                    const priceValue = item.currency.id === this.acceptedTokens[0].value ? price : 0;
                    const acceptedCurrency = this.acceptedTokens.filter(c => c.value === currency)[0];

                    if (!acceptedCurrency) throw "Currency not supported";
                    if (!acceptedCurrency.approved) throw `${acceptedCurrency.key} is not approved.`;

                    const tx = await this.contract.bid(tokenAddress, tokenId, "" + price, {
                        gasPrice: 100000000000,
                        gasLimit: 1000000,
                        value: priceValue
                    });

                    item.isBusy = true;

                    this.$modal.hide('make-bid');
                    this.bools.marketCard = false;
                    this.triggerListReactivity(this.marketTokens);
                    await tx.wait(1);

                    item.currentPrice = price;
                    item.order.highestBidder = this.metaMaskAccount.toLowerCase();
                    item.isBusy = false;
                    this.$toast.success('Bid order successful');
                } catch (err) {
                    this.handleError(err);
                    item.isBusy = false;
                }
                this.triggerListReactivity(this.marketTokens);
            },

            async listNFT(item, type) {
                if (item.isBusy) return;

                const [token, tokenId, currency, amount, duration] = [this.market.token, item.tokenId,
                    this.collectionSaleToken, "" + fromExponential(this.collectionSaleAmount * (10 ** 18)), this
                    .collectionSaleDuration
                ];

                try {
                    if (!this.marketApproved) {
                        this.$modal.hide("create-listing");
                        this.bools.collectionCard = false;
                        this.$toast.error('The Market contract is not enabled!')
                        this.$modal.show('allowances');
                        return;
                    }

                    const auctionDuration = this.collectionSaleDurationType === 'minute' ? duration * 60 : this
                        .collectionSaleDurationType === 'hour' ? duration * 3600 : duration * 3600 * 24;
                    const tx = type === this.CONSTANTS.AUCTION ? await this.contract.createAuction(token,
                            tokenId, currency, amount,
                            auctionDuration) :
                        await this.contract.sell(token, tokenId, currency, amount);

                    item.isBusy = true;

                    this.$modal.hide("create-listing");
                    this.bools.collectionCard = false;
                    this.triggerListReactivity(this.userTokens);
                    await tx.wait(1)

                    item.isBusy = false;
                    this.$toast.success(type === this.CONSTANTS.AUCTION ? 'Auction created' : 'Sell order created');

                    this.initialUserTokens = this.initialUserTokens.filter(c => c.tokenId !== tokenId);
                    this.userTokens = this.initialUserTokens;
                    this.triggerListReactivity(this.userTokens);
                    await this.initiateMarketSearch();
                } catch (err) {
                    this.handleError(err);
                    item.isBusy = false;
                }
                this.triggerListReactivity(this.userTokens);
            },

            async delistNFT(item) {

                if (item.isBusy) return;

                const [tokenAddress, tokenId] = [this.market.token, item.tokenId];

                try {
                    let tx = undefined;
                    if (item.type === this.CONSTANTS.AUCTION) {
                        const contractAuction = await this.contract.getAuction(tokenAddress, tokenId);

                        if (this.getAuctionEndDate(item) !== "Ended") {
                            throw "Auction is still ongoing";
                        }

                        tx = await this.contract.endAuction(tokenAddress, tokenId);
                    } else {
                        tx = await this.contract.cancelSell(tokenAddress, tokenId);
                    }

                    item.isBusy = true;
                    this.triggerListReactivity(this.userSales);
                    this.collectionSelectedNFT = undefined;
                    this.bools.showCollectionCardModal = false;
                    await tx.wait(1);

                    item.isBusy = false;
                    this.userSales = this.userSales.filter(c => c.tokenId !== item.tokenId);
                    this.bools.collectionSale = false;
                    this.$toast.success(item.type === this.CONSTANTS.AUCTION ? 'Auction cancelled' :
                        'Sale order cancelled');

                    await this.fetchUserNFTs();

                } catch (err) {
                    this.handleError(err);
                    item.isBusy = false;
                }
                this.triggerListReactivity(this.userSales);
            },

            async withdrawNFT(tokenId) {
                try {
                    const tx = await this.contract.withdrawNft(this.market.token, tokenId, {
                        gasPrice: 100000000000,
                        gasLimit: 1000000,
                    });

                    await tx.wait(1);

                    this.marketPendingTokens = this.marketPendingTokens.filter(c => c.tokenId !== tokenId);
                    this.keys.feeBalance++;
                    await this.fetchUserNFTs();
                    this.$toast.success(`#${tokenId} received`);
                } catch (err) {
                    this.handleError(err);
                }
            },

            async withdraw(token) {
                try {
                    const tx = await this.contract.withdraw(token.value);
                    this.keys.feeBalance++;
                    token.isBusy = true;

                    await tx.wait(1);

                    token.balance = 0;
                    this.$toast.success('Withdraw successful');
                } catch (err) {
                    this.handleError(err);
                }
                this.keys.feeBalance++;
                token.isBusy = false;
            },

            async withdrawFreyFees() {
                try {
                    const freyIds = await this.getRegisteredFreysIds();

                    const tx = await this.freyRegistryContract.collectFees(freyIds);

                    await tx.wait(1);

                    this.acceptedTokens.forEach(c => c.NFTBalance = 0);
                    this.keys.feeBalance++;
                    this.$toast.success('Withdraw successful');
                } catch (err) {
                    this.handleError(err);
                }
            },

            async setMarketApproval(approve) {
                try {
                    const tx = await this.marketNFTContract.setApprovalForAll(this.contract.address, approve);

                    await tx.wait(1);

                    this.marketApproved = approve;
                    this.$toast.success(approve ? 'Market contract approved' : 'Market contract disabled');
                } catch (err) {
                    this.handleError(err);
                }
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

            getCurrencyName(id) {
                const currency = this.acceptedTokens.filter(c => c.value === id)[0];
                if (!currency) return "";
                return currency.key;
            },

            getIntervalLimit(type) {
                if (type === 'minute') {
                    this.collectionSaleDuration = 5;
                    this.collectionDurationIntervalLimit = 59;
                } else if (type === 'hour') {
                    this.collectionSaleDuration = 1;
                    this.collectionDurationIntervalLimit = 23;
                } else {
                    this.collectionSaleDuration = 1;
                    this.collectionDurationIntervalLimit = 7;
                }

            },

            getNftImage(item) {
                if (this.market.thumbnail === 'none') {
                    return item.image;
                }
                return this.market.thumbnail + item.tokenId;
            },

            getAuctionEndDate(item) {
                const order = item.order;
                if (order.ended) return "Ended";

                const dateNow = Date.now();
                const endDate = order.endsAt * 1000 - dateNow;

                const seconds = endDate / 1000;
                const minutes = parseInt(seconds / 60);
                const hours = parseInt(seconds / 3600);
                const days = parseInt(seconds / 3600 / 24);

                if (hours < 0 && days < 0 && minutes < 0 && seconds < 0) {
                    item.order.ended = true;
                    return "Ended";
                }
                if (hours === 0 && days === 0 && minutes < 1) return "Less than 1 minute";

                let date = days > 0 ? `${days} day(s), ` : "";
                date += hours > 0 ? `${hours % 24} hour(s), ` : "";
                date += minutes > 0 ? `${minutes % 60} minute(s) ` : "";
                return date;
            },

            getPaginationInfo() {
                return undefined;
                return {
                    perPage: this.marketPerPage,
                    page: this.marketPage
                };
            },

            getAccountStamp(account) {
                if (account === this.metaMaskAccount.toLowerCase()) return 'You';
                if (!account) return '';
                return "..." + account.slice(account.length - 5);
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

            getTokenIdQuery() {
                if (this.marketIdQuery === 0 || !this.marketIdQuery) return undefined;
                return this.marketIdQuery;
            },

            sortCollectionByField(collection, fieldString) {
                const sortBy = fieldString.split('-');
                const order = sortBy[1] === 'asc' ? 1 : -1;

                if (sortBy[0] === 'currentPrice') {
                    collection.sort((a, b) => (parseInt(a.currentPrice) > parseInt(b.currentPrice)) ? order : ((
                        parseInt(b.currentPrice) > parseInt(a
                            .currentPrice) ? -order :
                        0)));
                } else {
                    collection.sort((a, b) => (a.tokenId > b.tokenId) ? order : ((b.tokenId > a.tokenId ? -order :
                        0)));
                }
            },

            resetMarketFilters() {
                for (let i = 0; i < this.marketSelectedFilters.length; i++) {
                    this.marketSelectedFilters[i] = '';
                }
                this.userTokens = this.initialUserTokens;
                this.marketIdQuery = 0;
                this.marketIdQueryComparator = 'tokenId';
                this.marketSelectedCurrency = 'All';
                this.marketSortBy = '';
                this.initiateMarketSearch();
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

            showCollectionDropdown(event) {
                try {
                    const tokenId = event.target.dataset["tokenId"];
                    const selectedCard = this.userTokens.filter(c => c.tokenId == tokenId)[0];

                    if (!selectedCard) return;
                    this.collectionSelectedNFT = selectedCard;

                    this.bools.collectionMenu = true;
                    let dropdown = this.$refs.collectionMenu;

                    const buttonPosition = event.target.getBoundingClientRect();

                    const tempOffset = this.isFreyMarket ? 120 : 80;

                    dropdown.style.top = (buttonPosition.top - tempOffset) + 'px';
                    dropdown.style.left = (buttonPosition.left - 10) + 'px';

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

                }
            },

            handleError(error) {
                const errorMessage =
                    typeof error == "object" ? error.message : error.toLowerCase();
                const lcMessage = errorMessage.toLowerCase();
                if (lcMessage.indexOf("user denied") > -1) return;
                if (lcMessage.indexOf("transaction failed") > -1) {
                    this.$toast.error("Transaction Failed");
                } else if (errorMessage.length < 100) {
                    this.$toast.error(errorMessage);
                } else {
                    this.$toast.error('Transaction Failed');
                }
            },

            //If I used the 'key' vue would rerender all the img elements requesting a 600-800kb image everytime, killer for mobiles
            triggerListReactivity(list) {
                list.splice(0, 0);
            },
        },

        computed: {
            ...mapGetters(["metaMaskAccount", "metaMaskWallet"]),
        },

    }
</script>

<style>
    .bg-light {
        background-color: #222222;
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
        justify-content: start;
    }

    .market-modal-enter-active,
    .market-modal-leave-active {
        opacity: 1;
        transition: all .25s;
    }

    .market-modal-enter,
    .market-modal-leave-to {
        opacity: 0;
    }

    .filters-enter-active,
    .filters-leave-active {
        opacity: 1;
        transform: translateX(0px);
        transition: all 0.25s;
    }

    .filters-enter,
    .filters-leave-to {
        opacity: 0;
        transform: translateX(-300px);
    }

    #tutorial p>span {
        font-weight: bold;
        color: #8cd1a6 !important;
    }

    #tutorial a:hover {
        color: #8cd1a6;
    }

    .inner-shadow {
        -moz-box-shadow: inset 0 0 12px var(--var-shadow-color);
        -webkit-box-shadow: inset 0 0 12px var(--var-shadow-color);
        box-shadow: inset 0 0 12px var(--var-shadow-color);
    }

    .txt-hilight {
        font-weight: bold;
        color: #8cd1a6 !important;
    }

    .txt-tutorial {
        color: rgba(255, 255, 255, 0.75);
    }
</style>