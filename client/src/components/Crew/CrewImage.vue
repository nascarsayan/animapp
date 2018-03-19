<template>
  <panel title="Image">
    <div>
      <img class="content album-image" align="center" :src="crew.pic_url" />
    </div>
  </panel>
</template>

<script>
import CrewService from '@/services/CrewService'

export default {
  props: [
    'crew'
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
