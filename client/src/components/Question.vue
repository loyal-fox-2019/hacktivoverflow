<template>
  <div class="detail">
    <div class="detaili ml-3 mr-3">
      <h1>Ask a public question</h1>
    </div>
    <div class="row">
    <div class="col-8 wisi">
      <div class="container mt-3 mb-4">
        <div class="card">
          <div class="card-body">
            <b-form @submit.prevent="post">
              <b-form-group label="Title" class="label">
                <b-form-input v-model="title" type="text" required></b-form-input>
              </b-form-group>
              <b-form-group label="Description" class="label"></b-form-group>
                <wysiwyg v-model="description" />
              <b-form-group label="Tags" class="label mt-2">
                <b-form-tags
                  v-model="tags"
                  separator=" "
                  placeholder="Enter new tags separated by space"
                  remove-on-delete
                  no-add-on-enter
                  class="mb-2"
                ></b-form-tags>
              </b-form-group>
              <b-button variant="primary" type="submit" class="but-log mt-4">Post question</b-button>
            </b-form>
          </div>
        </div>
      </div>
    </div>
    <div class="col">
      <div class="container mt-3">
        <div class="card">
          <div class="card-header">
            Draft your question
          </div>
          <p class="mr-3 ml-3 txt"> The community is here to help you with specific coding, algorithm, or language problems. Avoid asking opinion-based questions.</p>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import swal from 'sweetalert2'

export default {
  data () {
    return {
      title: '',
      description: '',
      tags: []
    }
  },
  methods: {
    post () {
      const value = {
        title: this.title,
        tags: this.tags,
        description: this.description
      }

      this.$store.dispatch('createQuestion', value)
        .then(({ data }) => {
          swal.fire({
            icon: 'success',
            title: `Successfully to post your question`,
            showConfirmButton: false,
            timer: 1500
          })
          this.title = ''
          this.description = ''
          this.$router.push('/main')
        })
        .catch((err) => {
          swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.response.data.message
          })
        })
    }
  },
  created () {
    const valid = localStorage.getItem('token')
    if (!valid) {
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
.detail {
  margin-left: 50px;
  margin-right: 50px;
  margin-top: 74px !important;
}

.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.1) !important;
}

.label {
  font-weight: bold
}

.txt {
  text-align: justify
}

.detaili {
  margin-top: 100px;
}
</style>
