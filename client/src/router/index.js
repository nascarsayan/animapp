import Vue from 'vue'
import Router from 'vue-router'
import Register from '@/components/Register'
import Login from '@/components/Login'
import Animes from '@/components/Animes/Index'
import Anime from '@/components/Anime/Index'
import Personas from '@/components/Personas/Index'
import Persona from '@/components/Persona/Index'
import Crews from '@/components/Crews/Index'
import Crew from '@/components/Crew/Index'
import Search from '@/components/Search/Index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/animes',
      name: 'animes',
      component: Animes
    },
    {
      path: '/anime/:animeId',
      name: 'anime',
      component: Anime
    },
    {
      path: '/personas',
      name: 'personas',
      component: Personas
    },
    {
      path: '/persona/:personaId',
      name: 'persona',
      component: Persona
    },
    {
      path: '/crews',
      name: 'crews',
      component: Crews
    },
    {
      path: '/crew/:crewId',
      name: 'crew',
      component: Crew
    },
    {
      path: '/search',
      name: 'search',
      component: Search
    },
    {
      path: '*',
      redirect: 'search'
    }
  ]
})
