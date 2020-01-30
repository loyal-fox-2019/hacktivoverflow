<template>
  <div class="container mt-5">
    <div class="col-10 mx-auto">
      <div class="jumbotron text-center">
        <div class="container">
          <h1 class="display-4">{{ content.judul }}</h1>
          <router-link
            class="btn btn-primary btn-sm px-4 mx-1"
            v-for="(tag, key) in content.tags"
            :key="key"
            :to="{ path: `/contentdetail/${tag}` }"
            replace
            >{{ tag }}</router-link
          >
          <p class="lead">
            {{ content.keterangan }}
          </p>
        </div>
        <p>
          {{ content.like.length }} Like -- {{ content.dislike.length }} Dislike
          -- {{ content.comment.length }} Comment
        </p>
        <span class="spanduk h1 mb-2">
          <b-icon
            @click="likeQuestion"
            icon="heart-fill"
            variant="danger"
            v-b-tooltip.hover
            title="Like"
          ></b-icon>
        </span>
        <span class="spanduk h1 mb-2">
          <b-icon
            @click="dislikeQuestion"
            icon="heart"
            variant="dark"
            v-b-tooltip.hover
            title="Dislike"
          ></b-icon>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import axios from 'axios'
export default {
  name: 'contentDesc',
  props: ['content'],
  created() {},
  methods: {
    ...mapActions(['getContentById', 'getAllContent']),
    likeQuestion() {
      axios({
        method: 'post',
        url: `http://localhost:3000/content/like/${this.content._id}`,
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
    dislikeQuestion() {
      axios({
        method: 'post',
        url: `http://localhost:3000/content/dislike/${this.content._id}`,
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
    }
  }
}
</script>

<style scoped>
.spanduk {
  cursor: pointer;
}
</style>
