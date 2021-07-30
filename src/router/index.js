import Vue from 'vue'
import Router from 'vue-router'
import WorldMap from "../components/WorldMap/Index";

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'world-map',
      component: WorldMap
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
