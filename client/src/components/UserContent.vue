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
          <p>{{ content._id }}</p>
        </div>
        <button
          @click="showUpdate"
          type="button"
          class="btn btn-secondary btn-lg mr-3"
        >
          UPDATE
        </button>
        <button
          @click.prevent="deleteContent"
          type="button"
          class="btn btn-danger btn-lg ml-3"
        >
          DELETE
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
import axios from 'axios'
export default {
  name: 'userContent',
  props: ['content'],
  created() {},
  methods: {
    ...mapMutations(['SET_CONTENT2UPDATE']),
    ...mapActions(['getAllContent']),
    deleteContent() {
      axios({
        method: 'delete',
        url: `http://localhost:3000/content/${this.content._id}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          console.log(data)
          // commit('SET_USERLOGIN', data)
          this.getAllContent()
        })
        .catch(err => {
          console.log(err)
        })
    },
    showUpdate() {
      this.SET_CONTENT2UPDATE(this.content)

      setTimeout(() => {
        this.$router.push({
          path: '/usercontent/update'
        })
        window.scrollTo(0, 0)
      }, 3000)
    }
  }
}
</script>

<style scoped></style>
