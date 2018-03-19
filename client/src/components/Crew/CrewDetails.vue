<template>
  <panel title="Details">
      <div class="content birthday title">Birthday : {{crew.birthday}}</div><br/>
      <div class="content website title">Website: <a :href="crew.website">{{crew.website}}</a></div><br/><br/>
      <div class="content more">{{crew.more}}</div>
  </panel>
</template>

<script>
import CrewService from '@/services/CrewService'
export default {
  props: [
    'crew'
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
