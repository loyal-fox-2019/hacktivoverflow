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
          @click.prevent="showDetail"
          type="button"
          class="btn btn-secondary btn-lg"
        >
          Show Details
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'content',
  props: ['content'],
  created() {},
  methods: {
    showDetail() {
      console.log(this.content._id)

      this.$router.push({
        path: `/contentDescription/${this.content._id}`
      })
    }
  }
}
</script>

<style scoped></style>
