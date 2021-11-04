export default {
    namespaced: true,
    state: {
        UniswapV2Factory: {
            1666600000: "0x9014B937069918bd319f80e8B3BB4A2cf6FAA5F7",
        },
        JEWEL: {
            1666600000: "0x72cb10c6bfa5624dd07ef608027e366bd690048f",
        },
        WONE: {
            1666600000: "0xcF664087a5bB0237a0BAd6742852ec6c8d69A27a",
        },
        bBUSD: {
            1666600000: "0xE176EBE47d621b984a73036B9DA5d834411ef734",
        },
        bUSDC: {
            1666600000: "0x44cED87b9F1492Bf2DCf5c16004832569f7f6cBa",
        },
        eUSDC: {
            1666600000: "0x985458E523dB3d53125813eD68c274899e9DfAb4",
        },
        harmonyMulticall : {
            1666600000: "0x34b415f4d3b332515e66f70595ace1dcf36254c5",
        },
    },
    mutations: {},
    getters:{
        WONE: (state) => (id) => {
            return state.WONE[id];
        },
        bBUSD: (state) => (id) => {
            return state.bBUSD[id];
        },
        bUSDC: (state) => (id) => {
            return state.bUSDC[id];
        },
        eUSDC: (state) => (id) => {
            return state.eUSDC[id];
        },
        UNIFACTORY: (state) => (id) => {
            return state.UniswapV2Factory[id];
        },
        hMULTICALL: (state) => (id) => {
            return state.harmonyMulticall[id];
        },
    },
    actions: {},
    modules: {}
};