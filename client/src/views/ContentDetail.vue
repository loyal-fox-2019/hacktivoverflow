<template>
  <div>
    <Content
      v-for="(content, key) in konten"
      :key="key"
      :content="content"
    ></Content>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Content from '../components/Content'
export default {
  name: 'home',
  components: {
    Content
  },
  methods: {
    ...mapActions(['getContentByTag']),
    update() {
      let contentName = this.$route.params.tagname
      console.log(contentName)
      this.getContentByTag(contentName)
    }
  },
  computed: {
    konten() {
      return this.$store.state.contentByTag
    },
    tagName() {
      return this.$route.params.tagname
    }
  },
  created() {
    this.update()
  },
  watch: {
    tagName: function(newValue, oldValue) {
      if (newValue) {
        this.update()
      }
    }
  }
}
</script>
