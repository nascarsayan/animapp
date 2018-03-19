<template>
  <panel title="Image">
    <div>
      <img class="content album-image" align="center" :src="persona.pic_url" />
    </div>
  </panel>
</template>

<script>
import PersonaService from '@/services/PersonaService'

export default {
  props: [
    'persona'
  ],
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

.album-image {
  width: 40%;
  margin: 0 auto;
}
.content {
  text-align: left;
}
</style>
