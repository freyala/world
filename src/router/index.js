import Vue from 'vue'
import Router from 'vue-router'
import WorldMap from "../components/WorldMap/Index";
import Casino from "../components/Casino/Index";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/casino',
      name: 'casino',
      component: Casino
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
