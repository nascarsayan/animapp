<template>
  <div>
    <v-toolbar flat dense class="orange anime-title" dark>
      <v-toolbar-title>{{anime.primary_name}}</v-toolbar-title>
    </v-toolbar>
    <v-layout class="mt-2">
      <v-flex xs6>
        <anime-image :anime="anime"/>
      </v-flex>
      <v-flex xs6 class="ml-2">
        <anime-info :anime="anime"/>
      </v-flex>
    </v-layout>
    <v-layout class="mt-2">
      <v-flex xs6>
        <anime-synopsis :anime="anime"/>
      </v-flex>
      
    </v-layout>
  </div>
</template>
<script>
import AnimeImage from './AnimeImage'
import AnimeInfo from './AnimeInfo'
import AnimeSynopsis from './AnimeSynopsis'
import AnimeService from '@/services/AnimeService'
import {mapState} from 'vuex'

export default {
  components: {
    AnimeInfo,
    AnimeImage,
    AnimeSynopsis,
  },
  computed: {
    ...mapState([
      'isUserLoggedIn',
      'user',
      'route'
    ]),
  },
  data () {
    return {
      anime: {}
    }
  },
  async mounted () {
    let animeId = this.route.params.animeId
    console.log('hi',animeId)
    this.anime = (await AnimeService.show(animeId)).data
    console.log('hi', this.anime)
  },
  watch: {
    '$route.params.animeId': {
      // immediate: true,
      async handler(value) {
        this.anime = (await AnimeService.show(value)).data
        console.log('hi', this.anime)
      }
    }
  }
}
</script>

<style scoped>
.song {
  padding: 20px;
  height: 330px;
  overflow: hidden;
}

.song-title {
  font-size: 30px;
}

.song-artist {
  font-size: 24px;
}

.song-genre {
  font-size: 18px;
}

.album-image {
  width: 70%;
  margin: 0 auto;
}

.anime-title {
  text-align: center;
}
</style>
