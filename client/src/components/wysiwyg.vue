<template>
  <div>
    <wysiwyg v-model="myHTML" />
  </div>
</template>

<script>
export default {
  name: 'wysiwyg',
  data() {
    return {
      message: 'Hello world',
    };
  },
};
</script>

<style scoped>
@import "~vue-wysiwyg/dist/vueWysiwyg.css";
</style>
