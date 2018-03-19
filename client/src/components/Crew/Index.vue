<template>
  <div>
    <v-toolbar flat dense class="orange anime-title" dark>
      <v-toolbar-title>{{crew.full_name}}</v-toolbar-title>
    </v-toolbar>
    <v-layout row wrap>
      <v-flex xs12>
        <v-layout row wrap>
          <v-flex xs5 d-flex>
            <crew-image :crew="crew"/>
          </v-flex>
          <v-flex xs7 d-flex>
            <crew-details :crew="crew"/>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
import CrewImage from './CrewImage'
import CrewDetails from './CrewDetails'
import CrewService from '@/services/CrewService'
import {mapState} from 'vuex'

export default {
  components: {
    CrewDetails,
    CrewImage,
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
      crew: {}
    }
  },
  async mounted () {
    let crewId = this.route.params.crewId
    console.log('hi',crewId)
    this.crew = (await CrewService.show(crewId)).data
    console.log('hi', this.crew)
  },
  watch: {
    '$route.params.crewId': {
      // immediate: true,
      async handler(value) {
        this.crew = (await CrewService.show(value)).data
        console.log('hi', this.crew)
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
  width: 100%;
  margin: 0 auto;
}

.anime-title {
  text-align: center;
}
</style>
