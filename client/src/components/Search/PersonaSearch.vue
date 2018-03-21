<template>
  <panel title="Characters">
    <v-text-field
      label="Search characters"
      v-model="queryString"
    ></v-text-field>
    <v-btn
      dark
      class="cyan"
      @click.stop="searchIt">
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
      console.log(this.queryString)
      const route = {
        name: 'personas',
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
