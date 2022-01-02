import Vue from 'vue'
import Router from 'vue-router'
import WorldMap from "../components/WorldMap/Index";

import Casino from "../pages/Casino/Index";

import Harmons from "../pages/Harmons/Index";
import CryptoPigs from "../pages/CryptoPigs/Pigs";
import Marketplace from "../pages/Marketplace/Marketplace";

import FreyNFT from "../pages/Frey/Home";
import FreyCollection from "../pages/Frey/Collection";
import FreyGallery from "../pages/Frey/Gallery";
import FreyAttributes from "../pages/Frey/Attributes";

import Login from "../pages/Login";
import Delegating from "../pages/Delegating";
import Faucet from "../pages/Faucet";
import Governance from "../pages/Governance";
import JennyMines from "../pages/JennyMines";
import Staking from "../pages/Staking";
//import Plots from "../pages/Plots";
import Plots from "../pages/Plots/Plots";
Vue.use(Router)

const originalPush = Router.prototype.push
Router.prototype.push = function push(location, onResolve, onReject) {
    if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
    return originalPush.call(this, location).catch(err => err)
}

export default new Router({
    mode: 'hash',
    routes: [{
            path: '/',
            name: 'world-map',
            component: WorldMap
        },
        {
            path: '/pigs',
            name: 'pigs',
            component: CryptoPigs
        },
        {
            path: '/marketplace',
            name: 'marketplace',
            component: Marketplace
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/frey/home',
            name: 'frey-nft',
            component: FreyNFT
        },
        {
            path: '/frey/attributes',
            name: 'frey-attributes',
            component: FreyAttributes
        },
        {
            path: '/frey/gallery',
            name: 'frey-gallery',
            component: FreyGallery
        },
        {
            path: '/frey/collection',
            name: 'frey-collection',
            component: FreyCollection
        },
        {
            path: '/casino',
            name: 'casino',
            component: Casino
        },
        {
            path: '/sneak-peek',
            name: 'sneak-peek',
            component: Harmons
        },
        {
            path: '/delegating',
            name: 'delegating',
            component: Delegating
        },
        {
            path: '/faucet',
            name: 'faucet',
            component: Faucet
        },
        {
            path: '/governance',
            name: 'governance',
            component: Governance
        },
        {
            path: '/jenny-mines',
            name: 'jennymines',
            component: JennyMines
        },
        {
            path: '/staking',
            name: 'staking',
            component: Staking
        },
        {
            path: '/plots/:neighbourhood',
            name: 'plots',
            component: Plots
        },
        {
            path: '*',
            redirect: '/'
        }
    ]
})