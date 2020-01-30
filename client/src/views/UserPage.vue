<template>
  <div>
    <UserContent
      v-for="(content, key) in userContent"
      :key="key"
      :content="content"
    ></UserContent>
  </div>
</template>

<script>
import UserContent from '../components/UserContent'
export default {
  name: 'home',
  components: {
    UserContent
  },
  computed: {
    userContent() {
      return this.$store.state.userContent
    }
  }
}
</script>
