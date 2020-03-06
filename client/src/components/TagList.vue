<template>
  <div>
    <span v-for="tag in tags" :key="tag">
      <b-button size="sm" class="mx-1" squared variant="outline-info">
        {{ tag }}
      </b-button>
    </span>
  </div>
</template>

<script>
export default {
  props: ["tags"]
};
</script>

<style scoped>
button {
  font-size: 11px;
}
</style>
