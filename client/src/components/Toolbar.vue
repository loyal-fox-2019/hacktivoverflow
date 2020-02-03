<template>
  <div>
    <v-toolbar dense>
      <v-toolbar-title>{{ title.name }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <div class="text-center">
        <v-btn rounded color="primary" dark @click.prevent="askQuestion"
          >Ask Question</v-btn
        >
      </div>
      <div class="text-center ml-2" v-show="isDetail">
        <v-btn rounded color="green" dark @click.prevent="openComment"
          >Post Answer</v-btn
        >
      </div>
    </v-toolbar>
  </div>
</template>

<script>
import Swal from 'sweetalert2'

export default {
  name: 'Toolbar',
  props: ['title'],
  methods: {
    askQuestion() {
      this.$router.push('/ask')
    },
    openComment() {
      if (!localStorage.getItem('token')) {
        Swal.fire({
          title: 'Oops...',
          text: 'Sorry, you are not logged in',
          icon: 'info'
        })
      } else {
        this.$store.commit('SHOW_COMMENT')
        this.$store.commit('ANSWER_STATUS', null)
      }
    }
  },
  computed: {
    isDetail() {
      return this.$store.state.detailQuestion
    }
  }
}
</script>
