<template>
  <div class="jumbotron text-center mt-4">
    <div class="container">
      <h1 class="display-4">{{ comment.user.name }}</h1>
      <p class="lead">
        {{ comment.answer }}
      </p>
      <p>
        {{ comment.like.length }} Like -- {{ comment.dislike.length }} Dislike
      </p>
      <span class="spanduk h1 mb-2">
        <b-icon
          @click="like"
          icon="heart-fill"
          variant="danger"
          v-b-tooltip.hover
          title="Like"
        ></b-icon>
      </span>
      <span class="spanduk h1 mb-2">
        <b-icon
          @click="dislike"
          icon="heart"
          variant="dark"
          v-b-tooltip.hover
          title="Dislike"
        ></b-icon>
      </span>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import axios from 'axios'
export default {
  name: 'Comment',
  props: ['comment'],
  computed: {
    content() {
      return this.$store.state.contentDetail
    }
  },
  methods: {
    ...mapActions(['getContentById', 'getAllContent']),
    like() {
      axios({
        method: 'post',
        url: `http://localhost:3000/content/likeAnswer/${this.comment._id}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          console.log('berhasil like')
          console.log(data)
          this.getAllContent()
          setTimeout(() => {
            this.getContentById(this.content._id)
          }, 2000)
        })
        .catch(err => {
          console.log(err)
        })
    },

    dislike() {
      axios({
        method: 'post',
        url: `http://localhost:3000/content/dislikeAnswer/${this.comment._id}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          console.log('berhasil dislike')
          console.log(data)
          this.getAllContent()
          setTimeout(() => {
            this.getContentById(this.content._id)
          }, 2000)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style scoped>
.spanduk {
  cursor: pointer;
}
</style>
