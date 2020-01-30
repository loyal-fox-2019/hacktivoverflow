<template>
  <div>
    <Content
      v-for="(content, key) in allContent"
      :key="key"
      :content="content"
    ></Content>
  </div>
</template>

<script>
import Content from '../components/Content'
export default {
  name: 'home',
  components: {
    Content
  },
  computed: {
    allContent() {
      return this.$store.state.allContent
    }
  }
}
</script>
