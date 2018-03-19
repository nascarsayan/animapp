import Vue from 'vue'
import Router from 'vue-router'
import Register from '@/components/Register'
import Login from '@/components/Login'
import Songs from '@/components/Songs/Index'
import CreateSong from '@/components/CreateSong'
import EditSong from '@/components/EditSong'
import ViewSong from '@/components/ViewSong/Index'
import Animes from '@/components/Animes/Index'
import Anime from '@/components/Anime/Index'
import Persona from '@/components/Persona/Index'
import Crew from '@/components/Crew/Index'
import AdvancedSearch from '@/components/AdvancedSearch'

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
      path: '/songs',
      name: 'songs',
      component: Songs
    },
    {
      path: '/songs/create',
      name: 'songs-create',
      component: CreateSong
    },
    {
      path: '/songs/:songId',
      name: 'song',
      component: ViewSong
    },
    {
      path: '/songs/:songId/edit',
      name: 'song-edit',
      component: EditSong
    },
    {
      path: '/animes',
      name: 'animes',
      component: Animes
    },
    {
      path: '/animes/:offset',
      name: 'animes-batch',
      component: Animes
    },
    {
      path: '/anime/:animeId',
      name: 'anime',
      component: Anime
    },
    {
      path: '/persona/:personaId',
      name: 'persona',
      component: Persona
    },
    {
      path: '/crew/:crewId',
      name: 'crew',
      component: Crew
    },
    {
      path: '/search',
      name: 'search',
      component: AdvancedSearch
    },
    {
      path: '*',
      redirect: 'animes'
    }
  ]
})
