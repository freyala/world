import Vue from 'vue'
import Router from 'vue-router'
import WorldMap from "../components/WorldMap/Index";
import Harmons from "../components/WorldMap/Harmons/Index";

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
