<template>
  <div class="detail">
    <div class="detaili ml-3 mr-3">
      <h1>Update a public question</h1>
    </div>
    <div class="row">
    <div class="col-8 wisi">
      <div class="container mt-3 mb-4">
        <div class="card">
          <div class="card-body">
            <b-form @submit.prevent="update">
              <b-form-group label="Title" class="label">
                <b-form-input v-model="title" type="text" required></b-form-input>
              </b-form-group>
              <b-form-group label="Description" class="label mb-1"></b-form-group>
                <wysiwyg v-model="description" />
              <b-button variant="primary" type="submit" class="but-log mt-4">Update question</b-button>
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
  name: 'EditQuestion',
  data () {
    return {
      title: '',
      description: ''
    }
  },
  methods: {
    update () {
      const value = {
        id: this.questions._id,
        title: this.title,
        description: this.description
      }

      this.$store.dispatch('editQuestion', value)
        .then(({ data }) => {
          swal.fire({
            icon: 'success',
            title: `Successfully to updated your question`,
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
  computed: {
    questions () {
      return this.$store.state.detailQuestion
    }
  },
  created () {
    const valid = localStorage.getItem('token')
    if (!valid) {
      this.$router.push('/')
    }
    let a = this.$route.params.id
    this.$store.dispatch('readEditQuestion', a)
      .then(({ data }) => {
        this.$store.commit('SET_DETAILQUESTION', data)
        this.title = data.title
        this.description = data.description
      })
      .catch((err) => {
        console.log(err.response)
      })
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
