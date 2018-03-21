<template>
  <panel title="Anime">
    <v-text-field
      label="Search anime"
      v-model="queryString"
    ></v-text-field>
    <v-btn
      dark
      class="cyan"
      @click="searchIt">
      Search
    </v-btn>
  </panel>
</template>

<script>
import _ from 'lodash'

export default {
  data () {
    return {
      queryString: ''
    }
  },
  methods: {
    searchIt() {
      const route = {
        name: 'animes',
        query: {
          name: this.queryString
        }
      }
      this.$router.push(route)
    }
  }
}
</script>

<style>

</style>
