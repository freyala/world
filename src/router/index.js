import Vue from 'vue'
import Router from 'vue-router'
import WorldMap from "../components/WorldMap/Index";

import Coinflip from "../pages/Casino/Coinflip/Index";
import RouletteLow from "../pages/Casino/Roulette/Low";
import RouletteMedium from "../pages/Casino/Roulette/Medium";
import RouletteHigh from "../pages/Casino/Roulette/High";
import Slots from "../pages/Casino/Slots/Index";
import Blackjack from "../pages/Casino/Blackjack/Index";
import Casino from "../pages/Casino/Index";

import Harmons from "../pages/Harmons/Index";

import Login from "../pages/Login";
import Delegating from "../pages/Delegating";
import Faucet from "../pages/Faucet";
import Governance from "../pages/Governance";
import JennyMines from "../pages/JennyMines";
import Staking from "../pages/Staking";

Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      name: 'world-map',
      component: WorldMap
    },
    {
      path: '/#/login',
      name: 'login',
      component: Login
    },
    {
      path: '/casino/coinflip',
      name: 'coinflip',
      component: Coinflip
    },
    {
      path: '/casino/roulette/low',
      name: 'roulette-low',
      component: RouletteLow
    },
    {
      path: '/casino/roulette/medium',
      name: 'roulette-medium',
      component: RouletteMedium
    },
    {
      path: '/casino/roulette/high',
      name: 'roulette-high',
      component: RouletteHigh
    },
    {
      path: '/casino/slots',
      name: 'slots',
      component: Slots
    },
    {
      path: '/casino/blackjack',
      name: 'blackjack',
      component: Blackjack
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
      path: '*',
      redirect: '/'
    }
  ]
})
