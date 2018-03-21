<template>
  <v-layout row wrap>
    <!-- <v-flex xs6 v-if="isUserLoggedIn">
      <crews-bookmarks />
      <recently-viewed-Crews class="mt-2" />
    </v-flex> -->
    <v-flex xs12 class="ml-2">
      <!-- <Crews-search-panel /> -->
      <panel title="Crews">
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
          :items="crews"
          :pagination.sync="pagination"
          :rows-per-page-items="numRows"
          class="elevation-1">
          <template slot="items" slot-scope="props">
            <td class="visitable pic_url" @click="viewCrew(props.item.crew_id)">
              <img class="crew-image" :src="props.item.pic_url"/>
            </td>
            <td class="visitable full_name text-xs-left" @click="viewCrew(props.item.crew_id)">
              {{props.item.full_name}}
            </td>
            <td class="visitable birthday text-xs-right" @click="viewCrew(props.item.crew_id)">
              {{props.item.birthday}}
            </td>
            <td class="visitable num-episodes text-xs-right" @click="viewCrew(props.item.crew_id)">
              {{props.item.website}}
            </td>
            <td class="visitable details text-xs-left" @click="viewCrew(props.item.crew_id)">
              {{props.item.more}}
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
      crews: [],
      search: '',
      page: 1,
      numRows: [10, 20],
      pagination: {'sortBy': 'full_name', 'rowsPerPage': 10},
      headers: [{
          text: "Pic",
          value: "pic_url",
          align: "left",
        },
        {
          text: "Title",
          value: "full_name",
          align: "left",
        },
        {
          text: "Birthday",
          value: "birthday"
        },
        {
          text: "Website",
          value: "website"
        },
      ],
    }
  },
  async mounted () {
    this.crews = (await SearchService.index('crews', this.route.query)).data
  },
  methods: {
    viewCrew(crewId) {
      this.$router.push({
          name: 'crew',
          params: {
            crewId
          }
        })
    }
  },
  watch: {
    '$route.query': {
      // immediate: true,
      async handler(value) {
        this.crews = (await SearchService.index('crews', value)).data
      }
    }
  }
}
</script>

<style scoped>
.visitable {
  cursor: pointer;
}
.crew-image {
  width: 100%;
  margin: 0 auto;
}
</style>
