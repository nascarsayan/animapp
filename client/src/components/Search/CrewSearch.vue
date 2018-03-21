<template>
  <panel title="Staff">
    <v-text-field
      label="Search staff"
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
        name: 'crews',
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
