<template>
  <panel title="Advanced Search">
    <v-layout row wrap>
      <v-flex xs1>
        <v-subheader>Type</v-subheader>
      </v-flex>
      <v-flex xs3>
        <v-select
          :items="typeArr"
          v-model="type"
          label="Select Type"
          single-line
          hide-details
        ></v-select>
      </v-flex>
      <v-flex xs1>
        <v-subheader>Status</v-subheader>
      </v-flex>
      <v-flex xs3>
        <v-select
          :items="statusArr"
          v-model="status"
          label="Select Status"
          single-line
          hide-details
        ></v-select>
      </v-flex>
      <v-flex xs1>
        <v-subheader>Rating</v-subheader>
      </v-flex>
      <v-flex xs3>
        <v-select
          :items="ratingArr"
          v-model="rating"
          label="Select Rating"
          single-line
          hide-details
        ></v-select>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs2 v-for="g in genreArr" :key="g">
        <v-checkbox :label="g" v-model="genre" :value="g" hide-details></v-checkbox>
      </v-flex>
    </v-layout>
    <div class="text-xs-center">
      <v-btn color="primary" dark @click="advancedSearch">Search</v-btn>
    </div>
  </panel>
</template>

<script>
  export default {
    data () {
      return {
        type: '',
        status: '',
        rating: '',
        genre: [],
        typeArr: [
          'TV',
          'OVA',
          'Movie',
          'Special',
          'ONA',
          'Music',
        ],
        statusArr: [
          'Finished Airing',
          'Currently Airing',
        ],
        ratingArr: [
          'G - All Ages',
          'R+ - Mild Nudity',
          'PG - Children',
          'PG-13 - Teens 13 or older',
          'R - 17+ (violence & profanity)'
        ],
        genreArr: [
          'Action', 'Adventure', 'Cars', 'Comedy', 'Dementia', 'Demons', 'Mystery', 'Drama',
          'Ecchi', 'Fantasy', 'Game', 'Historical', 'Horror', 'Kids', 'Magic', 'Martial Arts',
          'Mecha', 'Music', 'Parody', 'Samurai', 'Romance', 'School', 'Sci-Fi', 'Shoujo',
          'Shoujo Ai', 'Shounen', 'Shounen Ai', 'Space', 'Sports', 'Super Power', 'Vampire', 'Yaoi',
          'Yuri', 'Harem', 'Slice of Life', 'Supernatural', 'Military', 'Police', 'Psychological',
          'Thriller', 'Seinen', 'Josei'
        ]
      }
    },
    methods: {
      advancedSearch() {
        const route = {
          name: 'animes',
        }
        route.query = {}
        if (this.type !== '') {
          route.query.type = this.type
        }
        if (this.status !== '') {
          route.query.status = this.status
        }
        if (this.rating !== '') {
          route.query.rating = this.rating
        }
        if (this.genre.length > 0) {
          route.query.genre = this.genre
        }
        this.$router.push(route)
      }
    }
  }
</script>