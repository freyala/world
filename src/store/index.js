import Vue from 'vue'
import Vuex from 'vuex'

import addressConstants from './modules/addressConstants';
import wallet from './modules/wallet';
import exchange from './modules/exchange';
import liquidity from './modules/liquidity';

Vue.use(Vuex)

export default new Vuex.Store({
    namespaced: true,

    modules: {
        addressConstants,
        exchange,
        liquidity,
        wallet
    },

    state: {
        USER: {
            TOKEN: [],
            NFT: []
        },
        FIRST_TIME: true,
        CHAIN_STATUS: '',
        CHAIN_ID: 0,
        FAVOURITES: [],
        LOADING_BALANCES: true,
        LOADING_ALLOWANCES: true,
        USER_BALANCE: 0,
        STAKING_BALANCE: 0,
        REWARD_BALANCE: 0,
        MINING_BALANCE: 0,
        ALLOWANCE: {
            roulette: 0,
            staking: 0,
            topple: 0,
            coinflip: 0
        },
        USER_LOGGED_IN: undefined,
        WALLET_CONNECTION_STATUS: undefined,
        METAMASK_ACCOUNT: undefined,
        METAMASK_WALLET: undefined,
        NETWORK_ID: undefined
    },

    getters: {
        userTokens(state) {
            return state.USER.TOKEN
        },
        userNFT(state) {
            return state.USER.NFT
        },
        firstTime(state) {
            return state.FIRST_TIME
        },
        chainStatus(state) {
            return state.CHAIN_STATUS
        },
        chainID(state) {
            return state.CHAIN_ID
        },
        favourites(state) {
            return state.FAVOURITES
        },
        loadingBalances(state) {
            return state.LOADING_BALANCES
        },
        loadingAllowances(state) {
            return state.LOADING_ALLOWANCES
        },
        userBalance(state) {
            return state.USER_BALANCE
        },
        stakingBalance(state) {
            return state.STAKING_BALANCE
        },
        rewardBalance(state) {
            return state.REWARD_BALANCE
        },
        miningBalance(state) {
            return state.MINING_BALANCE
        },
        allowance(state) {
            return state.ALLOWANCE
        },
        loggedIn(state) {
            return state.USER_LOGGED_IN
        },
        walletConnected(state) {
            return state.WALLET_CONNECTION_STATUS
        },
        metaMaskAccount(state) {
            return state.METAMASK_ACCOUNT
        },
        metaMaskWallet(state) {
            return state.METAMASK_WALLET
        },
        networkId(state) {
            return state.NETWORK_ID
        }
    },

    mutations: {
        SET_USER_TOKEN(state, value) {
            state.USER.TOKEN = value
        },
        SET_USER_NFT(state, value) {
            state.USER.NFT = value
        },
        SET_FIRST_TIME(state, value) {
            state.FIRST_TIME = value
        },
        SET_CHAIN_STATUS(state, value) {
            state.CHAIN_STATUS = value
        },
        SET_CHAIN_ID(state, value) {
            state.CHAIN_ID = value
        },
        SET_FAVOURITE_ITEMS(state, value) {
            state.FAVOURITES = value
        },
        SET_LOADING_BALANCES_STATUS(state, value) {
            state.LOADING_BALANCES = value
        },
        SET_LOADING_ALLOWANCES_STATUS(state, value) {
            state.LOADING_ALLOWANCES = value
        },
        SET_USER_BALANCE(state, value) {
            state.USER_BALANCE = value
        },
        SET_STAKING_BALANCE(state, value) {
            state.STAKING_BALANCE = value
        },
        SET_REWARD_BALANCE(state, value) {
            state.REWARD_BALANCE = value
        },
        SET_MINING_BALANCE(state, value) {
            state.MINING_BALANCE = value
        },
        SET_ALLOWANCE(state, value) {
            state.ALLOWANCE = value
        },
        SET_USER_LOGGED_IN(state, value) {
            state.USER_LOGGED_IN = value
        },
        SET_WALLET_CONNECTION_STATUS(state, value) {
            state.WALLET_CONNECTION_STATUS = value
        },
        SET_METAMASK_ACCOUNT(state, value) {
            state.METAMASK_ACCOUNT = value
        },
        SET_METAMASK_WALLET(state, value) {
            state.METAMASK_WALLET = value
        },
        SET_NETWORK_ID(state, value) {
            state.NETWORK_ID = value
        }
    },

    actions: {
        setChainStatus({commit}, value) {
            commit('SET_CHAIN_STATUS', value)
        },
        setChainId({commit}, value) {
            commit('SET_CHAIN_ID', value)
        },
        setFavourites({commit}) {
            if (localStorage.favourites) {
                const favourites = localStorage.favourites
                commit('SET_FAVOURITE_ITEMS', JSON.parse(favourites))
            } else {
                const favourites = []
                commit('SET_FAVOURITE_ITEMS', favourites)
            }
        },
        setFirstTime({commit}) {
            if (localStorage.firstTime === false || localStorage.firstTime === 'false') {
                commit('SET_FIRST_TIME', false)
            } else {
                commit('SET_FIRST_TIME', true)
            }
        },
        setFavourite({commit, state}, value) {
            let favourites = []

            if (state.FAVOURITES) {
                favourites = [...state.FAVOURITES]
            }

            if (favourites.includes(value)) {
                let index = favourites.indexOf(value);
                if (index !== -1) {
                    favourites.splice(index, 1);
                }
            } else if (favourites.length === 4) {
                return 'Already four favourite items selected.'
            } else {
                favourites.push(value)
            }

            commit('SET_FAVOURITE_ITEMS', favourites)
            localStorage.favourites = JSON.stringify(favourites);
        },
        setUserLoggedIn({commit}, value) {
            commit('SET_USER_LOGGED_IN', value)
        },
        setWalletConnectionStatus({commit}, value) {
            commit('SET_WALLET_CONNECTION_STATUS', value)
        },
        setMetaMaskAccount({commit}, value) {
            commit('SET_METAMASK_ACCOUNT', value)
            commit('SET_LOADING_BALANCES_STATUS', true)
        },
        setMetaMaskWallet({commit}, value) {
            commit('SET_METAMASK_WALLET', value)
        },
        setNetworkId({commit}, value) {
            commit('SET_NETWORK_ID', value)
        }
    }
})
