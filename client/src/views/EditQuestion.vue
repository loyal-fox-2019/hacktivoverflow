<template>
  <v-app id="inspire">
    <v-content>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="10"
            md="8"
          >
            <v-form id="form-question-edit" style="width: 100%; padding: 2em" @submit.prevent="editQuestion" class="d-flex flex-column justify-center align-center">
              <v-alert type="error" v-for="(error, i) in errors" :key="i">
                {{error}}
              </v-alert>
              <div class="d-flex flex-column justify-center" style="width: 70%">
                <v-text-field v-model="title" label="Title" required></v-text-field>
                <v-text-field v-model="tags" label="Tags (separated by space)"></v-text-field>
              </div>
              <wysiwyg v-model="content" style="width: 80%"/>
              <div style="position: relative">
                <v-btn color="primary" class="mx-5" @click="goBack">Cancel</v-btn>
                <v-btn color="success" class="my-5" style="position: relative; right:0" type="submit" form="form-question-edit">Edit Question</v-btn>
              </div>
            </v-form>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import axios from '../config/api'
export default {
  props: {
    source: String
  },
  data () {
    return {
      title: '',
      tags: '',
      content: '',
      idQuestion: '',
      errors: []
    }
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    },
    editQuestion () {
      this.errors = []
      axios({
        method: 'put',
        url: `/questions/${this.$store.state.detail.id}`,
        data: {
          title: this.title,
          tags: this.tags.split(' '),
          content: this.content
        },
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          this.$swal({
            position: 'top-end',
            icon: 'success',
            title: 'Question Posted',
            showConfirmButton: false,
            timer: 1500
          })
          this.title = ''
          this.tags = ''
          this.content = ''
          this.$store.dispatch('fetchDetail', this.idQuestion)
            .then(result => {
              this.$router.push(`/questions/${this.idQuestion}`)
            })
        })
        .catch(err => {
          if (typeof err.response.data.message === 'string') {
            this.errors.push(err.response.data.message)
          } else {
            this.errors = err.response.data.message
          }
        })
    }
  },
  mounted () {
    this.idQuestion = this.$store.state.detail.id
    this.title = this.$store.state.detail.title
    this.content = this.$store.state.detail.content
    this.tags = this.$store.state.detail.tags.join(' ')
  }
}
</script>
