import Vue from 'vue'
import Router from 'vue-router'
import WorldMap from "../components/WorldMap/Index";
import Harmons from "../components/Harmons/Index";

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/harmons',
      name: 'harmons',
      component: Harmons
    },
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
