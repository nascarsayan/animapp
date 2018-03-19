<template>
  <div>
    <v-toolbar flat dense class="orange anime-title" dark>
      <v-toolbar-title>{{persona.primary_name}}</v-toolbar-title>
    </v-toolbar>
    <v-layout row wrap>
      <v-flex xs12>
        <v-layout row wrap>
          <v-flex xs5 d-flex>
            <persona-image :persona="persona"/>
          </v-flex>
          <v-flex xs7 d-flex>
            <persona-details :persona="persona"/>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
import PersonaImage from './PersonaImage'
import PersonaDetails from './PersonaDetails'
import PersonaService from '@/services/PersonaService'
import {mapState} from 'vuex'

export default {
  components: {
    PersonaDetails,
    PersonaImage,
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
      persona: {}
    }
  },
  async mounted () {
    let personaId = this.route.params.personaId
    console.log('hi',personaId)
    this.persona = (await PersonaService.show(personaId)).data
    console.log('hi', this.persona)
  },
  watch: {
    '$route.params.personaId': {
      // immediate: true,
      async handler(value) {
        this.persona = (await PersonaService.show(value)).data
        console.log('hi', this.persona)
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
