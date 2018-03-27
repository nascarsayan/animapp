<template>
  <v-layout row wrap>
    <!-- <v-flex xs6 v-if="isUserLoggedIn">
      <animes-bookmarks />
      <recently-viewed-Anime class="mt-2" />
    </v-flex> -->
    <v-flex xs12 class="ml-2">
      <!-- <Animes-search-panel /> -->
      <panel title="Animes">
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
          :items="animes"
          :loading="isLoading"
          :no-data-text="loadText"
          :pagination.sync="pagination"
          :rows-per-page-items="numRows"
          class="elevation-1">
          <template slot="items" slot-scope="props">
            <td class="visitable type">
              <img class="anime-image" :src="props.item.pic_url"/>
            </td>
            <td class="visitable primary_name text-xs-left" @click="viewAnime(props.item.anime_id)">
                <b>{{props.item.primary_name}}</b><br/>
                {{props.item.synopsis.substring(0, 400)}}...
            </td>
            <td class="visitable type text-xs-right"> {{props.item.type}} </td>
            <td class="visitable num-episodes text-xs-right"> {{props.item.num_episodes}} </td>
            <td class="visitable start-date text-xs-right">{{props.item.start_date}} </td>
            <td class="visitable rating text-xs-right"> {{props.item.rating}} </td>
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
import AnimeService from '@/services/AnimeService'
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
      animes: [],
      loadText: 'Loading Data',
      isLoading: true,
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
        {
          text: "Type",
          value: "type"
        },
        {
          text: "Episodes",
          value: "episodes"
        },
        {
          text: "Start Date",
          value: "start_date"
        },
        {
          text: "Rating",
          value: "rating"
        }
      ],
    }
  },
  async mounted () {
    this.animes = (await AnimeService.index(this.route.query)).data
    this.isLoading = false
  },
  methods: {
    viewAnime(animeId) {
      this.$router.push({
          name: 'anime',
          params: {
            animeId
          }
        })
    }
  },
  watch: {
    '$route.query': {
      // immediate: true,
      async handler(value) {
        this.animes = (await AnimeService.index(value)).data
      }
    }
  }
}
</script>

<style scoped>
.visitable {
  cursor: pointer;
}
.anime-image {
  width: 100%;
  margin: 0 auto;
}
</style>
