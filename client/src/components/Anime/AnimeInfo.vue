<template>
  <panel title="Info">
    <div>
      <v-layout>
        <v-flex>
          <div class="content name">
            <b>Primary Name:</b> {{anime.primary_name}}
          </div>
          <div class="content alt_name">
            <b>Synonyms: </b>
            <span
                v-for="name in anime.alt_name"
                :key="name">
                {{name}}, 
            </span>
          </div>
          <div class="content type">
            <b>Type:</b> {{anime.type}}
          </div>
          <div class="content num-episodes">
            <b>Episodes:</b> {{anime.num_episodes}}
          </div>
          <div class="content status">
            <b>Status:</b> {{anime.status}}
          </div>
          <div class="content aired">
            <b>Aired:</b> {{anime.start_date}}
            <span v-if="anime.end_date"> to {{anime.end_date}} </span>
          </div>
          <div class="content premiered">
            <b>Premiered:</b> {{anime.premiered}}
          </div>
          <div class="content broadcast">
            <b>Broadcast:</b> {{anime.broadcast}}
          </div>
          <div class="content producer">
            <b>Producers: </b>
            <span
                v-for="producer in anime.producer"
                :key="producer">
                {{producer}}, 
            </span>
          </div>
          <div class="content licensor">
            <b>Licensors: </b>
            <span
                v-for="licensor in anime.licensor"
                :key="licensor">
                {{licensor}}, 
            </span>
          </div>
          <div class="content studio">
            <b>Studios: </b>
            <span
                v-for="studio in anime.studio"
                :key="studio">
                {{studio}}, 
            </span>
          </div>
          <div class="content source">
            <b>source:</b> {{anime.source}}
          </div>
          <div class="content genre">
            <b>Genres: </b>
            <span
                v-for="genre in anime.genre"
                :key="genre">
                {{genre}}, 
            </span>
          </div>
          <div class="content duration">
            <b>Duration:</b> {{anime.duration_mins}} mins
            <span v-if="isNotMovie"> per ep.</span>
          </div>
          <div class="content rating">
            <b>Rating:</b> {{anime.rating}}
          </div>
        </v-flex>
      </v-layout>
    </div>
  </panel>
</template>

<script>
import AnimeService from '@/services/AnimeService'
export default {
  props: [
    'anime'
  ],
  computed: {
    isNotMovie() {
      return this.anime.type !== 'Movie'
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
</style>
