import Vue from 'vue'
import Router from 'vue-router'
import WorldMap from "../components/WorldMap/Index";

import Harmons from "../pages/Harmons/Index";
import CryptoPigs from "../pages/CryptoPigs/Pigs";
import Marketplace from "../pages/Marketplace/Marketplace";

import FreyNFT from "../pages/Barracks/Home";
import FreyCollection from "../pages/Barracks/Collection";
import FreyGallery from "../pages/Barracks/Gallery";
import FreyAttributes from "../pages/Barracks/Attributes";

import Login from "../pages/Login";
import Beacon from "../pages/Beacon";
import Faucet from "../pages/Faucet";
import Wiki from "../pages/Wiki";
import Tree from "../pages/Tree";
import Staking from "../pages/Staking";
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
            path: '/barracks',
            name: 'barracks',
            component: FreyNFT
        },
        {
            path: '/barracks/attributes',
            name: 'barracks-attributes',
            component: FreyAttributes
        },
        {
            path: '/barracks/gallery',
            name: 'barracks-gallery',
            component: FreyGallery
        },
        {
            path: '/barracks/collection',
            name: 'barracks-collection',
            component: FreyCollection
        },
        {
            path: '/sneak-peek',
            name: 'sneak-peek',
            component: Harmons
        },
        {
            path: '/beacon',
            name: 'beacon',
            component: Beacon
        },
        {
            path: '/faucet',
            name: 'faucet',
            component: Faucet
        },
        {
            path: '/wiki',
            name: 'wiki',
            component: Wiki
        },
        {
            path: '/tree',
            name: 'tree',
            component: Tree
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