<template>
  <panel title="Details">
    <div class="content details" style="white-space: pre-wrap;">{{persona.details}}</div>
  </panel>
</template>

<script>
import PersonaService from '@/services/PersonaService'
export default {
  props: [
    'persona'
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
