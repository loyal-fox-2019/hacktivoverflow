<template>
  <div>
    <q-editor v-model="text" @keyup="$emit('text', text)" min-height="5rem" />
  </div>
</template>

<script>
export default {
  name: 'Editor',
  data() {
    return {
      text: ''
    }
  }
}
</script>

<style></style>
