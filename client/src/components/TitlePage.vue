<template>
  <div>
    <div class="row">
      <h1 class="title col-10">
        {{ title }}
      </h1>
      <div class="col-2" v-if="isButton">
        <button type="button" class="btn btn-sm btn-primary mt-1">Ask Question</button>
      </div>
    </div>
    <div style="clear:both"></div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'TitlePage',
  props: ['title', 'button'],
  data() {
    return {};
  },
  computed: {
    isButton() {
      if (this.button === false) {
        return false;
      }
      if (!this.button) {
        return true;
      }
      return false;
    },
  },
};
</script>

<style lang="css" scoped>
.title {
  font-size: 2.07692308rem !important;
  line-height: 1.3;
  margin: 0 0 0.5em;
}
</style>
