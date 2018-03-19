<template>
  <panel title="Image">
    <div>
      <img class="content album-image" align="center" :src="anime.pic_url" />
    </div>
  </panel>
</template>

<script>
import AnimeService from '@/services/AnimeService'

export default {
  props: [
    'anime'
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
