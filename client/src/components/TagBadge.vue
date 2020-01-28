<template>
  <span class="badge badge-light mr-1 p-1">{{ tag }}</span>
</template>

<script>
export default {
  name: 'TagBadge',
  props: ['tag'],
  data() {
    return {};
  },
};
</script>

<style lang="css" scoped>
span {
  cursor: pointer;
}
</style>
