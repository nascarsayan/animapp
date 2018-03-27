<template>
  <v-layout row wrap>
    <!-- <v-flex xs6 v-if="isUserLoggedIn">
      <personas-bookmarks />
      <recently-viewed-Personas class="mt-2" />
    </v-flex> -->
    <v-flex xs12 class="ml-2">
      <!-- <Personas-search-panel /> -->
      <panel title="Personas">
        <v-text-field
            append-icon="search"
            label="Search"
            single-line
            hide-details
            v-model="search"
          ></v-text-field>
        <v-data-table
          :search="search"
          :headers="headers"
          :items="personas"
          :pagination.sync="pagination"
          :rows-per-page-items="numRows"
          class="elevation-1">
          <template slot="items" slot-scope="props">
            <td class="visitable image_url" @click="viewPersona(props.item.persona_id)">
              <img class="persona-image" :src="props.item.pic_url"/>
            </td>
            <td class="visitable primary_name text-xs-left" @click="viewPersona(props.item.persona_id)">
                {{props.item.primary_name}}
            </td>
            <td class="visitable details text-xs-left" @click="viewPersona(props.item.persona_id)">
                {{props.item.details}}
            </td>
          </template>
          <v-alert slot="no-results" :value="true" color="error" icon="warning">
            Your search for "{{ search }}" found no results.
          </v-alert>
        </v-data-table>
      </panel>
    </v-flex>
  </v-layout>
</template>

<script>
import SearchService from '@/services/SearchService'
import {mapState} from 'vuex'

import _ from 'lodash'
export default {
  computed: {
    ...mapState([
      'isUserLoggedIn',
      'user',
      'route'
    ])
  },
  data () {
    return {
      personas: [],
      search: '',
      page: 1,
      numRows: [10, 20],
      pagination: {'sortBy': 'primary_name', 'rowsPerPage': 10},
      headers: [{
          text: "Pic",
          value: "pic_url",
          align: "left",
        },
        {
          text: "Title",
          value: "primary_name",
          align: "left",
        },
      ],
    }
  },
  async mounted () {
    this.personas = (await SearchService.index('personas', this.route.query)).data
  },
  methods: {
    viewPersona(personaId) {
      this.$router.push({
          name: 'persona',
          params: {
            personaId
          }
        })
    }
  },
  watch: {
    '$route.query': {
      // immediate: true,
      async handler(value) {
        this.personas = (await SearchService.index('personas', value)).data
      }
    }
  }
}
</script>

<style scoped>
.visitable {
  cursor: pointer;
}
.persona-image {
  width: 100%;
  margin: 0 auto;
}
</style>
