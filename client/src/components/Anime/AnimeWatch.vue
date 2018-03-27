<template>
  <v-layout column>
    <v-flex>
      <panel title="Journal">
        <v-flex xs3>
          <v-select
            :items="statusArr"
            v-model="watch.status"
            label="Add to list"
            single-line
            hide-details
          ></v-select>
        </v-flex>
        <template v-if="watch.status">
          <v-flex v-if="watch.status === 'Completed'">
            <v-slider label=" Number of Episodes : " :max="anime.num_episodes" :value="anime.num_episodes" thumb-label></v-slider>
          </v-flex>
          <v-flex v-else>
            <v-slider label=" Number of Episodes : " :max="anime.num_episodes" v-model="watch.progress" thumb-label></v-slider>
          </v-flex>
          <div class="text-xs-center">
            <v-btn class="cyan" dark @click.stop="saveStatus(anime.anime_id)">Save</v-btn>
          </div>
        </template>
      </panel>
    </v-flex>
  </v-layout>
</template>

<script>
import WatchService from '@/services/WatchService'

import {mapState} from 'vuex'
export default {
  data() {
    return {
      statusArr: [
        'Watching',
        'Completed',
        'On-Hold',
        'Dropped',
        'Plan to Watch',
      ],
      watch: {
        status: null,
        progress: null
      },
    }
  },
  props: [
    'anime'
  ],
  computed: {
    ...mapState([
      'isUserLoggedIn',
      'user',
      'route'
    ]),
  },
  methods: {
    async saveStatus(animeId) {
      this.watch.user_id = this.user.user_id
      this.watch.anime_id = this.anime.anime_id
      await WatchService.post(this.watch)
    }
  },
  watch: {
    'anime.watch': {
      handler (value) {
        if (value) {
          this.watch.status = value.status
          this.watch.progress = value.progress
        }
      }
    }
  }
}
</script>