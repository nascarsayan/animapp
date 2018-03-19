<template>
  <panel title="Characters and Voice Actors">
      <v-data-table
      :headers="headers"
      :items="anime.persona_crew"
      hide-actions
      class="elevation-1">
      <template slot="items" slot-scope="props">
        <td
          class="visitable character text-xs-left"
          @click="viewPersona(props.item.persona_id)"
          > {{props.item.persona_name}} </td>
        <td
          class="visitable crew text-xs-right"
          @click="viewCrew(props.item.crew_id)"
          > {{props.item.crew_name}} </td>
      </template>
    </v-data-table>
  </panel>
</template>

<script>
import AnimeService from '@/services/AnimeService'
export default {
  data() {
    return {
      page: 1,
      headers: [{
          text: "Character",
          value: "persona_name",
          align: "left",
        },
        {
          text: "Voice Actor",
          value: "crew_name"
        },
      ],
    };
  },
  props: [
    'anime'
  ],
  methods: {
    viewPersona(personaId) {
      this.$router.push({
          name: 'persona',
          params: {
            personaId
          }
        })
    },
    viewCrew(crewId) {
      this.$router.push({
          name: 'crew',
          params: {
            crewId
          }
        })
    },
  }
}
</script>

<style scoped>
.visitable {
  cursor: pointer;
}
</style>
