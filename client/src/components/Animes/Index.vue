<template>
  <v-layout row wrap>
    <!-- <v-flex xs6 v-if="isUserLoggedIn">
      <animes-bookmarks />
      <recently-viewed-Animes class="mt-2" />
    </v-flex> -->
    <v-flex xs12 class="ml-2">
      <!-- <Animes-search-panel /> -->
      <animes-panel :animes="animes" class="mt-2" />
    </v-flex>
  </v-layout>
</template>

<script>
import AnimesPanel from './AnimesPanel'
import AnimesService from '@/services/AnimesService'
import {mapState} from 'vuex'

import _ from 'lodash'
export default {
  components: {
    AnimesPanel,
  },
  computed: {
    ...mapState([
      'isUserLoggedIn',
      'user',
      'route'
    ])
  },
  data () {
    return {
      animes: []
    }
  },
  async mounted () {
    this.animes = (await AnimesService.show(this.route.query)).data
  },
  watch: {
    '$route.query': {
      // immediate: true,
      async handler(value) {
        this.animes = (await AnimesService.show(value)).data
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
</style>
