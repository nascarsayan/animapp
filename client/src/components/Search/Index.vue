<template>
  <div>
    <v-layout>
      <v-flex xs12>
        <anime-search/>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex xs12>
        <persona-search/>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex xs12>
        <crew-search/>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex xs12>
        <advanced-search/>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import _ from 'lodash'
import AnimeSearch from './AnimeSearch'
import PersonaSearch from './PersonaSearch'
import CrewSearch from './CrewSearch'
import AdvancedSearch from './AdvancedSearch'

export default {
  components: {
    AnimeSearch,
    PersonaSearch,
    CrewSearch,
    AdvancedSearch,
  },
}
</script>

<style>

</style>
