<template>
  <panel title="Synopsis">
      <div class="content synopsis"> {{anime.synopsis}} </div>
  </panel>
</template>

<script>
import AnimeService from '@/services/AnimeService'
export default {
  props: [
    'anime'
  ],
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
