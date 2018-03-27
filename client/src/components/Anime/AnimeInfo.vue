<template>
  <panel title="Info">
    <div>
      <v-layout row wrap>
        <v-flex xs12>
          <div class="content name">
            <b>Id:</b> {{anime.anime_id}}
          </div>
          <div class="content name">
            <b>Primary Name:</b> {{anime.primary_name}}
          </div>
          <div class="content alt_name">
            <b>Synonyms: </b>
            <span
              v-for="(name, index) in anime.alt_name"
              :key="name">
              {{name}}<span v-if="index < anime.alt_name.length - 1">, </span>
            </span>
          </div>
          <div class="content type">
            <b>Type:</b>
            <span
              @click="filterPrimary('type', anime.type)"
              class="visitable"
              > {{anime.type}}</span>
          </div>
          <div class="content num-episodes">
            <b>Episodes:</b> {{anime.num_episodes}}
          </div>
          <div class="content status">
            <b>Status:</b>
            <span
              @click="filterPrimary('status', anime.status)"
              class="visitable"
            > {{anime.status}}
            </span>
          </div>
          <div class="content aired">
            <b>Aired:</b> {{anime.start_date}}
            <span v-if="anime.end_date"> to {{anime.end_date}} </span>
          </div>
          <div class="content premiered">
            <b>Premiered:</b>
            <span
            @click="filterPrimary('premiered', anime.premiered)"
            class="visitable"
            > {{anime.premiered}}
            </span>
          </div>
          <div class="content broadcast">
            <b>Broadcast:</b> {{anime.broadcast}}
          </div>
          <div class="content producer">
            <b>Producers: </b>
            <span
              v-for="(producer, index) in anime.producer"
              :key="producer">
              <span
                @click="filterSecondary('producer', producer)"
                class="visitable"
                > {{producer}}<span v-if="index < anime.producer.length - 1">,</span>
              </span>
            </span>
          </div>
          <div class="content licensor">
            <b>Licensors: </b>
            <span
              v-for="(licensor, index) in anime.licensor"
              :key="licensor">
              <span
                @click="filterSecondary('licensor', licensor)"
                class="visitable"
                > {{licensor}}<span v-if="index < anime.licensor.length - 1">,</span>
              </span>
            </span>
          </div>
          <div class="content studio">
            <b>Studios: </b>
            <span
              v-for="(studio, index) in anime.studio"
              :key="studio">
               <span
                @click="filterSecondary('studio', studio)"
                class="visitable"
                > {{studio}}<span v-if="index < anime.studio.length - 1">,</span>
              </span>
            </span>
          </div>
          <div class="content source">
            <b>source:</b>
            <span
              @click="filterPrimary('source', anime.source)"
              class="visitable"
              > {{anime.source}}
            </span>
          </div>
          <div class="content genre">
            <b>Genres: </b>
            <span
              v-for="(genre, index) in anime.genre"
              :key="genre">
              <span
                @click="filterSecondary('genre', genre)"
                class="visitable"
                > {{genre}}<span v-if="index < anime.genre.length - 1">,</span>
              </span> 
            </span>
          </div>
          <div class="content duration">
            <b>Duration:</b> {{anime.duration_mins}} mins
            <span v-if="isNotMovie"> per ep.</span>
          </div>
          <div class="content rating">
            <b>Rating:</b>
            <span
              @click="filterPrimary('rating', anime.rating)"
              class="visitable"
              > {{anime.rating}}
            </span> 
          </div>
        </v-flex>
      </v-layout>
    </div>
  </panel>
</template>

<script>
import AnimeService from '@/services/AnimeService'
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
    isNotMovie() {
      return this.anime.type !== 'Movie'
    },
  },
  methods: {
    filterPrimary(field, val) {
      const route = {
        name: 'animes',
        query: {}
      }
      route.query[field] = val
      this.$router.push(route)
    },
    filterSecondary(field, val) {
      const route = {
        name: 'animes',
        query: {}
      }
      route.query[field] = [val]
      this.$router.push(route)
    },
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
  // watch: {
  //   '$route.query.search': {
  //     immediate: true,
  //     async handler (value) {
  //       this.animes = (await AnimesService.index(value)).data
  //     }
  //   }
  // }
}
</script>

<style scoped>
.anime {
  padding: 20px;
  height: 330px;
  overflow: hidden;
}

.anime-name {
  font-size: 30px;
}

.album-image {
  width: 40%;
  margin: 0 auto;
}
.content {
  text-align: left;
}
.visitable {
  cursor: pointer;
}
.visitable:hover {
  color:aqua;
}
</style>
